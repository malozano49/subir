/**
 *  @file        : opac-reader-data-edit.init.js
 *
 *  @description : js de aplicación en la página para edición de datos personales
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
 *  Contenedor de acciones para la página de edición de datos personales
 *
 *  @cont READER_DATA_EDIT
 *
 */
 const READER_DATA_EDIT={
  /**
   *  Inicialización
   *
   *  @method READER_DATA_EDIT.init
   */
  init:()=>{
    READER_DATA_EDIT.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method READER_DATA_EDIT.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js"
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      READER_DATA_EDIT.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method READER_DATA_EDIT.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.GESTION_VISTA();
    Baratz.tmpls_actions.MENU_LATERAL();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.commons.create_cacheLoans();

    // Contenedor de búsqueda con capa de filtros avanzados
    const listOfJS=[
      "pwa/notifications.js",
      "js/_tmpls/tmpl_reader_edit_data.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      Baratz.tmpl_reader_edit_data.init();
    });
  },
};

READER_DATA_EDIT.init();
