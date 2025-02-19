/**
 *  @file        : opac-admin.oai.init.js
 *
 *  @description : Inicio de acciones js para administración OAI
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
 *  @cont OAI
 *
 */
const OAI={
  /**
   *  Inicialización
   *
   *  @method OAI.init
   */
  init:()=>{
    OAI.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method OAI.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/admin/opac-admin.oai.js"
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      OAI.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method OAI.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_SELECT_ACTIONS();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.MODALES_JS();
    // Baratz.tmpls_actions.CMP_SORTABLE -> Se ejecuta desde opac-admin.oai.js

    Baratz.admin_oai.init();
    OAI.TMPL();
  },
  /**
   *  Maquetaciones varias
   *
   *  @method OAI.TMPL
   */
  TMPL:()=>{
    const $body=$(document.body);

  },
};

OAI.init();
