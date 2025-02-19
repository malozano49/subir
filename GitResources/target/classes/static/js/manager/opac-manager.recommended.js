/**
 *  @file        : opac-manager.recommended.js
 *
 *  @description : js de aplicación en la página de manager títulos recomendados
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 *
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath*/

console.log("[opac-manager.recommended.js] CARGA");

if (!Baratz.manager_recomended){
  Baratz.manager_recomended={
    recommendedUrl : `${BaratzContextPath}manager/recommended/add/`,
  };
}

/**
 *  Contenedor de acciones en la pestaña administración catálogo
 *
 *  @obj Baratz.manager_recomended
 */
Object.assign(Baratz.manager_recomended,{

  init:()=>{
    const $cont_views=$(document.body).find(".cont_views");
    $cont_views.each((i,e)=>{
      const $cont=$(e);
      Baratz.manager_recomended.accesible.pagination($cont);
      Baratz.manager_recomended.events.listItems($cont);
    });
  },

  /**
   *  Pintado de los mensajes alert con los datos recibidos de la peticiones
   *
   *  @method Baratz.manager_recomended.controlPost
   *
   *  @param {object} datos  : datos de modal
   *  @param {data}   data   : datos recibidos de la petición para la gestión de los mensajes en las alertas
   *  @param {string} action : acción realizada ("operation-delete","operation-modify"...)
   *  @param {dom object} $cont_alert [opcional]: contenedor donde mostrar los mensajes de alerta
   */
  controlPost:async (datos,data,action,$cont_alert)=>{
    // Aporta datos de la vista para discriminar acciones en Baratz.commons.controlPost
    data.view={
      name:"manager-recommended"
    };
    const retorno=await Baratz.commons.controlPost(datos,data,action,$cont_alert);
    // operaciones de pintado según resultados
    if(!retorno.error){
      const $pagina=data.renderedTemplate;
      let $contenedor;
      switch(action){
        case"operation-moveItem":{
          // recupera el contenedor donde recargar el fragmento de pagina devuelta
          $contenedor=datos.modal.$lanzador.closest(".cont_views");
          // al cerrar la modal se pinta página para evitar problemas con el evento en scripts.js
          datos.modal.$modal.on("hidden.bs.modal", ()=>{
            // La lista se repinta ya que el item se ha movido de sitio ó eliminado de la lista
            Baratz.manager_recomended.pinta_pagina($pagina,$contenedor,datos);
          });
          // oculta la modal, ya que no se lanza el evento bs.modal.hidden
          datos.modal.$modal.modal('hide');
        }
        break;
        case"operation-delete":{
          // recupera el contenedor donde recargar el fragmento de pagina devuelta
          $contenedor=datos.modal.$lanzador.closest(".cont_views");
          // oculta la modal, ya que no se lanza el eevnto hidden
          datos.modal.$modal.modal('hide');
          $(document.body).removeClass("modal-open").removeAttr("style").find(".modal-backdrop").remove();
          // La lista se repinta ya que el item se ha movido de sitio ó eliminado de la lista
          Baratz.manager_recomended.pinta_pagina($pagina,$contenedor,datos);
        }
        break;
        default:
      }
    }
  },

  /**
   *  Ajustes para accesibilidad en la vista
   *
   *  @cont Baratz.manager_recomended.accesible
   */
  accesible:{
    /**
     *  A efectos de accesibilidad hay que cambiar el id del aria-labelledby del nav y el correspondiente del titulo h3 en las paginaciones
     *  Tambien al cargar el contenedor al actuar sobre la paginacion de items
     *
     *  @method Baratz.manager_recomended.accesible.pagination
     *
     *  @param {dom object} $cont_view : Capa afectada
     */
    pagination:($cont_view)=>{
      const $navs=$cont_view.find(".pagination_normal nav");
      $.each($navs,(i,e)=>{
        const $nav=$(e);
        const $title_pagination=$nav.find(".title_pagination");
        const randomId=$title_pagination.attr("id")+'_'+Baratz.tmpls_actions.UTILS.randomId();
        $title_pagination.attr("id",randomId);
        $nav.attr("aria-labelledby",randomId);
      });
    }

  },

  /**
   *  Contenedro de acciones sobre los eventos
   *
   *  @cont events
   */
  events:{
    /**
     *  Reaplicación de eventos en la recarga de las páginas de la lista
     *
     *  @method Baratz.manager_recomended.events.listItems
     *
     *  @param {dom object} $contenedor: $contenedor donde se ha pintado la página para reaplicar los eventos necesarios
     */
    listItems:$contenedor=>{
      // imagenes en los items
      Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");

      // botones con modal
      const $btns_modales=$contenedor.find("button.modal_js");
      Baratz.tmpls_actions.MODALES_JS($btns_modales);

      // botones de paginacion, cargan sólo el contenedor afectado
      $contenedor.find(".pagination .btn").on("click",e=>{

        Baratz.tmpls_actions.UTILS.loading.pinta($contenedor);

        const $btn=$(e.currentTarget);
        const $cont_alert=$btn.closest(".cont_collapse").find(".alerts_actions");
        const datos={
          modal:{
           $modal:$btn.closest(".cont_collapse")
          }
        };
        const code=$btn.closest(".cont_views").find(".tabla-main").attr("data-code");
        const $pagination_normal=$btn.closest(".pagination_normal");
        const page_active=Number($pagination_normal.attr("data-page_active"));
        const pages_total=Number($pagination_normal.attr("data-pages_total"));
        let page=0;
        const btn_type=$btn.attr("data-type");
        switch(btn_type){
          case"back":{
            if(page_active>1){
              page=page_active-1;
            }
          }
          break;
          case"initial":{
            page=1;
          }
          break;
          case"paginate":{
            page=Number($btn.text());
          }
          break;
          case"intermediate":{

          }
          break;
          case"final":{
            page=Number($btn.find(".btn_title").text());
          }
          break;
          case"next":{
            if(page_active<pages_total){
              page=page_active+1;
            }
          }
          break;
          default:
        }
        // MANAGEMENT_AREA_PATH + "/recommended/{code}/{page}";
        const urlPage=`${BaratzContextPath}manager/recommended/${code}/${page}`;
        $.get(urlPage,data=>{
          //console.log("[opac-manager.recommended] Baratz.manager_recomended.events.listItems() urlPage",urlPage);
        }).done(data=>{
          const $pagina=data.renderedTemplate;
          Baratz.manager_recomended.pinta_pagina($pagina,$contenedor,datos);
        }).fail(function(data){
          console.log("[opac-manager.recommended] Baratz.manager_recomended.events.listItems() ERROR EN LA PETICION... urlPage",urlPage);
          const action="operation-pagination";
          Baratz.manager_recomended.controlPost(datos,data,action,$cont_alert);
        });
        return false;
      });
    },

  },

  /**
   *  Realiza la petición para mover un item
   *
   *  @method Baratz.manager_recomended.move_item_tabla
   *
   *  @param {object} datos : datos de la modal
   */
  move_item_tabla:datos=>{
    const $modal        = datos.modal.$modal;
    const $btn_lanzador = datos.modal.$lanzador;
    const code          = $btn_lanzador.closest(".tabla-main").attr("data-code");
    const titleId       = $btn_lanzador.closest("li").attr("data-id");
    const page          = Number($btn_lanzador.closest(".cont_views").find(".cont_pagination:first .pagination_normal").attr("data-page_active"));
    const view_in_page  = ($modal.find('[name="check_reposicionamiento"]').attr("checked")==="checked");
    const recommended_new_position = Number($modal.find('input[name="recommended_new_position"]').val());
    const urlMove = `${BaratzContextPath}manager/recommended/move/`;
    const action  = "operation-moveItem";
    const $form = $modal.find('form');
    const _csrf= $( "[name*='_csrf']" ).val();
    // guarda los datos necesarios en el objeto de la modal para su uso posterior
    datos.modal.datos={
      page_old                 : page,
      titleId                  : titleId,
      action                   : action,
      view_in_page             : view_in_page,
      recommended_new_position : recommended_new_position
    };
 
   $.ajax({
		url:urlMove,
		type: 'POST',
		headers: {
              'X-CSRF-TOKEN': _csrf,
              'Content-Type':'application/json'
          },
    	data:JSON.stringify({
			action:true,
			code,
			page,
			titleId,
			recommended_new_position,
			view_in_page		
		}),    	
		success:(data)=>{
	  const $cont_alert=$btn_lanzador.closest(".cont_collapse").find(".alerts_actions");
      Baratz.manager_recomended.controlPost(datos,data,action,$cont_alert);

       },
       error:(data)=>{	  
	   console.log("[opac-manager.recommended] Baratz.manager_recomended.move_item_tabla() ERROR EN LA PETICION... urlMove",urlMove);
      const $cont_alert=$modal.find(".alerts_action");
      Baratz.manager_recomended.controlPost(datos,data,action,$cont_alert);     
      }
    });
     
  },

  /**
   *  Eventos sobre la modal de reposicionamiento de item en la lista
   *
   *  @method Baratz.manager_recomended.moveItemModalEvents
   *
   *  @param {object} datos_modal: datos recibidos desde la modal
   */
  moveItemModalEvents:datos_modal=>{
    const $modalreposition = datos_modal.modal.$modal;
    const $alerts_action=$modalreposition.find(".alerts_action");
    // boton borrar contenido del input
    $modalreposition.find(".btn_cancelar").on("click",e=>{
      const $btn              = $(e.currentTarget);
      const $cont_form_group  = $btn.closest(".cont_form_group");
      const $cont_input       = $cont_form_group.find(".cont_input");
      const $input            = $cont_form_group.find(".form-control");
      $input.val("");
      $cont_input.removeClass("is-filled");
      return false;
    });
    // boton mover item
    $modalreposition.find(".btn_mover").on("click",e=>{
      const $cont_input=$modalreposition.find(".cont_input");
      // pinta estructura del alert de respuesta
      const $alert=Baratz.tmpls_actions.ALERTA.pintaEstructura($alerts_action,"html");
      // validacion de blancos
      const $input=$cont_input.find(".form-control");
      if($input.val().trim()===""){
        const textos={
          texto: Baratz.i18n_js.manager.moveItemModalEvents.btn_mover.error_no_reposition
        };
        Baratz.tmpls_actions.ALERTA.error($alert,textos);
      }
      else{
        // pinta un alert-warning para la espera de respuesta
        Baratz.tmpls_actions.ALERTA.progreso($alert);
        Baratz.manager_recomended.move_item_tabla(datos_modal);
      }
      return false;
    });
  },

  /**
   *  Pinta el fragmento de pagina retornado por back con la paginacion y datos actualizados correctamente (tanto borrar como mover como paginar)
   *
   *  @method Baratz.manager_recomended.pinta_pagina
   *
   *  @param {dom object} $pagina : pagina recibida desde el back a insertar en el contenedor
   *  @param {dom object} $contenedor : contenedor donde pintar el html de la página recibida
   *  @param {object} [opt] datos : datos que pueden ser necesarios para el pintado, por ejemplo de las modales
   */
  pinta_pagina:($pagina, $contenedor, datos)=>{
    // recupera el html a insertar
    const $cont_html=$contenedor.closest(".cont_html");
    $cont_html.html($pagina);
    $contenedor=$cont_html.find(".cont_views");
    // Aplica accesibilidad
    Baratz.manager_recomended.accesible.pagination($contenedor);
    // aplica eventos
    Baratz.manager_recomended.events.listItems($contenedor);
    // evalua las acciones a realizar a través de los datos aportados
    const datos_modal=datos.modal.datos;
    if(typeof(datos_modal)!=="undefined" && datos_modal!==null){
      const action=datos_modal.action;
      let $cont_alert;
      let $alert;
      let textos;
      switch(action){
        case"operation-moveItem":{
          // si el item se mueve, despues de la recarga de la página, si está marcada la opcion de vista en página, o la página es la misma
          // debe de aportarse el foco en el item, si no está marcado el check de la modal se pone el foco en el primer elemento de la tabla en vista
          const $item=$contenedor.find(`[data-id="${datos_modal.titleId}"]`);
          //const page_active=Number($contenedor.find(".cont_pagination:first .pagination_normal").attr("data-page_active"));
          if(datos_modal.view_in_page){
            $item.addClass("action_ok").find(".cont_title").focus();
            setTimeout(()=>{
              $item.removeClass("action_ok");
            },1000);
          }
          else{
            $contenedor.find(".tabla-main li").eq(0).find(".cont_title").focus();
          }
          $cont_alert=$cont_html.parent().find(".alerts_actions");
          $alert=Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert,"html");
          textos={
            titulo: Baratz.i18n_js.alert.success.title_generic,
            texto: `${Baratz.i18n_js.manager.manager_recomended.pinta_pagina.moveItem.alert.text} ${datos_modal.recommended_new_position}`
          };
          Baratz.tmpls_actions.ALERTA.exito($alert,textos);
        }
        break;
        case"operation-delete":{
          // Pinta mensaje y foco en el primer elemento de la página
          $cont_alert=$cont_html.parent().find(".alerts_actions");
          $alert=Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert,"html");
          textos={
            titulo  : Baratz.i18n_js.alert.success.title_generic,
            texto   : Baratz.i18n_js.manager.manager_recomended.pinta_pagina.deleteItem.alert.text
          };
          Baratz.tmpls_actions.ALERTA.exito($alert,textos);
          $cont_html.find(".cont_title:first").focus();
        }
        break;
        default:
      }
    }
  },

  /**
   *  Elimina un item de la lista a través de boton borrar de la modal de confirmación
   *
   *  @method Baratz.manager_recomended.deleteItemModalEvents
   *
   *  @param {object} datos : datos de la modal
   */
  deleteItemModalEvents:datos=>{
    const $modal        = datos.modal.$modal;
    const $btn_lanzador = datos.modal.$lanzador;
    const code          = $btn_lanzador.closest(".tabla-main").attr("data-code");
    const titleId       = $btn_lanzador.closest("li").attr("data-id");
    const page          = Number($btn_lanzador.closest(".cont_views").find(".cont_pagination:first .pagination_normal").attr("data-page_active"));
    const urlDelete     = `${BaratzContextPath}manager/recommended/delete`;
    const actionControlPost  = "operation-delete";
    // guarda los datos necesarios en el objeto de la modal para su uso posterior
    datos.modal.datos={
      action : actionControlPost,
    };
    // boton borrar enlace de la modal
    const $btn_borrar=$modal.find(".btn_borrar");
    $btn_borrar.on("click",e=>{
      const $cont_alert = $modal.find(".alerts_action");
      const $alert      = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert,"html");
	  const _csrf=$(document.body).find('[name="_csrf"]').eq(0).val();	 
      Baratz.tmpls_actions.ALERTA.progreso($alert);
      
		$.ajax({
		url:urlDelete,
		headers: {
              'X-CSRF-TOKEN': _csrf,
              'Content-Type':'application/json'
          },
		type: 'POST',
    	data:JSON.stringify({
			action:true,
			levelCode:code,
			page:page,
			titleId:titleId
		
		}),    	
		success:(data)=>{
	    const $cont_alert=$btn_lanzador.closest(".cont_collapse").find(".alerts_actions");
        Baratz.manager_recomended.controlPost(datos,data,actionControlPost,$cont_alert);

       },
       error:(data)=>{	 
	console.log("[opac-manager.recommended] Baratz.manager_recomended.deleteItemModalEvents() ERROR EN LA PETICION... urlDelete",urlDelete);
        Baratz.manager_recomended.controlPost(datos,data,actionControlPost,$cont_alert);      
      }
    });
 
    });
  },

  /**
   *  Contenedor de acciones para la modal modal_recommended_levels en user manager
   *
   *  @cont Baratz.manager_recomended.modal_recommended_levels
   */
  modal_recommended_levels:{

    /**
     *  Manager con varios nivel de gestion: Aplica acciones sobre los eventos a los botones .btn_recommended_level
     *
     *  @method Baratz.manager_recomended.modal_recommended_levels.init
     *
     *  @details NO SE ENCUENTRA EL LANZAMIENTO DE ESTA FN
     */
    init:()=>{
      const $body=$(document.body);
      const $btn=$body.find('.btn_recommended_level');
      if($btn.length>0){
        const $recommendedLevels = $body.find('input.level_recommended:checked');
        if ($recommendedLevels.length>0){
          Baratz.manager_recomended.recommend.btn.active($btn);
        }
        else{
          Baratz.manager_recomended.recommend.btn.deactive($btn);
        }
      }
    },

    /**
     *  Modal recomendados multinivel
     *
     *  @method Baratz.manager_recomended.modal_recommended_levels.manage
     *
     *  @param {obj} datos_adjuntos: datos de la modal
     */
    manage:datos_adjuntos=>{
      const $body=$(document.body);
      const $btn_lanzador = datos_adjuntos.modal.$lanzador;
      const $modal = datos_adjuntos.modal.$modal;

      // Al click en Aceptar
      $modal.find(".btn.btn-add-recommended").on("click",()=>{
        const $form       = $modal.find('form');
        const urlAdd      = $form.attr("action");
        const $cont_alert = $modal.find(".alerts_action");
        const fcsrf  =   $form.find('[name="_csrf"]').val();
        const data_id =  $form.find('[name="id"]').val();
        let level = [];
        $form.find('input[name="levelRecommended"]:checked').each(function() {
        	level.push($(this).val());
        });
        Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert,"html");
        if(level.length>0){
					$('cont_alerts').empty()
	        $.ajax({
	    		url:urlAdd,
	    		type: 'POST',
	    		headers: {
	                  'X-CSRF-TOKEN': fcsrf,
	                  'Content-Type':'application/json'
	              },
	        	data:JSON.stringify({
	        		id: data_id,
	    			levelRecommended:level
	    		}),
	        	success :(data)=>{
	        		const action="operation-recommended-gestion";
	                // pinta mensajes y devuelve un formateo del dato recibido
	                const retorno=Baratz.commons.controlPost(datos_adjuntos,data,action,$cont_alert);
	                // Cambio de color en los checks .data_prueba (segun su value) de la modal de recomendar, si se indica en la respuesta
	                Baratz.manager_recomended.modal_recommended_levels.ctrl_val_checks(retorno.outData,retorno.inData,$modal);
	                // si el retorna exito
	                let title;
	                if(retorno.exito){
	                  // data.num devuelve el numero de sucursales donde se ha podido efectuar la recomendación, de las seleccionadas
	                  const inserciones_exito=(data.num>0);
	                  if(inserciones_exito){
	                    $btn_lanzador.addClass("active");
	                    title=$btn_lanzador.attr("data-message_activo");
	                  }
	                  else{
	                    $btn_lanzador.removeClass("active");
	                    title=$btn_lanzador.attr("data-message_no_activo");
	                  }
	                  // Pinta title y aria
	                  $btn_lanzador.attr({"title":title,"aria-label":title});
	
	                  // data.recommendedSize es la cantidad total de items recomendados por el usuario (no sucursales)
	                  const total=data.recommendedSize;
	                  // Modifica totales de todos los botones de la vista si es una lista
	                  const $ul=$btn_lanzador.closest("ul");
	                  if($ul.length==1){
	                    const $btn_recommended=$ul.find(".btn_recommended");
	                    $.each($btn_recommended,(i,e)=>{
	                      $(e).attr("data-recommended-size",total);
	                    });
	                  }
	                  else{
	                    $btn_lanzador.attr("data-recommended-size",total);
	                  }
	
	                  // Evalua el pintado en todos los botones recomendar y pinta los mensajes adecuados
	                  // NOTA: No se puede controlar los limites por sucursal ya que no se devuelve en la respuesta
	                  // Se comenta esta linea para que no se pinte el control de limites
	                  // Baratz.manager_recomended.recommend.btn.limit_check($btn_lanzador);
	
	                  ///////////////////////////////////////////////////////////////////////////////////////////
	                  // Aplica los cambios en el html de la página para reiniciar la modal cuando se cierre
	                  ///////////////////////////////////////////////////////////////////////////////////////////
	                  // Contenido inicial de la modal
	                  const tag_html=$btn_lanzador.attr("data-modal_html");
	                  const $html_inner=$body.find(tag_html);
	                  // recupera el form de la modal (y modificado), y lo aplica en el inicial del dom para guardar los cambios para su próxima reapertura
	                  const $form_modal=$modal.find("form").clone(true);
	                  $html_inner.html($form_modal);
	                }
	                else{
	                  // si hay error se deja como está ya que se pinta el error y se espera accion del user
	                }
	        	}
	        });           
	        return false;
        }else{
					const warn =`<div class="alert alert-danger fade show mb-0" role="alert" aria-atomic="true">
          <span class="alert_texto">${Baratz.i18n_js.buySuggestion.error_library}</span>
          </div>`;
          $('.cont_alerts').empty().append(warn);
					return false;
				} 
      });
    },

    /**
     *  Eventos sobre la modal de recomendación multinivel
     *
     *  @method Baratz.manager_recomended.modal_recommended_levels.events
     *
     *  @param {object} datos: Datos de la modal afectada
     */
    events:datos=>{
      const $modal=datos.modal.$modal;
      const $cont_all_checks_of_levels=$modal.find(".cont_all_checks_of_levels");
      // Selecciona sólo los checks sin el attr disabled
      const $all_checks=$cont_all_checks_of_levels.find('[type="checkbox"]').not(":disabled");

      // boton recomendar en todos, marca todos los niveles para recomendar
      const $recommend_all_levels_on=$modal.find('[name="recommend_all_levels_on"]');
      $recommend_all_levels_on.on("click",()=>{
        $all_checks.each((i,e)=>{
          const $check=$(e);
          $check.attr({"checked":"checked"}).parent().find(".cont_nuevo_check").addClass("activado");
        });
        return false;
      });

      // boton dejar de recomendar en todos los niveles
      const $recommend_all_levels_off=$modal.find('[name="recommend_all_levels_off"]');
      $recommend_all_levels_off.on("click",()=>{
        $all_checks.each((i,e)=>{
          const $check=$(e);
          $check.removeAttr("checked").parent().find(".cont_nuevo_check").removeClass("activado");
        });
        return false;
      });

    },

    /**
     *  Cambio de color en los checks .data_prueba (segun su value) de la modal de recomendar, si se indica en la respuesta
     *
     *  @method Baratz.manager_recomended.modal_recommended_levels.ctrl_val_checks
     *
     *  @param {obj} outData    : Array de valores de los checks que no se pueden modificar
     *  @param {obj} inData     : Array de valores de los cheks que se pueden modificar
     *  @param {dom object} $modal : Modal afectada
     *
     *  @detail
     *        Del servidor se reciben las listas cuando falla (outData con contenido)
     *        si todo ha ido bien, no se envian ni una ni otra (arrays vacios)
     *        se pasan dos listas:
     *          • Valores de checks que se salen de rango (outData) y no se pueden grabar
     *          • Valores de checks que potencialmente se pueden grabar (inData)
     */
    ctrl_val_checks:(outData,inData,$modal)=>{
      // busca los checks (class data_prueba)
      // esta clase se ha puesto para identificarles para este caso
      if(outData.length>0 || inData.length>0){
        $modal.find(".data_prueba").each((i,e)=>{
          const $check = $(e);
          const $label = $check.closest(".cont_check").find("label");
          $label.removeClass("color_red color_green color_black");
          const valor  = $check.val();
          // buscamos los que no se puede
          let index = -1;
          if(outData.length>0){
            index = outData.indexOf(valor);
            if(index>=0){
              // para marcarlo ponemos el label que acompaña al input en rojo
              $label.addClass("color_red"); // no se puede
            }
          }
          // buscamos los que potencialmente podrian
          if (inData.length>0){
            index=inData.indexOf(valor);
            if (index>=0){
              // para marcarlo ponemos el label que acompaña al input en verde
              $label.addClass("color_green"); // si se puede
            }
          }
          if(index===-1){
            // este check no se ha intentado cambiar y no esta en ninguna de las dos listas
            // lo dejamos como estaba, por si se ha cambiado de color en un envio previo
            $label.addClass("color_black"); // lo dejo como estaba
          }
        });
      }
    },

  },

  /**
	 *  Contenedor de acciones para los botones 'Recomendar' para un user manager
	 *
	 *  @cont Baratz.manager_recomended.recommend
   *
   *  @details Los botones 'Recomendar' ('.btn_recommended') tienen la clase '.btn_message_js',
   *           gestionándose en paralelo desde [scripts.js] -> Baratz.tmpls_actions.BTN_MESSAGE()
	 */
   recommend:{
    /**
     *  Pintado y acciones para los botones 'Recomendar'
     *
     *  @cont Baratz.manager_recomended.recommend.btn
     */
    btn:{
      /**
       *  Contenedor de textos para el botón añadir a recomendados
       *
       *  @obj Baratz.manager_recomended.recommend.btn.text
       */
      text:{
        text_insert : Baratz.i18n_js.search.recommended_button_text_insert,
        text_delete : Baratz.i18n_js.search.recommended_button_text_delete,
      },
      /**
       *  Cambia los textos en un botón activado
       *
       *  @method Baratz.manager_recomended.recommend.btn.active
       *
       *  @param {dom object} $btn  : botón añadir a recomendads afectado
       */
      active:$btn=>{
        const message=$btn.attr("data-message_activo");
        $btn.addClass("active");
        const page_link_text=Baratz.manager_recomended.recommend.btn.text.text_delete;
        Baratz.manager_recomended.recommend.btn.pinta_texto($btn,message,page_link_text);
      },

      /**
       *  Cambia los textos en un botón desactivado
       *
       *  @method Baratz.manager_recomended.recommend.btn.deactive
       *
       *  @param {dom object} $btn  : botón añadir a recommended afectado
       *  @param {str} type :
       */
      deactive:($btn,type)=>{
        let message=$btn.attr("data-title_initial");
        if(type==="deleted"){
          $btn.addClass("item_deleted");
        }
        if($btn.hasClass("item_deleted")){
          message=$btn.attr("data-message_no_activo");
        }
        $btn.removeClass("active");
        const page_link_text=Baratz.manager_recomended.recommend.btn.text.text_insert;
        Baratz.manager_recomended.recommend.btn.pinta_texto($btn,message,page_link_text);
      },

      /**
       *  Pinta un texto dado en un botón dado (title y aria), y otro texto en .page-link_title
       *
       *  @method Baratz.manager_recomended.recommend.btn.pinta_texto
       *
       *  @param {dom object} $btn  : Botón afectado
       *  @param {string} message   : Texto a pintar en aria-label y title
       *  @param {string} page_link_text   : Texto para .page-link_title
       */
       pinta_texto:($btn,message,page_link_text)=>{
        $btn.attr({
          "aria-label" : message,
          "title"      : message,
        });
        const isInSummaryActions=($btn.closest(".summary-actions").length===1);
        if(!isInSummaryActions){
          const $btn_label=$btn.find(".btn_title");
          if($btn_label.length>0){
            $btn_label.text(message);
          }
        }
      },

      /**
       *  Para botones con limite (.btn_recommended.btn_limite_alcanzado), asocia los literales title correctos
       *  a traves de los data necesarios
       *
       *  @method Baratz.manager_recomended.recommend.btn.limit_check
       *
       *  @param {dom object} $btn  : boton afectado
       */
      limit_check:$btn=>{
        const recommended_limit=parseInt($btn.attr("data-recommended-limit"),10);
        const recommended_size=parseInt($btn.attr("data-recommended-size"),10);
        const $ul=$btn.closest("ul");
        if(recommended_size>=recommended_limit){
          // Aplica clase 'limite alcanzado' a todos los botones
          const $btns_recommended= $ul.find(".btn_recommended");
          $btns_recommended.addClass("btn_limite_alcanzado");
          // Pinta literal 'límite superado' en los botones no activos
          const $btns_limite_alcanzado_no_active=$ul.find(".btn_recommended.btn_limite_alcanzado").not(".active");
          $btns_limite_alcanzado_no_active.each(function(){
            const $btn=$(this);
            const message_no_active=$btn.attr("data-message_limit_warning");
            Baratz.manager_recomended.recommend.btn.pinta_texto($btn,message_no_active,message_no_active);
          });
        }
        else{
          // Quita clase 'límite alcanzado' de todos los botones
          const $btns_limite_alcanzado=$ul.find(".btn_recommended.btn_limite_alcanzado");
          $btns_limite_alcanzado.removeClass("btn_limite_alcanzado");
          const $btns_no_active=$ul.find(".btn_recommended").not(".active");
          $btns_no_active.each(function(){
            Baratz.manager_recomended.recommend.btn.deactive($(this));
          });
        }
      },
    },

    /**
     *  A traves de un botón añadir a recomendados, gestiona una petición para guardar/borrar de recommended
     *
     *  @method Baratz.manager_recomended.recommend.action_url
     *
     *  @param {dom object} $btn  : Botón afectado
     *  @param {string} action : acción a realizar
     */
    action_url:($btn,action)=>{
      const data_id=$btn.attr("data-id");
      var data_level=$btn.attr("data-level"); 
      const url = `${Baratz.manager_recomended.recommendedUrl}`;
      const _csrf=$(document.body).find('[name="_csrf"]').eq(0).val();
        $.ajax({
		url:url,
		type: 'POST',
		headers: {
              'X-CSRF-TOKEN': _csrf,
              'Content-Type':'application/json'
          },
    	data:JSON.stringify({
			action:true,
			id: data_id,
			level:data_level
		}),    	
		success:(data)=>{
	     const btn_action=$btn.attr("data-btn_action");
        if(btn_action==="recommended_toggle"){
          if(!action){
            Baratz.manager_recomended.recommend.btn.deactive($btn,"deleted");
          }
          else{
            Baratz.manager_recomended.recommend.btn.active($btn);
          }
          Baratz.manager_recomended.recommend.changeRecommendedSize($btn,action);
        }
       },
       error:(data)=>{	        
      }
    });
    },

    /**
     *  Aplica acciones en un boton añadir a recommended para un único nivel
     *
     *  @method Baratz.manager_recomended.recommend.one_level
     *
     *  @param {dom object} $btn  : boton añadir a recommended afectado
     *
     *  @details En caso de superar el límite máximo de recommended a añadir, se muestra una modal de aviso
     */
    one_level:$btn=>{
      let action=true;
      const isActive=$btn.hasClass( "active" );
      if(isActive){
        // Si el botón está activo, se envia delete a la fn action_url
        action=false;
        Baratz.manager_recomended.recommend.action_url($btn,action);
      }
      else{
        const recommended_limit = parseInt($btn.attr("data-recommended-limit"));
        const recommended_size = parseInt($btn.attr("data-recommended-size"));
        if(recommended_size >= recommended_limit){
          // alert($btn.attr("data-recommended-message"));
          const $cont=$(document.body);
          //const modal_title=Baratz.i18n_js.search.recommended_modalTitle(recommended_limit,recommended_size);
          const modal_title=Baratz.tmpls_actions.UTILS.traduccion_en_params(Baratz.i18n_js.search.recommended_modalTitle,[recommended_limit,recommended_size]);
          // crea modal
          const modal=`<div id="modal_alert" class="modal_js modal_type_danger modal fade" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-scrollable" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="modalTitle" class="modal-title font-weight-bold">${modal_title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="alert alert-danger fade show mb-0" role="alert" aria-atomic="true">
                    <span class="alert_texto">${$btn.attr("data-recommended-message")}</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">${Baratz.i18n_js.search.recommended_modal_btn_aceptar}</button>
                </div>
              </div>
            </div>
          </div>`;
          $cont.append(modal);
          const $modal=$cont.find("#modal_alert");
          $modal.on({
            // cuando ya está abierta
            'shown.bs.modal':()=>{
              $modal.find(".close").focus();
              // Evita el cierre del dropdown de ultimas busquedas del menu header al hacer click cuando la modal está abierta
              $modal.on("click",function(e){
                return false;
              });
              // cierra la modal en los botones dismiss
              $modal.find('[data-dismiss="modal"]').off("click").on("click",function(){
                $modal.modal("hide");
                return false;
              });
            },
            // cuando ya está cerrada
            'hidden.bs.modal':()=>{
              // foco en el boton de lanzamiento
              $btn.focus();
              $modal.remove();
            }
          });
          $modal.modal("show");
          return false;
        }
        else{
          // Si está dentro de límites, se guarda el elemento en 'Recomendados'
          Baratz.manager_recomended.recommend.action_url($btn,action);
        }
      }
    },

    /**
     *  Dado un botón, aplica operaciones para determinar el data-recommended-size y aplica el resultado en dicho attr
     *
     *  @method Baratz.manager_recomended.recommend.changeRecommendedSize
     *
     *  @param {dom object} $btn  : botón afectado
     *  @param {bool} add  : operación a realizar
     *    - (true) suma una unidad
     *    - (false) resta una unidad
     */
    changeRecommendedSize:($btn,add)=>{
      let recommended_size = $btn.attr('data-recommended-size');
      if(add){
        recommended_size++;
      }
      else{
        recommended_size--;
      }
      const $btn_recommended_size=$(document.body).find("button[data-recommended-size]");
      if($btn_recommended_size.length>0){
        $btn_recommended_size.each((i,e)=>{
          $(e).attr('data-recommended-size',recommended_size);
        });
      }
      Baratz.manager_recomended.recommend.btn.limit_check($btn);
    },

  },


});
