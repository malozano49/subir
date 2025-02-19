/**
 *  @file        : service-worker.js xxxx
 *
 *  @route       : \OpacWeb\src\main\resources\static\pwa\
 *  @description : service worker PWA
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-08-25
 *
 *  @validate    : https://jshint.com/
 *
 *  @ref         : https://github.com/GoogleChrome/samples/blob/gh-pages/service-worker/custom-offline-page/service-worker.js
 *
 *                 https://developers.google.com/codelabs/pwa-training/pwa03--going-offline#1
 *                 // Push
 *                 https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push
 *                 // Fetch funcional
 *                 https://gist.github.com/jeffposnick
 *                 // Refresco de sw
 *                 https://deanhume.com/displaying-a-new-version-available-progressive-web-app/
 *                 https://newbedev.com/activate-updated-service-worker-on-refresh
 *                 https://stackoverflow.com/questions/40100922/activate-updated-service-worker-on-refresh
 *                 https://whatwebcando.today/articles/handling-service-worker-updates/
 *                 https://codepen.io/chriscoyier/project/editor/ZPvNRA
 *
 *                 https://medium.com/jspoint/service-workers-your-first-step-towards-progressive-web-apps-pwa-e4e11d1a2e85
 *
 */
// jshint esversion:10

console.log('[service-worker.js] CARGA');

const CACHE_NAME = 'opacDiscovery-artifactId-version';

// Lista de caché
const FILES = [
  'img/favicons/favicon-16x16.png',
  'img/favicons/favicon-32x32.png',
  'img/favicons/apple-touch-icon.png',
  'img/favicons/favicon.ico',
  'img/logo-sin-fondo.png',
  'webfonts/fontawesome-free-5.11.2-web/css/all.min.css',
  'webfonts/SourceSansPro/all.css',

  'plugins/bootstrap/bootstrap.min.css',
 
  'plugins/jquery/jquery.min.js',
  'plugins/popper/popper.min.js',
  'plugins/bootstrap/bootstrap.min.js',

  'pwa/offline/img/no-internet-icon-24.jpg',
  'pwa/offline/css/index.min.css',
  'pwa/offline/js/index.js',
  'public/pwa/offline/index',
];

/* CUIDADO: scripts.js y commons.js en local no están minimificados, cuidado con esto que da error con addAll al subir ya que que allí son .min.js
  CAMBIAR ESTO AL SUBIR
*/


// lista de fuentes
const FONTS=[

  'webfonts/SourceSansPro/SourceSansPro-Italic.ttf',
  'webfonts/SourceSansPro/SourceSansPro-Italic.woff',
  'webfonts/SourceSansPro/SourceSansPro-Italic.woff2',
  'webfonts/SourceSansPro/SourceSansPro-Italic.svg',

  'webfonts/SourceSansPro/SourceSansPro-Regular.ttf',
  'webfonts/SourceSansPro/SourceSansPro-Regular.woff',
  'webfonts/SourceSansPro/SourceSansPro-Regular.woff2',
  'webfonts/SourceSansPro/SourceSansPro-Regular.svg',

  'webfonts/SourceSansPro/SourceSansPro-SemiBold.ttf',
  'webfonts/SourceSansPro/SourceSansPro-SemiBold.woff',
  'webfonts/SourceSansPro/SourceSansPro-SemiBold.woff2',
  'webfonts/SourceSansPro/SourceSansPro-SemiBold.svg',

  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-regular-400.ttf',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-regular-400.woff',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-regular-400.woff2',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-regular-400.svg',

  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.ttf',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.woff2',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-solid-900.svg',

  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-brands-400.ttf',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-brands-400.woff',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-brands-400.woff2',
  'webfonts/fontawesome-free-5.11.2-web/webfonts/fa-brands-400.svg',
];

const urlContextPath='/OpacDiscovery/';

const FILES_TO_CACHE=FILES.map(item => `${urlContextPath}${item}`);
const FONTS_TO_CACHE=FONTS.map(item => `${urlContextPath}${item}`);

const SW={

  /**
   *  Acciones sobre el evento install
   *
   *  @cont SW.onInstall
   *
   *  @refs https://gist.github.com/neoFelhz/50800b701d00dc6d874be95da2cd7655
   */
  onInstall:{

    /**
     *  Inicialización
     *
     *  @method SW.onInstall.init
     *
     *  @param {object} event: Evento
     */
    init:event =>{
console.log("[service-worker.js] SW.onInstall.init() event",event);
      event.waitUntil(SW.onInstall.updateStaticCache(event));
      self.skipWaiting();
    },

    /**
     *  Guardado de fuentes en caché
     *
     *  @method SW.onInstall.updateStaticCache
     */
    carga_fuentes:async()=>{
      const cache = await caches.open(CACHE_NAME);
      // En primera instancia no cargan las fuentes correctamente
      FONTS_TO_CACHE.forEach(async (file)=>{
        //cache.add(new Request(file));
        const retorno=await fetch(file);
        cache.put(new Request(file), retorno.clone());
      });
    },

    /**
     *  Guardado de los items en caché
     *
     *  @method SW.onInstall.updateStaticCache
     *
     *  @param {object} event: Evento
     */
    updateStaticCache:async(event)=>{
      const cache = await caches.open(CACHE_NAME);
      // Configurar {cache: 'reload'} en la nueva solicitud asegurará que la respuesta
      // no se cumple desde la caché HTTP; es decir, será de la red.
      await cache.addAll(FILES_TO_CACHE,{cache: 'reload'});
      // hay algun problema en primera instancia con las fuentes para la página offline
      // se delega en el onfetch el guardado de fuentes a la recarga de página
      // que es donde se desencadena fetch
      await cache.addAll(FONTS_TO_CACHE,{cache: 'reload'});
      return cache;
    },

  },

  /**
   *  Acciones sobre el evento fetch
   *
   *  @cont SW.onFetch
   *
   *  @refs https://gist.github.com/jeffposnick/73f071ffeacecfe60e12501100f6003c
   */
  onFetch:{

    /**
     *  Inicialización
     *
     *  @method SW.onFetch.init
     *
     *  @param {object} event: Evento
     */
    init:event =>{
//console.log("[service-worker.js] SW.onFetch.init() event",event);
      const request=event.request;
      // Evita siempre las solicitudes de rango, debido a errores del navegador
      if (request.headers.has('range')) return;
      event.respondWith(SW.onFetch.cachedOrNetworked(event));
    },

    /**
     *  Determina si la petición debe recuperarse desde la cache ó desde red
     *  De ser necesario guarda en cache ciertos elementos como las fuentes, que dan problemas de cacheo desde css
     *
     *  @method SW.onFetch.cachedOrNetworked
     *
     *  @param {object} event: Evento
     */
    cachedOrNetworked : async(event)=>{
      const {request}=event;

      // Intenta obtener el elemento de la caché
      const cachedResponse = await caches.match(request,{ ignoreSearch: true });
      if (cachedResponse){
        return cachedResponse;
      }
      // Si no está en la caché
      try {
        let retorno;
        // busca una respuesta precargada
        const response = await event.preloadResponse;
        if (response ){
          retorno=response;
        }
        else{
          // obtiene una respuesta de la red
          const otherwise= await fetch(request);
          if(otherwise){
            retorno= otherwise;
          }
        }
        // Para ciertos elementos es necesario hacer put (fuentes ...)
        if(retorno){
          if (request.destination==="font"){
            // busca si está definido en la lista de fuentes
            const file_font=new URL(request.url);
            const isInFonts=FONTS_TO_CACHE.includes(file_font.pathname);
//console.log('[service-worker.js] SW.onFetch.cachedOrNetworked() isInFonts,file_font.pathname',isInFonts,file_font.pathname);
            if(isInFonts){
              // Lo inserta en caché
              const cache = await caches.open(CACHE_NAME);
              event.waitUntil(
                cache.put(request, retorno.clone())
              );
            }
          }
          return retorno;
        }
      }
      catch (err) {
        // If this was a navigation, show the offline page:
        if (request.mode === 'navigate') {
console.log('[service-worker.js] SW.onFetch.cachedOrNetworked() Err: ',err);
console.log('[service-worker.js] SW.onFetch.cachedOrNetworked() Request 01: ', request);
          return caches.match(`${urlContextPath}public/pwa/offline/index`);
        }
        // Otherwise throw
        throw err;
      }
    },

  },

  /**
   *  Acciones sobre el evento activate
   *
   *  @cont SW.onActivate
   */
  onActivate:{

    /**
     *  Inicialización
     *
     *  @method SW.onActivate.init
     *
     *  @param {object} event: Evento
     */
    init:event=>{
console.log("[service-worker.js] SW.onActivate.init() event",event);
      event.waitUntil(SW.onActivate.removeOldCache());
      // El trabajador del servicio activo toma el control de la página de inmediato.
      self.clients.claim();
    },
    // Elimina caches obsoletos
    removeOldCache:async()=>{
      // Habilita la precarga de navegación si es compatible.
      // Ver https://developers.google.com/web/updates/2017/02/navigation-preload
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
      return caches.keys().then(cacheNames => Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => caches.delete(cacheName))
      ));
    },

  },

  /**
   *  Acciones sobre el evento push notification
   *
   *  @cont SW.onPush
   *
   *  @refs https://github.com/mozilla/serviceworker-cookbook/blob/master/push-payload/service-worker.js
   *        https://serviceworke.rs/push-get-payload_service-worker_doc.html
   *        https://serviceworke.rs/push-simple_index_doc.html
   *        https://developers.google.com/web/fundamentals/codelabs/push-notifications
   *        https://web-push-book.gauntface.com/web-push-protocol/
   *        https://developers.google.com/web/updates/2016/07/web-push-interop-wins
   *        https://golb.hplar.ch/2019/08/webpush-java.html
   */
  onPush:{

    /**
     *  Inicialización
     *
     *  @method SW.onPush.init
     *
     *  @param {object} event: Evento
     */
    init: event=>{
console.log("[service-worker.js] SW.onPush.init() event",event);
      // Si no hay permiso retorna directamente
      if (!(self.Notification && self.Notification.permission === 'granted')) {
console.log("[service-worker.js] onPush.init() El usuario no tiene habilitado el permiso para notificaciones");
        return;
      }
      SW.onPush.notify(event);
    },

    /**
     *  Recibe los datos de la notificacion y la lanza al entorno a través de showNotification()
     *
     *  @method SW.onPush.notify
     *
     *  @param {object} event: Evento
     */
    notify: async event=>{
console.log('[service-worker.js] onPush.notify() Push Recibido.',event.data);
console.log(`[service-worker.js] onPush.notify() Texto:"${event.data.text()}"`);
      const subscription=await SW.onPush.getSubscription();
      if(subscription===null){
console.log('[service-worker.js] onPush.notify() Cliente NO suscrito en el navegador');
        return;
      }

      const endpoint=subscription.endpoint;
      // Peticion al back para los datos de notificacion?
      // const data_message= await fetch('./getPayload?endpoint=' + endpoint);

      /////// FALLBACK
      // Retrieve the textual payload from event.data (a PushMessageData object).
      // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
      // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
      const randomItem = Math.floor(Math.random()*5);
      const notifTitle = "Nombre "+randomItem;
      const notifBody = 'Creado en service-worker: '+event.data.text();
      const notifImg = `${urlContextPath}img/favicons/android-chrome-128x128.png`;
      const options = {
        body: notifBody,
        icon: notifImg
      };

      // Pintado de notificación
      self.registration.showNotification(notifTitle,options);
    },

    /**
     *  Recupera el estado de la suscripción del usuario en el navegador
     *
     *  @method SW.onPush.getSubscription
     *
     *  @return {obj} Devuelve la suscripción al navegador o null si el usuario no está suscrito
     */
     getSubscription:async ()=>{
      const retorno=await self.registration.pushManager.getSubscription();
      return retorno;
    },

  },

  /**
   *  Acciones sobre el evento pushsubscriptionchange
   *
   *  @cont SW.onPushSubscriptionChange
   *
   *  @refs https://serviceworke.rs/push-subscription-management_service-worker_doc.html
   *        https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onpushsubscriptionchange
   */
  onPushSubscriptionChange:{

    /**
     *  Inicialización
     *
     *  @method SW.onPushSubscriptionChange.init
     *
     *  @param {object} event: Evento
     */
    init: async event=>{
  console.log("[service-worker.js] SW.onPushSubscriptionChange.init() event",event);
      const registration = await navigator.serviceWorker.getRegistration();
      // Subscribe the user
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
      });

      SW.onPushSubscriptionChange.subscriptionChange(subscription);

    },

    /**
     *  Petición a servidor para guardar los datos de la suscripcion
     *
     *  @method SW.onPushSubscriptionChange.subscriptionChange
     *
     *  @param {object} subscription: datos de la suscripción
     */
    subscriptionChange:async(subscription)=>{

  console.log('[service-worker.js] Subscribed after expiration', subscription.endpoint);

      await fetch('register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          subscription: subscription.endpoint
        })
      });
    },

  },

  /**
   *  Acciones sobre el evento notificationclick
   *
   *  @cont SW.onNotificationClick
   */
  onNotificationClick:{

    // def de vars
    rootUrl : `${urlContextPath}public/home`,

    /**
     *  Inicialización
     *
     *  @method SW.onNotificationClick.init
     *
     *  @param {object} event: Evento
     */
    init:(event)=>{
  console.log("[service-worker.js] SW.onNotificationClick.init() event",event);
      // cierra notificacion
      event.notification.close();
      // Recupera las instancias del cliente
      const client=event.waitUntil(SW.onNotificationClick.getClient());
      // Aplica foco
      client.focus();
    },

    /**
     *  Recupera la instancia de cliente
     *
     *  @method SW.onNotificationClick.getClient
     *
     *  @param {object} event: Evento
     */
    getClient:async ()=>{
      let retorno=null;
      const matchedClients = await self.clients.matchAll();
      for (let client of matchedClients){
        if (client.url.indexOf(rootUrl) >= 0){
          return client.focus();
        }
      }
      if (clients.openWindow){
        retorno= await clients.openWindow(SW.onNotificationClick.rootUrl);
      }
      return retorno;
    },

  }
};


// EVENTOS
self.addEventListener('install', SW.onInstall.init);
self.addEventListener('fetch', SW.onFetch.init);
self.addEventListener("activate", SW.onActivate.init);
self.addEventListener('push', SW.onPush.init);
self.addEventListener('pushsubscriptionchange', SW.onPushSubscriptionChange.init);
self.addEventListener('notificationclick',SW.onNotificationClick.init);


