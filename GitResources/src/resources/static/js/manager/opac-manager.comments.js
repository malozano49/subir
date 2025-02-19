/**
 *  @file        : opac-manager.comments.js
 *
 *  @description : js de aplicación en la página de manager comentarios
 *  @license     : baratz
 *  @copyright   : 2023
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2023-09-05
 *
 *  @validate    : https://jshint.com/
 *
 *  HAY @TODO
 *
 */
// jshint jquery :true, esversion:10
/* globals Baratz*/

console.log("[opac-manager.comments.js] CARGA");

if (!Baratz.manager_comments){
  Baratz.manager_comments={
    // success       : BaratzContextPath + 'manager/comments?msg=comment.success.edit&msgLevel=success',
    // error         : BaratzContextPath + 'manager/comments?msg=comment.error.edit&msgLevel=danger',
    // clon
    item_base_clone : $("<div/>",{"class":"item_base_clone"}),
  };
}

/**
 *  Contenedor de acciones en la pestaña manager comentarios
 *
 *  @obj Baratz.manager_comments
 */
Object.assign(Baratz.manager_comments,{

  // INICIALIZACION
  init:()=>{
	  console.log('opac-manager.comments.js');  
  },
});
// click en botón que saca el popup de borrar
$('.page_type_manager').on('click','.btn_comment_delete', function(ev){
	ev.preventDefault();
	//console.log('opac-manager.comments.js onclick de  botón borrar con clase btn_comment_delete ',ev.currentTarget);
	const ide = ev.currentTarget.getAttribute('data-id');
	const modalbody = document.getElementById('modal_delete_comment-admin').innerHTML;
	const modal = Baratz.commons.opinions.modal('modal_delete_comments_'+ide, modalbody, Baratz.i18n_js.comment.delete, 'warning', 'delete');
	$(document.body).append(modal);
})

//click en el botón de la modal para confirmar borrar
$('.page_type_manager').on('click','.btn_borrar_comment.manager', function(ev){
		ev.preventDefault();
		const ide = document.querySelector('.modal_delete_comments.modal.show').id.split('_')[3];
		const form = document.querySelector('[name="commentsdel-admin"]');
		form.querySelector('[name="id"]').value = Number(ide);
		form.submit();
		if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
		document.querySelector('.modal.fade.show.d-block').remove();
})
// click en botón que saca el popup de validar
$('.page_type_manager').on('click', '.btn_comment_validate', function(ev){
		const ide = ev.currentTarget.id;	
		const txt = validateText(ev.currentTarget);
		const buttonText = validateButton(ev.currentTarget)
		const actionConfirm = validateConfirm(ev.currentTarget);
		const actionTitle = validateTitle(ev.currentTarget)
		

	
		const modalbody = document.getElementById('modal_validate_comment').innerHTML;		
		const modal = Baratz.commons.opinions.modal('modal_validate_comments_' + ide, modalbody, actionTitle, 'warning', txt ,false);	//hidden para que la modal salga display none y manipular el contenido antes de mostrarla	
		$(document.body).append(modal);
		let vmodal = document.getElementById('modal_validate_comments_'+ide);
		vmodal.querySelector('.modal-body span').innerText = "";
		vmodal.querySelector('.modal-body span').innerText =actionConfirm;
		vmodal.querySelector('.btn_validar_comment').textContent="";
		vmodal.querySelector('.btn_validar_comment').textContent = buttonText;
		vmodal.classList.remove('d-none');
		vmodal.classList.add('d-block');
});
//click en el botón de la modal para confirmar validar/invalidar
$('.page_type_manager').on('click', '.btn_validar_comment', function(ev){
			const ide = document.querySelector('.modal_validar_comments.show.d-block').id.split('_')[3];
			console.log('document.getElementById('+ide+') ', document.getElementById(ide))
			const boton =  document.getElementById(ide);			
			const form = boton.parentNode.querySelector('form');
			//form.querySelector('[name="id"]').value = Number(ide);
			form.submit();
			if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
			document.querySelector('.modal.fade.show.d-block').remove();
		});
//click en el botón cancelar de cualquier acción		
$('.page_type_manager').on('click', '.btn_cerrar ', function(){
	if(document.querySelector('.modal-backdrop.fade.show')) document.querySelector('.modal-backdrop.fade.show').remove();
	document.querySelector('.modal.fade.show.d-block').remove();
});
const validateText = function(boton){
	let vtext = '';
  	const span = boton.querySelector('span.icono');
  	span.classList.contains('fa-check')
		vtext = span && span.classList.contains('fa-check') ? 'invalidar' : 'validar';
		return vtext;
	}
	
	const validateButton = function (boton){
				let vbutton = '';
		  		const span = boton.querySelector('span.icono');
				vbutton = span && span.classList.contains('fa-check')? Baratz.i18n_js.comment.invalidate_button : Baratz.i18n_js.comment.validate_button;
				return vbutton;
			}
	
	const validateConfirm = function(boton){
		let vconfirm = '';
  	const span = boton.querySelector('span.icono');
  	span.classList.contains('fa-check')
		vconfirm = span && span.classList.contains('fa-check') ? Baratz.i18n_js.comment.invalid_confirm : Baratz.i18n_js.comment.valid_confirm;
		return vconfirm;
	}
	
	const validateTitle = function(boton){
		let vtitle = '';
  	const span = boton.querySelector('span.icono');
  	span.classList.contains('fa-check')
		vtitle = span && span.classList.contains('fa-check') ? Baratz.i18n_js.comment.invalidate : Baratz.i18n_js.comment.validate;
		return vtitle;
	}

