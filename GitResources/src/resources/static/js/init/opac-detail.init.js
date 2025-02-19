/**
 *  @file        : opac-detail.init.js
 *
 *  @description : js de aplicación en la página detalle del item
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
 *  Contenedor de acciones para la página detalle del item
 *
 *  @cont DETAIL
 *
 */
const DETAIL={
  /**
   *  Inicialización
   *
   *  @method DETAIL.init
   */
  init:()=>{
    Baratz.tmpls_actions.UTILS.target_scroll_anchor();
    DETAIL.load_plugins();    
  },
  /**
   *  Carga e inicialización de plugins
   *
   *  @method DETAIL.load_plugins
   */
  load_plugins:()=>{
    const listOfJS=[
      "js/commons/scripts.js",
      "js/commons/commons.js",
      "js/manager/opac-manager.recommended.js", // botón recomendar para modal manager
      "js/_tmpls/tmpl_detail.js",
      "js/init/opac-reader-comments.init.js",
    ];
    const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
    $.when(control).done(()=>{
      DETAIL.secuencia_ejecucion();
      DETAIL.local();
    });
  },
  /**
   *  Secuencia de ejecución de scripts
   *
   *  @method DETAIL.secuencia_ejecucion
   */
  secuencia_ejecucion: ()=>{

    Baratz.tmpls_actions.APPLY_SELECTPICKERS();

    // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);
    //Baratz.tmpls_actions.GENERAL();
    // ejecucion de fns para el template
    Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
    Baratz.tmpls_actions.BTNS_EXPAND_LOCATIONS();
    Baratz.tmpls_actions.TABLE_BIG_00();
    Baratz.tmpls_actions.BOTONERA_FLOTANTE();
    Baratz.tmpls_actions.MODALES_JS();
    Baratz.tmpls_actions.EMULATE_BMD();

    Baratz.tmpls_actions.CAROUSEL();

    Baratz.tmpls_actions.CTRL_VIEWS();
    Baratz.tmpls_actions.JSSOCIAL_SHARE();

    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    Baratz.detail.init();

  },
local: ()  => {
	
	
	$(".js-tabOpen").on("click", e => {
      /**
       * link actual
       * @type {JQuery}
       */
      let $linkClick = $(e.currentTarget);
      /**
       * link actual
       * @type {String}
       */
      let href = $linkClick.attr("href");
      /**
       * link actual
       * @type {JQuery}
       */
      let $dest = $(href);

      if ($dest.length) {

          $dest.trigger("focus");
          $dest.tab("show");
      }
    });
    
    //////////////////////////////////////////////
    // COMENTARIOS DESDE DETALLE
    ////////////////////////////////////////////
	if($('.average-rating')){
		let el = document.querySelector('div[data-id_element]');
		let _id = el ? el.getAttribute('data-id_element') : '';
		if(_id!='') {
			//Pintamos la pestaña comentarios
			$.ajax({
		        url   : Baratz.commons.opinions.listAjaxUrl+_id,
		        type  : "get",
		        beforeSend :()=>{ },
		        success : (response,status,jqXHR)=>{
					$('#tcomments').empty().append(response);
					//// Paginación \\\\
					$('#comments .lists-pagination ul a').on('click',function(ev){
						ev.preventDefault();
						Baratz.commons.opinions.pagination(ev);
					})			
					//// Borrar comentario \\\\
					$('.page_type_title .btn_comment_delete').on('click', function(ev){
						ev.preventDefault();
						//console.log('en detail.init delete click y llamo a commmons con ev ', ev)
						Baratz.commons.opinions.delete(ev);
						return false;
					});			
					/////  Modificar comentario \\\\
				  $('.page_type_title .btn_update_comment').on('click',function(ev){	
					  ev.preventDefault();
					  Baratz.commons.opinions.update(ev);
				  })
		  		//// Validar comentario (un usuario manager desde la vista de detalle) \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
				  $('.page_type_title .btn_comment_validate ').on('click', function(ev){
					 	ev.preventDefault();
						Baratz.commons.opinions.validate($(this))
				  })
				  $('.link.add-opinion').on('click',function(ev){	
						ev.preventDefault();		
						Baratz.commons.opinions.add(ev);
					})	
				},	
        error:xhr=>{
				console.log('error ',xhr);
      	}
      });
		}else{
			$('#tcomments').append('<p>'+i18n_js.alert.error.title_generic+'</p>');
		}	
	}
	//  /COMENTARIOS
	///////////////////////////////////////////////////////////////////////////////////
	
// cambiar formato
    $(".js-evn-formatChange").on("change", e => {
      /**
       * select de formato
       * @type {HTMLSelectElement}
       */
      let select;
      /**
       * índice seleccionado
       * @type {Number}
       */
      let selectSelectedIndex;
      /**
       * Atributo data-url del índice seleccionado (url de carga de formato)
       * @type {String}
       */
      let selectSelectedData;
      /**
       * mensaje-icono de carga de datos
       * @type {JQuery}
       */
      let $formatLoad;
      /**
       * mensaje-icono de carga de datos
       * @type {JQuery}
       */
      let $formatLoadI;

      select = /** @type {HTMLSelectElement} */ (e.currentTarget);

      selectSelectedIndex = select.selectedIndex;

      select.disabled = true;

      if (!isNaN(selectSelectedIndex)) {

        selectSelectedData = select.options[selectSelectedIndex].dataset.url;

        $formatLoad = $(".js-evn-formatLoad");

        $formatLoadI = $formatLoad.find(".icono");

        $formatLoad.removeClass("d-none");

        $formatLoadI.trigger("focus");

        if (selectSelectedData) {
          $.ajax({
            url: selectSelectedData,
            type: 'GET',
            success: results => {
              /**
               * Capa de datos actual
               * @type {JQuery}
               */
              let $formatDetail = $(".js-evn-formatDetail");
              /**
               * resultados ajax
               * @type {JQuery}
               */
              let $results = $(results);
              /**
               * Capa de datos Ajax
               * @type {JQuery}
               */
              let $resultsFormatDetail = $results.find(".js-evn-formatDetail");

              $formatDetail.replaceWith($resultsFormatDetail);

              $formatLoad.addClass("d-none");

              select.disabled = false;
              select.focus();
            },
            error: () => {
              $formatLoad.addClass("d-none");
              select.disabled = false;
              select.focus();
            }
          });
        }
      }

    });
	},
};

DETAIL.init();

