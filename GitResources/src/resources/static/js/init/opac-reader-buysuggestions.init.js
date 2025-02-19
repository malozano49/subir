  /**
   *  @file        : opac-reader-buysuggestions.init.js
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
   *  Contenedor de acciones para la página datos personales de sugerencias de compra
   *
   *  @cont BUYSUGGESTIONS
   *
   */
  const BUYSUGGESTIONS={
		/* urls para acciones de sugerencias de compra */
    /** BUYSUGGESTIONS.urlBSSave  para grabar una sugerencia de compra */		
		urlBSSave:  '/OpacDiscovery/reader/buysuggestions/add',
		
		/** BUYSUGGESTIONS.urlBSChageLybrary  para cargar las sucursales cuando se cambia de biblioteca */		
		urlBSChageLybrary:'/OpacDiscovery/reader/buysuggestions/changelibrary/',
		
    /**
     *  Inicialización
     *
     *  @method BUYSUGGESTIONS.init
     */
    init:()=>{
      BUYSUGGESTIONS.load_plugins();
      //onchange de biblioteca
     $('body').on('change', '#library',function(ev){
				ev.preventDefault();
				const biblio = $('#library').val();
				BUYSUGGESTIONS.changeLibrary(biblio);				    
    	});
    	//onclick de añadir sugerencia de compra
    	$('body').on('click','.busuggestion-save', function(ev){
				ev.preventDefault();				
				document.querySelectorAll('.error-front').forEach((err)=>{err.innerHTML=="";})
				BUYSUGGESTIONS.add();
			});
			//onclick de cancelar añadir sugerencia de compra, limpio el formulario
			$('body').on('click','.cancel_bs', function(ev){
				$('#form_addBuySuggestion').trigger('reset');
				ev.preventDefault();
			});
    },
     
    /**
     * Agrega una sugerencia de compra.
		 * 
		 *  @method BUYSUGGESTIONS.add 
     */   
    add:()=>{
			const myform = $('#form_addBuySuggestion');
			const isValid = BUYSUGGESTIONS.isvalid();
			
			const loading= document.querySelector('.loading')
			
			//if(isValid.pattern.valid && isValid.title && isValid.library){
			if(isValid.title && isValid.library){
				const payload = myform.serializeArray().reduce((acc, field) => {
					acc[field.name] = field.value;
			    return acc;
			  }, {});
			  loading.classList.add("in_view");
			  $.ajax({
          url: BUYSUGGESTIONS.urlBSSave,
          type: "post",
          headers: {
            'X-CSRF-TOKEN': payload._csrf,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(payload),
          success: (response, status, jqXHR) => {
						if(jqXHR.status===200){	
							const responsebody = BUYSUGGESTIONS.parseResponse(response);
    					document.body.innerHTML = responsebody.innerHTML;
							document.querySelector('.add-buysuggestion-button > button').focus();
						}else if(jqXHR.status===503){//aún está por definir qué se devuelve
							console.log('otro error controlado de los servicios');
							loading.classList.contains('in_view') && loading.classList.remove("in_view");							
						}						
          },
          error: (xhr) => {
				if(xhr.status===503){		
					console.log('otro error controlado de los servicios');	
					const responsebody = BUYSUGGESTIONS.parseResponse(xhr.responseText);
					document.body.innerHTML = responsebody.innerHTML;
				}if(xhr.status===406){
					console.log('error de validación desde servidor');					
					document.querySelector('#add_buysuggestions').innerHTML="";
					document.querySelector('#add_buysuggestions').innerHTML = xhr.responseText;						
				}else{
					document.querySelector('#add_buysuggestions').innerHTML="";
					document.querySelector('#add_buysuggestions').innerHTML = xhr.responseText;						
	           		$('.error').empty().html(xhr.statusText + ' ' + xhr.status);
           		}
           		loading.classList.contains('in_view') && loading.classList.remove("in_view");	
          	}
       	 })				
			}else{
				/*if(!isValid.pattern.valid){
					isValid.pattern.errors.forEach(function(field){
						console.log(document.querySelector('#'+field).nextElementSibling)
						document.querySelector('#'+field).nextElementSibling.innerHTML = "";
						document.querySelector('#'+field).nextElementSibling.innerHTML = "Ha introducido caracteres erróneos";
						document.querySelector('#'+field).focus();
						console.log(err);			
				})
				}*/
				if(!isValid.title){
					$('#title-error').empty().html(Baratz.i18n_js.buySuggestion.error_size);
					$('#title').focus();
				}
				if(!isValid.library){
					$('#library-error').empty().html(Baratz.i18n_js.buySuggestion.error_library);
					$('#library').focus();
				}
			}
		},
		/**
	   * Parsea la respuesta del servidor para poder añadirla al body.
		 * 
		 * @method BUYSUGGESTIONS.parseResponse
	   * @returns {Element} html del body de la respuesta
	   */
		parseResponse:(response)=>{
				const parser = new DOMParser();
				const htm = parser.parseFromString(response, 'text/html');
				return htm.querySelector('body');
		},
		/**
	   * Valida los campos del formulario de sugerencia de compra.
		 * 
		 * @method BUYSUGGESTIONS.isvalid
	   * @returns {Object} - Objeto con propiedades `title` y `library` que indican si los campos son válidos.
	   */
		isvalid:()=>{
		//	const patternresults = BUYSUGGESTIONS.validatePattern(document.querySelector('#form_addBuySuggestion'));
			const myform = $('#form_addBuySuggestion');
			const library = myform.find('#library')[0].value;
			const title = myform.find('#title')[0].value;
	 // return {pattern:patternresults, title: (title !== '' && title.length<=128),library: library !== ''};
	 		return {title: (title !== '' && title.length<=128),library: library !== ''};			
		},
		
		/**
	   * Valida si los campos del formulario cumplen el patrón /^[A-Za-z�-�0-9,.;:�!�?% -]*$/ .
		 * 
		 * @method BUYSUGGESTIONS.validatePattern
	   * @returns {Object} - Objeto con propiedades `valid` y `errors` que indican si 
		 * todos los campos validan el patrón y si no, devuelve los que no lo hacen.
	   */
		validatePattern:(form)=>{
			const inputPattern = /^[A-Za-zÀ-ÿ0-9-,'´.;:()¡!¿?% \n]*$/;
														
			let inputs = form.querySelectorAll('input, textarea');
			let numval = 0;
			let pattern_errors = [];
			if(inputs.length>0){
				inputs.forEach(function(input) {
					const inputValue = input.value;
					if(inputPattern.test(inputValue)){
						numval++;
					}else{
						pattern_errors.push(input.id)
					};
				});
			}
			return {valid:numval===inputs.length, errors:pattern_errors};
		},
			
		/**
	   * Cambia el select de sucursal en función de la biblioteca seleccionada.
		 * 
		 * @method BUYSUGGESTIONS.changeLibrary
	   * @param {string} library - El valor de la nueva biblioteca seleccionada.
	   */
		changeLibrary:(library)=>{
			$.ajax({
        url: BUYSUGGESTIONS.urlBSChageLybrary+library,
        type: "get",
        success: (response, status, jqXHR) => {
					if(jqXHR.status===200){
					//	console.log(response);
						const sucus =$('#library').closest(".selects_dependientes_js").find('#branch');
						const contselectpicker=sucus.closest(".cont_selectPicker");	
						// destruye el selectpicker					
						Baratz.tmpls_actions.APPLY_SELECTPICKERS(contselectpicker,true,true);
						 // Inserta nuevas opciones
						contselectpicker.empty().append(response);
						// Aplica la fn de dependencias
						if(sucus.find("option").length<=1){
		          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_add_disabled(sucus);
		        }
		        else{
		          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_remove_disabled(sucus);
		        }
		        // genera un nuevo selectpicker
		       Baratz.tmpls_actions.APPLY_SELECTPICKERS(contselectpicker,true);
        	}else if(jqXHR.status===503){//aún está por definir qué se devuelve
						console.log('otro error controlado de los servicios');
					}
				},
	      error:(request,status,error)=>{
	        console.log("[buysuggestions.js] No se ha podido recuperar la lista de sucursales:::",`${error}\r\n${request.statusText}\r\n${request.responseText}`);
      	}
			})   
		},
		
    /**
     *  Carga e inicializacion de plugins
     *
     *  @method BUYSUGGESTIONS.load_plugins
     */
    load_plugins:()=>{
      const listOfJS=[
        "js/commons/scripts.js",
        "js/commons/commons.js",
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        BUYSUGGESTIONS.secuencia_ejecucion();
      });
    },
    /**
     *  Secuencia de ejecucion de scripts
     *
     *  @method BUYSUGGESTIONS.secuencia_ejecucion
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
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize();
    // Aplica acciones sobre los eventos a los botones .btn_record (tambien en menu header dropdown `últimas búsquedas`)
    Baratz.tmpls_actions.BTN_MESSAGE();

    //Baratz.commons.inputFilterLive();
    Baratz.commons.inputFilterLiveMarkjs();

    Baratz.commons.changeLibraryBranch();
    
    Baratz.commons.changeContentLibraryBranch();
	}
}

  BUYSUGGESTIONS.init();
  console.log("[opac-reader-buysuggestions.init.js] CARGA");
