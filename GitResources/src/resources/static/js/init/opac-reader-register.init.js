/**
   *  @file        : opac-reader-register.init.js
   *
   *  @description : js de aplicación en la página buy suggestions
   *  @license     : baratz
   *  @copyright   : 2023
   *
   *  @author      : http://www.baratz.es/
   *  @date        : 2023-09-05
   *
   *  @validate    : https://jshint.com/
   */
  // jshint jquery :true, esversion:10
  /* globals Baratz */

  /**
   *  Contenedor de acciones para la página de alta de nuevo lector
   *
   *  @cont REGISTER
   *
   */
  const REGISTER={	
	
	/* urls para acciones de sugerencias de compra */
	
	/** REGISTER.urlChangeLibrary para cargar los tipos de lector cuando se cambia de biblioteca */
	urlChangeLibrary: '/OpacDiscovery/public/register/changeReaderType/',	
	
	
    /**
     *  Inicialización
     *
     *  @method REGISTER.init
     */
    init:()=>{
      REGISTER.load_plugins();
      
      document.body.addEventListener('change', function(ev) {
		
		if (ev.target.classList.contains('js-register-library')) {
			ev.preventDefault();
			const biblio = ev.target.value;
			REGISTER.changeLibrary(biblio);
		}	
})
      
      
      /**
       *  click del botón .btn_show_help
       */
      $('.btn_show_help').on("click",(e)=>{
          const $el=$(e.currentTarget);
          const isActive=$el.hasClass("active");
          if(!isActive){
            $el.addClass("active").attr("aria-expanded","true");
	          const $cont_help_with_button=$el.closest(".cont_help");
	          const $alert=$cont_help_with_button.find(".alert");
	          $alert.slideDown().find(".close").focus();
          }
          else{
            const $cont_help_with_button=$el.closest(".cont_help");
	          $cont_help_with_button.find(".alert").slideUp();
	          $el.removeClass("active").attr("aria-expanded","false").focus();
          }
          return false;
        });
        
        $('.alert-register-info .close').on("click",(e)=>{
	console.log(e.currentTarget)
					const $el=$(e.currentTarget);
          const $cont_help_with_button=$el.closest(".cont_help");
          const $btn=$cont_help_with_button.find(".btn_show_help");
          $cont_help_with_button.find(".alert").slideUp();
          $btn.removeClass("active").attr("aria-expanded","false").focus();
          return false;
				});
    },
    
    
    /**
	   * Cambia el select de tipo de lector en función de la biblioteca seleccionada.
		 * 
		 * @method REGISTER.changeLibrary
	   * @param {string} biblio - El valor de la biblioteca seleccionada.
	   */
	   
	   changeLibrary:(biblio)=> {
			
			const emptySelect = `<select aria-describedby=""" class="sub-cata-select form-control" name="readerType" id="readerType">
 									<option value="">Seleccione el tipo de lector</option>
 								</select>`
 				
 			if (!biblio) {
						document.querySelector('.js-type-reader').innerHTML = "";
						document.querySelector('.js-type-reader').innerHTML = emptySelect;
			} else {
				$.ajax({
				url: REGISTER.urlChangeLibrary+biblio,
				type: "get",
				success: (response, status, jqXHR) => {
					console.log("jqXHR", jqXHR);
					
					if( jqXHR.status === 200) {
						document.querySelector('.js-type-reader').innerHTML = "";
						document.querySelector('.js-type-reader').innerHTML = response;		
					}
				
				},
				error: (xhr) => {
							
						document.querySelector('body').innerHTML="";
						document.querySelector('body').innerHTML = xhr.responseText;
					}	
				})	
			}					
				
	},
	   
	   
	   
     
    /**
     *  Carga e inicializacion de plugins
     *
     *  @method REGISTER.load_plugins
     */
    load_plugins:()=>{
      const listOfJS=[
        "js/commons/scripts.js",
        "js/commons/commons.js",
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        REGISTER.secuencia_ejecucion();
      });
    },
    /**
     *  Secuencia de ejecucion de scripts
     *
     *  @method REGISTER.secuencia_ejecucion
     */
    secuencia_ejecucion:()=>{
      // para ver mensajes de consoleScript poner true en utils.js -> Baratz.tmpls_actions.UTILS.console_script(false);      
      Baratz.tmpls_actions.TUNNING_RADIO_CHECKS();
      Baratz.tmpls_actions.BOTONERA_FLOTANTE();
      Baratz.tmpls_actions.EMULATE_BMD();
      Baratz.tmpls_actions.APPLY_SELECTPICKERS();
      Baratz.tmpls_actions.CTRL_SELECT_ACTIONS();
      Baratz.tmpls_actions.CTRL_LOADING();
      Baratz.tmpls_actions.MODALES_JS();
      Baratz.tmpls_actions.CMP_SORTABLE();
      Baratz.tmpls_actions.BTN_MESSAGE();		
	}
}

  REGISTER.init();
  console.log("[opac-reader-register.init.js] CARGA");

