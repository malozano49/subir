  /**
   *  @file        : opac-reader-data.init.js
   *
   *  @description : js de aplicación en la página datos personales
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
   *  Contenedor de acciones para la página datos personales
   *
   *  @cont READER_DATA
   *
   */
  const READER_DATA={
    /**
     *  Inicialización
     *
     *  @method READER_DATA.init
     */
    init:()=>{
      READER_DATA.load_plugins();
    },
    /**
     *  Carga e inicializacion de plugins
     *
     *  @method READER_DATA.load_plugins
     */
    load_plugins:()=>{
      const listOfJS=[
        "js/commons/scripts.js",
        "js/commons/commons.js",
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        READER_DATA.secuencia_ejecucion();
      });
    },
    /**
     *  Secuencia de ejecucion de scripts
     *
     *  @method READER_DATA.secuencia_ejecucion
     */
    secuencia_ejecucion:()=>{
      // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
      //Baratz.tmpls_actions.GENERAL();
      // ejecucion de fns para el template
      Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
      Baratz.tmpls_actions.BOTONERA_FLOTANTE();
      Baratz.tmpls_actions.GESTION_VISTA();
      Baratz.tmpls_actions.MENU_LATERAL();
      // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
      Baratz.tmpls_actions.BTN_MESSAGE();

      Baratz.commons.create_cacheLoans();
    },

  };

  READER_DATA.init();
