/**
 *  @file        : opac-reader-history-search.init.js
 *
 *  @description : js de aplicación en la página de búsquedas guardadas
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
 *  Contenedor de acciones para la página de búsquedas guardadas
 *
 *  @cont READER_HISTORY_SEARCH
 *
 */
const READER_HISTORY_SEARCH={
  /**
   *  Inicialización
   *
   *  @method READER_HISTORY_SEARCH.init
   */
  init:()=>{
    READER_HISTORY_SEARCH.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method READER_HISTORY_SEARCH.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "plugins/mark/dist/jquery.mark.min.js", // Aplica mark.js fuera del plugin Baratz.tmpls_actions.FILTERIZE_MARKJ
      "js/commons/scripts.js",
      "js/commons/commons.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      READER_HISTORY_SEARCH.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method READER_HISTORY_SEARCH.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_MENU_BTNS_SEARCHS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.DATETIME_ALMANAC();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize();

    Baratz.commons.imageEvents();

    //Baratz.commons.inputFilterLive();
    Baratz.commons.inputFilterLiveMarkjs();

    Baratz.commons.changeLibraryBranch();
  },
};

READER_HISTORY_SEARCH.init();
