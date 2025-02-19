/**
 *  @file        : utils.js
 *
 *  @description : Pequeños procedimientos con utilidades js
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 *
 */
// jshint jquery :true, esversion:10
/* globals Baratz,consoleScript,BaratzContextPath */

console.log("[utils.new.js] CARGA");

if(typeof(Baratz)==="undefined"){
  Baratz = {};
}
if(!Baratz.tmpls_actions){
  Baratz.tmpls_actions = {};
}
if(!Baratz.i18n_js){
  Baratz.i18n_js = {};
}
if(!Baratz.i18n_js.fallback_images){
	Baratz.i18n_js.fallback_images = {};
}

if(!Baratz.i18n_js.carousel){
	Baratz.i18n_js.carousel = {};
}
$(document).ready(function() {
$('.img_on_load').addClass('img_ok');
});


// App storage
// Usado para la carga de idiomas por ejemplo
Baratz.storage=window.localStorage;

/**
 *  Contenedor de útiles js
 *
 *  @cont Baratz.tmpls_actions.UTILS
 */
Baratz.tmpls_actions.UTILS={
  /**
	 *  Revisa un literal dado para sustituir determinados items por cifras
	 *
	 *  @method Baratz.tmpls_actions.UTILS.traduccion_en_params
	 *
	 *  @param {string} literal: texto donde insertar cifras
	 *  @param {arr} arr: array con las cifras en su posicion
	 *
	 *  @return {string} array completado
   *
   *  @details El listeral llevara las sustituciones marcadas como {0}...{1}...{2}...
	 */
  traduccion_en_params:(literal,arr)=>{
    let retorno=literal;
    arr.forEach((e,i)=>{
      const sust=retorno.replace('{'+i+'}',e);
      retorno=sust;
    });
    return retorno;
  },

  /**
   *  Elimina caracteres de control, espacios consecutivos (los reduce a 1), comentarios html y para finalizar blancos entre ><.
	 *
	 *  @method Baratz.tmpls_actions.UTILS.cleanTextHTML
	 *
   *  @param {string} textHTML : (outerHTML) HTML en formato texto (por una peticion ó content.get(0).outerHTML)
   *
   *  @returns {string} retorno : Texto HTML limpio
   */
  cleanTextHTML:textHTML=>{
    const retorno=textHTML.replace(/(\r\n\t|\n|\r|\t)/gm, "").replace(/\s+/g, " ").replace(/<\!--.*?-->/g, "").replace(/>\s+</g,'><');
    return retorno;
  },

  /**
	 *  Transforma ciertos caracteres especiales en entidades HTML (escapeHtml)
	 *
	 *  @method Baratz.tmpls_actions.UTILS.encodeHTMLentities
	 *
	 *  @param {string} unsafe: texto a desinfectar
	 *
	 *  @return {string} texto desinfectado, '' si no se ha recibido ningun texto
	 */
  encodeHTMLentities:unsafe=>{
    let retorno='';
    if(unsafe){
      const escapeChars = {
        '&' : 'amp',
        '<' : 'lt',
        '>' : 'gt',
        '"' : 'quot',
        '\'' : '#39'
      };
      // Calcula la expresión regular
      let regexString = '[';
      for (const [key] of Object.keys(escapeChars)){
        regexString += key;
      }
      regexString += ']';
      const regex = new RegExp(regexString,'g');
      // efectua los reemplazos pertinentes
      retorno=unsafe.replace(regex,(m)=>{
        return `&${escapeChars[m]};`;
      });
		}
    return retorno;
	},

  /**
   *  Transforma todas la entidades HTML de un string en caracteres especiales
   *
   *  @method Baratz.tmpls_actions.UTILS.decodeHTMLEntities
   *
   *  @param {string} str: texto
   *
   *  @return {string} retorno: texto con caracteres especiales
   */
  decodeHTMLEntities:str=>{
    const element = document.createElement('div');
    // regular expression HTML entities
    const entity = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig;
    const retorno = str.replace(entity,(m)=>{
      element.innerHTML = m;
      return element.textContent;
    });
    element.remove();
    return retorno;
  },

  /**
   *  Crea un documento fuera del árbol del documento actual y limpia todos los scripts, estilos e imágenes
   *
   *  @method Baratz.tmpls_actions.UTILS.insertDocument
   *
   *  @param {HMTL} myHTML : HTML a inyectar
   *
   *  @returns {HTML} Jquery HTML limpio
   *
   *  @details https://stackoverflow.com/questions/7738046/when-to-use-document-implementation-createhtmldocument
   */
  insertDocument:myHTML=>{
    const newHTMLDocument = document.implementation.createHTMLDocument().body;
    newHTMLDocument.innerHTML = myHTML;
    [].forEach.call(newHTMLDocument.querySelectorAll("script, style, img"),(el)=>{
      el.remove();
    });
    //documentsList.push(newHTMLDocument);
    const retorno=$(newHTMLDocument.innerHTML);
    newHTMLDocument.remove();
    return retorno;
  },

  /**
   *  Busca en una capa de texto dada un formato url para transformarlo en tag link (a href)
   *
   *  @method Baratz.tmpls_actions.UTILS.text2link
   *
   *  @param {string / dom object} capa  : id o clase / capa jquery / capa vanilla
   */
  text2link:capa=>{
    /**
     *  Dado un contenedor con texto, busca urls y las sustituye por tags link (a href)
     *
     *  @method replaceURLWithHTMLLinks
     *
     *  @param {dom object} elm : Capa vanilla donde buscar
     *
     *  @return {dom object} retorno: HTML vanilla con los tags insertados
     */
     const replaceURLWithHTMLLinks=elm=>{
      const e=elm.innerHTML;
      // si el script ya se encuentra aplicado en la capa, se devuelve el texto con el enlace de sustitución ya aplicado
      const is_js_text2link=(elm.querySelectorAll(".js_text2link").length>0);
      if(is_js_text2link){
        return e;
      }
      // Si el script no se encuentra aplicado entonces se aplica (texto con enlace de sustitución)
      return e.replace(/(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/gi, (e, r, n)=>{
        let t = "";
        r = r || "";
        for (let a = /\(/g; a.exec(r);) {
          let l = /(.*)(\.\).*)/.exec(n) || /(.*)(\).*)/.exec(n);
          if(l){
            n = l[1];
            t = l[2] + t;
          }
        }
        // formateo del tag a insertar
        const Link=`<a class="js_text2link" aria-label="${Baratz.i18n_js.utils.js_text2link}" title="${Baratz.i18n_js.utils.js_text2link}" href="${n}" target="_blank" rel="nofollow noopener">${n}</a>`;
        const retorno = r + Link + t;
        return retorno;
      });
    };

    ///////////////////////////////
    // INIT
    ///////////////////////////////
    try{
      if(typeof(capa)==="undefined"||capa===""){
        throw {error:"00"};
      }
      let $capa;
      // Si la capa es un string (id o clase)
      if(typeof(capa)==="string"){
        $capa=document.body.querySelectorAll(capa);
      }
      // Si es un jquery
      const isJqueryObject = (capa instanceof jQuery);
      if(isJqueryObject){
        $capa=capa;
        // Si no existe en el DOM
        if($capa.length===0){
          throw {error:"01",data:capa};
        }
        // Si existe lo convierte a vanilla array
        // Array.prototype.slice.call(capa)
        // [...capa]
        $capa=Array.from(capa);
      }
      // Si las capas vanilla o jquery existen
      if($capa.length>0){
        $capa.forEach (elm=>{
          elm.innerHTML = replaceURLWithHTMLLinks(elm);
        });
      }
      // Si no se encuentra en el DOM
      else{
        throw {error:"02",data:capa};
      }
    }
    catch(excep){
      switch(excep.error){
        case "00":{
          consoleScript.error(`[utils.new.js] Baratz.tmpls_actions.UTILS.text2link() Err:${excep.error} Capa no definida`);
          return;
        }
        case"01":{
          consoleScript.error(`[utils.new.js] Baratz.tmpls_actions.UTILS.text2link() Err:${excep.error} -> ${excep.data} elem jquery no existe en el DOM`);
          return;
        }
        case"02":{
          consoleScript.error(`[utils.new.js] Baratz.tmpls_actions.UTILS.text2link() Err:${excep.error} -> ${excep.data} no existe en el DOM`);
          return;
        }
        default:
          consoleScript.error(`[utils.new.js] Baratz.tmpls_actions.UTILS.text2link() Err:${excep.error} -> ERROR NO DEFINIDO`);
      }
    }
  },

  /**
   *  A través de una url con filename obtiene el filename
   *
   *  @method Baratz.tmpls_actions.UTILS.getfilename
   *
   *  @param {string} url  : url con filename
   *
   *  @return {string} filename
   */
  getfilename:url=>{
    url = url.substring(url.lastIndexOf("/")+ 1);
    return (url.match(/[^.]+(\.[^?#]+)?/) || [])[0];
  },

  /**
   *  A través de una url con filename, obtiene el path
   *
   *  @method Baratz.tmpls_actions.UTILS.getpath
   *
   *  @param {string} url  : url con filename
   *
   *  @return {string} retorno : path de la url con filename
   */
  getpath:url=>{
    let retorno="";
    // Divide url a través de '/' y elimina la referencia al archivo para crear el path
    url.split("/").slice(0,-1).forEach(e=>{
      retorno+=`${e}/`;
    });
    return retorno;
  },

  /**
   *  A través de un path y un filename, devuelve una url con filename js no min
   *
   *  @method Baratz.tmpls_actions.UTILS.getpath_nomin
   *
   *  @param {string} path      : path
   *  @param {string} filename  : filename
   *
   *  @return {string} url con filename js no min
   */
  getpath_nomin:(path,filename)=>{
    const retorno=`${path}${filename}.js`;
    return retorno;
  },

  /**
   *  A través de un path y un filename, devuelve una url con filename js min
   *
   *  @method Baratz.tmpls_actions.UTILS.getpath_min
   *
   *  @param {string} path      : path
   *  @param {string} filename  : filename
   *
   *  @return {string} url con filename js min
   */
  getpath_min:(path,filename)=>{
    const retorno=`${path}${filename}.min.js`;
    return retorno;
  },

  /**
   *  Parsea una url devolviendo un objeto con el desglose
   *
   *  @method Baratz.tmpls_actions.UTILS.parseURL
   *
   *  @param {string} url  : url a desmontar
   *
   *  @return {object} datos del parseo de la url
   */
  parseURL:url=>{
    const parser = document.createElement('a');
    parser.href = url;
    const searchObject = {};
    parser.search.replace(/^\?/, '').split('&').forEach(e=>{
      const split = e.split('=');
      searchObject[split[0]] = split[1];
    });
    return {
      protocol     : parser.protocol,
      host         : parser.host,
      hostname     : parser.hostname,
      port         : parser.port,
      pathname     : parser.pathname,
      search       : parser.search,
      searchObject : searchObject,
      hash         : parser.hash
    };
  },

  /**
   *  Transforma un objeto (o un objeto transformado previamente en un tipo string) en un data para insertar en un tag-data por ejemplo
   *
   *  @method Baratz.tmpls_actions.UTILS.object2data
   *
   *  @param {objeto || string} datos : objeto a transformar ó objecto en formato string a transformar
   *
   *  @return {string} retorno :
   *  	- Si el dato aportado es de tipo object, se devuelve el dato transformado para insertar en el campo data correspondiente
   * 		- Si el dato aportado no es de tipo object, se devuelve el dato tal cual
   */
  object2data:datos=>{
    try{
      let retorno=datos;
      if(typeof(datos)==="object" || typeof(datos)==="string"){
        retorno=encodeURIComponent(JSON.stringify(datos));
        return retorno;
      }
      else{
        throw {error:"00"};
      }
    }
    catch(excep){
      switch(excep.error){
        case "00":{
          consoleScript.log(`[utils.new.js] Baratz.tmpls_actions.UTILS.object2data() Err:${excep.error} El dato esperado no es 'object' ó 'object en formato string' y SE DEVUELVE TAL CUAL:`,datos);
        }
        break;
        default:
          consoleScript.error(`[utils.new.js] Baratz.tmpls_actions.UTILS.text2link() Err:${excep.error} -> ERROR NO DEFINIDO`);
      }
      return datos;
    }
  },

  /**
   *  Habiendo recuperado un contenido de tipo string (de un campo data por ejemplo), lo transforma en objeto para su uso
   *
   *  @method Baratz.tmpls_actions.UTILS.data2object
   *
   *  @param {string} datos :string recuperado del campo data
   *
   *  @return {object || string} retorno : transformacion
   *  @return {void} datos      : en caso de error se devuelve el dato aportado sin transformar
   */
  data2object:datos=>{
    try{
      const retorno=JSON.parse(decodeURIComponent(datos));
consoleScript.log("Baratz.tmpls_actions.UTILS.data2object->",retorno)
      return retorno;
    }
    catch(err){
      consoleScript.log("[utils.new.js] Baratz.tmpls_actions.UTILS.data2object() ERROR de transformación con el dato aportado y SE DEVUELVE TAL CUAL:",datos);
      return datos;
    }
  },

  /**
   *  Convierte un objeto a string
   *
   *  @method Baratz.tmpls_actions.UTILS.object2string
   *
   *  @param {object} obj: objeto a convertir
   *
   *  @return {str} retorno : string de retorno
   *  @return {xxx} datos   : en caso de error se devuelve el dato aportado sin transformar
   *
   *  @details : Fn recursiva
   *  NO USADA PASAR CAMBIAR A NUEVO ECMA SI SE USA
   */
  object2string:function(obj){
    try{
      let string_array = [];
      const that=this;
      if (typeof(obj) === "object" && (obj.join == undefined)) {
        string_array.push("{");
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            // recursive
            string_array.push(prop, ": ", that.object2string(obj[prop]), ",");
          }
        }
        string_array.push("}");
      }
      // is array
      else if (typeof(obj) === "object" && obj.join !== undefined) {
        string_array.push("[");
        for(let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            // recursive
            string_array.push(that.object2string(obj[prop]), ",");
          }
        }
        string_array.push("]");
      }
      // is function
      else if (typeof(obj) === "function") {
        string_array.push(obj.toString());
      }
      // all other values can be done with JSON.stringify
      else {
        string_array.push(JSON.stringify(obj));
      }
      // crea string de retorno a trves del array generado
      let retorno=string_array.join("");
      return retorno;
    }
    catch(err){
      consoleScript.log("[utils.new.js] Baratz.tmpls_actions.UTILS.object2string() ERROR de transformación con el dato aportado y SE DEVUELVE TAL CUAL:",obj);
      return obj;
    }
  },

  /**
   *  Convierte un string a objeto
   *
   *  @method Baratz.tmpls_actions.UTILS.string2object
   *
   *  @param {str} str: string a convertir
   *
   *  @return {object} retorno : objeto
   *  @return {xxx} datos      : en caso de error se devuelve el dato aportado sin transformar
   */
  string2object:str=>{
    try{
      //var retorno=eval("("+str+")");
      const retorno=JSON.parse(str);
      return retorno;
    }
    catch(err){
      consoleScript.log("[utils.new.js] Baratz.tmpls_actions.UTILS.string2object() ERROR de transformación con el dato aportado y SE DEVUELVE TAL CUAL:",str);
      return str;
    }
  },

  /**
   *  Genera una secuencia aleatoria que puede ser usada como id por ejemplo
   *
   *  @method Baratz.tmpls_actions.UTILS.randomId
   *
   *  @return {string} secuencia generada
   */
  randomId:()=>{
    return (Date.now().toString(36) + Math.random().toString(36).substring(2, 5)).toUpperCase();
  },

  /**
   *  Carga asíncrona en orden de una lista de scripts js proporcionada, con ejecución del script a su carga
   *
   *  @method Baratz.tmpls_actions.UTILS.requiredJSAsync
   *
   *  @param {array strings} listUrlsJs : Lista inicial de scripts js a cargar
   *
   *  @return {promise apply} Aplicación de la promesa (Se usa para decir "cuando todas estas promesas se resuelvan ... haz algo"),
   *    Instanciada la fn se asocia a una var y cuando se finaliza la carga se evalua en '$.when(control).done(function(retorno){' para ejecutar un callback
   *
   *  @details  https://stackoverflow.com/questions/11803215/how-to-include-multiple-js-files-using-jquery-getscript-method/25328848#25328848
   *
   *  PDTE $.DEFERRED
   */
  requiredJSAsync:listUrlsJs=>{
    /**
     *  Carga via ajax un fichero js a través de la url proporcionada.
     *  Si es un plugin se carga a través de su url original (da igual si es min o no)
     *
     *  @method loadjs
     *
     *  @param {obj} control : Datos para la carga del doc js
     *    {
     *      {str} js_original : js_original       Nombre del doc js
     *      {str} js          : url_base+file_no_min   Path al fichero no min
     *      {str} js_min      : url_base+file_min      Path al fichero min
     *      {bol} isPlugin    : isPlugin          Si es plugin o no
     *      {bol} state       : false             Si se ha cargado correctamente este valor es true
     *      {num} num_cargas  : 0                 Contador de intentos de carga
     *    }
     *  @param {str} url_path              : Path para carga del fichero
     *  @param {fn} resolve                : Fn resolve de la promise
     *  @param {array strings} listUrlsJs : Lista inicial de scripts js a cargar
     *
     *  @details Fn recursiva
     */
    const loadjs=async(control,url_path,resolve,listUrlsJs)=>{
      // si es un plugin (está en la carpeta plugins) se carga siempre el js a traves del url string definido en el plugin y
      // no el min generado en la compilación opac, para evitar problemas
      if(control.isPlugin){
        url_path=BaratzContextPath+control.js_original;
      }
      try{
        // https://github.com/mdn/fetch-examples/
        const response = await fetch(url_path,{method : "GET" });
        // si  no es ok
        if(!response.ok) {
          // Y el número de intentos de carga es 0
          if(control.num_cargas===0){
            control.num_cargas=control.num_cargas+1;
            // intenta de nuevo, pasando la url no min para ver si ahora no falla el intento
            loadjs(control,control.js,resolve,listUrlsJs);
          }
          throw new Error(response.status);
        }
        else{
          consoleScript.log( `[utils.new.js] Baratz.tmpls_actions.UTILS.requiredJSAsync()->loadjs() FETCH: OK cargando ${url_path} correctamente.`);
          // Recupera el script y procede a su ejecución
          response.text().then(text=>{
            control.state = true;
            console.log('loadjs control.js_original: '+control.js_original);
            console.log('loadjs text size: '+ Object.keys(text).length);
            console.log('loadjs resolve: '+ resolve);
            console.log('loadjs listUrlsJs: '+listUrlsJs);
            executeInOrder(control.js_original,text,resolve,listUrlsJs);
          });
        }
      }
      catch (error){
        consoleScript.log(`[utils.new.js] Baratz.tmpls_actions.UTILS.requiredJSAsync()->loadjs() FETCH: Hubo un problema con la petición: ${url_path} ${error}`);
      }
    },
    /**
     *  Evaluación (ejecución) ordenada de un array de urls de scripts
     *
     *  @method executeInOrder
     *
     *  @param {obj} url_path              : Url del script a ejecutar
     *  @param {str} code                  : Script a ejecutar
     *  @param {fn} resolve                : Fn resolve de la promise
     *  @param {array strings} listUrlsJs  : Lista inicial de scripts js a cargar
     *
     *  @details Fn recursiva
     */
    executeInOrder=async(url_path,code,resolve,listUrlsJs,callback=Function)=>{

      var origenes = localStorage.getItem('origenes');

      if(origenes){
        
         if(document.getElementById('solrSearch.origin')){

           document.getElementById('solrSearch.origin').value = origenes;
           
         }else{

           let new_origenes = origenes.split(',');

           if(new_origenes.indexOf('any_source')==-1){
             $('#any-source').next('span').removeClass('activado');
           }

           if(new_origenes.length) {
              $('#any-source').prop("checked",false);
              for(var i=0; i<new_origenes.length;i++){
                let $newOrigen = $('#'+new_origenes[i]);
                $newOrigen.prop("checked",true);
                $newOrigen.next('span').addClass('activado');
              }
           }

         }
       }
		  
		  ///// VALORACIONES Y COMENTARIOS ////		
		 (function valoraciones(){
		  	// const numstars = Number(document.querySelector('#total-stars').value);	
			const viewComments = document.querySelector('.view-comments');
			if (viewComments) {
				const attHash = viewComments.getAttribute('att-hash');
				if (location.href.indexOf('search') >= 0) {
			      // Estás en la página de lista
			    } else {
				      // Estás en la página de detalle
				     if(location.href.indexOf('tcomments-tab')>-1){
					      if (attHash && attHash !== '') {							
					        clicktab(attHash);
					      }			
					      viewComments.addEventListener('click', function (ev) {
					        ev.preventDefault();
					        clicktab(attHash);
					      });  			  
		  			  }
	  			  }
  			  }
		  })();
	    if(location.href.indexOf('tcomments-tab')>-1){					     		
	       $('#tcomments-tab').click();
			}		
		 
		  	
		  (function meters(){
			  const meters = document.querySelectorAll('.average-rating');
			 if(meters.length>0){
				 for(let i=0; i<meters.length; i++){
					// console.log(meters[i]);
					 let meter = meters[i];
					 let percent =((meter.value/5)*100)+"%";
			        if(meter.length>1) {						
						if(meter[1].parentNode.parentNode.parentNode.classList.contains('mobile_flex')){
							meter_mobile =meter[1];
						}
					}
				    if (percent !== 0) {
						//console.log(meter)
						  meter.style.setProperty('--percent', percent);
						  meter.classList.add('custom-style');
						  if(meter.length>1) {
							    meter[1].style.setProperty('--percent', percent);
						  		meter[1].classList.add('custom-style');
								//meters[1].style.setProperty('--rating', '★'.repeat(numstars))
						  }
					}else{
						  meter.classList.remove('custom-style');
						  if(meter_mobile) {
							  meter_mobile.classList.remove('custom-style');
						  }
					}
					//meter.style.setProperty('--rating', '★'.repeat(numstars));
				}				 
			 }
		  })();
		  
		function clicktab(tab) {
			var tabs = document.querySelector('#myTab').querySelectorAll('.nav-link');
			var tabContent = document.querySelector('.tab-content');
			var tabPanes = tabContent.querySelectorAll('.tab-pane');
			var tabPane = tab.split('-')[0];
			tabs.forEach(function(tb){
				if(tb.id!=tab.split('#')[1]){
					tb.classList.remove('in');
				  	tb.classList.remove('active');
				}else {
					tb.classList.add('in');
				  	tb.classList.add('active');
					tb.focus();
				}
			})
			tabPanes.forEach(function(pane) {
				if(pane.id!=tabPane.split('#')[1]){
				  pane.classList.remove('in');
				  pane.classList.remove('active');
				  pane.classList.remove('show');
			  }else {
				  pane.classList.add('in');
				  pane.classList.add('active');
				  pane.classList.add('show');
			  }
			});
		}    
		
		const starRatingForm = document.querySelector(".all-stars");
		const handleFormChange = (e) => {
			let ord = Number(e.target.id.split('punctuation')[1]);
		  	let lis = document.querySelector('.modal-body').querySelectorAll('li');
		  	lis.forEach((li) => {
		      li.classList.remove("selecteds");
		    });		    
		  	for(let i=1;i<=ord;i++){
			  document.querySelector('.modal-body #punctuation'+i).parentElement.classList.add("selecteds");		  
			}
		 e.target.checked = true;
		 e.target.parentNode.addEventListener('click', handleFormChange)
		}	
		if(starRatingForm){
			starRatingForm.addEventListener("change", handleFormChange);
		}
		
	 ///// END VALORACIONES Y COMENTARIOS ////		
	 
      // Si es el 1er script a ejecutar
      // listUrlsJs = parámetro pasado a requiredJSAsync, Lista original de scripts js a cargar
      if (url_path === listUrlsJs[0]) {
        // elimina el primer elemento del array y lo retorna
        listUrlsJs.shift();
        // eval(code); //para ejecutar el script y en vez de esto, mejor:
        // Function(code)();
        // Al final se predefine en los params
        console.log('executeInOrder code size:'+ Object.keys(code).length);
        callback(code)();
        // Resuelve la promesa del array de promesas (arr_promises)
        resolve();
      }
      else{
        // waiting por error (Uncaught (in promise) RangeError: Maximum call stack size exceeded)
        setTimeout(()=>{
          executeInOrder(url_path, code, resolve ,listUrlsJs);
        },1);
      }
    };

    ///////////////////////////////////////////////
    // INICIO
    ///////////////////////////////////////////////
   


    function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}




waitForElm('#burger-menu').then((elm) => {
	waitForElm('#menu2').then((elm2) => {
			document.ElementById('burger-menu').onclick = function(){
			     document.ElementsByClassName('menu2')[0].classList.toggle("openMenu");
			} 
	});
});


waitForElm('#desplegarUtilidades').then((elm) => {
	
var desplegarUtilidades = document.getElementById("desplegarUtilidades");	
if(desplegarUtilidades){
 document.getElementById("desplegarUtilidades").addEventListener('click', function(){
	 document.getElementById('utilitiesDisplay').classList.add("openUtilities");
	  document.getElementsByClassName('utilitiesDisplayTop')[0].classList.add("openUtilitiesTop");
	 
	 
});}else{
	console.warn('desplegarUtilidades no existe')
}
 

var xcerrarUtilidades = document.getElementById("xcerrarUtilidades");
if(xcerrarUtilidades){
 document.getElementById("xcerrarUtilidades").addEventListener('click', function(){
	 document.getElementById('utilitiesDisplay').classList.remove("openUtilities");
	  document.getElementsByClassName('utilitiesDisplayTop')[0].classList.remove("openUtilitiesTop");
	  
	 
});}else{
	console.warn('xcerrarUtilidades no existe')
}
});


	waitForElm('#share_items_list').then((elm) => {
 document.getElementsByClassName('detail-share--cont_title-title')[0].addEventListener('click', function(){
	 document.getElementById('share_items_list').classList.toggle("openCompartir");
});
});

waitForElm('#contWrap').then((elm) => {
 document.getElementById("contWrap").style.display = "none";
});




waitForElm('#origenBusqueda').then((elm) => {
 document.getElementById('origenBusqueda').addEventListener('click', function(){
  var x = document.getElementById("contWrap");
  if (x.style.display === "none") {
    x.style.display = "flex";
    /** x.style.position = "absolute";
      x.style.zIndex = "9999";
       x.style.backgroundColor = "#fbfcff";
        x.style.border = "0px";
         x.style.padding = "20px";
          x.style.paddingTop = "10px";
           x.style.marginTop = "-20px";
         x.style.width = "94%"; */
  } else {
    x.style.display = "none";
  }})
});

    
    document.getElementsByTagName('body')[0].style.opacity = 1;
    const url_base=BaratzContextPath;
    // mapeo de un array de urls de scripts, transformando estas urls en un objeto con datos necesarios para su carga asincrona ordenada
    // @return array de promesas con resolve aplicado para su eavluacion en origen con $.when...
    let arr_promises = listUrlsJs.map(url_script=>{
      // si es un plugin (está en la carpeta plugins) se carga siempre el js a traves del url string original
      const js_original = url_script;
      let file_no_min   = url_script,
        file_min        = url_script,
        isPlugin        = true;
      // si no es un plugin (no está en la carpeta de plugins, a través de su url),
      // entonces se intenta la carga del script no min, y si está en la carpeta de plugins,
      // se intenta la carga del script definido (no el comprimido por opac, para evitar problemas)
      if(url_script.indexOf("plugins")==-1){
        // obtiene el nombre del script
        const get_filename=Baratz.tmpls_actions.UTILS.getfilename(url_script);
        const filename=get_filename.substring(0,get_filename.lastIndexOf("."));
        // obtiene el path completo del script
        const path=Baratz.tmpls_actions.UTILS.getpath(url_script);
        // obtiene la ruta al js min para el 1er intento
        file_min=Baratz.tmpls_actions.UTILS.getpath_min(path,filename);
        // obtiene la ruta al js no min por si falla el primer intento
        file_no_min=Baratz.tmpls_actions.UTILS.getpath_nomin(path,filename);
        // Flag no plugin
        isPlugin=false;
      }
      let ctrl={
        js_original : js_original,
        js          : url_base+file_no_min,
        js_min      : url_base+file_min,
        isPlugin    : isPlugin,
        state       : false,
        num_cargas  : 0,
      };
      // Promesa de carga de script y resolve en la ejecución del script cargado
      const retorno=new Promise(resolve=>{
        loadjs(ctrl,ctrl.js_min,resolve,listUrlsJs);
      });
      return retorno;
    });
    // Añade en el array de promesas el resolve para su uso posterior
    arr_promises.push($.Deferred(deferred=>{
      deferred.resolve();
    }));
    return $.when.apply($, arr_promises);
  },

  /**
   *  Carga una lista de css externos, insertando el bloque antes de la última marca en el <Head> (data-id="main") y en orden descendente
   *  despues del primero cargado (main.css siempre quedará al final)
   *
   *  @method Baratz.tmpls_actions.UTILS.requiredCSS
   *
   *  @param {array strings} listUrlsCss : Lista de docs css a cargar
   *
   *  @return {array objects} control {
   *      - {string} url : url del css a cargar
   * 			- {bool} state : si la carga ha tenido exito
   *    }
   */
  requiredCSS:listUrlsCss=>{
    const url_base=BaratzContextPath;
    const $head=document.head;
    listUrlsCss.forEach((url_css,i)=>{
      // Genera un tag link para el nuevo css y lo inserta
      const $link_css=document.createElement('link');
      $link_css.rel="stylesheet";
      $link_css.type="text/css";
      $link_css.href=url_base+url_css;
      $link_css.setAttribute("data-id","mainx");
      // Para el 1er main, se coloca antes de la posicion marcada como inicial
      let $posicion=$head.querySelector('[data-id="main"]');
      if(!$posicion){
        // Para los siguientes, se colocarán después del primero cargado y en orden descendente según se carguen
        $posicion=$head.querySelector('[data-id="mainx"]');
        $posicion.after($link_css);
      }
      else{
        $posicion.before($link_css);
      }
      $posicion.removeAttribute("data-id");
      consoleScript.log( `[utils.new.js] Baratz.tmpls_actions.UTILS.requiredCSS() OK cargando ${url_base+url_css}`,$posicion);
    });
  },

  /**
   *  Detecta si el userAgent del navegador es de un dispositivo movil
   *
   *  @method Baratz.tmpls_actions.UTILS.isMobileDevice
   *
   *  @return {bool} check : Si es o no un dispositivo móvil
   *
   *  @details 210521 no es muy confiable ya que se puede falsificar y detectar como no movil (algun dispositivo lo hace por ejemplo
   *                  los iPads quieren ser tratados como escritorios ahora y, por lo tanto, envían el mismo UA en Safari que Desktop Safari),
   *                  pero sin plugins es lo que hay
   */
  isMobileDevice:()=>{
    let check = false;
    ((a)=>{
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
        check = true;
      }
    })(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  },
	isSmallScreen:()=>{
		return window.innerWidth < 992;
	},
  /**
   *  Serialize all form data into an array of key/value pairs
   *  (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
   *
   *  @method Baratz.tmpls_actions.UTILS.serializeArray
   *
   *  @param  {dom object} form : Form a serializar en vanilla
   *
   *  @return {Array} arr : array con la serialización
   *
   *  @details https://vanillajstoolkit.com/helpers/serializearray/
   */
  serializeArray:form=>{
    let arr = [];
    [...form.elements].forEach(field=>{
      if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
      if (field.type === 'select-multiple') {
        // Array.from(field.options)
        // Array.prototype.slice.call(field.options)
        [...field.options].forEach(option=>{
          if (!option.selected) return;
          arr.push({
            name  : field.name,
            value : option.value
          });
        });
        return;
      }
      if (['checkbox', 'radio'].indexOf(field.type) >-1 && !field.checked) return;
      arr.push({
        name  : field.name,
        value : field.value
      });
    });
    return arr;
  },

  /**
   *  Parsea un formulario en formato objetos
   *
   *  @method Baratz.tmpls_actions.UTILS.form2object
   *
   *  @param {object dom} $form  : Formulario afectado (jquery || vanilla)
   *
   *  @return {object} formulario en formato objecto
   *
   *  Example:
   *               const $form=$(document.body).find("#solrSearch");
   *               $form.on("submit",e=>{
   *                 const campos=Baratz.tmpls_actions.UTILS.form2object($form);
   *           consoleScript.log("campos",campos)
   *                 return false;
   *               });
   *
   */
  form2object:$form=>{
    const isJqueryObject = ($form instanceof jQuery);
    if(isJqueryObject){
      $form=$form[0];
    }
    const serialized = Baratz.tmpls_actions.UTILS.serializeArray($form);
	let orgn = [];
   // const data=serialized.reduce((o, {name: n, value: v}) => Object.assign(o, { [n]: v }), {});
	const data = serialized.reduce((o, { name: n, value: v }) => {
		if(n!=='solrSearch.origin'){
			Object.assign(o, { [n]: v });
		}else {
			if (!o[n]) {
				o[n] = [v];
  			} else if (Array.isArray(o[n])) {
    			o[n].push(v);
  			} else {
   		 		o[n] = [o[n], v];
	  		}
	  	}
  	return o;
	}, {});	
	
    return data;
  },

  /**
   *  Acción submit para un objeto dado (creando un form con items hidden al vuelo para realizar el submit)
   *
   *  @method Baratz.tmpls_actions.UTILS.formSubmit
   *
   *  @param {object} datos :{
   *                            {string} action : Action del form (url)
   *                            {string} method : Method del form (post, get...)
   *                            {object} data   : Datos a enviar
   *                          }
   */
  formSubmit:datos=>{
    const formx = document.createElement('form');
    formx.method = datos.method;
    formx.action = datos.action;
    for(const[key,val] of Object.entries(datos.data)){
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", val);
      formx.appendChild(hiddenField);
    }
    document.body.appendChild(formx);
    formx.submit();
  },

  /**
   *  A efectos de desarrollo se crea la fn consoleScript en [scripts.js], para mensajes propietarios en consola, que pueden activarse ó desactivarse
   *  Admite las variantes console (log,warn...)
   *
   *  @method Baratz.tmpls_actions.UTILS.console_script
   *
   *  @param {bool} state  : si se activa o desactiva la vision de mensajes en la console a traves de la instrucción consoleScript
   *
   *  @details NEWJS END
   */
  console_script:(state=false)=>{
    console.log("[utils.new.js] Baratz.tmpls_actions.UTILS.console_script() Activación consoleScript=",state);
    if(!window.consoleScript || state){
      window.consoleScript={...window.console};
    }
    if(!state){
      // Quedan las fn inicializadas para evitar errores js por consoleScript(...)
      const methods = ["log", "debug", "warn", "info"];
      methods.forEach(method=>{
        window.consoleScript[method] = ()=>{};
      });
    }
  },

  /**
   *  Soluciona el problema de titulos cortados cuando se aplica un anchor en una url (p.ej. Detalle del item con target localizaciones,
   *  que es un titulo con posicion absoluta en margin-top negativo para desktop)
   *
   *  @method Baratz.tmpls_actions.UTILS.target_scroll_anchor
   *
   *  @details : lanzado desde [opac-detail.init.js], tiene en cuenta el plugin de desplegado (ellipsis multiline), en el detalle
   */
  target_scroll_anchor:()=>{
    const $body=$(document.body);
    const target = window.location.hash;
    if (target) {
      //window.location.hash = "";
      // Elimina el #+id
      let str=window.location.href;
      const pos = str.lastIndexOf('#');
      str = str.substring(0,pos)+str.substring(pos+1);
      history.pushState("",document.title,str);
      // Acciones scroll
      const $target=$(document.body).find(target);
      if($target.length===1){
        const hay_ellipsis_multiline=($body.find(".cont_ellipsis_multiline").length>0);
        if(hay_ellipsis_multiline){
          // Aplica scroll al ancla controlando el tiempo normal de aplicacion de ellipsis multiline en la descripcion del item
          /* setTimeout(()=>{
            Baratz.tmpls_actions.UTILS.scroll_anchor($target);
          },1500); */
          // Aplica scroll al ancla al trigger desencadenado desde Baratz.tmpls_actions.CTRL_PARRAFO_ELLIPSIS_MULTILINE_JS->OPS.inicializa
          // Para detalle del item con boton o no de despiegue de item-summary
          $(window).one("ellipsis_multiline:isSummary",()=>{
            Baratz.tmpls_actions.UTILS.scroll_anchor($target);
          });
        }
        else{
          Baratz.tmpls_actions.UTILS.scroll_anchor($target);
        }

      }
    }
  },

  /**
   *  Comprueba si un item es realmente visible en la vista (está pintado y se ve en la página)
   *
   *  @method Baratz.tmpls_actions.UTILS.isReallyVisible
   *
   *  @param {dom object} el : Item vanilla sobre el que determinar la visibilidad
   *
   *  @return {bool} Si el elemento es o no visible (no influye en modales)
   */
  isReallyVisible:el=>{
    if($(el).hasClass("sr-only") || $(el).length===0){
      return false;
    }
    const top = el.getBoundingClientRect().top;
    el = el.parentNode;
    do {
      let rect = el.getBoundingClientRect();
      if (top <= rect.bottom === false){
        break;
      }
      el = el.parentNode;
    } while (el !== document.body && el!==null);
    const retorno=top <= document.documentElement.clientHeight;
    return retorno;
  },

  /**
   *  Comprueba si un item es realmente visible en la pantalla (está pintado y se ve en la pantalla)
   *
   *  @method Baratz.tmpls_actions.UTILS.isInViewport
   *
   *  @param {dom object} $elemento : Item jquery sobre el que determinar la visibilidad
   *
   *  @return {bool} Si el elmento es o no visible
   */
  isInViewport : ($elemento)=>{
    const elementTop = $elemento.offset().top;
    const elementBottom = elementTop + $elemento.outerHeight();

    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  },

  /**
   *  Determina el primer elemento con foco en la capa a desplazarse, realiza el desplazamiento y destaca el titulo en la vista
   *
   *  @method Baratz.tmpls_actions.UTILS.scroll_anchor
   *
   *  @param {dom object} $capa : $capa a la que desplazarse
   * @param {Boolean} focusFocusable pone el foco sobre el primer elemento focusable
   *
   *  @details Fn asíncrona ES7
   */
  scroll_anchor : async ($capa, focusFocusable=true) =>{
    if($capa.length===0){return;}
    // desplazamiento varía al tener el legend margen top negativo
    let desplazamiento=$capa.offset().top-32;
    window.prevFocus=null;
    // espera hasta finalizar scroll ...
    await Baratz.tmpls_actions.UTILS.scrollTo(desplazamiento);

    // DESTACA el título .anchor_title
    const anchor_titles=[...$capa.find(".anchor_title,.stc_title,h1,h2,h3,.h1,.h2,.h3").not('.sr-only,[style*="visibility:hidden"],[style*="display:none"]')];
    if(anchor_titles.length>0){
      // Busca el primer título visible y lo ilumina en la vista
      const anchor_title=anchor_titles.find(e=>Baratz.tmpls_actions.UTILS.isReallyVisible(e));
      if(typeof(anchor_title)==="object"){
        $(anchor_title).addClass("anchor_active");
        setTimeout(()=>{
          $(anchor_title).removeClass("anchor_active");
        },2500);
      }
    }

    // FOCUS: Tags enfocables via teclado
    const enfocables=[...$capa.find("button,a,input,select,textarea,[tabindex]").not('.select_selectized,:hidden,[style*="display:none"]')];
    if(enfocables.length>0 && focusFocusable){
      // Busca el primer elemento enfocable visible
      const focusin=enfocables.find(e=>Baratz.tmpls_actions.UTILS.isReallyVisible(e));
      if(typeof(focusin)==="object"){
        // Aplica foco en el elemento
        $(focusin).focus();
        window.prevFocus=focusin;
      }
    }

  },

  /**
   *  Busca el primer elemento enfocable visible de una capa dada y aplica foco, sino retorna false
   *
   *  @method Baratz.tmpls_actions.UTILS.focus_apply
   *
   *  @param {dom object} $capa: Capa jquery donde realizar la búsqueda del primer elemento enfocable vivible
   *
   *  @return {dom object / bool} retorno: Elemento enfocable ó false si no hay
   */
  focus_apply:$capa=>{
    let retorno=false;
    // Tags enfocables via teclado
    const enfocables=[...$capa.find("button,a,input,select,textarea,[tabindex]").not('.select_selectized,:hidden,[style*="display:none"]')];
    if(enfocables.length>0){
      // Busca el primer elemento enfocable visible
      const focusin=enfocables.find(e=>{
        return Baratz.tmpls_actions.UTILS.isReallyVisible(e);
      });
      if(typeof(focusin)==="object"){
        // Aplica foco en el elemento
        $(focusin).focus();
        window.prevFocus=focusin;
        retorno=$(focusin);
      }
    }
    return retorno;
  },

  /**
   *  Realiza un scrollTo hasta una posicion dada
   *
   *  @method Baratz.tmpls_actions.UTILS.scrollTo
   *
   *  @param {num} pos_offset : posición hasta la que realizar el scroll
   *
   *  @return {Promise} retorno : Si la posición de la vista no es correcta, realiza scroll hasta la posición dada
   *
   *  @details : Devuelve promesa porque el resolve está en un callback y no es factible aplicar async...await
   */
  scrollTo:(pos_offset=0)=>{
    const retorno=new Promise(resolve => {
      /**
       *  Si la posición es la necesaria, se destruye la acción sobre el evento y se resuelve la promesa
       *
       *  @method onScroll
       */
      const onScroll=()=>{
        const pageYOffset=parseInt(window.pageYOffset.toFixed(),10);
        if (pageYOffset===pos_offset || (pageYOffset+clientHeight===scrollHeight)){
          window.removeEventListener('scroll', onScroll);
          resolve();
        }
      };

      pos_offset=parseInt(pos_offset.toFixed(),10);
      if(pos_offset<0){
        pos_offset=0;
      }
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      const clientHeight = (document.body.clientHeight, document.documentElement.clientHeight);
      window.addEventListener('scroll', onScroll);
      onScroll();
      window.scrollTo({
        top       : pos_offset,
        behavior  : 'smooth'
      });
    });

    return retorno;
  },

  /**
   *  Proporciona las dimensiones reales de un elemento dom jquery
   *
   *  @method Baratz.tmpls_actions.UTILS.getRealDim
   *
   *  @param {dom object} $el : capa jquery a evaluar
   *
   *  @return {object} {width,height,top,bottom,left,right}
   */
  getRealDim:($el)=>{
    const el=$el[0];
    const retorno=el.getBoundingClientRect();
    return retorno;
  },

  /**
   *  Devuelve una url generada para la vista de mapa segun los datos aportados y el tipo de mapa
   *
   *  @method Baratz.tmpls_actions.UTILS.genera_enlace_mapa
   *
   *  @param {object} datos: Datos a evaluar
   *    {
   *      {str} direccion [opt]: direccion
   *      {str} lat [opt en relacion a long]: latitud
   *      {str} long [opt en relacion a let]: longitud
   *    }
   *  @param {str} tipo_mapa: Tipo de mapa para el que generar la url
   *      • google-url: Mapa google vía url
   *
   *  @return {object}
   *    {
   *      {bool} hayBoton: Si hay dirección ó coordenadas true, si no false
   *      {str}  url: Url montada para pintar en la vista
   *    }
   */
  genera_enlace_mapa:(datos,tipo_mapa)=>{
    let hayBoton=true;
    let url="";
    const hayDatos=(typeof(datos)!=="undefined" && datos!==null && datos!=="");
    if(hayDatos){
      const hayDir=(typeof(datos.direccion)!=="undefined" && datos.direccion!==null && datos.direccion!=="" && datos.direccion!=='null');
      const hayLoc=(typeof(datos.lat)!=="undefined" && datos.lat!=='null' && datos.lat!==null && datos.lat!=="" && datos.long!=="undefined" && datos.long!=='null' && datos.long!==null && datos.long!=="");
      // Si no hay datos entonces no hay botón
      if(!hayDir && !hayLoc){
        hayBoton=false;
      }
      else{
        switch(tipo_mapa){
          // GOOGLE vía url
          // https://moz.com/blog/everything-you-never-wanted-to-know-about-google-maps-parameters
          // https://web.archive.org/web/20070708030513/http://mapki.com/wiki/Google_Map_Parameters
          // https://gearside.com/easily-link-to-locations-and-directions-using-the-new-google-maps/
          // https://developers.google.com/maps/documentation/urls/get-started
          // montaje url antigua
          // 'https://maps.google.com/?q='+${datos.direccion}+'@'+${datos.lat}+','+${datos.long}
          // 'https://maps.google.com/?q='+${datos.direccion}
          // 'https://maps.google.com/?ll='+${datos.lat}+','+${datos.long}
          case "google-url":{
            url='https://maps.google.com/maps';
            // Si existen todos los datos
            const dir_final=datos.direccion.replaceAll(" ","+").replaceAll("++","+");
            if(hayDir && hayLoc){
              //url=`${url}?q=${dir_final}&ll=@${datos.lat},${datos.long},18z`;
              url=`${url}/search/${dir_final}/@${datos.lat},${datos.long},17z`;
            }
            else{
              // Si existe dirección pero no long y lat
              if(hayDir && !hayLoc){
                //url=`${url}?q=${dir_final}&z=18`;
                url=`${url}/search/${dir_final}`;
              }
              else{
                // Si no existe dirección pero si long y lat
                if(!hayDir && hayLoc){
                  //url=`${url}q=${datos.lat},${datos.long}&ll=${datos.lat},${datos.long}&z=18`;
                  url=`${url}/place/${datos.lat},${datos.long}/@${datos.lat},${datos.long},18z`;
                }
              }
            }
          }
          break;
          default:{
            console.log("[tmpl_detail.js] Baratz.detail.TMPL.genera_enlace_mapa() tipo de mapa no definido:",tipo_mapa);
          }
        }
      }
    }
    else{
      hayBoton=false;
    }
    const retorno={
      url     : url,
      hayBoton: hayBoton
    };
    return retorno;
  },

  /**
   *  Contenedor de fns relacionadas con la carga del idioma en Baratz.i18n_js
   *
   *  @cont Baratz.tmpls_actions.UTILS.language
   *
   *  @details
   *    • Se recupera desde messages_xx_XX.properties y si se modifica este fichero hace falta recompilar mvn
   *    • Insertar los nuevos literales en es_es y al final del resto de properties con = "A TRADUCIR"
   */
  language:{

    /**
     *  Recorre un objeto con notacion en punto y lo transforma en un objeto de uso comun.
     *  Crea un objeto de apoyo para ello, eliminando secuencialmente el item del objeto principal
     *
     *  @method Baratz.tmpls_actions.UTILS.language.parseDotNotation
     *
     *  @param {str} str    : Key a buscar
     *  @param {str} val    : Value a buscar
     *  @param {object} obj : Objeto inicial completo
     */
    parseDotNotation:(str, val, obj)=>{
      let currentObj = obj,
        keys = str.split("."),
        i,
        l = Math.max(1, keys.length - 1),
        key;
      for (i = 0; i < l; ++i) {
        key = keys[i];
        currentObj[key] = currentObj[key] || {};
        currentObj = currentObj[key];
      }
      currentObj[keys[i]] = val;
      //delete obj[str];
      return currentObj;
    },

    /**
     *  Expande un objeto inicial, transformándolo en un objeto de uso
     *
     *  @method Baratz.tmpls_actions.UTILS.language.objectExpand
     *
     *  @param {object} obj : Objeto inicial expandido
     *
     *  @return {object} obj: Objeto expandido para su uso
     */
    objectExpand:obj=>{
      let retorno={};
      for (const [key, val] of Object.entries(obj)){
        Object.assign(retorno,Baratz.tmpls_actions.UTILS.language.parseDotNotation(key,val,obj));
      }
      return obj;
    },

    /**
     *  Crea un objeto inicial expandido con los datos de la traduccion
     *
     *  @method Baratz.tmpls_actions.UTILS.language.decodeJson
     *
     *  @param {object} datos : Objeto JSON completo
     *
     *  @return {object} retorno : Objeto expandido para su uso
     */
    decodeJson:datos=>{
      let retorno={};
      // Elimina la prop i18n_js de las props de los objetos y asigna a nuevo objeto
      for (const [key, val] of Object.entries(datos)){
        const ret = key.replace(/i18n_js./g,'');
        retorno[ret]=val;
      }
      retorno=Baratz.tmpls_actions.UTILS.language.objectExpand(retorno);
      return retorno;
    },

    /**
     *  Carga el idioma, guardándolo  en el storage y en el objeto Baratz.i18n_js
     *
     *  @method Baratz.tmpls_actions.UTILS.language.loadLangAsync
     */
    loadLangAsync:()=>{
      // Url genérica para uso, nos devuelve el idioma necesario
      const url_lang=BaratzContextPath+"public/message/all";
      fetch(url_lang)
      .then(response=>{
        return (response.text());
      })
      .then(data=>{
        // recibe un string JSON, y aqui se transforma en objeto JSON
        data=JSON.parse(data);
        // Transforma el obj JSON en un objeto expandido para su uso
        data=Baratz.tmpls_actions.UTILS.language.decodeJson(data);
        consoleScript.log("[utils.new.js] Baratz.tmpls_actions.UTILS.language.loadLangAsync() FETCH: OK cargando ",url_lang);
        // guarda el objeto en su lugar
        Baratz.i18n_js=data;
        // codifica en data
        const i18n_js=Baratz.tmpls_actions.UTILS.object2data(data);
        // guarda en storage
        Baratz.storage.setItem("i18n_js_"+Baratzlang,i18n_js);
      })
      .catch(err=>{
        consoleScript.log("[utils.new.js] Baratz.tmpls_actions.UTILS.language.loadLangAsync() url FAIL",url_lang,err);
      });
    },

  },

  /**
   *  PWA: Envia una notificación dada al S.O. con NOTIFICATIONS (NO PUSH)
   *
   *  @method Baratz.tmpls_actions.UTILS.PWA_only_notification
   *
   *  @param {object} nota [opt] : objeto con los datos para mostrar la notificación
   *    https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
   *
   *    nota = {
   *      // Propios de este plugin para componer notificacion
   *      notifTitle    : {str} "Nota número... ",      // Título de la notificación
   *      click_action  : {str} [opt] "../public/home", // Al click en la notificaciónse abre esta url (si undefined no se asocia evento)
   *      target        : {str} [opt] "_blank",         // Donde se abre (si undefined entonces _self)
   *
   *      // Visual Options
   *      "body"    : "<String>",
   *      "icon"    : "<URL String>",
   *      "image"   : "<URL String>",
   *      "badge"   : "<URL String>",
   *      "vibrate" : "<Array of Integers>" [100, 50, 100],
   *      "sound"   : "<URL String>",
   *      "dir"     : "<String of 'auto' | 'ltr' | 'rtl'>",
   *
   *      // Behavioural Options
   *      "tag"     : "<String>",
   *      data      : "<Anything>" {
   *        dateOfArrival : Date.now(),
   *        primaryKey    : 1
   *      },
   *      "requireInteraction"  : "<boolean>",
   *      "renotify"            : "<Boolean>",
   *      "silent"              : "<Boolean>",
   *
   *      // Both Visual & Behavioural Options
   *      "actions"   : "<Array of Strings>" [
   *        {
   *          action : 'explore',
   *          title  : 'Explore this new world',
   *          icon   : 'images/checkmark.png'
   *        },
   *        {
   *          action : 'close',
   *          title  : 'Close notification',
   *          icon   : 'images/xmark.png'
   *        },
   *       ],
   *
   *      // Information Option. No visual affect.
   *      "timestamp": "<Long>"
   *    }
   */
  PWA_only_notification:function(nota){

    const INIT=()=>{
      OPS.lanza_notificacion();
    },
    OPS={
      lanza_notificacion:async()=>{
        // PRUEBA DE NOTIFICACIÓN
        const permission = await window.Notification.requestPermission();
        if(permission === 'granted'){
          OPS.randomNotification();
        }
        else{
          console.warn('[utils.js] OPs.lanza_notificacion() WARNING!!!! Notificaciones bloquedas por el usuario.');
        }
      },
      randomNotification:()=>{
        const notif = new Notification(options.notifTitle, options);
        if(typeof(options.click_action)!=="undefined"){
          EVENTOS.nota(notif);
        }
        //setTimeout(OPS.randomNotification, 30000);
      },
    },
    EVENTOS={
      nota:(notif)=>{
        notif.onclick = function(event) {
          event.preventDefault(); // Previene al buscador de mover el foco a la pestaña del Notification
          if(typeof(options.target)==="undefined"){
            options.target="_self";
          }
          window.open(options.click_action,options.target);
        };
      }
    };
    ////////////////////////////////////////////////////
    //  INICIO
    ////////////////////////////////////////////////////
    const randomItem = Math.floor(Math.random()*5);
    const defaults={
      notifTitle    : "Nota número... "+randomItem,
      click_action  : "../public/home",
      target        : "_blank",
      body          : 'Creado en utils: '+randomItem,
      icon          : '../img/favicons/android-chrome-128x128.png',
    };
    const options = Object.assign({}, defaults, nota);
    INIT();
  },

  /**
   *  En los input con data-toggle="password", permite la vista de la entrada al pulsar un botón
   *
   *  @method Baratz.tmpls_actions.UTILS.view_pass
   */
  view_pass:()=>{
    const $body=$(document.body);
    const $input_pass=$body.find('[data-toggle="password"]');
    $input_pass.each(function(i,e){
      const $el=$(e);
      const $btn_view=$el.closest(".input-group").find(".btn_view_pass");
      $btn_view.on("click",(e)=>{
        const $btn=$(e.currentTarget);
        const $input=$btn.closest(".input-group").find('[data-toggle="password"]');
        const isActive=$btn.hasClass("active");
        if(!isActive){
          $input.attr("type","text");
          $btn.addClass("active");
        }
        else{
          $input.attr("type","password");
          $btn.removeClass("active");
        }
      });
    });
  },

  /**
   *  Realiza una petición ajax genérica
   *
   *  @method Baratz.tmpls_actions.UTILS.ajax_generic
   *
   *  @param {object} datos: Datos para la peticion
   *    {
   *      {str} url: Url hacia donde va dirigida la petición
   *      {str} tipo: Tipo de peticion (get / post)
   *      {object JSON} data: cuerpo de datos necesarios para la petición
   *    }
   *
   *  @retorno {object / text} retorno: Respuesta de la peticion
   *    {
   *      result : Resultado de respuesta correcta ó {object} null
   *      error  : Resultado de respuesta errónea ó {object} null
   *    }
   *
   *  @details Uso petición síncrona: const result = await Baratz.tmpls_actions.UTILS.ajax_generic(datos);
   */
  ajax_generic:async(datos)=>{
    let retorno={
      result : null,
      error  : null
    };
    try {
      retorno.result = await $.ajax({
        url  : datos.url,
        type : datos.tipo,
        data : datos.data,
        error:function(jqXHR, textStatus, errorThrown){

        }
      });
      return retorno;
    }
    catch (error) {
      console.log("[utils.js] Baratz.tmpls_actions.UTILS.ajax_generic() error",error);
      return retorno;
    }
  },

  /**
   *  Operativas de storage en el guardado de datos de usuario
   *
   *  @method Baratz.tmpls_actions.UTILS.ctrl_storage
   */
  ctrl_storage:{
    /**
     *  Compresión / Descompresión de strings (por ejemplo html) en base64
     *
     *  @method Baratz.tmpls_actions.UTILS.ctrl_storage.base64
     */
    base64:{
      /**
       * Baratz.tmpls_actions.UTILS.ctrl_storage.base64.compress
       */
      compress:(s)=>{
        return btoa(s);
      },
      /**
       * Baratz.tmpls_actions.UTILS.ctrl_storage.base64.decompress
       */
      decompress:(s)=>{
        return atob(s);
      }
    },

    /**
     *  Recupera los datos del storage, guardados en una var con nombre dado
     *
     *  @method Baratz.tmpls_actions.UTILS.ctrl_storage.load
     *
     *  @param {str} varname   : Nombre de la variable a usar en el storage para recuperar los datos
     *
     *  @return {object} datos: Datos recuperados
     */
    load:(varname)=>{
      let datos=Baratz.storage.getItem(varname);
      datos=Baratz.tmpls_actions.UTILS.data2object(datos);
      return datos;
    },
    /**
     *  Realiza una petición para recabar datos a través de una url dada y los guarda en una var-storage con nombre dado
     *
     *  @method Baratz.tmpls_actions.UTILS.ctrl_storage.save
     *
     *  @param {object} datos : Datos para la operacion
     *    {str} varname   : Nombre de la variable a usar en el storage para guardar los datos
     *    {str} url       : sin el context path (reader/data/offline)
     *    {object} extras : datos como _csrf, ttl, etc
     *                      {
     *                        {num} ttl: ms
     *                      }
     */
    save:async (datos)=>{
      const data=datos.extras;
      $.ajax({
        //url   : BaratzContextPath+datos.url,
        url:`${BaratzContextPath}reader/data/offline`,
// FIXME: Tendrá que ir por POST
        type  : "get",
        success: function(response) {
          // Recibe fragmentos thymeleaf y los guarda en storage
          // response.managerData={successes:...}
          // response.renderedTemplate:"...htmlText..."
          let item = response.renderedTemplate;
          // Si hay ttl (expiracion), se obtiene fecha
          const ttl=datos.extras.ttl;
          if(ttl){
            const html_simple=Baratz.tmpls_actions.UTILS.cleanTextHTML(response.renderedTemplate);
            const stringToBase64=Baratz.tmpls_actions.UTILS.ctrl_storage.base64.compress(html_simple);
            item = {
              value  : stringToBase64,
              expiry : ttl <= 0 ? -1 : new Date().getTime() + ttl
            };
          }
          item=Baratz.tmpls_actions.UTILS.object2data(item);
          Baratz.storage.setItem(datos.varname,item);
        },
        error: function(xhr) {
          console.log("[utils.js] Baratz.tmpls_actions.UTILS.ctrl_storage.save() GET Error de peticion::::",xhr.responseText);
        }
      });

    },
    /**
     *  Elimina una var con nombre dado del storage
     *
     *  @method Baratz.tmpls_actions.UTILS.ctrl_storage.delete
     *
     *  @param {str} varname   : Nombre del objeto a borrar del localStorage
     */
    delete:(varname)=>{
      Baratz.storage.removeItem(varname);
    }
  },

  /**
   *  Acciones de template para una capa loading
   *
   *  @cont Baratz.tmpls_actions.UTILS.loading
   */
  loading:{
    /**
     *  Pinta la capa en pantalla insertada en la capa dada
     *
     *  @method Baratz.tmpls_actions.UTILS.loading.pinta
     *
     *  @param {dom object} $capa : Capa afectada
     */
    pinta:($capa)=>{
      let $loading=$capa.find(".capa_loading");
      if($loading.length==0){
        $loading=$("<div/>",{"class":"capa_loading capa_loading--in_load"});
        $("<span/>",{"class":"spinner-border"}).appendTo($loading);
        $capa.prepend($loading);
      }
      else{
        $loading.fadeIn();
      }
    },
    /**
     *  Borra la capa de pantalla para la capa dada
     *
     *  @method Baratz.tmpls_actions.UTILS.loading.borra
     *
     *  @param {dom object} $capa : Capa afectada
     */
    borra:($capa)=>{
      $capa.find(".capa_loading").fadeOut();
    },
  },
};


/*****************************************************************************
 *  COMUNES A TODA LA APLICACIÓN
 *****************************************************************************/

// Primera instancia al pintado de mensajes propietarios en consola
// Se puede activar directamente con esta llamada (Baratz.tmpls_actions.UTILS.console_script(true)) ó desde los js para ver los mensajes en consola.
// Admite las variantes console (log, warn...)
Baratz.tmpls_actions.UTILS.console_script();

// Carga de idioma js segun idioma definido en tag html

const Baratzlang=document.querySelector("html").getAttribute("lang");

const str_lang=`i18n_js_${Baratzlang}`;

//consoleScript.log(`[utils.new.js] Baratz.storage[${str_lang}] tipo =`,typeof(Baratz.storage[str_lang]));
const version_actual=$(document.body).find(".version").attr("data-version");
const version_cache=Baratz.storage["OpacDiscovery_version"];
if(typeof(Baratz.storage[str_lang])==="undefined" || typeof(version_cache)==="undefined" || version_cache!==version_actual){
  Baratz.storage["OpacDiscovery_version"]=version_actual;
  Baratz.tmpls_actions.UTILS.language.loadLangAsync();
}
else{
  // Recupera del storage
  const i18n_js=Baratz.storage.getItem(str_lang);
  // decodifica data recibida
  Baratz.i18n_js=Baratz.tmpls_actions.UTILS.data2object(i18n_js);
}

// Control de desconexion de usuario
$(document.body).find(".btn_desconectar").on("click",()=>{
  // Borrado de LocalStorage
  Baratz.tmpls_actions.UTILS.ctrl_storage.delete("user_datos_logged");
  localStorage.removeItem('origenes');
});

	




