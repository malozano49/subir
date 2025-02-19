/**
 *  @file        : opac-login.init.js
 *
 *  @description : js de aplicación en la página login
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
 *  Contenedor de acciones para la página login
 *
 *  @cont LOGIN
 *
 */
const LOGIN={
  /**
   *  Inicialización
   *
   *  @method LOGIN.init
   */
  init:()=>{
    LOGIN.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method LOGIN.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
      //Baratz.tmpls_actions.GENERAL();
      // ejecucion de fns para el template
      Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
      Baratz.tmpls_actions.EMULATE_BMD();
      Baratz.tmpls_actions.CTRL_LOADING();

      Baratz.tmpls_actions.UTILS.view_pass();
    });
  },

};

LOGIN.init();
