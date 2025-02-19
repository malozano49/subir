/**
 *  @file        : opac-cookieterms.init.js
 *
 *  @description : js de aplicación en la página cookieterms
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz */

/**
 *  Contenedor de acciones para la página cookieterms
 *
 *  @cont COOKIETERMS
 *
 */
const COOKIETERMS={
  /**
   *  Inicialización
   *
   *  @method COOKIETERMS.init
   */
  init:()=>{
    COOKIETERMS.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method COOKIETERMS.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/_tmpls/tmpl_cookies_terms.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      COOKIETERMS.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method COOKIETERMS.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();

    Baratz.cookiesterms.init();
  },

};

COOKIETERMS.init();
