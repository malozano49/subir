/**
 *  @file        : opac-manager.activities.js
 *
 *  @description : js de aplicación en la página de manager próximas actividades
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
/* globals Baratz*/

console.log("[opac-manager.activities.js] CARGA");

if (!Baratz.manager_activities){
  Baratz.manager_activities={
    // success       : BaratzContextPath + 'manager/activities?msg=activity.success.edit&msgLevel=success',
    // error         : BaratzContextPath + 'manager/activities?msg=activity.error.edit&msgLevel=danger',
    // clon
    item_base_clone : $("<div/>",{"class":"item_base_clone"}),
  };
}

/**
 *  Contenedor de acciones en la pestaña manager próximas actividades
 *
 *  @obj Baratz.manager_activities
 */
Object.assign(Baratz.manager_activities,{

  // INICIALIZACION
  init:()=>{
    const $container_general=$(document.body).find(".container_general");
    const $articles=$container_general.find("article");
    const $li_out=$articles.find("li.out");
    $li_out.each((i,e)=>{
      const $li=$(e);
      Baratz.manager_activities.insertaMarca($li,"out");
    });
    Baratz.manager_activities.btn_modify.initialize();
  },


  btn_modify:{
    /**
     *  Inserta los valores iniciales de los forms en los botones modificar de cada linea
     *
     *  @method Baratz.manager_activities.btn_modify.initialize
     */
    initialize:()=>{
      const $activity_cont=$(document.body).find(".activity_cont");
      $activity_cont.each(function(){
        const $list=$(this);
        const $rows=$list.find("li");
        if($rows.length>0){
          $rows.each(function(){
            const $row=$(this);
            const $btn_activity_form_modify=$row.find(".btn_activity_form_modify");
            if($btn_activity_form_modify.length>0){
              const $form=$($btn_activity_form_modify.attr("data-modal_html"));
              let data_initials = {
                text          : $form.find('[name="text"]').val(),
                link          : $form.find('[name="link"]').val(),
                activityDateStart  : $form.find('[name="activityDateStart"]').val(),
                activityDateEnd  : $form.find('[name="activityDateEnd"]').val(),
                startDate     : $form.find('[name="startDate"]').val(),
                endDate       : $form.find('[name="endDate"]').val(),
              };
              data_initials=Baratz.tmpls_actions.UTILS.object2data(data_initials);
              $btn_activity_form_modify.attr("data-initials",data_initials);
            }
          });
        }
      });
    },
    /**
     *  Guarda los valores iniciales para las modificaciones en el botón lanzador de la modal afectada
     *
     *  @method Baratz.manager_activities.btn_modify.save_dataInitials
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
        activityDateStart : $modal.find('[name="activityDateStart"]').val(),
        activityDateEnd  : $modal.find('[name="activityDateEnd"]').val(),
        startDate     : $modal.find('[name="startDate"]').val(),
        endDate       : $modal.find('[name="endDate"]').val(),
      };
      data_initials=Baratz.tmpls_actions.UTILS.object2data(data_initials);
      $btn_lanzador.attr("data-initials",data_initials);
    },
    /**
     *  Recupera los valores iniciales para las modificaciones en el botón lanzador y los pinta en el form de la modal afectada
     *
     *  @method Baratz.manager_activities.btn_modify.load_dataInitials
     *
     *  @param {object} datos : datos de la modal
     */
    load_dataInitials:(datos)=>{
      const $btn_lanzador=datos.modal.$lanzador;
      const data_initials=Baratz.tmpls_actions.UTILS.data2object($btn_lanzador.attr("data-initials"));
      const $modal=datos.modal.$modal;
      $modal.find('[name="text"]').val(data_initials.text);
      $modal.find('[name="link"]').val(data_initials.link);
      $modal.find('[name="activityDateStart"]').val(data_initials.activityDateStart),
      $modal.find('[name="activityDateEnd"]').val(data_initials.activityDateEnd),
      $modal.find('[name="startDate"]').val(data_initials.startDate);
      $modal.find('[name="endDate"]').val(data_initials.endDate);
    }
  },

  /**
   *  Pinta una marca en la linea dada y un clase de resaltado
   *
   *  @method Baratz.manager_activities.insertaMarca
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
   *  @method Baratz.manager_activities.controlPost
   *
   *  @param {object} datos  : datos de modal
   *  @param {data}   data   : datos de recibidos de la petición para la gestión de los mensajes en las alertas
   *  @param {string} action : acción realizada ("operation-delete","operation-modify"...)
   *  @param {dom object} $cont_alert [opcional]: contenedor donde mostrar los mensajes de alerta
   */
  controlPost:(datos,data,action,$cont_alert)=>{

    // Aporta datos de la vista para discriminar acciones en Baratz.commons.controlPost
    data.view={
      name : "manager-activities"
    };
// @TODO Ver si es necesario pasar a async await con promise esta llamada?????
    const retorno=Baratz.commons.controlPost(datos,data,action,$cont_alert);
    // operaciones de pintado segun resultados
    if(!retorno.error){
      switch(action){
        case"operation-delete":{
          Baratz.manager_activities.deleteItem(datos);
        }
        break;
        case"operation-modify":{
          Baratz.manager_activities.modifyOther(datos);
        }
        break;
        case"operation-add":{
          Baratz.manager_activities.addActivity(datos,data);
        }
        break;
        default:
      }
    }
  },

  /**
   *  Eliminar un item
   *
   *  @method Baratz.manager_activities.eliminar
   *
   *  @param {object} datos: datos de modal
   */
  eliminar:datos=>{
	    const $modal        = datos.modal.$modal;
	    const $btn_lanzador = datos.modal.$lanzador;
	    const id  = $btn_lanzador.closest("li").attr("data-id");
	    const urlDelete   = "/OpacDiscovery/manager/activities/delete";
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
				id:id
			}),    	
			success:(data)=>{
		    const $cont_alert=$btn_lanzador.closest(".cont_collapse").find(".alerts_actions");
	       	Baratz.manager_activities.controlPost(datos,data,actionControlPost,$cont_alert);
  		 
	       },
	       error:(data)=>{	 
	    		const $cont_alert=datos.modal.$modal.find(".alerts_action");
	       		Baratz.manager_activities.controlPost(datos,data,actionControlPos,$cont_alert);
	       }
    });
  })
 },

  /**
   *  Elimina un item de la vista
   *
   *  @method Baratz.manager_activities.deleteItem
   *
   *  @param {object} datos: datos de modal
   */
  deleteItem:datos=>{
    const $modal=datos.modal.$modal;
    const $btn_lanzador_modal=datos.modal.$lanzador;
    const $li=$btn_lanzador_modal.closest("li");
    const id=$li.attr("data-id");
    const $foco=$li.closest("article").find(".cont_botonera_control .btn").eq(0);
    const isContGlobal=(datos.modal.$lanzador.closest(".cont_global").length>0);
    if(!isContGlobal){
      datos.modal.$lanzador.closest("li").remove();
    }
    else{
      const $container_general=$li.closest(".container_general");
      const $lis_remove=$container_general.find(`li[data-id="${id}"]`);
      $lis_remove.each((i,e)=>{
        $(e).remove();
      });
    }
    $modal.modal('hide');
    setTimeout(()=>{
      $foco.focus();
    },800);
  },

  /**
   *  Modificar un item
   *
   *  @method Baratz.manager_activities.modificar
   *
   *  @param {object} datos: datos de modal
   */
  modificar:datos=>{
    const $modal=datos.modal.$modal;
    $modal.find(".btn.btn-modify-activity").off("click").on("click",()=>{
      $modal.find(".alert-process").hide();
      const $form       = $modal.find("form");
      const urlModify   = $form.attr("action");
      const datos_envio = $form.serialize();
      const action      = "operation-modify";
      const $cont_alert = $modal.find(".alerts_action");
      $.post(urlModify,datos_envio,()=>{
        //console.log("[opac-manager.activities] Baratz.manager_activities.modificar() urlModify",urlModify);
      }).done((data)=>{
        Baratz.manager_activities.controlPost(datos,data,action,$cont_alert);
      }).fail((data)=>{
        //console.log("[opac-manager.activities] Baratz.manager_activities.modificar() ERROR EN LA PETICION... urlModify",urlModify);
        Baratz.manager_activities.controlPost(datos,data,action,$cont_alert);
      });
      return false;
    });

    // boton salir / cancelar cambios en la modal
    $modal.find('[data-dismiss="modal"]').on("click",(e)=>{
      Baratz.manager_activities.btn_modify.load_dataInitials(datos);
    });
  },

  /**
   *  Modifica en la vista los items de la lista iguales al primario, según los datos de modificacion
   *
   *  @method Baratz.manager_activities.modifyOther
   *
   *  @param {object} datos  : datos de modal
   */
  modifyOther:datos=>{

    const modifications=(id,datos)=>{
      const $modal_target=$(document.body).find(id);
      $modal_target.find('[name="text"]').val(datos.text);
      $modal_target.find('[name="link"]').val(datos.link);
      $modal_target.find('[name="activityDateEnd"]').val(datos.activityDateEnd),
      $modal_target.find('[name="activityDateStart"]').val(datos.activityDateStart),
      $modal_target.find('[name="startDate"]').val(datos.startDate);
      $modal_target.find('[name="endDate"]').val(datos.endDate);
    };

    const $modal=datos.modal.$modal;
    const $li=datos.modal.$lanzador.closest("li");
    const datos_new={
      text          : $modal.find('[name="text"]').val(),
      link          : $modal.find('[name="link"]').val(),
      activityDateStart  : $modal.find('[name="activityDateStart"]').val(),
      activityDateEnd : $modal.find('[name="activityDateEnd"]').val(),
      startDate     : $modal.find('[name="startDate"]').val(),
      endDate       : $modal.find('[name="endDate"]').val(),
    };
    const id=$li.attr("data-id");
    const isContGlobal=(datos.modal.$lanzador.closest(".cont_global").length>0);
    if(!isContGlobal){
      $li.find(".title").text(datos_new.text);
      const modal_target=$li.find(".btn_activity_form_modify").attr('data-modal_target');
      if(typeof(modal_target)!=="undefined"){
        modifications(modal_target,datos_new);
        Baratz.manager_activities.btn_modify.save_dataInitials(datos);
      }
    }
    else{
      const $container_general=$li.closest(".container_general");
      const $lis=$container_general.find('li[data-id="'+id+'"]');
      // cambia los datos en todos los objetos dom del mismo id
      $lis.each((i,e)=>{

        const $li_oth=$(e);
        // cambia clase de item y texto de la vista
        $li_oth.find(".title").text(datos_new.text);
        // inserta marca de modificado
        Baratz.manager_activities.insertaMarca($li_oth,"mod");
        // cambia los datos en el html de montaje de la modal para la vista, ya que desde
        // [scripts.js]  Baratz.tmpls_actions.MODALES_JS() -> OPS.gestiona_datos() -> case"hidden"
        // la modal se renueva cada vez que se pulsa el botón modificar
        const $btn_activity_form_modify=$li_oth.find(".btn_activity_form_modify");
        const modal_html=$btn_activity_form_modify.attr('data-modal_html');
        if(typeof(modal_html)!=="undefined"){
          modifications(modal_html,datos_new);
          Baratz.manager_activities.btn_modify.save_dataInitials(datos);
        }
      });
    }
  },

  /**
   *  Añadir un item
   *
   *  @method Baratz.manager_activities.add
   *
   *  @param {object} datos: datos de modal
   */
  add:datos=>{
    const $modal=datos.modal.$modal;
    $modal.find(".btn.btn-add-activity").off("click").on("click",()=>{
      $modal.find(".alert-process").hide();
      const $form       = $modal.find("form");
      const urlAdd      = $form.attr("action");
      const datos_envio = $form.serialize();
      const action      = "operation-add";
      $.post(urlAdd, datos_envio,()=>{
        //console.log("[opac-manager.activities] Baratz.manager_activities.add() urlAdd",urlAdd);
      }).done((data)=>{
        const $cont_alert=datos.modal.$lanzador.closest(".cont_collapse").find(".alerts_actions");
        Baratz.manager_activities.controlPost(datos,data,action,$cont_alert);
      }).fail((data)=>{
        //console.log("[opac-manager.activities] Baratz.manager_activities.add() ERROR EN LA PETICION... urlAdd",urlAdd);
        const $cont_alert=datos.modal.$modal.find(".alerts_action");
        Baratz.manager_activities.controlPost(datos,data,action,$cont_alert);
      });
      return false;
    });
  },

  /**
   *  Crea un nuevo item en la vista
   *
   *  @method Baratz.manager_activities.addActivity
   *
   *  @param {object} datos  : datos de modal
   *  @param {object} data   : datos devueltos por la peticion add
   */
  addActivity:(datos,data)=>{
    const $body      = $(document.body);
    const $modal     = datos.modal.$modal;
    //var $li=datos.modal.$lanzador.closest(".cont_manageActivities").find("li").eq(0);
    const $li        = $(data.renderedTemplate);
    let $li_cloned = $li.clone();
    const datos_new  = {
      text          : $modal.find('[name="text"]').val(),
      link          : $modal.find('[name="link"]').val(),
      activityDateEnd  : $modal.find('[name="activityDateEnd"]').val(),
      activityDateStart  : $modal.find('[name="activityDateStart"]').val(),
      startDate     : $modal.find('[name="startDate"]').val(),
      endDate       : $modal.find('[name="endDate"]').val(),
    };
    // cambia texto de la vista
    $li_cloned.find(".title").text(datos_new.text);
    // inserta marca de modificado
    Baratz.manager_activities.insertaMarca($li_cloned,"add");
    // cambia los datos en el html de la modal para la vista
    /* var modal_html=$li_cloned.find(".btn_activity_form_modify").attr('data-modal_target');
    var $modal_target=$body.find(modal_html);
    $modal_target.find('[name="text"]').val(datos_new.text);
    $modal_target.find('[name="link"]').val(datos_new.link);
    $modal_target.find('[name="activityDate"]').val(datos_new.activityDate);
    $modal_target.find('[name="startDate"]').val(datos_new.startDate);
    $modal_target.find('[name="endDate"]').val(datos_new.endDate); */

    // Se controla si se debe de insertar la nueva actividad en las sucursales
    const isEditable=(datos.modal.$lanzador.attr("data-show_content_no_edit")=="true");
    // busca la posicion donde insertar
    let isContGlobal=(datos.modal.$lanzador.closest(".cont_global").length>0);
    let $li_focus=$li_cloned;
    if(!isContGlobal){
      const $ul=datos.modal.$lanzador.closest(".cont_manageActivities").find(".cont_manager ul");
      const $li_last=$ul.find("li>.cont_botonera").last().closest("li");
      if($li_last.length===0){
        $ul.prepend($li_cloned);
      }
      else{
        $li_last.after($li_cloned);
      }
    }
    else{
      const $uls=$body.find(".cont_manager ul");
      $uls.each((i,e)=>{
        const $ul=$(e);
        isContGlobal=($ul.closest(".cont_global").length>0);
        // Si el contenedor es global, ó no es global y está habilitada la posibilidad de inserción en las sucursales
        if(isContGlobal || (!isContGlobal && isEditable)){
          $li_cloned=$li_cloned.clone();
          // si no es global se elimina la botonera
          if(!isContGlobal){
            $li_cloned.find('.cont_botonera').remove();
          }
          // recuerda el focus
          if(i==0){
            $li_focus=$li_cloned;
          }
          // busca el último li para añadir despues de el si existe
          const $li_last=$ul.find("li>.cont_botonera").last().closest("li");
          if($li_last.length==0){
            // si no existe, puede ser sucursal y entonces de añade a principio de la lista
            $ul.prepend($li_cloned);
          }
          else{
            $li_last.after($li_cloned);
          }
        }
      });
      Baratz.manager_activities.btn_modify.initialize();
    }
    const $botones=$li_focus.find(".cont_botonera .btn");
    $modal.modal("hide");
    setTimeout(()=>{
      $botones.eq(0).focus();
      Baratz.tmpls_actions.MODALES_JS();
    },800);

  },




});