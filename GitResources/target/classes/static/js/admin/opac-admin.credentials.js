/**
 *  @file        : opac-admin.credentials.js
 *
 *  @description : js de aplicación en la página de administración credenciales
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

console.log("[opac-admin.credentials.js] CARGA");

if (!Baratz.admin_credentials){
  Baratz.admin_credentials={};
}

/**
 *  Contenedor de acciones en la pestaña administración credenciales
 *
 *  @cont Baratz.catalog
 *
 */
Object.assign(Baratz.admin_credentials,{
  // Secuencia de inicializacion
  init:()=>{
    const retorno=new Promise((resolve, reject)=>{
console.log("Baratz.admin_credentials.init()");
      resolve();
    });
    return retorno;
  },
  eventos:()=>{

  },


});