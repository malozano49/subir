/**
 *  @file        : opac-admin.notifications.init.js
 *
 *  @description : Inicio de acciones js para administración notifications
 *  @license     : baratz
 *  @copyright   : 2021
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-10-14
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz */

/**
 *  Contenedor de acciones para páginas de administración
 *
 *  @cont ADMIN_NOTIFICATIONS
 *
 */
const ADMIN_NOTIFICATIONS={
  /**
   *  Inicialización
   *
   *  @method ADMIN_NOTIFICATIONS.init
   */
  init:()=>{
    ADMIN_NOTIFICATIONS.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method ADMIN_NOTIFICATIONS.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "pwa/notifications.js", // por si acaso
      "js/admin/opac-admin.notifications.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      ADMIN_NOTIFICATIONS.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method ADMIN_NOTIFICATIONS.secuencia_ejecucion
   */
  secuencia_ejecucion:async ()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.CTRL_LOADING();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.admin_notifications.init();

  },

};

ADMIN_NOTIFICATIONS.init();
