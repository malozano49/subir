/**
 *  @file        : opac-reader-edit-password.init.js
 *
 *  @description : js de aplicación en la página de cambio de password del usuario
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
 *  Contenedor de acciones para la página de cambio de password del usuario
 *
 *  @method READER_DATA_EDIT_PASSWORD
 *
 */
const READER_DATA_EDIT_PASSWORD={
  /**
   *  Inicialización
   *
   *  @method READER_DATA_EDIT_PASSWORD.init
   */
  init:()=>{
    READER_DATA_EDIT_PASSWORD.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method READER_DATA_EDIT_PASSWORD.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js"
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      READER_DATA_EDIT_PASSWORD.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method READER_DATA_EDIT_PASSWORD.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.MENU_LATERAL();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    //Baratz.commons.create_cacheLoans();

    Baratz.tmpls_actions.UTILS.view_pass();
    // Acciones breves en el inicio
    READER_DATA_EDIT_PASSWORD.tmpl_actions.init();
  },
  /**
   *  Acciones en el template
   *
   *  @cont READER_DATA_EDIT_PASSWORD.tmpl_actions
   */
  tmpl_actions:{
    init:()=>{
      //220215 Se solicita foco en el primer input al inicio de vista
      $(document.body).find("#pass").focus();
    }
  }
};

READER_DATA_EDIT_PASSWORD.init();
