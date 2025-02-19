/**
 *  @file        : opac-maquetacion-2.init.js
 *
 *  @description : js de línea de maquetación 2
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
 *  Contenedor de acciones para las páginas de línea de maquetación
 *
 *  @cont MAQUETACION_2
 *
 */
const MAQUETACION_2={
  /**
   *  Inicialización
   *
   *  @method MAQUETACION_2.init
   */
  init:()=>{
    MAQUETACION_2.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method MAQUETACION_2.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/layout/maquetacion2.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      MAQUETACION_2.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method MAQUETACION_2.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    Baratz.tmpls_actions.GENERAL();
    /*
    Baratz.tmpls_actions.FALLBACK_IMAGES();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.MODALES_JS();
    Baratz.tmpls_actions.EMULATE_BMD()
    Baratz.tmpls_actions.CAROUSEL();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.BTN_MESSAGE();
    Baratz.tmpls_actions.CTRL_VIEWS();
    Baratz.tmpls_actions.JSSOCIAL_SHARE();
    Baratz.tmpls_actions.SIMPLE_PAGINATION();
    */
  }
};

MAQUETACION_2.init();




















