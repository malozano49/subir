/**
 *  @file        : tmpl_faqs.js
 *
 *  @description : Js de aplicación en las vistas faq
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

console.log("[tmpl_faqs.js] CARGA");

if (!Baratz.infos){
  Baratz.infos={
    question:Baratz.tmpls_actions.UTILS.parseURL(window.location.href),
  };
}

/**
 *  Contenedor de acciones en la vista infos FAQ
 *
 *  @obj Baratz.infos
 *
 */
Object.assign(Baratz.infos,{
  // INICIALIZACION
  init:()=>{
    // Ejemplo url .../public/info/faq?question=error_search
    const question_id=Baratz.infos.question.searchObject.question;
    if(typeof(question_id)!=="undefined"){
      Baratz.infos.OPS.scroll_to_id(question_id);
    }
    Baratz.infos.eventos();
  },
  // EVENTOS
  eventos:()=>{


  },
  // OPERACIONES
  OPS:{
    /**
     *  Apertura del collapse $question si no está ya desplegado
     *
     *  @method Baratz.infos.OPS.finalize
     *
     *  @param {dom object} $cont : contenedor del desplegable
     */
    finalize:$cont=>{
      const $btn_ctrl_collapse=$cont.find(".btn_ctrl_collapse");
      const $collapse=$cont.find(".collapse");
      const isExpanded=$collapse.hasClass("show");
      if(!isExpanded){
        $collapse.collapse("show");
      }
    },
    /**
     *  Comprueba la existencia de un tag con una id dada y efectua un scroll hasta ese contenedor
     *
     *  @method Baratz.infos.OPS.scroll_to_id
     *
     *  @param {string} question_id  : id de la capa afectada sin '#'
     *
     *  @details Parametriza un callback al finalizar el desplazamiento
     */
    scroll_to_id:async (question_id)=>{
      const $question=$(document.body).find("#"+question_id);
      const hay_question=($question.length===1);
      if(hay_question){
        await Baratz.tmpls_actions.UTILS.scroll_anchor($question);
        Baratz.infos.OPS.finalize($question);
      }
    }
  }

});