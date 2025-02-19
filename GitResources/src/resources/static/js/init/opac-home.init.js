/**
 *  @file        : opac-home.init.js
 *
 *  @description : js de aplicación en la página home
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
 *  Contenedor de acciones para la página home
 *
 *  @cont HOME
 *
 */
const HOME={
  /**
   *  Inicialización
   *
   *  @method HOME.init
   */
  init:()=>{
    HOME.load_plugins();
  },
  /**
   *  Carga e inicializacion de plugins
   *
   *  @method HOME.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      HOME.secuencia_ejecucion();
    });
  },
  /**
   *  Secuencia de ejecucion de scripts
   *
   *  @method HOME.secuencia_ejecucion
   */
  secuencia_ejecucion:()=>{
    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.APPLY_SELECTPICKERS();
    Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
    Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.QUICKSEARCH();
    Baratz.tmpls_actions.EMULATE_BMD();
    Baratz.tmpls_actions.CAROUSEL();
    Baratz.tmpls_actions.CTRL_LOADING();
    Baratz.tmpls_actions.CTRL_VIEWS();
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    //Baratz.commons.inputFilterLive();
    Baratz.commons.inputFilterLiveMarkjs();

    Baratz.commons.changeLibraryBranch();
    
    Baratz.commons.changeContentLibraryBranch();
    HOME.OPS.revisa_anchors();// revisa las anclas antes de lanzar el plugin para navegacion interna

    HOME.aria.alert_charge();// Muestra el alert de fin de carga de la ventana
    HOME.aria.alert_charge();// Muestra el alert de fin de carga de la ventana
    HOME.aria.alert_charge();// Muestra el alert de fin de carga de la ventana

  },

  OPS:{
    /**
     *  Uso para el plugin Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT
     *
     *  @method HOME.OPS.revisa_anchors
     *
     *  @details:
     *    - Establece la discriminación de uso para el plugin a traves del flag Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active
     *    - Inserta los attr y clases necesarias para el plugin de navegación anchors, teniendo en cuenta la inclusión de módulos desde back
     *
     */
    revisa_anchors:()=>{
      // ajustes navegación interna anclas
      $("#suggestions_recommendations,#suggestions_other_recommendations").removeAttr("data-skip_to_content");
      $("#recommendations_art_suggest_0").attr("data-skip_to_content","sct_other").find(".stc_title").addClass("anchor_title");
      // activar o desactivar la vista de navegacion interna,
      //sólo afectará a la vista ya que cada página carga su js. Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT(),
      //Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active=true;
      //Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT();
    }
  },

  aria:{
    /**
     *  Uso para el plugin Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT
     *
     *  @method HOME.aria.alert_charge
     *
     *  @details:
     *    - Muestra el texto informativo de fin de carga de la ventana
     *
     */
    alert_charge:()=>{
      // muestra alerta de fin de carga
      $(document).ready(function() {
        var $other = $('#sct_other');
        var $recomendations = $('#sct_recomendations');
        var $info = $('#info');
        var timeOutActualizaText;
        

        //funcion del timeout
        if (timeOutActualizaText) {
          clearTimeout();
        }
    
        //funcion timeout fin de carga de los más recientes

        if ($other.length != 0){
          
          timeOutActualizaText = setTimeout(function () {
            $("#c-polite_other").fadeOut(1500);
          }, 8000);
                    
        }
        
        //funcion timeout fin de carga de los recomendados

        if ($recomendations.length != 0){

          timeOutActualizaText = setTimeout(function () {
            $("#c-polite_recomendarions").fadeOut(1500);
          }, 8000);
        }

        //funcion timeout fin de carga de los enlaces

        if ($info.length != 0){

          timeOutActualizaText = setTimeout(function () {
            $("#c-polite_info").fadeOut(1500);
          }, 8000);
        }
      });
      
    }
  },
};
HOME.init();
