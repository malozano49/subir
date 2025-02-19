/**
 *  @file        : opac-admin.notifications.js
 *
 *  @description : js de aplicación en la página de administración notifications (módulo externo)
 *  @license     : baratz
 *  @copyright   : 2021
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-10-14
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz */

console.log("[MODULOS/opac-admin.notifications.js] CARGA");

if (!Baratz.admin_notifications){
  Baratz.admin_notifications={};
}

/**
 *  Contenedor de acciones en la pestaña administración notifications
 *
 *  @cont Baratz.admin_notifications
 *
 */
Object.assign(Baratz.admin_notifications,{
  // Secuencia de inicialización
  init:()=>{
    const $btn_notify_all=$(document.body).find(".btn_notify_all");
    if($btn_notify_all.length>0){
      Baratz.admin_notifications.eventos.notify_all($btn_notify_all);
    }
  },
  eventos:{

    /**
     *  Acciones sobre el evento click al boton 'Notificar a todos'
     *
     *  @param {dom object} $btn : Boton afectado
     */
    notify_all:($btn)=>{

      // Al click en el botón para notificar a todos
      $btn.on("click",async e=>{
        const $btn=$(e.currentTarget);
        const $form= $btn.closest("section").find("form");
        const url=$form.attr("action");
        const response=await fetch('./notifyAll', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': $form.find('[name="_csrf"]').val()
          },
          credentials: 'include',
          body: JSON.stringify({
            title : $form.find('[name="title"]').val(),
            text  : $form.find('[name="text"]').val(),
            url   : $form.find('[name="link"]').val(),
          }),
        });
        return false;
      });
    }
  },


});