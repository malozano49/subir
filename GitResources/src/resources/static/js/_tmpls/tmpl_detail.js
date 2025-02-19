/**
 *  @file        : _tmpl_plantilla.js
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

console.log("[tmpl_detail.js] CARGA");

if (!Baratz.detail){
  Baratz.detail={
    body:$(document.body),
  };
}

/**
 *  Contenedor de acciones en la vista infos FAQ
 *
 *  @obj Baratz.detail
 *
 */
Object.assign(Baratz.detail,{
  // INICIALIZACION
  init:async()=>{
    // Ellipsis con botón 'ver más' en la descripción del item cuando supera las 10 líneas
    const $conts_ellipsis=Baratz.detail.body.find(".item-summary");
    await Baratz.detail.TMPL.ctrl_item_summary($conts_ellipsis);

    Baratz.tmpls_actions.UTILS.text2link($conts_ellipsis);
    Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($conts_ellipsis,10);

    // Ellipsis con botón 'ver más' en más detalles-<contenido (tipo 505) cuando supera las 10 líneas
    const $linea_type_t505=Baratz.detail.body.find(".linea_type_t505");
    Baratz.detail.TMPL.ctrl_type_505_ellipsis($linea_type_t505);

    // Revisa las anclas antes de lanzar el plugin para navegacion interna
    Baratz.detail.OPS.revisa_anchors();

    // Si existe contenedor de búsqueda con la capa de filtros avanzados
    const $cont_filtros_busqueda=Baratz.detail.body.find(".cont_filtros_busqueda");
    if($cont_filtros_busqueda.length>0){
      const listOfJS=[
        "js/_tmpls/tmpl_advanced_search_filters.js"
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        Baratz.advanced_search_filters.TMPL();
      });
    }

    // Acciones en la vista
    Baratz.detail.TMPL.anchors_summary_location();
    Baratz.detail.TMPL.btns_cont_filtros_events();
    // Acciones para el evento change del select de selección de Biblioteca/sucursal de la barra tools de localizaciones (si existe)
    Baratz.commons.changeLibraryBranch();
  },
  // EVENTOS
  eventos:()=>{


  },
  // OPERACIONES
  OPS:{
    /**
     *  Uso para el plugin Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT
     *
     *  @method Baratz.detail.OPS.revisa_anchors
     *
     *  @details:
     *    - Establece la discriminación de uso para el plugin a traves del flag Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active
     *    - Inserta los attr y clases necesarias para el plugin de navegación anchors, teniendo en cuenta la inclusión de módulos desde back
     *
     */
    revisa_anchors:()=>{
      Baratz.detail.body.find("#suggestions_item_explore").removeAttr("data-skip_to_content");
      /* // activar o desactivar la vista de navegacion interna,
      //sólo afectará a la vista ya que cada página carga su js. Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT(),
      Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active=true;
      Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT(); */
      console.log('revisa_anchors()')
    }
  },
  TMPL:{

    /**
     *  Pinta la url necesaria en el botón para la modal de localizacion de sucursal (.modal_branchLocation)
     *
     *  @method Baratz.detail.TMPL.pinta_enlace_branch
     */
    pinta_enlace_branch:(datos_modal)=>{
      const datos_mapa=Baratz.tmpls_actions.UTILS.genera_enlace_mapa(datos_modal.datos,"google-url");
      if(datos_mapa.hayBoton){
        datos_modal.$modal.find(".branch_botonera .btn").attr("href",`${datos_mapa.url}`);
      }
      else{
        datos_modal.$modal.find(".branch_botonera .btn").addClass("oculto").attr("aria-hidden","true");
      }
    },
    /**
     *  Pinta la url necesaria en el botón para la modal de localizacion de biblioteca (.modal_libraryLocation)
     *
     *  @method Baratz.detail.TMPL.pinta_enlace_library
     */
    pinta_enlace_library:(datos_modal)=>{
      const datos_mapa=Baratz.tmpls_actions.UTILS.genera_enlace_mapa(datos_modal.datos,"google-url");
      if(datos_mapa.hayBoton){
        datos_modal.$modal.find(".library_botonera .btn").attr("href",`${datos_mapa.url}`);
      }
      else{
        datos_modal.$modal.find(".library_botonera .btn").addClass("oculto").attr("aria-hidden","true");
      }
    },
    /**
     *  Preparación del campo Más detalles -> Contenido (tipo 505), para aplicar ellipsis con botón ver más
     *
     *  @method Baratz.detail.TMPL.ctrl_type_505_ellipsis
     *
     *  @param {dom object} $linea_type_t505 : linea .linea_type_t505 donde aplicar la ellipsis (se aplica .cont_ellipsis_multiline)
     */
    ctrl_type_505_ellipsis:($linea_type_t505)=>{
      $linea_type_t505.addClass("cont_ellipsis_multiline");
      // incrustación de botón 'ver mas'
      $('<button type="button" class="btn btn-white btn_expand_type_505 float-right mt-2" aria-label="Expand text"><span class="icono fas fa-plus" aria-hidden="true"></span></button>').appendTo($linea_type_t505);
      const $field_content=$linea_type_t505.find(".field-content");
      // Clases y datas necesarios
      $field_content.addClass("ellipsis_multiline multiline_expand").attr("data-btn_expand","btn_expand_type_505");
      Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($linea_type_t505,10);
    },

    /**
     *   Puede ser que haya más de un párrafo en .item-summary, con lo que se aplica separación entre párrafos para mejorar la vista
     *
     *   @method Baratz.detail.TMPL.ctrl_item_summary
     *
     *   @details Ejemplo:
     *      .../public/catalog/detail/b2FpOmRpYWxuZXQudW5pcmlvamEuZXM6QVJUMDAwMDg3MDA0MQ?tabId=1622619822210
     */
    ctrl_item_summary:($conts_ellipsis)=>{
      const retorno=new Promise(resolve => {
        const $parrafos=$conts_ellipsis.find("p");
        if($parrafos.length>1){
          const $parrafo_inicial=$parrafos.eq(0);
          $parrafo_inicial.nextAll().each((i,e)=>{
            const $cont=Baratz.detail.body.find(e);
            // Inserta 2 saltos de línea como separación
            $parrafo_inicial.append("<br/><br/>").append($cont.text());
            $cont.remove();
          });
        }
        resolve();
      });
      return retorno;
    },
    /**
     *  Aplica scroll en la navegación interna a las anclas de la capa .summary-location
     *
     *  @method Baratz.detail.TMPL.anchors_summary_location
     */
    anchors_summary_location:()=>{
      const $summary_location=Baratz.detail.body.find(".summary-location");
      const $links_summary_location=$summary_location.find(".link");
      // Al click en los items .link
      $links_summary_location.on("click",(e)=>{
        const $link=Baratz.detail.body.find(e.currentTarget);
        const anchor=$link.attr("href");
        const $capa=Baratz.detail.body.find(anchor);
        Baratz.tmpls_actions.UTILS.scroll_anchor($capa);
        return false;
      });
    },
    /**
     *  Aplica acciones a los eventos de los botones de filtrado en la barra-tools
     *
     *  @method Baratz.detail.TMPL.btns_cont_filtros_events
     */
     btns_cont_filtros_events:()=>{
      const $cont_total_results_bar=Baratz.detail.body.find(".cont_total_results_bar");
      const $cont_filtros=$cont_total_results_bar.find(".cont_filtros");
      const $btns=$cont_filtros.find(".page-item").not(".disabled").find(".btn");
      $btns.on("click",(e)=>{
        // Aplica icono loading
        const $loading=Baratz.detail.body.find(".loading");
        $loading.addClass("in_view");
      });
    }
  },

});