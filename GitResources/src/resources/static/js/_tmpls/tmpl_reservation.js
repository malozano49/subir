/**
 *  @file        : tmpl_reservation.js
 *
 *  @description : Js para realizar solicitud de un ítem
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath */

console.log("[reservation.js] CARGA");

if (!Baratz.reservation){
  Baratz.reservation={};
  Baratz.reservation.scope = 'reader/reservation';
  Baratz.reservation.context = BaratzContextPath + Baratz.reservation.scope;
  Baratz.reservation.cancelReservationUrl= Baratz.reservation.context +'/cancel/';
  Baratz.reservation.reserve = {};
  Baratz.reservation.reserve.scope = BaratzContextPath +  'reader/circulation/reserve/';
  Baratz.reservation.reserve.deskUrl =  Baratz.reservation.reserve.scope+'desk';
}

Object.assign(Baratz.reservation,{
	/**
	 *  Petición de mostradores para la sucursal determinada en la entrada sucursal
	 *
	 *  @method Baratz.reservation.changeDesk
	 *
   *  @details : Al efectuar el cambio de sucursal, se determina el numero de mostradores recibido.
   *             Si la cantidad de mostradores es 1 o menor, el campo mostrador aparecerá disabled.
   *             • Fn lanzada desde Baratz.tmpls_actions.SELECTS_DEPENDIENTES.initialize()
	 */
	changeDesk:($select_branch)=>{
		let valores = [];
    // puede haber varios barcodes
		$("input[name='reserve.barcodes']").each((i,e)=>{
      const $input=$(e);
      const valor=$input.val();
	    valores.push(valor);
	  });

    // conversion de array a string con separador coma
    valores=valores.toString();
		$.ajax({
      url  : Baratz.reservation.reserve.deskUrl,
      type : "get",
      data : {
        branch : $select_branch.val(),
        source : $("input[name='source']").val(),
        copy   : valores,
      },
      success:(response,status,jqXHR)=>{
        const $select_desk=$select_branch.closest(".selects_dependientes_js").find('#reserve\\.desk');
        const $cont_selectPicker=$select_desk.closest(".cont_selectPicker");
        // destruye el selectpicker
        Baratz.tmpls_actions.APPLY_SELECTPICKERS($cont_selectPicker,false,true);
        // Inserta nuevas opciones
        $select_desk.empty().append(response);
        // Aplica la fn de dependencias
        if($select_desk.find("option").length<=1){
          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_add_disabled($select_desk);
        }
        else{
          Baratz.tmpls_actions.SELECTS_DEPENDIENTES.select_remove_disabled($select_desk);
        }
        // genera un nuevo selectpicker
        Baratz.tmpls_actions.APPLY_SELECTPICKERS($cont_selectPicker,false);
        // habilita / deshabilita el boton submit
        Baratz.reservation.ctrl_btn_submit();
      },
      error:(request,status,error)=>{
        console.log("[reservation.js] No se ha podido recuperar la lista de sucursales:::",`${error}\r\n${request.statusText}\r\n${request.responseText}`);
      }
    });
	},

  /**
   *  A través de un campo data ubicado en el mensaje de alerta, se opera el control del submit,
   *  para habilitarlo o deshabilitarlo al seleccionar un mostrador
   *
   *  @method Baratz.reservation.ctrl_btn_submit
   */
  ctrl_btn_submit:()=>{
    const $body=$(document.body);
    const $select_desk                     = $body.find('#reserve\\.desk');
    const $btn_submit                      = $body.find(".btn-form_reserve_search");
    const $fld_alert_apiMessageReservation = $body.find(".fld_alert_apiMessageReservation");
    if($fld_alert_apiMessageReservation.length>0 && $fld_alert_apiMessageReservation.attr("data-ctrl_btn_submit")=="true"){
      // se aplica disabled al botón solicitar hasta seleccionar un mostrador
      const valor=$select_desk.val();
      if(valor!==""){
        $btn_submit.removeAttr("disabled");
      }
      else{
        $btn_submit.attr("disabled","disabled");
      }
    }
  },

	/**
	 *  Cancela la reserva de un elemento dado aplicando nuevo valor en el location (renew page)
	 *
	 *  @method Baratz.reservation.cancelReservation
	 *
	 *  @param {string} id      : id del elemento al cual cancelar la reserva
	 *  @param {string} source  : efilm,...
	 */
	cancelReservation :(id,source)=>{
		document.location.href=`${Baratz.reservation.cancelReservationUrl}${id}/${encodeURIComponent(source)}`;
	},


});