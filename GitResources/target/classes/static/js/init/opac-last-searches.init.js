/**
 *  @file        : opac-last-searches.init.js
 *
 *  @description : js de aplicación en la página de últimas búsquedas
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
 *  Contenedor de acciones para la página de últimas búsquedas
 *
 *  @cont LAST_SEARCHES
 *
 */
const LAST_SEARCHES={
  /**
   *  Inicialización
   *
   *  @method LAST_SEARCHES.init
   */
  init:()=>{
    LAST_SEARCHES.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method LAST_SEARCHES.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      LAST_SEARCHES.secuencia_ejecucion();
    });
  },

  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method LAST_SEARCHES.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.CTRL_MENU_BTNS_SEARCHS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

  },
};

LAST_SEARCHES.init();
