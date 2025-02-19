/**
 *  @file        : opac-advanced-search.init.js
 *
 *  @description : js de aplicación en la página de búsqueda avanzada
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
 *  Contenedor de acciones para la página de búsqueda avanzada
 *
 *  @cont ADVANCED_SEARCH
 *
 */
const ADVANCED_SEARCH={
  /**
   *  Inicialización
   *
   *  @method ADVANCED_SEARCH.init
   */
  init:()=>{
    ADVANCED_SEARCH.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method ADVANCED_SEARCH.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      ADVANCED_SEARCH.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method ADVANCED_SEARCH.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.QUICKSEARCH();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CAROUSEL();
    var $titles_mosaic=$(document.body).find(".view_type_mosaic .item-title");
    Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($titles_mosaic,5);
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.CTRL_VIEWS();
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    //Baratz.commons.inputFilterLive();
    Baratz.commons.inputFilterLiveMarkjs();

    Baratz.commons.changeLibraryBranch();

    Baratz.commons.changeContentLibraryBranch();
    // Contenedor de búsqueda con capa de filtros avanzados
    const listOfJS=[
      "js/_tmpls/tmpl_advanced_search_filters.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      Baratz.advanced_search_filters.TMPL();
    });
  }
};


ADVANCED_SEARCH.init();
if($('#any-source').prop('checked', true) ){
  $('#any-source').next().addClass('activado');
}
