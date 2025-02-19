/**
 *  @file        : notifications.js
 *
 *  @description : Acciones js para las notificaciones PWA
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-08-25
 *
 *  @validate    : https://jshint.com/
 *
 *  @ref         : https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
 *
 *                 Ejecute subscribe solo cuando serviceWorker.ready resuelva
 *                 https://github.com/mozilla/serviceworker-cookbook/tree/master/push-payload
 *
 *                 https://www.codemag.com/article/1901031/Implementing-Push-Notifications-in-Progressive-Web-Apps-PWAs-Using-Firebase
 */
// jshint esversion:10

console.log('[pwa/notifications.js] CARGA');

/*
  window.onload = ()=>{
    // Envio de una notificación al momento desde (utils.js)
    Baratz.tmpls_actions.UTILS.PWA_only_notification();
  };
*/

/**
 *  Gestión de suscripciones para notificaciones y notificaciones
 *
 *  @cont NOTIFICATIONS
 */
const NOTIFICATIONS={

  publicKey : 'BB9Lx63QIDZiJTqIVAOqo8l42xofZQzRc-xo9QYHugG_VqOAS2pBrdzYrMHcE4sPlE_trk1R2WWPITQUrN5hGgw=',

  /**
   *  Comprueba la posibilidad (existencia) de la modalidad push notifications
   *
   *  @method NOTIFICATIONS.checkPushExist
   *
   *  @return {bool} retorno: Si existe o no la posibilidad en el navegador
   */
  checkPushExist:()=>{
    let retorno=false;
    // Si existe en windows
    if ('PushManager' in window) {
      retorno=true;
    }
    return retorno;
  },

  /**
   *  Comprueba si hay permiso para push notifications
   *
   *  @method async NOTIFICATIONS.checkIfPushIsEnabled
   *
   *  @return {bool} retorno: Si hay o no permiso
   */
  checkIfPushIsEnabled:async()=>{
    let retorno=true;
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    const permission = await window.Notification.requestPermission();
    if(permission !== 'granted'){
console.warn("[pwa/notifications.js] checkIfPushIsEnabled() WARNING!!!! Notificaciones bloquedas por el usuario.");
      retorno=false;
    }
    return retorno;
  },

  /**
   *  Convierte un id a base64
   *
   *  @method NOTIFICATIONS.urlBase64ToUint8Array
   *
   *  @param {str} base64String : id de aplicacion en servidor
   *
   *  @return {str} outputArray : id codificado
   *
   *  @details This function is needed because Chrome doesn't accept a base64 encoded string
   *    as value for publicKey in pushManager.subscribe yet
   *    https://bugs.chromium.org/p/chromium/issues/detail?id=802280
   */
  urlBase64ToUint8Array:(base64String)=>{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  /**
   *  Operativa de suscripción
   *
   *  @method async NOTIFICATIONS.subscribe
   *
   *  @param {str} _csrf: identificador de form
   */
  subscribe:async(_csrf)=>{
    const pushIsEnabled=await NOTIFICATIONS.checkIfPushIsEnabled();
    // Si el usuario deniega permiso en el navegador
    if(!pushIsEnabled){

console.log('[notifications.js] NOTIFICATIONS.subscribe() El usuario ha denegado permiso de suscripcion');

    }
    // si el usuario permite
    else{
      const registration = await navigator.serviceWorker.getRegistration();
console.log("[notifications.js] NOTIFICATIONS.subscribe() registration",registration);
      let subscription = await registration.pushManager.getSubscription();
console.log("[notifications.js] NOTIFICATIONS.subscribe() subscription",subscription);
      // Si ya esta suscrito
      if(subscription===null){
        const convertedVapidKey = await NOTIFICATIONS.urlBase64ToUint8Array(NOTIFICATIONS.publicKey);
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly      : true,
          applicationServerKey : convertedVapidKey
        });
console.log("[notifications.js] NOTIFICATIONS.subscribe(): El usuario no estaba suscrito en el navegador y ahora ya SI está suscrito en el navegador");
      }
      else{
console.log('[notifications.js] NOTIFICATIONS.subscribe(): El usuario ya estaba suscrito en el navegador');
      }
      // Si  o si renueva los datos de suscripcion en el back
      await NOTIFICATIONS.url_action_suscribe(subscription,_csrf);
console.log('[notifications.js] NOTIFICATIONS.subscribe(): El usuario SI está suscrito en el back');
    }
  },

  url_action_suscribe:async(subscription,_csrf)=>{
    const key = subscription.getKey('p256dh');
    const encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)));
    const auth = subscription.getKey('auth');
    const encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)));
    const datos_envio={
      notificationEndPoint  : subscription.endpoint,
      key                   : encodedKey,
      auth                  : encodedAuth,
      publicKey             : NOTIFICATIONS.publicKey,
    };
    await fetch('../../notifications/subscribe', {
      method  : 'post',
      headers : {
        'Content-type': 'application/json',
        'X-CSRF-TOKEN': _csrf
      },
      credentials : 'include',
      body        : JSON.stringify(datos_envio)
    });
  },

  /**
   *  Operativa de des-suscripción
   *
   *  @method NOTIFICATIONS.unsubscribe
   *
   *  @param {str} _csrf: identificador de form
   */
  unsubscribe:async(_csrf)=>{

console.log("[notifications.js] NOTIFICATIONS.unsubscribe()");
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      // Si  o si renueva los datos de suscripcion en el back
      await NOTIFICATIONS.url_action_unsuscribe(subscription);
console.log('[notifications.js] NOTIFICATIONS.unsubscribe(): El usuario estaba suscrito en el back y ahora ya NO está suscrito en el back');
      // Unsuscribe in navigator
      await subscription.unsubscribe(subscription,_csrf);
console.log('[notifications.js] NOTIFICATIONS.unsubscribe(): El usuario NO esta suscrito ahora en el navegador');
    }
    else{

console.log('[notifications.js] NOTIFICATIONS.unsubscribe(): El usuario no estaba suscrito en el navegador');

    }
  },

  url_action_unsuscribe:async(subscription,_csrf)=>{
    const key = subscription.getKey('p256dh');
    const encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)));
    const auth = subscription.getKey('auth');
    const encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)));
    const datos_envio={
      notificationEndPoint  : subscription.endpoint,
      key                   : encodedKey,
      auth                  : encodedAuth,
      publicKey             : NOTIFICATIONS.publicKey,
    };
    await fetch('../../notifications/unsubscribe', {
      method  : 'post',
      headers : {
        'Content-type': 'application/json',
        'X-CSRF-TOKEN': _csrf
      },
      credentials : 'include',
      body        : JSON.stringify(datos_envio)
    });
  },


};
