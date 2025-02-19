/**
 *  @file        : opac-viewAll.init.js
 *
 *  @description : js de aplicación en las páginas ver todos (Agenda y Enlaces de interés)
 *  @license     : baratz
 *  @copyright   : 2010
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz */

/**
 *  Contenedor de acciones para las páginas ver todos (Agenda y Enlaces de interés)
 *
 *  @cont VIEWALL
 *
 */
const VIEWALL={
  /**
   *  Inicialización
   *
   *  @method VIEWALL.init
   */
  init:()=>{
    VIEWALL.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method VIEWALL.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      VIEWALL.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method VIEWALL.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();
  },
};

VIEWALL.init();
