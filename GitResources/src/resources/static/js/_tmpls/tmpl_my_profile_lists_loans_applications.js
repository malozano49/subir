/**
 *  @file        : tmpl_my_profile_lists_loans_applications.js
 *
 *  @description : Js para para las vistas Mi Perfil (Mis Listas / Préstamos y Solicitudes)
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

if (!Baratz.myProfile){
  Baratz.myProfile={
    icono_ajax : '<span class="icono icono_ajax fas fa-circle-notch fa-spin ml-2"></span>',
  };
}

Object.assign(Baratz.myProfile,{

  /**
   *  Acciones js para las vistas de Mi Perfil (Mis Listas / Préstamos y Solicitudes)
   *
   *  @method  Baratz.myProfile.TMPL
   */
  TMPL:function(){

    const INIT=()=>{
      EVENTOS.general();
    },
    /**
     *  Contenedor de acciones sobre los eventos
     *
     *  @cont EVENTOS
     */
    EVENTOS={

     /**
      *  Asignacion de acciones sobre los eventos en los elementos de la página en ÁMBITO GENERAL
      *
      *  @method EVENTOS.general
      */
      general:()=>{
        const $btn_action=$body.find('button[data-action],a[data-action]');
        // Elimina los botones de accion de la botonera flotante ya que estos se evaluan desde otro sitio
        let $btns_action=$btn_action.filter((i,e)=>{
          return ($(e).closest(".botonera_flotante").length===0);
        });
        $btns_action.off("click").on("click",e=>{
          const $btn=$(e.currentTarget);
          OPS.actions($btn);
          return false;
        });
        // barras de paginacion completas
        const $pagination_loans_history=$body.find(".pagination_loans_history");
        if($pagination_loans_history.length>0){
          EVENTOS.pagination($pagination_loans_history);
        }
      },

      /**
       *  Asignacion de acciones sobre los eventos en los elementos de paginación
       *
       *  @method EVENTOS.pagination
       *
       *  @param {dom object} $pagination_loans_history Barras de paginacion completas con la clase ".pagination_loans_history"
       */
      pagination:$pagination_loans_history=>{
        $pagination_loans_history.each((i,e)=>{
          const $barra_pagination=$(e);
          const $btns_pagination_loans_history=$barra_pagination.find(".page-link");
          $btns_pagination_loans_history.on("click",(el)=>{
            const $btn=$(el.currentTarget);
            // Pinta loading
            $loading.addClass("in_view");
            OPS.pagination_loans_history($btn);
            return false;
          });
          const $btns_size_page=$barra_pagination.find(".btn-link");
          $btns_size_page.on("click",(el)=>{
            const $btn=$(el.currentTarget);
            // Pinta loading
            $loading.addClass("in_view");
            OPS.pagination_loans_history_size_page($btn);
            return false;
          });
        });
      },
      /**
       *  Aplica las acciones sobre los eventos en los botones del FORMULARIO MODIFICAR NOMBRE DE LISTA
       *
       *  @method EVENTOS.titleList_form_modify
       *
       *  @param {dom object} $cont_titleList_form : Contenedor del form afectado, en este caso modificar nombre de lista
       */
      titleList_form_modify:$cont_titleList_form=>{
        const $btns_action=$cont_titleList_form.find('button[data-action],a[data-action]');
        $btns_action.on("click",e=>{
          const $btn=$(e.currentTarget);
          const datos={
            $cont_titleList_form_modify : $cont_titleList_form
          };
          OPS.actions($btn,datos);
        });
      }
    },

    OPS={
      /**
       *  Control del número de items por página
       *
       *  @method OPS.pagination_loans_history_size_page
       *
       *  @param {dom object} $btn  : botón afectado
       */
      pagination_loans_history_size_page:$btn=>{
        const $form         = $btn.closest("form");
        const $contenedor   = $form.closest(".cont_table_big_00");
        const $article      = $contenedor.closest("article");
        const $cont_alert   = $article.find(".cont_alerts");
        //const page_active   = Number($btn.closest(".pagination_loans_history").find(".pagination_normal").attr("data-page_active"));
        const page_active   = 1;
        const elementPage   = Number($btn.val());
        const urlPage       = `${$form.attr("action")}?page=${page_active}&elementPage=${elementPage}`;
        const datos={
          action : "operation-pagination"
        };
        $.get(urlPage,data=>{
          //console.log("[tmpl_my_profile_list_loans_applications.js] OPS.pagination_loans_history_size_page() urlPage",urlPage);
        }).done(data=>{
          const $pagina=data.renderedTemplate;
          OPS.pinta_pagina($pagina,$contenedor,datos);
          // Quita loading
          $loading.removeClass("in_view");
        }).fail(data=>{
    console.log("[tmpl_my_profile_list_loans_applications.js] OPS.pagination_loans_history_size_page() ERROR EN LA PETICION... urlPage",urlPage);
          Baratz.commons.controlPost(undefined,data,datos.action,$cont_alert);
          // Quita loading
          $loading.removeClass("in_view");
        });
      },

      /**
       *  Control de paginacion para el histórico de préstamos
       *
       *  @method OPS.pagination_loans_history
       *
       *  @param {dom object} $btn  : botón afectado
       */
      pagination_loans_history:$btn=>{
        const $form               = $btn.closest("form");
        const $contenedor         = $form.closest(".cont_table_big_00");
        const $article            = $contenedor.closest("article");
        const $cont_alert         = $article.find(".cont_alerts");
        const $pagination_normal  = $btn.closest(".pagination_normal");

        const page_active         = Number($pagination_normal.attr("data-page_active"));
        const pages_total         = Number($pagination_normal.attr("data-pages_total"));
        const page_size           = Number($pagination_normal.attr("data-pages_size"));

        const btn_type            = $btn.attr("data-type");

        let page=0;
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
        const urlPage=`${$form.attr("action")}?page=${page}&elementPage=${page_size}`;
        const datos={
          action : "operation-pagination"
        };

        $.get(urlPage,data=>{
    //console.log("[tmpl_my_profile_list_loans_applications.js] OPS.pagination_loans_history() urlPage",urlPage);
        }).done(data=>{
          // el fragmento es el contenedor completo con lo que nos interesa solo su interior
          const $pagina=$(data.renderedTemplate);
          OPS.pinta_pagina($pagina,$contenedor,datos);
          // Quita loading
          $loading.removeClass("in_view");
        }).fail(data=>{
          console.log("[tmpl_my_profile_list_loans_applications.js] OPS.pagination_loans_history() ERROR EN LA PETICION... urlPage",urlPage);
          Baratz.commons.controlPost(undefined,data,datos.action,$cont_alert);
          // Quita loading
          $loading.removeClass("in_view");
        });
      },

      /**
       *  Discrimina acciones a realizar a través del attr data-action del botón afectado
       *
       *  @method OPS.actions
       *
       *  @param {dom object} $btn  : botón afectado
       *  @param {object} datos  : datos que pueden ser necesarios para las acciones
       */
      actions:($btn,datos)=>{
        const isActive = $btn.hasClass("active");
        const action   = $btn.attr("data-action");
			console.log(action)
        switch(action){
          // Boton muestra / oculta form modificar nombre de lista
          case "titleList_form_modify":{
            if(!isActive){
              $btn.addClass("active");
              OPS.titleList_form_modify.add($btn);
            }
            else{
              $btn.removeClass("active");
              OPS.titleList_form_modify.remove($btn);
            }
          }
          break;
          // Boton cancela y oculta form modificar nombre de lista
          case "titleList_form_modify_cancel":{
            OPS.titleList_form_modify.remove($btn);
          }
          break;
          // Boton muestra / oculta form nueva lista
          case "titleList_form_add":{
            if(!isActive){
              $btn.addClass("active");
              OPS.titleList_form_add.open($btn);
            }
            else{
              $btn.removeClass("active");
              OPS.titleList_form_add.close($btn);
            }
          }
          break;
          // boton cancela oculta form nueva lista
          case "btn_titleList_form_add_cancel":{
            const $btn_principal=$body.find('[data-action="titleList_form_add"]');
            OPS.titleList_form_add.close($btn_principal);
          }
          break;
          case "titleList_url_efilm":{
            OPS.titleList_efilm.peticion($btn);
          }
          break;
          default:
        }
      },

      /**
       *  Pinta el fragmento de pagina retornado por back con la paginacion y datos actualizados correctamente (tanto borrar como mover como paginar)
       *
       *  @method OPS.pinta_pagina
       *
       *  @param {dom object} $pagina : pagina recibida desde el back a insertar en el contenedor
       *  @param {dom object} $contenedor : contenedor donde pintar el html de la página recibida
       *  @param {object} [opt] datos : datos que pueden ser necesarios para el pintado, por ejemplo de las modales
       */
      pinta_pagina:($pagina, $contenedor, datos)=>{
        $pagina=$("<div/>").html($pagina).find(".librarys").html();
        // evalua las acciones a realizar a través de los datos aportados
        switch(datos.action){
          case"operation-pagination":{
            // pinta tabla y paginaciones devueltas en el contenedor
            $contenedor.html($pagina);
            // Asocia de nuevo los eventos a los botones pues estos están incluidos en el compendio de retorno
            const $barras_pagination=$contenedor.find(".pagination_loans_history");
            EVENTOS.pagination($barras_pagination);
          }
          break;
          default:
        }
      },

      /**
       *  Acciones sobre el formulario añadir nueva lista
       *
       *  @cont OPS.titleList_form_add
       */
      titleList_form_add:{
        /**
         *  Muestra el form oculto para añadir una nueva lista
         *
         *  @method OPS.titleList_form_add.open
         *
         *  @param {dom object} $btn_lanzador  : boton afectado
         */
        open:$btn_lanzador=>{
          const $slide_add_list_html=$body.find("#slide_add_list_html");
          $slide_add_list_html.css({"display":"none"}).removeClass("d-none").find(".cont_titleList_form_modify").removeClass("d-none");
          $slide_add_list_html.slideDown("slow",function(){
            const $slide_add=$(this);
            // accesibilidad
            $slide_add.attr('aria-hidden','false');
            $btn_lanzador.attr("aria-expanded","true");
            $slide_add.find(".form-control").eq(0).focus();
            // Al ser un formulario comun, aplica clases para el pintado correcto del form add nueva lista
            const $cont_titleList_form_add=$slide_add.find(".cont_titleList_form_modify");
            $cont_titleList_form_add.removeClass("cont_titleList_form_modify").addClass("cont_titleList_form_add");
            $cont_titleList_form_add.find(".btn_titleList_form_modify_cancel").removeClass("btn_titleList_form_modify_cancel").addClass("btn_titleList_form_add_cancel").attr("data-action","btn_titleList_form_add_cancel");
            $cont_titleList_form_add.find(".btn_modificar").removeClass("btn_modificar").addClass("btn_titleList_form_add");
          });
        },
        /**
         *  Oculta el form para añadir una nueva lista
         *
         *  @method OPS.titleList_form_add.close
         *
         *  @param {dom object} $btn_principal  : Boton lanzador principal que pinta la capa
         */
        close:$btn_principal=>{
          const $slide_add_list_html=$body.find("#slide_add_list_html");
          $slide_add_list_html.slideUp("slow",function(){
            // accesibilidad
            $(this).attr('aria-hidden','true');
            $btn_principal.attr("aria-expanded","false").removeClass("active");
          });
        },
      },

      /**
       *  Acciones sobre el formulario modificar nombre de lista
       *
       *  @cont OPS.titleList_form_modify
       */
      titleList_form_modify:{
        /**
         *  Inserta el formulario de modificacion en linea del boton lanzador y lo pinta en pantalla
         *
         *  @method OPS.titleList_form_modify.add
         *
         *  @param {dom object} $btn_lanzador  : Botón afectado
         */
        add:$btn_lanzador=>{
          const $li       = $btn_lanzador.closest("li").addClass("form_in_view");
          // id para aplicar en el input hidden y modificar ese item
          // si no se envía este dato, se añade una nueva lista
          const li_id     = $li.attr('data-id');
          const $cont     = $li.closest("ul").parent();
          const $titleList_form_modify = $cont.find("#titleList_form_modify").html();
          $li.prepend($titleList_form_modify);
          const $item_title = $li.find(".item_title");
          const item_title  = $item_title.text();
          $li.find('[name="name"]').val(item_title);
          $item_title.stop(true).animate({"opacity":"0"},"slow",function(){
            $(this).addClass("d-none");
            const $cont_titleList_form_modify=$li.find(".cont_titleList_form_modify");
            // Aplica el id en el input hidden
            const $input_id=$cont_titleList_form_modify.find('[name="id"]');
            $input_id.val(li_id);
            // Aplica plugin el input a la vista
            const $form_groups=$cont_titleList_form_modify.find(".form-group");
            Baratz.tmpls_actions.EMULATE_BMD($form_groups);
            $cont_titleList_form_modify.removeClass("d-none").attr("id","cont_titleList_form_modify_"+li_id);
            // accesibilidad
            $cont_titleList_form_modify.attr('aria-hidden', 'false');
            $btn_lanzador.attr({"aria-expanded":"true","aria-controls":"cont_titleList_form_modify_"+li_id});
            $cont_titleList_form_modify.find(".form-control").eq(0).focus();
            $cont_titleList_form_modify.find("[name='name']").attr("id","input_id_"+li_id).closest(".form-group").find("label").attr("for","input_id_"+li_id);
            // eventos de los botones asociados en el form modificacion de nombre de lista
            EVENTOS.titleList_form_modify($cont_titleList_form_modify);
            const $form=$cont_titleList_form_modify.find("form");
            Baratz.tmpls_actions.CTRL_LOADING($form);
          });
        },
        /**
         *  Oculta y borra el formulario para la modificación del nombre de lista en la línea del botón afectado
         *
         *  @method OPS.titleList_form_modify.remove
         *
         *  @param {dom object} $btn_lanzador  : Botón afectado
         */
        remove:$btn_lanzador=>{
          const $li=$btn_lanzador.closest("li").removeClass("form_in_view");
          const $item_title=$li.find(".item_title");
          $li.find(".cont_titleList_form_modify").stop(true).animate({"opacity":"1"},"slow",function(){
            $(this).remove();
            $item_title.removeClass("d-none").stop(true).animate({"opacity":"1"},"slow",function(){
              // accesibilidad
              $btn_lanzador.attr("aria-expanded","false").removeAttr("aria-controls");
              $(this).focus();
            });
            $li.find(".btn_titleList_form_modify").removeClass("active");
          });
        },

      },

      /**
       *  Acciones sobre los botones 'Ver streaming' de la lista efilm
       *
       *  @cont OPS.titleList_efilm
       */
      titleList_efilm:{
        /**
         *  Pinta una modal de error en pantalla con un mensaje dado
         *
         *  @method OPS.titleList_efilm.modal_error
         *
         *  @param {dom object} $btn: Botón lanzador
         *  @param {str} messsage: Mensaje a pintar en el body de la modal de error
         */
        modal_error:($btn,message)=>{
          const $body=$(document.body);
          let $modal=$body.find("#modal_error_efilm");
          if($modal.length==0){
            const modal=`<div class="modal modal_type_danger fade" id="modal_error_efilm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Efilm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}" title="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    ${message}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn_cerrar btn btn-outline-secondary" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                      <span class="btn_title" aria-hidden="true">${Baratz.i18n_js.modales_js.btn_cerrar_text}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
            $modal=$(modal).appendTo($body);
          }
          $modal.on({
            // cuando ya está abierta
            'shown.bs.modal':()=>{
              $modal.find(".close").focus();
            },
            // cuando ya está cerrada
            'hidden.bs.modal':()=>{
              // foco en el boton de lanzamiento
              $btn.find(".icono_ajax").remove();
              $btn.focus();
              $modal.remove();
            }
          });
          $modal.modal('show');
        },

        /**
         *  Realiza una petición para recibir la url correspondiente al streaming y abrir una nueva pestaña
         *
         *  @method OPS.titleList_efilm.peticion
         *
         *  @param {dom object} $btn : botón afectado
         */
        peticion:($btn)=>{
          const url = $btn.attr("data-href");
          if(url.length>0){
              const win=window.open(url, '_blank');
              win.focus();
            }
            // Si es incorrecto muestra modal de error con el mensaje
            else{
              OPS.titleList_efilm.modal_error($btn,Baratz.i18n_js.streaming.error.url);
            }
        },
      }
    };

    const $body=$(document.body);
    const $loading=$body.find(".loading");
    INIT();
  },

});

console.log("[tmpl_my_profile_lists_loans_applications] CARGA");