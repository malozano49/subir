  /**
   *  @file        : opac-reader-comments.js
   *
   *  @description : js de aplicación en la página comments
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
   *  Contenedor de acciones para la página datos personales
   *
   *  @cont COMMENTS
   *
   */
  const COMMENTS={
    /**
     *  Inicialización
     *
     *  @method COMMENTS.init
     */
    init:()=>{
      COMMENTS.load_plugins();
      $('.vista_reader').on('click','.btn_comment_delete', function(ev){
				ev.preventDefault();
				const ide = ev.currentTarget.id;
			  const bodycontent = Baratz.commons.opinions.modal_body('borrar', ide);
			  const modal = Baratz.commons.opinions.modal('modal_delete_comment_'+this.id,bodycontent,'Borrar una opinión','warning','delete');
			  $(document.body).append(modal);
			  document.querySelector('.modal-backdrop.fade').classList.add('show');
				document.getElementById('modal_delete_comment_'+this.id).classList.add('show');
				document.getElementById('modal_delete_comment_'+this.id).classList.add("d-block");
				$('.vista_reader').on('click','.btn_cerrar',function(){
				  if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
					document.querySelector('.modal.fade.show.d-block').remove();
				})
				
				$('.vista_reader').on('click','.btn_delete_comment', function(ev){
				 ev.preventDefault();	
		//	 console.log('opac-reader-comments.init.js click en borrar ev.currentTarget = ',ev.currentTarget)
				 const form = $('#commentsdel');	
			 	 const ide = Number($('.modal.show').attr('id').split('_')[3]);
				 form.find('#id').val(ide);
				 form.submit();
				 if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
				 document.querySelector('.modal').remove();
				}); 
				
				$('.vista_reader').on('click','.btn_borrar_comment', function(ev){
				 ev.preventDefault();	
			// console.log('opac-reader-comments.init.js click en borrar dentro .btn_borrar_comment = ',ev.currentTarget)
				 const form = $('#commentsdel');	
			 	 const ide = Number($('.modal.show').attr('id').split('_')[3]);
				 form.find('#id').val(ide);
				 document.querySelector('.loading').classList.add("in_view");
				 form.submit();
				 if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
				 document.querySelector('.modal').remove();
				 loading.classList.contains('in_view') && loading.classList.remove("in_view");
				}); 
				
				$('.vista_reader').on('click','.btn_eliminar_comment', function(ev){
				 ev.preventDefault();	
		//	 console.log('opac-reader-comments.init.js click en borrar ev.currentTarget = ',ev.currentTarget)
				 const form = $('#commentsdel');	
			 	 const ide = Number($('.modal.show').attr('id').split('_')[3]);
				 form.find('#id').val(ide);
				 form.submit();
				 if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
				 document.querySelector('.modal').remove();
				 
				}); 
	  	});
	  
	   	$('.vista_reader').on('click','.btn_borrar_comment', function(ev){
				 ev.preventDefault();	
			//console.log('opac-reader-comments.init.js click en borrar btn_borrar_comment fuera = ',ev.currentTarget)
				 const form = $('#commentsdel');	
			 	 const ide = Number($('.modal.show').attr('id').split('_')[3]);
				 form.find('#id').val(ide);
				 document.querySelector('.loading').classList.add("in_view");
				 form.submit();
				 if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
				 document.querySelector('.modal').remove();
				 loading.classList.contains('in_view') && loading.classList.remove("in_view");
				 
			}); 
	  
	   	$('.vista_reader').on('click','.btn_eliminar_comment', function(ev){
				 ev.preventDefault();	
			//	 console.log('opac-reader-comments.init.js click en borrar ev.currentTarget = ',ev.currentTarget)
				 const form = $('#commentsdel');	
			 	 const ide = Number($('.modal.show').attr('id').split('_')[3]);
				 form.find('#id').val(ide);
				 form.submit();
				 if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
				 document.querySelector('.modal').remove();
			}); 
			 $('.vista_reader').on('click', '.btn_update_comment', function(ev){	
				  ev.preventDefault();
				 // console.log('update en perfil')
			    const form = ev.currentTarget.closest('form');
      		const _csrf = form.querySelectorAll('[name="_csrf"]')[0].value;
		      const id = Number(form.querySelectorAll('[name="id"]')[0].value);
		      const action = form.action + '?id=' + id + '&_csrf=' + _csrf;
		     
		      $.ajax({
		        url: action,
		        type: "post",
		        headers: {
		          'X-CSRF-TOKEN': _csrf,
		          'Content-Type': 'application/json'
		        },
		        data: JSON.stringify({ _csrf: _csrf, id: id }),   //obtenemos el registro a modificar
		        success: (response, status, jqXHR) => {
		          if (response.indexOf('comments--form') >= 0) {
	            const modal = Baratz.commons.opinions.modal('modal_update_comments_' + id, response, Baratz.i18n_js.comment.modify, 'warning', 'update');	  
	            $(document.body).append(modal);	
	            const p = $("input[name='punctuation']:checked").val();
		            

	            const rstars = $('.vista_reader .all-stars li');
	            rstars.each((i,star)=>{
								if(i<p){
												star.classList.add('selecteds');
									  	}							
							})	          
		          } else {
		            console.log(Baratz.i18n_js.i18n_js.manager.controlPost.error.text);
		          }
		        },
		        error: xhr => {
		          console.log('error ', xhr)
		        }
		      })
			  });

				
			  $('.vista_reader').on('click','.comment-save-cancel', function (ev) { 
						ev.preventDefault();		
						if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
						document.querySelector('.modal.fade.show.d-block').remove();
          });
			  $('.vista_reader').on('click', '.comment-save',function(ev){
          	savecomment(ev);         	
          	
      	});
      	
      	const savecomment = function(ev){
					const modal_ = document.querySelector('.modal.show');
		      const form = modal_.querySelector('form');
      		const _csrf = form.querySelectorAll('[name="_csrf"]')[0].value;
		      const oaiIdentifierB64 =form.querySelectorAll('[name="oaiIdentifierB64"]')[0].value;
		      const reader = form.querySelectorAll("[name='reader']")[0].value; 
		      const id = form.querySelectorAll("[name='id']")[0].value; 
					const p = $("input[name='punctuation']:checked").val();
					const opinionline =form.querySelectorAll('[name="opinionline"]')[0].value;
					let opiniontext = form.querySelectorAll('[name="opiniontext"]')[0].value;
		      const url = form.action;
		     	const payload = {
            _csrf: _csrf,
            oaiIdentifierB64: oaiIdentifierB64,
            id: Number(id),
            reader: Number(reader),
            opinionline:opinionline,
            opiniontext:opiniontext,
            punctuation:p?Number(p):1,
          }
          
          const loading= document.querySelector('.loading');
          loading.classList.add("in_view");
          
          $.ajax({
	          url: url,
	          type: "post",
	          headers: {
	            'X-CSRF-TOKEN': _csrf,
	            'Content-Type': 'application/json'
	          },
	          data: JSON.stringify(payload),
	          success: (response, status, jqXHR) => {
	            if (response.indexOf('comments--form comments') > -1) {
	              $('.modal-body').empty().append(response);
	            } else {
					const parser = new DOMParser();
					const responsehtm = parser.parseFromString(response, 'text/html');
					const comments= responsehtm.querySelector('#comments');
					$('#error-front-opinionline').empty();
					$('#error-front-parrafo').empty(); 					
				    $('#comments-list-cont').empty().append(comments);            
	            }
	            loading.classList.contains('in_view') && loading.classList.remove("in_view");	   
	          },
	          error: xhr => {
	            $('.comments-error').empty().html(xhr.statusText + ' ' + xhr.status);
	            loading.classList.contains('in_view') && loading.classList.remove("in_view");
	          }
	        })  
	        
          $('.modal-backdrop.show').remove();
          $('.modal.modal_js.modal.fade.show').remove();
          $('body').removeClass('modal-open');    
		};
				$('.vista_reader').on('click', '.btn_cerrar.close',function(ev){
					if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
					document.querySelector('.modal.fade.show.d-block').remove();
				});
				$('.vista_reader').on('click','.radio-label', function(ev){
					const radios = document.querySelectorAll('.modal-body input[type="radio"');
					const cstars = $('.vista_reader .all-stars li');
					cstars.each((i,star)=>{
						star.classList.remove('selecteds');										
						radios[i].checked=false;
					})
					q = Number(ev.target.previousElementSibling.id.split('punctuation')[1]);
					ev.target.previousElementSibling.checked = true;
					for(let i=1;i<=q;i++){
					  document.querySelector('.modal-body #punctuation'+i).parentElement.classList.add('selecteds');
					}
				});
  },
    /**
     *  Carga e inicializacion de plugins
     *
     *  @method COMMENTNS.load_plugins
     */
    load_plugins:()=>{
      const listOfJS=[
        "js/commons/scripts.js",
        "js/commons/commons.js",
         "js/_tmpls/tmpl_comments.js",
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        COMMENTS.secuencia_ejecucion();
      });
    },
    /**
     *  Secuencia de ejecucion de scripts
     *
     *  @method COMMENTS.secuencia_ejecucion
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

  COMMENTS.init();
  console.log("[opac-reader-comments.init.js] CARGA");
