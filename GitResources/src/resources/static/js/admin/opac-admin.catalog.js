/**
 *  @file        : opac-admin.catalog.js
 *
 *  @description : js de aplicación en la página de administración catálogo
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


console.log("[opac-admin.catalog.js] CARGA");

if (!Baratz.admin_catalog){
  Baratz.admin_catalog={
    forms      : $(document.body).find("#form_harvestOAIData,#form_loadMarcFiles,#form_deleteData,#form_reindexData"),
    icono_ajax : '<span class="icono icono_ajax fas fa-circle-notch fa-spin ml-2"></span>',
  };
}

/**
 *  Contenedor de acciones en la pestaña administración catálogo
 *
 *  @method Baratz.admin_catalog
 *
 */
Object.assign(Baratz.admin_catalog,{
  // INICIALIZACION
  init:()=>{
    Baratz.admin_catalog.eventos();
  },
  // EVENTOS
  eventos:()=>{
    // Botones submit de los formularios
    Baratz.admin_catalog.forms.find('[type="submit"]').on("click",e=>{
      const $btn=$(e.currentTarget);
      const $form=$btn.closest("form");
      const id=$btn.attr("id");
      if(typeof(id)!=="undefined" && id=="btn_submit_form_harvestOAIData"){
        let $cont_alert=$form.find(".cont_alert");
        const hayAlert=$cont_alert.length>0;
        if(!hayAlert){
          $form.find(".cont_botonera").before('<div class="cont_alert" aria-live="polite" aria-atomic="true"></div>');
          $cont_alert=$form.find(".cont_alert");
          Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert,"html");
        }
        const formul=Baratz.tmpls_actions.UTILS.form2object($form);

      }
      Baratz.admin_catalog.OPS.ajax_form($form,$btn);
      return false;
    });
  },
  // OPERACIONES
  OPS:{

    /**
     *  Envío ajax para un formulario dado
     *
     *  @method Baratz.admin_catalog.OPS.ajax_form
     *
     *  @param {dom object} $form  : Formulario afectado
     *  @param {dom object} $btn   : Botón de envio del formulario afectado
     */
    ajax_form:($form,$btn)=>{
      const url       = $form.attr("action");
      const btn_name  = $btn.attr("name");
      //var $alert_general=$(document.body).find(".admin-messages .cont_alert");
      const btn_value = $btn.attr("value");
      let datos       = $form.serialize();
      if(typeof(btn_value)!=="undefined"){
        datos=`${datos}&${btn_name}=${btn_value}`;
      }
      // realiza la peticion
      $.ajax({
        url        : url,
        method     : 'POST',
        data       : datos,
        beforeSend : req=>{
          // inserta icono de acción en el botón afectado
          $btn.append(Baratz.admin_catalog.icono_ajax);
        },
        success:data=>{
          //var data={"successes":[""],"warnings":[""],"errors":[""],"infos":["Colección AUTHORITY en proceso de carga"],"jobs":null,"num":null}
          const $cont_alert_widget=$form.closest(".widget").find(".cont_alert");
          $btn.find(".icono_ajax").fadeOut("slow",function(){
            $(this).remove();
            Baratz.commons.controlPost(undefined,data,undefined,$cont_alert_widget);
          });
        },
        error:()=>{
          // elimina icono de acción del botón afectado
          $btn.find(".icono_ajax").fadeOut("slow",function(){
            $(this).remove();
            // pinta alerta
            const $cont_alert_widget = $form.closest(".widget").find(".cont_alert");
            const $alert             = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert_widget,"html");
            const datos_alert        = {titulo:"",texto:Baratz.i18n_js.admin_catalog.alert_fail};
            Baratz.tmpls_actions.ALERTA.error($alert,datos_alert);
          });
        }
      });

    },

  }
});