/**
 *  @file        : opac-request-reserve.init.js
 *
 *  @description : js de aplicación en la página de ejecucion de solicitud de reserva de un item
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
 *  Contenedor de acciones para la página de página de ejecucion de solicitud de reserva de un item
 *
 *  @cont REQUEST_RESERVE
 *
 */
const REQUEST_RESERVE={
  /**
   *  Inicialización
   *
   *  @method REQUEST_RESERVE.init
   */
  init:()=>{
    REQUEST_RESERVE.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method REQUEST_RESERVE.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/_tmpls/tmpl_my_profile_lists_loans_applications.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      REQUEST_RESERVE.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method REQUEST_RESERVE.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.RANGE_SLIDER();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.myProfile.TMPL();
  },
};

REQUEST_RESERVE.init();
