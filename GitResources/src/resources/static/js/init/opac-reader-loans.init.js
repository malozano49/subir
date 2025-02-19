/**
 *  @file        : opac-reader-loans.init.js
 *
 *  @description : js de aplicación en la página Préstamos y solicitudes -> Actuales
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
 *  Contenedor de acciones para la página Préstamos y solicitudes -> Actuales
 *
 *  @cont READER_LOANS
 *
 */
const READER_LOANS={
  /**
   *  Inicialización
   *
   *  @method READER_LOANS.init
   */
  init:()=>{
    READER_LOANS.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method READER_LOANS.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/_tmpls/tmpl_my_profile_lists_loans_applications.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      READER_LOANS.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method READER_LOANS.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.TABLE_BIG_00();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.GESTION_VISTA();
    Baratz.tmpls_actions.MENU_LATERAL();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.commons.create_cacheLoans();

    Baratz.myProfile.TMPL();
  },
};

READER_LOANS.init();
