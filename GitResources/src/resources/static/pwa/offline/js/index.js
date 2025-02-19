/**
 *  @file        : index.js
 *
 *  @description : Js de offline-page
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-10-06
 *
 *  @validate    : https://jshint.com/
 *
 *  @refs        : https://web.dev/offline-fallback-page/
 *
 */
// jshint jquery :true, esversion:10
/* globals Baratz,consoleScript,Swiper,jsSocials,Sortable */

console.log("[offline/js/index.js]");

/**
 *  Pinta el bonito efecto "canal sin señal"
 *
 *  @method no_connection_picture()
 *
 *  @ref https://codepen.io/ademilter/pen/hDtpq
 */
const no_connection_picture = ()=>{
  const WIDTH = 700,
	HEIGHT = 500;

	let ctx,
	imgData,
	pix,
	flickerInterval;

	const init = ()=>{
		const canvas = document.getElementById('canvas_offline');
		ctx = canvas.getContext('2d');
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.fill();
		imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
		pix = imgData.data;
		flickerInterval = setInterval(flickering, 30);
	},
  flickering = ()=>{
		for (let i = 0; i < pix.length; i += 4) {
			const color = (Math.random() * 255) + 50;
			pix[i] = color;
			pix[i + 1] = color;
			pix[i + 2] = color;
		}
		ctx.putImageData(imgData, 0, 0);
	};

  init();
},
/**
 *  Si hay datos de usuario, se pinta la vista necesaria
 *
 *  @method retrieve_html_data_user()
 */
retrieve_html_data_user = ()=>{
  const $body=$(document.body);
  const localStor=Baratz.tmpls_actions.UTILS.ctrl_storage.load("user_datos_logged");
  if(typeof(localStor)!=="undefined" && localStor!==null && localStor!==""){
    // si no ha pasado el tiempo de expiracion definido
    const expiration=localStor.expiry;
    const actual=new Date().getTime();
    //if(expiration>=actual){
      const $component_user_data=$body.find(".component-user_data");
      $component_user_data.removeClass("d-none");
      const base64ToString=Baratz.tmpls_actions.UTILS.ctrl_storage.base64.decompress(localStor.value);
      const $cont_data_user=$component_user_data.find(".cont_data_user");
      $cont_data_user.html(base64ToString);
      // control botonera de menu
      ctrl_menu_reservations();
    /* }
    else{
      Baratz.tmpls_actions.UTILS.ctrl_storage.delete("user_datos_logged");
    } */
  }
},
/**
 *  En la vista de datos de usuario, controla las vistas de solicitudes (actuales e histórico)
 *
 *  @method ctrl_menu_reservations();
 */
ctrl_menu_reservations = ()=>{

  const INIT=()=>{
    // Inicia en oculto 'Mis Solicitudes'
    $solicitudes.addClass("d-none");
    EVENTOS();
  },

  EVENTOS=()=>{
    // Al click en un boton de los menus
    $btns_menu.on("click",(e)=>{
      const $btn=$(e.currentTarget);
      OPS.change_view($btn);
      return false;
    });
  },
  OPS={
    /**
     *  Cambio de vista
     *
     *  @param {dom object} $btn : Botón jquery afectado
     */
    change_view:($btn)=>{
      const btn_type=$btn.attr("data-type");
      $menuLoans.find(".active").removeClass("active");
      switch(btn_type){
        case"btn_actuales":{
          $actuales.removeClass("d-none");
          $solicitudes.addClass("d-none");
          $menuLoans.find('[data-type="btn_actuales"]').addClass("active");
        }
        break;
        case"btn_solicitudes":{
          $solicitudes.removeClass("d-none");
          $actuales.addClass("d-none");
          $menuLoans.find('[data-type="btn_solicitudes"]').addClass("active");
        }
        break;
        default:
      }

    },
  };
  // GLOBALES
  const $body=$(document.body);
  const $actuales=$body.find(".sct_reader_loans").parent();
  const $solicitudes=$body.find(".reader-reservations").parent();
  const $menuLoans=$body.find(".menuLoans");
  const $btns_menu=$menuLoans.find('[data-type]');
  $menuLoans.find('[data-type="btn_actuales"]').addClass("active");
  // INICIALIZACION
  INIT();
},

/**
 *  Comprueba si el servidor responde y si es así recarga la página para evitar el offline
 *
 *  @method checkNetworkAndReload();
 */
checkNetworkAndReload = async ()=>{
console.log("[PWA index.js] checkNetworkAndReload() ");
  try {
    const response = await fetch('.');
    // Verify we get a valid response from the server
    if (response.status >= 200 && response.status < 500) {
      //window.location.reload(); // Cuidado con esto
      console.log("[PWA index.js] checkNetworkAndReload() No hay conexion con servidor");
      return;
    }
  } catch {
    // Unable to connect to the server, ignore.
  }
  window.setTimeout(checkNetworkAndReload, 2500);
},

/**
 *  Añade acciones a los eventos generales
 *
 *  @method eventsAdd();
 */
eventsAdd=()=>{
  window.addEventListener('online', () => {
    window.location.reload();
  });
};

eventsAdd();
no_connection_picture();
retrieve_html_data_user();
checkNetworkAndReload();

Baratz.tmpls_actions.TABLE_BIG_00();