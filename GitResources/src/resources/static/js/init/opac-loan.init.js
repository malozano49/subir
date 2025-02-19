/**
 *  @file        : opac-loan.init.js
 *
 *  @description : js de aplicación en la página de solicitud de prestamo de un item
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
 *  Contenedor de acciones para la página de página de solicitud de prestamo de un item
 *
 *  @cont LOAN
 *
 */
const LOAN={
  /**
   *  Inicialización
   *
   *  @method LOAN.init
   */
  init:()=>{
    LOAN.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method LOAN.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/search/search.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      LOAN.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method LOAN.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.RANGE_SLIDER();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.commons.imageEvents();
  },
};

LOAN.init();
