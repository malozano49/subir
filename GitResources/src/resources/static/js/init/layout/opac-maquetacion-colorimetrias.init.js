/**
 *  @file        : opac-maquetacion-colorimetrias.init.js
 *
 *  @description : js de línea de maquetación
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
 *  @cont MAQUETACION_COLORIMETRIAS
 *
 */
const MAQUETACION_COLORIMETRIAS={
  /**
   *  Inicialización
   *
   *  @method MAQUETACION_COLORIMETRIAS.init
   */
  init:()=>{
    MAQUETACION_COLORIMETRIAS.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method MAQUETACION_COLORIMETRIAS.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "plugins/mark/dist/jquery.mark.min.js",
      "js/commons/scripts.js",
      "js/layout/colorimetrias.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      MAQUETACION_COLORIMETRIAS.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method MAQUETACION_COLORIMETRIAS.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    Baratz.tmpls_actions.GENERAL();
    //COLORIMETRIAS();// No se ejecuta desde aqui, se aplica document ready
  }
};

MAQUETACION_COLORIMETRIAS.init();
