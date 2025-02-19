/**
 *  @file        : tmpl_authority.js
 *
 *  @description : js de aplicación para la búsqueda por autoridad
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

console.log("[tmpl_authority.js] CARGA");

if (!Baratz.authority){
  Baratz.authority={};
}

/**
 *  Contenedor de operaciones para la búsqueda por autoridad
 *
 *  @cont Baratz.authority
 *
 */
Object.assign(Baratz.authority,{
  /**
   *  Inicialización
   *
   *  @method Baratz.authority.init
   */
  init:()=>{
    // GLOBALS
    const $body=$(document.body);
    Baratz.authority.$select1=$body.find("#select1");
    Baratz.authority.$select2=$body.find("#select2");
    Baratz.authority.select2.gestiona_campos();
    Baratz.authority.events();
  },
  /**
   *  Eventos
   *
   *  @method Baratz.authority.events
   */
  events:()=>{
    // eventos sobre el select afectado
    const $select1= Baratz.authority.$select1;
    $select1.on("change",e=>{
      //const $select=$(e.currentTarget);
      Baratz.authority.select2.gestiona_campos();
    });
  },
  /**
   *  Acciones sobre el select #select_2 'selección de filtros'
   *
   *  @cont Baratz.authority.select2
   */
  select2:{
    /**
     *  A través del valor de #select1 (seleccion de campos) se gestionan acciones para el select
     *
     *  @method Baratz.authority.select2.gestiona_campos
     */
    gestiona_campos:()=>{
      const $select1=Baratz.authority.$select1;
      const select1_val=$select1.val();
      // Si el valor es Todos los campos se deshabilitan los options en #select2
      if(select1_val===""){
        Baratz.authority.select2.deshabilita_campos();
      }
      else{
        Baratz.authority.select2.habilita_campos();
      }
    },
    /**
     *  Deshabilita los options necesarios en el select dependiente
     *
     *  @method Baratz.authority.select2.deshabilita_campos
     */
    deshabilita_campos:()=>{
      const $select2=Baratz.authority.$select2;
      $select2.val("auth.search.contains");
      const $options=$select2.find("option").not('[value="auth.search.contains"]');
      $options.attr('disabled','disabled');
      // si está aplicado el plugin, se refresca
      if(typeof($select2.selectpicker)==="function"){
        $select2.selectpicker("refresh");
      }
    },
    /**
     *  Habilita los optons necesarios en el select dependiente para su selección
     *
     *  @method Baratz.authority.select2.habilita_campos
     */
    habilita_campos:()=>{
      const $select2= Baratz.authority.$select2;
      $select2.find("option").removeAttr("disabled");
      // si está aplicado el plugin, se refresca
      if(typeof($select2.selectpicker)==="function"){
        $select2.selectpicker("refresh");
      }
    }
  },
});