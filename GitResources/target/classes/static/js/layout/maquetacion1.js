/**
 *  @file        : maquetacion1.js
 *
 *  @description : JS de maquetación para el doc maquetacion1
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath*/

console.log("[maquetacion1.js] CARGA");

/**
 *  @method UNLOGGED_VIEW
 *
 *  Muestra de pintado de las marcas de aviso para usuarios no logados
 *
 *  @details
 *        Buscar en color_components_XXX.scss
 *        // BOTONES Y LINKS NO-LOGADO
 *
 */
const UNLOGGED_VIEW=function($capas_afectadas){
  /**
   *  Flujo inicial de acciones
   */
  const INIT=()=>{
    EVENTOS();
  },
  /**
   *  Contenedor de eventos
   */
  EVENTOS=()=>{
    // cambio de estado del checkbx
    $view_unlogged.on("change",e=>{
      const $el       = $(e.currentTarget);
      const isChecked = $el.is(':checked');
      if(isChecked){
        $capas_afectadas.addClass("unlogged");
      }
      else{
        $capas_afectadas.removeClass("unlogged");
      }
    });
  },
  /**
   *  Contenedor de plugins
   */
  PLUGINS=()=>{

  },
  /**
   *  Contenedor de operaciones
   */
  OPS={

  };
  ///////////////////////////
  // INICIALIZACION
  ///////////////////////////
  const $body          = $(document.body);
  // Botón unlogged
  const $view_unlogged = $body.find("#view_unlogged");
  if($view_unlogged.length===1){
    // capa padre donde ubicar la clase .unlogged y que afecta a todos los elementos contenidos
    // si no se define entonces $body
    $capas_afectadas=$capas_afectadas || $body;
    INIT();
  }
};

UNLOGGED_VIEW();