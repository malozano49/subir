/**
 *  @file        : tmpl_cookies_terms.js
 *
 *  @description : Js de aplicación en las vistas de la página de política de cookies
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-09-03
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath*/

console.log("[tmpl_cookies_terms.js] CARGA");

if (!Baratz.cookiesterms){
  Baratz.cookiesterms={
    // Contenedor de tablas dondepersonalizar las cookies
    cont_descriptions_general:$(document.body).find(".cont_descriptions_general"),
    // Checkboxes de las cookies
    checks:$(document.body).find('.cont_descriptions_general input[type="checkbox"]').not(':disabled'),
  };
}

/**
 *  Contenedor de acciones en la vista infos FAQ
 *
 *  @obj Baratz.cookiesterms
 *
 */
Object.assign(Baratz.cookiesterms,{
  // INICIALIZACION
  init:()=>{
    Baratz.cookiesterms.eventos();

  },
  // EVENTOS
  eventos:()=>{
    Baratz.cookiesterms.checks.on("change",(e)=>{
      const $check=$(e.currentTarget);
      const isChecked=$check.is(':checked');
      const hay_info=$check.hasClass("check_cookie_info");
      if(hay_info){
        let texto;
        if(isChecked){
          texto=$check.attr("data-info_checked");
        }
        else{
          texto=$check.attr("data-info_unchecked");
        }
        if(texto && texto!==""){
          Baratz.cookiesterms.OPS.modal_aviso(texto);

        }
      }

    });
  },
  // OPERACIONES
  OPS:{
    modal_aviso:(texto)=>{
      const $body=$(document.body);
      // Para modales con scroll añadir la clase modal-dialog-scrollable a modal-dialog (parametrizar?)
      const modal=`<div id="modal_aviso_cookies" class="modal_aviso_cookies modal_js modal_type_info modal fade" tabindex="-1" role="dialog" aria-labelledby="modalTitle_aviso_cookies" aria-modal="true" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div id="modalTitle_aviso_cookies" class="modal-title">Aviso</div>
              <button class="btn_cerrar close" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}" title="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${texto}
            </div>
            <div class="modal-footer">
              <button class="btn_cerrar btn btn-outline-secondary" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                <span class="btn_title" aria-hidden="true">${Baratz.i18n_js.modales_js.btn_cerrar_text}</span>
              </button>
            </div>
          </div>
        </div>
      </div>`;
      $body.find("#modal_aviso_cookies").remove();
      $body.append(modal);
      $body.find("#modal_aviso_cookies").modal();
    }
  }

});