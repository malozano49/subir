/**
 *  @file        : opac-maquetacion-1.init.js
 *
 *  @description : js de línea de maquetación 1
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
 *  Contenedor de acciones para las páginas de línea de maquetación 1
 *
 *  @cont MAQUETACION_1
 *
 */
const MAQUETACION_1={
  /**
   *  Inicialización
   *
   *  @method MAQUETACION_1.init
   */
  init:()=>{
    MAQUETACION_1.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method MAQUETACION_1.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/layout/maquetacion1.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      MAQUETACION_1.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method MAQUETACION_1.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    Baratz.tmpls_actions.GENERAL();
    /*
    Baratz.tmpls_actions.TABLE_BIG_00();
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.MODALES_JS();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_LOADING();
    */


  }
};

MAQUETACION_1.init();
