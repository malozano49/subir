/**
 *  @file        : opac-error.init.js
 *
 *  @description : js de aplicación en la página de error general
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
 *  Contenedor de acciones para la página de error general
 *
 *  @cont ERROR
 *
 */
const ERROR={
  /**
   *  Inicialización
   *
   *  @method ERROR.init
   */
  init:()=>{
    ERROR.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method ERROR.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/utils.js",
      "js/commons/scripts.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
      //Baratz.tmpls_actions.GENERAL();
      // ejecucion de fns para el template
      Baratz.tmpls_actions.BOTONERA_FLOTANTE();
      // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
      Baratz.tmpls_actions.BTN_MESSAGE();
    });
  },
};

ERROR.init();
