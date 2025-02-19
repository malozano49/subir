/**
   *  @file        : opac-reader-suggestions.init.js
   *
   *  @description : js de aplicación en la página suggestions
   *  @license     : baratz
   *  @copyright   : 2023
   *
   *  @author      : http://www.baratz.es/
   *  @date        : 2023-10-19
   *
   *  @validate    : https://jshint.com/
   */
  // jshint jquery :true, esversion:10
  /* globals Baratz */

  /**
   *  Contenedor de acciones para la página datos personales de sugerencias
   *
   *  @cont SUGGESTIONS
   *
   */
   
   const SUGGESTIONS={
	/* urls para acciones de sugerencias */
    
    /* SUGGESTIONS.urlSugSave  para grabar una sugerencia */		
		urlSugSave:  '/OpacDiscovery/reader/suggestions/add',	
	
	/* SUGGESTIONS.urlSugDelete  para eliminar una sugerencia */		
		urlSugDelete:  '/OpacDiscovery/reader/suggestions/delete',
	
	/**
     *  Inicialización
     *
     *  @method SUGGESTIONS.init
     */
    init:()=>{
      SUGGESTIONS.load_plugins();
      
     	document.body.addEventListener('keydown', function(ev) {
	
			if(ev.target.classList.contains('js-suggestion-textarea')) {
				if(ev.keyCode === 13 && !ev.shiftKey) {
					 ev.preventDefault();
					 return false;
				}
			}
			
})
     
		document.body.addEventListener('click', function(ev) {
			
			//onClick para abrir popup de añadir sugerencia
			if (ev.target.classList.contains('open-addsuggestion-modal')) {
				ev.preventDefault();
				const modalBody = document.querySelector('#add_suggestions').innerHTML;
				const addModal = SUGGESTIONS.createModal('modal_add_suggestion', modalBody, Baratz.i18n_js.suggestion.add, 'light', 'add');
				$(document.body).append(addModal);
				}
							
			//onclick para abrir popup de eliminar sugerencia
			if (ev.target.classList.contains('open-delsuggestion-modal')) {
				ev.preventDefault();
				const deleteForm = ev.target.closest('form');
				
				const _csrf = deleteForm.querySelector('input[name="_csrf"]').value;
				const id = deleteForm.querySelector('input[name="id"]').value;			
				const modalBody = SUGGESTIONS.createDeleteMsg(_csrf, id);
				const removeModal = SUGGESTIONS.createModal('modal_remove_suggestion', modalBody, Baratz.i18n_js.suggestion.delete, 'warning', 'delete');
				$(document.body).append(removeModal);
			}
			
			//onclick para cerrar popups
			if (ev.target.classList.contains('close-suggestion-btn')) {			
				ev.preventDefault();
				const addModal = document.getElementById('modal_add_suggestion');
				const deleteModal = document.getElementById('modal_remove_suggestion');
				
				if(addModal) {
					SUGGESTIONS.closeModal(addModal);
				} else if (deleteModal) {
					SUGGESTIONS.closeModal(deleteModal);
				}				
			}

			//onclick de añadir sugerencia
			if (ev.target.classList.contains('save-suggestion-btn')) {
				ev.preventDefault();
				SUGGESTIONS.add();
			}
			
			//onclick de eliminar sugerencia en popup
			if (ev.target.classList.contains('delete-suggestion-btn')) {
				ev.preventDefault();
				SUGGESTIONS.delete();
			}
		})
    },

	/**
     * Crear la modal
		 * 
		 *  @method SUGGESTIONS.createModal 
     */  
	createModal:(id, body, title, type, action)=> {
		 let cls = action === 'add' ? 'modal-lg' : '';

      const modal = `
		 <div class="modal-backdrop fade show"></div>
		 <div id="${id}" class="modal_${action}_suggestions modal_js modal_type_${type} modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="modalTitle_${id}" aria-modal="true" >
		 	<div class="modal-dialog ${cls}" role="document">
	            <div class="modal-content">
	              <div class="modal-header">
	              	<div id="modalTitle_${id}" class="modal-title">${title}</div>                
	                 <button class="btn_cerrar close close-suggestion-btn" data-dismiss="modal" type="button" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}" title="${Baratz.i18n_js.modales_js.btn_cerrar_txt}">
	                    <span aria-hidden="true">x</span>
	                </button>
	              </div>
	              <div class="modal-body">                
				    ${body}
				  </div>
	            </div>
	          </div>        
	     </div>`;

      return modal;
	},
	
	/**
     * Body de la modal de eliminar mensaje
		 * 
		 *  @method SUGGESTIONS.createDeleteMsg 
     */  
	createDeleteMsg:(_csrf, id)=> {
		
      const body = `
		 <p>${Baratz.i18n_js.suggestion.delete_confirm}</p>       
	     <div class="modal-footer">
	     <button class="btn btn-outline-secondary close-suggestion-btn" type="button" aria-label="${Baratz.i18n_js.suggestion.cancel_button}">${Baratz.i18n_js.suggestion.cancel_button}</button>
			<button class="btn btn-outline-primary delete-suggestion-btn" type="button" aria-label="${Baratz.i18n_js.suggestion.delete_button}">
				${Baratz.i18n_js.suggestion.delete_button}
					<input type="hidden" name="id" value="${id}">
	     		<input type="hidden" name="_csrf" value="${_csrf}">
			</button>
			
		</div>
	     `;

      return body;
	},
	
	/**
     * Cerrar la modal
		 * 
		 *  @method SUGGESTIONS.closeModal 
     */
     
     closeModal:(myModal)=> {
		const fadeBackground = document.querySelector('.modal-backdrop.fade.show');		
		myModal.remove()
		fadeBackground.remove();
	},

    
    /**
     * Agregar una sugerencia
		 * 
		 *  @method SUGGESTIONS.add 
     */   
    
   	add:()=>{
		
		const addModal = document.querySelector(`.modal_add_suggestions`);
		const modal_form = document.querySelector('#modal_add_suggestion form');
		const input = modal_form.querySelector('textarea[name="comment"]');
		const _csrf = document.querySelector('input[name="_csrf"]').value;
		const inputPattern = /^[A-Za-zÀ-ÿ0-9-,'´.;:()¡!¿?% \n]*$/;
		const inputContainer = modal_form.querySelector('.cont_textarea');
		
		const loading= document.querySelector('.loading')

		const payload = {
				_csrf:_csrf,
				comment: input.value 
			}
		
		const msgSpan = document.createElement('span');		
		msgSpan.classList.add("error");
		msgSpan.classList.add("error-valid-sug");
			
		function changeSpanMsg(msg) {			
			msgSpan.textContent = "";
			msgSpan.textContent = msg;
			inputContainer.appendChild(msgSpan);
		}
		
		document.querySelector('.error-valid-sug') && document.querySelector('.error-valid-sug').remove() 
		
		
		if ( input.value.length === 0) {
			changeSpanMsg(Baratz.i18n_js.suggestion.error_required)		
		} 
			
		else if (input.minLength && input.value.length > 0 && input.value.length < input.minLength) {
			changeSpanMsg(Baratz.i18n_js.suggestion.error_min)
				
		} 
			
		else if (!inputPattern.test(input.value)) {				
				changeSpanMsg(Baratz.i18n_js.suggestion.error_restricted)
				
		} else {
				loading.classList.add("in_view");
				$.ajax({
			      url: SUGGESTIONS.urlSugSave,
			      type: "post",
			      headers: {
			        'X-CSRF-TOKEN': _csrf,
			        'Content-Type': 'application/json'
			      },
			      
			      data: JSON.stringify(payload),
			
		          success: (response, status, jqXHR) => {
						document.querySelector('body').innerHTML = response;		
					},
						
				 	error: (xhr) => {
							if(xhr.status===503){
								console.log('otro error controlado de los servicios');
								const parser = new DOMParser();
								const htm = parser.parseFromString(xhr.responseText, 'text/html');
								const responsebody = htm.querySelector('.cont_data_loans');
								document.querySelector('.cont_data_loans').innerHTML = responsebody.innerHTML;		
							} else {
								console.log('error de validación desde servidor', xhr.responseText)
					           	}
					           	loading.classList.contains('in_view') && loading.classList.remove("in_view");
					           	
					          }
						})
						
					SUGGESTIONS.closeModal(addModal);
				}			 
   		 },
   		 
   		 
   	/**
     * Elimina una sugerencia
		 * 
		 *  @method SUGGESTIONS.delete 
     */ 	 
   
  	delete:()=> {
	const deleteModal = document.querySelector(`.modal_delete_suggestions`);
	const deleteBtn = document.querySelector('.delete-suggestion-btn');
	const _csrf = deleteBtn.querySelector('input[name="_csrf"]').value;
	const id = deleteBtn.querySelector('input[name="id"]').value;
	
	const loading= document.querySelector('.loading')
	
	const payload = {
		_csrf:_csrf,
		id: Number(id) 
	}
		loading.classList.add("in_view");
		
		$.ajax({
	      url: SUGGESTIONS.urlSugDelete +'?id='+id,
	      type: "post",
	      headers: {
	        'X-CSRF-TOKEN': _csrf,
	        'Content-Type': 'application/json'
	      },
	     data: JSON.stringify(payload),
	        success: (response, status, jqXHR) => {
					const parser = new DOMParser();
					const htm = parser.parseFromString(response, 'text/html');
					const responsebody = htm.querySelector('.cont_data_loans');
					document.querySelector('.cont_data_loans').innerHTML = responsebody.innerHTML;
					loading.classList.contains('in_view') && loading.classList.remove("in_view");						
			},
			
			error: (xhr) => {
							if(xhr.status===503){
								console.log('otro error controlado de los servicios');
								const parser = new DOMParser();
								const htm = parser.parseFromString(xhr.responseText, 'text/html');
								const responsebody = htm.querySelector('.cont_data_loans');
								document.querySelector('.cont_data_loans').innerHTML = responsebody.innerHTML;		
							} else {
								console.log('error de validación desde servidor', xhr.responseText)
					           	}
					           	loading.classList.contains('in_view') && loading.classList.remove("in_view");
					          }			          
						})   
			
	  		SUGGESTIONS.closeModal(deleteModal)

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
        SUGGESTIONS.secuencia_ejecucion();
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
      Baratz.tmpls_actions.BTN_MESSAGE();	
	}	
}

  SUGGESTIONS.init();
  //console.log("[opac-reader-suggestions.init.js] CARGA");