/**
 *  @file        : opac-admin.credentials.init.js
 *
 *  @description : Inicio de acciones js para administración credenciales
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
 *  Contenedor de acciones para páginas de administración
 *
 *  @cont CREDENTIALS
 *
 */
const CREDENTIALS={
  /**
   *  Inicialización
   *
   *  @method CREDENTIALS.init
   */
  init:()=>{
    CREDENTIALS.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method CREDENTIALS.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/admin/opac-admin.credentials.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      CREDENTIALS.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method CREDENTIALS.secuencia_ejecucion
   */
  secuencia_ejecucion:async ()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_SELECT_ACTIONS();
    Baratz.tmpls_actions.CTRL_LOADING();

    Baratz.tmpls_actions.UTILS.view_pass();

    await Baratz.admin_credentials.init();
    CREDENTIALS.TMPL();
  },
  /**
   *  Maquetaciones varias
   *
   *  @method CREDENTIALS.TMPL
   */
  TMPL:()=>{
    const $body=$(document.body);

  },
};

CREDENTIALS.init();
