/**
 *  @file        : tmpl_advanced_search_filters.js
 *
 *  @description : Acciones js para la capa de filtros en la vista de búsqueda avanzada
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 *
 */
// jshint jquery :true, esversion:10
/* globals Baratz */

if (!Baratz.advanced_search_filters){
  Baratz.advanced_search_filters={
    rowObj         : [],
    rowFiltersObj  : [],
    rowDatesObj    : [],
    icon           : '<span class="icono fas fa-caret-right fa-lg mr-2 text-primary" aria-hidden="true"></span>',
    formAdvanced   : $(document.body).find('form#abwxpAdvanced'),
  };
}

Object.assign(Baratz.advanced_search_filters,{

  // Capa Rangos de búsqueda
	rowInfo        : Baratz.advanced_search_filters.formAdvanced.find('.row-info'),
  // max de líneas a añadir en 'Rangos de búsqueda'
  form_row_max   : 10,
  // Capa Filtrar por
  rowFilters     : Baratz.advanced_search_filters.formAdvanced.find('.row-filters'),
  // Capa Rangos de fechas
  rowDates       : Baratz.advanced_search_filters.formAdvanced.find('.row-dates'),

  // Capa alert-info con el Formato definido para la búsqueda textual
  advancedInfo   : Baratz.advanced_search_filters.formAdvanced.find('.advanced-info'),
  // En la capa advancedInfo, la zona de info textual para los Rangos de búsqueda
  advInfoRanges  : Baratz.advanced_search_filters.formAdvanced.find('.info_ranges'),
  // En la capa advancedInfo, la zona de info textual para Filtar por...
  advInfoFilters : Baratz.advanced_search_filters.formAdvanced.find('.info_filters'),
  // En la capa advancedInfo, la zona de info textual para los rangos de fecha
  advInfoDates   : Baratz.advanced_search_filters.formAdvanced.find('.info_dates'),

  // Guardado del html de la capa alert-info con el formato textual del formato definido para la búsqueda (input hidden)
  hidden         : Baratz.advanced_search_filters.formAdvanced.find('#advancedDinamicQuery'),

  /**
   *  Acciones js para la capa de filtros en la vista de búsqueda avanzada
   *
   *  @method  Baratz.advanced_search_filters.TMPL
   *
   *  @details vista incluída en búsqueda avanzada, lista de resultados de la búsqueda avanzada, y detalle del item?????
   */
  TMPL:function(){

    const INIT=()=>{
      // Rangos de búsqueda
      OPS.initAdvancedRangeChangeValue();
      // Filtrar por
      OPS.initAdvancedFiltersChangeValue();
      // Año de publicación
      OPS.initAdvancedDatesChangeValue();

      EVENTOS();
    },

    /**
     *  Acciones asociadas a los eventos generales de la búsqueda avanzada
     *
     *  @cont EVENTOS
     */
    EVENTOS=()=>{
      // Botón Buscar
      const $btn_submit=Baratz.advanced_search_filters.formAdvanced.find('.btn-search');
      // No se usa el on.submit porque afecta al boton limpiar
      $btn_submit.on("click",(e)=>{
        // convierte el form en objeto
        const form=Baratz.tmpls_actions.UTILS.form2object(Baratz.advanced_search_filters.formAdvanced);
        // Validacion HTML5
        const isValid=Baratz.advanced_search_filters.formAdvanced[0].reportValidity();
        if(!isValid){
          return false;
        }
        // Busca las propiedades query sin valor y con valor
        let props_con_valor=[];
        let props_sin_valor=[];
        // Busca las propiedades .query que interesan (con valor y sin valor) para guardarlas en los arrays correspondientes
        for(const[key,val] of Object.entries(form)){
          // Solo keys que acaben en .query
          if(key.split(".").pop()==="query"){
            const name_query=key.match(/(.*)\.(.*)/)[1];
            // keys que incluyan pos en array, son las líneas de rangos de búsqueda
            if(name_query.includes("[")){
              // como da un 500 el back ó no aparece en la vista la linea a clonar si no se envía ningun resultado,
              // hay que tener en cuenta las lineas con index 0 y 1, que deben de enviarse siempre
              // aunque la linea 0 esté vacia (la linea 1 está siempre vacia al ser la base a clonar en el btn 'Añadir nueva línea')
              if(val.trim()==="" && props_con_valor.length>1){
                props_sin_valor.push(name_query);
              }
              else{
                props_con_valor.push(name_query);
              }
            }
          }
        }

        // Elimina las propiedades dependientes de .query con pos en array sin valor y guarda las de valor en nuevo objeto, ya reindexadas,
        // borrándolas del objeto original para añadirlas posteriormente al objeto origen, completando la operación
        let props_new={};
        for(const[key,val] of Object.entries(form)){
          // keys que incluyan pos en array
          if(key.includes("[")){
            const name_prop=key.match(/(.*)\.(.*)/)[1];
            // Si están en el array de las que no tienen valor, se borra la prop del objeto form directamente
            const isInArray_sin_valor=props_sin_valor.includes(name_prop);
            if(isInArray_sin_valor){
              delete form[key];
            }
            else{
              // Hay keys que tambien tienen pos en array que no nos interesan, pues no pertenecen a los rangos de búsqueda
              let index_new=props_con_valor.indexOf(name_prop);
              if(index_new>-1){
                // Guarda key y value
                const name_new=key.replace(/\[\d+\]/, `[${index_new}]`);
                const valor=form[key];
                // Borra la prop del objeto form
                delete form[key];
                // Se guarda la prop reindexada en el nuevo objeto
                props_new[name_new]=valor;
              }
            }
          }
        }
        // Integra el objeto nuevo en el objeto origen form
        Object.assign(form,props_new);
        const datos={
          method : Baratz.advanced_search_filters.formAdvanced.attr("method"),
          action : Baratz.advanced_search_filters.formAdvanced.attr("action"),
          data   : form
        };
        // Lanza submit con el form completo
        Baratz.tmpls_actions.UTILS.formSubmit(datos);
        return false;
      });
    },

    /**
     *  Operaciones varias
     *
     *  @cont OPS
     */
    OPS={

      /**
       *  Inicializa y asigna acciones sobre los eventos de los componentes de entradas para la capa 'Rangos de búsqueda'
       *
       *  @method OPS.initAdvancedRangeChangeValue
       *
       *  @details ¡¡¡Cuidado!!!: En backend se salta el .form-row.query con index=1 (.no_selectPicker) que está oculto.
       */
      initAdvancedRangeChangeValue:()=>{

        /**
         *  Pinta textualmente la búsqueda a realizar desde la capa 'Rangos de búsqueda'
         *
         *  @method changeAdvancedRangeValue
         *
         *  @param {dom object} $component: entrada en la capa 'Rangos de búsqueda' a evaluar
         */
        const changeAdvancedRangeValue=$component=>{
          const $rowParent   = ($component.hasClass("query"))?$component:$component.closest('.query');
          const $rowElements = $rowParent.find('input,select');
          const index        = $rowParent.index();
          let info = '';
          $rowElements.each((i,e)=>{
            let val_texto=e.value;
            switch(e.type){
              // inputs
              case"text":{
                if(val_texto!==''){
                  val_texto=Baratz.tmpls_actions.UTILS.encodeHTMLentities(val_texto);
                  info+=`<span class="type_termino font-weight-bold">${val_texto} </span>`;
                }
              }
              break;
              // Selects
              case"select-one":{
                const selected_text=e.options[e.options.selectedIndex].text;
                if(val_texto.toUpperCase()==='OR'){
                  info+=`</div><div>${Baratz.advanced_search_filters.icon}`;
                }
                info+=` ${selected_text} `;
              }
              break;
              default:
            }
            Baratz.advanced_search_filters.rowObj[index] = info;
          });
          // Si el primer control de la cadena es 'and', 'or', o 'not', se elimina
          const content = Baratz.advanced_search_filters.advInfoRanges.text();
          if(content.length){
            let match             = content.match(/^\S*/)[0];
            const match_uppercase = match.toUpperCase();
            const texto           = Baratz.advanced_search_filters.advInfoRanges.html().replace(match,'');
            if(match_uppercase === 'AND' || match_uppercase === 'NOT'){
              match=(match_uppercase === 'NOT'? match : '');
              Baratz.advanced_search_filters.advInfoRanges.html(`<div>${Baratz.advanced_search_filters.icon}${match}${texto}</div>`);
            }
            else if(match_uppercase === 'OR'){
              Baratz.advanced_search_filters.advInfoRanges.html(texto);
            }
          }
          OPS.htmlAdvancedInfo();
        },
        /**
         *  Cambia el name de todos los items de entradas del formulario
         *
         *  @method change_name_all
         */
        change_name_all=()=>{
          // Cambia los names de los items de entradas de cada fila
          // (por ejemplo solrSearch.solrAdvancedSearchRows[1].query x solrSearch.solrAdvancedSearchRows["1"].query)
          const $form_row_query=Baratz.advanced_search_filters.rowInfo.find('.form-row.query');
          $form_row_query.each((index,el)=>{
            $(el).find("input,select").each((i,element)=>{
              // index por la fila
              change_name(element,index);
            });
          });
        },
        /**
         *  Cambia el name de un item vanilla por otro
         *
         *  @method change_name
         *
         *  @param {dom object} element : item vanilla sobre el que actuar
         *
         *  @details por ejemplo solrSearch.solrAdvancedSearchRows[1].query x solrSearch.solrAdvancedSearchRows["1"].query
         */
        change_name=(element,index)=>{
          element.name = element.name.replace(/solrAdvancedSearchRows\[\d\]/, `solrAdvancedSearchRows[${index}]`);
        },
        /**
         *  Gestiona el pintado del botón "Añadir nueva línea" en la búsqueda avanzada segun el número de items maximo definido
         *
         *  @method OPS.gestiona_pintado_btn_add
         */
         gestiona_pintado_btn_add=()=>{
          const $form_row_query=Baratz.advanced_search_filters.rowInfo.find('.form-row.operator-advanced.query').not('.no_selectPicker');
          if(typeof($form_row_query)==="undefined" || $form_row_query.length < Baratz.advanced_search_filters.form_row_max){
            $btn_add_row_advanced.show();
          }
          else{
            $btn_add_row_advanced.hide();
          }
        },
        /**
         *  Recorre todos las filas en la capa Rangos de búsqueda para insertar las cadenas de texto necesarias en
         *  la capa de información descriptiva de los filtros y cambia el name de todos los tags de entradas
         *
         *  @method attrs_change_all
         */
        attrs_change_all=()=>{
          const $form_row_query=Baratz.advanced_search_filters.rowInfo.find('.form-row.query');
          const elementos="input,select,button[data-id],label,.bmd-help";
          $form_row_query.each((index,row)=>{
            const $row=$(row);
            // Aplica un data-index como referencia visual del index de la linea
            $row.attr("data-index",index);
            const $elementos=$row.find(elementos);
            $elementos.each((i,el)=>{
              const $el=$(el);
              const tag=el.nodeName.toLowerCase();
              let attr_id;
              switch(tag){
                // Cambio de ids, names y attr aria-labelledby de las entradas
                case "input":
                case "select":{
                  // Cambia los names de los items de entradas de cada fila
                  // (por ejemplo solrSearch.solrAdvancedSearchRows[1].query x solrSearch.solrAdvancedSearchRows["1"].query)
                  change_name(el,index);
                  attr_id = $el.attr("id").split("_")[0]+'_'+index;
                  $el.attr({
                    "id": attr_id
                  });
                  const aria_labelledby=$el.attr("aria-labelledby");
                  if(typeof(aria_labelledby)!=="undefined"){
                    const attr_aria_labelledby = aria_labelledby.split("_")[0]+'_'+index+"help";
                    $el.attr({
                      "aria-labelledby" : attr_aria_labelledby
                    });
                  }
                }
                break;
                // Cambio de attr data-id para los button
                case "button":{
                  const attr_data_id=$el.attr("data-id").split("_")[0]+'_'+index;
                  $el.attr({"data-id":attr_data_id,"id":`btn_${attr_data_id}`});
                }
                break;
                // Cambio de attr for para los labels
                case "label":{
                  attr_id = $el.attr("id").split("_")[0]+"_"+index+"label";
                  $el.attr({
                    "id":attr_id
                  });
                  const attr_for=$el.attr("for");
                  if(typeof(attr_for)!=="undefined"){
                    const for_id = attr_for.split("_")[0]+"_"+index;
                    $el.attr({
                      "for":for_id,
                    });
                  }
                }
                break;
                // Cambio de id para los bmd-help
                case "span":{
                  const span_id=$el.attr("id").split("_")[0];
                  const help_id = `${span_id}_${index}help`;
                  $el.attr("id",help_id);
                }
                break;
                default:
              }
            });
          });
        },
        events={
          /**
           *  Asocia acciones a eventos para los tags de entradas en la capa 'Rangos de Búsqueda'
           *
           *  @method events.tagsEntradas
           *
           *  @param {dom object} $rowData [opt]: Fila jquery donde buscar los tags de entradas
           *    Si se omite se buscan todos los botones en Baratz.advanced_search_filters.rowInfo
           */
          tagsEntradas:($rowData)=>{
            if(typeof($rowData)==="undefined"){
              $rowData=Baratz.advanced_search_filters.rowInfo.find('.query').not(".no_selectPicker");
            }
            const $row_components=$rowData.find('input,select');
            $row_components.on('change',e=>{
              const $component=$(e.currentTarget);
              changeAdvancedRangeValue($component);
            });
            // Aplica acciones sobre el evento del botón Eliminar línea
            events.delRowAdvanced($rowData);
          },

          /**
           *  Acciones asociadas a los eventos sobre el botón eliminar fila
           *
           *  @method events.delRowAdvanced
           *
           *  @param {dom object} $rowData [opt]: Fila jquery donde buscar el botón eliminar fila.
           *    Si se omite se buscan todos los botones en Baratz.advanced_search_filters.rowInfo
           */
          delRowAdvanced:($rowData)=>{
            if(typeof($rowData)==="undefined"){
              $rowData=Baratz.advanced_search_filters.rowInfo.find('.query').not(".no_selectPicker");
            }
            // Botón eliminar fila de fitros
            $rowData.find('.delete-row-advanced').on('click',e=>{
              const rowParent = $(e.currentTarget).closest(".form-row");
              const index     = rowParent.index();
              let rowObj      = Baratz.advanced_search_filters.rowObj;
              if(rowObj.length && rowObj[index]){
                rowObj.splice(index,1);
                // Pinta la nueva info en el alert-info
                OPS.htmlAdvancedInfo();
              }
              // Oculta y borra la fila
              rowParent.fadeOut("slow",function(){
                $(this).remove();
                // Cambia los nombres de los tags de entradas teniendo en cuenta el lugar de borrado de la fila
                change_name_all();
                // Cambia los atributos name, etc teniendo en cuenta el lugar de borrado de la fila
                attrs_change_all();
                // Si procede, se muestra el botón añadir nueva fila
                gestiona_pintado_btn_add();
              });

              return false;
            });
          },
          /**
           *  Acciones asociadas a los eventos sobre el botón añadir fila
           *
           *  @method events.addRowAdvanced
           */
          addRowAdvanced:()=>{

            // Botón añadir nueva fila
            $btn_add_row_advanced.off("click").on('click',()=>{
              // Añade una nueva fila de elementos para los rangos de búsqueda avanzada antes del botón "Añadir nueva línea",
              // clonando el .form-row.operator-advanced.query.no_selectPicker de la capa Rangos de busqueda (oculto)
              const $row_advanced_hidden=Baratz.advanced_search_filters.rowInfo.find('.operator-advanced:eq(0)');
              const $new_row_advanced=$row_advanced_hidden.clone();
              $new_row_advanced.removeClass("no_selectPicker").css({"opacity":"0"}).insertBefore('.div-butt-advanced');
              const $selects_new_row_advanced=$new_row_advanced.find("select");
              $selects_new_row_advanced.each((i,e)=>{
                const liveSearch=false;
                Baratz.tmpls_actions.SELECTS_DEPENDIENTES.applyPicker($(e),liveSearch);
              });
              Baratz.tmpls_actions.EMULATE_BMD();
              $new_row_advanced.animate({"opacity":"1"},"slow",()=>{
                // Aplica foco en el primer elemento visible y enfocable de la nueva fila
                Baratz.tmpls_actions.UTILS.focus_apply($new_row_advanced);
              });
              // Cambia los nombres de los tags de entradas teniendo en cuenta el lugar de insercion de la nueva fila
              change_name_all();
              // Cambia los atributos name, etc teniendo en cuenta el lugar de insercion de la nueva fila
              attrs_change_all();
              // vista del info Formato definido
              changeAdvancedRangeValue($new_row_advanced);
              // Asociacion de acciones sobre los eventos en los tags de entradas
              events.tagsEntradas($new_row_advanced);
              // Si procede, se oculta el botón añadir nueva fila
              gestiona_pintado_btn_add();
              return false;
            });
          },

        };

        ///////////////////////////
        // INICIALIZACION
        ///////////////////////////
        const $btn_add_row_advanced=Baratz.advanced_search_filters.rowInfo.find('.add-row-advanced');
        // Inicializa la vista del info Formato definido para la búsqueda si hay valores
        const $components_querys=Baratz.advanced_search_filters.rowInfo.find('.query').not(".no_selectPicker").find('input,select');
        $components_querys.each((i,e)=>{
          const $component=$(e);
          changeAdvancedRangeValue($component);
        });
        // Cambia los nombres de los tags de entradas
        change_name_all();
        // Cambia los atributos de las refencias label, etc.
        attrs_change_all();
        // Asociacion inicial de acciones sobre los eventos en los tags de entradas
        events.tagsEntradas();
        // Pintado, si procede, del botón 'Añadir nueva fila'
        gestiona_pintado_btn_add();
        // Asociacion de acciones a los eventos del botón 'Añadir nueva fila'
        events.addRowAdvanced();
      },

      /**
       *  Inicializa y asigna acciones sobre los eventos de los componentes de entradas para la capa 'Filtrar por'
       *
       *  @method OPS.initAdvancedFiltersChangeValue
       */
       initAdvancedFiltersChangeValue:()=>{

        /**
         *  Pinta textualmente la búsqueda a realizar desde la capa 'Filtrar por'
         *
         *  @method changeInfoFilterValues
         *
         *  @param {dom object} $rowFilter  : componente de la capa 'Filtrar por' a evaluar
         */
        const changeInfoFilterValues=$rowFilter=>{
          const $cont_form_group = $rowFilter.closest('.cont_form_group');
          const index=$cont_form_group.index();
          const label_text=$cont_form_group.find("label").text();
          let info = '';
          if($rowFilter.val()!==''){
            const item_val=Baratz.tmpls_actions.UTILS.encodeHTMLentities($rowFilter.val());
            const item_option=$rowFilter.find(`option[value="${item_val}"]`).text();
            info += `<div class="d-inline-block cont_value mr-3">
              <span class="label_txt font-weight-bold">${label_text}: </span><span class="item_val ml-1">${item_option}</span>
            </div>`;
          }
          const rowFiltersObj=Baratz.advanced_search_filters.rowFiltersObj;
          rowFiltersObj[index]=info;
          let message = '';
          for (const [key, val] of Object.entries(rowFiltersObj)){
            if(val){
              if(!parseInt(key)){
                message+=`<div class="cont_row_filters">${Baratz.advanced_search_filters.icon}`;
              }
              message+=val;
            }
          }
          if(message){
            message += '</div>';
          }
          Baratz.advanced_search_filters.advInfoFilters.html(message);
        };

        ///////////////////////////
        // INICIALIZACION
        ///////////////////////////
        const $rowFilters=Baratz.advanced_search_filters.rowFilters.find("select");
        // Evalúa los valores iniciales en 'Filtrar por'
        $rowFilters.each((i,e)=>{
          const $this=$(e);
          changeInfoFilterValues($this);
        });
        // Asocia acciones a eventos para las entradas 'Filtrar por'
        $rowFilters.on("change",e=>{
          const $this=$(e.currentTarget);
          changeInfoFilterValues($this);
        });
      },

      /**
       *  Inicializa y asigna acciones sobre los eventos de los componentes de entradas para la capa 'Año de publicación'
       *
       *  @method OPS.initAdvancedDatesChangeValue
       */
      initAdvancedDatesChangeValue:()=>{

        /**
         *  Pinta textualmente la búsqueda a realizar desde la capa 'Año de publicación'
         *
         *  @method changeInfoDateValues
         *
         *  @param {dom object} $rowDate  : componente de la capa 'Año de publicación' a evaluar
         */
        const changeInfoDateValues=($rowDate)=>{
          const $cont_form_group = $rowDate.closest('.cont_form_group');
          const label_text       = $cont_form_group.find("label").text();
          const index            = $cont_form_group.index();
          let info               = '';
          if($rowDate.val()!==''){
            const rowDate_val= Baratz.tmpls_actions.UTILS.encodeHTMLentities($rowDate.val());
            info += `<div class="d-inline-block cont_value mr-3">
              <span class="label_txt font-weight-bold">${label_text}:</span><span class="item_val ml-1">${rowDate_val}</span>
            </div>`;
          }
          const rowDatesObj=Baratz.advanced_search_filters.rowDatesObj;
          rowDatesObj[index]=info;
          let message = '';
          for (const [key, val] of Object.entries(rowDatesObj)){
            if(val){
              if(!parseInt(key)){
                message+=`<div class="cont_row_dates">${Baratz.advanced_search_filters.icon}`;
              }
              message+=val;
            }
          }
          if(message!==''){
            message += '</div>';
          }
          Baratz.advanced_search_filters.advInfoDates.html(message);
        };

        ///////////////////////////
        // INICIALIZACION
        ///////////////////////////
        const $rowDates=Baratz.advanced_search_filters.rowDates.find('input[type="number"]');
        $rowDates.each((i,e)=>{
          const $rowDate=$(e);
          changeInfoDateValues($rowDate);
        });
        $rowDates.on("change",e=>{
          const rowDate=e.currentTarget;
          const $rowDate=$(rowDate);
          // validación de campo
          const validityState=rowDate.validity;
          // Inserción de mensaje en blanco, entonces form submit
          let mensaje="";
          // Si se pasa el rango por encima o por debajo
          if(validityState.rangeUnderflow || validityState.rangeOverflow){
            // Pinta alerta validacion, entonces form no submit
            mensaje=$rowDate.closest(".cont_input").find(".bmd-help").text();
          }
          else{
            if($rowDate.val()==="" || !validityState.valueMissing){
              changeInfoDateValues($rowDate);
            }
          }
          // Aporta mensaje de validación
          rowDate.setCustomValidity(mensaje);
          // Muestra alerta validacion si es necesario
          rowDate.reportValidity();
        });
      },

      /**
       *  Pinta los tags adecuados con texto descriptivo en la capa info 'Formato definido para la búsqueda'
       *
       *  @method OPS.htmlAdvancedInfo
       */
      htmlAdvancedInfo:()=>{
        let message = '';
        for (const [key, val] of Object.entries(Baratz.advanced_search_filters.rowObj)){
          if(val){
            if(!parseInt(key)){
              message+=`<div>${Baratz.advanced_search_filters.icon}`;
            }
            message+=val;
          }
        }
        if(message!==''){
          message += '</div>';
          Baratz.advanced_search_filters.advInfoRanges.html(message);
          Baratz.advanced_search_filters.hidden.val(message);
        }
      },

    };

    const $body=$(document.body);
    INIT();

  },

});

console.log("[tmpl_advanced_search_filters.js CARGA");