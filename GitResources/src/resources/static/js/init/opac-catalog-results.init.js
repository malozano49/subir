/**
 *  @file        : opac-catalog-results.init.js
 *
 *  @description : js de aplicación en la página de resultados de búsqueda
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
 *  Contenedor de acciones para la página de  resultados de búsqueda
 *
 *  @cont RESULTS
 *
 */
const RESULTS={
  /**
   *  Inicialización
   *
   *  @method RESULTS.init
   */
  init:()=>{
    //RESULTS.PRUEBA_SCROLL_URLANCHOR();
    
    RESULTS.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method RESULTS.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/manager/opac-manager.recommended.js" // botón recomendar para modal manager
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      RESULTS.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method RESULTS.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{

    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
    Baratz.tmpls_actions.BTNS_EXPAND_FACETS();
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.QUICKSEARCH();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.MODALES_JS();
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.commons.imageEvents();

    //Baratz.commons.inputFilterLive();
    Baratz.commons.inputFilterLiveMarkjs();

    Baratz.commons.changeLibraryBranch();

    Baratz.commons.changeContentLibraryBranch();
    RESULTS.TMPL();

  },
  /**
   *  Operaciones simples en el template
   *
   *  @method RESULTS.TMPL
   */
  TMPL:()=>{
    const $body=$(document.body);

    // Puede ser contenedor de búsqueda simple, y
    // si existe contenedor de búsqueda con la capa de filtros avanzados
    const $cont_filtros_busqueda=$body.find(".cont_filtros_busqueda");
    if($cont_filtros_busqueda.length>0){
      const listOfJS=[
        "js/_tmpls/tmpl_advanced_search_filters.js"
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        Baratz.advanced_search_filters.TMPL();
      });
    }

    // Aplica icono loading al click en los botones de paginacion y ordenacion
    const $btns_loading=$body.find(".pagination_num_results .btn-link,.cont_order_list .btn-link,.cont_pagination .page-link");
    const $loading=$body.find(".loading")
    $btns_loading.on("click",()=>{
      $loading.addClass("in_view");
    });
  },

  PRUEBA_SCROLL_URLANCHOR:()=>{
    if (typeof(window.location.hash) !== 'undefined' && window.location.hash.length > 0) {
      //Baratz.tmpls_actions.UTILS.parseURL()
      //window.location.hash = '';
      //window.history.replaceState(null, null, window.location.pathname);


      const $body=$(document.body);
      const target = window.location.hash;

      // Si la capa no existe, se retorna
      const $capa=$body.find(target);
      if($capa.length===0){return;}

      // Elimina el #+targetID para evitar scrollnav
      window.location.hash = "";
      let str=window.location.href;
      const pos = str.lastIndexOf('#');
      str = str.substring(0,pos)+str.substring(pos+1);
      history.pushState("",document.title,str);

      // efectua el desplazamiento (se lanza desde utils.js, con lo que ya está cargado el objeto con los scripts)
      let desplazamiento=$capa.offset().top-32;
      Baratz.tmpls_actions.UTILS.scrollTo(desplazamiento);

    }


  }
};

RESULTS.init();



