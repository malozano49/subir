/**
 *  @file        : opac-admin.admin_oai.js
 *
 *  @description : js de aplicación en la página de administración admin_oai
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

console.log("[opac-admin.admin_oai.js] CARGA");

if (!Baratz.admin_oai){
	Baratz.admin_oai={
    logfile        : `${BaratzContextPath}admin/log`,
    // para sortables form-row
    data_sortables : [],
  };
}

/**
 *  Contenedor de acciones en la pestaña administracion propiedades
 *
 *  @obj Baratz.admin_oai
 *
 */
Object.assign(Baratz.admin_oai,{

  // Secuencia de inicializacion
  init:()=>{
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
          const datos_sortable     = {};
          datos_sortable.$cont_dd           = $cont_dd;
          datos_sortable.data_sortable      = JSON.parse(data_sortable);
          datos_sortable.$item_base_clone   = $item_base_clone;
          datos_sortable.$cmp_sortable_list = $cmp_sortable_list;
          datos_sortable.sortable_index     = sortable_index;
          // data-name_sortable=nombre de este objeto Baratz
          $cont_dd.attr({"data-sortable_index":sortable_index,"data-name_sortable":"admin_oai"});
          sortable_index=sortable_index+1;
          // aplica en el array inicial
          Baratz.admin_oai.data_sortables.push(datos_sortable);
        }
        // Inicializa TODOS los sortables presentes en la vista
        const $dd=$cont_dd.find(".cmp_sortable");
        Baratz.tmpls_actions.CMP_SORTABLE($dd);
      });
    }
  },

  /**
   *  Recupera el html del clon para añadir nuevos elementos
   *
   *  @method Baratz.admin_oai.get_clone
   *
   *  @param {object} datos_sortable : datos del sortable afectado
   *
   *  @details
   *    Se llama desde [scripts.js] Baratz.tmpls_actions.CMP_SORTABLE()->EVENTS.init()
   */
  get_clone:(datos_sortable)=>{
    const retorno=new Promise((resolve, reject)=>{
      const url=`${BaratzContextPath}admin/properties/fragment/${datos_sortable.data_sortable.peticion}/${datos_sortable.data_sortable.id}`;
      datos_sortable.$item_base_clone.load(url,function(){
        datos_sortable.$item_base_clone=datos_sortable.$item_base_clone.find(".item_base_clone");
        resolve(datos_sortable);
      });
    });
    return retorno;
  }
});