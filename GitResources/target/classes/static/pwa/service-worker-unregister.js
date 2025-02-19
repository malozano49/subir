/**
 *  @file        : service-worker-unregister.js xxxx
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
 *  @ref         : https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/unregister
 *  			https://github.com/GoogleChromeLabs/sw-precache/issues/340
 *  
 *
 */
// jshint esversion:10

console.log('[service-worker-unregister.js] CARGA');

if ('serviceWorker' in navigator) {
navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
            registration.unregister();
            console.log('Service Worker unregister');
    }}).catch(function(err) {
    	console.log('Service Worker registration failed: ', err);
    });
}else{
	console.log('No hay Service Worker activos');
}