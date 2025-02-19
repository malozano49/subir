/**
 *  @file        : opac-admin.monitoring.init.js
 *
 *  @description : Inicio de acciones js para administración monitorización
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
 *  Contenedor de acciones para página de administración monitorización
 *
 *  @cont MONITORING
 *
 */
const MONITORING={
  /**
   *  Inicialización
   *
   *  @method MONITORING.init
   */
  init:()=>{
    MONITORING.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method MONITORING.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/admin/opac-admin.monitoring.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      MONITORING.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method MONITORING.secuencia_ejecucion
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
    Baratz.tmpls_actions.MODALES_JS();
    Baratz.tmpls_actions.TABLE_BIG_00();

    Baratz.monitor.init();
  }
};

MONITORING.init();
