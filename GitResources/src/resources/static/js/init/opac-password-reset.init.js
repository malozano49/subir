/**
 *  @file        : opac-password-reset.init.js
 *
 *  @description : js de aplicación en la página recordar contraseña
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
 *  Contenedor de acciones para la página recordar contraseña
 *
 *  @cont PASSWORD_RESET
 *
 */
const PASSWORD_RESET={
  /**
   *  Inicialización
   *
   *  @method PASSWORD_RESET.init
   */
  init:()=>{
    PASSWORD_RESET.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method PASSWORD_RESET.load_plugins
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
      Baratz.tmpls_actions.EMULATE_BMD();
      Baratz.tmpls_actions.CTRL_LOADING();
    });
  },
};

PASSWORD_RESET.init();
