/**
 *  @file        : tmpl_comments.js
 *
 *  @description : Js para para las vistas Mi Perfil (Comments)
 *  @license     : baratz
 *  @copyright   : 2023
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2023-05-09
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz */
if (!Baratz.myProfile){
  Baratz.myProfile={
    body:$(document.body),
  };
}

Object.assign(Baratz.myProfile,{

  /**
   *  Acciones js para las vistas de Mi Perfil (Comentarios)
   *
   *  @method  Baratz.myProfile.TMPL
   */
  TMPL:function(){
 // INICIALIZACION
	  const INIT=$btn_modales=>{
		  OPS.btns_read($btn_modales);
	      EVENTOS.general();
	    },
	  // EVENTOS
	  EVENTOS={
		  general:()=>{},		   
	 	  lanzador:()=>{},		  
	  },
	  // OPERACIONES
	  OPS={ }	 
	const $body=$(document.body);
    const $loading=$body.find(".loading");
    INIT();
}
});

console.log("[tmpl_comment.js] CARGA");
 
