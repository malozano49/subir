/**
 *  @file        : opac-manager.interestLinks.js
 *
 *  @description : js de aplicación en la página de manager enlaces de interés
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 *
 *  HAY @TODO
 *
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath,Sortable */

console.log("[opac-manager.interestLinks.js] CARGA");

if (!Baratz.manager_interestLinks){
  Baratz.manager_interestLinks={
    urlSort         : `${BaratzContextPath}manager/interest-links/order`,
    item_base_clone : $("<div/>",{"class":"item_base_clone"}),
  // error        : ${BaratzContextPath}manager/interest-links?msg=interest_link.error.edit&msgLevel=danger'
  };
}

/**
 *  Contenedor de acciones en la pestaña manager enlaces de interés
 *
 *  @obj Baratz.manager_interestLinks
 */
Object.assign(Baratz.manager_interestLinks,{

  init:()=>{
    const $container_general=$(document.body).find(".container_general");
    const $articles=$container_general.find("article");
    $articles.find("li.out").each((i,e)=>{
      const $li=$(e);
      Baratz.manager_interestLinks.insertaMarca($li,"out");
    });
    Baratz.manager_interestLinks.initializeSortables();
    Baratz.manager_interestLinks.btn_modify.initialize();
    Baratz.manager_interestLinks.events();
  },


  btn_modify:{
    /**
     *  Inserta los valores iniciales de los forms en los botones modificar de cada linea
     *
     *  @method Baratz.manager_interestLinks.btn_modify.initialize
     */
    initialize:()=>{
      const $cmp_sortable_list=$(document.body).find(".cmp_sortable_list");
      $cmp_sortable_list.each(function(){
        const $list=$(this);
        const $rows=$list.find("li");
        if($rows.length>0){
          $rows.each(function(){
            const $row=$(this);
            const $btn_interest_link_form_modify=$row.find(".btn_interest_link_form_modify");
            if($btn_interest_link_form_modify.length>0){
              const $form=$($btn_interest_link_form_modify.attr("data-modal_html"));
              let data_initials = {
                text          : $form.find('[name="text"]').val(),
                link          : $form.find('[name="link"]').val(),
                startDate     : $form.find('[name="startDate"]').val(),
                endDate       : $form.find('[name="endDate"]').val(),
              };
              data_initials=Baratz.tmpls_actions.UTILS.object2data(data_initials);
              $btn_interest_link_form_modify.attr("data-initials",data_initials);
            }
          });
        }
      });
    },
    /**
     *  Guarda los valores iniciales para las modificaciones en el botón lanzador de la modal afectada
     *
     *  @method Baratz.manager_interestLinks.btn_modify.save_dataInitials
     *
     *  @param {object} datos : datos de la modal
     */
    save_dataInitials:(datos)=>{
      const $btn_lanzador=datos.modal.$lanzador;
      const $modal=datos.modal.$modal;
      // Guarda los datos iniciales por si se cancela, en el boton cancelar
      // para que si se cancela se abara la modal con los datos iniciales
      let data_initials = {
        text          : $modal.find('[name="text"]').val(),
        link          : $modal.find('[name="link"]').val(),
        startDate     : $modal.find('[name="startDate"]').val(),
        endDate       : $modal.find('[name="endDate"]').val(),
      };
      data_initials=Baratz.tmpls_actions.UTILS.object2data(data_initials);
      $btn_lanzador.attr("data-initials",data_initials);
    },
    /**
     *  Recupera los valores iniciales para las modificaciones en el botón lanzador y los pinta en el form de la modal afectada
     *
     *  @method Baratz.manager_interestLinks.btn_modify.load_dataInitials
     *
     *  @param {object} datos : datos de la modal
     */
    load_dataInitials:(datos)=>{
      const $btn_lanzador=datos.modal.$lanzador;
      const data_initials=Baratz.tmpls_actions.UTILS.data2object($btn_lanzador.attr("data-initials"));
      const $modal=datos.modal.$modal;
      $modal.find('[name="text"]').val(data_initials.text);
      $modal.find('[name="link"]').val(data_initials.link);
      $modal.find('[name="startDate"]').val(data_initials.startDate);
      $modal.find('[name="endDate"]').val(data_initials.endDate);
    }
  },

  /**
   *  Inicializa los sortables existentes con la opcion disabled según el check de ordenacion interactiva
   *
   *  Baratz.manager_interestLinks.initializeSortables()
   */
  initializeSortables:()=>{
    const $body=$(document.body);
    const $collapses=$body.find(".collapse");
    $collapses.each((i,e)=>{
      const $col=$(e);
      const $check=$col.find('.check_sortable_zone [type="checkbox"]');
      const isChecked=($check.attr("checked")==="checked");
      const $cmp_sortable_list=$col.find(".cmp_sortable_list");
      Baratz.tmpls_actions.CMP_SORTABLE($cmp_sortable_list,!isChecked);
      if(!isChecked){
        $cmp_sortable_list.closest(".cont_sortable").addClass("sortable_disabled");
      }
    });
  },

  /**
   *  Pinta una marca en la linea dada y un clase de resaltado
   *
   *  @method Baratz.manager_interestinks.insertaMarca
   *
   *  @param {dom object} $li: línea afectada
   *  @param {string} action: Accion de referencia (add,mod)
   */
  insertaMarca:($li,action)=>{
    const $body=$(document.body);
    const $disposeIcons=$body.find(".dispose_icons_js");
    const $icon_out=$disposeIcons.find('[data-type="out"]').clone();
    const $icon_add=$disposeIcons.find('[data-type="add"]').clone();
    const $icon_mod=$disposeIcons.find('[data-type="mod"]').clone();
    let marca={};
    switch(action){
      case"add":{
        marca={
          title : $icon_add.attr("title"),
          item  : $icon_add || "A"
        };
      }
      break;
      case"mod":{
        marca={
          title : $icon_mod.attr("title"),
          item  : $icon_mod || "M"
        };
      }
      break;
      case"out":{
        marca={
          title : $icon_out.attr("title"),
          item  : $icon_out || "F"
        };
      }
      break;
      default:
    }
    $li.find(".marca").remove();
    const $marca=$('<div class="marca"></div>');
    $marca.html(marca.item);
    $li.removeClass("out mod add").addClass(action).prepend($marca);
  },

  /**
   *  Pintado de los mensajes alert con los datos recibidos de la peticiones
   *
   *  @method Baratz.manager_interestLinks.controlPost
   *
   *  @param {object} datos  : datos de modal
   *  @param {data}   data   : datos recibidos de la petición para la gestión de los mensajes en las alertas
   *  @param {string} action : acción realizada ("operation-delete","operation-modify"...)
   *  @param {dom object} $cont_alert [opcional]: contenedor donde mostrar los mensajes de alerta
   */
  controlPost:(datos,data,action,$cont_alert)=>{
    // Aporta datos de la vista para discriminar acciones en Baratz.commons.controlPost
    data.view={
      name:"manager-interestLinks"
    };
// @TODO Ver si es necesario pasar a async await con promise esta llamada?????
    const retorno=Baratz.commons.controlPost(datos,data,action,$cont_alert);
    // operaciones de pintado segun resultados
    if(!retorno.error){
      switch(action){
        case"operation-delete":{
          Baratz.manager_interestLinks.deleteItem(datos);
        }
        break;
        case"operation-modify":{
          Baratz.manager_interestLinks.modifyOther(datos);
        }
        break;
        case"operation-add":{
          Baratz.manager_interestLinks.addLink(datos,data);
        }
        break;
        default:
      }
    }
  },

  /**
   *  Petición para eliminar un item
   *
   *  @method Baratz.manager_interestLinks.eliminar
   *
   *  @param {object} datos: datos de modal
   */
  eliminar:datos=>{
    const $btn_borrar=datos.modal.$modal.find(".btn_borrar");
    const form = datos.modal.$lanzador.next();
   	const urlDelete = form.attr("action");
    const action="operation-delete";
    const ide =  form.find('[name="id"]').val();;
    const fcsrf=  form.find('[name="_csrf"]').val();
    $btn_borrar.on("click",()=>{
    	$.ajax({
		url:urlDelete,
		type: 'POST',
		headers: {
              'X-CSRF-TOKEN': fcsrf,
              'Content-Type':'application/json'
          },
    	data:JSON.stringify({
			id: ide
		}),    	
		success:(data)=>{
	        const $cont_alert=datos.modal.$lanzador.closest(".cont_collapse").find(".alerts_actions");
	        Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);
       },
       error:(data)=>{
       	    console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.eliminar() ERROR EN LA PETICION... urlDelete",urlDelete);
	        const $cont_alert=datos.modal.$modal.find(".alerts_action");
	        Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);	        
      }
    });
  })
  },

  /**
   *  Pinta modal de confirmación para eliminar un item de la vista
   *
   *  @method Baratz.manager_interestLinks.deleteItem
   *
   *  @param {object} datos: datos de modal
   */
  deleteItem:datos=>{
    const $modal              = datos.modal.$modal;
    const $btn_lanzador_modal = datos.modal.$lanzador;
    const $li                 = $btn_lanzador_modal.closest("li");
    const id                  = $li.attr("data-id");
    const $foco               = $li.closest("article").find(".cont_botonera_control .btn").eq(0);
    const isContGlobal        = (datos.modal.$lanzador.closest(".cont_global").length>0);
    let $cont_sortable;
    if(!isContGlobal){
      const $li_remove = datos.modal.$lanzador.closest("li");
      $cont_sortable   = $li_remove.closest(".cont_sortable");
      $li_remove.remove();
      // revisa posiciones
      Baratz.manager_interestLinks.revisaPosiciones($cont_sortable);
    }
    else{
      const $container_general = $li.closest(".container_general");
      const $lis_remove        = $container_general.find(`li[data-id="${id}"]`);
      $lis_remove.each((i,e)=>{
        const $li_remove=$(e);
        $cont_sortable=$li_remove.closest(".cont_sortable");
        $li_remove.remove();
        // revisa posiciones
        Baratz.manager_interestLinks.revisaPosiciones($cont_sortable);
      });
    }
    $modal.modal('hide');
    setTimeout(()=>{
      $foco.focus();
    },800);
  },

  /**
   *  Petición para modificar un item
   *
   *  @method Baratz.manager_interestLinks.modificar
   *
   *  @param {object} datos: datos de modal
   */
  modificar:datos=>{
    const $modal=datos.modal.$modal;

    // boton aceptar cambios en la modal
    $modal.find(".btn.btn-modify-link").off("click").on("click",()=>{
      $modal.find(".alert-process").hide();
      const $form       = $modal.find("form");
      const urlModify   = $form.attr("action");
      const datos_envio = $form.serialize();
      const action      = "operation-modify";
      const $cont_alert = $modal.find(".alerts_action");
      $.post(urlModify,datos_envio,()=>{
        //console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.modificar() urlModify",urlModify);
      })
      .done(data=>{
        Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);
      }).fail(data=>{
        //console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.modificar() ERROR EN LA PETICION... urlModify",urlModify);
        Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);
      });
      return false;
    });

    // boton salir / cancelar cambios en la modal
    $modal.find('[data-dismiss="modal"]').on("click",(e)=>{
      Baratz.manager_interestLinks.btn_modify.load_dataInitials(datos);
    });
  },

  /**
   *  Modifica en la vista los items de la lista iguales al primario, según los datos de modificacion
   *
   *  @method Baratz.manager_interestLinks.modifyOther
   *
   *  @param {object} datos  : datos de modal
   */
  modifyOther:datos=>{

    const modifications=(id,datos)=>{
      const $modal_target=$(document.body).find(id);
      $modal_target.find('[name="text"]').val(datos.text);
      $modal_target.find('[name="link"]').val(datos.link);
      $modal_target.find('[name="startDate"]').val(datos.startDate);
      $modal_target.find('[name="endDate"]').val(datos.endDate);
    };

    const $modal    = datos.modal.$modal;
    const $li       = datos.modal.$lanzador.closest("li");
    const datos_new = {
      text          : $modal.find('[name="text"]').val(),
      link          : $modal.find('[name="link"]').val(),
      startDate     : $modal.find('[name="startDate"]').val(),
      endDate       : $modal.find('[name="endDate"]').val(),
    };

    const id=$li.attr("data-id");
    const isContGlobal=(datos.modal.$lanzador.closest(".cont_global").length>0);
    if(!isContGlobal){
      $li.find(".title").text(datos_new.text);
      const modal_target=$li.find(".btn_interest_link_form_modify").attr('data-modal_target');
      if(typeof(modal_target)!=="undefined"){
        modifications(modal_target,datos_new);
        Baratz.manager_interestLinks.btn_modify.save_dataInitials(datos);
      }
    }
    else{
      const $container_general=$li.closest(".container_general");
      const $lis=$container_general.find(`li[data-id="${id}"]`);
      // cambia los datos en todos los objetos dom del mismo id
      $lis.each((i,e)=>{
        const $li_oth=$(e);
        // cambia clase de item y texto de la vista
        $li_oth.find(".title").text(datos_new.text);
        // inserta marca de modificado
        Baratz.manager_interestLinks.insertaMarca($li_oth,"mod");
        // cambia los datos en el html de montaje de la modal para la vista, ya que desde
        // [scripts.js]  Baratz.tmpls_actions.MODALES_JS() -> OPS.gestiona_datos() -> case"hidden"
        // la modal se renueva cada vez que se pulsa el botón modificar
        const modal_html=$li_oth.find(".btn_interest_link_form_modify").attr('data-modal_html');
        if(typeof(modal_html)!=="undefined"){
          modifications(modal_html,datos_new);
          Baratz.manager_interestLinks.btn_modify.save_dataInitials(datos);
        }

      });
    }
  },

  /**
   *  Petición para añadir un item
   *
   *  @method Baratz.manager_interestLinks.add
   *
   *  @param {object} datos: datos de modal
   */
  add:datos=>{
    const $modal=datos.modal.$modal;
    $modal.find(".btn.btn-add-link").off("click").on("click",()=>{
      $modal.find(".alert-process").hide();
      const $form       = $modal.find("form");
      const urlAdd      = $form.attr("action");
      const datos_envio = $form.serialize();
      const action      = "operation-add";
      $.post(urlAdd,datos_envio,()=>{
        //console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.add() modal->.btn-add-link->click datos",urlAdd);
      })
      .done(data=>{
        const $cont_alert=datos.modal.$lanzador.closest(".cont_collapse").find(".alerts_actions");
        Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);
      })
      .fail(data=>{
        //console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.add() ERROR EN LA PETICION... urlAdd",urlAdd);
        const $cont_alert=datos.modal.$modal.find(".alerts_action");
        Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);
      });
      return false;
    });
  },

  /**
   *  Crea un nuevo item en la vista
   *
   *  @method Baratz.manager_interestLinks.addLink
   *
   *  @param {object} datos  : datos de modal
   *  @param {object} data   : datos devueltos por la peticion add
   */
  addLink:(datos,data)=>{

    /**
     *  Averigua el index mayor de una lista y le suma 1 para retornar el nuevo index
     *
     *  @method li_cloned_order_init
     *
     *  @param {str} lista: Lista de items separados por comas
     *
     *  @return {num} retorno: index calculado
     */
    const li_cloned_order_init=lista=>{
      let retorno=0;
      if(lista!==""){
        lista=lista.split(",").map(function(item) {
          return parseInt(item, 10);
        });
        retorno=Math.max.apply(null,lista)+1;
      }
      return retorno;
    };

    const $body     = $(document.body);
    const $modal    = datos.modal.$modal;
    const datos_new = {
      text          : $modal.find('[name="text"]').val(),
      link          : $modal.find('[name="link"]').val(),
      startDate     : $modal.find('[name="startDate"]').val(),
      endDate       : $modal.find('[name="endDate"]').val(),
    };
    //var $li=datos.modal.$lanzador.closest(".cont_InterestLinks").find("li").eq(0);
    const $li=$(data.renderedTemplate);
    let $li_cloned=$li.clone();

    // cambia texto de la vista
    $li_cloned.find(".title").text(datos_new.text);
    // inserta marca de modificado
    Baratz.manager_interestLinks.insertaMarca($li_cloned,"add");
    // cambia los datos en el html de la modal para la vista
   /*
    var modal_html=$li_cloned.find(".btn_interest_link_form_modify").attr('data-modal_target');
    var $modal_target=$(document.body).find(modal_html);
    $modal_target.find('[name="text"]').val(datos_new.text);
    $modal_target.find('[name="link"]').val(datos_new.link);
    $modal_target.find('[name="startDate"]').val(datos_new.startDate);
    $modal_target.find('[name="endDate"]').val(datos_new.endDate);
    */

    let $li_focus=$li_cloned,
      order_init,
      $input_lista,
      lista_val,
      $ul,
      $li_last,
      $cont_sortable;
    // busca la posicion donde insertar
    let isContGlobal=(datos.modal.$lanzador.closest(".cont_global").length>0);
    if(!isContGlobal){
      $cont_sortable = datos.modal.$lanzador.closest(".cont_InterestLinks").find(".cont_sortable");
      $ul            = $cont_sortable.find("ul");
      // si es biblioteca los items tienen botonera, y se guarda cual es el último item para guardar el nuevo a continuación
      $li_last       = $ul.find("li>.cont_botonera").last().closest("li");
      // Añade el nuevo li al final si es biblioteca o al inicio si es sucursal
      if($li_last.length===0){
        $ul.prepend($li_cloned);
      }
      else{
        $li_last.after($li_cloned);
      }
      $input_lista = $cont_sortable.find('input.lista');
      lista_val    = $input_lista.val();
      // una vez insertado, se recupera su posición y se guarda en el data-init
      order_init   = li_cloned_order_init(lista_val);
      $li_cloned.attr("data-order-init",order_init);
      // inserta la posición en el input de referencia
      Baratz.manager_interestLinks.revisaPosiciones($cont_sortable);
    }
    else{
      const $uls=$body.find(".cont_manager ul");
      // Se controla si se debe de insertar la nueva actividad en las sucursales
      const isEditable=(datos.modal.$lanzador.attr("data-show_content_no_edit")==="true");
      $uls.each((i,e)=>{
        $ul=$(e);
        isContGlobal=($ul.closest(".cont_global").length>0);
        // Si el contenedor es global, ó no es global y está habilitada la posibilidad de inserción en las sucursales
        if(isContGlobal || (!isContGlobal && isEditable)){
          // si es biblioteca los items tienen botonera, y se guarda cual es el último item para guardar el nuevo a continuación
          $li_last   = $ul.find("li>.cont_botonera").last().closest("li");
          $li_cloned = $li_cloned.clone();
          // si el contenedor no es global, elimina la botonera del item
          if(!isContGlobal){
            $li_cloned.find('.cont_botonera').remove();
          }
          // si el contenedor es una bibilioteca, se guarda el item para foco al finalizar
          if(i==0){
            $li_focus=$li_cloned;
          }
          // Añade el nuevo li al final si es biblioteca o al inicio si es sucursal
          if($li_last.length==0){
            $ul.prepend($li_cloned);
          }
          else{
            $li_last.after($li_cloned);
          }
          $cont_sortable = $ul.closest(".cont_sortable");
          $input_lista   = $cont_sortable.find('input.lista');
          lista_val      = $input_lista.val();
          // una vez insertado, se recupera su posición y se guarda en el data-init
          order_init     = li_cloned_order_init(lista_val);
          $li_cloned.attr("data-order-init",order_init);
          // inserta el dato en el input de referencia
          Baratz.manager_interestLinks.revisaPosiciones($cont_sortable);
        }
      });
      Baratz.manager_interestLinks.btn_modify.initialize();
    }
    // aplica foco al cierre de la modal
    const $botones=$li_focus.find(".cont_botonera .btn");
    $modal.modal("hide");
    setTimeout(()=>{
      $botones.eq(0).focus();
      Baratz.tmpls_actions.MODALES_JS();
    },800);
  },

  /**
   *  Eventos sobre la vista de manager -> Enlaces de interés
   *
   *  @method Baratz.manager_interestLinks.events
   */
  events:()=>{
    const $body=$(document.body);
    // Habilita / deshabilita las zonas de sortablejs
    $body.find('.check_sortable_zone [type="checkbox"]').on("change",e=>{
      const $check             = $(e.currentTarget);
      const isChecked          = $check.attr("checked")==="checked";
      const $cmp_sortable_list = $check.closest(".collapse").find(".cmp_sortable_list");
      // si ya esta cargado el plugin, se revisa la instancia sobre el contenedor
      const instancia_sortable = Sortable.get($cmp_sortable_list[0]);
      instancia_sortable.options.disabled=!isChecked;
      const $cont_sortable=$cmp_sortable_list.closest(".cont_sortable");
      if(!isChecked){
        $cont_sortable.addClass("sortable_disabled");
        // Envía los datos de ordenamiento y la id de la sucursal afectada
        const $cont_InterestLinks = $cont_sortable.closest(".cont_InterestLinks");
        const id_sucursal         = $cont_InterestLinks.attr("data-level");
        const $lis                = $cont_sortable.find("li");
        const lis_length          = $lis.length;
        let lista_ordenada        = "";
        $lis.each((i,e)=>{
          const $li=$(e);
          let dato=$li.attr("data-id");
          if(i+1<lis_length){
            dato=dato+",";
          }
          lista_ordenada=lista_ordenada+dato;
        });
        const datos_envio=`contentLevel=${id_sucursal}&ids=${lista_ordenada}`;
        const action="operation-sortable";
        const datos={
          modal:{
            $modal:$cont_InterestLinks
          }
        };
        const $cont_alert=$cont_InterestLinks.find(".alerts_actions");
      
        const form =  $($(e.currentTarget).parent().siblings()[0]);
        const urlSort = form.attr("action");
        const fcsrf=  form.find('[name="_csrf"]').val();
        $.ajax({
    		url:urlSort,
    		type: 'POST',
    		headers: {
                  'X-CSRF-TOKEN': fcsrf,
                  'Content-Type':'application/json'
              },
        	data:JSON.stringify({
        		contentLevel: id_sucursal,
        		ids :lista_ordenada
    		}),    	
    		success:(data)=>{
    		   //console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.events() POST DONE data",data);
    	       Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);
            },
            error:(data)=>{
        	   //console.log("[opac-manager.interestLinks] Baratz.manager_interestLinks.events() ERROR EN LA PETICION... Baratz.manager_interestLinks.urlSort",Baratz.manager_interestLinks.urlSort);
               Baratz.manager_interestLinks.controlPost(datos,data,action,$cont_alert);	        
           }
        });
        
      }
      else{
        $cont_sortable.removeClass("sortable_disabled");
      }
    });
  },

  /**
   *  Revisa las posiciones de la lista de un contenedor dado y las guarda en el input correspondiente
   *
   *  @method Baratz.manager_interestLinks.revisaPosiciones
   */
  revisaPosiciones:$cont_sortable=>{
    const $input_lista=$cont_sortable.find('input.lista');
    const $cmp_sortable=$cont_sortable.find('.cmp_sortable');
    const $lis=$cmp_sortable.find("li");
    const lis_length=$lis.length;
    let nueva_lista_ordenada="";
    $lis.each((i,e)=>{
      const $li=$(e);
      let order_init=$li.attr("data-order-init");
      if((i+1)<lis_length){
        order_init=order_init+",";
      }
      nueva_lista_ordenada=nueva_lista_ordenada+order_init;
    });
    $input_lista.val(nueva_lista_ordenada);
  },


});