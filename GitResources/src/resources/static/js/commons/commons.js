/**
 *  @file        : commons.js
 *
 *  @description : Js comunes en la aplicación que por su pequeño tamaño, se engloban aquí
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
/* globals Baratz,BaratzContextPath */

console.log("[commons.js] CARGA");

$('*[id*=bs-select]:visible').each(function () {
  $(this).on("click", (e, clickedIndex, newValue, oldValue) => {
    //Baratz.commons.changeSubCatalogInputValues();
  })
});

if(!Baratz.commons) {
  Baratz.commons = {
    scope: 'public/',
    addTitleListItemUrl: BaratzContextPath + 'reader/api/my-list/add/',
    deleteTitleListItemUrl: BaratzContextPath + 'reader/api/my-list/delete-item/',
    titleListItems: BaratzContextPath + 'reader/my-list-items',
    deleteListfromListPage: BaratzContextPath + 'reader/delete-List',
  };
  Baratz.commons.context = BaratzContextPath + Baratz.commons.scope;
}


/**
 *  Extiende el objeto window.Baratz para poder acceder a cualquier contenedor de fns desde otros js y entre ellos
 * 
 *  @obj Baratz.commons
 */
Object.assign(Baratz.commons, {

  subCataOptionsUrl: Baratz.commons.context + 'catalog/subcatalog',
  favoriteUrl: Baratz.commons.context + 'reader/favorite',
  recordUpdateUrl: Baratz.commons.context + 'reader/updateRecord',
  recommendedAjaxUrl: Baratz.commons.context + 'reload/recommended?subcatalogos=',
  mostRecentAjaxUrl: Baratz.commons.context + 'reload/mostrecent?subcatalogos=',
  infoAjaxUrl: Baratz.commons.context + 'reload/info?subcatalogos=',

  /**
   *  Pintado de los mensajes alert con los datos recibidos de la petición, en un contenedor dado
   *
   *  @method Baratz.commons.controlPost
   *
   *  @param {object} datos  : datos de una modal
   *  @param {data}   data   : datos recibidos de la petición para la gestión de los mensajes en las alertas
   *  @param {string} action : acción realizada ("operation-delete","operation-modify"...)
   *  @param {dom object} $cont_alert [opt]: contenedor donde mostrar los mensajes de alerta
   *
   *  @return {object} retorno : {
   *                               {bool} exito   : La petición ha tenido éxito
   *                               {bool} error   : La petición ha tenido error
   *                               {obj} outData  : Datos recibidos outData
   *                               {obj} inData   : Datos recibidos inData
   *                            }
   */
  controlPost: (datos, data, action, $cont_alert) => {
    // Si no hay contenedor, se define por defecto el .alerts_action en la modal
    if (typeof ($cont_alert) === "undefined" && typeof (datos.modal) === "object") {
      $cont_alert = datos.modal.$modal.find(".alerts_action");
    }
    $cont_alert.find(".alert").remove();

    // Por defecto estos campos se devuelven igual
    const outData = data.outData;
    const inData = data.inData;

    let exito = false;
    let error = false;
    let textos;
    let $alert;
    let respuesta = data;
    // Si se devuelve error directo
    if (respuesta.statusText === "error") {
      error = true;
      $alert = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert, "html");
      textos = {
        titulo: "Error " + respuesta.status,
        texto: Baratz.i18n_js.manager.controlPost.error.text
      };
      Baratz.tmpls_actions.ALERTA.error($alert, textos);
    }
    else {
      // Acciones especiales según la vista
      let view_name;
      if (typeof (respuesta.view) === "object" && typeof (action) === "string") {
        view_name = respuesta.view.name;
        switch (view_name) {
          case "manager-interestLinks": {
            if (action === "operation-add" || action === "operation-modify" || action === "operation-sortable") {
              respuesta = data.managerData;
            }
          }
            break;
          case "manager-activities": {
            if (action === "operation-add" || action === "operation-modify") {
              respuesta = data.managerData;
            }
          }
            break;
          case "manager-recommended": {
            if (action === "operation-moveItem" || action === "operation-delete") {
              respuesta = data.managerData;
            }
          }
            break;
          default:
        }
      }
      for (const [key, val] of Object.entries(respuesta)) {
        // Si hay algun mensaje en el campo
        if (typeof (val) === "object" && Array.isArray(val) && val.length > 0) {
          // Guarda los mensajes en acumulacion (como el array que llega) con un único titulo que se se obtiene segun el key
          textos = {
            titulo: "",
            texto: val
          };
          // Discrimina mensajes añadiendo
          switch (key) {
            case "successes": {
              exito = true;
              $alert = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert, "append");
              textos.titulo = Baratz.i18n_js.alert.success.title_generic;
              Baratz.tmpls_actions.ALERTA.exito($alert, textos);
            }
              break;
            case "warnings": {
              $alert = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert, "append");
              textos.titulo = Baratz.i18n_js.alert.warning.title_generic;
              Baratz.tmpls_actions.ALERTA.warning($alert, textos);
            }
              break;
            case "errors": {
              error = true;
              let alert_insertion_type = "append";
              // Acciones especiales según la vista
              if (typeof (view_name) !== "undefined" && typeof (action) === "string") {
                switch (view_name) {
                  case "manager-interestLinks":
                  case "manager-activities": {
                    if (action === "operation-add" || action === "operation-modify") {
                      alert_insertion_type = "html";
                      $cont_alert = datos.modal.$modal.find(".alerts_action");
                    }
                  }
                    break;
                  case "manager-recommended": {
                    if (action == "operation-moveItem") {
                      $cont_alert = datos.modal.$modal.find(".alerts_action");
                    }
                  }
                    break;
                  default:
                }
              }
              $alert = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert, alert_insertion_type);
              textos.titulo = Baratz.i18n_js.alert.error.title_generic;
              Baratz.tmpls_actions.ALERTA.error($alert, textos);
            }
              break;
            case "infos": {
              $alert = Baratz.tmpls_actions.ALERTA.pintaEstructura($cont_alert, "append");
              textos.titulo = Baratz.i18n_js.alert.info.title_generic;
              Baratz.tmpls_actions.ALERTA.info($alert, textos);
            }
              break;
            default: {
              console.log('[commons.js] Baratz.commons.controlPost() key no tratada... key,val,typeof(val)', key, val, typeof (val), Array.isArray(val), $cont_alert);
            }
          }
        }
        else {
          //console.log("[commons.js] Baratz.commons.controlPost() key no array ó array vacío... key,val,typeof(val),Array.isArray(val)",key,val,typeof(val),Array.isArray(val));
        }
      }
    }
    // Retorno por si acaso se necesitan acciones adicionales
    const retorno = {
      exito: exito,
      error: error,
      outData: outData,
      inData: inData
    };
    return retorno;
  },

  /**
   *  Redirige el navegador a la url definida en la imagen clickada
   *
   *  @method Baratz.commons.imageEvents
   *
   *  @details [/public/catalog/fragments/searchListElement.html]
   */
  imageEvents: () => {
    // al click en una imagen
    $(document.body).find(".cont_image.link").on("click", e => {
      const $image = $(e.currentTarget);
      const url = $image.attr("data-href");
      if (typeof (url) !== "undefined") {
        window.location.href = url;
      }
      return false;
    });
  },

  /**
   *  Live search desde un input .input_li_filter
   *
   *  @method Baratz.commons.inputFilterLive
   */
  inputFilterLive: () => {
    const $inputs = $(document.body).find('.input_li_filter');
    $inputs.on("keyup", e => {
      const value = $(e.currentTarget).val().toLowerCase();
      $('ul.ul_filtered_js li.li_filtered_js').each((i, e) => {
        const aElement = $(e).find('a.cont_link__link_js')[0];
        $(e).toggle(aElement.text.toLowerCase().indexOf(value) > -1);
      });
      return false;
    });
  },

  /**
   *  Live search y aplicación de plugin mark.js para el marcado visual de los filtros aportados desde un input .input_li_filter
   *
   *  @method Baratz.commons.inputFilterLiveMarkjs
   *
   *  @details:
   *      mark.js
   *      https://markjs.io/
   *      https://github.com/julmot/mark.js/
   *    ESTILOS: .markjs [_forms.scss]
   *
   *      @TODO 200427
   *        • la carga del fichero js produce error por que no está configurado el servidor
   *          para recuperar doc text/javascript y lo devuelve como html
   */
  inputFilterLiveMarkjs: () => {
    const $body = $(document.body);
    const $input_li_filter = $body.find('.input_li_filter');
    if ($input_li_filter.length > 0) {
      const $uls = $body.find(".ul_filtered_js");
      const $lis = $uls.find('li');
      const $search_highlighted = $uls.find(".search_highlighted");
      // al cambiar el valor del input
      $input_li_filter.on("keyup", event => {
        const keyword = $(event.currentTarget).val();
        const key_length = "" + keyword.length;
        // opciones para el plugin
        const options = {
          "className": "markjs", // aplica clase discriminadora a mark
          "each": (element) => { // recorre todos los items a resaltar
            // aplica clase para colores [_forms.scss]
            $(element).addClass(key_length);
          }
        };
        // quita el resaltado visual a los items previamente modificados
        $search_highlighted.unmark({
          done: () => {
            // aplicación del plugin de resaltado visual
            $search_highlighted.mark(keyword, options);
            // oculta / muestra las lineas si la marca está o no incluida
            $lis.each((i, e) => {
              const $el = $(e);
              const hayMarcas = ($el.find('.markjs').length > 0);
              if (!hayMarcas && keyword !== "") {
                $el.hide();
              }
              else {
                $el.show();
              }
            });
          }
        });
      });
    }
  },

  /**
   *  Acción sobre eventos en selects .changeLibraryBranch para filtrar resultados por Biblioteca/Sucursal
   *
   *  @method Baratz.commons.changeLibraryBranch
   *
   *  @details [title/fragments/locationFilter.html]
   *    - Afecta a selects de Filtros Biblioteca/Sucursal en la barra tools (Localizaciones) de la vista detalles del item
   *      Ejemplo: http://localhost:8080/OpacWeb-0.2.15-SNAPSHOT/public/catalog/detail/b2FpOmNlbGVicmF0aW9uOmVzLmJhcmF0ei5kZW1vLzQ1NTEy?tabId=1625729009530
   */
  changeLibraryBranch: () => {
    const $body = $(document.body);
    const $selectLibraryBranchFilter = $body.find(".changeLibraryBranch");
    if ($selectLibraryBranchFilter.length > 0) {
      // Lanza una nueva página al pulsar una opcion del select .changeLibraryBranch
      $selectLibraryBranchFilter.on("changed.bs.select", (e, clickedIndex, newValue, oldValue) => {
        const $select = $(e.currentTarget);
        // Al navegar via teclado no se cierra la vista de opciones del select
        const $bootstrap_select = $select.closest(".bootstrap-select");
        $bootstrap_select.find(".dropdown-menu").removeClass("show");
        $bootstrap_select.find(".dropdown-toggle").focus();
        // Aplica icono loading
        const $loading = $body.find(".loading");
        $loading.addClass("in_view");
        // Recupera url y recarga página
        const url = $select.find("option:selected").attr('data-href');
        window.location.href = url;
      });
    }
  },
  /**
   * Metodo que se llama en el boton de cambiar del entorno de busqueda y cambia recomendados , mas recientes , actividades y enlaces
   * Tambien mete en el campo hidden los combos para la busqueda.
   */
  changeContentLibraryBranch: () => {


    const $body = $(document.body);
    const $buttons = $body.find("#bchangesub");
    $('*[id*=bs-select]:visible').each(function () {
      $(this).on("click", (e, clickedIndex, newValue, oldValue) => {
        //Baratz.commons.changeSubCatalogInputValues();
      })
    });
    if ($buttons.length > 0) {
      var $other = $('#sct_other');
      var $recomendations = $('#sct_recomendations');
      var $info = $('#info');
      var timeOutActualizaText;

      //funcion del timeout
      if (timeOutActualizaText) {
        clearTimeout();
      }


      $buttons.on("click", (e, clickedIndex, newValue, oldValue) => {

        // Baratz.commons.changeSubCatalogInputValues();

        var values = $('input[id^="solrSearch.subCatalog.subCatalogs"]').map(function (index) {
          return $(this).val();
        }).get().join(',');

        values = encodeURIComponent(values);

        $.ajax({
          url: Baratz.commons.recommendedAjaxUrl + values,
          type: "get",
          beforeSend: () => {
            $("#sct_recomendations").addClass("in view");
          },

          success: (response, status, jqXHR) => {

            $("#sct_recomendations").removeClass("in_view").replaceWith(response);
            Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
            Baratz.tmpls_actions.CAROUSEL();
            Baratz.tmpls_actions.CTRL_VIEWS();

            $(document).ready(function () {
              //funcion timeout fin de carga de los más recientes
              if (typeof $recomendations !== "undefined" && $recomendations.length != 0) {
                timeOutActualizaText = setTimeout(function () {
                  $("#c-polite_recomendarions").fadeOut(1500);
                }, 8000);
              }

            });

          },
          error: xhr => {
            console.log("[commons.js] Baratz.commons.onchangeContentLibraryBranch() -> Error:", Baratz.commons.recommendedAjaxUrl + values);
            $("#sct_recomendations").removeClass("in_view");
          }
        });

        $.ajax({
          url: Baratz.commons.mostRecentAjaxUrl + values,
          type: "get",
          beforeSend: () => {

            $("#sct_other").addClass("in view");
          },
          success: (response, status, jqXHR) => {

            $("#sct_other").removeClass("in_view").replaceWith(response);
            Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
            Baratz.tmpls_actions.CTRL_VIEWS();
            Baratz.tmpls_actions.CAROUSEL();

            $(document).ready(function () {
              //funcion timeout fin de carga de los más recientes

              if (typeof $other !== "undefined" && $other.length != 0) {

                timeOutActualizaText = setTimeout(function () {
                  $("#c-polite_other").fadeOut(1500);
                }, 8000);

              }

            });

          },
          error: xhr => {
            console.log("[commons.js] Baratz.commons.onchangeContentLibraryBranch() -> Error:", Baratz.commons.mostRecentAjaxUrl + values);
            $("#sct_other").removeClass("in_view");
          }
        });


        $.ajax({
          url: Baratz.commons.infoAjaxUrl + values,
          type: "get",
          beforeSend: () => {

            $("#info").addClass("in view");
          },
          success: (response, status, jqXHR) => {

            $("#info").removeClass("in_view").replaceWith(response);
            Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
            Baratz.tmpls_actions.CAROUSEL();
            Baratz.tmpls_actions.CTRL_VIEWS();

            $(document).ready(function () {
              //funcion timeout fin de carga de los enlaces

              if (typeof $info !== "undefined" && $info.length != 0) {

                timeOutActualizaText = setTimeout(function () {
                  $("#c-polite_info").fadeOut(1500);
                }, 8000);
              }

            });

          },
          error: xhr => {
            console.log("[commons.js] Baratz.commons.onchangeContentLibraryBranch() -> Error:", Baratz.commons.infoAjaxUrl + values);
            $("#info").removeClass("in_view");
          }
        });
      }


      );
    }
  },

  //TODO Refactor																  
  /**
   * Metodo que limpia el valor de selects
   */
  borrarValoresSelectsSiguientes: (element) => {
    let select_changed_num = Number(element.attr("data-select_num"));
    const $cont = element.closest(".selects_dependientes_js");
    const $selects = $cont.find("select");
    const select_siguiente_num = select_changed_num + 1;
    const $select_siguiente = $cont.find(`[data-select_num="${select_siguiente_num}"`);
    const existeSelectSiguiente = ($select_siguiente.length > 0);

    if (existeSelectSiguiente) {
      for (let i = select_siguiente_num - 1; i < $('select[id^="solrSearch.subCatalog.subCatalogs"]').length; ++i) {

        $('select[id^="solrSearch.subCatalog.subCatalogs"]')[i].value = '';
      }
    }

  },
  //TODO refactor de changeSubCatalogInputValues & changeSelectedOption & borrarValoresSelectsSiguientes
  /**
   * Metodo que cambia los valores de los input para enviar en el formulario
   * 
   */
  changeSubCatalogInputValues: () => {

    /*$('input[id^="solrSearch.subCatalog.subCatalogs"]').remove();	    
        for (let i = 0; i < $('select[id^="solrSearch.subCatalog.subCatalogs"]').length; ++i) {		
            if( i > 0 && $('select[id^="solrSearch.subCatalog.subCatalogs"]')[i-1].value == ''){
                return false;
            }else{
              if($("#solrSearch")){
                $("#solrSearch").prepend('<input type="hidden" name="solrSearch.subCatalog.subCatalogs['+i+'].optionSelected" id="solrSearch.subCatalog.subCatalogs'+i+'.optionSelected" value="'+$('select[id^="solrSearch.subCatalog.subCatalogs"]')[i].value+'"/>');
              }
              if($("#abwxpAdvanced")){
                $("#abwxpAdvanced").prepend('<input type="hidden" name="solrSearch.subCatalog.subCatalogs['+i+'].optionSelected" id="solrSearch.subCatalog.subCatalogs'+i+'.optionSelected" value="'+$('select[id^="solrSearch.subCatalog.subCatalogs"]')[i].value+'"/>');

       }
            	
                  }
        }*/
  },
  /**
   *  Recarga el combo siguiente segun el valor del combo anterior desde Baratz.tmpls_actions.SELECTS_DEPENDIENTES
   *
   *  @method Baratz.commons.onChangeSelectAutoSearch
   *
   *  @param {dom object} $select : select afectado
   *
   *  @details las option con valores para el siguiente combo tienen la clase on-change
   */
  onChangeSelectAutoSearch: ($select) => {
    if ($select[0].id == 'solrSearch.origin') {
      localStorage.setItem('origenes', document.getElementById($select[0].id).value);
    }
    /**
     *  Convierte algo a str numero desde Baratz.commons.onChangeSelectAutoSearch????
     *
     *  @method getParameterByName
     *
     *  @param {string} name :
     *  @param {string} url :
     *
     *  @return {string} retorno: número en forma de string
     */
    const getParameterByName = (name, url) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
      const results = regex.exec(url);
      const retorno = (results === null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      return retorno;
    },
    
    /**
     *  Cambia el attr selected para las options de un select dado, a través del valor del select
     *
     *  @method changeSelectedOption
     *
     *  @param {dom object} $select: Select jquery afectado
     */
			
      changeSelectedOption = ($select) => {
        const new_value = $select.val();
        const $selected_option_old = $select.find('option[selected="selected"]');
        $selected_option_old.removeAttr("selected");
        const $selected_option = $select.find(`option[value="${new_value}"]`);
        $selected_option.attr("selected", "selected");

        Baratz.commons.borrarValoresSelectsSiguientes($select);

        //Baratz.commons.changeSubCatalogInputValues();


        var values = $('select[id^="solrSearch.subCatalog.subCatalogs"]').map(function (index) {
          return $(this).val();
        }).get().join(',');

        values = encodeURIComponent(values);

        $.ajax({
          url: Baratz.commons.recommendedAjaxUrl + values,
          type: "get",
          beforeSend: () => {
            $("#sct_recomendations").addClass("in view");
          },

          success: (response, status, jqXHR) => {

            $("#sct_recomendations").removeClass("in_view").replaceWith(response);
            Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
            Baratz.tmpls_actions.CTRL_VIEWS();
            Baratz.tmpls_actions.CAROUSEL();    				
            $(document).ready(function () {
            	Baratz.tmpls_actions.CTRL_VIEWS();
              //funcion timeout fin de carga de los más recientes
              if (typeof $recomendations !== "undefined" && $recomendations.length != 0) {
                timeOutActualizaText = setTimeout(function () {
                  $("#c-polite_recomendarions").fadeOut(1500);
                }, 8000);
              }

            });

          },
          error: xhr => {
            console.log("[commons.js] Baratz.commons.onchangeContentLibraryBranch() -> Error:", Baratz.commons.recommendedAjaxUrl + values);
            $("#sct_recomendations").removeClass("in_view");
          }
        });

        $.ajax({
          url: Baratz.commons.mostRecentAjaxUrl + values,
          type: "get",
          beforeSend: () => {

            $("#sct_other").addClass("in view");
          },
          success: (response, status, jqXHR) => {

            $("#sct_other").removeClass("in_view").replaceWith(response);
            Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
            Baratz.tmpls_actions.CAROUSEL();
            Baratz.tmpls_actions.CTRL_VIEWS();

            $(document).ready(function () {
              //funcion timeout fin de carga de los más recientes

              if (typeof $other !== "undefined" && $other.length != 0) {

                timeOutActualizaText = setTimeout(function () {
                  $("#c-polite_other").fadeOut(1500);
                }, 8000);

              }

            });

          },
          error: xhr => {
            item.log("[commons.js] Baratz.commons.onchangeContentLibraryBranch() -> Error:", Baratz.commons.mostRecentAjaxUrl + values);
            $("#sct_other").removeClass("in_view");
          }
        });


        $.ajax({
          url: Baratz.commons.infoAjaxUrl + values,
          type: "get",
          beforeSend: () => {

            $("#info").addClass("in view");
          },
          success: (response, status, jqXHR) => {

            $("#info").removeClass("in_view").replaceWith(response);
            Baratz.tmpls_actions.FALLBACK_IMAGES(".img_on_load");
            Baratz.tmpls_actions.CAROUSEL();
            Baratz.tmpls_actions.CTRL_VIEWS();

            $(document).ready(function () {
              //funcion timeout fin de carga de los enlaces
              if (localStorage.getItem('origenes') && document.getElementById('solrSearch.origin')) {
                var origenes = localStorage.getItem('origenes');
                document.getElementById('solrSearch.origin').value = origenes;
              }
              if (typeof $info !== "undefined" && $info.length != 0) {

                timeOutActualizaText = setTimeout(function () {
                  $("#c-polite_info").fadeOut(1500);
                }, 8000);
              }

            });

          },
          error: xhr => {
            item.log("[commons.js] Baratz.commons.onchangeContentLibraryBranch() -> Error:", Baratz.commons.infoAjaxUrl + values);
            $("#info").removeClass("in_view");
          }
        });

      };

    const valor = $select.val();
    // Cambia el attr selected al option del nuevo valor
    changeSelectedOption($select);
    // las option con valores para el siguiente combo tienen la clase on-change
    const $selected_option = $select.find(`option[value="${valor}"]`);
    const launch = $selected_option.hasClass('on-change');
    let select_changed_num = Number($select.attr("data-select_num"));
    const $cont = $select.closest(".selects_dependientes_js");
    const $selects = $cont.find("select");
    //var selects_size=$selects.length;
    // A partir del combo cambiado, se deshabilitan los demás inicialmente
    Baratz.tmpls_actions.SELECTS_DEPENDIENTES.restoDisabled($selects, select_changed_num);
    // si es una option que debe mostrar valores en el combo siguiente
    if (launch) {
      $.ajax({
        url: Baratz.commons.subCataOptionsUrl,
        type: "get",
        data: {
          combo: select_changed_num,
          code: valor
        },
        success: (response, status, jqXHR) => {
          // 201211 TODO Si ya tenemos el data-select_num del combo afectado ¿para que se necesita esto?
          //select_changed_num=parseInt(getParameterByName('combo',Baratz.commons.subCataOptionsUrl),10);
          const select_siguiente_num = select_changed_num + 1;
          const $select_siguiente = $cont.find(`[data-select_num="${select_siguiente_num}"`);
          const existeSelectSiguiente = ($select_siguiente.length > 0);
          // si existe en el contenedor se carga con los datos recibidos
          if (existeSelectSiguiente) {
            Baratz.tmpls_actions.SELECTS_DEPENDIENTES.destroyPicker($select_siguiente);
            $select_siguiente.html(response);
            // Si hay dos opciones y una de ellas es "Todos los subcatálogos" con valor="",
            // se selecciona en la vista la otra opcion y la primera desaparece
            const $options = $select_siguiente.find("option");
            const num_options = $options.length;
            if (num_options === 2 && $options.eq(0).val() === "") {
              // el nuevo value del select es la primera opcion
              let new_val = $options.eq(0).val();
              // Si el select dependiente no tiene la clase '.con_literal_subcatalogo', la opcion Todos los subcatálogos se oculta
              // y se proporciona inicialmente al select el value de la siguiente opcion
              if (!$select_siguiente.hasClass("con_literal_subcatalogo")) {
                $options.eq(0).addClass("oculto");
                new_val = $options.eq(1).val();
              }
              $select_siguiente.val(new_val);
            }
            // Cambia el attr selected al option del valor
            changeSelectedOption($select_siguiente);
            // si hay mas de 9 option, se pinta el cuadro live-search en el despliegue del select
            $select_siguiente.attr("data-live-search", "false");
            if (num_options > 9) {
              $select_siguiente.attr("data-live-search", "true");
            }
            // quita disabled si existe
            Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_remove_disabled($select_siguiente);
            Baratz.tmpls_actions.SELECTS_DEPENDIENTES.applyPicker($select_siguiente);
            $select_siguiente.closest(".cont_selectPicker").find(".dropdown-toggle").focus();
          }
          else {
            item.log("[commons.js] Baratz.commons.onChangeSelectAutoSearch() El combo ", select_siguiente_num, " no existe en el contenedor ", $cont);
          }
        },
        error: xhr => {
          item.log("[commons.js] Baratz.commons.onChangeSelectAutoSearch() -> Error:", Baratz.commons.subCataOptionsUrl);
        }
      });
    }
  },

  /**
   *  Gestiona el envío de email para compartir (desde listas, detalle del item)
   *
   *  @method Baratz.commons.mailTo
   *
   *  @param {object} datos_modal: datos de la modal
   *  @param {object} event: evento desencadenado
   *
   *  @details Se lanza desde Baratz.tmpls_actions.MODALES_JS
   */
  mailTo: (datos_modal, event) => {

    /**
     *  Acciones sobre los campos del formulario compartir por email
     *
     *  @cont email
     */
    const email = {

      /**
       *  Valida que un string dado tenga formato de mail
       *
       *  @method email.validar
       *
       *  @param {string} sTesteo  : string a validar
       *
       *  @return {bool} si el string cumple o no la validación
       */
      validar: sTesteo => {
        //var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
        const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reEmail.test(sTesteo);
      },

      /**
       *  Acciones sobre campos con error
       *
       *  @cont email.error
       */
      error: {
        /**
         *  Pinta un campo como erroneo, desmarcándolo al entrar el foco
         *
         *  @method email.error.marca
         *
         *  @param {dom object} $recipientEmail  : campo a marcar
         */
        marca: $recipientEmail => {
          $recipientEmail.closest(".cont_form_group").addClass("fail");
          $recipientEmail.on("focusin", () => {
            email.error.desmarca($recipientEmail);
          });
        },

        /**
         *  Desmarca un campo como errorneo marcado previamente
         *
         *  @method email.error.desmarca
         *
         *  @param {dom object} $recipientEmail  : campo a desmarcar
         */
        desmarca: $recipientEmail => {
          $recipientEmail.closest(".cont_form_group").removeClass("fail");
        }
      }
    };

    ///////////////////////////
    // INICIALIZACION
    ///////////////////////////
    const $form = datos_modal.$modal.find("form");
    const $cont_alert = $form.find(".alert");
    Baratz.tmpls_actions.ALERTA.oculta($cont_alert);
    const $recipientEmail = $form.find('[name="recipientEmail"]');
    const recipientEmail_val = $recipientEmail.val();
    // si el campo no tiene contenido
    let textos;
    if (recipientEmail_val === "") {
      textos = {
        titulo: Baratz.i18n_js.alerta.mailTo_error_title,
        texto: [Baratz.i18n_js.alerta.mailTo_error_text_mail_blank]
      };
      Baratz.tmpls_actions.ALERTA.error($cont_alert, textos);
      return false;
    }
    else {
      const validaEmail = email.validar(recipientEmail_val);
      // si no valida el formato de mail
      if (!validaEmail) {
        textos = {
          titulo: Baratz.i18n_js.alerta.mailTo_error_title,
          texto: [Baratz.i18n_js.alerta.mailTo_error_text_mail_invalid]
        };
        Baratz.tmpls_actions.ALERTA.error($cont_alert, textos);
        email.error.marca($recipientEmail);
        return false;
      }
    }
    // desmarca errores del campo mail
    email.error.desmarca($recipientEmail);
    // lanza peticion pintando icono de progreso
    Baratz.tmpls_actions.ALERTA.progreso($cont_alert);
    const urlMail = $form.attr("action");
    const datos_envio = $form.serialize();
    $.post(urlMail, datos_envio, (data, estado, xhr) => {
      let textos;
      switch (estado) {
        case "success": {
          textos = {
            titulo: Baratz.i18n_js.alerta.mailTo_success_title,
            texto: [Baratz.i18n_js.alerta.mailTo_success_text]
          };
          Baratz.tmpls_actions.ALERTA.exito($cont_alert, textos);
          $form.find('[type="submit"]').detach();
        }
          break;
        case "error": {
          textos = {
            titulo: Baratz.i18n_js.alerta.mailTo_error_title,
            texto: [Baratz.i18n_js.alerta.mailTo_error_text]
          };
          Baratz.tmpls_actions.ALERTA.error($cont_alert, textos);
        }
          break;
        default:

      }
    });
  },

  /**
   *  Contenedor de acciones para los botones 'Favoritos' para un user normal, admin, manager
   *
   *  @cont Baratz.commons.favorites
   *
   *  @details Los botones 'favoritos' ('.btn_favorite') tienen la clase '.btn_message_js',
   *           gestionándose en paralelo desde [scripts.js] -> Baratz.tmpls_actions.BTN_MESSAGE()
   */

  favorites: {

    /**
     *  Contenedor de textos para el botón 'Favoritos'
     *
     *  @obj Baratz.commons.favorites.text
     */
    text: {
      //text_insert : Baratz.i18n_js.search.fav_button_text_insert,
      //text_delete : Baratz.i18n_js.search.fav_button_text_delete,
    },

    /**
     *  Pintado y acciones para los botones 'Favoritos'
     *
     *  @cont Baratz.commons.favorites.btn
     */
    btn: {
      /**
       *  Cambia los textos en un botón activado
       *
       *  @method Baratz.commons.favorites.btn.active
       *
       *  @param {dom object} $btn  : Botón afectado
       */
      active: $btn => {
      	
        const message = $btn.attr("data-message_activo");
        $btn.addClass("active");
        const page_link_text = (Baratz.commons.favorites.text.text_delete) ? Baratz.commons.favorites.text.text_delete.split(" ")[0] : "";
        Baratz.commons.favorites.btn.pinta_texto($btn, message, page_link_text);
      },

      /**
       *  Cambia los textos en un botón desactivado
       *
       *  @method Baratz.commons.favorites.btn.deactive
       *
       *  @param {dom object} $btn  : Botón afectado
       */
      deactive: ($btn, type) => {
      	
        let message = $btn.attr("data-title_initial");
        if (type === "deleted") {
          $btn.addClass("item_deleted");
        }
        if ($btn.hasClass("item_deleted")) {
          message = $btn.attr("data-message_no_activo");
        }
        $btn.removeClass("active");
        const page_link_text = (Baratz.commons.favorites.text.text_insert) ? Baratz.commons.favorites.text.text_insert.split(" ")[0] : "";
        Baratz.commons.favorites.btn.pinta_texto($btn, message, page_link_text);
      },

      /**
       *  Pinta un texto dado en un botón dado (title y aria), y otro texto en .page-link_title
       *
       *  @method Baratz.commons.favorites.btn.pinta_texto
       *
       *  @param {dom object} $btn  : Botón afectado
       *  @param {string} message   : Texto a pintar en aria-label y title
       *  @param {string} page_link_text   : Texto para .page-link_title
       */
      pinta_texto: ($btn, message, page_link_text) => {
       
        $btn.attr({
          "aria-label": message,
          "title": message,
        });
        const isInSummaryActions = ($btn.closest(".summary-actions").length === 1);
        if (!isInSummaryActions) {
          const $btn_label = $btn.find(".btn_title");
          if ($btn_label.length > 0) {
            //$btn_label.text(page_link_text);
            $btn_label.text(message);
          }
        }
      },
      /**
       *  Para botones con limite (.btn_favorite.btn_limite_alcanzado), asocia los literales title correctos a traves de los data necesarios
       *
       *  @method Baratz.commons.favorites.btn.limit_check
       *
       *  @param {dom object} $btn  : boton afectado
       */
      limit_check: $btn => {
      	
        const fav_limit = parseInt($btn.attr("data-fav-limit"), 10);
        const fav_size = parseInt($btn.attr("data-fav-size"), 10);
        const $ul = $btn.closest("ul");
        if (fav_size >= fav_limit) {
          // Aplica clase 'limite alcanzado' a todos los botones
          $ul.find(".btn_favorite").addClass("btn_limite_alcanzado");
          // Pinta literal 'límite superado' en los botones no activos
          const $btns_limite_alcanzado_no_active = $ul.find(".btn_favorite.btn_limite_alcanzado").not(".active");
          $btns_limite_alcanzado_no_active.each(function () {
            const $btn = $(this);
            const message_no_active = $btn.attr("data-message_limit_warning");
            Baratz.commons.favorites.btn.pinta_texto($btn, message_no_active, message_no_active);
          });
        }
        else {
          // Quita clase 'límite alcanzado' de todos los botones
          const $btns_limite_alcanzado = $ul.find(".btn_favorite.btn_limite_alcanzado");
          $btns_limite_alcanzado.removeClass("btn_limite_alcanzado");
          const $btns_no_active = $ul.find(".btn_favorite").not(".active");
          $btns_no_active.each(function () {
            Baratz.commons.favorites.btn.deactive($(this));
          });
        }
      },
    },

    /**
     *  Se lanza una petición para guardar/borrar a través de un botón dado
     *
     *  @method Baratz.commons.favorites.actionURL
     *
     *  @param {dom object} $btn  : Botón afectado
     *  @param {string} action    : Acción a realizar
     */
    actionURL: ($btn, action) => {
    	
      const data_id = $btn.attr("data-id");
      const url = Baratz.commons.favoriteUrl;
      const $form = $btn.next();
      var id = $form.find('[name="id"]').val() || $btn.attr("data-id");
      $.ajax({
        url: url,
        type: "POST",
        headers: {
          'X-CSRF-TOKEN': $(document.body).find('[name="_csrf"]').eq(0).val(),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          action: action,
          id
        }),
        success: data => {
          const isActive = $btn.hasClass("active");
          if (isActive) {
            Baratz.commons.record.record_button.deactive($btn, "deleted");
          }
          else {
            Baratz.commons.record.record_button.active($btn);
          }
          Baratz.commons.favorites.changeFavSize($btn, action);
        },
        error: (a, b) => {
          item.log(a, b);
        }
      });
    },


    /**
     *  Gestiona petición para añadir/borrar y lanza modal de aviso si se supera el número max
     *
     *  @method Baratz.commons.favorites.manager
     *
     *  @param {dom object} $btn  : Botón afectado
     *
     *  @details En caso de superar el límite máximo a añadir, se muestra una modal de aviso
     */
    manager: async ($btn) => {
    
      const data_id = $btn.attr("data-id");
      if (typeof data_id !== "undefined") {
        let action = true;
        const isActive = $btn.hasClass("active");
        if (isActive) {
          // Si el botón está activo, se envia delete a la fn actionURL
          action = false;
          await Baratz.commons.favorites.actionURL($btn, action);
        }
        else {
          const fav_limit = parseInt($btn.attr("data-fav-limit"), 10);
          const fav_size = parseInt($btn.attr("data-fav-size"), 10);
          // Si no está activo, se controla el límite antes de añadir el elemento a 'Favoritos'
          if (fav_size >= fav_limit) {
            const $cont = $(document.body);
            const modal_title = Baratz.tmpls_actions.UTILS.traduccion_en_params(Baratz.i18n_js.search.fav_modalTitle, [fav_limit, fav_size]);
            // crea modal
            const modal = `<div id="modal_alert" class="modal_js modal_type_danger modal fade" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
              <div class="modal-dialog modal-md modal-dialog-scrollable" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 id="modalTitle" class="modal-title font-weight-bold">${modal_title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="alert alert-danger fade show mb-0" role="alert" aria-atomic="true">
                      <span class="alert_texto">${$btn.attr("data-fav-message")}</span>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">${Baratz.i18n_js.search.fav_modal_btn_aceptar}</button>
                  </div>
                </div>
              </div>
            </div>`;
            $cont.append(modal);
            const $modal = $cont.find("#modal_alert");
            $modal.on({
              // cuando ya está abierta
              'shown.bs.modal': () => {
                $modal.find(".close").focus();
                // Evita el cierre del dropdown de ultimas busquedas del menu header al hacer click cuando la modal está abierta
                $modal.on("click", function (e) {
                  return false;
                });
                // cierra la modal en los botones dismiss
                $modal.find('[data-dismiss="modal"]').off("click").on("click", function () {
                  $modal.modal("hide");
                  return false;
                });
              },
              // cuando ya está cerrada
              'hidden.bs.modal': () => {
                // foco en el boton de lanzamiento
                $btn.focus();
                $modal.remove();
              }
            });
            $modal.modal("show");

            return false;
          }
          else {
            // Si está dentro de límites, se guarda el elemento en 'Favoritos'
            Baratz.commons.favorites.actionURL($btn, action);
          }
        }
      }
      else {
        item.log("[commons.js] Baratz.commons.favorites.manager:::: data-id no definido");
      }
    },

    /**
     *  Dado un botón, aplica operaciones para determinar el data-fav-size y aplica el resultado en dicho attr
     *  Recorre el body para cambiar todos los data-fav-size en los botones 'Favoritos' de la vista
     *
     *  @method Baratz.commons.favorites.changeFavSize
     *
     *  @param {dom object} $btn : Botón 'Favorito' afectado
     *  @param {bool} add        : Operación a realizar
     *                - (true) suma una unidad
     *                - (false) resta una unidad
     */
    changeFavSize: ($btn, add) => {
    
      let fav_size = parseInt($btn.attr('data-fav-size'), 10);
      fav_size = (add) ? fav_size + 1 : fav_size - 1;
      // Recorre el body para cambiar todos los data-fav-size en los botones
      const $btn_fav_size = $(document.body).find("button[data-fav-size]");
      if ($btn_fav_size.length > 0) {
        $btn_fav_size.each((i, e) => {
          $(e).attr('data-fav-size', fav_size);
        });
      }
      Baratz.commons.favorites.btn.limit_check($btn);
    },

  },

  /**
   *  Contenedor de acciones para los botones 'Guardar Búsqueda' para un user normal
   *
   *  @cont Baratz.commons.record
   *
   *  @details Los botones 'Guardar Búsqueda' ('.btn_record') tienen la clase '.btn_message_js',
   *           gestionándose en paralelo desde [scripts.js] -> Baratz.tmpls_actions.BTN_MESSAGE()
   */
  record: {

    /**
     *  Contenedor de textos para el botón 'Guardar Búsqueda'
     *
     *  @obj Baratz.commons.record.text
     *
     *  @detail Los textos ya se encuentran definidos en el boton
     *            data-message_activo     : "Guardado en búsquedas guardadas"
     *            data-message_no_activo  : "El elemento ya existe en búsquedas guardadas"
     *            data-title_initial      : "Guardar búsqueda"
     */
    text: {
      text_insert: "",
      text_delete: "",
    },

    /**
     *  Pintado y acciones para los botones 'Guardar Búsqueda'
     *
     *  @cont Baratz.commons.record.record_button
     */
    record_button: {
      /**
       *  Para botones con limite (.btn_record.btn_limite_alcanzado), asocia los literales title correctos a traves de los data necesarios
       *
       *  @method Baratz.commons.record.record_button.limit_check
       *
       *  @param {dom object} $btn  : boton afectado
       */
      limit_check: $btn => {
        const record_limit = parseInt($btn.attr("data-record-limit"), 10);
        const record_size = parseInt($btn.attr("data-record-size"), 10);
        const $ul = $btn.closest("ul");
        if (record_size >= record_limit) {
          // Aplica clase 'limite alcanzado' a todos los botones
          $ul.find(".btn_record").addClass("btn_limite_alcanzado");
          // Pinta literal 'límite superado' en los botones no activos
          const $btns_limite_alcanzado_no_active = $ul.find(".btn_record.btn_limite_alcanzado").not(".active");
          $btns_limite_alcanzado_no_active.each(function () {
            const $btn = $(this);
            const message_no_active = $btn.attr("data-message_limit_warning");
            Baratz.commons.record.record_button.pinta_texto($btn, message_no_active);
          });
        }
        else {
          // Quita clase 'límite alcanzado' de todos los botones
          const $btns_limite_alcanzado = $ul.find(".btn_record.btn_limite_alcanzado");
          $btns_limite_alcanzado.removeClass("btn_limite_alcanzado");
          const $btns_no_active = $ul.find(".btn_record").not(".active");
          $btns_no_active.each(function () {
            Baratz.commons.record.record_button.deactive($(this));
          });
        }
      },

      /**
       *  Activa el botón dado
       *
       *  @method Baratz.commons.record.record_button.active
       *
       *  @param {dom object} $btn  : Botón afectado
       */
      active: $btn => {
        const message = $btn.attr("data-message_activo");
        $btn.addClass("active");
        Baratz.commons.record.record_button.pinta_texto($btn, message);
      },

      /**
       *  Desactiva el botón dado
       *
       *  @method Baratz.commons.record.record_button.deactive
       *
       *  @param {dom object} $btn  : Botón afectado
       */
      deactive: ($btn, type) => {
        let message = $btn.attr("data-title_initial");
        if (type === "deleted") {
          $btn.addClass("item_deleted");
        }
        if ($btn.hasClass("item_deleted")) {
          message = $btn.attr("data-message_no_activo");
        }
        $btn.removeClass("active");
        Baratz.commons.record.record_button.pinta_texto($btn, message);
      },

      /**
       *  Pinta un texto dado en un botón dado (title, aria y texto en boton)
       *
       *  @method Baratz.commons.record.record_button.pinta_texto
       *
       *  @param {dom object} $btn  : Botón afectado
       *  @param {string} message   : Texto a pintar
       */
      pinta_texto: ($btn, message) => {
        $btn.attr({
          "aria-label": message,
          "title": message,
        });
        const $btn_label = $btn.find(".btn_title");
        if ($btn_label.length > 0) {
          $btn_label.text(message);
        }
      },


    },

    /**
     *  Se lanza una petición para guardar/borrar a través de un botón dado
     *
     *  @method Baratz.commons.record.actionURL
     *
     *  @param {dom object} $btn  : Botón 'Guardar Búsqueda' afectado
     *  @param {string} action    : Acción a realizar
     */
    actionURL: ($btn, action) => {
      const data_id = $btn.attr("data-id");
      const url = Baratz.commons.recordUpdateUrl;
      const $form = $btn.next();
      const _csrf = $("[name*='_csrf']").val();
      var tabId = $form.find('[name="tabId"]').val() || $btn.attr("data-id");
      $.ajax({
        url: url,
        type: "POST",
        headers: {
          'X-CSRF-TOKEN': _csrf,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          action: action,
          tabId
        }),
        success: data => {
          const isActive = $btn.hasClass("active");
          if (isActive) {
            Baratz.commons.record.record_button.deactive($btn, "deleted");
          }
          else {
            Baratz.commons.record.record_button.active($btn);
          }
          Baratz.commons.record.changeRecSize($btn, action);
        },
        error: (a, b) => {
          item.log(a, b);
        }
      });
    },

    /**
     *  Gestiona petición para añadir/borrar y lanza modal de aviso si se supera el número max
     *
     *  @method Baratz.commons.record.manager
     *
     *  @param {dom object} $btn  : Botón afectado
     *
     *  @details En caso de superar el límite máximo a añadir, se muestra una modal de aviso
     */
    manager: $btn => {
      const data_id = $btn.attr("data-id");
      if (typeof data_id !== "undefined") {
        let action = true;
        const isActive = $btn.hasClass("active");
        // Si el botón está activo, se envia delete a la fn actionURL
        if (isActive) {
          // @TODO: Segun revision de operativa si no se necesita el borrado a través del boton de mensajes multiples, efectuar un return de prueba desde aqui


          action = false;
          Baratz.commons.record.actionURL($btn, action);
        }
        // Si no está activo, se controla el límite antes de añadir el elemento a 'Búsquedas guardadas'
        else {
          const record_limit = parseInt($btn.attr("data-record-limit"), 10);
          const record_size = parseInt($btn.attr("data-record-size"), 10);
          if (record_size >= record_limit) {
            // alert($btn.attr("data-fav-message"));
            const $cont = $(document.body);
            // Traduce parámetros
            const modal_title = Baratz.tmpls_actions.UTILS.traduccion_en_params(Baratz.i18n_js.search.record_modalTitle, [record_limit, record_size]);
            // crea modal
            const modal = `<div id="modal_alert" class="modal_js modal_type_danger modal fade" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
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
                      <span class="alert_texto">${$btn.attr("data-record-message")}</span>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">${Baratz.i18n_js.search.fav_modal_btn_aceptar}</button>
                  </div>
                </div>
              </div>
            </div>`;
            $cont.append(modal);
            const $modal = $cont.find("#modal_alert");
            // Asocia eventos
            $modal.on({
              // cuando ya está abierta
              'shown.bs.modal': () => {
                $modal.find(".close").focus();
                // Evita el cierre del dropdown de ultimas busquedas del menu header al hacer click cuando la modal está abierta
                $modal.on("click", function (e) {
                  return false;
                });
                // cierra la modal en los botones dismiss
                $modal.find('[data-dismiss="modal"]').off("click").on("click", function () {
                  $modal.modal("hide");
                  return false;
                });
              },
              // cuando ya está cerrada
              'hidden.bs.modal': () => {
                // foco en el boton de lanzamiento
                $btn.focus();
                $modal.remove();
              }
            });
            // Pinta la modal
            $modal.modal("show");
            return false;
          }
          else {
            // Si está dentro de límites, se guarda el elemento en 'Búsquedas guardadas'
            Baratz.commons.record.actionURL($btn, action);
          }
        }
      }
      else {
        item.log("[commons.js] Baratz.commons.record.manager:::: data-id no definido >>> $btn", $btn);
      }
    },

    /**
     *  Dado un botón, aplica operaciones para determinar el data-record-size y aplica el resultado en dicho attr
     *  Recorre el body para cambiar todos los data-record-size en los botones 'Guardar Búsqueda' de la vista
     *
     *  @method Baratz.commons.record.changeRecSize
     *
     *  @param {dom object} $btn : Botón 'Guardar Búsqueda' afectado
     *  @param {bool} add        : Operación a realizar
     *                - (true) suma una unidad
     *                - (false) resta una unidad
     */
    changeRecSize: ($btn, add) => {
      let rec_size = parseInt($btn.attr('data-record-size'), 10);
      rec_size = (add) ? rec_size + 1 : rec_size - 1;
      // Recorre el body para cambiar todos los data-fav-size en los botones
      const $btn_rec_size = $(document.body).find("button[data-record-size]");
      if ($btn_rec_size.length > 0) {
        $btn_rec_size.each((i, e) => {
          $(e).attr('data-record-size', rec_size);
        });
      }
      Baratz.commons.record.record_button.limit_check($btn);
    },

  },

  /**
   *  Acciones para la modal 'Añadir título a una lista' para un user normal
   *
   *  @cont Baratz.commons.titlesList
   */
  titlesList: {

    /**
     *  Añade un item a una lista
     *
     *  @method Baratz.commons.titlesList.add
     *
     *  @param {object} modales      : Array de mmodales de la página para efectuar posibles cambios a nivel objeto
     *  @param {object} datos_modal  : Datos de la modal donde se encuentra el formulario
     *  @param {string} event        : Description for event
     */
    add: (modales, datos_modal, event) => {
      const $myForm = datos_modal.$modal.find("form");
      const $alert = $myForm.find(".alert-process");
      Baratz.tmpls_actions.ALERTA.oculta($alert);
      const $selectMyList = $myForm.find("select.selectMyList");
      let validate = true;
      const type_list = datos_modal.$modal.find(".addTitleListItem").attr("data-type_list");
      const $selectMyList_options = $selectMyList.find("option");
      // genera array con los valores de los options para evaluar más adelante
      let myList = [];
      $selectMyList_options.each((i, e) => {
        const $option = $(e);
        const option_val = $option.val();
        if (option_val !== "") {
          myList.push(parseInt(option_val, 10));
        }
      });
      // validaciones
      const form_object = Baratz.tmpls_actions.UTILS.form2object($myForm);
      if (form_object.idList === "" && type_list === "old") {
        validate = false;
      }
      if (form_object.listName === "" && type_list === "new") {
        validate = false;
      }
      if (!validate) {
        // Si no valida pinta mensaje
        Baratz.tmpls_actions.ALERTA.oculta($alert);
        let message = "[commons.js] Baratz.commons.titlesList.add() ERROR sin tipo lista";
        if (type_list === "old") {
          message = Baratz.i18n_js.alerta.titleList_error_old_no_select;
        }
        if (type_list === "new") {
          message = Baratz.i18n_js.alerta.titleList_error_new_input_null;
        }
        const textos = {
          titulo: "",
          texto: [message]
        };
        Baratz.tmpls_actions.ALERTA.error($alert, textos);
      }
      else {
        // Si valida, envia
        const datos_envio = $myForm.serialize();
        $.post(Baratz.commons.addTitleListItemUrl, datos_envio, (data, estado, xhr) => {
          let textos;
          switch (estado) {
            case "success": {
              if (data.error != null) {
                textos = {
                  titulo: "",
                  texto: [data.error]
                };
                Baratz.tmpls_actions.ALERTA.error($alert, textos);
              }
              else {
                textos = {
                  titulo: "",
                  texto: [Baratz.i18n_js.alerta.titleList_success_text]
                };
                Baratz.tmpls_actions.ALERTA.exito($alert, textos);
                datos_modal.$lanzador.addClass("active");
                // añade un nuevo option en el select de la modal, ya que ésta está en la vista
                if ($.inArray(data.id, myList) === -1) {
                  $selectMyList.each((i, e) => {
                    const $select = $(e);
                    $select.selectpicker("destroy");
                    $select.append(`<option value="${data.id}">${data.name}</option>`);
                    $select.selectpicker("refresh");
                  });
                }

                // Pinta en la vista el item como nuevo añadido con su boton borrar
                const $contentMyList = datos_modal.$modal.find(".content_myList");
                const $cont_list = $contentMyList.find("ul");
                //var list_id = data.items[0].titleId +"_"+data.id;
                const new_item_list = `<li class="list_item">
                  <span class="list_title">${Baratz.tmpls_actions.UTILS.encodeHTMLentities(data.name)}</span>
                  <button type="button" data-listid="${data.id}" data-itemid="${data.items[0].titleId}" class="deleteTitleListItem btn btn-secondary" title="${Baratz.i18n_js.search.deleteTitleListItem}" aria-label="${Baratz.i18n_js.search.deleteTitleListItem}">
                      <span class='icono fas fa-trash' aria-hidden='true' ></span>
                  </button>
                </li>`;
                const $new_item_list = $(new_item_list);
                $cont_list.append($new_item_list);
                $new_item_list.find("button").on("click", event => {
                  Baratz.commons.titlesList.remove(datos_modal, data.id, event);
                  return false;
                });
                if ($contentMyList.hasClass("d-none")) {
                  $contentMyList.removeClass("d-none").addClass("d-flex flex-column col-md-12 mb-3");
                }
                // Si la lista es nueva, se inserta en los selects de los items de la página
                if (type_list === "new") {
                  // recorre el array de modales, para insertar la nueva lista (nuevo option)
                  modales.forEach((e, i) => {
                    const $select = $(e.$modal).find("select.selectMyList");
                    // options del select en un array
                    const options_val_arr = $select.find("option").map(function () { return this.value; }).get();
                    if ($.inArray(`${data.id}`, options_val_arr) === -1) {
                      $select.selectpicker("destroy");
                      $select.append(`<option value="${data.id}">${data.name}</option>`);
                      $select.selectpicker("refresh");
                    }
                  });
                }
              }
              // Si la vista es la de la lista (Mis listas) y el item está marcado como borrado, se desmarca
              // A cerrar la modal, se borra del dom
              const $cont_data_loans = $(document.body).find(".cont_data_loans");
              if ($cont_data_loans.length == 1) {
                const $loans_listid = $cont_data_loans.find(`[data-loans_listid="${data.id}"]`);
                if ($loans_listid.length == 1) {
                  $loans_listid.find(".backdrop_delete").remove();
                  // control para recargar la página si hay acciones de insercion / borrado / modificacion
                  datos_modal.myListAction = false;
                }
              }
            }
              break;
            case "error": {
              textos = {
                titulo: "",
                texto: [Baratz.i18n_js.alerta.titleList_error_text]
              };
              Baratz.tmpls_actions.ALERTA.error($alert, textos);
            }
              break;
            default:

          }
        });
      }
    },
    /* remove a list from my list page*/
    deleteListfromListPage: (datos_modal, listId, even, btn, uri) => {
      const $myForm = datos_modal[0].$lanzador.next();
      const $alert = $myForm.find(".alert-process");
      const listIde = uri.split('=')[1];
      const fcsrf = $myForm.find('[name="_csrf"]').val();
      const btn_close = btn.prev();

      btn.on('click', function () {
        $.ajax({
          url: `${Baratz.commons.deleteListfromListPage}`,
          type: 'POST',
          headers: {
            'X-CSRF-TOKEN': fcsrf,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            idList: listIde,
          }),
          success: data => {
            btn_close.click();
            if ($("li[data-id='" + listIde + "']")) {
              $("li[data-id='" + listIde + "']").remove();
            }
            return false;
          },
          error: (a, b) => {
            item.log(a, b);
          }
        })
      })
    },
    /**
     *  Elimina un item de una lista y en el dom
     *
     *  @method Baratz.commons.titlesList.remove
     *
     *  @param {object} datos_modal  : Datos de la modal donde se encuentra el formulario
     *  @param {string} listId       : Description for listId
     *  @param {string} event        : Description for event
     */
    remove: (datos_modal, listId, event) => {
      const $myForm = datos_modal.$modal.find("form");
      const $alert = $myForm.find(".alert-process");
      const idList = $myForm.find('[name="idList"]').val();
      const ttitleId = $myForm.find('[name="titleId"]').val();
      $.ajax({
        url: `${Baratz.commons.deleteTitleListItemUrl}`,
        type: 'POST',
        headers: {
          'X-CSRF-TOKEN': $myForm.find('[name="_csrf"]').val(),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          idList: listId,
          titleId: ttitleId
        }),

        success: result => {
          let textos;
          if (result.error !== null) {
            textos = {
              titulo: "",
              texto: [result.error]
            };
            Baratz.tmpls_actions.ALERTA.error($alert, textos);
          }
          else {
            textos = {
              titulo: "",
              texto: [Baratz.i18n_js.search.alert_removeTitleListItem_success]
            };
            Baratz.tmpls_actions.ALERTA.exito($alert, textos);
            const $ul = datos_modal.$modal.find(".content_myList");
            const $li = $ul.find(`[data-listid="${listId}"]`).closest("li");
            // si el numero de listas es 0 se quita el active del boton lanzador
            $li.remove();
            const hay_li = ($ul.find("li").length > 0);
            if (!hay_li) {

              datos_modal.$lanzador.removeClass("active");
            }
            // Si la vista es la de la lista, se marca el item como borrado
            const $cont_data_loans = $(document.body).find(".cont_data_loans");
            if ($cont_data_loans.length === 1) {
              const $loans_listid = $cont_data_loans.find(`[data-loans_listid="${listId}"]`);
              if ($loans_listid.length === 1) {
                const $backdrop = '<span class="backdrop_delete"></span>';
                datos_modal.$lanzador.closest("li").append($backdrop);
                // control para recargar la página si hay acciones de insercion / borrado / modificacion
                datos_modal.myListAction = true;
              }
            }
          }
        }
      });
    },

  },

  /**
   *  Guardado en cache para uso offline de las reservas del usuario
   *
   *  @method Baratz.commons.create_cacheLoans
   */
  create_cacheLoans: () => {
    // Definicion de tiempo hasta borrado de objeto en el localStorage en ms
    // https://www.convertworld.com/es/tiempo/milisegundos.html
    // 1 dia: 86400000 ms
    const ttl = 86400000;// 60000 1 minuto en ms
    const csrf = $(document.body).find('[name="_csrf"]').eq(0).val();
    const datos = {
      varname: "user_datos_logged",
      url: "reader/data/offline",
      extras: {
        csrf: csrf,
        ttl: ttl
      }
    };
    // Baratz.tmpls_actions.UTILS.ctrl_storage.save(datos);
  },


  /**
	*  Acciones y urls  para las opiniones, añadir, borrar, modificar, validar e invalidar, no logado, logado y manager
	*
	*  @cont Baratz.commons.opinions
	*/
  opinions: {
    /* urls para acciones de opiniones */
    /** Baratz.commons.opinions.listAjaxUrl */
    listAjaxUrl: Baratz.commons.context + 'catalog/detail/comments/list/',
    /** Baratz.commons.opinions.addAjaxUrl */
    addAjaxUrl: Baratz.commons.context + 'catalog/detail/comments/add/',
    /** Baratz.commons.opinions.deleteAjaxUrl */
    deleteAjaxUrl: Baratz.commons.context + 'catalog/detail/comments/delete',
    /** Baratz.commons.opinions.validateAjaxUrl */
    validateAjaxUrl: Baratz.commons.context + 'catalog/detail/comments/validate',
		
		/**
     *  Extrae _csrf y oaiidentifierB64 común para todos los post
     * 
     *  @method Baratz.commons.opinions.getCommonValues     
		 * 
     *  @return {object} payload inicial para todos los posts con 
    */
	  getCommonValues:()=>{
			let inputs = document.querySelectorAll('input');
			let csrfValue = null;
			let oaiIdentifierB64Value = null;			
			inputs.forEach((input, i) => {
			  if (input.name === '_csrf' && csrfValue === null) {
			    csrfValue = input.value;
			  }
			  if (input.name === 'oaiIdentifierB64' && oaiIdentifierB64Value === null) {
			    oaiIdentifierB64Value = input.value;
			  }
			});
			return {_csrf:csrfValue,oaiIdentifierB64:oaiIdentifierB64Value}
		},
		
    /**
     *  Añade una opinión
     * 
     *  @method Baratz.commons.opinions.add    
		 * 
     *  @param {Event} ev : evento del botón que lanza la modal
    */
    add:(ev)=>{
			const mform = document.querySelector('#add_comments').innerHTML;	
			document.querySelectorAll('.all-stars li').forEach((li)=>{
				li.classList.remove('selecteds');
			})
			let modal;
			if(document.querySelector('#modal_add_comment')){
				modal = document.querySelector('#modal_add_comment');
				modal.classList.add('d-blok', 'show');
				document.querySelector('.modal-backdrop.fade').classList.add('show');			
        $('.btn_cerrar').on('click',function(ev){
          Baratz.commons.opinions.button_cancel();
				});
				$('.comment-save-cancel').on('click', function (ev) { 
					ev.preventDefault();	
        });
			}else{
      	modal = Baratz.commons.opinions.modal('modal_add_comment', mform, Baratz.i18n_js.comment.add, 'light', 'add');
      	$(document.body).append(modal);
      	$('.btn_cerrar').on('click',function(ev){
          Baratz.commons.opinions.button_cancel();
				});
				$('.comment-save-cancel').on('click', function (ev) { 
					ev.preventDefault();	
          Baratz.commons.opinions.button_cancel()
        });
      }
      const modal_form = document.querySelector('#modal_add_comment form');
      const preparedata = function(){
	      const payload = Baratz.commons.opinions.getCommonValues();
				const _csrf = payload._csrf;
				const oaiid = payload.oaiIdentifierB64;
				let p = $("input[name='punctuation']:checked").val();	
				const punctuation = $( "#punctuation"+p ).val()? $( "#punctuation"+p ).val():0;
				const commentVO = {
						_csrf: _csrf,
						oaiIdentifierB64:oaiid,
						opinionline: modal_form.querySelectorAll('[name="opinionline"]')[0].value,
						opiniontext: modal_form.querySelectorAll('[name="opiniontext"]')[0].value,
						punctuation:punctuation
				} 
				for(let i=0;i<document.querySelectorAll('.modal_add_comment .all-stars >li').length;i++){
					if(p !== 0 && i<=p){
						$("modal_add_comment #punctuation"+i ).prop( "checked", true );
						document.querySelectorAll('modal_add_comment .all-stars >li')[i].classList.add('selecteds');				
					}			
				}	
				const validation = Baratz.commons.opinions.validatePattern(modal_form);
				if(validation.valid && punctuation!==0){
					modal_form.querySelector('#error-front-rating').classList.add('d-none');
					Baratz.commons.opinions.button_accept('añadir', Baratz.commons.opinions.addAjaxUrl, commentVO);
				}else{
					validation.errors.forEach(error=>{
						modal_form.querySelector(`#error-front-${error}`).innerHTML="";
						modal_form.querySelector(`#error-front-${error}`).append(Baratz.i18n_js.admin_catalog.alert_loadPath);						
					})
					if(punctuation===0){
						modal_form.querySelector('#error-front-rating').classList.remove('d-none');
					
					}
				}	
			}			
			modal_form.querySelector('#save-comments').addEventListener('click', function(){
				preparedata();
			});
	},
	
    /**
   * Elimina una opinión.
   *
   * Esta función se utiliza para eliminar una opinión en un contexto específico.
   *
   * @method Baratz.commons.opinions.delete
   * @param {Event} ev - El evento que desencadenó la eliminación de la opinión.
   * @param {boolean} det - Si viene desde opac-detail.init.js
   * @throws {Error} Se genera un error si ocurre un problema durante el proceso de eliminación.
   * @example
   * // Ejemplo de uso:
   * Baratz.commons.opinions.delete(event, false);
   */
    delete: (ev, det) => {
			det=det?det:false;
				let payload = Baratz.commons.opinions.getCommonValues();
	      const lanzador = ev.type && ev.type==='click'?$(ev.currentTarget):ev;
	      let ide = lanzador.modal_id?lanzador.modal_id.split('_')[3]:lanzador.attr('id');
	      let myForm;
	      if(!lanzador.modal_id && lanzador.hasClass('btn_admin')) {
					ide = lanzador[0].getAttribute('data-id');
	        myForm = document.querySelector('#commentsdel-admin_'+ide);
	      }else{		
	        myForm = document.querySelectorAll('#commentsdel')[0];
	      } 
	      const qp = `?id=${ide}&_csrf=${payload._csrf}&oaiIdentifierB64=${payload.oaiIdentifierB64}`;      
	      payload.id=Number(ide); 
	      if(document.getElementById('modal_delete_comment_' + ide)){
					$('body').addClass('modal-open');
	      	$('.modal-backdrop.fade').addClass('show');
	     		$('#modal_delete_comment_' + ide).addClass('fade','show','d-block');
	     		 Baratz.commons.opinions.buttonclick();
				}else{
				 let bodycontent = Baratz.commons.opinions.modal_body('borrar', ide, 'Borrar');
	      	 const modal = Baratz.commons.opinions.modal('modal_delete_comment_' + ide, bodycontent, Baratz.i18n_js.comment.delete, 'warning', 'delete');
	         $(document.body).append(modal);
	      	 Baratz.commons.opinions.buttonclick('eliminar',  ev.currentTarget.dataset.url+qp,payload);
			}// ev.currentTarget.dataset.url				
    },
    
    /**
    * Valida una opinión.
    *
    * Esta función se utiliza para validar una opinión en un contexto específico.
    *
    * @method Baratz.commons.opinions.validate
    * @param {object} ob - los datos del modal con el id único de la opinión que se va a validar.
    * @param {boolean} det - Si viene desde opac-detail.init.js
    * @throws {Error} Se genera un error si ocurre un problema durante el proceso de validación.
    * @example
    * // Ejemplo de uso:
    * Baratz.commons.opinions.validate(opinionId, true);
    */
    validate: (ob,det) => {
			det=(det)?true:false;
      ide = typeof(ob)==='object'?ob.type && ob.type==='click'?$(ob.currentTarget):ob.attr('data-id'):ob;  
      $('#commentsval >#id').val(Number(ide));
      form = typeof(ob)==='object' && !ob.type?ob.closest('td')[0].querySelector('form'):document.querySelector('#commentsval');    
      const page = form.querySelectorAll('[name="page"]')[0].value;
      let payload = Baratz.commons.opinions.getCommonValues();
      ide=typeof(ide)=='object'?ide.length===0?ide:ide[0].id:ide;
		  payload.id=Number(ide);
			payload.page = page;
		  const button = document.getElementById(ide);
			const textvalidate =  Baratz.commons.opinions.util.validateText(button);
			const buttonText =  Baratz.commons.opinions.util.validateButton(button);
			const actionConfirm = Baratz.commons.opinions.util.validateConfirm(button);
			const actionTitle = Baratz.commons.opinions.util.validateTitle(button);
			
						
      if(!det && typeof(ob)!=='object'){
				Baratz.commons.opinions.button_accept(textvalidate,Baratz.commons.opinions.validateAjaxUrl+'?id='+ide+'&oaiIdentifierB64='+payload.oaiIdentifierB64+'&page='+page+'&_csrf='+payload._csrf,payload);
			}else{
				if(document.querySelector('#modal_validate_comment_'+ide)){
					let vmodal = document.getElementById('modal_validate_comment_'+ide);
					vmodal.querySelector('.modal-body span').innerText = "";
					vmodal.querySelector('.modal-body span').innerText = actionConfirm;
					vmodal.querySelector('.btn_validar_comment').textContent="";
					vmodal.querySelector('.btn_validar_comment').textContent = buttonText;
					vmodal.classList.add('show');
					vmodal.classList.add('d-block');
					document.querySelector('.modal-backdrop').classList.add('show');
				}else{
					const bodycontent = document.querySelector('#modal_validate_comment').innerHTML;			
					const modal = Baratz.commons.opinions.modal('modal_validate_comment_' + ide, bodycontent, actionTitle, 'warning', textvalidate);
					$(document.body).append(modal);
					Baratz.commons.opinions.buttonclick(textvalidate,Baratz.commons.opinions.validateAjaxUrl+'?id='+ide+'&oaiIdentifierB64='+payload.oaiIdentifierB64+'&page='+page+'&_csrf='+payload._csrf,payload);
				}	   
    	}						
    },

	 /**
   *  Modifica una opinión    
	 * 
   *  @method Baratz.commons.opinions.update    
   *  @param {Event} ev - El evento que desencadenó la modificación de la opinión.
   *  @param {boolean} det - Si viene desde opac-detail.init.js
   */
    update: (ev, det) => {
      const form = ev.currentTarget.closest('form');
      const _csrf = form.querySelectorAll('[name="_csrf"]')[0].value;
      const id = Number(form.querySelectorAll('[name="id"]')[0].value);
      const action = form.action + '?id=' + id + '&_csrf=' + _csrf;
      $.ajax({
        url: action,
        type: "post",
        headers: {
          'X-CSRF-TOKEN': _csrf,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ _csrf: _csrf, id: id }),   //obtenemos el registro a modificar
        success: (response, status, jqXHR) => {
          if (response.indexOf('comments--form') >= 0) {
						if(document.getElementById('modal_update_comments_'+ id)){							
							document.getElementById('modal_update_comments_'+ id).classList.add('d-blok', 'show');
							document.getElementById('modal_update_comments_'+ id).classList.add('show');								
						}else{
	            const modal = Baratz.commons.opinions.modal('modal_update_comments_' + id, response, Baratz.i18n_js.comment.modify, 'light', 'update');
	            $(document.body).append(modal);
	           }
            const modal_ = document.getElementById('modal_update_comments_' + id);
            const modal_form = modal_.querySelector('form');
            const stars = modal_form.querySelectorAll(".all-stars > li");
            let p = $("input[name='punctuation']:checked").val();
						stars.forEach((star)=>{
							star.classList.remove('selecteds');		
							star.addEventListener('click', function(e){
								if(e.target && e.target.previousElementSibling && e.target.previousElementSibling.id!="" && e.target.previousElementSibling.id.split('punctuation')[1]!=='' ||e.target.previousElementSibling.id.split('punctuation')[1]!==undefined || e.target.previousElementSibling.id.split('punctuation')[1]!==null){
									p = Number(e.target.previousElementSibling.id.split('punctuation')[1]);		
									stars.forEach((star, i)=>{
										if(i+1<=p){
											star.classList.add('selecteds');
								  	}							
								  });									
								}
							});
						})
					  stars.forEach((star, i)=>{
							if(i+1<=p){
								star.classList.add('selecteds');
					  	}							
					  });							 
					        
            Baratz.commons.opinions.buttonclick();
            const preparepost = function () {
              const modal_ = document.getElementById('modal_update_comments_' + id);
              const modal_form = modal_.querySelector('form');
              const oaiid = modal_form.querySelector('#oaiIdentifierB64').value;
              const reader = modal_form.querySelectorAll("[name='reader']")[0].value; 
              let payload = {
                _csrf: _csrf,
                oaiIdentifierB64: oaiid,
                id: Number(id),
                reader: Number(reader),
                opinionline: modal_form.querySelectorAll('[name="opinionline"]')[0].value,
                opiniontext: modal_form.querySelectorAll('[name="opiniontext"]')[0].value,
                punctuation:  p?Number(p) : 1,
              }						
              Baratz.commons.opinions.button_accept('actualizar', Baratz.commons.opinions.addAjaxUrl, payload);
            }
            $('.comment-save').on('click', function () { 	
							const modal_form = document.querySelector('.modal.show form')
							const validation = Baratz.commons.opinions.validatePattern(modal_form);	
							if(validation.valid){
								 		preparepost();
							}else{
								validation.errors.forEach(error=>{
									modal_form.querySelector(`#error-front-${error}`).append(Baratz.i18n_js.admin_catalog.alert_loadPath);						
								})
							}	
            });
            $('.comment-save-cancel').on('click', function (ev) { 
							ev.preventDefault();	
              Baratz.commons.opinions.button_cancel()
            });
          } else {
            item.log(Baratz.i18n_js.i18n_js.manager.controlPost.error.text);
          }
        },
        error: xhr => {
          console.log('error ', xhr)
        }
      })
    },

    /**
     * Realiza la paginación de las opiniones y actualiza la vista en función de la URL proporcionada.
     *
     * Esta función se utiliza para cargar y mostrar opiniones paginadas en función de la URL proporcionada.
     *
     * @function pagination
     * @param {string} url - La URL de la solicitud GET para la paginación de opiniones.
     * @param {boolean} det - Si viene desde opac-detail.init.js
     * @throws {Error} Se genera un error si ocurre algún problema durante la solicitud GET o la actualización de la vista.
    */
    pagination: (ev) => {
			if(ev.target){
				ev.preventDefault();
			}
			const comments_tab = document.querySelector('#tcomments-tab');
			comments_tab.scrollIntoView({ behavior: 'smooth' });
			const observer = new MutationObserver((mutationsList, observer) => {  
			  comments_tab.scrollIntoView({ behavior: 'smooth' });
			});
			observer.observe(comments_tab, { attributes: true, childList: true, subtree: true });
      const url = typeof (ev) === 'string' ? ev : ev.currentTarget.getAttribute('href');
      $('#tcomments-tab').click();
      $.ajax({
        url: url,
        type: "get",
        success: (response, status, jqXHR) => {
          $('#tcomments').empty().append(response);
          Baratz.commons.opinions.buttonclick();
          $('#tcomments-tab').click();
          $('#comments .lists-pagination ul a').on('click', function (event) {
            event.preventDefault();
            let uri = $(this).attr('href');
            Baratz.commons.opinions.pagination(uri);
          })
        },
        error: xhr => {
          console.log('Error ', xhr);
        }
      });
    },
    
    /**
     *  Cambia el texto "Sé el primero en opinar" por "Añade tu opinión" y viceversa
     * 
     *  @method Baratz.commons.opinions.changeOpnionText    
		 * 
     *  @param {Event} ev : evento del botón que lanza la modal
    */
	
    changeOpnionText:(ev) => {			
			const uri = location.search; 
			const searchParams = new URLSearchParams(uri);  
	    let tabId = searchParams.get('tabId') || ''; 
	    if(tabId.includes('tcomments-tab')){
        tabId = tabId.replace('tcomments-tab', '');
	    }
	    const oai = location.pathname.split('/')[5];
	    let tbid = tabId ? `?tabId=${tabId}` : '';
	    const texturi = Baratz.commons.context + 'catalog/detail/comments/toolbar/' + oai + tbid;	
			if(texturi){
				$.ajax({
	        url: texturi,
	        type: "get",
	        success: (response, status, jqXHR) => {
						const parser = new DOMParser();
						const htm = parser.parseFromString(response, 'text/html');
						$('.comments-actions').empty().append(response);
						$('.comments-actions .add-opinion').on('click', function(ev){
							ev.preventDefault();
							Baratz.commons.opinions.add(ev);
							Baratz.commons.opinions.buttonclick();
						});
						$('.comments-actions .view-comments').on('click', function(ev){
							ev.preventDefault();
							$('#tcomments-tab').click();
						})
						if('.comments-actions .average-rating'){
							let p = (parseInt($('.comments-actions .average-rating').val()*100)/5);
							$('.comments-actions .average-rating').addClass('custom-style').css('--percent', p+'%');						
							$('.modal_add_comments .all-stars > li').on('click', function(ev){
								let lis = document.querySelectorAll('.modal_add_comments li');
								let radios = document.querySelectorAll('.modal_add_comments input[type="radio"');
								$('.modal_add_comments .radio-label').on('click', function(ev){
									console.log('radio id = ', ev.currentTarget.getAttribute('for'))
									lis.forEach((li,i)=>{
										li.classList.remove('selecteds');
										radios[i].checked=false;
									})
									p = Number(ev.currentTarget.getAttribute('for').split('punctuation')[1]);
									ev.target.previousElementSibling.checked = true;
									for(let i=1;i<=p;i++){
									  document.querySelector('.modal-body #punctuation'+i).parentElement.classList.add('selecteds');
									}
								});
							})
						}
	        },
	        error: xhr => {
	          console.log('Error ', xhr);
	        }
	      });
	     }
		},
    /**
     * Valida que no se metan caracteres no permitidos en las opiniones
     *
     * @function Baratz.commons.opinions.validatePattern
     * @param {Object} form - formulario a validar
    */
		validatePattern:(form)=>{
			const inputPattern = /^[A-Za-zÀ-ÿ0-9-,'´.;:()¡!¿?% \n]*$/;
			let inputs = form.querySelectorAll("input[type='text'], textarea");
			let numval = 0;
			let pattern_errors = [];
			if(inputs.length>0){
				inputs.forEach(function(input) {
					const inputValue = input.value;
					if(inputPattern.test(inputValue)){
						numval++;
					}else{
						pattern_errors.push(input.id)
					};
				});
			}
			return {valid:numval===inputs.length, errors:pattern_errors};
		},
    /**
     * Crea una ventana modal para gestionar acciones sobre las opiniones.
     *
     * Esta función genera una ventana modal personalizada para acciones como borrar, modificar o validar opiniones.
     *
     * @function Baratz.commons.opinions.modal
     * @param {string} id - El valor del campo 'id' del formulario del botón que lanza la modal.
     * @param {string} body - El cuerpo de la modal, que depende del tipo de acción.
     * @param {string} title - El título de la modal, que depende del tipo de acción.
     * @param {string} action - La acción que será manejada por el botón 'Aceptar' de la modal (borrar, modificar, validar).
     * @throws {Error} Se genera un error si ocurre algún problema durante la creación de la ventana modal.
     * @example	
     */
    modal: (id, body, title, type, action, visible) => {
			visible = visible?visible:true;
   // console.log('creo modal de opiniones de tipo: ', action)
      let cls = action === 'update' || 'add' ? 'modal-lg' : 'modal-md';
      if(action==='delete' || action==='validar' || action==='invalidar'){
				cls="modal-md";
			}
			if(action==='validar' || action==='invalidar'){
				action = 'validar'
			} 
			const clsv = visible?'d-block':'d-none';
      const modal = `
		 <div class="modal-backdrop fade show"></div>
		 <div id="${id}" class="modal_${action}_comments modal_js modal_type_${type} modal fade show  ${clsv}" tabindex="-1" role="dialog" aria-labelledby="modalTitle_${id}" aria-modal="true" >
		 	<div class="modal-dialog ${cls}" role="document">
	            <div class="modal-content">
	              <div class="modal-header">
	              	<div id="modalTitle_${id}" class="modal-title">${title}</div>                
	              		<button class="btn_cerrar close" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}" title="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">
	                    <span aria-hidden="true">×</span>
	                </button>
	              </div>
	              <div class="modal-body">                
				    ${body}
				  </div>
	            </div>
	          </div>        
	     </div>`;
      return modal;
    },
    /**
       * Función que genera el contenido del body de una ventana modal
       *
       * @param {string} action - La acción a realizar (borrar, modificar o validar).
       * @returns {Object} - El cuerpo de la ventana modal que queremos abrir
     */
    modal_body: (action, id, title) => {
	let actionConfirm = "";
	if(action === "borrar") {
		actionConfirm = Baratz.i18n_js.comment.delete_confirm
		
	}
      const modal_body = `<span class="float-left col-md-12 mb-4">${actionConfirm}</span>
				<div class="modal-footer">
         	<button type="button" class="btn_cerrar btn btn-outline-secondary" data-dismiss="modal" aria-label="${Baratz.i18n_js.modales_js.btn_cerrar_aria_label}">${Baratz.i18n_js.comment.cancel_button}</button>
         	<button type="button" class="btn_${action}_comment btn btn-primary" id="${id}" aria-label="${Baratz.i18n_js.comment.delete_button}">${Baratz.i18n_js.comment.delete_button}</button>
    		</div>`;
      return modal_body;
    },
    
		 /**
     * Función que gestiona los botones Aceptar en función de la acción: borrar, modificar o validar.
		 * 
     * @method Baratz.commons.opinions.button_accept
     * @param {string} action - La acción a realizar (eliminar, modificar o validar).
     * @param {string} url - La URL a la que se hace la solicitud POST en función de la acción.
     * @param {Object} payload - Los datos que se envían en la solicitud POST en función de la acción.
     * @returns {Object} - Los datos de la acción lanzada para repintar la pestaña de opiniones.
     */
		button_accept: (action, url, payload) => {
      //console.log('button_accept action', action); console.log('button_accept url', url); console.log('button_accept payload', payload)
      //console.log(`${action} opinión`);
			let ide = payload?payload.id:0;			
      if (action === 'eliminar') {      
        $('#commentsdel_'+ide+' #id').val(Number(ide))
      }      
      if(!url && (action==='validar' || action==='invalidar')){				
					$('#commentsval #id').val(Number(ide));
			}else{
				
				if(payload && url){
	        $.ajax({
	          url: url,
	          type: "post",
	          headers: {
	            'X-CSRF-TOKEN': payload._csrf,
	            'Content-Type': 'application/json'
	          },
	          data: JSON.stringify(payload),
	          success: (response, status, jqXHR) => {
	            if (response.indexOf('comments--form comments') > -1) {
	              $('.modal-body').empty().append(response);
	              $('.comment-save').on('click', function(ev){									
									Baratz.commons.opinions.changeOpnionText();
	              	Baratz.commons.opinions.add(ev);
              	});
	            } else {
								if(action==='añadir'&&response.indexOf('No se puede realizar')>-1){
									response = response.replace(/alert-success/g,'alert-warning');
								}
								if($('.article-detail-comments')){
									if(action==='añadir' || action==='eliminar'){
										Baratz.commons.opinions.changeOpnionText();
									}
									$('.article-detail-comments').empty().append(response);
									$('#error-front-opinionline').empty();
									$('#error-front-parrafo').empty();
								}else {
									if($('#comments')){
									if(action==='añadir' || action==='eliminar'){
										Baratz.commons.opinions.changeOpnionText();
									}
										$('#comments').empty().append(response);
										$('#error-front-opinionline').empty();
										$('#error-front-parrafo').empty();
									}
								}
	              
	              $('.modal-backdrop.show').remove();
	              $('.modal.modal_js.modal.fade.show').remove();
	              $('body').removeClass('modal-open');
	              if($('#tcomments-tab')){$('#tcomments-tab').click();}
	              Baratz.commons.opinions.buttonclick();
	            }
	          },
	          error: xhr => {
	           // $('.comments-error').empty().html(xhr.statusText + ' ' + xhr.status);
	           console.log(xhr.statusText + ' ' + xhr.status);
	          }
	        })
	        
         }	
         else{}				
			}	
		},
		/**
     * Función que gestiona los botones Cancelar en diferentes acciones de las opiniones.
     *
     * @method Baratz.commons.opinions.button_cancel
     * @param {string} action - La acción relacionada con la cancelación
     * @throws {Error} Se genera un error si ocurre un problema durante la cancelación.
     
     */
    button_cancel: (action) => {
      //console.log(`Cancelar ${action} opinión`);
      $('#tcomments-tab').click();
      $('body').removeClass('modal-open');
      $('.modal-backdrop.fade.show').remove();
      $('.modal.modal_js.modal.fade.show.d-block').remove();
    },		
   
    /**
     * Agrega eventos a los botones después de cada append del resultado de una solicitud POST.
     *
     * Esta función se utiliza para asignar eventos a diferentes tipos de botones después de agregar el resultado de una solicitud POST al DOM.
     *
     * @method Baratz.commons.opinions.buttonclick
     * @param {string} action - La acción que se va a realizar, por ejemplo, 'delete', 'update', 'validate', etc.
     * @param {string} url - La URL de la solicitud POST que se asociará con el evento del botón.
     * @param {object} payload - Los datos que se enviarán en la solicitud POST.
     * @throws {Error} Se genera un error si ocurre un problema durante la asignación de eventos.
     * @example
     * // Ejemplo de uso:
     * const actionType = // proporciona el tipo de acción, por ejemplo, 'delete' o 'update'.
     * const requestUrl = // proporciona la URL de la solicitud POST.
     * const requestData = // proporciona los datos a enviar en la solicitud POST.
     * Baratz.commons.opinions.buttonclick(actionType, requestUrl, requestData);
     */
    buttonclick: (action, url, payload) => {
    // console.log('buttonclick action ', action);console.log('buttonclick url ', url);console.log('buttonclick payload ', payload)      
      //modal borrar
      if ($('.page_type_title .btn_comment_delete')) {				
        $('.page_type_title .btn_comment_delete').on('click', function(ev){
					Baratz.commons.opinions.delete(ev);
				})
      };     	
      //modificar desde detalle)
      if ($('.btn_update_comment')) {
        $('.btn_update_comment').on('click',function(ev){
          Baratz.commons.opinions.update(ev);
				})
      };      
      //cerrar ó cancelar
      if ($('.btn_cerrar')) {
        $('.btn_cerrar').on('click',function(ev){
          Baratz.commons.opinions.button_cancel();
				});
      };
      //añadir
      if ($('.link.add-opinion')) {
        $('.link.add-opinion').on('click', function(ev) {
					console.log('buttonclick click')
			  	ev.preventDefault();			  	
					document.querySelectorAll('.modal_add_comments .all-stars li').forEach((li)=>{
						li.classList.remove('selecteds');
					})	
					$('body').addClass('modal-open');
					$('.modal_add_comments').show();
					if($('.modal_add_comments form') && $('.modal_add_comments form')[0]){
						$('.modal_add_comments form')[0].reset();					
					}
					$('.modal-backdrop').show();
	        });
      };
      //validar/invalidar btn_validar_comment
      if ($('.page_type_title .btn_comment_validate')) {
        $('.page_type_title').on('click','.btn_comment_validate', function(ev){
					ev.preventDefault();
          Baratz.commons.opinions.validate($(this));
          return false;
        })
      };
      
      //Aceptar validar btn_validar_comment
       if ($('.btn_validar_comment')) {
        $('.btn_validar_comment').on('click', function(){
          Baratz.commons.opinions.button_accept(action, url, payload);
        });
      };
       //Aceptar invalidar btn_invalidar_comment
       if ($('.btn_invalidar_comment')) {				
        $('.btn_ivalidar_comment').on('click', function(ev) {	
          Baratz.commons.opinions.button_accept(action, url, payload);
        });
      };
      //eliminar
      if ($('.btn_eliminar_comment')) {
        $('.btn_eliminar_comment').on('click',function(ev){
				  action = action?action:'eliminar';
				  let ide = ev.currentTarget.id;
				  url = url?url:Baratz.commons.opinions.deleteAjaxUrl+'?id='+ide;
				  let pl = Baratz.commons.opinions.getCommonValues();
				  pl.id = ide;
				  payload = payload?payload:pl;				 		  
       		Baratz.commons.opinions.button_accept(action, url, payload, htm);
       		
        })
      };
      
      //eliminar manager
      if ($('.btn_borrar_comment')) {
        $('.btn_borrar_comment').on('click',function(ev){ 
				  action = action?action:'eliminar';
				  let ide = ev.currentTarget.id;
				  url = url?url:Baratz.commons.opinions.deleteAjaxUrl+'?id='+ide;
				  let pl = Baratz.commons.opinions.getCommonValues();
				  pl.id = ide;
				  payload = payload?payload:pl;			  
       		Baratz.commons.opinions.button_accept(action, url, payload);
        })
      };
      //paginar
      if ($('#comments .lists-pagination ul a')) {
        $('#comments .lists-pagination ul a').on('click',function(ev){
					ev.preventDefault();
          Baratz.commons.opinions.pagination(ev);
				});
      };
      if($('.comment-save')){
				 $('.comment-save').on('click', function (ev) { 
				 });
			};
				
      if($('.comment-save-cancel')){
        $('.comment-save-cancel').on('click', function (ev) { 
							ev.preventDefault();	
              Baratz.commons.opinions.button_cancel()
            });
       }
      //click en las estrellas
      if($('radio-label')){						
				let lis = document.querySelectorAll('.modal-body li');
				let radios = document.querySelectorAll('.modal-body input[type="radio"');
				let p = $("input[name='punctuation']:checked").val();	
				$('.radio-label').on('click', function(ev){
					lis.forEach((li,i)=>{
						li.classList.remove('selecteds');
						radios[i].checked=false;
					})
					p = Number(ev.target.previousElementSibling.id.split('punctuation')[1]);
					ev.target.previousElementSibling.checked = true;
					for(let i=1;i<=p;i++){
					  document.querySelector('.modal-body #punctuation'+p).parentElement.classList.add('selecteds');
					}
				});
			}
    },
     /**
     *  Funciones útiles que se usan en varios sitio
     * 
     *  @method Baratz.commons.opinions.util    
		 *      
    */
    util: {      
		/**
     *  Funciones que cambia el texto validar por invalidar en la modal en función de la acción a realizar
     * 
     *  @method Baratz.commons.opinions.util.validateText
		 * 
		 *  @method Baratz.commons.opinions.util.validateButton
		 * 
		 *  @method Baratz.commons.opinions.util.validateConfirm
		 * 
		 *  @method Baratz.commons.opinions.util.validateTitle
		 * 
		 * 	@params {Object} boton : botón donde se cambia el texto
		 *      
    */
      validateText:(boton)=>{
				let vtext = 'validate';
		  		const span = boton.querySelector('span.icono');
				vtext = span && span.classList.contains('fa-check')?Baratz.i18n_js.comment.invalidate_button.toLowercase() : Baratz.i18n_js.comment.validate_button.toLowercase();
				return vtext;
			}, 
		validateButton:(boton)=>{
				let vbutton = '';
		  		const span = boton.querySelector('span.icono');
				vbutton = span && span.classList.contains('fa-check')? Baratz.i18n_js.comment.invalidate_button : Baratz.i18n_js.comment.validate_button;
				return vbutton;
			}, 	
		
		validateConfirm:(boton)=>{
				let vconfirm = '';
	  			const span = boton.querySelector('span.icono');
			  	span.classList.contains('fa-check')
				vconfirm = span && span.classList.contains('fa-check') ? Baratz.i18n_js.comment.invalid_confirm : Baratz.i18n_js.comment.valid_confirm;
				return vconfirm;
				},	
		validateTitle:(boton)=>{
			let vtitle = '';
		  	const span = boton.querySelector('span.icono');
		  	span.classList.contains('fa-check')
			vtitle = span && span.classList.contains('fa-check') ? Baratz.i18n_js.comment.invalidate : Baratz.i18n_js.comment.validate;
			return vtitle;
		},
			/**
			 * Función que calcula los estulos de las valoraciones
			 * @method Baratz.commons.opinions.styleStars
			 * @param {dom object} stars: el div que contiene las estrellas.
			 * @param {number} p: el número de la estrella en la que se ha hecho click
			 * @param {dom object} form: el formulario donde están los checkboxes asociados a las estrellas
			 */
			styleStars:(stars,p,form)=>{
				stars.forEach((star)=>{
				star.classList.remove('selecteds');
				star.addEventListener('click', function(e){
					form.querySelectorAll('.radio-input').forEach((radio)=>{
						radio.checked=false;
					})
					e.target.previousElementSibling.checked = true;
					p = Number(e.target.previousElementSibling.id.split('punctuation')[1]);
					for(let i=1;i<=p;i++){
					  form.querySelector('#punctuation'+p).parentElement.classList.add('selecteds');
					}
				})
			});
		  stars.forEach((star, i)=>{
			 if(i+1<=p){
				 star.classList.add('selecteds');
			 }							
			});
		 },			
    },
  },
  ///FIN Barazt.commons.opinions
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///// FIN Baratz.commons
})

/**
   *  Añade una clase a la búsqueda para ajustar el ancho de los selects
   *  en función de si son 2 ó 3
   *  También checkea y descheckea los checkboxes en función se si se selecciona
   *  cualquier origen u otro distinto
   *  Se ejecuta al terminar de cargarse la página
   *  @method changeOriginslayout
  */
let origins_type = '';
(function changeOriginslayout() {
  $('#solrSearch.subCatalog.subCatalogs1.optionSelected').addClass('cont_select_disabled');
  let selectedIds = [];
  let busqueda = "";
  if ($('#solrSearch').length > 0) {
    busqueda = $('#solrSearch');
  }
  if ($('#abwxpAdvanced').length > 0) {
    busqueda = $('#abwxpAdvanced');
  }

  if ($('.origen-checks').length > 0) {
    //$('.simple-search').addClass('two-in-a-row');
    //$('.advanced-search').addClass('two-in-a-row');
    origins_type = 'checks';
    if (busqueda.length > 0) {
      $('input[name="solrSearch.origin"]').change(function () {
        if (this.id === 'any-source' && this.checked) {
          $('#any-source').next('span').addClass('activado');
          $('input[name="solrSearch.origin"]').not(this).prop('checked', false).attr('checked', false).removeAttr('checked');
          $('input[name="solrSearch.origin"]').not(this).next('span').removeClass('activado');
        } else {
          $('#any-source').prop('checked', false).attr('checked', false).removeAttr('checked');
          $('#any-source').next('span').removeClass('activado');
        }
        const contChecks = document.querySelectorAll('input[type="checkbox"]:checked');
        selectedIds = Array.from(contChecks).map(checkbox => checkbox.id).join(',');
        localStorage.setItem('origenes', selectedIds);
      })
    }
  } else {
    origins_type = 'select';
    if (busqueda.length > 0) {
      const solrSearchOrigin = document.getElementById('solrSearch.origin');
      if (solrSearchOrigin) {
        solrSearchOrigin.addEventListener('change', function () {
          selectedIds = solrSearchOrigin.value;
        });
      }
    }
  }
})();
