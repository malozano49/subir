/**
 *  @file        : tmpl_reader_edit_data.js
 *
 *  @description : Js de aplicación edición de datos para el usuario
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-09-28
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath*/

console.log("[tmpl_reader_edit_data.js] CARGA");

/**
 *  Contenedor de acciones en la vista de edicíón de datos del usuario
 *
 *  @obj Baratz.tmpl_reader_edit_data
 *
 */

if (!Baratz.tmpl_reader_edit_data){
  Baratz.tmpl_reader_edit_data={};
}

Object.assign(Baratz.tmpl_reader_edit_data,{
  // INICIALIZACION
  init:()=>{
    // Si existe push en windows
    if (NOTIFICATIONS.checkPushExist()) {
      Baratz.tmpl_reader_edit_data.eventos_suscripcion();
    }
    else{
      // Si no existe, elimina el componente de la vista
      $(document.body).find("#notifications_subscribe").closest("fieldset").addClass("oculto");
    }
  },

  // EVENTOS SUSCRIPCION
  eventos_suscripcion:()=>{
    const $body=$(document.body);

    // al cambio del check de suscripción a notificaciones
    $body.find("#notifications_subscribe").on("change",(e)=>{
      const $el=$(e.currentTarget);
      const valor=$el.is(':checked');
      const _crsf=$el.closest("form").find('[name="_csrf"]').val();
      if(valor){
        NOTIFICATIONS.subscribe(_crsf);
      }
      else{
        NOTIFICATIONS.unsubscribe(_crsf);
      }
    });

  },

});