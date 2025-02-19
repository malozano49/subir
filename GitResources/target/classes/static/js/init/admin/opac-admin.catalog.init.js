/**
 *  @file        : opac-admin.catalog.init.js
 *
 *  @description : Inicio de acciones js para administración catálogo
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
 *  Contenedor de acciones para página de administración catálogo
 *
 *  @cont CATALOG
 *
 */
const CATALOG={
  /**
   *  Inicialización
   *
   *  @method CATALOG.init
   */
  init:()=>{
    CATALOG.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method CATALOG.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/admin/opac-admin.catalog.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      CATALOG.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method CATALOG.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_SELECT_ACTIONS();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.CTRL_DATETIMEPICKER();

    Baratz.admin_catalog.init();
    CATALOG.TMPL();
  },
  /**
   *  Maquetaciones varias
   *
   *  @method CATALOG.TMPL
   */
  TMPL:()=>{
    const $body=$(document.body);

  },
};

CATALOG.init();
