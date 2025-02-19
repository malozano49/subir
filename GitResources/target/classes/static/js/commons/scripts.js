/**
 *  @file        : scripts.js
 *
 *  @description : Js para auto-lanzamiento de plugins y control de pintados
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 *
 *  HAY @TODO
 */
// jshint jquery :true, esversion:10
/* globals Baratz,consoleScript,Swiper,jsSocials,Sortable */
    function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

var listaBotones = document.getElementsByClassName('btn_search');
for (var s = 0; s < listaBotones.length; s++) {	
	listaBotones[s].addEventListener("click", function(event){
		if(!document.getElementById('mainAccessLink').value || document.getElementById('mainAccessLink').value=='' || document.getElementById('mainAccessLink').value==false){	
			alert('la búsqueda está vacía');
			event.stopImmediatePropagation();
	  		event.preventDefault();
  		}
  	});
 }

var inputFunction = (function() {
    waitForElm('#selectSources').then((elm) => {
        var contenedorChecks = document.getElementsByClassName('cont_checks')[0];
        var inputss = $("input:radio");
        var circuloCheck = document.getElementsByClassName('cont_nuevo_radio');
        var opcionesDesplegable =  document.querySelector('#selectSources');

        for (var g = 0; g < inputss.length; g++) {
            if (inputss[g].id == 'any-source') {

                document.getElementById('selectSources').innerHTML += `<option value="Cualquier Origen">Cualquier Origen</option>`;
            } else {
                document.getElementById('selectSources').innerHTML += `<option value="` + inputss[g].id + `">` + inputss[g].id + `</option>`;
            }
            var sourceSelect = document.getElementById('selectSources');

            //EVENTOS
            sourceSelect.addEventListener("change", function(ev) {
                var selIndex = ev.currentTarget.selectedIndex;
                for (var h = 0; h < inputss.length; h++) {
                    if (selIndex == h) {
                    }
                }

                for (var i = 0; i < circuloCheck.length; i++) {
                    if (selIndex == i) {
                         circuloCheck[i].click()
                         $(circuloCheck[i]).trigger('click');
                         $(circuloCheck[i])[0].click();
                         $(circuloCheck[i].id).trigger('click');
                    }
                }
            });
        }
        setTimeout(function(){
             for (var k = 0; k < circuloCheck.length; k++) {
					if(circuloCheck[k].classList.contains('activado')){
						document.getElementById('selectSources').click();
						document.querySelectorAll('[data-id="selectSources"]')[0].click();
						document.getElementById('bs-select-2-'+k).click();
					}                
                }	
        }, 500);
    });
})(); 

console.log("[scripts.js] CARGA");
/**
 *  Extensión del objeto Baratz para poder acceder a cualquier contenedor otros js y entre ellos
 *
 *  @obj Baratz.tmpls_actions
 *
 *  @details Iniciliza Baratz.tmpls_actions en [utils.js]
 */
Object.assign(Baratz.tmpls_actions,{

  /**
   *  Ejecucion de todos los contenedores, con vistas a evaluar su utilidad dentro de una vista
   *
   *  @cont Baratz.tmpls_actions.GENERAL
   */
  GENERAL:function(){
consoleScript.log("[scripts.new.js] ACTIONS.GENERAL()");
    // -----------------------------
    // Tooltip bootstrap
    // -----------------------------
    //$('[title]').tooltip();

    const TMPL=this;

    // controla la activacion de opciones ultimas busquedas y busquedas guardadas en el menu
    TMPL.CTRL_MENU_BTNS_SEARCHS();

    // pintado de precarga para las imégenes que lo necesiten
    TMPL.FALLBACK_IMAGES(".img_on_load");

    // acciones referentes a las tablas '.table_big_00'
    TMPL.TABLE_BIG_00();

    // acciones sobre los botones en los filtros (facetas) en la lista de resultados
    TMPL.BTNS_EXPAND_FACETS();

    // Radio y checks buttons tuneados y accesibles
    TMPL.TUNNING_RADIO_CHECKS();

    // Slider reservas
    TMPL.RANGE_SLIDER();

    // Botonera flotante
    TMPL.BOTONERA_FLOTANTE();

    // Gestiona acciones para vistas determinadas a través de body data-tipo_vista=",..."
    TMPL.GESTION_VISTA();

    // Despliegue del menu lateral
    TMPL.MENU_LATERAL();

    // Busqueda de términos
    TMPL.QUICKSEARCH();

    // Gestion de modales
    TMPL.MODALES_JS();

    // formularios formato BMD
    TMPL.EMULATE_BMD();

    // aplica plugin bootsrap-select
    TMPL.APPLY_SELECTPICKERS();

    // acciones referentes al carousel de imágenes
    TMPL.CAROUSEL();

    // truncate en el contenedor .item-summary para elementos con clase .ellipsis_multiline
    const $conts_ellipsis=$(document.body).find(".item-summary");
    TMPL.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($conts_ellipsis,10);

    // Efectúa acciones sobre selects específicos
    TMPL.CTRL_SELECT_ACTIONS();

    // Prueba codificacion para campos data
/*
    const objeto=[
      {"prueba":"valor"},
        {"prueba2":["patata","{castaña pilonga}"]}
    ];

    const prueba=TMPL.UTILS.object2data(objeto);
consoleScript.log("prueba....................",prueba)

    const objeto_final=TMPL.UTILS.data2object(prueba);
consoleScript.log("objeto_final....................",objeto_final)
*/

    // Pinta hoja de almanaque
    TMPL.DATETIME_ALMANAC();

    // si hay botones con mensaje de accion
    TMPL.BTN_MESSAGE();

    // vistas de items en lista, carousel, mosaico ó tabla
    TMPL.CTRL_VIEWS();

    // iconos de redes sociales
    TMPL.JSSOCIAL_SHARE();

    // barra de navegacion interna accesible
    TMPL.ACCESIBLE_SKIP_TO_CONTENT();

    // componentes sortable (listas reordenebales por interaccion drag&drp)
    TMPL.CMP_SORTABLE();

    TMPL.SIMPLE_PAGINATION();

    TMPL.FILTERIZE_MARKJ();

    // Selects con la clase .selects_dependientes_js
    TMPL.SELECTS_DEPENDIENTES.initialize();

    // Barra cookies
    TMPL.CTRL_COOKIES_BAR();

    // datetimepicker
    TMPL.CTRL_DATETIMEPICKER();

    // Deplegables a traves de boton (infos ultimas actividades y enlaces de interés)
    TMPL.CTRL_ALERT_WITH_BUTTON();

    // acciones sobre los botones en las localizaciones
    TMPL.BTNS_EXPAND_LOCATIONS();
  },

  /**
   *  Características de los tipos de vista lista y mosaico
   *
   *  @method Baratz.tmpls_actions.CTRL_VIEWS
   */
  CTRL_VIEWS:function(){

    const INIT=()=>{
      TMPL.mosaic($view_type_mosaic);
      TMPL.tabla($view_type_tabla);
    },
    /**
     *  Template
     */
    TMPL={
      /**
       *  Control de las vistas mosaico en la página
       *
       *  @method TMPL.mosaic
       *
       *  @param {dom object} $mosaics  : vista mosaico en la página
       */
      mosaic:$mosaics=>{
        $mosaics.each((i,e)=>{
          const $mosaic=$(e);
          const $items=$mosaic.find("li");
          OPS.titles_ellipsis($items);
          EVENTS.mosaic($items);
        });
      },
      /**
       *  Control de las vistas tabla en la página
       *
       *  @method TMPL.tabla
       *
       *  @param {dom object} $tablas  : vista tabla en la página
       */
      tabla:$tablas=>{
        $tablas.each((i,e)=>{
          const $tabla=$(e).find(".tabla-main");
          const manager = $tabla.data("manager");
          if (manager)
        	  OPS.inserta_btn_removeItem($tabla);
        });
      },
    },
    /**
     *  Contenedor de eventos asociados en cada tipo de vista
     */
    EVENTS={
      /**
       *  Acciones sobre los eventos a aplicar en los elementos contenidos en la vista mosaico
       *
       *  @method EVENTS.mosaic
       *
       *  @param {dom object} $items  : lista de elemntos de la vista
       */
      mosaic:$items=>{
        // click, hover activa la vista de los datos
        $items.on({
          "click":e=>{
            const $el=$(e.currentTarget);
            const isClicked=$el.hasClass("clicked");
            if(!isClicked){
              $el.addClass("clicked");
              $el.find(".item-title .link,.item-title .btn").focus();
            }
            else{
              $el.removeClass("clicked active");
            }
            // solo permite click externo si el tag contenedor es .item-title
            const isItemTitle=($(e.target).closest(".item-title").length>0);
            if(!isItemTitle){
              return false;
            }
          },
          "mouseenter":e=>{
            const $el=$(e.currentTarget);
            $el.addClass("active");
          },
          "mouseleave":e=>{
            const $el=$(e.currentTarget);
            $el.removeClass("active");
          }
        });

        // navegacion por focus en los elementos
        $items.find(".link,.btn").on("focus",e=>{
          const $item=$(e.currentTarget);
          const $li=$item.closest("li");
          $li.addClass("clicked");
        });
      },
      /**
       *  Acciones a aplicar en los elementos contenidos en la vista tabla
       *
       *  @cont EVENTS.tabla
       */
      tabla:{
        /**
         *  Elimina un item en el back
         *
         *  @method EVENTS.tabla.removeItemBack
         *
         *  @param {object} datos: Datos del item a eliminar
         *  @param {dom object} $item: Item a eliminar de la vista
         */
        removeItemBack:(datos,$item)=>{
          // acciones a realizar vía data-name de .table-main
          switch(datos.tablaName){
            // manager -> Títulos recomendados
            // 210122: Se omite la paginacion front con lo que esta accion queda únicamente como ejemplo en paginacion front
            case"Recomendados":{
              //Baratz.manager_recomended.elimina_item_tabla(datos);
            }
            break;
            default:
          }
          // ELIMINA EL ITEM DE LA VISTA
          $item.remove();
        },

        /**
         *  Eventos sobre botón remove items creado en OPS.inserta_btn_removeItem() para cada item
         *
         *  @method EVENTS.tabla.btn_removeItems
         *
         *  @param {dom object} $btn : botón afectado
         */
        btn_removeItems:$btn=>{
          $btn.on("click",e=>{
            const $el=$(e.currentTarget);
            const $item=$el.closest("li");
            const $tabla_main=$item.closest(".tabla-main");
            const tablaName=$tabla_main.attr("data-code");
            const $cont_views=$item.closest(".cont_views");
            const isManager=$item.attr("data-manager");
            // objeto para enviar para realizar distintas acciones
            const datos={
              isManager   : isManager,
              tablaName   : tablaName,
              $cont_views : $cont_views,
              $item       : $item,
              action      : "delete"
            };
            // repaginar
            const $pagination= $cont_views.find(".pagination");
            // Si hay paginacion front via js
            if($pagination.length>0){
              $pagination.each((i,e)=>{
                $(e).pagination("destroy");
              });
              const $pagination_js=$cont_views.find(".pagination_js");
              Baratz.tmpls_actions.SIMPLE_PAGINATION($pagination_js);
              EVENTS.tabla.removeItemBack(datos,$item);
            }
            else{
              EVENTS.tabla.removeItemBack(datos,$item);
            }
          });
        }
      }
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Aplica ellipsis multiline a los items aportados
       *
       *  @method OPS.titles_ellipsis
       *
       *  @param {dom object} $items  : items donde aplicar ellipsis multiline
       */
      titles_ellipsis:$items=>{
        const $cont_image=$items.find(".cont_image");
        Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($cont_image,3);
        const $cont_title=$items.find(".cont_title");
        Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($cont_title,5);
      },
      /**
       *  Aplica eventos a los botones para eliminar cada item
       *
       *  @method OPS.inserta_btn_removeItem
       *
       *  @param {dom object} $tabla: Tabla afectada
       */
      inserta_btn_removeItem:$tabla=>{
    	  //const manager = $tabla.data("manager");
        const $items=$tabla.find("li");
        $items.each((i,e)=>{
          const $item=$(e);
          const $btnx=$item.find(".btn_tabla_removeItem");
          EVENTS.tabla.btn_removeItems($btnx);
        });
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $view_type_mosaic=$body.find(".view_type_mosaic");
    const $view_type_tabla=$body.find(".view_type_tabla");
    const hay_view_type_mosaic=$view_type_mosaic.length>0;
    const hay_view_type_tabla=$view_type_tabla.length>0;
    if(hay_view_type_mosaic || hay_view_type_tabla){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_VIEWS()");
      INIT();
    }
  },

  /**
   *  Controla la activación de opciones ultimas busquedas y busquedas guardadas en el menu
   *
   *  @method Baratz.tmpls_actions.CTRL_MENU_BTNS_SEARCHS
   */
  CTRL_MENU_BTNS_SEARCHS:function(){
    const $body=$(document.body);
    const $main_type_records=$body.find(".main_type_records");
    if($main_type_records.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_MENU_BTNS_SEARCHS()");
      const is_cont_page_historySearch=$main_type_records.hasClass("cont_page_historySearch");
      const is_cont_page_lastSearchs=$main_type_records.hasClass("cont_page_lastSearchs");
      if(is_cont_page_historySearch||is_cont_page_lastSearchs){
        const $navbarSupportedContent=$body.find("#navbarSupportedContent");
        $navbarSupportedContent.find(".nav-item.active").removeClass("active");
        if(is_cont_page_historySearch){
          $navbarSupportedContent.find(".cont_btn_last_search").addClass("active");
        }
        if(is_cont_page_lastSearchs){
          $navbarSupportedContent.find(".cont_btn_historico").addClass("active");
        }
      }
    }
  },

  /**
   *  Pinta una hoja de almanaque a través del contenido datetime de un campo
   *
   *  @method Baratz.tmpls_actions.DATETIME_ALMANAC
   */
  DATETIME_ALMANAC:function(){

    const INIT=()=>{
      $js_transform_datetime.each((i,e)=>{
        const $fecha=$(e);
        const string_a_transformar=$fecha.attr("data-fecha_string");
        const obj_fecha=OPS.transform_date(string_a_transformar);
        const printHora=JSON.parse($fecha.attr("data-print_hora")||false);
        if(printHora==true){
          obj_fecha.printHora=true;
        }
        else{
          obj_fecha.printHora=false;
        }
        const fecha_accesible=$fecha.attr("data-fecha_accesible");
        const $hoja=TMPL.crea_hoja(obj_fecha,fecha_accesible);
        $fecha.parent().append($hoja);
      });
    },
    /**
     *  Template
     */
    TMPL={
      /**
       *  Crea el template html de una hoja de almanaque
       *
       *  @method TMPL.crea_hoja
       *
       *  @param {object} obj_fecha  : objeto con los datos de una fecha
       *  @param {string} fecha_accesible  : string a pintar para una lectura de fecha accesible
       *
       *  @return {string} plantilla : montaje html
       */
      crea_hoja:(obj_fecha,fecha_accesible)=>{
        let plantilla=`<div class="cont_almanaque">
          <p class="titulo_almanaque sr-only">${fecha_accesible}</p>
          <div class="almanaque_hoja" aria-hidden="true">
            <div class="zona_titulo">
              <span class="anho">${obj_fecha.anho}</span>
              <span class="mes_nom">${obj_fecha.mes_nombre}</span>
            </div>
            <div class="zona_cuerpo">
              <span class="dia_nom">${obj_fecha.dia_nombre}</span>
              <span class="dia_num">${obj_fecha.dia}</span>`;
         if(obj_fecha.printHora){
            plantilla+=`<div class="cont_hora">
              <span class="hora">${obj_fecha.hora}</span>
              <span class="min">${obj_fecha.min}</span>
              <span class="seg">${obj_fecha.seg}</span>
            </div>`;
         }
          plantilla+=`</div>
          </div>
        </div>`;
        return plantilla;
      },
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Crea un tag inteligilble al lector de pantallas para la fecha
       *
       *  @method OPS.transform_date
       *
       *  @param {string} string_a_transformar  : Fecha en formato dd/mm/aaaa hh:mm:ss
       *
       *  @return {object} retorno : objeto con los datos de la fecha para su uso posterior
       */
      transform_date:string_a_transformar=>{
        const retorno={
          dia:"",
          mes:"",
          anho:"",
          hora:"",
          min:"",
          seg:""
        };
        const string_f=string_a_transformar.split(" ");

        const fecha=string_f[0];
        const hora=string_f[1];

        const comp_fecha=fecha.split("/");
        retorno.dia=comp_fecha[0];
        retorno.mes=comp_fecha[1];
        retorno.anho=comp_fecha[2];

        const comp_hora=hora.split(":");
        retorno.hora=comp_hora[0];
        retorno.min=comp_hora[1];
        retorno.seg=comp_hora[2];

        // incluye nombre de mes en el objeto
        const cambio_mes=OPS.convierte_mes_a_string(retorno.mes);
        retorno.mes_nombre=cambio_mes;

        // incluye el nombre de dia de la semana en el objeto
        const fecha_para_cambio=retorno.dia+"/"+retorno.mes+"/"+retorno.anho;
        const cambio_dia=OPS.convierte_dia_a_string(fecha_para_cambio);
        retorno.dia_nombre=cambio_dia;
        return retorno;
      },
      /**
       *  Convierte un numero de mes a su nombre
       *
       *  @method OPS.convierte_mes_a_string
       *
       *  @param {string} mes_para_cambio  : mm
       *
       *  @return {string} retorno : nombre del mes
       */
      convierte_mes_a_string:mes_para_cambio=>{
        const pos=parseInt(mes_para_cambio,10);
        const retorno=array_meses[pos-1];
        return retorno;
      },
      /**
       *  Transforma un fecha en nombre de dia de la semana
       *
       *  @method OPS.convierte_dia_a_string
       *
       *  @param {string} fecha  : dd/mm/aaaa
       *
       *  @return {string} retorno : nombre del dia
       *
       *  @detail tiene en cuenta bisiestos
       */
      convierte_dia_a_string:fecha=>{
        fecha=fecha.split('/');
        if(fecha.length!=3){
            return null;
        }
        // Día especificado en la fecha recibida por parámetro.
        const dia=fecha[0];
        //Módulo acumulado del mes especificado en la fecha recibida por parámetro.
        let mes=fecha[1]-1;
        // Año especificado por la fecha recibida por parámetros.
        const anno=fecha[2];
        // Comparación para saber si el año recibido es bisiesto.
        if((anno % 4 ===0) && !(anno % 100 ===0 && anno % 400 !== 0)){
          mes=bisiesto[mes];
        }
        else{
          mes=regular[mes];
        }
        const dia_de_la_semana=semana[Math.ceil(Math.ceil(Math.ceil((anno-1)%7)+Math.ceil((Math.floor((anno-1)/4)-Math.floor((3*(Math.floor((anno-1)/100)+1))/4))%7)+mes+dia%7)%7)-1];
        // Se retorna el resultado del calculo del día de la semana.
        return dia_de_la_semana;
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const array_meses=Baratz.i18n_js.datetime_almanac.array_meses.split(",");
    // Vector para calcular día de la semana de un año regular.
    const regular =[0,3,3,6,1,4,6,2,5,0,3,5];
    // Vector para calcular día de la semana de un año bisiesto.
    const bisiesto=[0,3,4,0,2,5,0,3,6,1,4,6];
    // Vector para hacer la traducción de resultado en día de la semana.
    const semana=Baratz.i18n_js.datetime_almanac.array_dias.split(",");

    const $body=$(document.body);
    const $js_transform_datetime=$body.find(".js_transform_datetime");
    if($js_transform_datetime.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.DATETIME_ALMANAC");
      INIT();
    }

  },

  /**
   *  Controla el pintado del spinner al realizar un submit (no en modales)
   *
   *  @method Baratz.tmpls_actions.CTRL_LOADING
   */
  CTRL_LOADING:function($forms){

    const INIT=()=>{
      // Flujo comun para formularios
      OPS.init_forms();
    },
    OPS={
      /**
       *  Si el form es válido según validación HTML5, se muestra el icono "loading"
       *
       *  @method OPS.muestra_loading
       *
       *  @param {dom object} $form: Formulario jquery
       */
      muestra_loading:($form)=>{
        const isValid=$form[0].reportValidity();
        // Validacion HTML5, pinta alertas en errores y no para la ejecución
        if(isValid && !$loading.hasClass("in_view")){
          $loading.addClass("in_view");
        }
      },
      /**
       *  Inicializa en formularios
       *
       *  @method OPS.init_forms
       */
      init_forms:()=>{
        // Debido al uso de mensaje traducido, .loading siempre existe en el footer
        /* const hayLoading=($footer_principal.find(".loading").length>0);
        if(!hayLoading){
          const loading=`<div class="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only">
                  Cargando...
              </span>
            </div>
          </div>`;
          $footer_principal.append(loading);
        } */

        // EXCEPCIONES: Ids de forms donde no se pinta loading por la causa que sea
        const excepciones=["form_loadMarcFiles","form_harvestOAIData","form_deleteData"];
        $forms.each((i,e)=>{
          const $form=$(e);
          let id=$form.attr("id");
          if(typeof(id)==="undefined"){
            id=$form.attr("name");
          }
          const isExcepcion=excepciones.includes(id);
          // EXCEPCIONES: En las modales no se pinta loading
          const isInModal=($form.closest(".modal").length>0);
          if(!isExcepcion && !isInModal && !$form.hasClass("no_icono_loading")){
            EVENTOS.forms($form);
          }
        });
      },
    },
    /**
     *  Acciones sobre los eventos
     *
     *  @cont EVENTOS
     */
    EVENTOS={
      /**
       *  Aplica acciones a los eventos submit en general, en un form dado
       *
       *  @method EVENTOS.forms
       *
       *  @param {dom object} $form  : formulario afectado
       */
      forms:($form)=>{
        const $loading=$footer_principal.find('.loading');
        // Afecta tambien al botón submit de la botonera flotante
        // No afecta al resto de la ejecución de acciones ya que sigue propagando el evento
        $form.on('submit',()=>{
          OPS.muestra_loading($form);
        });
        // No afecta al resto de la ejecución de acciones ya que sigue propagando el evento
        $form.find('[type="submit"]').on("click",()=>{
          OPS.muestra_loading($form);
        });
      },
      /**
       *  Aplica acciones en los eventos para las vistas opac-admin
       *
       *  @method EVENTOS.opac_admin
       */
      opac_admin:()=>{
        // Pestaña de monitorización
        // No afecta al resto de la ejecución de acciones ya que sigue propagando el evento
        $link_monitor.on("click",()=>{
          $loading.addClass("in_view");
        });
      }
    };
    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $footer_principal=$body.find(".footer_principal");
    const $loading=$footer_principal.find('.loading');
    if(typeof($forms)==="undefined"){
      $forms=$body.find("form");
    }
    if($forms.length>0){
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_LOADING() FORMS");
      INIT();
    }
    // Para las páginas opac-admin, pestaña de monitorización
    const $link_monitor=$body.find(".link_monitor");
    if($link_monitor.length>0){
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_LOADING() OPAC_ADMIN");
      EVENTOS.opac_admin();
    }
  },

  /**
   *  Efectúa acciones sobre selects específicos
   *
   *  @method Baratz.tmpls_actions.CTRL_SELECT_ACTIONS
   *
   *  @details
   *    • A traves de [data-ctrl_select_actions] se seleccionan los selects afectados
   *    • [data-actions_time="initial"], indica que las acciones se deben de realizar al ready de la página
   *    • [data-actions_data] indica valores a tener en cuenta a la hora de realizar las acciones
   */
  CTRL_SELECT_ACTIONS:function(){

    const INIT=()=>{
      $selects.each((i,e)=>{
        const $select=$(e);
        const actions_time=$select.attr("data-actions_time");
        if(actions_time=="initial"){
          OPS.select.gestiona($select);
        }
        const isDisabled=($select.closest(".cont_select_disabled").length===1);
        if(!isDisabled){
          EVENTOS($select);
        }
      });
    },
    /**
     *  EVENTOS RELACIONADOS
     */
    EVENTOS=($select)=>{
      $select.on("change",e=>{
        const $select_ctrl=$(e.currentTarget);
        OPS.select.gestiona($select_ctrl);
      });
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Operaciones sobre un select
       */
      select:{
        /**
         *  Discrimina las acciones sobre un select segun [data-ctrl_select_actions]
         *
         *  @method OPS.select.gestiona
         *
         *  @param {dom object} $select_ctrl  : select afectado
         */
        gestiona:$select_ctrl=>{
          const ctrl_select_actions=$select_ctrl.attr("data-ctrl_select_actions");
          const actions_data=$select_ctrl.attr("data-actions_data");
          switch(ctrl_select_actions){
            // [admin/properties/subcatalog.html] : Muestra / oculta una capa segun el valor del select
            case"subcatalog_type":{
              const valor=$select_ctrl.val();
              const $capa_afectada=$body.find("#"+actions_data);
              const actions_time=$select_ctrl.attr("data-actions_time");
              if(actions_time=="initial"){
                $select_ctrl.removeAttr("data-actions_time");
                if(valor=="MANUAL"){
                  $capa_afectada.addClass("d-none");
                }
              }
              else{
                if(valor=="AUTO"){
                  $capa_afectada.css("display","none").removeClass("d-none").fadeIn("slow",function(){
                    $(this).removeAttr("style");
                  });
                }
                else{
                  $capa_afectada.fadeOut("slow",function(){
                    $(this).addClass("d-none").removeAttr("style");
                  });
                }
              }
            }
            break;
            default:
          }
        }
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $selects=$body.find("[data-ctrl_select_actions]");
    const haySelects=($selects.length>0);
    if(haySelects){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_SELECT_ACTIONS",$selects);
      INIT();
    }
  },

  /**
   *  Acciones referentes a selects dependientes
   *
   *  @cont Baratz.tmpls_actions.SELECTS_DEPENDIENTES
   *
   *  @details
   *    • Selects select.selects_dependientes_js y utilidades de cambio de estado para selects en general
   */
  SELECTS_DEPENDIENTES:{
    /**
     *  Elimina :disabled de un select
     *
     *  @method Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_remove_disabled
     *
     *  @param {dom object} $select  : select afectado
     */
    select_remove_disabled:$select=>{
      $select.removeAttr("disabled");
      $select.prop("disabled",false);
    },

    /**
     *  Añade :disabled de un select
     *
     *  @method Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_add_disabled
     *
     *  @param {dom object} $select  : select afectado
     */
    select_add_disabled:$select=>{
      $select.attr("disabled","disabled");
      $select.prop("disabled",true);
    },

  /**
     *  Destruye la instancia selectPicker (bootstrap-select) sobre un select aportado con la instancia aplicada previamente
     *
     *  @method Baratz.tmpls_actions.SELECTS_DEPENDIENTES.destroyPicker
     *
     *  @param {dom object} $element : select afectado
     *
     */
    destroyPicker:$element=>{
      Baratz.tmpls_actions.APPLY_SELECTPICKERS($element,false,true);
      $element.closest(".cont_select").addClass("cont_selectPicker");
    },

    /**
     *  Aplica bootstrap-select sobre un select dado
     *
     *  @method Baratz.tmpls_actions.SELECTS_DEPENDIENTES.applyPicker
     *
     *  @param {dom object} $element : select afectado
     *  @param {bool} liveSearch : Si el deplegable va a tener o no campo de busqueda autocomplete sobre las opciones
     *
     */
    applyPicker:($element,liveSearch)=>{
      const $cont_select=$element.closest(".cont_selectPicker");
      Baratz.tmpls_actions.APPLY_SELECTPICKERS($cont_select,liveSearch);
    },

    /**
     *  Elimina las option y aplica disabled a los selects posteriores al dado
     *
     *  @method Baratz.tmpls_actions.SELECTS_DEPENDIENTES.restoDisabled
     *
     *  @param {dom object} $selects: Todos los selects afectados
     *  @param {num} select_num: data-select_num del select afectado
     *
     */
    restoDisabled:($selects,select_num)=>{
      $selects.each((i,e)=>{
        const $item=$(e);
        const s_num=Number($item.attr("data-select_num"));
        if(s_num>select_num){
          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.destroyPicker($item);
          // añade :disabled
          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_add_disabled($item);
          // elimina todas las option salvo la inicial
          $item.find("option:gt(0)").remove();
          $item.val("");
          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.applyPicker($item);
        }
      });
    },

    /**
     *  Inicialización del método común para contenedor de selects dependientes con la clase .selects_dependientes_js
     *
     *  @method Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize
     *
     *  @param {dom object} [opt] $selects_dependientes_js : opcional selects afectados
     */
    initialize:function($selects_dependientes_js){
      const INIT=$cont=>{
        EVENTOS($cont);
      },
      /**
       *  Eventos sobre los selects contenidos
       *
       *  @method EVENTOS
       *
       *  @param {dom object} $cont: contenedor de la clase selects_dependientes_js, con selects dependientes
       */
      EVENTOS=$cont=>{
        const $selects=$cont.find("select");
        $selects.on("change",e=>{
          const $select=$(e.currentTarget);
          OPS.onChangeSelect($cont,$select);
        });
      },
      /**
       *  Contenedor de operaciones
       *
       *  @cont OPS
       */
      OPS={
        /**
         *  Al realizar un cambio
         *
         *  @method OPS.onChangeSelect
         *
         *  @param {dom object} $cont : Contenedor afectado
         *  @param {dom object} $select : Select afectado
         */
        onChangeSelect:($cont,$select)=>{
          // select dependientes en la capa de búsqueda inicial (home)
          const isAutosearch=$cont.hasClass("auto-search");
          if(isAutosearch){
            Baratz.commons.onChangeSelectAutoSearch($select);
          }
          else{
            const slc_type=$select.attr("data-type");
            switch(slc_type){
              // pagina de reserva de item
              case"slc_reserve":{
                const isSelectBranch=($select.attr("id")=="reserve.branch");
                if(isSelectBranch){
                  Baratz.reservation.changeDesk($select);
                }
                const isSelectDesk=($select.attr("id")=="reserve.desk");
                if(isSelectDesk){
                  Baratz.reservation.ctrl_btn_submit();
                }
              }
              break;
              default:
            }
          }
        },
      };

      /////////////////////////////////////////////////////////////////
      //  INIT
      /////////////////////////////////////////////////////////////////
      // si no se pasa ningun select
      // busca en todo el body la clase selects_dependientes_js, a modo de inicialización
      const $body=$(document.body);
      if(typeof($selects_dependientes_js)==="undefined"){
        $selects_dependientes_js=$body.find(".selects_dependientes_js");
      }
      if($selects_dependientes_js.length>0){
        $selects_dependientes_js.each((i,e)=>{
          const $cont=$(e);
          INIT($cont);
        });
      }
    }
  },

  /**
   *  Aplica una ellipsis en un contenedor dado (opcional), cuyo contenido a ellipsizar tiene la clase .ellipsis_multiline
   *  Si se obvia el $cont, se busca en todo el body la clase .ellipsis_multiline
   *  Si se desea boton expandir en la ellipsis, se aplica la clase .multiline_expand en el contenedor de la clase .ellipsis_multiline,
   *  con un campo data-btn_expand, donde se declara la clase del botón html.
   *  El contenedor general donde se encuentra botón y capa donde aplicar ellipsis debe de tener la clase .cont_ellipsis_multiline
   *
   *  @method Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS
   *
   *  @param {dom object} $cont {opcional}  : contenedor afectado {opcional}
   *  @param {num} lines {opcional}         : número de líneas desde donde realizar el truncate, si no se aporta entonces serán 4
   *
   *  @details
   *    • Se usa desde carouseles swiper (Baratz.tmpls_actions.CAROUSEL), en el evento 'on init' de sus opciones
   *    • PLUGIN: https://github.com/jeffchan/truncate.js
   */
  CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS:function($cont=$(document.body),lines=4){

    const INIT=$parrafo_ellipsis_js=>{
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS [INIT] $parrafo_ellipsis_js",$parrafo_ellipsis_js);
      OPS.inicializa($parrafo_ellipsis_js);
      EVENTOS($parrafo_ellipsis_js);
    },
    /**
     *  EVENTOS RELACIONADOS
     */
    EVENTOS=()=>{
      // Al finalizar el resize de pantalla
      const $window=$(window);
      $window.on({
        resize:()=>{
          if(window.resizeTO_ellipsis){
            clearTimeout(window.resizeTO_ellipsis);
          }
          window.resizeTO_ellipsis = setTimeout(()=>{
            // Se lanza un evento específoco para este método de ellipsis
            // Hay que tener en cuenta que otros métodos tambien pueden tener acciones en resize
            $window.trigger('ellipsis_multiline:resizeEnd');
          },300);
        },
        // ES7
        "ellipsis_multiline:resizeEnd":async()=>{
consoleScript.log('Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS...........ellipsis_multiline:resizeEnd',$parrafo_ellipsis_js);
          // espera el fin de las acciones de finalización
          await OPS.finaliza($parrafo_ellipsis_js);
          OPS.inicializa($parrafo_ellipsis_js);
        }
      });
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Finaliza las acciones necesarias en los contenedores dados
       *
       *  @method OPS.finaliza
       *
       *  @param {dom object} $parrafo_ellipsis_js  : contenedores donde aplicar ellipsis
       */
      finaliza:$parrafo_ellipsis_js=>{
        $parrafo_ellipsis_js.each((i,e)=>{
          const $el = $(e);
          const pre_truncate_contenido=$el.attr("data-pre_truncate_contenido");
          // aplica una clase discriminadora a evaluar en OPS.inicializa y recarga el contenido
          // La clase es persistente, es decir, se aplica una vez para siempre, ya que no existe destroy en las instancias
          $el.addClass("truncate_finalized").html(pre_truncate_contenido);
          let $btn_expand=$el.closest(".cont_ellipsis_multiline").find('[data-btn_expand]');
          // Oculta el botón de collapse si existe
          const is_multiline_expand=$el.hasClass("multiline_expand");
          if(is_multiline_expand){
            const btn_expand="."+$el.attr("data-btn_expand");
            $btn_expand=$el.closest(".cont_ellipsis_multiline").find(btn_expand);
            $btn_expand.off("click").addClass("d-none").attr({"tabindex":"-1"}).removeAttr("aria-expanded aria-controls");
            // elimina css de capa padre
            $el.parent().removeAttr("style");
          }

        });
      },

      /**
       *  Aplica plugin truncate en los contenedores dados
       *
       *  @method OPS.inicializa
       *
       *  @param {dom object} $parrafo_ellipsis_js  : contenedores donde aplicar ellipsis
       *
       *  @details
       *    - Si el contenedor contiene la clase .multiline_expand, se busca en el contenedor padre con clase .cont_ellipsis_multiline
       *        el botón con clase aportada por el campo data-btn_expand del contenedor donde realizar ellipsis.
       *    - Si el height del contenedor supera el height del truncate, teniendo en cuenta el line-height del contenedor
       *       y el numero de lineas para truncate, se muestra el boton 'ver mas'.
       *
       *  @example
       *      • Aplicación desde js:
       *        Buscar por: DETAIL.TMPL.ctrl_type_505_ellipsis
       */
      inicializa:$parrafo_ellipsis_js=>{
        $parrafo_ellipsis_js.each((i,e)=>{
          const $el = $(e);
          const $parent=$el.parent();
          const pre_truncate_contenido=$el.html();
          //pre_truncate_contenido=Baratz.tmpls_actions.UTILS.decodeHTMLEntities(contenido);
          //$el.html(pre_truncate_contenido)
          $el.attr("data-pre_truncate_contenido",pre_truncate_contenido);
          let lh=$el.css("line-height");
          // en ie11 puede aparecer 'normal'
          if(lh=="normal"){
            lh=24;
          }
          const pb=parseInt($el.css("padding-bottom"),10);
          const el_line_height=parseFloat(lh);
          const total_height_truncate=el_line_height*lines+pb;
          // No tiene en cuenta padding
          const el_h_total=$el.height();
          // Accesible
          $el.attr("aria-hidden","true");
          const $cont_accesible=$(`<div class="truncate_accesible sr-only">${pre_truncate_contenido}</div>`);
          $parent.append($cont_accesible);
          $el.attr("data-lines_in_trunk",lines);
          const btn_expand="."+$el.attr("data-btn_expand");
          const $btn_expand=$el.closest(".cont_ellipsis_multiline").find(btn_expand);
          // Si hace falta truncate
//consoleScript.log(el_line_height,total_height_truncate,el_h_total,(el_h_total>0 && total_height_truncate<el_h_total),$el)
          if(el_h_total>0 && total_height_truncate<el_h_total){
            const is_truncate_finalized=$el.hasClass("truncate_finalized");
            // Si no es resize se aplica el plugin
            if(!is_truncate_finalized){
              $el.truncate({
                lines: lines
              });
              $el.addClass("truncate_finalized");
            }
            // Si es resize, se recarga el html contenido y hay que hacer un update
            else{
              $el.truncate("update",pre_truncate_contenido);
            }
            // Si necesita btn de collapse
            // Aventuras de Don Quijote y Sancho
            const is_multiline_expand=$el.hasClass("multiline_expand");
            if(is_multiline_expand){
              // trunca el texto por si no esta truncado (en el resize por ejemplo)
              let id_$el=$el.attr("id");
              if(typeof(id_$el)=="undefined"){
                const index=Baratz.tmpls_actions.UTILS.randomId();
                id_$el="parrafo_ellipsis_js_"+index;
                $el.attr("id",id_$el);
              }
              // Busca el boton y lo inicializa
              let h_$el;
              setTimeout(()=>{
                $el.truncate('collapse');
                // Transforma las urls en el texto a tags a href
                Baratz.tmpls_actions.UTILS.text2link($el);
                // Tiene en cuenta padding
                h_$el=$el.outerHeight(true);
                // aplica data y estilos en el contenedor padre
                $parent.css({"height":h_$el+"px","overflow":"hidden"}).attr("data-h_initial",h_$el);
                $btn_expand.removeClass("active d-none").attr({"aria-expanded":"false","aria-controls":id_$el,"tabindex":"0"});
                // Si es detalle del item summary, puede ser que entre scroll-target
                // Por ejemplo al cambiar en el filtro de sucursal
                // Se lanza un evento para evitar reflow, que se captura desde Baratz.tmpls_actions.UTILS.target_scroll_anchor
                // Para el detalle del item
                if($parent.hasClass("item-summary")){
                  $(window).trigger("ellipsis_multiline:isSummary");
                }
              },100);

              // Aplica acciones sobre los eventos
              $btn_expand.on("click",e=>{
                const $btn=$(e.currentTarget);
                const isActive=$btn.hasClass("active");
                // expande
                if(!isActive){
                  $el.truncate('expand');
                  setTimeout(()=>{
                    // Tiene en cuenta padding
                    h_$el=$el.outerHeight(true);
                    $parent.stop(true).animate({"height":h_$el+"px"},"slow",()=>{
                      // marca la accion en el boton como parrafo expandido
                      $btn.addClass("active").attr("aria-expanded","true");
                    });
                  },1);
                }
                // encoge
                else{
                  h_$el=$parent.attr("data-h_initial");
                  $parent.stop(true).animate({"height":h_$el+"px"},"slow",()=>{
                    $el.truncate('collapse');
                    // marca la accion en el boton como parrafo encogido
                    $btn.removeClass("active").attr("aria-expanded","false");
                  });
                }
                return false;
              });
            }
          }
          else{
            $parent.removeAttr("data-h_initial");
            $el.removeClass("truncate_finalized");
            $btn_expand.addClass("d-none");
            // Se lanza un evento, que se captura desde Baratz.tmpls_actions.UTILS.target_scroll_anchor
            $(window).trigger("ellipsis_multiline:isSummary");
          }
        });
      },
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $parrafo_ellipsis_js=$cont.find(".ellipsis_multiline");
    const existeEllipsis=($parrafo_ellipsis_js.length>0);
    if (existeEllipsis){
      setTimeout(()=>{
        INIT($parrafo_ellipsis_js);
      },1000);
    }
  },

  /**
   * 	Realiza un barrido en las vistas buscando la clase aportada que contiene imagen, realizando la comprobacion de carga correcta,
   *  y sustituyéndola en caso necesario
   *
   *  @method Baratz.tmpls_actions.FALLBACK_IMAGES
   *
   *  @param {string} [opt] clase : clase afectada (con punto). Si el parámetro está en blanco o no se define, se asocia la clase por defecto .imagen
   */
  FALLBACK_IMAGES:function(clase=".imagen"){
    const INIT=()=>{
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.FALLBACK_IMAGES");
      // en los estilos, .cont_imagen_cargando:before define un gif animado para "cargando"
      $imagenes.parent().addClass("cont_imagen_cargando");
      // recorre todas las imagenes para aplicar validacion, depues un retardo para ver el efecto
      setTimeout(()=>{
        $imagenes.each((i,e)=>{
	
          const $oImg=$(e);
          const url=$oImg.attr("src");
          OPS.fnValidateImage(url).then(
            successUrl=>{
              setTimeout(()=>{
            	  //solo se muestra la imagen sino es de 1px            	  
            	  if(e.naturalWidth>1|| e.naturalHeight>1){

            		  $oImg.addClass("img_cargada img_ok").parent().removeClass("cont_imagen_cargando");
            	  }else{

            		// La imagen es de 1px se deja en el dom, pero se oculta de la vista
                    // Se añade el svg fallback
                    $oImg.addClass("img_cargada img_fallback_js").attr("aria-hidden",true).parent().toggleClass("cont_imagen_cargando cont_imagen_cargada").append(img_fallback);
            	  }
              },200*i);
            }
          ).catch(errorUrl=>{
            setTimeout(()=>{
              // La imagen en fallo se deja en el dom, pero se oculta de la vista
              // Se añade el svg fallback
              $oImg.addClass("img_cargada img_fallback_js").attr("aria-hidden",true).parent().toggleClass("cont_imagen_cargando cont_imagen_cargada").append(img_fallback);
            },200*i);
          });
        });
      },500);
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Aplica las acciones necesarias para determinar si la imagen se carga correctamente o no
       *
       *  @method OPS.fnValidateImage
       *
       *  @param {str} url  : url de la imagen
       *
       *  @return {promise} retorno
       */
      fnValidateImage:url=>{
        const retorno=new Promise((resolve, reject)=>{
          const img = new Image();
          img.addEventListener('load', () => resolve(url));
          img.addEventListener('error', reject);
          img.src = url;
        });
        return retorno;
      },
    };
    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $imagenes = $(document.body).find(clase);
    // ruta imagen fallback
    const img_fallback=`<svg class="image-not-found type_image_not_found mw-50 js_fallback_image" viewBox="0 0 42 46" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false">
        <title>${Baratz.i18n_js.fallback_images.alt}</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-56.000000, -1501.000000)">
            <g transform="translate(29.000000, 1464.000000)">
              <g transform="translate(6.000000, 0.000000)">
                <g transform="translate(23.000000, 39.000000)">
                  <g>
                    <g>
                      <path d="M11.137931,23.1382979 C11.137931,27.3276105 14.6577188,30.7234043 19,30.7234043 C23.3422812,30.7234043 26.862069,27.3276105 26.862069,23.1382979 C26.862069,18.9489853 23.3422812,15.5531915 19,15.5531915 C14.6577188,15.5531915 11.137931,18.9489853 11.137931,23.1382979 Z M35.625,9.76923077 L27.3125,9.76923077 C26.71875,7.38461538 26.125,5 23.75,5 L14.25,5 C11.875,5 11.28125,7.38461538 10.6875,9.76923077 L2.375,9.76923077 C1.06875,9.76923077 0,10.8423077 0,12.1538462 C0,19.0822325 0,24.2785222 0,27.7427154 C0,29.047753 0,31.0053094 0,33.6153846 C0,34.9269231 1.06875,36 2.375,36 C3.24583333,36 14.3291667,36 35.625,36 C36.93125,36 38,34.9269231 38,33.6153846 L38,12.1538462 C38,10.8423077 36.93125,9.76923077 35.625,9.76923077 Z M19,33.3617021 C13.2106261,33.3617021 8.51724138,28.6367829 8.51724138,22.8085106 C8.51724138,16.9802384 13.2106261,12.2553191 19,12.2553191 C24.7893739,12.2553191 29.4827586,16.9802384 29.4827586,22.8085106 C29.4827586,28.6367829 24.7893739,33.3617021 19,33.3617021 Z M35.3793103,16.8723404 L30.7931034,16.8723404 L30.7931034,14.2340426 L35.3793103,14.2340426 L35.3793103,16.8723404 Z" fill="red" fill-rule="nonzero"></path>\
                      <path d="M0,0 C7.69692434,8.5071269 14.484788,16.0095025 20.363591,22.5071269 C26.242394,29.0047513 32.121197,35.5023756 38,42" stroke="red" stroke-width="2" stroke-linecap="square"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
    </svg>`;
    if($imagenes.length>0){
      INIT();
    }
  },

  /**
   *  Aplica una estandarización de pintado para checks y radios, aportando accesibilidad y aplique de foco correcto en nuevo formato buttons
   *
   *  @method Baratz.tmpls_actions.TUNNING_RADIO_CHECKS
   *
   *  @details ver maquetacion1.html para aplicar este pintado
   */
  TUNNING_RADIO_CHECKS:function($cont=$(document.body)){

    const INIT=()=>{
      OPS.initialize();
    },
    /**
     *  Contenedor de eventos
     */
    EVENTOS={
      /**
       *  Eventos sobre el checkbox dado
       *
       *  @method EVENTOS.checks
       *
       *  @param {dom object} $cont_nuevo_check  : contenedor del checkbox
       */
      checks:$cont_nuevo_check=>{
        const $check_no_disabled=$cont_nuevo_check.not(".check_disabled,.check_readonly");
        const $form_group=$cont_nuevo_check.closest(".form-group");
        $check_no_disabled.off("click").on("click",e=>{
          const $el=$(e.currentTarget);
          const $form_group=$el.closest(".form-group");
          const $input=$form_group.find('input[type="checkbox"]').not('[type="hidden"]');
          const isActivado=$el.hasClass("activado");
          if(!isActivado){
            OPS.estadoCheck.activa($input,$el);
          }
          else{
            OPS.estadoCheck.desactiva($input,$el);
          }
          $input.trigger("change");
        });
        $form_group.find('[type="checkbox"]').off("focusin focusout keypress").on({
          "focusin":e=>{
            const $input=$(e.currentTarget);
            const $cont_nuevo_check=$input.closest(".form-group").find(".cont_nuevo_check");
            $cont_nuevo_check.addClass("check_focusin");
          },
          "focusout":e=>{
            const $input=$(e.currentTarget);
            const $cont_nuevo_check=$input.closest(".form-group").find(".cont_nuevo_check");
            $cont_nuevo_check.removeClass("check_focusin");
           },
          "keypress":e=>{
            e = e || window.event;
            const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if(charCode==13){
              const $form_group=$(e.currentTarget).closest(".form-group");
              const $input=$form_group.find('input[type="checkbox"]').not('[type="hidden"]');
              const $cont_nuevo_check=$input.closest(".form-group").find(".cont_nuevo_check");
              const isActivado=$cont_nuevo_check.hasClass("activado");
              if(!isActivado){
                OPS.estadoCheck.activa($input,$cont_nuevo_check);
              }
              else{
                OPS.estadoCheck.desactiva($input,$cont_nuevo_check);
              }
              // Solucion al problema de submit dentro de forms que se lanza al pulsar return
              return false;
            }
          }
        });
      },
      /**
       *  Eventos sobre el checkbox dado
       *
       *  @method EVENTOS.radios
       *
       *  @param {dom object} $cont_radio_tunned  : contenedor general de los radio buttons
       */
      radios:$cont_radio_tunned=>{
        const $conts_nuevo_radio=$cont_radio_tunned.find(".cont_nuevo_radio");
        $conts_nuevo_radio.off("click").on({
          "click":e=>{
            const $el=$(e.currentTarget);
            const $cont_radio_tunned=$el.closest(".cont_radio_tunned");
            const isActivado=$el.hasClass("activado");
            if(!isActivado){
              const $activado=$cont_radio_tunned.find(".activado");
              $activado.removeClass("activado").closest(".form-group").find('input[type="radio"]').removeAttr("checked").attr({"tabindex":"-1"});
              $el.addClass("activado").closest(".form-group").find('input[type="radio"]').attr({"checked":"checked","tabindex":"0"});
            }
          }
        });
        $conts_nuevo_radio.closest(".form-group").find('[type="radio"]').off("focusin focusout keypress").on({
          "focusin":e=>{
            const $input=$(e.currentTarget);
            const $cont_nuevo_radio=$input.closest(".form-group").find(".cont_nuevo_radio");
            $cont_nuevo_radio.addClass("radio_focusin");
          },
          "focusout":e=>{
            const $input=$(e.currentTarget);
            const $cont_nuevo_radio=$input.closest(".form-group").find(".cont_nuevo_radio");
            $cont_nuevo_radio.removeClass("radio_focusin");
          },
          "keypress":e=>{
            e = e || window.event;
            const charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if(charCode==13){
              const $input=$(e.currentTarget);
              const isChecked=$input.is("checked");
              if(!isChecked){
                const $form_group=$input.closest(".form-group");
                const $cont_nuevo_radio=$form_group.find(".cont_nuevo_radio");
                const $cont_radio_tunned=$form_group.closest(".cont_radio_tunned");
                // limpia el radio checked previo
                const $input_checked_old=$cont_radio_tunned.find('[checked="checked"]');
                $input_checked_old.removeAttr("checked").attr({"tabindex":"-1"}).closest(".cont_radio").find(".cont_nuevo_radio").removeClass("activado");
                // activa el nuevo radio
                $input.attr({"checked":"checked","tabindex":"0"});
                $cont_nuevo_radio.addClass("activado");
                // Solucion al problema de submit dentro de forms que se lanza al pulsar return
                return false;
              }
            }
          }
        });
      }
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Inicia el pintado de los tunnings
       *
       *  @method OPS.initialize
       */
      initialize:()=>{
        const cont_nuevo_check='<span class="cont_nuevo_check" aria-hidden="true"></span>';
        // CHECKS
        $checkbox.each((i,e)=>{
          const $cont_check_tunned=$(e);
          let $cont_nuevo_check=$cont_check_tunned.find(".cont_nuevo_check");
          if($cont_nuevo_check.length===0){
            $cont_check_tunned.append(cont_nuevo_check);
            $cont_nuevo_check=$cont_check_tunned.find(".cont_nuevo_check");
          }
          const $label=$cont_check_tunned.find("label");
          if($label.length>0){
            //$cont_nuevo_check.attr("id","check_"+i);
            //$label.attr("for","check_"+i);
          }
          const $input=$cont_check_tunned.find("input").not('[type="hidden"]');
          const attr_disabled=$input.attr("disabled");
          const isDisabled=(typeof(attr_disabled)!=="undefined" && attr_disabled==="disabled");
          if(isDisabled){
            $cont_nuevo_check.addClass("check_disabled").closest(".cont_check").addClass("cont_check_graphic_disabled");
          }
          const attr_readonly=$input.attr("readonly");
          const isReadonly=(typeof(attr_readonly)!=="undefined" && attr_readonly==="readonly");
          if(isReadonly){
            $cont_nuevo_check.addClass("check_readonly").closest(".cont_check").addClass("cont_check_graphic_readonly");
          }
          const isChecked=$input.is(':checked');
          if(isChecked){
            $cont_nuevo_check.addClass("activado");
          }
          EVENTOS.checks($cont_nuevo_check);
        });
        // RADIO
        const cont_nuevo_radio='<span class="cont_nuevo_radio" aria-hidden="true"></span>';
        $radio.each((i,e)=>{
          const $cont_radio_tunned=$(e);
          const $cont_radio=$cont_radio_tunned.find(".cont_radio");
          $cont_radio.each((i,e)=>{
            const $cont=$(e);
            let $cont_nuevo_radio=$cont.find(".cont_nuevo_radio");
            if($cont_nuevo_radio.length==0){
              $cont.append(cont_nuevo_radio);
              $cont_nuevo_radio=$cont.find(".cont_nuevo_radio");
            }
            const $label=$cont.find("label");
            if($label.length>0){
              //const random_id=Baratz.tmpls_actions.UTILS.randomId();
              //$cont_nuevo_radio.attr("id","radio_"+random_id);
              //$label.attr("for","radio_"+random_id);
            }
            const $input=$cont.find("input").not('[type="hidden"]');
            $input.attr({"tabindex":"-1"});
            const isChecked=$input.is(':checked');
            if(isChecked){
              $input.attr({"tabindex":"0"});
              $cont_nuevo_radio.addClass("activado");
            }
          });
          EVENTOS.radios($cont_radio_tunned);
        });
      },
      /**
       *  Acciones para el pintado de los estados
       *
       *  @cont OPS.estadoCheck
       */
      estadoCheck:{
       /**
        *  Pinta la activación, aplicando valor "on" en el input hidden del contenedor superior .cont_check (si existe)
        *
        *  @method OPS.estadoCheck.activa
        *
        *  @param {dom object} $input
        *  @param {dom object} $cont_nuevo_check
        */
        activa:($input,$cont_nuevo_check)=>{
          $cont_nuevo_check.addClass("activado");
          $input.prop("checked",true).attr({"checked":"checked"});
          // puede haber un input[type="hidden"] para albergar un valor on/off
          const $input_hidden=$input.closest(".cont_check").find('input[type="hidden"]');
          if($input_hidden.length==1){
            $input_hidden.val("on");
          }
        },
       /**
        *  Pinta la desactivación, aplicando valor "off" en el input hidden del contenedor superior .cont_check (si existe)
        *
        *  @method OPS.estadoCheck.desactiva
        *
        *  @param {dom object} $input
        *  @param {dom object} $cont_nuevo_check
        */
        desactiva:($input,$cont_nuevo_check)=>{
          $cont_nuevo_check.removeClass("activado");
          $input.prop("checked",false).removeAttr("checked");
          // puede haber un input[type="hidden"] para albergar un valor on/off
          const $input_hidden=$input.closest(".cont_check").find('input[type="hidden"]');
          if($input_hidden.length==1){
            $input_hidden.val("off");
          }
        },
      },
    };
    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $checkbox=$cont.find('.cont_check_tunned');
    const $radio=$cont.find('.cont_radio_tunned');
    if($checkbox.length>0 || $radio.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.TUNNING_RADIO_CHECKS()");
      INIT();
    }
  },

  /**
   *  Aplica el plugin selectpicker en todos los selects cuyo contenedor padre tenga .cont_selectPicker
   *
   *  @method Baratz.tmpls_actions.APPLY_SELECTPICKERS
   *
   *  @param {dom object} $cont_selectPicker [opt] : Si es necesario se puede aportar un contenedor específico
   *                                                 para aplicar el plugin con la clase .cont_select, o en el caso de querer destruir el
   *                                                 plugin selectPicker puede aportarse directamente un select específico
   *  @param {bool} $liveSearch [opt]              : Cuando se establece en true, agrega un cuadro de búsqueda en la parte superior
   *                                                 del menú desplegable selectpicker.
   *  @param {bool} destroy [opt]                  : Flag necesario en caso de necesitar destruír un select específico (puede
   *                                                 aportarse un .cont_select en el parámetro $cont_selectPicker ó un select específico).
   *  @param {object} new_options                  : opciones a modificar / añadir en selectpicker
   *
   *  @details  https://developer.snapappointments.com/bootstrap-select/
   */
  APPLY_SELECTPICKERS:function($cont_selectPicker,liveSearch,destroy,new_options){

    const INIT=()=>{
      EVENTOS();
    },
    /**
     *  Acciones para los plugins
     */
    PLUGINS={
      /**
       *  Carga el js del plugin
       *
       *  @method PLUGINS.initialize
       */
      initialize:()=>{
        // si aparece el parámetro destroy a true se obliga la destruccion del elemento
        if(destroy){
          // si el tag aportado es un select
          const isSelect=($cont_selectPicker.prop("tagName").toUpperCase()=="SELECT");
          if(isSelect){
            PLUGINS.destroy($cont_selectPicker,destroy);
          }
          else{
            // si el tag aportado es un .cont_select
            const isContSelect=$cont_selectPicker.hasClass("cont_select");
            if(isContSelect){
              const $select=$cont_selectPicker.find("select");
              PLUGINS.destroy($select,destroy);
            }
            else{
              consoleScript.log("[scripts.new.js] Baratz.tmpls_actions.APPLY_SELECTPICKERS() el tag ",$cont_selectPicker," no es un tipo admitido");
            }
          }
        }
        else{
          const $body=$(document.body);
          // si no se aporta ningun tag, se generaliza la aplicación del plugin a todos los contenedores .cont_selectPicker
          if(typeof($cont_selectPicker)=="undefined"){
            $cont_selectPicker=$body.find(".cont_selectPicker");
          }
          // si hay mas de 0 contenedores en el dom
          const cont_selectPicker_size=$cont_selectPicker.length;
          if(cont_selectPicker_size>0){
            // Si no se define cuadro de busqueda en la parte superior del dropdown se establece el parámetro a false
            if(typeof(liveSearch)=="undefined"){
              liveSearch=false;
            }
            consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.APPLY_SELECTPICKERS()");
            INIT();
          }
        }
      },
      /**
       *  Aplica bootstrap-select sobre un select dado
       *
       *  @method PLUGINS.aplica
       *
       *  @param {dom object} $select  : select afectado
       *  @param {object} new_options  : nuevas opciones para aplicación del plugin
       *  @param {*} i  :
       *
       *  @details: https://developer.snapappointments.com/bootstrap-select/options/#core-options
       */
      aplica : ($select,new_options,i)=>{
        const retorno=new Promise((resolve,reject)=>{
          const defaults={
            //noneSelectedText   : 'Sin selección',
            //noneResultsText    : 'Sin resultados para {0}',
            //selectAllText      : 'Todo seleccionado',
            selectedTextFormat : 'values',
            liveSearch         : liveSearch,
            sanitize           : false,
            dropupAuto         : true,
          };
          // si existe el parámetro data-live-search en el select, se parametriza la opcion con su valor
          if(typeof($select.attr("data-live-search"))!=="undefined"){
            defaults.liveSearch=JSON.parse($select.attr("data-live-search"));
          }
          // Si el numero de options del select es menor de 10, se elimina la opcion live-search
          const $options=$select.find("option");
          const num_opciones=$options.length;
          if(num_opciones<10){
            defaults.liveSearch=false;
          }
          // si el select no tiene opciones, se pone disabled
          if(num_opciones==0){
            $select.attr("disabled","disabled");
          }
          // aplica options
          const settings=defaults;
          if(new_options){
            $.extend(settings,defaults,new_options);
          }
          // aplica plugin
          $select.addClass("select_selectized").selectpicker(settings);
          // inserta icono de despliegue si no hay
          const $form_group=$select.closest(".form-group");
          const hayIcono=($form_group.find(".icono.icono_red").length>0);
          if(!hayIcono){
            $select.before('<span class="icono fas fa-sort-down icono_red" aria-hidden="true"></span>');
          }
          const $cont_selectPicker=$select.closest(".cont_selectPicker");
          // https://w3c.github.io/aria-practices/examples/combobox/combobox-autocomplete-both.html
          // Accesibilidad: inserta un label en el div role="listbox" generado por bootstrap-select, si no existe
          let label_text="";
          const $label=$cont_selectPicker.find("label");
          if($label.length===1){
            label_text=$label.text();
          }
          else{
            const $select=$cont_selectPicker.find("select");
            if(typeof($select.attr("aria-label"))!=="undefined"){
              label_text=$select.attr("aria-label");
            }
          }
          const $listbox=$cont_selectPicker.find('[role="listbox"]');
          const hay_ariaLabel=(typeof($listbox.attr("aria-label"))!=="undefined" || $listbox.attr("aria-label")==="");
          if(!hay_ariaLabel){
            $listbox.attr("aria-label",label_text);
          }
          const $combobox_button=$cont_selectPicker.find('button[role="combobox"]');
          const $combobox_input=$cont_selectPicker.find('input[role="combobox"]');
          // Accesibilidad: button con role="combobox" está mal en el plugin según pautas 1.2
          if($combobox_button.length===1){
            const aria_owns=$combobox_button.attr("aria-owns");
            // Se eliminan role="combobox" y aria-owns
            $combobox_button.removeAttr("role aria-owns");
            // Se inserta aria-controls
            $combobox_button.attr("aria-controls",aria_owns);
          }
          // Accesibilidad: Input Livesearch con role="combobox" no tiene los attr aria correctos
          if($combobox_input.length===1){
            // Se inserta aria-expanded y se actualiza en los eventos de button
            $combobox_input.attr("aria-expanded","false");
            const $dropdown=$cont_selectPicker.find(".dropdown");
            $dropdown.on("shown.bs.dropdown hidden.bs.dropdown",()=>{
              const isExpanded=$combobox_button.attr("aria-expanded");
              $combobox_input.attr("aria-expanded",isExpanded);
            });
          }
          resolve($select);
        });
        return retorno;
      },
      /**
       *  Destruye bootstrap-select sobre un select dado
       *
       *  @method PLUGINS.destroy
       *
       *  @param {dom object} $select  : select afectado
       *  @param {bool} destroy        : únicamente destruye el plugin en el elemento
       */
      destroy : ($select,destroy)=>{
        $select.removeClass("select_selectized").selectpicker('destroy');
        const $form_group=$select.closest(".form-group");
        $form_group.removeClass("cont_select_disabled cont_selectPicker selectPicker_selectized");
        // Si no se ha activado unicamente la destruccion del plugin
        if(!destroy){
          // asegura el paso
          PLUGINS.aplica($select);
        }
      },
    },
    /**
     *  Asociacion de acciones para los eventos
     *
     *  @method EVENTOS
     */
    EVENTOS=()=>{

      $cont_selectPicker.each((i,e)=>{
        const $cont=$(e);
        const is_selectPicker_selectized=$cont.hasClass("selectPicker_selectized");
        const $select=$cont.find("select");
        // en algun momento hay un contenedor general con la clase no_selectPicker, con lo que no se aplica el plugin (búsqueda avanzada)
        const isNo_selectPicker=($select.closest(".no_selectPicker").length>0);
        if(!isNo_selectPicker){
          if(is_selectPicker_selectized){
            PLUGINS.destroy($select);
          }
          else{
            // Asegura la aplicacion del plugin uno a uno a través de promesa
            PLUGINS.aplica($select,new_options).then($sel=>{
              const $cont_select=$sel.closest(".cont_select");
              $cont_select.find(".dropdown-toggle").on({
                "focusin":()=>{
                  $cont_select.addClass("is-focused");
                },
                "focusout":()=>{
                  $cont_select.removeClass("is-focused");
                },
                // Accesibilidad
                "keydown":e=>{
                  const $clicked=$(e.currentTarget);
                  const $parent=$clicked.closest(".form-group");
                  e = e || window.event;
                  const charCode = (typeof e.which === "number") ? e.which : e.keyCode;
                  // pulsacion return
                  if(charCode===13){
                    const $sel=$parent.find("select");
                    $sel.selectpicker("refresh");
                    setTimeout(()=>{
                      $parent.find(".dropdown-toggle").attr("aria-expanded",true);
                      $parent.find("div.dropdown-menu,.bootstrap-select").addClass("show");
                      const $dropdow_menu=$parent.find("div.dropdown-menu");
                      const $search=$dropdow_menu.find('input[type="search"]');
                      if($search.length>0){
                        $search.focus();
                      }
                      else{
                        $parent.find(".dropdown-item.active").focus();
                      }
                    },200);
                  }
                }
              });
              let clases_cont="cont_selectPicker selectPicker_selectized";
              // jQuery v3.4.1
              const isDisabled=$sel.is(':disabled');
              if(isDisabled){
                // 200603 se descomenta para que se envie el valor
                // activa la propiedad en el select para que se envie el valor en el submit
                $sel.removeAttr("disabled");
                // aplica clase de pintado disabled
                clases_cont+=" cont_select_disabled";
              }
              $cont_select.removeClass("cont_select_disabled").addClass(clases_cont);
              // aplica los atributos correctos al label por accesibilidad
              const $label=$cont_select.find("label");
              if($label.length>0){
                const select_id=$sel.attr("id");
                const $button=$cont_select.find(`button[data-id="${select_id}"]`);
                $button.attr("id","btn_"+select_id);
                //$label.attr("for","btn_"+select_id);
              }
              $sel.on({
                'shown.bs.select':e=>{
                  const $parent=$(e.target.parentElement);
                  const $form_group=$parent.closest(".form-group");
                  // cambia icono
                  $form_group.find(".icono.fa-sort-down").removeClass("fa-sort-down").addClass("fa-sort-up");
                  $parent.find('div.inner.show').attr('tabindex',0);
                },
                'hidden.bs.select':e=>{
                  const $parent=$(e.target.parentElement);
                  const $form_group=$parent.closest(".form-group");
                  // cambia icono
                  $form_group.find(".icono.fa-sort-up").removeClass("fa-sort-up").addClass("fa-sort-down");
                  // aplica foco
                  const element_id=$sel.attr('id');
                  if(typeof(element_id)!=="undefined"){
                    $parent.find(`button[data-id="${element_id}"]`).focus();
                  }
                }
              });
            });
          }
        }
      });
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    if(typeof($.fn.selectpicker)=="undefined"){
      // url del plugin
      const url_bs="plugins/bootstrap-select.new";
      const listOfCSS=[url_bs+"/css/bootstrap-select.min.css"];
      Baratz.tmpls_actions.UTILS.requiredCSS(listOfCSS);
      // recupera el valor del meta lang para crear la url de i18n
      const lang = document.querySelector("html").getAttribute("lang").replace("-","_");
      // traduccion para el nombre de documento segun el valor de lang
      const listOfJS=[
        url_bs+"/js/bootstrap-select.js",
        url_bs+"/js/i18n/defaults-"+lang+".min.js",
      ];
      const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
      $.when(control).done(()=>{
        PLUGINS.initialize();
      });
    }
    else{
      PLUGINS.initialize();
    }
  },

	/**
	 *  Acciones de pintado para capa alerta sobre un contenedor de clase maquetada .alert
	 *
	 *  @cont Baratz.tmpls_actions.ALERTA
	 */
	ALERTA: {

    /**
     *  Inserta una capa alert en un contenedor dado
     *
     *  @method Baratz.tmpls_actions.ALERTA.pintaEstructura
     *
     *  @param {dom object} $cont_alert: capa contenedora
     *  @param {string} insertionType [opt]: tipo de insercion
     *      - 'append' añade al contenedor la capa alert generada
     *      - 'html' sustituye el contenido del contenedor por la capa alert generada
     *
     *  @return {dom object} $alert: alerta generada
     */
    pintaEstructura:($cont_alert,insertionType)=>{
      if(typeof(insertionType)==="undefined"){
        insertionType="html";
      }
      const $alert=$(`<div class="alert d-none">
        <span class="alert_titulo"></span>
        <span class="alert_texto"></span>
      </div>`);
      if(insertionType==="append"){
        $cont_alert.append($alert);
      }
      else{
        $cont_alert.html($alert);
      }
      return $alert;
    },

    /**
     *  Inserta los textos / imagenes en los campos correspondientes
     *
     *  @method Baratz.tmpls_actions.ALERTA.rellena
     *
     *  @param {dom object} $alert: capa alerta afectada
     *  @param {array} textos:{
     *                      {string} titulo: Título a pintar
     *                      {array} texto: Lineas de texto a pintar. Puede ser un string.
     *                  }
     */
    rellena:($alert,textos)=>{
      // un solo título por alert
      const $alert_titulo=$alert.find(".alert_titulo");
      if(typeof(textos.titulo)==="undefined"){
        textos.titulo="";
      }
      $alert_titulo.html(textos.titulo);
      // Elimina las líneas .alert_texto
      $alert.find(".alert_texto").remove();
      // puede ser que llegeue un solo mensaje como string
      if(typeof(textos.texto)==="string"){
        const texto=textos.texto;
        textos.texto=[];
        textos.texto.push(texto);
      }
      let textos_html="";
      textos.texto.forEach((e,i)=>{
        if(i===0 && textos.titulo!==""){
          textos_html+='<span class="alert_texto mt-2">'+e+'</span>';
        }
        else{
          textos_html+='<span class="alert_texto">'+e+'</span>';
        }
      });
      $alert_titulo.after(textos_html);
    },

    /**
     *  Pinta una alerta de la clase alert-success, sustituyendo a la anterior
     *
     *  @method Baratz.tmpls_actions.ALERTA.exito
     *
     *  @param {dom object} $alert: capa alerta afectada
     *  @param {object} textos:{
     *                      {string} titulo : Título a pintar
     *                      {array} texto   : Lineas de texto a pintar
     *                  }
     */
		exito:($alert,textos)=>{
      const isWarningSinIcono=$alert.hasClass("alert-warning sin_icono");
      if(isWarningSinIcono){
        $alert.removeClass("sin_icono");
      }
      $alert.removeClass("alert-info alert-warning alert-danger").addClass("alert-success");
      Baratz.tmpls_actions.ALERTA.rellena($alert,textos);
      Baratz.tmpls_actions.ALERTA.muestra($alert);
    },

    /**
     *  Pinta una alerta de la clase alert-warning, sustituyendo a la anterior
     *
     *  @method Baratz.tmpls_actions.ALERTA.warning
     *
     *  @param {dom object} $alert: capa alerta afectada
     *  @param {object} textos:{
     *                      {string} titulo: Título a pintar
     *                      {array} texto: Lineas de texto a pintar
     *                  }
     */
		warning:($alert,textos)=>{
      const isWarningSinIcono=$alert.hasClass("alert-warning sin_icono");
      if(isWarningSinIcono){
        $alert.removeClass("sin_icono");
      }
      $alert.removeClass("alert-info alert-success alert-danger").addClass("alert-warning");
      Baratz.tmpls_actions.ALERTA.rellena($alert,textos);
      Baratz.tmpls_actions.ALERTA.muestra($alert);
    },

    /**
     *  Pinta una alerta de la clase alert-danger, sustituyendo a la anterior
     *
     *  @method Baratz.tmpls_actions.ALERTA.error
     *
     *  @param {dom object} $alert: capa alerta afectada
     *  @param {object} textos:{
     *                      {string} titulo: Título a pintar
     *                      {array} texto: Lineas de texto a pintar
     *                  }
     */
    error:($alert,textos)=>{
      const isWarningSinIcono=$alert.hasClass("alert-warning sin_icono");
      if(isWarningSinIcono){
        $alert.removeClass("sin_icono");
      }
      $alert.removeClass("alert-info alert-warning alert-success").addClass("alert-danger");
      Baratz.tmpls_actions.ALERTA.rellena($alert,textos);
      Baratz.tmpls_actions.ALERTA.muestra($alert);
    },

    /**
     *  Pinta una alerta de la clase alert-info, sustituyendo a la anterior
     *
     *  @method Baratz.tmpls_actions.ALERTA.info
     *
     *  @param {dom object} $alert: capa alerta afectada
     *  @param {object} textos:{
     *                      {string} titulo: Título a pintar
     *                      {array} texto: Lineas de texto a pintar
     *                  }
     */
    info:($alert,textos)=>{
      const isWarningSinIcono=$alert.hasClass("alert-warning sin_icono");
      if(isWarningSinIcono){
        $alert.removeClass("sin_icono");
      }
      $alert.removeClass("alert-warning alert-success alert-danger").addClass("alert-info");
      Baratz.tmpls_actions.ALERTA.rellena($alert,textos);
      Baratz.tmpls_actions.ALERTA.muestra($alert);
    },

    /**
     *  Pinta una alerta de la clase alert-warning, sustituyendo a la anterior, con un spinner de loading como contenido
     *
     *  @method Baratz.tmpls_actions.ALERTA.progreso
     *
     *  @param {dom object} $alert: capa alerta afectada
     */
    progreso:$alert=>{
      const $img=`<div class="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only">${Baratz.i18n_js.alerta.mailTo_warning_aria_label}</span>
          </div>
        </div>`;
      $alert.removeClass("alert-success alert-danger").addClass("alert-warning sin_icono");
      const textos={
        titulo : "",
        texto  : [$img]
      };
      Baratz.tmpls_actions.ALERTA.rellena($alert,textos);
      Baratz.tmpls_actions.ALERTA.muestra($alert);
    },

    /**
     *  Oculta un contenedor con animación fade-out y aplicando al finalizar clase d-none
     *
     *  @method Baratz.tmpls_actions.ALERTA.oculta
     *
     *  @param {dom object} $alert: contenedor afectado
     */
    oculta:$alert=>{
      // problema nonce al insertar estilos inline?
      /* $alert.stop(true).animate({"opacity":"0"},"slow",function(){
        $(this).addClass("d-none").removeAttr("style");
      }); */
      //$alert.addClass("d-none").removeAttr("style");
      // solucion al problema security nonce
      $alert.removeClass("item_muestra").addClass("item_oculta");
    },

    /**
     *  Muestra un contenedor con animación fade
     *
     *  @method Baratz.tmpls_actions.ALERTA.muestra
     *
     *  @param {dom object} $alert: contenedor afectado
     */
    muestra:$alert=>{
      // problema nonce al insertar estilos inline?
      /* $alert.css("opacity","0").removeClass("d-none").stop(true).animate({"opacity":"1"},"slow",function(){
         $(this).removeAttr("style");
      }); */
      //$alert.removeClass("d-none").removeAttr("style");
      // solucion al problema security nonce
      $alert.removeClass("item_oculta d-none").addClass("item_muestra");
    },

	},

  /**
   *  Emula el comportamiento en pintado de ciertos elementos en BMD
   *
   *  @method Baratz.tmpls_actions.EMULATE_BMD
   *
   *  @param {dom object} $form_groups: En caso de nuevos elementos DOM (ej modales), este plugin puede actuar directamente sobre esos elementos
   */
  EMULATE_BMD:function($form_groups){

    const INIT=()=>{
      OPS.inicializa_inputs_selects();
    },
    /**
     *  Asociacion de acciones sobre los eventos
     *
     *  @method EVENTOS
     */
    EVENTOS=()=>{
      // aplica eventos a los inputs y selects
      elementos.forEach((e,i)=>{
        const $entrada=e;
        $entrada.on({
          'focusin':e=>{
            const $el=$(e.currentTarget);
            const $form_group=$el.closest(".form-group");
            $form_group.addClass("is-focused");
          },
          'focusout':e=>{
            const $el=$(e.currentTarget);
            const $form_group=$el.closest(".form-group");
            $form_group.removeClass("is-focused");
            const input_val=$el.val();
            if(input_val==""){
              $form_group.removeClass("is-filled");
            }
          },
          "change blur":e=>{
            const $el=$(e.currentTarget);
            const $form_group=$el.closest(".form-group");
            const input_val=$el.val();
            if(input_val==""){
              $form_group.removeClass("is-filled");
            }
            else{
              $form_group.addClass("is-filled");
            }
          }
        });
        // discriminacion por tipo
        const tipo_entrada=$entrada.attr("type");
        /* if($entrada.hasClass("datetimepicker-input")){
          $entrada.addClass("is-filled_persistent").closest(".form-group").addClass("is-filled");
        } */
        if(tipo_entrada==="password"){
          $entrada.closest(".cont_input").addClass("cont_input__password");
        }

      });
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Aplica a los inputs y selects unas clases para su correcto pintado
       *
       *  @method OPS.inicializa_inputs_selects
       */
      inicializa_inputs_selects:()=>{
        $form_groups.each((i,e)=>{
          const $el=$(e);
          const $entrada=$el.find('input:not([type="checkbox"],[type="radio"],[type="hidden"]),select');
          // Hay que modificar una clase en la busqueda avanzada para no reaplicar posteriormente selectPicker
          const $operator_advanced=$entrada.closest(".operator-advanced");
          const is_operator_advanced=($operator_advanced.length>0);
          if(is_operator_advanced){
            const index_operator_advanced=$operator_advanced.index();
            if(index_operator_advanced===1){
              $operator_advanced.addClass("no_selectPicker");
            }
          }
          if($entrada.length>0){
            // clase para el contenedor
            const tagName=$entrada.prop("tagName").toLowerCase();
            $el.addClass("cont_"+tagName);
            // inserta en el array global de tags
            elementos.push($entrada);
            // excepciones en el pintado
            if(tagName=="select"){
              const hayIcono=($el.find(".icono.icono_red").length===1);
              if(!hayIcono){
                $entrada.before('<span class="icono fas fa-sort-down icono_red" aria-hidden="true"></span>');
              }
              if($entrada.val()!==""){
                $el.addClass("is-filled");
              }
            }
            else{
              if($entrada.val()!==""){
                $el.addClass("is-filled");
              }
              // Para los input user y pass, por el autorrelleno por parte del navegador
              const name=$entrada.attr("name");
              if(name==="username" || name==="password"){
                $el.addClass("is-filled");
              }
              if($entrada.prop("disabled")===true || $entrada.attr("disabled")==="disabled"){
                $entrada.attr("disabled","disabled");
                $entrada.closest(".cont_input").addClass("cont_input_disabled");
              }
              /* if($entrada.attr("type")==="datetime-local" || $entrada.attr("type")==="date"){
                $el.addClass("is-filled_persistent");
              } */
            }
            // clase para los label si existen
            const $label=$el.find("label");
            const isHidden=Baratz.tmpls_actions.UTILS.isReallyVisible($label[0]);
            if($label.length===1 && !isHidden){
              $label.addClass("bmd-label-floating");
            }
          }
        });
        EVENTOS();
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    if(typeof($form_groups)==="undefined"){
      $form_groups=$body.find(".form-group");
    }
    // array global a la fn donde se insertarán los items necesarios
    let elementos=[];
    if($form_groups.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.EMULATE_BMD()");
      INIT();
    }
  },

  /**
   *  En primera instancia y a través de un tag lanzador (tipo 'button' ó 'a') se genera una modal, de un formato dado por campos data contenidos, en el lanzador.
   *  Las modales que se destruyen a su cierre, se generan nuevamente al volver al pulsar el boton
   *
   *  @method Baratz.tmpls_actions.MODALES_JS
   *
   *  @param {dom object} {opcional} $btn_modales : boton lanzador.
   *
   *  @detail  attrs del lanzador:
   *    [obligatorio] data-modal_target     : id de la modal que se va a montar
   *    [opcional] data-modal_title         : titulo de la modal
   *    [opcional] data-modal_tipo          : tipo de pintado de modal .modal_type_(primary,secondary,success,danger,warning,info,light,dark,custom)
   *    [opcional] data-modal_size          : tamaños bootstrap en .modal-dialog: modal-xl:1140px, modal-lg:800px, modal-md/default:500, modal-sm:300px
   *    [opcional] data-modal_discriminador : clase para discriminar en los eventos de dicha modal, si es necesario, para aplicacion de plugins, etc..
   *    [opcional] data-modal_datos         : datos de transmision a la modal, que pueden ser necesarios en el pintado del html (JSON)
   *    [opcional] data-modal_footer        : Elimina el footer de la modal (botonera inferior) si su valor es "false", para usar botones propios por ejemplo
   *    [obligatorio] data-modal_html       : id del tag html en donde se encuentre el contenido de la modal (los plugins se lanzarán desde los eventos de la modal),
   *                                           si es necesario
   *  EJEMPLO HTML
   *     <div class="cont_botonera botonera_modal col-md-12">
   *        <button class="btn btn-default modal_js"
   *          data-modal_size="modal-lg" //modal-xl:1140px, modal-lg:800px, modal-md/default/"":500, modal-sm:300px
   *          data-modal_target="#exampleModalCenter"
   *          data-modal_tipo="warning"
   *          data-modal_discriminador="modal_de_prueba"
   *          data-modal_datos='[{"nombre":"prueba_nombre_00","direccion":"prueba_direcccion_00"},{"nombre":"prueba_nombre_01","direccion":"prueba_direcccion_01"}]' // ejemplo de datos
   *          data-modal_footer="false"
   *          data-modal_html="#modal_html"
   *        >Lanza modal</button>
   *     </div>
   *     <div id="modal_html" class="d-none" aria-hidden="true">
   *        <span>Prueba de contenido en la modal</span>
   *     </div>
   *
   *  @detail ejemplo de estructura data JSON para thymeleaf:
   *              th:data-modal_datos='|{
   *                    "nombre"    : "${value.branchDescription}",
   *                    "direccion" : "${value.branchAddress}",
   *                    "email"     : "${value.branchExternalEMail}",
   *                    "lat"       : "${value.branchLatitude}",
   *                    "long"      : "${value.branchLongitude}"
   *                }|'
   *
   */
  MODALES_JS:function($btn_modales){
		console.log('en util MODALES_JS $btn_modales ', $btn_modales)
    /**
     *  Flujo inicial de acciones
     */
    const INIT=$btn_modales=>{
      OPS.btns_read($btn_modales);
    },
    /**
     *  Contenedor de eventos
     */
    EVENTOS={
      /**
       *  Eventos sobre el botón de la modal
       *
       *  @method EVENTOS.lanzador
       *
       *  @param {dom object} $btn_modales: botones lanzadores afectados
       */
      lanzador:$btn_modales=>{
        // Al click en el lanzador
        $btn_modales.off("click").on("click",e=>{
          const $btn         = $(e.currentTarget);
          const modal_id     = $btn.attr("data-modal_target");
          //const $modal=$(document.body).find(modal_id);
          const btn_modal_id = parseInt($btn.attr("data-btn_modal_id"),10);
          const datos_modal  = modales[btn_modal_id];
          EVENTOS.modal(datos_modal);
          const $modal       = datos_modal.$modal;
          // Si la modal existe, se abre
          if($modal.length>0){
            $modal.modal("show");
          }
          else{
            Baratz.tmpls_actions.MODALES_JS($btn);
            $(modal_id).modal("show");
          }
          return false;
        });
      },
      /**
       *  Aplica acciones para los eventos de una modal
       *
       *  @method EVENTOS.modal
       *
       *  @param {object} datos_modal: Datos de la modal afectada
       */
      modal:datos_modal=>{
        datos_modal.$modal.off('show.bs.modal shown.bs.modal hide.bs.modal hidden.bs.modal hidePrevented.bs.modal').on({
          // abriendo
          'show.bs.modal':()=>{
            OPS.gestiona_datos(datos_modal,"show");
          },
          // abierto
          'shown.bs.modal':()=>{
            OPS.gestiona_datos(datos_modal,"shown");
          },
          // cerrando
          'hide.bs.modal':(event)=>{
            // Cierra los datetimepickers abiertos aprovechando el dom
            OPS.close_datetimepickers(datos_modal);
            OPS.gestiona_datos(datos_modal,"hide");
          },
          // cerrado
          'hidden.bs.modal':()=>{
            OPS.gestiona_datos(datos_modal,"hidden");
            // devuelve el foco al boton de lanzamiento de la modal
            datos_modal.$lanzador.focus();
          },
          // especial
          'hidePrevented.bs.modal':()=>{
          }
        });
      },
    },
    /**
     *  Montaje de templates
     */
    TMPL={
      /**
       *  Asocia la clase para el tamaño de la modal
       *
       *  @method TMPL.clase_size
       *
       *  @param {string} datos_size  : clase bootstrap a asociar para el tamaño de la modal
       *
       *  @return {string} retorno : clase a asociar
       *
       *  @details tamaños bootstrap en .modal-dialog: modal-xl:1140px, modal-lg:800px, default/modal-md/"":500px, modal-sm:300px
       */
      clase_size:datos_size=>{
        let retorno=datos_size;
        if(datos_size!=="modal-xl" && datos_size!=="modal-lg" && datos_size!=="modal-md" && datos_size!=="modal-sm" && datos_size!=="modal-xl" && datos_size!=="default" && datos_size!==""){
          datos_size="default";
        }
        if(datos_size=="default" || datos_size=="modal-md"){
          retorno="";
        }
        return retorno;
      },
      /**
       *  Pinta el tmpl de la modal segun los datos aportados
       *
       *  @method TMPL.pintado
       *
       *  @param {object} datos  : datos necesarios para el pintado
       *
       *  @return {string} modal : html del template de la modal para incrustar en el dom
       */
      pintado:datos=>{
        const clase_size=TMPL.clase_size(datos.size);
        // Para modales con scroll añadir la clase modal-dialog-scrollable a modal-dialog (parametrizar?)
        let modal=`<div id="${datos.modal_id}" class="${datos.discriminador} modal_js modal_type_${datos.tipo} modal fade" tabindex="-1" role="dialog" aria-labelledby="modalTitle_${datos.modal_id}" aria-modal="true" aria-hidden="true">
          <div class="modal-dialog ${clase_size}" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div id="modalTitle_${datos.modal_id}" class="modal-title">${datos.title}</div>
                <button class="btn_cerrar close" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}" title="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${datos.$html_inner}
              </div>`;
        if(datos.footer){
          modal+=`<div class="modal-footer">
                <button class="btn_cerrar btn btn-outline-secondary" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                  <span class="btn_title" aria-hidden="true">${Baratz.i18n_js.modales_js.btn_cerrar_text}</span>
                </button>
                <button class="btn_guardar btn btn-primary" aria-label="${Baratz.i18n_js.modales_js.btn_guardar_aria_label}">
                  <span class="btn_title" aria-hidden="true">${Baratz.i18n_js.modales_js.btn_guardar_text}</span>
                </button>
              </div>
            </div>`;
        }
        modal+=`</div>
        </div>`;
        return modal;
      },
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Cierra los datetimepickers abiertos en la modal para evitar interacciones no deseadas
       *
       *  @method OPS.close_datetimepickers
       *
       *  @param {object} datos_modal  : datos de la modal para gestionar las acciones
       */
      close_datetimepickers:(datos_modal)=>{
        const $ctrl_datetimepicker=datos_modal.$modal.find(".ctrl_datetimepicker");
        const hay_ctrl_datetimepicker=($ctrl_datetimepicker.length>0);
        if(hay_ctrl_datetimepicker){
          $ctrl_datetimepicker.datetimepicker("hide");
        }
      },
      /**
       *  Inserta el HTML en el body según los datos obtenidos en la modal
       *
       *  @method OPS.insertaHTML
       *
       *  @param {num} i        : posición de la modal en el array de modales
       *  @param {object} modal : modal afectada
       */
      insertaHTML:(i,modal)=>{
        const $lanzador=modal.$lanzador;
        const tag_html=$lanzador.attr("data-modal_html");
        // recupera el html interior al tag
        const $html_inner=$body.find(tag_html).clone();
        // cambio de ids de elementos para evitar duplicidades por accesibilidad
        const $ids=$html_inner.find('[id]');
        $ids.each((i,e)=>{
          const $el=$body.find(e);
          const id=$el.attr("id");
          const new_id="md_acc_"+$el.attr("id");
          $el.attr("id",new_id);
          const $label=$html_inner.find(`label[for="${id}"]`);
          $label.attr('for',new_id);
        });
        modal.$html_inner=$html_inner.html();
        // indica si debe de aparecer la botonera en el footer de la modal
        let footer=true;
        if($lanzador.attr("data-modal_footer")=="false"){
          footer=false;
        }
        modal.footer=footer;
        // guarda el id de referencia en boton y modal
        modal.num=i;
        $lanzador.attr("data-btn_modal_id",i);
        // obtiene el html de la modal
        const modal_HTML=TMPL.pintado(modal);
        // inserta la modal en el body
        $body.append(modal_HTML);
        // inserta la modal en el array modales
        const modal_id="#"+modal.modal_id;
        const $modal=$body.find(modal_id);
        modal.$modal=$modal;
        // elimina la modal creada pues ya está en el array de objetos
        $body.find(modal_id).remove();
        return modal;
      },
      /**
       *  Gestiona el pintado de las modales y asocia sus eventos a través de la lectura de los attr de los botones
       *
       *  @method OPS.btns_read
       *
       *  @param {dom object} $btn_modales: botones afectados
       */
      btns_read :($btn_modales)=>{
        // recorre los botones para generar el compendio de datos y elaborar las modales
        $btn_modales.each((i,e)=>{
          let modal={
             // {dom object} boton lanzador
            $lanzador     : null,
            // {string} [opcional] data-modal_tipo : tipo de pintado de modal
            // .modal_type_(primary,secondary,success,danger,warning,info,light,dark,custom)
            tipo          : "",
            // {string} [opcional] data-modal_discriminador : clase para discriminar en los eventos de dicha modal,
            // si es necesario, para aplicacion de plugins, etc..
            discriminador : "",
            // {object} [opcional] data-modal_datos : datos de transmision a la modal, que pueden ser necesarios en el pintado del html
            datos         : null,
            // {string} [obligatorio] data-modal_html : id del tag html en donde se encuentre el contenido de la modal
            // (los plugins se lanzarán desde los eventos de la modal), si es necesario
            $html_inner   : "",
             // {string} [obligatorio] data-target : id de la modal afectada
            modal_id      : "",
            // {dom object} Modal generada
            $modal        : null,
            // {num} orden asignado para la modal
            num           : 0,
            // {string} [opcional] data-size : tamaños bootstrap en .modal-dialog:
            // modal-xl:1140px, modal-lg:800px, default/modal-md/"":500px, modal-sm:300px
            size          : "",
            title         : ""
          };
          const $btn=$body.find(e);
          // id de la modal a lanzar
          let modal_id=$btn.attr("data-modal_target");
          if(typeof(modal_id)==="undefined"){
            consoleScript.log("[scripts.new.js] modal_js sin data-modal_target...$btn",$btn);
            modal_id="#modal_notarget_"+i;
          }
          modal.modal_id=modal_id.replace("#","");
          // recupera los datos
          modal.$lanzador=$btn;
          const tipo=$btn.attr("data-modal_tipo");
          modal.tipo=(tipo)?tipo:"info";
          const title=$btn.attr("data-modal_title");
          modal.title=(title)?title:"";
          const modal_size=$btn.attr("data-modal_size");
          modal.size=(modal_size)?modal_size:"default";
          const discriminador=$btn.attr("data-modal_discriminador");
          modal.discriminador=(discriminador)?discriminador:"";
          let datos=$btn.attr("data-modal_datos");
          // transforma los datos para su posterior proceso si es necesario
          modal.datos=(datos)?Baratz.tmpls_actions.UTILS.data2object(datos):null;
          // pinta el html y guarda en el objeto los datos necesarios
          modal=OPS.insertaHTML(i,modal);
          // guarda los datos de la modal en el array de objetos
          modales.push(modal);
        });

consoleScript.log("[scripts.new.js] Baratz.tmpls_actions.MODALES_JS() -> modales OPS.btns_read() modales:",modales);

        // Aplica eventos en los botones lanzadores
        EVENTOS.lanzador($btn_modales);
      },

      /**
       *  Realiza diversas acciones a través de los datos de la modal
       *
       *  @method OPS.gestiona_datos
       *
       *  @param {object} datos_modal  : datos de la modal para gestionar las acciones
       *  @param {string} evento  : tipo de evento a modo de discriminacion
       */
      gestiona_datos:(datos_modal,evento)=>{
//console.log("[scripts.new.js] evento, datos_modal",evento,datos_modal);
        const $modal=datos_modal.$modal;
        const $alerts_action=$modal.find(".alerts_action");
        const $lanzador=datos_modal.$lanzador;
        let $select,
          $modalAddItemtoList,
          $modalItemMove,
          $cont_botonera_form,
          datos_adjuntos={};
        datos_adjuntos.evento=evento;
        datos_adjuntos.modal=datos_modal;
        // discrimina por accion
        switch(evento){
          // abriendo
          case"show":{
            // activa el formato BMD en el pintado de los componentes del formulario
            const $form_groups=$modal.find(".form-group");
            if($form_groups.length<=0){
							if(datos_modal.discriminador==="modal_confirmacion_borrado_lista"){							   
	              const item_title=$lanzador.closest("li").find(".item_title").text();
	              $modal.find(".modal_question").append(" <b> "+Baratz.tmpls_actions.UTILS.encodeHTMLentities(item_title)+"</b>");
	              const url_confirm=$lanzador.attr("data-url");
	              const btn = $modal.find(".btn_borrar");
	              Baratz.commons.titlesList.deleteListfromListPage(modales,datos_modal, event,btn,url_confirm);
							}	
						}
            if($form_groups.length>0){
              Baratz.tmpls_actions.EMULATE_BMD($form_groups);
              Baratz.tmpls_actions.TUNNING_RADIO_CHECKS($modal);
      			//console.log('en scripts modal discriminador: ', datos_modal.discriminador)
            // discrimina por tipo de modal
            console.log('datos_modal.discriminador = ', datos_modal.discriminador)
            switch(datos_modal.discriminador){
              // En el detalle, modal vista localizacion
              case "modal_branchLocation":{
                // gestiona el pintado de boton en modal a traves de los datos de localizacion de la sucursal
                Baratz.detail.TMPL.pinta_enlace_branch(datos_modal);
              }
              break;
              // En el detalle, modal vista localizacion
              case "modal_libraryLocation":{
                // gestiona el pintado de boton en modal a traves de los datos de localizacion de la biblioteca
                Baratz.detail.TMPL.pinta_enlace_library(datos_modal);
              }
              break;
              // modal manager modificar recomendados desde el detalle y lista de búsqueda
              // para recomendar en multinivel
              case "modal_recommended_levels":{
                $alerts_action.html("");
              }
              break;
              case "modal_confirmacion_borrado_manager_recommended":
              case "modal_confirmacion_borrado_manager_activity":
              case "modal_confirmacion_borrado_manager_link":
              // modal manager añadir enlace de interés
              case"modal_add_manager_link":
              // modal manager añadir nueva actividad
              case"modal_add_manager_activity":
              // modal manager modificar enlace de interés
              case"modal_modificar_manager_link":
              // modal manager modificar actividad
              case"modal_modificar_manager_activity":{
                $cont_botonera_form=$modal.find(".cont_botonera_form");
                if($alerts_action.length===0){
                  $cont_botonera_form.before($('<div class="cont_alerts alerts_action w-100 d-flex flex-column mt-3" aria-live="polite" aria-atomic="true"></div>'));
                }
                else{
                  // CUIDADO!!!: Excepción por clase (.alert_instructions_modal) para no borrar las capas de instrucciones PE: manager actividades
                  // Al abrir la modal única de modificaciones más de una vez
                  $modal.find(".alert").not(".alert_instructions_modal").remove();
                }
              }
              break;
              // modal admin monitorización, modal logs
              case"logs_batch": {
                const jobid = $lanzador.data("jobid");
                Baratz.monitor.getLogs(jobid, $modal);
                const $btn_download=$modal.find(".btn_guardar");
                $btn_download.on("click",()=>{
                	Baratz.monitor.saveLogs(jobid, $modal);
                });
              }
              break;
              // inicializa las modales detalle del item añadir a listas
              case"modal_detail_item_title_list": {
                $modal.find(".btn-add-title-list,.content_old_title_list").removeClass("d-none");
                $modal.find(".content_new_title_list,.btn-old-title-list,.alert-process").addClass("d-none");
                $modal.find(".addTitleListItem").attr("data-type_list","old");
                //if ($modal.find("div.bootstrap-select").length === 0) {
                	const $cont_select = $modal.find(".cont_selectPicker");
                	const $element     = $cont_select.find("select");
                	$element.selectpicker('refresh');
                //}
              }
              break;
              // Modal añadir nueva lista, muestra campos del form
              case"modal_add_list":{
                const $cont_titleList_form_modify=$modal.find(".cont_titleList_form_modify");
                $cont_titleList_form_modify.removeClass("d-none");
                const $input_con_iconos=$cont_titleList_form_modify.find(".input_con_iconos").removeClass("input_con_iconos");
                $input_con_iconos.find("input").attr("autocomplete","off").removeClass("min-height");
                $input_con_iconos.addClass("pl-0 mb-4").find(".cont_botonera_input").remove();
                $cont_titleList_form_modify.find(".cont_botonera").removeAttr("style");
                const $form_add_list=$cont_titleList_form_modify.find("form");
                const data_action_add=$form_add_list.attr("data-action-add");
                $form_add_list.attr("action",data_action_add);
              }
              break;
              // Borrar lista
              case"modal_confirmacion_borrado_lista":{				  
                const item_title=$lanzador.closest("li").find(".item_title").text();  
                $modal.find(".modal_question").append(" <b>"+Baratz.tmpls_actions.UTILS.encodeHTMLentities(item_title)+"</b>");
                const url_confirm=$lanzador.attr("data-url");
                const btn = $modal.find(".btn_borrar");
                Baratz.commons.titlesList.deleteListfromListPage(modales,datos_modal, event,btn,url_confirm);
              }
              break;
              // modal mover item de lista
              case"modal_detail_item_move":{
                $select=$modal.find('[name="idListNew"]');
                $select.val("").selectpicker("refresh");
              }
              break;
              // modal pinta permalink
              case"modal_detail_item_share_permalink":{
                const $textarea    = $modal.find(".cont_permalink textarea");
                const url_share    = window.location.href;
                const url_object   = Baratz.tmpls_actions.UTILS.parseURL(url_share);
                const url_complete = url_object.host+url_object.pathname;
                $textarea.val(url_complete);
                // seleccion automática de texto contenido y copia en portapapeles
                $textarea.on("focus",e=>{
                  const $el=$body.find(e.currentTarget);
                  $el.select();
                  //document.execCommand("copy");
                  $el.one('mouseup',e=>{
                    e.preventDefault();
                  });
                });
              }
              break;
              // modal droptable eliminar todos los items Mas reciente
              case"modal_sortable_remove_all_items--most_recent":
              // modal droptable elimina todos los items
              case"modal_sortable_remove_all_items":{
                const $btn_confirm=$modal.find(".btn_eliminar_items");
                $btn_confirm.on("click",()=>{
                  const $cont_sortable=$lanzador.closest(".cont_sortable");
                  $cont_sortable.find("ul.cmp_sortable_list").html("");
                  $cont_sortable.find('input[type="hidden"]').val("");
                  $modal.modal("hide");
                  return false;
                });
              }
              break;
              case "modal_add_comments":{
					   		const $btn_add_comment=$($modal).find("#save-comments");
	            	$btn_add_comment.on("click",()=>{
									//Baratz.commons.opinions.add(datos_modal,false);
								});
			  			}
			  			break;
			    	// Borrar comentario
		        case"modal_confirmacion_borrado_user_comment":{
							//console.log('modal borrar en scripts.js')
						 /* const btn = $modal.find(".btn_eliminar_comment");	
					      btn.on("click",()=>{
							  Baratz.commons.opinions.delete(datos_modal,true);
							  return false;
						  })*/
					  }
		        break;
		        //validar comentario:
		        case "modal_confirmacion_validacion_comment": {
						  const btn = $modal.find(".btn_validar_comment");
						  const ide = datos_modal.$lanzador.attr('data-id');
				      btn.on("click",(ev)=>{
							  Baratz.commons.opinions.validate(ide, false,btn);
							  return false;
						  })
					  }
					  break;              
					  case "modal_update_comments":{
						  //console.log('modificar comentario');
						 // console.log($modal)						 
			  		}
			  		break;			  		
            case"modal_cancel_reservation":{
              const $btn_anular=$modal.find(".bs-modal-go");
              $btn_anular.on("click",()=>{
                const id=$lanzador.attr("data-id");
                const source=$lanzador.attr("data-source");
                Baratz.reservation.cancelReservation(id,source);
                return false;
              });
            }
            break;
              default:
            }
          }
        }
          break;
          // abierta
          case"shown":{
        	// discrimina por tipo de modal
            switch(datos_modal.discriminador){
              // MANAGER modales recomendar en sucursales, desde resultados de búsqueda y detalle del item
              // para recomendar en multinivel
              case"modal_recommended_levels":{
                Baratz.manager_recomended.modal_recommended_levels.events(datos_adjuntos);
                Baratz.manager_recomended.modal_recommended_levels.manage(datos_adjuntos);
              }
              break;
              // modales compartir por email
              case"modal_detail_item_share_mail":
              case"modal_mylist_share_mail":
              case"modal_favorites_share_mail":{
                //var $alert_respuesta=$modal.find(".alert_respuesta");
                // evento boton enviar mail
                $modal.find(".btn.mailto").on("click",event=>{
                  Baratz.commons.mailTo(datos_modal,event);
                  return false;
                });
              }
              break;
              // modal añadir a listas
              case"modal_detail_item_title_list": {
                $modalAddItemtoList = $modal;
                // control para recargar la página si hay acciones de insercion / borrado / modificacion
                datos_modal.myListAction=false;
                // boton crear nueva lista
            	  const $btn_add_titlelist = $modalAddItemtoList.find(".btn-add-title-list");
            	  $btn_add_titlelist.on("click",()=>{
                  $modalAddItemtoList.find(".content_old_title_list,.alert-process").addClass("d-none");
                  // limpia campos
                  const $input_listName=$modalAddItemtoList.find(".content_new_title_list input[name='listName']");
            		  $input_listName.val("");
                  $input_listName.closest(".cont_input").removeClass("is-filled");

                  const $select_idList=$modalAddItemtoList.find(".content_old_title_list select[name='idList']");
                  $select_idList.val("");
                  $select_idList.selectpicker("refresh");

                  $modalAddItemtoList.find(".content_new_title_list").removeClass("d-none");
                  // cambia el valor a nueva lista
                  $modalAddItemtoList.find(".addTitleListItem").attr("data-type_list","new");

            		  $btn_old_titlelist.removeClass("d-none");
                  // Foco en input
                  $input_listName.focus();
            		  $btn_add_titlelist.addClass("d-none");
                  return false;
                });
                // boton ver listas creadas
                const $btn_old_titlelist = $modalAddItemtoList.find(".btn-old-title-list");
            	  $btn_old_titlelist.on("click",()=>{
            		  $modalAddItemtoList.find(".content_new_title_list,.alert-process").addClass("d-none");
                  // limpia campos
                  const $input_listName=$modalAddItemtoList.find(".content_new_title_list input[name='listName']");
            		  $input_listName.val("");
                  $input_listName.closest(".cont_input").removeClass("is-filled");

                  const $select_idList=$modalAddItemtoList.find(".content_old_title_list select[name='idList']");
                  $select_idList.val("");
                  $select_idList.selectpicker("refresh");

            		  $modalAddItemtoList.find(".content_old_title_list").removeClass("d-none");
                   // cambia el valor a lista existente
                  $modalAddItemtoList.find(".addTitleListItem").attr("data-type_list","old");

                  $btn_old_titlelist.addClass("d-none");
                  // Foco en select (boton selectPicker)
                  $select_idList.parent().find("button").focus();
            		  $btn_add_titlelist.removeClass("d-none");
                  return false;
                });
                // boton añadir item a una lista
            	  $modalAddItemtoList.find(".btn.addTitleListItem").off("click").on("click",event=>{
                  $modalAddItemtoList.find(".alert-process").addClass("d-none");
                  Baratz.commons.titlesList.add(modales,datos_modal, event);
                  return false;
                });
                // borrar un item de las listas en las que ya se encuentra
            	  $modalAddItemtoList.find(".btn.deleteTitleListItem").off("click").on("click",event=>{
                  const listid=$(event.currentTarget).data("listid");
                  Baratz.commons.titlesList.remove(datos_modal,listid,event);
                  return false;
                });
              }
              break;
              // modal mover item de lista
              case"modal_detail_item_move":{
                $modalItemMove=$modal;
                const $btn_submit=$modalItemMove.find('[type="submit"]');
                $select=$modalItemMove.find('[name="idListNew"]');
                $cont_botonera_form=$modalItemMove.find('.cont_botonera_form');
                $btn_submit.off("click").on("click",()=>{
                  const select_val=$select.val();
                  if(select_val===""){
                    const $cont_alert_process=$modalItemMove.find(".cont_alert_process");
                    const alert_hmtl=`<div class="cont_alert cont_alert_process w-100">
                      <div class="alert alert-process w-100 mt-3 mb-0 alert-danger" role="alert" aria-atomic="true">
                          <span class="alert_titulo sr-only">${Baratz.i18n_js.alerta.mailTo_error_title}</span>
                          <span class="alert_texto">${Baratz.i18n_js.alerta.titleList_error_old_no_select}</span>
                      </div>
                      <!-- :: /.alert -->
                    </div>`;
                    const $alert=$(alert_hmtl);
                    if ($cont_alert_process.length>0){
                      $cont_alert_process.fadeOut(()=>{
                        $cont_alert_process.detach();
                        $alert.insertBefore($cont_botonera_form);
                      });
                    }
                    else{
                      $alert.insertBefore($cont_botonera_form);
                    }
                    return false;
                  }
                });
              }
              break;
              // modal manager recomendados mover item de posicion
              case"modal_item_manager_recommended_reposicion":{
                Baratz.manager_recomended.moveItemModalEvents(datos_adjuntos);
              }
              break;
              // modal manager borrar título recomendado
              case"modal_confirmacion_borrado_manager_recommended":{
                Baratz.manager_recomended.deleteItemModalEvents(datos_adjuntos);
              }
              break;
              // modal manager borrar enlace de interés
              case "modal_confirmacion_borrado_manager_link":{
                Baratz.manager_interestLinks.eliminar(datos_adjuntos);
              }
              break;
              // modal manager borrar próximas actividades
              case"modal_confirmacion_borrado_manager_activity":{
                Baratz.manager_activities.eliminar(datos_adjuntos);
              }
              break;

              ////////////////////////////////////////////////////////////////////////////
              //  CASOS DE APLICACION datetimepicker EN MODALES CON CAMPOS input="date"
              ////////////////////////////////////////////////////////////////////////////
              // modal manager añadir próximas actividades
              case"modal_add_manager_activity":{
                Baratz.manager_activities.add(datos_adjuntos);
                Baratz.tmpls_actions.CTRL_DATETIMEPICKER($modal);
              }
              break;
              // modal manager modificar próximas actividades
              case"modal_modificar_manager_activity":{
                Baratz.manager_activities.modificar(datos_adjuntos);
                Baratz.tmpls_actions.CTRL_DATETIMEPICKER($modal);
              }
              break;
              // modal manager modificar enlaces de interes
              case"modal_modificar_manager_link":{
                Baratz.manager_interestLinks.modificar(datos_adjuntos);
                Baratz.tmpls_actions.CTRL_DATETIMEPICKER($modal);
              }
              break;
              // modal manager añadir enlace de interés
              case"modal_add_manager_link":{
                Baratz.manager_interestLinks.add(datos_adjuntos);
                Baratz.tmpls_actions.CTRL_DATETIMEPICKER($modal);
              }
              break;

              default:
            }
          }
          break;
          case "hide":{
            switch(datos_modal.discriminador){
              case"modal_detail_item_title_list": {
                // Problemas con el salectpicker al reabrir la modal que no permite seleccionar, se destruye para evitar problemas
                datos_modal.$modal.find("select").selectpicker("destroy");
              }
              break;
              default:
            }
          }
          break;
          // cerrada
          case"hidden":{
            // elimina modal del dom, ya está guardada en modales.$modal y no hace falta en el dom
            $modal.remove();
            // discrimina por tipo de modal
            switch(datos_modal.discriminador){
              //////////////////////////////////////////////////////////////////////////
              // REINICIA LOS VALORES CONTENIDOS EN LA MODAL DEL ARRAY CON LOS INICIALES
              //////////////////////////////////////////////////////////////////////////
              // modal manager mover item de posicion
              case"modal_item_manager_recommended_reposicion":
              // modal recomendados desde detalle y lista de búsqueda
              case"modal_recommended_levels":
              // modal manager añadir nueva actividad
              case"modal_add_manager_activity":
              // modal manager añadir enlace de interés
              case"modal_add_manager_link":
              // modal detalle del item compartir por email
              case"modal_detail_item_share_mail":
              // modal favoritos compartir por email
              case"modal_favorites_share_mail":{
                // reinicia la modal con los valores iniciales
                const modal_pos=datos_modal.num;
                const modal=modales[modal_pos];
                OPS.insertaHTML(modal_pos,modal);
                $alerts_action.find(".alert").remove();
              }
              break;
              case "modal_confirmacion_borrado_manager_activity":
              case "modal_confirmacion_borrado_manager_link":{
                // al borrar un item se vuelven a determinar los modales del array
                Baratz.tmpls_actions.MODALES_JS();
              }
              break;
              // modal detalle de item mover item de lista
              case"modal_detail_item_move":{
                $modal.find(".alert-process").remove();
              }
              break;
              // modales detalle de item añadir a listas
              case"modal_detail_item_title_list": {
                if(datos_modal.myListAction){
                  const url_actual=window.location.href;
                  window.location.href=url_actual;
                }
              }
              break;
              default:
            }
          }
          break;
          default:
        }
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    // Array para el guardado de los datos de las modales
    let modales=[];
    // lanzadores de modal
    if(typeof($btn_modales)==="undefined"){
      $btn_modales=$body.find(".modal_js");
    }
    if($btn_modales.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.MODALES_JS()");
      INIT($btn_modales);
    }
  },

  /**
   *  Gestiona las acciones de pintado para una capa .quick_search en sus componentes (tambien disposiciones responsive)
   *
   *  @method Baratz.tmpls_actions.QUICKSEARCH
   */
  QUICKSEARCH:function(){

    /**
     *  Flujo inicial de acciones
     */
    const INIT=()=>{
      EVENTOS();
    },
    /**
     *  Asociación de acciones sobre los eventos
     *
     *  @cont EVENTOS
     */
    EVENTOS=()=>{
      const $btns_actions=$quickSearch.find(".btn-actions");
      $btns_actions.on("click",e=>{
        const $btn=$(e.currentTarget);
        OPS.accion_boton($btn);
        return false;
      });

      // boton borra contenido
      const $btn_delete_terms=$contInputQuickSearch.find(".btn_delete_terms");
      $btn_delete_terms.on("click",()=>{
        $input_afectado.val("");
        return false;
      });

      // al foco en el input se aplica clase al contenedor para el pintado
      $input_afectado.on({
        "focusin":()=>{
          $contInputQuickSearch.addClass("cont-focused-js");
        },
        "focusout":()=>{
          $contInputQuickSearch.removeClass("cont-focused-js");
        }
      });

      // Para movil: Click en despliegue de opciones
      $btn_show_collapse.on("click",e=>{
        const $btn=$(e.currentTarget);
        const isActive=$btn.hasClass("active");
        if(isActive){
          $btn.removeClass("active");
          $container_mobile_collapse.addClass("desktop_flex").removeAttr("style");
        }
        else{
          $btn.addClass("active");
          $container_mobile_collapse.removeClass("desktop_flex").css({"display":"flex"});
        }
        return false;
      });
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Pliega/despliega la capa necesaria a través de un boton dado
       *
       *  @method OPS.accion_boton
       *
       *  @param {dom object} $btn: botón afectado
       */
      accion_boton:$btn=>{
        const isControlContainer=$btn.attr("data-control_container");
        if(isControlContainer){
          const $cont=$quickSearch.find("."+isControlContainer);
          const isActive=$btn.hasClass("active");
          if(isActive){
            $btn.removeClass("active");
            $cont.slideUp(function(){
              // evita el problema de no pintado en resolucion desktop
              $(this).removeAttr("style");
            });
          }
          else{
            $btn.addClass("active");
            //Modificación para poder mostrar los distintos filtros, pues ahora están todos en el mismo contenedor
            if(isControlContainer=='cont_sources') {
              $('.busqueda-catalogos').hide();
              $('.type_copySources').show();
            } else {
              $('.type_copySources').hide();
              $('.busqueda-catalogos').show();
            }
            $cont.slideDown();
          }
        }
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body                      = $(document.body);
    const $quickSearch               = $body.find(".quick_search");
    const $contInputQuickSearch      = $quickSearch.find(".cont_input_quick_search");
    const $input_afectado            = $contInputQuickSearch.find("input");
    const $btn_show_collapse         = $contInputQuickSearch.find(".btn_show_collapse");
    const $container_mobile_collapse = $quickSearch.find(".container_mobile_collapse");
    if($quickSearch.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.QUICKSEARCH()");
      INIT();
    }
  },

  /**
   *  Gestiona el pintado del menu lateral en la version móvil (pasa a vista desplegable en barra Mi perfil) para las vista reader (datos de usuario)
   *
   *  @method Baratz.tmpls_actions.MENU_LATERAL
   */
  MENU_LATERAL:function(){

    /**
     *  Flujo inicial de acciones
     */
    const INIT=()=>{
      EVENTOS();
    },
    /**
     *  Asociacion de acciones sobre los eventos
     *
     *  @method EVENTOS
     */
    EVENTOS=()=>{
      // Click boton despliegue menu personal
      const $btn=$cont_menu_lateral.find(".btn_expand_menu");
      $btn.on("click",e=>{
        const $btn=$(e.currentTarget);
        OPS.ctrl_animation($btn);
        return false;
      });

      // Resize de ventana
      const $window=$(window);
      $window.on({
        resize:()=>{
          if(this.resizeTO_menu){
            clearTimeout(this.resizeTO_menu);
          }
          this.resizeTO_menu = setTimeout(()=>{
            // asignamos la ejecución del evento
            $window.trigger('menu_perfil:resizeEnd');
          }, 500);
        },
        "menu_perfil:resizeEnd":()=>{
          const isActive=$btn.hasClass("active");
          const isMobile=Baratz.tmpls_actions.UTILS.isMobileDevice();
          // Al resize, si no es movil y el menu está abiero, entonces se cierra
          if(!isActive && !isMobile){
            $btn.trigger("click");
          }
          // Al resize, el menu cierra si o si
          if(isMobile){
            $btn.removeClass("active").attr('aria-expanded',"false");
            $menu_lateral.addClass("collapse");
            $nav.removeAttr("style");
          }
        }
      });
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Control de la animacion del menu para móvil
       *
       *  @method OPS.ctrl_animation
       *
       *  @param {string} $btn  : botón que despliega el menu Mi Perfil
       */
      ctrl_animation:$btn=>{
        const isActive=JSON.parse($btn.attr("aria-expanded"));
        const isMobile=Baratz.tmpls_actions.UTILS.isMobileDevice();
        const isSmallScreen = Baratz.tmpls_actions.UTILS.isSmallScreen();
        if(!isMobile &&  !isSmallScreen){
          return;
        }
        const num_li=$nav.find("li").length;
        const sizeX=(num_li*58)+"px";
        if(!isActive){
          $btn.addClass("active").attr('aria-expanded',"true");
          $nav.css({"height":"0px","overflow":"hidden"});
          $menu_lateral.removeClass("collapse");
          setTimeout(()=>{
            $nav.stop(true).animate({"height":sizeX},"fast",function(){
              $(this).css("height","auto");
            });
          },100);
        }
        else{
          $btn.removeClass("active").attr('aria-expanded',"false");
          $nav.stop(true).animate({"height":"0"},"fast",function(){
            $menu_lateral.addClass("collapse");
            $(this).removeAttr("style");
          });
        }
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body              = $(document.body);
    const $cont_menu_lateral = $body.find(".reader-menu");
    const $menu_lateral      = $body.find("#lateralMenu");
    const $nav               = $menu_lateral.find(".nav");
    if($menu_lateral.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.MENU_LATERAL()");
      INIT();
    }
  },

  /**
   *  Gestiona acciones discriminando por vista a traves de tag body con attr data-tipo_vista=",..."
   *
   *  @method Baratz.tmpls_actions.GESTION_VISTA
   */
  GESTION_VISTA:function(){

    /**
     *  Flujo inicial de acciones
     */
    const INIT=()=>{
      TMPL.gestionaVista();
      EVENTOS();
    },
    /**
     *  Contenedor de eventos
     */
    EVENTOS=()=>{
      // En el evento resize
      $(window).on("resize",()=>{
        TMPL.gestionaVista();
      });
    },
    /**
     *  Contenedor de operaciones
     */
    TMPL={
      /**
       *  Discrimina acciones para un tipo de vista dado a traves de data-tipo_vista en tag body
       *
       *  @method OPS.gestionaVista
       */
       gestionaVista:()=>{
        const isMobile=Baratz.tmpls_actions.UTILS.isMobileDevice();
        let tipo_vista=$body.attr("data-tipo_vista");
        if(typeof(tipo_vista)=="undefined"){
          consoleScript.log("Baratz.tmpls_actions.GESTION_VISTA()->OPS.gestionaVista() tipo_vista no definido");
          return;
        }
        tipo_vista=tipo_vista.split(",");
        if(tipo_vista.length===2){
          const tipo=tipo_vista[0];
          const vista=tipo_vista[1];
          switch (tipo){
            case "reader":{
              /* if(isMobile){
                $body.addClass("vista_reader_mobile");
              }
              else{
                $body.removeClass("vista_reader_mobile");
              } */
            }
            break;
            default:
          }
        }
      }
    };
    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.GESTION_VISTA()");
    INIT();
  },

  /**
   *  Pinta una botonera flotante en el footer para acciones varias a través de botones ó enlaces con attr data-action
   *
   *  @method Baratz.tmpls_actions.BOTONERA_FLOTANTE
   *
   *  @details
   *    • Botón de navegación para subida al inicio de página [data-action="subir"]
   *    • Ejemplo de insercion de botones especiales [title/stickySidebar.html]
   *    • Ejemplo de insercion de botones vía html:
   *         <div class="cont_botonera botonera_flotante_btn_actions d-none" aria-hidden="true">
   *           <a class="btn_accion btn_cancel" data-action="cancel_adminProperties" href="//localhost:8080/OpacWeb-0.2.2-SNAPSHOT/public/home" aria-label="Ir a la página anterior" title="Ir a la página anterior">
   *             <span class="icono fas fa-undo" aria-hidden="true"></span>
   *           </a>
   *         </div>
   *         <!-- :: /.cont_botonera -->
   *
   *  @details IMPORTANTE! Interactúa con Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT
   */
  BOTONERA_FLOTANTE:function(){

    const INIT=()=>{
      OPS.inicializa_anchors();
      OPS.inicializa_botonera_btn_actions();
      // inicialmente se muestra ó no el boton scroll
      OPS.control_button_scroll();
      // Aplica acciones sobre los eventos
      EVENTOS();
    },

    /**
     *  Asociación de acciones sobre los eventos
     *
     *  @method EVENTOS
     */
    EVENTOS=()=>{

      // aplica lectura del evento
      $window.on("scroll",()=>{
        OPS.control_button_scroll();
      });

      // Al click en un boton de accion de la botonera flotante
      $botonera.find(".btn_accion").on("click",e=>{
        const $btn=$(e.currentTarget);
        const isActive=$btn.hasClass("active");
        // boton navegacion [reader/titleList/listItems/listItems.html]
        const is_navigation=$btn.hasClass("btn_navigation");
        // Si es cancelar, sólo es un href [admin/properties/adminProperties.html]
        const is_btn_cancel=($btn.attr("data-action")=="cancel_adminProperties");
        if(!is_btn_cancel && !is_navigation){
          OPS.acciones($btn,isActive);
          return false;
        }
      });

      // Al click en el boton desplegar / plegar botonera flotante
      $botonera.find(".btn_cursor").on("click",e=>{
        const $btn=$(e.currentTarget);
        const isActive=$btn.hasClass("active");
        if(!isActive){
          $btn.addClass("active");
        }
        else{
          $btn.removeClass("active");
        }
        const $icono=$btn.find(".icono");
        const cont_anchors_size=($cont_anchors.find(".btn_anchor").length>0);
        if(cont_anchors_size){
          OPS.ctrl_plegado($icono,$cont_anchors);
        }
        const $cont_btns_form=$botonera.find(".cont_btns_form");
        if($cont_btns_form.length>0){
          OPS.ctrl_plegado($icono,$cont_btns_form);
        }
        return false;
      });
    },
    /**
     *  Contenedor de acciones obre la vista
     *
     *  @cont TMPL
     */
    TMPL={
      /**
       *  Pliega el menu de anclas (para evitar problemas de foco y scroll)
       *
       *  @method TMPL.cierra_menu_anchors
       */
      cierra_menu_anchors:()=>{
        const $stc_menu_anchors=$body.find(".stc_menu_anchors");
        const isOpen=($stc_menu_anchors.attr("data-stc_menu_open")=="true");
        if(isOpen){
          $stc_menu_anchors.find(".stc_menu_btn").trigger("click");
          window.prevFocus=null;
        }
      },
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Control del boton de plegado de la botonera
       *
       *  @method OPS.ctrl_plegado
       *
       *  @param {dom object} $icono  : Icono de plegado de la botonera
       *  @param {dom object} $cont   : contenedor a plegar
       */
      ctrl_plegado:($icono,$cont)=>{
        $cont.stop(true).animate({"width":"toggle"},"slow",()=>{
          $icono.toggleClass("fa-chevron-right fa-chevron-left");
        });
      },

      /**
       *  Inicializa la vista de botones de accion para el formulario de administracion de propiedades
       *
       *  @method OPS.inicializa_botonera_btn_actions
       */
      inicializa_botonera_btn_actions:()=>{
        const $botonera_flotante_btn_actions=$body.find(".botonera_flotante_btn_actions");
        const botonera_flotante_btn_actions_size=($botonera_flotante_btn_actions.length>0);
        if(!botonera_flotante_btn_actions_size){
          return;
        }
        const $html_buttons=$botonera_flotante_btn_actions.html();
        const $blq_cont_btns_forms=$("<div/>",{"class":"blq cont_btns_form"}).append($html_buttons);
        $botonera.append($blq_cont_btns_forms);
        $cont_despliegue.removeAttr("style");
      },

      /**
       *  Si hay botones con un ancla, se verifica la existencia del ancla para pintar el botón (por name)
       *
       *  @method inicializa_anchors
       */
      inicializa_anchors:()=>{
        const $btns_anchor=$cont_anchors.find(".btn_anchor");
        let btns_length=$btns_anchor.length;
        $btns_anchor.each((i,e)=>{
          const $btn  = $(e);
          const href  = $btn.attr("href");
          const $capa = $body.find(href);
          if($capa.length===0){
            $btn.remove();
            btns_length=btns_length-1;
          }
          else{
            // al click en los botones anchor
            $btn.on("click",e=>{
              TMPL.cierra_menu_anchors();
              const $btn  = $(e.currentTarget);
              const href  = $btn.attr("href");
              const $capa = $body.find(href);
              // fn asíncrona, lanza scroll
              Baratz.tmpls_actions.UTILS.scroll_anchor($capa, false);
              return false;
            });
          }
        });
        if(btns_length===0){
          $cont_despliegue.css("display","none");
        }
      },

      /**
       *  Comprueba la visibiliidad en pantalla del botón para subir al header, si scroll>100 es visible
       *
       *  @method OPS.control_button_scroll
       */
      control_button_scroll:()=>{
        const desplazamientoActual=$window.scrollTop();
        if($btn_subir.hasClass("d-none")){
          $btn_subir.css("display","none").removeClass("d-none");
        }
        const display=($btn_subir.css("display")!=="none");
        // comprueba si se debe de mostrar el botón
        if(desplazamientoActual > 100 && !display){
          $btn_subir.fadeIn(500);
        }
        // comprueba si se debe de ocultar el botón
        if(desplazamientoActual < 100 && display){
          $btn_subir.fadeOut(500);
        }
      },

      /**
       *  Gestión de las acciones relacionadas con los botones contenidos en la botonera flotante de footer
       *
       *  @method OPS.acciones
       *
       *  @param {dom object} $btn : botón afectado
       *  @param {bool} isActive   : Si es o no activo
       */
      acciones: ($btn,isActive)=>{
        const accion=$btn.attr("data-action");
        const form_afectado=$btn.attr("data-form_afectado");
        const $form=$body.find("#"+form_afectado);
        switch (accion){
          case"subir":{
            TMPL.cierra_menu_anchors();
            const $capa=$body.find(".header_principal");
            Baratz.tmpls_actions.UTILS.scroll_anchor($capa);
          }
          break;
          case"submit_adminPassword":
          case"submit_adminProperties":{
            $form.submit();
          }
          break;
          case"clean_form_adminPassword":{
            // document.querySelector
            document.getElementById(form_afectado).reset();
            $form.find(".cont_input").removeClass("is-filled").eq(0).find("input").focus();
          }
          break;
          case"close_tab":
            window.close();
          break;
          default:

        }
      },

    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $window          = $(window);
    const $body            = $(document.body);
    const $footer          = $body.find(".footer_principal");
    const $botonera        = $footer.find(".botonera_flotante");
    //const $cont_specials=$botonera.find(".cont_specials");
    const $cont_despliegue = $botonera.find(".cont_despliegue");
    const $cont_anchors    = $botonera.find(".cont_anchors");
    const $btn_subir       = $botonera.find('[data-action="subir"]');
    if($botonera.length===1){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.BOTONERA_FLOTANTE()");
      INIT();
    }
  },

  /**
   *  Pinta y actua sobre los input tipo range de la clase .range_slider
   *
   *  @method Baratz.tmpls_actions.RANGE_SLIDER
   *
   *  @details Formato de la capa
   *    <div class="progress_bar blue" data-active="false" data-button="false" data-literales="true">
   *      <input type="range" class="range_slider" value="50" min="0" max="100" name="rangeslider"/>
   *      <span class="literal icono_inicial d-none" data-pos="0%" th:text="#{progress.bar1}"></span>
   *      <span class="literal icono_final d-none" data-pos="100%" th:text="#{progress.bar2}"></span>
   *    </div>
   */
  RANGE_SLIDER:function(){

    const INIT=$range_slider=>{
      OPS.initialize($range_slider);
      EVENTOS($range_slider);
      OPS.updateSlider($range_slider);
    },
    /**
     *  Acciones asociadas a los eventos, si el input type="range" permite interactuar sobre él
     *
     *  @method EVENTOS
     *
     *  @param {dom object} $range_slider: input type="range" de la clase .range_slider
     */
    EVENTOS=$range_slider=>{
      $range_slider.on("input",e=>{
        const $obj=$(e.currentTarget);
        OPS.updateSlider($obj);
      });
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Pinta el slider en pantalla
       *
       *  @method OPS.initialize
       *
       *  @param {dom object} $range_slider: Input type="range"
       */
      initialize:$range_slider=>{
        const $progress_bar=$range_slider.closest(".progress_bar");
        // lectura de campos data
        const isOnlyRead      = JSON.parse($progress_bar.attr("data-only_read"));
        const cursorVisible   = JSON.parse($progress_bar.attr("data-cursor_visible"));
        const hayLiterales    = JSON.parse($progress_bar.attr("data-literales"));
        const conCifra        = JSON.parse($progress_bar.attr("data-con_cifra"));
        // envuelve el input con una capa contenedora
        $range_slider.wrap("<span class='cont_range_slider'></span>");
        const $cont_range_slider=$progress_bar.find(".cont_range_slider");
        // despues se incrusta el html necesario
        let html=`<span class="slider-container">
          <span class="bar">
            <span class="slider_occupation"></span>
          </span>`;
        // Si hay cifra en el punto deslizante
        if(conCifra){
          html+=`<span class="bar-btn">
            <span class="cifra">0</span>
          </span>`;
        }
        // Si se necesita que el punto deslizante esté visible
        if(cursorVisible){
          html+=`<span class="cursor"></span>`;
        }
        // Si se necesita situar literales en la barra
        let $literales="";
        if(hayLiterales){
          $literales=$progress_bar.find(".literal").clone();
          $progress_bar.find(".literal").remove();
          $literales.each((i,e)=>{
            const $lit=$(e);
            $lit.removeClass("d-none").css("display","none");
            const pos=$lit.attr("data-pos");
            $lit.css({"left":pos,"display":"block"});
            const $texto=$("<span/>",{"class":"literal_texto"}).text($lit.html());
            $lit.html($texto);
          });
        }
        const $html=$(html);
        $range_slider.after($html);
        // Inserta los literales en su unto
        $cont_range_slider.find(".slider-container").append($literales);
        // Si no se necesita interacciones con el usuario
        if(isOnlyRead){
          $range_slider.attr("disabled","disabled");
        }
        $progress_bar.css("opacity","0").removeClass("invisible").animate({"opacity":"1"},"slow");
      },
      /**
       *  Aplica los valores en el pintado
       *
       *  @method OPS.updateSlider
       *
       *  @param {dom object} $range_slider
       */
      updateSlider:$range_slider=>{
        const value       = $range_slider.val();
        const min         = $range_slider.attr("min");
        const max         = $range_slider.attr("max");
        const range       = Math.round(max - min);
        const percentage  = Math.round((value - min) * 100 / range);
        const nextObj     = $range_slider.next();
        nextObj.find(".bar-btn,.cursor").css("left", percentage + "%");
        nextObj.find(".bar > .slider_occupation").css("width", percentage + "%");
        nextObj.find(".bar-btn > .cifra").text(percentage);
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $range_sliders=$body.find(".range_slider");
    if($range_sliders.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.RANGE_SLIDER()");
      // Recorre todos los input type="range" de clase .range-slider
      $range_sliders.each((i,e)=>{
        INIT($(e));
      });
    }
  },

  /**
   *  Contenedor de acciones sobre .swiper-container (carouseles de imagenes)
   *
   *  @method Baratz.tmpls_actions.CAROUSEL
   *
   *  @details
   *    https://github.com/nolimits4web/swiper
   *    https://swiperjs.com/demos/
   *
   *    • En el pintado de los items en pantalla, se controla la vista para que, si aparecen menos
   *      de los indicados en el punto de corte, no se aplique el plugin
   *      Tiene en cuenta el resize de pantalla a la hora de aplicar este requisito
   */
  CAROUSEL:function(){
    /**
     *  Flujo inicial de acciones
     */
     
     
    const INIT= async()=>{
      await TMPL.prepara_lista();
      await OPS.inicializa_carouseles();
      // Eventos externos sobre / para carousel
      EVENTOS();
    },
    /**
     *  Contenedor de eventos
     */
    EVENTOS=()=>{
	
	var desplegarUtilidades = document.getElementById("desplegarUtilidades");
				if (desplegarUtilidades) {
					document.getElementById("desplegarUtilidades").addEventListener("click", () => {
	if( document.getElementById("utilitiesDisplay").style.opacity !=1){
		document.getElementById("utilitiesDisplay").style.opacity=1;
   		document.getElementById("utilitiesDisplay").style.zIndex=9997;
   			document.getElementById("utilitiesDisplayTop").style.opacity=1;
   		document.getElementById("utilitiesDisplayTop").style.zIndex=9998;
	}else{
	document.getElementById("utilitiesDisplay").style.opacity=0;
   	document.getElementById("utilitiesDisplay").style.zIndex=-9997;
   		document.getElementById("utilitiesDisplayTop").style.opacity=0;
   		document.getElementById("utilitiesDisplayTop").style.zIndex=-9998;
	}
   
}, false);
document.getElementById("xcerrarUtilidades").addEventListener("click", () => {
   document.getElementById("utilitiesDisplay").style.opacity=0;
   document.getElementById("utilitiesDisplay").style.zIndex=-9997;
   	document.getElementById("utilitiesDisplayTop").style.opacity=0;
   		document.getElementById("utilitiesDisplayTop").style.zIndex=-9998;


}, false);

}




      // Al finalizar el resize de pantalla
      const $window=$(window);
      $window.on({
        resize:()=>{
          if(this.resizeTO_carousel){
            clearTimeout(this.resizeTO_carousel);
          }
          this.resizeTO_carousel = setTimeout(()=>{
            OPS.inicializa_carouseles();
          },500);
        }
      });
    },

    TMPL={
      /**
       *  Adjudica las clases necesarias a la lista de elementos para aplicar swipper
       *
       *  @method TMPL.prepara_lista
       */
      prepara_lista:()=>{
        let retorno=new Promise((resolve,reject)=>{
          $swiper_containers.each((i,e)=>{
            const $cont=$(e);
            const $lista=$cont.find("ul").addClass("swiper-wrapper");
            $lista.find("li").addClass("swiper-slide");
          });
          resolve(true);
        });
        return retorno;
      },
      /**
       *  Aplica eventos sobre los botones imagen
       *
       *  @method TMPL.eventos_btn_image
       *
       *  @param {dom object} $btn_image: botón imagen afectado
       */
      eventos_btn_image:$btn_image=>{
        $btn_image.off("click").on("click",e=>{
          const $btn=$(e.currentTarget);
          const href=$btn.closest("figure").find(".cont_title").attr("href");
          if(href!==""){
            window.open(href, '_self');
          }
        });
      }
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Inicia los carouseles
       *
       *  @method OPS.inicializa_carouseles
       *
       *  @details Las instancias se guardan el array general swiperInstances[]
       *    • Primero se ejecuta un destroy de las instancias (control responsive) y luego se reaplica el instanciado determinnando el numero de items a pintar,
       *      teniendo en cuenta si es necesario o no el carousel
       */
      inicializa_carouseles:()=>{
        let retorno=new Promise((resolve,reject)=>{
  consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CAROUSEL()>>>>>>>>>>>>>>>>>>>>OPS.inicializa_carouseles()");
          // lineas para truncar en los titulos
          const lines_truncate=4;
          // Responsive breakpoints generales para los carouseles
          let carousel_breakpoints={
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 0
            },
            1100: {
              slidesPerView: 5,
              spaceBetween: 0
            },
            1400: {
              slidesPerView: 5,
              spaceBetween: 0
            },
            1600: {
              slidesPerView: 5,
              spaceBetween: 0
            }
          };

          // Si existen instancias previas, se destruyen para volver a evaluar
          if(swiperInstances.length>0){
            swiperInstances.forEach(element=>{
              if(typeof(element)!=="undefined"){
                element.destroy();
              }
            });
          }
          // recorre las instancias del DOM
          $swiper_containers.each((index,e)=>{
            const $this = $(e);
            // quita las clases no-carousel de las instancias en el dom
            $this.removeClass('no_carousel instance instance-'+index).find(".swiper-pagination,.swiper-button-next,.swiper-button-prev").remove();
            $this.find("li").removeClass("no_carousel_item");
            // Si el carousel está en la página de detalle, con 6 elementos puede quedar pequeño en >=1600
            const is_container_detail=$this.closest(".container_detail");
            if(is_container_detail.length>0){
              carousel_breakpoints["1600"]={
                slidesPerView : 5,
                spaceBetween  : 0
              };
            }

            // aplica instancia si es necesario a través del número de items aportado por la configuración responsive del carousel
            const aplicaSlider=OPS.revisa_num_items($this,carousel_breakpoints);
            let $conts_title;
            if(aplicaSlider){
              const controles=`<div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>`;
              $this.addClass("instance instance-" + index).append(controles);
              $this.find(".swiper-button-prev").addClass("btn-prev-" + index);
              $this.find(".swiper-button-next").addClass("btn-next-" + index);
              // carousel: opciones comunes
              let opciones_carousel={
                loop: false,
                /* autoplay: {
                  delay: 2000,
                }, */
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                // accesible
                a11y: {
                  prevSlideMessage: Baratz.i18n_js.carousel.prevSlideMessage,
                  nextSlideMessage: Baratz.i18n_js.carousel.nextSlideMessage,
                },
                // Responsive carousel breakpoints
                breakpoints: carousel_breakpoints,
                // events
                on: {
                  // se lanza al inicio y en los resize de pantalla
                  init: function () {
                    const $this=$(this.$el);
                    // pintado de las imagenes de los items del carousel
                    const $conts_image=$this.find(".cont_image");
                    /*
                    $conts_image.each((i,e)=>{
                      const $cont=$(e.currentTarget);
                      const isInvisible=$cont.hasClass("invisible");
                      if(isInvisible){
                        $cont.css({"opacity":"0"}).removeClass("invisible").animate({"opacity":"1"},"slow");
                      }
                    });
                    */
                    $conts_image.removeClass("invisible");
                    // aplicacion de ellipsis dentro los títulos, se busca tag con .ellipsis_multiline
                    $conts_title=$this.find(".card-body");
                    OPS.ellipsis_prepara($conts_title,"init-ellipsized");
                    OPS.ellipsis($conts_title,"swiper-init-ellipsized",lines_truncate+1);
                    // eventos internos
                    const $btn_image=$this.find(".btn_image");
                    TMPL.eventos_btn_image($btn_image);
                  }
                }
              };
              // botones de cada slider
              opciones_carousel.nextButton=".btn-next-" + index;
              opciones_carousel.prevButton=".btn-prev-" + index;
              swiperInstances[index] = new Swiper(".instance-" + index,opciones_carousel);
            }
            else{
              consoleScript.log("[scripts.new.js] Baratz.tmpls_actions.CAROUSEL() NO CAROUSEL:::::::::::::::::::::::::::::::::::::::::::",$this);
              $this.addClass("no_carousel").find("li").addClass("no_carousel_item");
              // aplicacion de ellipsis dentro los títulos, se busca tag con .ellipsis_multiline
              $conts_title=$this.find(".card-body");
              OPS.ellipsis_prepara($conts_title,"swiper-init-ellipsized");
              OPS.ellipsis($conts_title,"init-ellipsized",lines_truncate+1);
              const $btn_image=$this.find(".btn_image");
              TMPL.eventos_btn_image($btn_image);
            }
          });
          resolve();
        });
        return retorno;
      },
      /**
       *  Revisa el número de items contenidos en la capa del slider así como el width de pantalla, para ver si es necesario aplicar el plugin
       *
       *  @method OPS.revisa_num_items
       *
       *  @param {dom object} $cont: contenedor carousel sobre el que actuar
       *  @param {object} carousel_breakpoints : puntos de ruptura screen del carousel
       *
       *  @return {bool} retorno: Indica si es necesario o no
       */
      revisa_num_items:($cont,carousel_breakpoints)=>{
        let retorno=false;
        // recupera el tamaño de window
        const w_navegador=$(window).width();
        // Selecciona el ultimo item de la configuracion de puntos de corte para el carousel
        const carousel_breakpoints_size=Object.keys(carousel_breakpoints).length;
        const carousel_breakpoints_last=Object.keys(carousel_breakpoints)[carousel_breakpoints_size-1];
        const w_nav=(w_navegador>carousel_breakpoints_last)?carousel_breakpoints_last:w_navegador;
        // revisa el numero de items que deben de pintarse en el punto de corte para ver si es menor el numero de items existente
        const items_existentes=$cont.find("li").length;
        let adecuado=0;
        for (const [key, val] of Object.entries(carousel_breakpoints)){
          const num=Number(key);
          // busca cual es el punto de corte adecuado al tamaño de pantalla segun el array de puntos de corte
          if(w_nav<=num && adecuado===0){
            adecuado=num;
            if(val.slidesPerView<=items_existentes){
              retorno=true;
              break;
            }
          }
        }
        return retorno;
      },
      /**
       *  Aplica plugin truncate.js en los items necesarios, aplicando clase especifica
       *
       *  @method OPS.ellipsis
       *
       *  @param {dom object} $conts_title: contenedor sobre el que actuar
       *  @param {str} clase_ellipsized : clase a aplicar en caso de truncaje
       *  @param {num} lines_truncate : numero de lineas a partir de donde truncar
       */
      ellipsis:($conts_title,clase_ellipsized,lines_truncate)=>{
        $conts_title=$conts_title.not("."+clase_ellipsized);
        $conts_title.each((i,e)=>{
          const $cont_title=$(e);
          $cont_title.addClass(clase_ellipsized);
          Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS($cont_title,lines_truncate);
        });
      },
      /**
       *  Inicialización del contenedor para la aplicacion de ellipsis
       *
       *  @method OPS.ellipsis_prepara
       */
      ellipsis_prepara:($conts_title,clase_ellipsized)=>{
        // Elimina la clase de truncaje del carousel
        $conts_title.removeClass(clase_ellipsized);
      }
    };

    ////////////////////////
    // INICIALIZACION
    ////////////////////////
    const $body=$(document.body);
    // La clase .swiper-container es necesaria para aplicar el plugin
    const $swiper_containers=$body.find(".swiper-container");
    // define inicialmente el array de instancias
    const swiperInstances=[];
    // Si existe algún contenedor de la clase
    if($swiper_containers.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CAROUSEL()");
      // si el plugin swiper js no está cargado, se carga
      if(typeof(Swiper)!=="function"){
        Baratz.tmpls_actions.UTILS.requiredCSS([
          "plugins/swiper-master/package/css/swiper.min.css",
        ]);
        const control=Baratz.tmpls_actions.UTILS.requiredJSAsync([
          "plugins/swiper-master/package/js/swiper.min.js"
        ]);
        $.when(control).done(()=>{
          // Inicializa el array de instancias
          INIT();
        });
      }
      else{
        INIT();
      }
    }
  },

  /**
   *  Contenedor de acciones referente a las tablas clase '.table_big_00' en capa '.cont_table_big_00'
   *
   *  @method Baratz.tmpls_actions.TABLE_BIG_00
   */
  TABLE_BIG_00:function(){

    /**
     *  Flujo inicial de acciones
     */
     const INIT=()=>{
      OPS.modales.ctrl();
      OPS.aplica_oculto();
      EVENTOS.general();
    },
    /**
     *  Contenedor de eventos
     */
    EVENTOS={
      /**
       *  Acciones en general para la tabla
       *
       *  @method EVENTOS.general
       */
      general:()=>{
        // Click en boton collapse para la vista móvil
        $tb_00_btn_collapse.on("click",e=>{
          const $btn=$(e.currentTarget);
          const isExpanded=JSON.parse($btn.attr("aria-expanded"));
          $btn.attr("aria-expanded",!isExpanded);
          OPS.gestiona_expandir($btn,isExpanded);
          return false;
        });

        // Acciones en el resize
        $(window).on("resize",()=>{
          // Eliminacion inmediata de la modal en vista (si la hay)
          const $big_table_00_modal_old=$body.find("#big_table_00_modal");
          if($big_table_00_modal_old.length>0){
            $big_table_00_modal_old.remove();
          }
          if(this.resizeTO_bigTable){
            clearTimeout(this.resizeTO_bigTable);
          }
          // Al finalizar resize, aplica foco en el boton lanzador para proporcionar continuidad a la navegación via teclado
          this.resizeTO_bigTable = setTimeout(()=>{
            const $row_active=$body.find(".row_active");
            if($row_active.length===1){
              const $btn_modal_old=$row_active.find(".btn_big_table_00--despliegue_modal");
              $btn_modal_old.removeClass("active").closest(".cont_data").removeClass("row_active");
              if(Baratz.tmpls_actions.UTILS.isInViewport($btn_modal_old)){
                $btn_modal_old.focus();
              }
            }
          },500);
        });
      },
      /**
       *  Acciones para el boton que muestra una modal con el resto de columnas de la fila en la vista desktop
       *
       *  @method EVENTOS.btn_modal
       *
       *  @param {dom object} $btn: Botón afectado
       */
      btn_modal:$btn=>{
        // Async para espera de animación de cierre de posible modal abierta
        $btn.on("click",async(e)=>{
          const $btn_initial=$(e.currentTarget);
          const isActive=$btn_initial.hasClass("active");
          if(!isActive){
            // puede ser que la modal esté ya abierta con los datos de otra fila
            const $row_active=$body.find(".row_active");
            if($row_active.length===1){
              const $big_table_00_modal_old=$body.find("#big_table_00_modal");
              const $btn_modal_old=$row_active.find(".btn_big_table_00--despliegue_modal");
              // lanza asincronía para evitar efectos indeseados en la vista
              await OPS.modales.destroy($btn_modal_old,$big_table_00_modal_old);
            }
            $btn_initial.addClass("active");
            OPS.modales.pinta($btn_initial);
          }
          else{
            $btn_initial.removeClass("active");
            const $big_table_00_modal=$body.find("#big_table_00_modal");
            OPS.modales.destroy($btn_initial,$big_table_00_modal);
          }
          return false;
        });
      }
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={
      /**
       *  Contenedor de acciones para el control de la vista de campos en modal
       *
       *  @cont OPS.modales
       *
       */
      modales:{
        /**
         *  Operaciones iniciales para el control de las modales
         *
         *  @method OPS.modales.ctrl
         *
         *  @details
         *    • En .table_big_00 se deben aportar los atributos:
         *      - data-btn_in_modal: Marca en que columna debe de aparecer el botón para desplegar la modal de resto de columnas, por clase
         *      - data-view_in_modal: Para señalar, por clase ó id, las columnas a pintar en la modal interna con el pintado del resto de columnas,
         *        con marca de id ó clase, y separados por caracter ','
         *
         *    • Las columnas apareceran ocultas en la vista desktop y sólo serán visibles en la vista móvil y en la vista desktop en la modal
         */
        ctrl:()=>{
          const $btn_in_modal=$body.find("[data-btn_in_modal]");
          if($btn_in_modal.length>0){
            $table_big_00.each((i,e)=>{
              const $table=$(e);
              const data_btn_in_modal=$table.attr("data-btn_in_modal");
              const data_view_in_modal=$table.attr("data-view_in_modal");
              if(typeof(data_btn_in_modal)!=="undefined"){
                const $tb_00_data=$table.find(".tb_00_data");
                const $col_btn=$tb_00_data.find(data_btn_in_modal);
                if($col_btn.length==0){
                  consoleScript.log("[scripts.new.js] TABLE_BIG_00->OPs.ctrl_modales No existen la columna definida para insertar el boton de modal ",data_btn_in_modal);
                  return;
                }
                const btn=`<button type="button" class="btn_despliegue btn_big_table_00--despliegue_modal btn btn-sm btn-primary desktop" title="${Baratz.i18n_js.table_big_00.ops_modales_ctrl_btn_despliegue_aria_label}" aria-label="${Baratz.i18n_js.table_big_00.ops_modales_ctrl_btn_despliegue_aria_label}" data-title_modal="${Baratz.i18n_js.table_big_00.ops_modales_title_modal}">
                  <span class="icono fas fa-plus"></span>
                </button>`;
                $col_btn.each((i,e)=>{
                  const $celda=$(e);
                  if($celda.length>0){
                    const $data=$celda.addClass("cont_btn_modal").find(".data");
                    const texto=$data.html();
                    const $texto=$('<span/>',{"class":"data_texto"}).html(texto);
                    $data.html($texto);
                    $data.append(btn);
                    const $btn=$celda.find(".btn_big_table_00--despliegue_modal");
                    if(typeof(data_view_in_modal)!=="undefined"){
                      $btn.attr("data-btn_campos",data_view_in_modal);
                      const cols_modal=data_view_in_modal.split(",");
                      cols_modal.forEach((e,i)=>{
                        const $col_modal=$table.find(e);
                        if($col_modal.length>0){
                          $col_modal.addClass("tb_00_in_modal");
                        }
                        else{
                          consoleScript.log(`[scripts.new.js] TABLE_BIG_00->OPs.ctrl_modales la columna ${e} definida en el attr data-view_in_modal no existe: `,$col_modal);
                        }
                      });
                      EVENTOS.btn_modal($btn);
                    }
                    else{
                      consoleScript.log("[scripts.new.js] TABLE_BIG_00->OPs.ctrl_modales No existen campos definidos para modal en el attr data-view_in_modal ",$table);
                    }
                  }
                  else{
                     consoleScript.log("[scripts.new.js] TABLE_BIG_00->OPs.ctrl_modales La columna definida en el attr data-btn_in_modal para la insercion del boton de modal no existe ",$celda);
                  }
                });
              }
            });
          }
        },

        /**
         *  Pinta una modal en el body como accion del boton clickado
         *
         *  @method OPS.modales.pinta
         *
         *  @param {dom object} $btn_initial  : botón afectado
         */
        pinta:$btn_initial=>{
          let $modal=$body.find("#big_table_00_modal");
          $btn_initial.closest(".cont_data").addClass("row_active");
          const $tb_00_data_in=$btn_initial.closest(".tb_00_data");
          const title_modal=$btn_initial.attr("data-title_modal");
          if($modal.length===0){
            const modal=`<div id="big_table_00_modal" class="big_table_00_modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-modal="true" aria-hidden="true">
                <div class="modal-content" role="document">
                  <div class="modal-body">
                    <div class="cont_header">
                      <h3 id="modalTitle" class="sr-only">${title_modal}</h3>
                      <div class="cont_button">
                        <button type="button" class="btn_close close" tabindex="0" data-dismiss="modal" title="${Baratz.i18n_js.table_big_00.ops_modales_pinta_btn_close_aria_label}" aria-label="${Baratz.i18n_js.table_big_00.ops_modales_pinta_btn_close_aria_label}">
                          <span class="icono" aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                    <ul class="modal_list d-flex col-md-12 m-0 p-0">\
                    </ul>
                  </div>
                </div>
            </div>`;
            $body.append(modal);
            $modal=$body.find("#big_table_00_modal");
          }
          const $datos=$tb_00_data_in.find(".tb_00_in_modal").clone();
          $modal.find(".modal_list").html($datos);
          $modal.find(".tb_00_in_modal").removeClass("tb_00_in_modal capa_dependiente display_none").find(".mobile").removeClass("mobile");
          // posición del botón en pantalla
          const btn_coords=$btn_initial.offset();
          const btn_initial_height=parseInt($btn_initial.outerHeight(),10)+5;
          // height de la celda
          //var celda_height=parseInt($btn_initial.closest(".type_data").outerHeight(),10);
          // posicion inicial de la tabla en pantalla
          const $cont_table_big_00=$btn_initial.closest(".cont_table_big_00");
          const tbl_coords=$cont_table_big_00.offset();
          const tbl_width=$cont_table_big_00.width();
          $modal.css({
            "top"       : parseInt(btn_coords.top,10)+btn_initial_height+'px',
            "left"      : tbl_coords.left,
            "max-width" : tbl_width
            }).animate({"opacity":"1"},"slow",function(){
              OPS.modales.events($btn_initial,$modal);
              $modal.attr("aria-hidden","false");
              $modal.find(".btn_close").focus();
          });
        },
        /**
         *  Destruye la modal creada al efecto
         *
         *  @method OPS.modales.destroy
         *
         *  @param {dom object} $btn_initial  : botón afectado
         *  @param {dom object} $modal: modal creada previamente
         */
        destroy:($btn_initial,$modal)=>{
          let retorno=new Promise((resolve,reject)=>{
            $modal.animate({"opacity":"0"},"fast",function(){
              $(this).remove();
              $btn_initial.removeClass("active").closest(".cont_data").removeClass("row_active");
              if(Baratz.tmpls_actions.UTILS.isInViewport($btn_initial)){
                $btn_initial.focus();
              }
              resolve(true);
            });
          });
          return retorno;
        },
        /**
         *  Eventos sobre la modal
         *
         *  @method OPS.modales.events
         *
         *  @param {dom object} $btn_initial  : botón afectado
         *  @param {dom object} $modal: modal creada previamente
         */
        events:($btn_initial,$modal)=>{
          // boton cerrar
          const $btn_close=$modal.find(".btn_close");
          $btn_close.on("click",()=>{
            OPS.modales.destroy($btn_initial,$modal);
          });

          // eventos en ventana
          $modal.on({
            "keydown":e=>{
              // ESCAPE
              if (e.keyCode === 27) {
                OPS.modales.destroy($btn_initial,$modal);
              }
              // Check for TAB key press
              if (e.keyCode === 9) {
                $btn_close.focus();
                return false;
              }
            }
          });
        }
      },

      /**
       *  Gestiona el dibujo de los elementos dependientes para la vista móvil
       *
       *  @method OPS.gestiona_expandir
       *
       *  @param {dom object} $btn: botón afectado
       *  @param {bool} isExpanded: variable si está o no activo
       */
      gestiona_expandir:($btn,isExpanded)=>{
        const $tb_00_data=$btn.closest(".tb_00_data");
        const $icono=$btn.find(".icono");
        const target=$btn.attr("data-target");
        const $targets=$tb_00_data.find(target);
        $targets.toggleClass("display_none");
        if(isExpanded){
          $icono.removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        else{
          $icono.removeClass("fa-angle-down").addClass("fa-angle-up");
        }
      },
      /**
       *  Oculta las capas dependientes para la vista movil
       *
       *  @method OPS.aplica_oculto
       */
      aplica_oculto:()=>{
        $tb_00_btn_collapse.each((i,e)=>{
          const $btn=$(e);
          const $tb_00_data=$btn.closest(".tb_00_data");
          const target=$btn.attr("data-target");
          $tb_00_data.find(target).addClass("display_none capa_dependiente");
        });
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $cont_table_big_00=$body.find(".cont_table_big_00");
    const $table_big_00=$cont_table_big_00.find(".table_big_00");
    const $tb_00_data=$table_big_00.find(".tb_00_data");
    const $tb_00_btn_collapse=$tb_00_data.find(".tb_00_btn_collapse");
    if($table_big_00.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.TABLE_BIG_00()");
      INIT();
    }
  },

  /**
   *  Contenedor de acciones referentes a la vista de filtros (facetas) en la vista de lista de resultados
   *
   *  @method Baratz.tmpls_actions.BTNS_EXPAND_FACETS
   */
  BTNS_EXPAND_FACETS:function(){
    /**
     *  Flujo inicial de acciones
     */
    const INIT=()=>{
      OPS.initialize();
    },
    /**
     *  Asociacion de acciones sobre los eventos
     *
     *  @method EVENTOS
     *
     *  @param {dom object} $btns: Botones afectados
     */
    EVENTOS=$btns=>{
      $btns.on("click",(event)=>{
        const $btn=$(event.currentTarget);
        OPS.actions($btn);
        return false;
      });
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Inicializacion de la vista de botonera
       *
       *  @method OPS.initialize
       */
      initialize:()=>{
        // recorre los bloques de facetas
        $conts_filters.each((i,e)=>{
          const $blq=$body.find(e);
          const $display_none=$blq.find("li.display_none");
          // recupera el num de elementos a pintar
          const $controls=$blq.find(".cont_facets_controls");
          let steps=parseInt($controls.attr("data-steps"),10)-1;
          if(!steps){
            steps=4;
          }
          // pinta el num de lineas (primeras) definido en los steps
          for(let i=0;i<=steps;i++){
            const $el=$display_none.eq(i);
            if($el.length>0){
              $el.removeClass("display_none");
            }
          }
          // aplica eventos sobre los botones
          const $btns=$controls.find("button");
          EVENTOS($btns);
        });
      },
      /**
       *  Establece las acciones sobre los botones segun su data-action
       *
       *  @method OPS.actions
       *
       *  @param {dom object} $btn  : botón afectado
       *
       */
      actions:$btn=>{
        const action                = $btn.attr("data-action");
        const $cont_facets_controls = $btn.closest(".cont_facets_controls");
        const steps                 = parseInt($cont_facets_controls.attr("data-steps"),10);
        const $cont_filters_with_buttons=$cont_facets_controls.closest(".cont_filters_with_buttons");
        const $ul=$cont_filters_with_buttons.find("ul");
        //var $li=$ul.find("li");
        //var size=$li.length;
        switch(action){
          // boton ver mas
          case "more":{
            // muestra el siguiente grupo de elementos
            const $li_a_mostrar=$ul.find("li.display_none");
            const $li_focus=$li_a_mostrar.eq(0).find(".btn");
            for(let i=0;i<steps;i++){
              const $li_afectado=$li_a_mostrar.eq(i);
              $li_afectado.css("opacity","0").removeClass("display_none").addClass("marcacion");
              setTimeout(()=>{
                $li_afectado.animate({"opacity":"1"},"slow",()=>{
                  $li_afectado.removeClass("marcacion").removeAttr("style");
                });
              },200*i);
            }
            // foco en el primer elemento del grupo mostrado
            $li_focus.focus();
            // una vez mostrado el siguiente grupo, muestra el boton 'ver menos'
            $cont_facets_controls.find(".btn.minus").removeClass("display_none");
            // Si el grupo es el final, se oculta el boton 'ver mas'
            const $li_restan=$ul.find("li.display_none");
            const size_restan=$li_restan.length;
            if(size_restan==0){
              $cont_facets_controls.find(".btn.more").addClass("display_none");
            }
          }
          break;
          // boton ver menos
          case"minus":{
            // oculta el grupo de elementos
            const $li_a_ocultar=$ul.find("li:not(.display_none)");
            const li_length=$li_a_ocultar.length;
            const resto=li_length%steps;
            let pos=li_length-steps;
            if(resto>0){
              pos=li_length-resto;
            }
            for(let i=0;i<steps;i++){
              $li_a_ocultar.eq(pos+i).addClass("display_none");
            }
            // una vez oculto, comprueba que es el primer grupo y oculta el boton 'ver menos'
            const $li_mostrados=$ul.find("li:not(.display_none)");
            const size_li_mostrados=$li_mostrados.length;
            if(size_li_mostrados<=steps){
              $cont_facets_controls.find(".btn.minus").addClass("display_none");
            }
            // foco en el ultimo elemento del grupo
            $li_mostrados.eq(size_li_mostrados-1).find(".btn").focus();
            // Si hay elementos que mostrar se pinta el boton 'ver mas'
            const $li_ocultos=$ul.find("li.display_none");
            const size_li_ocultos=$li_ocultos.length;
            if(size_li_ocultos>0){
               $cont_facets_controls.find(".btn.more").removeClass("display_none");
            }
          }
          break;
          default:
        }
      },
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $conts_filters=$body.find(".cont_filters_with_buttons");
    if($conts_filters.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.BTNS_EXPAND_FACETS()");
      INIT();
    }
  },

  /**
   *  Muestra una capa de mensaje al actuar sobre un elemento clickable con .btn_message_js, para informar de la acción realizada
   *
   *  @method Baratz.tmpls_actions.BTN_MESSAGE
   *
   *  @details en el botón deben de constar los attr data-message_no_activo y data-message_activo, que reflejan mensajes sobre el estado del botón
   *     - Para botones con attr data-btn_action =  record_save:
   *       Se opera sobre los mensajes en campos data para alterar los title y aria label y presentar los mensajes de estado adecuados
   *     - El botón puede estar en el cuerpo de la página ó por ejemplo en la modal 'ULTIMAS BUSQUEDAS' del header
   */
  BTN_MESSAGE:function(){

    const INIT=async()=>{
      // Hace falta asociar acciones sobre los eventos en el dropdown del menu header en la opción últimas búsquedas
      const $dropdown_menu=$body.find(".cont_btn_historico .dropdown-menu");
      if($dropdown_menu.length==1){
        EVENTOS.dropdown($dropdown_menu);
      }
      await OPS.initialize_buttons();
      EVENTOS.btns();
    },
    /**
     *  Asociacion de acciones sobre los eventos
     *
     *  @method EVENTOS
     *
     *  @details
     *    - FAVORITOS: .btn_favorite se gestiona desde [commons.js] -> Baratz.commons.favorites.manager()
     *    - GUARDAR BÚSQUEDA / BORRAR BÚSQUEDA GUARDADA: .btn_record se gestiona desde [commons.js] -> Baratz.commons.record()
     */
    EVENTOS={
      /**
       *  Eventos sobre los botones con mensajes múltiples
       *
       *  @method EVENTOS.btns
       */
      btns:()=>{
        $btns_con_message.on("click",async (e)=>{
          e.stopPropagation();
          const $btn=$(e.currentTarget);
          const action=$btn.attr("data-btn_action");
          switch(action){
            // Botones 'Guardar búsqueda' (Tanto en header->últimas búsquedas como en la vista lista de últimas búsquedas)
            case"record_save":{
              await Baratz.commons.record.manager($btn);
            }
            break;
            // En Búsquedas guardadas, boton Eliminar
            case"record_remove":{
              Baratz.commons.record.actionURL($btn,false);
              // Elimina la linea del pintado en la lista de 'Búsquedas guardadas'
              $btn.closest("li").stop(true).animate({"opacity":0},"slow",function(){
                $(this).remove();
              });
            }
            break;
            // Botones 'Favoritos'
            case "favorite_toggle":{
              Baratz.commons.favorites.manager($btn);
            }
            break;
            case "favorite_remove":{
              Baratz.commons.favorites.actionURL($btn,false);
            }
            break;
            // Botones 'Recomendar'
            case "recommended_toggle":{
              const btn_recommended_type=$btn.attr("data-btn_recommended_type");
              // si no se usa modal (recomendado en un unico nivel)
              if(btn_recommended_type==="recommended_one_level"){
                Baratz.manager_recomended.recommend.one_level($btn);
              }
              // si se usa modal (recomendados en multinivel), se establecen eventos en las modales
            }
            break;
            default:
          }
          return false;
        });
      },
      /**
       *  Eventos sobre el dropdown de la opción últimas búsquedas del menu header
       *
       *  @method EVENTOS.dropdown
       *
       *  @param {dom object} $dropdown_menu: Dropdown afectado (Últimas búsquedas en el menu header)
       */
      dropdown:($dropdown_menu)=>{
        // Previene el cierre del dropdown de últimas búsquedas del menu header al pulsar en él
        $dropdown_menu.on("click",function(e){
          e.stopPropagation();
        });
      }
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Inicializa en primera instancia los botones a través del attr data-btn_action si es necesario
       *
       *  @method OPS.initialize_buttons
       *
       *  @return {Fn Promise} retorno
       */
      initialize_buttons:()=>{
        let retorno=new Promise((resolve,reject)=>{
          $btns_con_message.each((i,e)=>{
            const $btn=$(e);
            const btn_action=$btn.attr("data-btn_action");
            //console.log("[scripts.js] Baratz.tmpls_actions.BTN_MESSAGE() OPS.initialize_buttons() btn_action",btn_action);
            const isActive=$btn.hasClass("active");
            switch (btn_action){
              // Favoritos
              case "favorite_toggle":
              // Recomendados
              case"recommended_toggle":
              // Botones 'Guardar búsqueda' (Tanto en header->últimas búsquedas como en la vista lista de últimas búsquedas)
              case"record_save":{
                const isLimiteAlcanzado=$btn.hasClass("btn_limite_alcanzado");
                let message;
                if(!isActive && isLimiteAlcanzado){
                  // no .active limite_alcanzado
                  message=$btn.attr("data-message_limit_warning");
                }
                OPS.message.pinta($btn,message);
              }
              break;
              default:
            }
          });
          resolve();
        });
        return retorno;
      },
      /**
       *  Contenedor de acciones de pintado del mensaje de estado
       *
       *  @cont message
       */
      message:{
        /**
         *  Pinta un mensaje en pantalla en el title
         *
         *  @method OPS.message.pinta
         *
         *  @param {dom object} $btn      : botón afectado
         *  @param {string} message       : mensaje a pintar
         */
        pinta:($btn,message)=>{
          $btn.attr({"title":message,"aria-label":message});
          // Para la pagina de detalle del item, no se cambian los literals
          const isInSummaryActions=($btn.closest(".summary-actions").length===1);
          if(!isInSummaryActions){
            const $btn_label=$btn.find(".btn_title");
            if($btn_label.length>0){
              //$btn_label.text(page_link_text);
              $btn_label.text(message);
            }
          }
        },
      },
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $btns_con_message=$body.find(".btn_message_js");
    if($btns_con_message.length>0){
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.BTN_MESSAGE()");
      INIT();
    }
  },

  /**
   *  Compartir en redes sociales
   *
   *  @method Baratz.tmpls_actions.JSSOCIAL_SHARE
   *
   *  @examples https://sharethis.com
   *    https://sharethis.com/gdpr-compliance-tool/
   */
  JSSOCIAL_SHARE:function(){

    const INIT=()=>{
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.JSSOCIAL_SHARE() INIT");
      // inicializa la opcion facebook segun parámetros sharer
      OPS.initialize.facebook();
      // inicializa la opcion linkedin segun parámetros shareArticle
      OPS.initialize.linkedin();

      // Se muestran las aplicaciones web en dispositivos desktop
      let isDeviceMobile=Baratz.tmpls_actions.UTILS.isMobileDevice();
      //isDeviceMobile=true;
      if(!isDeviceMobile){
        // 2020 Inicializa whatsapp ya que ya entiende la aplicacion, si está instalado en desktop, pero determinamos que no lo está
        // para que pregunte en el popup
        OPS.initialize.whatsapp();
        OPS.initialize.telegram();
      }
      // recorre los items
      $jssocials.each((i,e)=>{
        const $cont_buttons=$(e);
        // para compartir items de listas recuperar url y texto a la lectura del doc para configurar los iconos en cada item
        const configuracion=OPS.configure_jssocials($cont_buttons);
        PLUGINS.configure($cont_buttons,configuracion);
      });
    },
    /**
     *  Contenedor para la aplicación de plugins
     *
     *  @cont PLUGINS
     */
    PLUGINS={
      /**
       *  Aplica el plugin al contenedor proporcionado
       *
       *  @method PLUGINS.configure
       *
       *  @param {dom object} $cont_buttons  : contenedor afectado
       *  @param {object} configuracion  : configuracion del plugin jssocials
       */
      configure:($cont_buttons,configuracion)=>{
        // inicializa el plugin jssocials
        $cont_buttons.jsSocials(configuracion);
      },
    },
    /**
     *  Contenedor de operaciones
     */
    OPS={

      /**
       *  Inserta metas de facebook y twitter en el head
       *
       *  @method OPS.genera_metas
       *
       *  @param {object} data : datos necesarios para el montaje de los metas
       */
      genera_metas_item:data=>{
        // Generamos los metas para Facebook
        // depurador de contenido
        // https://developers.facebook.com/tools/debug/
        const meta_fb=`<meta property="og:url" content="${data.social_share_url}">
        <meta property="og:type" content="article">
        <meta property="og:title" content='${data.social_share_title}' />
        <meta property="og:description" content='${data.social_share_description}' />
        <meta property="og:image" content='${data.social_share_img}'>`;

        // Generamos los metas para Twitter
        // twitter:card - The card type, which will be one of “summary”, “summary_large_image”, “app”, or “player”.
        const meta_tw=`<meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:site" content="Opac Discovery">
        <meta property="twitter:creator" content="Baratz">
        <meta property="twitter:title" content='${data.social_share_title}'>
        <meta property="twitter:description" content='${data.social_share_description}'>
        <meta property="twitter:image:src" content='${data.social_share_img}'>`;

        const metas=meta_fb+meta_tw;

        $("head").find('title').after(metas);
      },

      /**
       *  Contenedor de inicializaciones
       *
       *  @cont OPS.initialize
       */
      initialize:{
        /**
         *  Inicializa el control de whatsapp en aplicacion web
         *
         *  @method OPS.initialize.whatsapp
         */
        whatsapp:()=>{
          // inicial jssocials shareUrl: "whatsapp://send?text={url} {text}"
          // No siendo un dispositivo movil, se lanza la app web
          // https://api.whatsapp.com/send?
          jsSocials.shares.whatsapp.shareUrl="https://api.whatsapp.com/send?text={url} {text}";
          jsSocials.shares.whatsapp.shareIn="popup";
        },

        /**
         *  Inicializa el control de telegram en aplicacion web
         *
         *  @method OPs.initialize.telegram
         *
         */
        telegram:()=>{
          // inicial jssocials shareUrl: "tg://msg?text={url} {text}"
          // No siendo un dispositivo movil, se lanza la app web
          jsSocials.shares.telegram.shareUrl="https://t.me/share/url?url={url}&text={text}";
          jsSocials.shares.telegram.shareIn="popup";
        },

        /**
         *  Configuracion general para facebook en jssocials
         *
         *  @method OPs.initialize.facebook
         *
         *  @details https://developers.facebook.com/docs/sharing/best-practices
         *    https://developers.facebook.com/docs/sharing/webmasters/faq
         *    https://developers.facebook.com/docs/sharing/webmasters/getting-started/basic-link
         *    https://developers.facebook.com/docs/sharing/webmasters#markup
         */
        facebook:()=>{
          // inicial jssocials shareUrl: "https://facebook.com/sharer/sharer.php?u={url}"
          // puede ser "https://www.facebook.com/sharer/sharer.php?u={url}&t={text}"
          jsSocials.shares.facebook.shareUrl="https://www.facebook.com/sharer/sharer.php?t={text}&u={url}";
        },

        /**
         *  Configuracion general para linkedin en jssocials
         *
         *  @method OPs.initialize.linkedin
         */
        linkedin:()=>{
          // inicial jssocials shareUrl: "https://www.linkedin.com/shareArticle?mini=true&url={url}"
          jsSocials.shares.linkedin.shareUrl="https://www.linkedin.com/shareArticle?mini=true&url={url}&t={text}";
        },

      },

      /**
       *  Devuelve la configuracion de jssocials
       *
       *  @method OPS.configure_jssocials
       *
       *  @param {dom object} $cont_buttons  : contenedor jssocials
       *
       *  @return {object} retorno : datos de configuración para el plugin
       *
       *  @details  http://js-socials.com/
       */
      configure_jssocials:$cont_buttons=>{
        // Recupera los data para generar las opciones del plugin
        // <div id="shareIcons_00" class="jssocials" data-social_share_type="item_detail" data-social_share_title="" data-social_share_description="" data-social_share_img=""></div>
        const data=$cont_buttons.data();
        data.social_share_url=window.location.href;
        // Discrimina a traves del data-social_share_type para efectuar operaciones necesarias al item
        switch (data.social_share_type){
          // Si es la vista de detalle del item
          case "item_detail":{
            // metas facebook y twitter (eliminar si se realiza esta accion desde tymeleaf)
            OPS.genera_metas_item(data);
          }
          break;
          default:
        }
        const jssocial_lit=Baratz.i18n_js.jssocials;
        const retorno={
          url       : data.social_share_url,    // String
          text      : data.social_share_title,  // String
          showLabel : false,                    // true|false | function(screenWidth)
          showCount : false,                    // true|false|"inside" | function(screenWidth)
          shareIn   : "popup",                  // "blank"|"popup"|"self"
          shares    : //["twitter", "facebook","linkedin", "whatsapp", "telegram", "pocket"],
          [
            {
              share:"twitter",
              title:jssocial_lit.twitter.title,
              aria:jssocial_lit.twitter.aria
            },
            {
              share:"facebook",
              title:jssocial_lit.facebook.title,
              aria:jssocial_lit.facebook.aria
            },
            {
              share:"linkedin",
              title:jssocial_lit.linkedin.title,
              aria:jssocial_lit.linkedin.aria
            },
            {
              share:"whatsapp",
              title:jssocial_lit.whatsapp.title,
              aria:jssocial_lit.whatsapp.aria
            },
            {
              share:"telegram",
              title:jssocial_lit.telegram.title,
              aria:jssocial_lit.telegram.aria
            },
            {
              share:"pocket",
              title:jssocial_lit.pocket.title,
              aria:jssocial_lit.pocket.aria
            },
          ],
          on : {
            click      : e=>{
              // var $btn=$(e.currentTarget);
              // var red=this.share;
            },
            mouseenter : e=>{},
            mouseleave : e=>{}
          }
        };
        return retorno;
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $jssocials=$body.find(".jssocials");
    if($jssocials.length>0){
      if(typeof(jsSocials)=="undefined"){
        const listOfCSS=[
          "plugins/jssocials/jssocials.css",
          "plugins/jssocials/jssocials-theme-plain.css",
        ];
        Baratz.tmpls_actions.UTILS.requiredCSS(listOfCSS);
        const listOfJS=[
          "plugins/jssocials/jssocials.js",
        ];
        const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
        $.when(control).done(()=>{
          INIT();
        });
      }
      else{
        INIT();
      }
    }
  },

  /**
   *  Inserta el documento un menu accesible para el acceso directo a los contenidos y en las capas un boton para salto de su propio contenido
   *
   *  @method Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT
   *
   *  @details
   *    - El lanzamiento del plugin se realiza en el js init correspondiente a la vista.
   *    - Se lee el body para determinar si existen componentes donde insertar los botones de salto y
   *      crear el menu de botones de los anchors a través del attr data-skip_content
   *        • data-skip_content="...id de siguiente contenido", donde "id de siguiente contenido" realiza desplazamiento a la capa con id dado
   *        • si data-skip_content="false" no se produce desplazamiento hacia siguiente contenido y
   *          sí al anterior. Si aparece anchor en la lista de accesos directos.
   *    - Los botones de desplazamiento a siguiente / anterior contenido se insertan en la capa lanzadora y
   *      apunta al id proporcionado (si está data-skip_content="false" no se pinta botón siguiente)
   *    - El plugin busca los titulos con clase stc_title para su inclusión en el menu de acceso directo a enlaces.
   *    - La clase anchor_title se usa para iluminar en active el titulo del contenido al finalizar el desplazamiento.
   *    - El foco del desplazamiento desde boton se asocia en el boton de desplazamiento del contenido apuntado
   *    - Se crea un lista de enlaces anchor para acceder a ellos directamente
   *    - La navegacion de teclado a traves de la lista funciona de la siguiente manera:
   *        • Se entra pulsando sobre el icono o <return> en el foco del icono
   *        • <Tab> entre los enlaces hacia adelante en circulo hasta el boton de apertura del menu
   *        • <Shif+Tab> entre enlaces hacia atrás y se queda como último elemento en el botón de apertura del menu
   *        • <Esc> cierra el menu y coloca el foco donde estuviese antes de abrir el menu
   *    - Debido a la inserción de componentes desde back, que pueden o no aparecer, revisar en los js init la inclusión de attr data-skip_content,
   *      los títulos con clase stc_title y clase anchor_title (que proporciona iluminación del titulo en active)
   */
  // habilita la vista y uso del plugin en general, si se desea discriminación, usar en el js init de la vista
  // cambiar este valor general si se desea o no incluir la navegacion de anchors
  ACCESIBLE_SKIP_TO_CONTENT_active:Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active || false,

  ACCESIBLE_SKIP_TO_CONTENT:function(){

    const INIT=async()=>{
      let lista_anchors=TMPL.crea_lista();
      if(lista_anchors.length>0){
        await TMPL.crea_menu(lista_anchors);
        // Global
        $stc_menu_anchors=$main.find(".stc_menu_anchors");
        // inicia position del menu
        OPS.menu.affix($stc_menu_anchors);
        // aplica acciones en los eventos de los botones
        const $btns_stc=$body.find(".btn_stc_menu_anchor,.btn_stc_anchor");
        EVENTOS($btns_stc,lista_anchors);
      }
    },
    /**
     *  Aplicación de acciones sobre los eventos
     *
     *  @method EVENTOS
     *
     *  @param {dom object} $btns: Botones afectados
     *  @param {object} lista_anchors: Array de datos sobre los anchors
     *
     */
    EVENTOS=($btns,lista_anchors)=>{

      // al click en los botones anchor
      $btns.on("click",evt=>{
        const $btn=$(evt.currentTarget);
        const href=$btn.attr("href");
        const $capa=$body.find(href);
        // si es un boton de la lista de menu de anclas, cierra el menu
        if($btn.hasClass("btn_stc_menu_anchor")){
          OPS.menu.control();
        }
        // fn asíncrona, lanza scroll
        Baratz.tmpls_actions.UTILS.scroll_anchor($capa);
        return false;
      });

      // click en boton de accion de menu (open/close)
      $stc_menu_anchors.find(".stc_menu_btn").on("click",evt=>{
        const $btn=$(evt.currentTarget);
        OPS.menu.control($btn);
      });

      // Posiciona menu con respecto al header y scroll
      $(window).on({
        // Al scroll fija menu
        "scroll": ()=>{
          OPS.menu.affix($stc_menu_anchors);
        }
      });

      $stc_menu_anchors.on({
        // Al salir el foco del menu
        "focusout":evt=>{
          const $stc_menu_anchors=$(evt.currentTarget);
          setTimeout(()=>{
            if (!$stc_menu_anchors.find(':focus').length) {
              const isOpen=($stc_menu_anchors.attr("data-stc_menu_open")=="true");
              if(isOpen){
                $stc_menu_anchors.find(".stc_menu_btn").focus();
              }
            }
          }, 0);
        },
        // Al evento propio aplica foco en elemento enfocable guardado previamente
        "stc_menu_close":()=>{
          if(typeof(window.prevFocus)!=="undefined" && window.prevFocus!==null){
            $(window.prevFocus).focus();
          }
        }
      });

      $(document).on({
         // Al pulsar esc cierra menu
        "keydown":evt=>{
          // esc cierra el menu
          const isEscape=OPS.isEscape(evt);
          if (isEscape) {
            const isOpen=($stc_menu_anchors.attr("data-stc_menu_open")=="true");
            if(isOpen){
              OPS.menu.control();
            }
          }
        },
        // guarda el elemento previo en foco para su posible uso
        'focusin':()=>{
          const $activeElement= $(document.activeElement);
          if(!$activeElement.hasClass("stc_menu_btn") && !$activeElement.hasClass("btn_stc_menu_anchor")){
            window.prevFocus = document.activeElement;
          }
        }
      });

      // Determina en todos las capas anchor si se pulsa escape con el foco dentro
      lista_anchors.forEach((e,i)=>{
        const $field=e.$el;
        $field.on("keydown",evt=>{
          // esc pone el foco en el primer botón de navegacion interna, para poder navegar via foco
          const isEscape=OPS.isEscape(evt);
          if (isEscape) {
            const $btn_nav_li=$field.find(".stc_lst li:first-child .btn");
            $btn_nav_li.focus();
          }
        });
      });
    },

    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Aportando un evento, determina si es ó no la tecla escape
       *
       *  @method OPS.isEscape
       *
       *  @param {object} evt  : Evento a chequear
       *
       *  @return {bool} isEscape : Si es o no la tecla escape
       */
       isEscape:evt=>{
        evt = evt || window.event;
        let isEscape = false;
        if ("key" in evt) {
          isEscape = (evt.key === "Escape" || evt.key === "Esc");
        }
        else {
          isEscape = (evt.keyCode === 27);
        }
        return isEscape;
      },

      /**
       *  Acciones sobre el menú
       *
       *  @cont menu
       */
      menu:{
        /**
         *  Aplica position al menu
         *
         *  @method OPS.menu.affix
         *
         *  @param {dom object} $stc_menu_anchors  : Menu
         *
         *  @details Tiene en cuenta el alto del header, si lo sobrepasa el scroll, se aplica fixed
         */
        affix:$stc_menu_anchors=>{
          const h_$header = $(document.body).find("header").outerHeight();
          if (window.pageYOffset >= h_$header) {
            $stc_menu_anchors.addClass("affix").css("top",0);
          }
          else {
            $stc_menu_anchors.removeClass("affix").css("top",h_$header-window.pageYOffset);
          }
        },

        /**
         *  Controla el pliegue / despliegue del menu
         *
         *  @method OPS.menu.control
         *
         *  @param {object dom} $btn  : Botón del menu para desencadenar la acción
         */
         control:($btn=$stc_menu_anchors.find(".stc_menu_btn"))=>{
          //const w_$btn=$btn.outerWidth();
          const w_stc_menu_anchors=$stc_menu_anchors.outerWidth(true);
          const isActive=$btn.hasClass("active");
          const $stc_menu_anchors_list=$stc_menu_anchors.find(".stc_menu_anchors_list");
          if(!isActive){
            $stc_menu_anchors_list.css("visibility","visible");
            $stc_menu_anchors.stop().animate({"left":0},'slow',function(){
              $btn.addClass("active").attr("aria-expanded","true");
              $stc_menu_anchors.attr("data-stc_menu_open","true");
            });
          }
          else{
            $stc_menu_anchors.stop().animate({"left":"-"+(w_stc_menu_anchors)},'slow',function(){
              $btn.removeClass("active").attr("aria-expanded","false");
              $stc_menu_anchors.attr("data-stc_menu_open","false").trigger("stc_menu_close");
              $stc_menu_anchors_list.css("visibility","hidden");
            });
          }
        },

      },

    },
    TMPL={
      /**
       *  Crea la lista de datos necesarios para crear los botones de ancla
       *
       *  @method TMPL.crea_lista
       *
       *  @return {object array} retorno : array de objetos con los datos necesarios
       */
       crea_lista:()=>{
        let retorno=[];
        $skip_to_content.each((i,e)=>{
          let item={};
          const $el=$(e);
          const ancla=$el.attr("id");
          const title=$el.find(".stc_title").eq(0).text();
          item.$el=$el;
          item.anchor="#"+ancla;
          item.title=title;
          const skip_to_content=$el.attr("data-skip_to_content");
          if(skip_to_content=="false"){
            item.skip_to_content=false;
            item.title_skip_to_content=null;
          }
          else{
            const $skip=$body.find("#"+skip_to_content);
            if($skip.length==1){
              const title_skip_to_content=$skip.find(".stc_title").eq(0).text();
              item.skip_to_content="#"+skip_to_content;
              item.title_skip_to_content=title_skip_to_content;
            }
          }
          retorno.push(item);
        });
        return retorno;
      },

      /**
       *  Crea los elementos de lista de anchors para el menu de navegacion de anchors y
       *  pinta en cada item los botones necesarios de navegacion entre items (retroceder/avanzar)
       *
       *  @method TMPL.crea_menu
       *
       *  @param {array} lista_anchors : Array con la lista de anclas
       *
       *  @return {string} lista_menu : html de los elementos de lista para la creacion del menu de anchors
       */
       crea_menu:lista_anchors=>{
        let retorno=new Promise((resolve,reject)=>{
          let lista_menu="";
          lista_anchors.forEach((e,i)=>{
            // menu de anclas
            const hay_Anchor=($body.find(e.anchor).length==1);
            if(hay_Anchor){
              const btn_anchor_menu=`<li><a href="${e.anchor}" class="btn btn_stc_menu_anchor" title="Acceder a ${e.title}" aria-label="Acceder a ${e.title}">${e.title}</a></li>`;
              lista_menu+=btn_anchor_menu;
            }
            // botonera salto de contenido
            const $stc_nav=$(`<nav class="stc_nav" aria-labelledby="stc_nav_title_${i}"/>`);
            $(`<h3 id="stc_nav_title_${i}" class="sr-only">${Baratz.i18n_js.stc.botonera_salto_de_contenido} ${e.title}</h3>`).appendTo($stc_nav);
            const $stc_lst=$('<ul class="stc_lst">').appendTo($stc_nav);
            e.$el.find(".stc_title").eq(0).after($stc_nav);
            // botón de salto a contenido anterior
            if(i>0){
              const previo=lista_anchors[i-1];
              // @TODO Literales mal, hay que incluirlo en el idioma js, sería: 'Retroceder a' en vez de 'Retroceder a {0}'
              $(`<li><a href="${previo.anchor}" class="btn btn-white btn-link btn_stc_anchor btn_stc_previo" title="${Baratz.i18n_js.stc.btn_stc_previo_title} ${previo.title}" aria-label="${Baratz.i18n_js.stc.btn_stc_previo_title} ${previo.title}"><span aria-hidden="true" class="icono far fa-share"></span></a></li>`).appendTo($stc_lst);
            }
            // botón de salto a contenido posterior
            if(e.skip_to_content && i<lista_anchors.length-1){
              // @TODO Literales mal, hay que incluirlo en el idioma js, sería: 'Avanzar a' en vez de 'Avanzar a {0}'
              $(`<li><a href="${e.skip_to_content}" class="btn btn-white btn-link btn_stc_anchor btn_stc_posterior" title="${Baratz.i18n_js.stc.btn_stc_avanzar_title} ${e.title}" aria-label="${Baratz.i18n_js.stc.btn_stc_avanzar_title} ${e.title}"><span aria-hidden="true" class="icono far fa-share"></span></a></li>`).appendTo($stc_lst);
            }
          });
          let stc_menu_anchors_id="stc_menu_anchors";
          const menu_anchors=`<nav id="${stc_menu_anchors_id}" class="${stc_menu_anchors_id}" data-stc_menu_open="true" aria-labelledby="stc_menu_anchors_title">
            <h2 id="stc_menu_anchors_title" class="stc_menu_anchors_title">
              <span aria-hidden="true" class="icono fas fa-anchor"></span>${Baratz.i18n_js.stc.menu_title}
            </h2>
            <button class="btn btn-white stc_menu_btn active" aria-label="${Baratz.i18n_js.stc.btn_menu_label}" title="${Baratz.i18n_js.stc.btn_menu_label}" aria-haspopup="true" aria-controls="stc_menu_anchors" aria-expanded="true">
              <span class="icono fas fa-bars"></span>
            </button>
            <ul class="stc_menu_anchors_list">
              ${lista_menu}
            </ul>
          </nav>`;
          $main.prepend(menu_anchors);
          // Aplica el anchor al boton de salto de contenido del Menu general en el header hacia el menu de navegación interna
          $body.find("#item_anchor_content").attr({"href":`#${stc_menu_anchors_id}`}).parent().removeAttr("aria-hidden tabindex").removeClass("d-none");
          resolve();
        });
        return retorno;
      },

    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $main=$body.find("main");
    const $skip_to_content=$body.find('[data-skip_to_content]');
    let $stc_menu_anchors;
consoleScript.log("[scripts.new.js] Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active",Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active);
    if($skip_to_content.length>0 && Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT()");
      INIT();
    }

  },

  /**
   *  Aplica sortable.js a un contenedor dado ó busca en el body contenedores de la clase .cmp_sortable para aplicarlo
   *  El contenedor padre debe de tener un input[type="hidden"] para guardar los valores
   *
   *  @method Baratz.tmpls_actions.CMP_SORTABLE
   *
   *  @param [opt] {dom object} $cmp_sortable: contenedor/es .cmp_sortable que opcionalmente pueden pasarse a esta fn
   *  @param [opt] {bool} disabled: Si true, se aplica el plugin pero disabled
   *
   *  @details https://github.com/SortableJS/sortablejs
   *  • La instancia sobre un contenedor se recupera con var instancia_sortable=Sortable.get($cmp_sortable_list[0]);
   */
  CMP_SORTABLE:function($cmp_sortable,disabled){

    const INIT=()=>{
      // recorre todos los cotenedores .cmp_sortable
      $cmp_sortable.each((i,e)=>{
        const $cont_sortable=$(e).closest(".cont_sortable");
        // pinta los valores en el input hidden
        OPS.changeValues($cont_sortable);
        // aplica eventos sobre el contenedor
        PLUGINS(e);
        EVENTS.init($cont_sortable);
      });
    },
    /**
     *  Contenedor de acciones sobre los eventos
     *
     *  @cont EVENTS
     */
    EVENTS={
      /**
       *  Inicializa los eventos sobre los items en primera instancia
       *
       *  @method EVENTS.init
       *
       *  @param {dom object} $cont_sortable contenedor general
       */
      init:$cont_sortable=>{
        // boton eliminar item en cada uno de los items-min
        const $btn_item_cmp_sortable_remove=$cont_sortable.find(".btn_item_cmp_sortable_remove");
        $btn_item_cmp_sortable_remove.each((i,e)=>{
          const $btn=$(e);
          EVENTS.btnRemoveItem($btn);
        });
        // boton eliminar en form-row
        const $btn_item_cmp_sortable_remove_form_row=$cont_sortable.find(".btn_cmp_sortable_item_form_row--remove_item");
        $btn_item_cmp_sortable_remove_form_row.each((i,e)=>{
          const $btn=$(e);
          EVENTS.btnRemoveItem_formRow($btn);
        });
        ///////////////////////////////////////////////////////////////
        // ITEMS FORM-ROW
        ///////////////////////////////////////////////////////////////
        // boton añadir nuevo item para form-rows
        const $btn_add_new=$cont_sortable.find(".btn-add_new");
        $btn_add_new.on("click",async e=>{
          const $btn=$(e.currentTarget);
          const name_sortable=$cont_sortable.attr("data-name_sortable");
          const sortable_index=$cont_sortable.attr("data-sortable_index");
          // averigua el index del nuevo elemento para formatear la peticion
          let datos_sortable=Baratz[name_sortable].data_sortables[sortable_index];
          datos_sortable.data_sortable.id=datos_sortable.$cmp_sortable_list.find(".cmp_sortable_item_form_row").length;
          datos_sortable=await Baratz[name_sortable].get_clone(datos_sortable);
          EVENTS.btnAddItem_formRow($btn,datos_sortable);
          return false;
        });
        ///////////////////////////////////////////////////////////////
        // ITEMS SIMPLES
        ///////////////////////////////////////////////////////////////
        // boton añadir nuevos items del input
        const $btn_add_item_sortable=$cont_sortable.find(".btn_add_item_sortable");
        // evento añadir nuevos items
        $btn_add_item_sortable.on("click",e=>{
          //var $btn=$(this);
          const $input_entradas=$cont_sortable.find(".input_sortable_add_item");
          const valores=$input_entradas.val().split(",");
          valores.forEach((e,i)=>{
            if(e!==""){
              const existe=TMPL.pintaDuplicado($cont_sortable,e);
              if(!existe){
                TMPL.createNewItem($cont_sortable,e);
              }
            }
          });
          OPS.changeValues($cont_sortable);
          return false;
        });
        // boton elimina contenido del input de entradas
        const $btn_borra_input=$cont_sortable.find(".btn_borra_input");
        $btn_borra_input.on("click",()=>{
          const $input_entradas=$cont_sortable.find(".input_sortable_add_item");
          $input_entradas.val("");
          return false;
        });
      },

      /**
       *  Acciones para insertar una nueva línea tipo form-row a través del botón añadir nuevo item
       *
       *  @method EVENTS.btnAddItem_formRow
       *
       *  @param {dom object} $btn : botón afectado
       *  @param {dom object} datos_sortable : datos del sortable
       */
      btnAddItem_formRow:($btn,datos_sortable)=>{
        // averigua el index mayor de una lista y le suma 1 para retornar el nuevo index
        const li_new_order_init=(lista)=>{
          let retorno=0;
          if(lista!==""){
            lista=lista.split(",").map(item=>{
              return parseInt(item, 10);
            });
            retorno=Math.max.apply(null,lista)+1;
          }
          else{
            retorno="0";
          }
          return retorno;
        };
        const $cont_sortable=datos_sortable.$cont_dd;
        const $item_base_clone=datos_sortable.$item_base_clone;
        const $cloned=$item_base_clone.find(".cmp_sortable_item");
        // Destruye los selectPickers para luego volver a instanciarlos
        const $selects=$cloned.find("select");
        $selects.each((i,e)=>{
          const $select=$(e);
          Baratz.tmpls_actions.APPLY_SELECTPICKERS($select,false,true);
        });
        // Crea un nuevo li con el contenido a clonar (cambia tag de div a li)
        const $new=$("<li/>").append($cloned.html());
        Array.from($cloned[0].attributes).map((a)=>{
          $new[0].setAttribute(a.name, a.value);
        });
        // Añade el nuevo item a ul
        const $cmp_sortable=$cont_sortable.find(".cmp_sortable");
        $cmp_sortable.append($new);

        // Aplica nuevo dato de orden inicial (comienza en 0)
        const $input_sortable=$cont_sortable.find('input[type="hidden"]').eq(0);
        const lista=$input_sortable.val();
        const cmp_sortable_length=li_new_order_init(lista);
        $new.attr("data-order-init",""+cmp_sortable_length);
        // cambia los valores de attr y name según la nueva posicion para los tags label, id y name
        // Se tiene en cuenta que puede haber inputs hidden propietarios en la linea a clonar cuyos ids y nombre se cambian tambien según el formato
        /* var $els=$new.find("input,select");
        $.each($els,function(){
          var $el=$(this);
          var $form_group=$el.closest(".form-group");
          // labels
          // puede haber input hidden tambien en el form-group, con lo que se pasaria 2 veces
          var $label=$form_group.find("label");
          var isChanged=$label.hasClass("changed");
          if(!isChanged){
            var label_for=$label.attr("for");
            // tipo for="relatedName_"
            $label.addClass("changed").attr("for",label_for+cmp_sortable_length);
          }
          // inputs y selects .form-control
          var tagName=$el.prop("tagName").toLowerCase();
          switch(tagName){
            case"select":
            case"input":{
              var tagNameId=$el.attr("id");
              if(typeof(tagNameId)!=="undefined"){
                // tipo id="relatedName_"
                $el.attr("id",tagNameId+cmp_sortable_length);
              }
              var tagNameName=$el.attr("name");
              // tipo name="titleDetail.relatedTitles[].name"
              var tagNameName_new=tagNameName.replace('[]','['+cmp_sortable_length+']');
              $el.attr("name",tagNameName_new);
            }
            break;
            default:
          }
        }); */
        // Aplica EMULATE_BMD
        const $form_groups=$new.find(".form-group");
        Baratz.tmpls_actions.EMULATE_BMD($form_groups);
        // Aplica tunning radio-checkas
        Baratz.tmpls_actions.TUNNING_RADIO_CHECKS($new);
        // Aplica evento al boton borrado
        const $btn_item_cmp_sortable_remove=$new.find(".btn_cmp_sortable_item_form_row--remove_item");
        EVENTS.btnRemoveItem_formRow($btn_item_cmp_sortable_remove);
        // Aplica selectPickers
        const $cont_select=$new.find(".cont_select");
        $cont_select.each((i,e)=>{
          const $select=$(e);
          Baratz.tmpls_actions.APPLY_SELECTPICKERS($select);
        });
        // Pinta las posiciones en el input hidden, con el nuevo elemento ya en lista
        OPS.changeValues($cont_sortable);
      },

      /**
       *  Aplica evento sobre el boton de eliminación de los items
       *
       *  @method EVENTS.btnRemoveItem
       *
       *  @param {obj dom} $btn_item_cmp_sortable_remove boton afectado
       */
      btnRemoveItem:$btn_item_cmp_sortable_remove=>{
        $btn_item_cmp_sortable_remove.off("click").on("click",e=>{
          const $btn=$(e.currentTarget);
          const $cmp_sortable_item_min=$btn.closest(".cmp_sortable_item_min");
          const $cont_sortable=$cmp_sortable_item_min.closest(".cont_sortable");
          $cmp_sortable_item_min.fadeOut("fast",function(){
            $(this).remove();
            OPS.changeValues($cont_sortable);
          });
          return false;
        });
      },
      /**
       *  Aplica evento sobre el boton de eliminación de los items
       *
       *  @method EVENTS.btnRemoveItem_formRow
       *
       *  @param {obj dom} $btn_item_cmp_sortable_remove boton afectado
       */
      btnRemoveItem_formRow:$btn_item_cmp_sortable_remove=>{
        $btn_item_cmp_sortable_remove.off("click").on("click",e=>{
          const $btn=$(e.currentTarget);
          const $cmp_sortable_item_form_row=$btn.closest(".cmp_sortable_item_form_row");
          const $cont_sortable=$cmp_sortable_item_form_row.closest(".cont_sortable");
          $cmp_sortable_item_form_row.fadeOut("fast",function(){
            $(this).remove();
            OPS.changeValues($cont_sortable);
          });
          return false;
        });
      },
    },
    /**
     *  Aplicación del plugins (sortable.js)
     *
     *  @method PLUGINS
     *
     *  @param {dom object} el: Contenedor vanilla donde aplicar el plugin
     *
     *  @details
     *    • El attr multiDrag {bool} puede determinarse a través de un attr data-multidrag en el contenedor
     */
    PLUGINS=el=>{
      // Aplica jquery
      const $el=$(el);
      // aplica plugin sobre $el[0]
      const defaults= {
        multiDrag           : false, // Enable multi-drag
        selectedClass       : 'selected', // The class applied to the selected items
        fallbackTolerance   : 3, // So that we can select items on mobile
        ghostClass          : 'blue-background-class',
        filter              : ".no-sortable",
        animation           : 150,
        onEnd               : evt=>{
          const $itemEl = $(evt.item);
          const $cont_sortable=$itemEl.closest(".cont_sortable");
          OPS.changeValues($cont_sortable);
        }
      };
      // se puede parametrizar por data en el item
      const new_options=$el.data();
      // data-multiDrag
      new_options.multiDrag=new_options.multidrag;
      delete new_options.multidrag;
      // guarda nuevas opciones
      const options=Object.assign({},defaults,new_options );
      if(disabled==true){
        options.disabled=disabled;
      }
      else{
        // Puede ser que no se pase disabled con valor de paramétrico, con lo que se observa si hay contenedor superior jerárquico .sortable_disabled
        const $sortable_disabled=$el.closest(".sortable_disabled");
        const isClaseDisabled=($sortable_disabled.length>0);
        if(isClaseDisabled){
          options.disabled=true;
        }
      }
      // aplica plugin
      // new Sortable(el,options);
      Sortable.create(el,options);
    },
    /**
     *  Contenedor de operaciones sobre la vista
     *
     *  @cont TMPL
     */
    TMPL={
      /**
       *  Modifica un item clonado con el nuevo valor y lo inserta en el compendio
       *
       *  @method TMPL.createNewItem()
       *
       *  @param {obj dom} $cont_sortable contenedor de los items
       *  @param {string} valor nuevo valor del item a insertar
       */
      createNewItem:($cont_sortable,valor)=>{
        const new_model=`<li class="cmp_sortable_item_min" data-value="">
          <span class="title"></span>
          <button type="button" class="btn_item_cmp_sortable_remove" aria-label="${Baratz.i18n_js.cmp_sortable.btn_item_cmp_sortable_remove.title}" title="${Baratz.i18n_js.cmp_sortable.btn_item_cmp_sortable_remove.title}"></button>
        </li>`;
        const $cloned=$(new_model);
        $cloned.attr("data-value",""+valor).find(".title").text(valor);
        $cont_sortable.find("ul").append($cloned);
        const $btn_item_cmp_sortable_remove=$cloned.find(".btn_item_cmp_sortable_remove");
        EVENTS.btnRemoveItem($btn_item_cmp_sortable_remove);
      },
      /**
       *  Pinta una clase en el item duplicado si existe
       *
       *  @method TMPL.pintaDuplicado()
       *
       *  @param {obj dom} $cont_sortable contenedor de los items
       *  @param {string} valor  valor del item a comprobar
       */
      pintaDuplicado:($cont_sortable,valor)=>{
        let retorno=false;
        const $existe=$cont_sortable.find(`[data-value="${valor}"]`);
        if($existe.length>0){
          $existe.addClass("item_duplicado").focus();
          setTimeout(()=>{
            $existe.removeClass("item_duplicado");
          },3000);
          retorno=true;
        }
        return retorno;
      },
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Inserta valores en el input[type="hidden"] del contenedor padre a traves de los de los items del compendio
       *
       *  @method OPS.changeValues
       *
       *  @param {obj dom} $cont_sortable contenedor del item donde se ha ejecutado la accion
       */
      changeValues:$cont_sortable=>{
        const $input_sortable=$cont_sortable.find('input[type="hidden"]').eq(0);
        const valor=OPS.getValues($cont_sortable);
        $input_sortable.val(valor);
      },
      /**
       *  Recupera los valores de orden de items a través de campos data en elementos complejos (líneas de formulario por ejemplo)
       *  ó texto/data-value en items simples, del contenedor
       *
       *  @method OPS.getValues
       *
       *  @param {obj dom} $cont_sortable contenedor padre
       */
      getValues:$cont_sortable=>{
        const $lis=$cont_sortable.find("li.cmp_sortable_item");
        const $ul=$cont_sortable.find("ul.cmp_sortable_list");
        let id=$ul.attr("id");
        if(typeof(id)=="undefined"){
          id=false;
        }
        let valores=[];
        $lis.each((i,e)=>{
          const $li=$(e);
          let valor;
          if(!id){
            valor=$li.attr("data-order-init");
          }
          else{
            switch(id){
              case"select_oai":
              case"select_relatedTitle":
              case"select_mostRecent":{
                valor=$li.attr("data-order-init");
              }
              break;
              case"select_standard_view_fields":{
                valor=$li.attr("data-value");
              }
              break;
              default:{
                valor=$li.text().trim();
              }
            }
          }
          valores.push(valor);
        });
        valores=valores.join(",");
        return valores;
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    if(typeof($cmp_sortable)=="undefined"){
      $cmp_sortable=$body.find(".cmp_sortable");
    }
    consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CMP_SORTABLE()",$cmp_sortable);
    if($cmp_sortable.length>0){
      if(typeof(Baratz.sortable)=="undefined"){
        Baratz.sortable=true;
        const listOfJS=[
          "plugins/sortablejs/Sortable.min.js"
        ];
        const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
        $.when(control).done(()=>{
          INIT();
        });
      }
      else{
        setTimeout(()=>{
          INIT();
        },500);
      }
    }
    else{
      consoleScript.log(`[scripts.new.js] CMP_SORTABLE() elemento ["${$cmp_sortable}"] no existe en el dom.`);
    }
  },

  /**
   *  Pinta botones de paginación para una lista de items en un contenedor afectado
   *
   *  @method Baratz.tmpls_actions.SIMPLE_PAGINATION
   *
   *  @param {dom object} [opt] $pagination_js: Contenedor de la paginación
   *
   *  @details  http://flaviusmatis.github.com/simplePagination.js/
   *     - Plugin modificado para que se aporten las clases necesarias para la vista responsive
   */
  SIMPLE_PAGINATION:function($pagination_js){

    const INIT=()=>{
      $pagination_js.each((i,e)=>{
        PLUGINS($(e));
      });
    },
    /**
     *  Aplicación de los plugins necesarios
     *
     *  @method PLUGINS
     *
     *  @param {dom object} $pag_js: Contenedor donde pintar la lista para paginación
     */
    PLUGINS=$pag_js=>{
      let $pagination=$pag_js.find(".pagination");
      if($pagination.length==0){
        $pag_js.append('<ul class="pagination simple-pagination"></ul>');
        $pagination=$pag_js.find(".pagination");
      }
      const $container_paginations=$pag_js.closest(".cont_views");
      const $items=$container_paginations.find("ul").not(".pagination").find("li");
      const numItems=$items.length;
      const perPage=Number($pag_js.attr("data-items_page"));
      const $datos_visual=$pag_js.find(".datos_visual");
      if($datos_visual.length==0){
        const datos_visual=`<div class="datos_visual d-flex flex-wrap align-items-center">
          <div class="total mr-3">Total items:<span class="num_items font-weight-bold ml-1">${numItems}</span></div>
          <div class="en vista">Items por página:<span class="vista_items font-weight-bold ml-1">${perPage}</span></div>
        </div>`;
        $pag_js.prepend(datos_visual);
      }

      const useAnchors=JSON.parse($pag_js.attr("data-anchors"));

      // recupera la página inicial del hash url, si no hay comienza en la primera
      let hashPageNum = OPS.getPageNum();
      if(hashPageNum>numItems/perPage){
        hashPageNum=1;
      }

      // pinta la página inicial
      TMPL.muestra_pagina($items,perPage,hashPageNum);

      // opciones simple-pagination
      const options={
        items       : numItems/perPage,
        itemOnPage  : perPage,
        currentPage : hashPageNum,
        useAnchors  : useAnchors,
        cssStyle    : '',
        edges       : 2,
        prevText    : '<span class="icono fas fa-angle-left" aria-hidden="true"></span><span class="btn_title">'+Baratz.i18n_js.simple_pagination.options.prevText+'</span>',
        nextText    : '<span class="icono fas fa-angle-right" aria-hidden="true"></span><span class="btn_title">'+Baratz.i18n_js.simple_pagination.options.nextText+'</span>',
        onInit      : ($item)=>{
          // los items pueden borrarse con lo que es necesario recalcular los datos
          const $pagination_js  = $item.closest(".pagination_js");
          const $datos_visual   = $pagination_js.find(".datos_visual");
          const $cont_views     = $pagination_js.closest(".cont_views");
          const $items          = $cont_views.find("ul").not(".pagination").find("li");
          $datos_visual.find(".num_items").text($items.length);
        },
        onPageClick : (pageNumber,evt,$el)=>{
          // pinta la nueva página
          TMPL.muestra_pagina($items,perPage,pageNumber,"slow");
          // Si hay otra paginacion, se pinta la página activa
          $el.addClass("clicked");
          const $other_pagination=$el.closest(".cont_views").find(".pagination").not(".clicked");
          if($other_pagination.length>0){
            // se enecesita deesruír la instancia aplicada
            $other_pagination.pagination("destroy");
            options.currentPage=pageNumber;
            $other_pagination.pagination(options);
          }
          $el.removeClass("clicked");
        }
      };
      // aplica plugin simplePagination
      $pagination.pagination(options);
    },
    OPS={
      /**
       *  Selecciona la página a través del hash url
       *
       *  @method OPS.getPageNum
       *
       *  @return {num} hashPageNum: número de página, si no existe es 1
       */
      getPageNum:()=>{
        const myPageName  = "#page-";
        const hashtag     = window.location.hash;
        // https://www.tutorialspoint.com/es6/es6_regexp.htm
        const re          = new RegExp(`^${myPageName}(\\d+)$`);
        const hash        = hashtag.match(re);
        const hashPageNum = (hash==null)?1:hash[1];
        return hashPageNum;
      },
    },
    TMPL={
      /**
       *  Muestra la página de items afectada
       *
       *  @method TMPL.muestra_pagina
       *
       *  @param {dom object} $items: lista de items
       *  @param {num} perPage: numero de items por página
       *  @param {num} numPage: ordinal de página
       */
      muestra_pagina:($items,perPage,numPage,velocidad=1)=>{
        const showFrom = perPage * (numPage - 1);
        const showTo = showFrom + perPage;
        $items.hide(velocidad).slice(showFrom, showTo).show(velocidad);
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    if(typeof($pagination_js)=="undefined"){
      $pagination_js=$body.find(".pagination_js");
    }
    if($pagination_js.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.SIMPLE_PAGINATION()");
      if(typeof(pagination)=="undefined"){
        const listOfJS=[
          "plugins/simplePagination/jquery.simplePagination.mod.js"
        ];
        const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
        $.when(control).done(()=>{
          INIT();
        });
      }
      else{
        INIT();
      }
    }
    else{
      consoleScript.log(`[scripts.new.js] SIMPLE_PAGINATION() elemento [${$pagination_js}] no existe en el dom.`);
    }
  },

  /**
   *  Filtra items a partir de un input.filterize_markjs con un campo data-class_filterize que lo señala a través de su clase,
   *  aplicando marcas de color para una mejor identificación
   *
   *  @method Baratz.tmpls_actions.FILTERIZE_MARKJ
   *
   *  @details https://markjs.io/
   */
  FILTERIZE_MARKJ:function(){

    const INIT=()=>{
      $filterize_markjs.each((i,e)=>{
        const $input_filter=$(e);
        EVENTOS($input_filter);
      });
    },
    /**
     *  Aplicación de acciones para los eventos
     *
     *  @method EVENTOS
     *
     *  @param {dom object} $input_filter: Elementos afectados
     */
    EVENTOS=$input_filter=>{
      const class_filterize=$input_filter.attr("data-class_filterize");
      const $capas_filterize=$body.find("."+class_filterize);
      $input_filter.on("keyup",e=>{
        const keyword = $(e.currentTarget).val();
        const key_length=""+keyword.length;
        // opciones para el plugin
        const options={
          "className" : "markjs", // aplica clase discriminadora a mark
          "each"      : element=>{ // recorre todos los items a resaltar
            // aplica clase para colores [_forms.scss]
            $(element).addClass(key_length);
          }
        };
        // quita el resaltado visual a los items previamente modificados
        $capas_filterize.unmark({
          done: ()=>{
            // aplicación del plugin de resaltado visual
            $capas_filterize.mark(keyword,options);
            // oculta / muestra las lineas si la marca está o no incluida
            $capas_filterize.each((i,e)=>{
              let $el=$(e);
              const hayMarcas=($el.find('.markjs').length>0);
              switch (class_filterize) {
                // para manager -> gestión de contenidos
                case"btn_article_title":{
                  $el=$el.closest("article");
                }
                break;
                default:
              }
              if(!hayMarcas && keyword!==""){
                $el.addClass("oculto").attr("aria-hidden","true");
              }
              else{
                $el.removeClass("oculto").removeAttr("aria-hidden");
              }
            });
          }
        });
      });
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $filterize_markjs=$body.find(".filterize_markjs");
    if($filterize_markjs.length>0){
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.FILTERIZE_MARKJ()");
      if(typeof(Mark)==="undefined"){
        const listOfJS=[
          "plugins/mark/dist/jquery.mark.min.js",
        ];
        const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
        $.when(control).done(()=>{
          INIT();
        });
      }
      else{
        INIT();
      }
    }
    else{
      consoleScript.log(`[scripts.new.js] FILTERIZE_MARKJ() elemento ["${$filterize_markjs}"] no existe en el dom.`);
    }
  },

  /**
   *  Gestíon y acciones para la barra flotante de aceptación de cookies para la aplicación
   *
   *  @method Baratz.tmpls_actions.CTRL_COOKIES_BAR
   *
   *  @details
   *    En la capa .cookies_bar se determinan:
   *    - data-active {bool} Si se activa o no la gestión de cookies
   *    - data-expanded: {bool} Si aparece primero el mensaje o el icono de gestión de cookies
   */
  CTRL_COOKIES_BAR:function(){

    const INIT=()=>{
consoleScript.log("[scripts.js] Baratz.tmpls_actions.CONTROL_COOKIES_BAR() INIT");
      TMPL.initialize();
      EVENTOS();
    },
    /**
     *  Aplicación de acciones para los eventos
     *
     *  @method EVENTOS
     */
    EVENTOS=()=>{

      // Boton cerrar de la barra cookies, oculta capa y la elimina del dom
      $cookies_bar.find(".btn_close").on("click",(e)=>{
        const $btn=$(e.currentTarget);
        $contenedor_principal.animate({"opacity":"0"},"slow",function(){
          $(this).addClass("oculto");
          $cookies_bar.remove();
        });
        return false;
      });

      $cookies_bar.find("[data-action]").on("click",(e)=>{
        const $btn=$(e.currentTarget);
        OPS.personalize($btn);
      });
    },
    TMPL={
      /**
       *  Inicialización de la vista
       *
       *  @method TMPL.initialize
       */
      initialize:()=>{
        $cookies_bar.removeClass("oculto").animate({"top":"0"},"slow",()=>{
          $contenedor_principal.find('.cookies_policy').focus();
        });
      }
    },
    OPS={
      personalize:($btn)=>{
        const action=$btn.attr("data-action");
        // Al aceptar ó declinar se oculta el mensaje
       switch (action){
          case"cookies_decline":
          case"cookies_accept":{
            const url=$btn.attr("data-url");
            $.get(url,(data)=>{
              $cookies_bar.animate({"top":"-100%"},function(){
                $(this).remove();
              });
            });
          }
          break;
          default:
        }
        /*
        $cookies_bar.animate({"top":"-100%"},()=>{
          const url=$btn.attr("data-url");
          window.location.replace(url);
        });
        */
        return false;
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $cookies_bar=$body.find(".cookies_bar");
    const $contenedor_principal=$cookies_bar.find(".contenedor_principal");
    if($cookies_bar.length>0){
      INIT();
    }
  },

  /**
   *  Control de las entradas type date con clase ctrl_datetimepicker (aplicación de plugin)
   *
   *  @method Baratz.tmpls_actions.CTRL_DATETIMEPICKER
   *
   *  @details
   *    Dominus Tempus plugin bs4:
   *      Tempus Dominus Bootstrap4 v5.39.0 (https://tempusdominus.github.io/bootstrap-4/)
   *      https://tempusdominus.github.io/core/Options/
   */
  CTRL_DATETIMEPICKER:function($capa){
    const INIT=()=>{
      $ctrl_datetimepickers.each((i,e)=>{
        const $el=$(e);
        if($capa.hasClass("modal")){
          // Cambio de ids para accesibilidad
          const id_new="modal_"+$el.attr("id");
          $el.attr("id",id_new);
          $el.find("input,button").attr("data-target","#"+id_new);
        }
        // Si los input tienen ya valor fecha, se guarda para el botón reset
        const $input=$el.find('.datetimepicker-input');
        const valor=$input.val();
        $input.attr("data-initial",valor);
        $el.closest(".cont_input").addClass("cont_ctrl_datetimepicker");
        // uno a uno aplica plugins y eventos
        PLUGINS($el);
        EVENTOS.input($el);
        EVENTOS.btns($el);
      });
    },
    /**
     *  Aplicación de acciones para los eventos
     *
     *  @method PLUGINS
     *
     *  @param {dom object} $ctrl_datetimepicker: Elemento afectado
     *
     *  @details Para modales ver 'modal_add_manager_activity', cuidando los ids y target de referencia para el uso del plugin
     */
    PLUGINS=$ctrl_datetimepicker=>{

      // control de local para las fechas
      let locale = window.navigator.userLanguage || window.navigator.language;
      locale = locale.split("-")[0];

      // Carga el idioma en moment
      moment.defaultFormat="YYYY-MM-DD";

      // Aplica plugin
      $ctrl_datetimepicker.datetimepicker({
        format            : moment.defaultFormat, // Formato de fecha local
        locale            : moment.locale(locale), // Aplica idioma en el plugin
        //defaultDate       : moment(),// Inserta fecha actual en el input
        allowInputToggle  : true,    // Al click en el input desencadena plugin
        buttons:{
          showToday: true,
          showClose: true,
        },
        debug             : true,
        keepOpen          : true,
        icons:{
          today: 'far fa-calendar-check',
        },
        tooltips:{
          clear           : Baratz.i18n_js.datetimepicker.tooltips.clear,
          close           : Baratz.i18n_js.datetimepicker.tooltips.close,
          decrementHour   : Baratz.i18n_js.datetimepicker.tooltips.decrementHour,
          decrementMinute : Baratz.i18n_js.datetimepicker.tooltips.decrementMinute,
          decrementSecond : Baratz.i18n_js.datetimepicker.tooltips.decrementSecond,
          incrementHour   : Baratz.i18n_js.datetimepicker.tooltips.incrementHour,
          incrementMinute : Baratz.i18n_js.datetimepicker.tooltips.incrementMinute,
          incrementSecond : Baratz.i18n_js.datetimepicker.tooltips.incrementSecond,
          nextCentury     : Baratz.i18n_js.datetimepicker.tooltips.nextCentury,
          nextDecade      : Baratz.i18n_js.datetimepicker.tooltips.nextDecade,
          nextMonth       : Baratz.i18n_js.datetimepicker.tooltips.nextMonth,
          nextYear        : Baratz.i18n_js.datetimepicker.tooltips.nextYear,
          pickHour        : Baratz.i18n_js.datetimepicker.tooltips.pickHour,
          pickMinute      : Baratz.i18n_js.datetimepicker.tooltips.pickMinute,
          pickSecond      : Baratz.i18n_js.datetimepicker.tooltips.pickSecond,
          prevCentury     : Baratz.i18n_js.datetimepicker.tooltips.prevCentury,
          prevDecade      : Baratz.i18n_js.datetimepicker.tooltips.prevDecade,
          prevMonth       : Baratz.i18n_js.datetimepicker.tooltips.prevMonth,
          prevYear        : Baratz.i18n_js.datetimepicker.tooltips.prevYear,
          selectDate      : Baratz.i18n_js.datetimepicker.tooltips.selectDate,
          selectDecade    : Baratz.i18n_js.datetimepicker.tooltips.selectDecade,
          selectMonth     : Baratz.i18n_js.datetimepicker.tooltips.selectMonth,
          selectTime      : Baratz.i18n_js.datetimepicker.tooltips.selectTime,
          selectYear      : Baratz.i18n_js.datetimepicker.tooltips.selectYear,
          today           : Baratz.i18n_js.datetimepicker.tooltips.today,
          togglePeriod    : Baratz.i18n_js.datetimepicker.tooltips.togglePeriod,
        }
      });
    },
    EVENTOS={
      /**
       *  Aplicacion de acciones sobre eventos en los inputs datetimepicker
       *
       *  EVENTOS.input
       */
      input:$ctrl_datetimepicker=>{

        // Al aparecer la seleccion de fechas, se cambia de posicion .bmd-help
        $ctrl_datetimepicker.on("show.datetimepicker",function(ev){
          const $ctrl=$(this);

          // Activa el boton de despliegue
          const $btn_toggle_picker=$ctrl_datetimepicker.find('[data-toggle="datetimepicker"]');
          $btn_toggle_picker.addClass("active");

          const $input=$ctrl.find('.datetimepicker-input');

          // cierra el resto de datetimepickers
          const $hermanos=$ctrl.closest(".cont_form_group").siblings();
          $hermanos.find(".ctrl_datetimepicker").datetimepicker("hide");

          // Cambio de la vista para el help del input al lado contrario de la apertura del datetimepicker
          const $bootstrap_datetimepicker_widget=$ctrl.find(".bootstrap-datetimepicker-widget");
          const isTop=$bootstrap_datetimepicker_widget.hasClass("top");
          const $bmb_help=$input.closest(".cont_input").find(".bmd-help");
          if(!isTop){
            $bmb_help.addClass("in_top");
          }
          else{
            $bmb_help.removeClass("in_top");
          }

          // Eventos de teclado para el datetimepicker a través del input
          $ctrl.find('.datetimepicker-input').off("keydown").on("keydown",function(evt){
            const $input=$(this);
            const $ctrl_datetimepicker=$input.closest(".ctrl_datetimepicker");
            const $widget=$ctrl_datetimepicker.find(".bootstrap-datetimepicker-widget");
            evt = evt || window.event;
            if(evt.ctrlKey){
              return;
            }
            const keyName = evt.key;
            switch (keyName){
              // Hoy
              case "t":{
                $widget.find('[data-action="today"]').trigger("click");
                return false;
              }
              break;
              case "Enter":{
                $btn_toggle_picker.focus();
                return false;
              }
              break;
              case "Escape":{
                $ctrl_datetimepicker.datetimepicker("hide");
                $btn_toggle_picker.focus();
                return false;
              }
              break;
              case "Tab":{
                if(!evt.shiftKey){
                  $btn_toggle_picker.focus();
                  return false;
                }
                else{
                  $ctrl_datetimepicker.datetimepicker("hide");
                }
              }
              break;
              // mes siguiente
              case "PageUp":
              // mes anterior
              case "PageDown":
              case "ArrowUp":
              case "ArrowDown":
              case "ArrowLeft":
              case "ArrowRight":
              break;
              // se veta entrada directa de fechas
              default:{
                return false;
              }
            }
          });
        });

        // Al cerrar datetimepicker
        $ctrl_datetimepicker.on("hide.datetimepicker",function(ev){
          const $ctrl=$(this);
          // Desactiva el boton de despliegue
          const $btn_toggle_picker=$ctrl.find('[data-toggle="datetimepicker"]');
          $btn_toggle_picker.removeClass("active");
        });
      },
      /**
       *  Aplicacion de acciones sobre eventos en general
       *
       *  EVENTOS.btns
       *
       *  @param {object dom} $ctrl_datetimepicker: Datetimepicker afectado
       */
      btns:$ctrl_datetimepicker=>{

        // Click en botón de reset aplica fecha inicial y foco en el input
        $ctrl_datetimepicker.find(".btn_reset").on({
          "click":function(){
            const $btn=$(this);
            const $input=$btn.closest(".cont_input").find(".datetimepicker-input");
            //const valor=$input.attr("data-initial");
            const valor=""
            $input.val(valor);
            $btn.closest(".ctrl_datetimepicker").datetimepicker("hide");
            //$input.focus();
            return false;
          },
          "focus":function(){
            const $btn=$(this);
            $btn.closest(".ctrl_datetimepicker").datetimepicker("hide");
          }
        });
      },

    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    if(typeof($capa)==="undefined"){
      $capa=$body;
    }
    const $ctrl_datetimepickers=$capa.find(".ctrl_datetimepicker");
    if($ctrl_datetimepickers.length>0){
      consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.CTRL_DATETIMEPICKER()");
      // Detecta si el plugin ya está cargado aplicando una clase en el body cuando se carga por 1ª vez
      if(!$body.hasClass("plg_bs4_select_picker_charged")){
       const listOfCSS=[
        "plugins/bootstrap.timepicker/tempusdominus-bootstrap-4.min.css",
        ];
        Baratz.tmpls_actions.UTILS.requiredCSS(listOfCSS);
        const listOfJS=[
          "plugins/bootstrap.timepicker/moment.min.js",
          "plugins/bootstrap.timepicker/locales.js",
          "plugins/bootstrap.timepicker/tempusdominus-bootstrap-4.min.js",
        ];
        const control=Baratz.tmpls_actions.UTILS.requiredJSAsync(listOfJS);
        $.when(control).done(()=>{
          // Aplicacion de la clase en el body para que no se repita la carga
          $body.addClass("plg_bs4_select_picker_charged");
          INIT();
        });
      }
      else{
        INIT();
      }
    }
    else{
      if(typeof($ctrl_datetimepicker)!=="undefined"){
        consoleScript.log(`[scripts.new.js] CTRL_DATETIMEPICKER() elemento ["${$ctrl_datetimepicker}"] no existe en el dom.`);
      }
    }
  },

  /**
   *  UX de alertas con icono de despliegue dentro de un mismo contenedor
   *
   *  @method Baratz.tmpls_actions.CTRL_ALERT_WITH_BUTTON
   *
   *  @details Un botón.btn_show_help con un .alert.alert-dismissible dentro de una capa .cont_help_with_button
   */
  CTRL_ALERT_WITH_BUTTON:function(){
    const INIT=()=>{
      TMPL.inicializa();
    },
    EVENTOS={
      /**
       *  Acciones al click en el botón .btn_show_help
       *
       *  @method EVENTOS.btn_help
       *
       *  @param {dom object} $btn: Botón afectado
       */
      btn_help:($btn)=>{
        $btn.on("click",(e)=>{
          const $el=$(e.currentTarget);
          const isActive=$el.hasClass("active");
          if(!isActive){
            TMPL.btn_help.active($el);
          }
          else{
            TMPL.btn_help.deactive($el);
          }
          return false;
        });
      },
      /**
       *  Acciones al click en el botón .close del alert
       *
       *  @method EVENTOS.btn_alert_close
       *
       *  @param {dom object} $btn: Botón afectado
       */
      btn_alert_close:($btn)=>{
        $btn.on("click",(e)=>{
          const $el=$(e.currentTarget);
          const $cont_help_with_button=$el.closest(".cont_help_with_button");
          const $btn=$cont_help_with_button.find(".btn_show_help");
          TMPL.btn_help.deactive($btn);
          return false;
        });
      },
    },
    TMPL={
      /**
       *  Inicializa insertando tags accesibilidad
       *
       *  @method TMPL.inicializa
       */
      inicializa:()=>{
        $.each($alerts_with_button,(i,e)=>{
          const id=`alert_with_button_${i}`;
          const $capa=$(e);
          const $btn=$capa.find(".btn_show_help");
          $btn.attr("aria-controls",id);
          EVENTOS.btn_help($btn);
          const $alert=$capa.find(".alert-dismissible");
          $alert.attr("id",id);
          const $btn_alert_close=$alert.find(".close");
          EVENTOS.btn_alert_close($btn_alert_close);
        });
      },
      /**
       *  Acciones asociadas a eventos sobre el botón .btn_show_help
       *
       *  @cont TMPL.btn_help
       */
      btn_help:{
       /**
        *  Activación del botón
        *
        *  @method TMPL.btn_help
        *
        *  @param {dom object} $btn: Botón afectado
        */
        active:($btn)=>{
          $btn.addClass("active").attr("aria-expanded","true");
          const $cont_help_with_button=$btn.closest(".cont_help_with_button");
          const $alert=$cont_help_with_button.find(".alert");
          $alert.slideDown().find(".close").focus();
        },
       /**
        *  Desactivación del botón
        *
        *  @method TMPL.btn_help
        *
        *  @param {dom object} $btn: Botón afectado
        */
        deactive:($btn)=>{
          const $cont_help_with_button=$btn.closest(".cont_help_with_button");
          $cont_help_with_button.find(".alert").slideUp();
          $btn.removeClass("active").attr("aria-expanded","false").focus();
        },
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    // Busca las capas generales
    const $alerts_with_button=$body.find(".cont_help_with_button");
    if($alerts_with_button.length>0){
      INIT();
    }

  },

  /**
   *  Contenedor de acciones referentes a las localizaciones
   *
   *  @method Baratz.tmpls_actions.BTNS_EXPAND_LOCATIONS
   */
  BTNS_EXPAND_LOCATIONS:function(){
    /**
     *  Flujo inicial de acciones
     */
    const INIT=()=>{
      OPS.initialize();
    },
    /**
     *  Asociacion de acciones sobre los eventos
     *
     *  @method EVENTOS
     *
     *  @param {dom object} $btns: Botones afectados
     */
    EVENTOS=$btns=>{
      $btns.on("click",(event)=>{
        const $btn=$(event.currentTarget);
        OPS.actions($btn);
        return false;
      });
    },
    /**
     *  Contenedor de operaciones
     *
     *  @cont OPS
     */
    OPS={
      /**
       *  Inicializacion de la vista de botonera
       *
       *  @method OPS.initialize
       */
      initialize:()=>{
        // recorre los bloques de facetas
        $conts_filters.each((i,e)=>{
          const $blq=$body.find(e);
          const $display_none=$blq.find("li.display_none");
          // recupera el num de elementos a pintar
          const $controls=$blq.find(".cont_locations_controls");
          let steps=parseInt($controls.attr("data-steps"),10)-1;
          if(!steps){
            steps=4;
          }
          // pinta el num de lineas (primeras) definido en los steps
          for(let i=0;i<=steps;i++){
            const $el=$display_none.eq(i);
            if($el.length>0){
              $el.removeClass("display_none");
            }
          }
          // aplica eventos sobre los botones
          const $btns=$controls.find("button");
          EVENTOS($btns);
        });
      },
      /**
       *  Establece las acciones sobre los botones segun su data-action
       *
       *  @method OPS.actions
       *
       *  @param {dom object} $btn  : botón afectado
       *
       */
      actions:$btn=>{
        const action                = $btn.attr("data-action");
        const $cont_locations_controls = $btn.closest(".cont_locations_controls");
        const steps                 = parseInt($cont_locations_controls.attr("data-steps"),10);
        const $cont_filters_with_buttons=$cont_locations_controls.closest(".cont_filters_with_buttons");
        const $ul=$cont_filters_with_buttons.find("ul");
        //var $li=$ul.find("li");
        //var size=$li.length;
        switch(action){
          // boton ver mas
          case "more":{
            // muestra el siguiente grupo de elementos
            const $li_a_mostrar=$ul.find("li.display_none");
            const $li_focus=$li_a_mostrar.eq(0).find(".btn");
            for(let i=0;i<steps;i++){
              const $li_afectado=$li_a_mostrar.eq(i);
              $li_afectado.css("opacity","0").removeClass("display_none").addClass("marcacion");
              setTimeout(()=>{
                $li_afectado.animate({"opacity":"1"},"slow",()=>{
                  $li_afectado.removeClass("marcacion").removeAttr("style");
                });
              },200*i);
            }
            // foco en el primer elemento del grupo mostrado
            $li_focus.focus();
            // una vez mostrado el siguiente grupo, muestra el boton 'ver menos'
            $cont_locations_controls.find(".btn.minus").removeClass("display_none");
            // Si el grupo es el final, se oculta el boton 'ver mas'
            const $li_restan=$ul.find("li.display_none");
            const size_restan=$li_restan.length;
            if(size_restan==0){
              $cont_locations_controls.find(".btn.more").addClass("display_none");
            }
          }
          break;
          // boton ver menos
          case"minus":{
            // oculta el grupo de elementos
            const $li_a_ocultar=$ul.find("li:not(.display_none)");
            const li_length=$li_a_ocultar.length;
            const resto=li_length%steps;
            let pos=li_length-steps;
            if(resto>0){
              pos=li_length-resto;
            }
            for(let i=0;i<steps;i++){
              $li_a_ocultar.eq(pos+i).addClass("display_none");
            }
            // una vez oculto, comprueba que es el primer grupo y oculta el boton 'ver menos'
            const $li_mostrados=$ul.find("li:not(.display_none)");
            const size_li_mostrados=$li_mostrados.length;
            if(size_li_mostrados<=steps){
              $cont_locations_controls.find(".btn.minus").addClass("display_none");
            }
            // foco en el ultimo elemento del grupo
            $li_mostrados.eq(size_li_mostrados-1).find(".btn").focus();
            // Si hay elementos que mostrar se pinta el boton 'ver mas'
            const $li_ocultos=$ul.find("li.display_none");
            const size_li_ocultos=$li_ocultos.length;
            if(size_li_ocultos>0){
               $cont_locations_controls.find(".btn.more").removeClass("display_none");
            }
          }
          break;
          default:
        }
      },
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $body=$(document.body);
    const $conts_filters=$body.find(".cont_filters_with_buttons");
    if($conts_filters.length>0){
consoleScript.log("FN::::::::::::::::::::::::::::Baratz.tmpls_actions.BTNS_EXPAND_LOCATIONS()");
      INIT();
    }
  },


});

// activar o desactivar el pintado de navegacion interna en general Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT()
// si no se aplica valor entonces false
// Aqui aplica a nivel general, para cada vista aplicar en [*.init.js], ejemplo opac-home.init.js
/* Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT_active=true;
Baratz.tmpls_actions.ACCESIBLE_SKIP_TO_CONTENT(); */

(()=>{
  // Para ver mensajes de consoleScript poner true en utils.js o activar antes de lanzar el mensaje consoleScript
  //Baratz.tmpls_actions.UTILS.console_script();

  // Ready
  consoleScript.log("[scripts.new.js] READY");

  // Cookies, común a toda la app
  Baratz.tmpls_actions.CTRL_COOKIES_BAR();

  // Alerts con botones de despliegue, comunes a toda la app
  Baratz.tmpls_actions.CTRL_ALERT_WITH_BUTTON();

  // A efectos de debug
  //Baratz.tmpls_actions.GENERAL();
})();


