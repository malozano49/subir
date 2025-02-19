/**
 *  @file        : opac-manager.activities.init.js
 *
 *  @description : Inicio de acciones js para manager próximas actividades
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
 *  Contenedor de acciones para páginas de manager
 *
 *  @cont ACTIVITIES
 *
 */
const ACTIVITIES={
  /**
   *  Inicialización
   *
   *  @method ACTIVITIES.init
   */
  init:()=>{
    ACTIVITIES.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method ACTIVITIES.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/manager/opac-manager.activities.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      ACTIVITIES.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method ACTIVITIES.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    // Baratz.tmpls_actions.GENERAL();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.MODALES_JS();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.FILTERIZE_MARKJ();

    Baratz.manager_activities.init();
  }
};

ACTIVITIES.init();
