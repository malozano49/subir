/**
 *  @file        : opac-admin.properties.js
 *
 *  @description : js de aplicación en la página de administración propiedades
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

console.log("[opac-admin.properties.js] CARGA");

if (!Baratz.admin_properties){
	Baratz.admin_properties={};
  Baratz.admin_properties.logfile = `${BaratzContextPath}admin/log`;
  // para sortables form-row
  Baratz.admin_properties.data_sortables=[];
}

/**
 *  Contenedor de acciones en la pestaña administracion propiedades
 *
 *  @cont Baratz.admin_properties
 *
 */
Object.assign(Baratz.admin_properties,{

  // Secuencia de inicializacion
  init:()=>{
    const retorno=new Promise((resolve, reject)=>{
      const $body=$(document.body);
      const $cont_sortable=$body.find(".cont_sortable").not(".sortable_disabled");
      if($cont_sortable.length>0){
        // indice de sortables form-row con attr data-sortable
        let sortable_index=0;
        $cont_sortable.each((i,e)=>{
          const $cont_dd=$(e);
          // crea un item en el array y aplica los datos necesarios en el dom
          const data_sortable=$cont_dd.attr("data-sortable");
          if(typeof(data_sortable)!=="undefined"){
            const $cmp_sortable_list = $cont_dd.find(".cmp_sortable_list");
            const $item_base_clone   = $('<div class="item_base_clone"></div>');
            const datos_sortable={
              $cont_dd           : $cont_dd,
              data_sortable      : JSON.parse(data_sortable),
              $item_base_clone   : $item_base_clone,
              $cmp_sortable_list : $cmp_sortable_list,
              sortable_index     : sortable_index,
            };
            // data-name_sortable=nombre de este objeto Baratz
            $cont_dd.attr({"data-sortable_index":sortable_index,"data-name_sortable":"admin_properties"});
            sortable_index=sortable_index+1;
            Baratz.admin_properties.data_sortables.push(datos_sortable);
          }
          // Inicializa TODOS los sortables presentes en la vista
          //var $dd=$cont_dd.find(".cmp_sortable");
          //Baratz.tmpls_actions.CMP_SORTABLE($dd);
        });
        Baratz.tmpls_actions.CMP_SORTABLE();
      }
      resolve();
    });
    return retorno;
  },

  /**
   *  Recupera el html del clon para añadir nuevos elementos
   *
   *  @method Baratz.admin_properties.get_clone
   *
   *  @param {object} datos_sortable : datos del sortable afectado
   *
   *  @details
   *    Se llama desde [scripts.js] Baratz.tmpls_actions.CMP_SORTABLE()->EVENTS.init()
   */
  get_clone:(datos_sortable)=>{
    const retorno=new Promise((resolve, reject)=>{
      const url = `${BaratzContextPath}admin/properties/fragment/${datos_sortable.data_sortable.peticion}/${datos_sortable.data_sortable.id}`;
      datos_sortable.$item_base_clone.load(url,()=>{
        datos_sortable.$item_base_clone=datos_sortable.$item_base_clone.find(".item_base_clone");
        resolve(datos_sortable);
      });
    });
    return retorno;
  }
});