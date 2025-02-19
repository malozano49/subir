/**
 *  @file        : install.js
 *
 *  @description : Acciones js para la instalación de la aplicación como PWA a traves de
 *  @license     : baratz
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-08-25
 *
 *  @validate    : https://jshint.com/
 *
 */
// jshint esversion:10

console.log('[pwa/install.js] CARGA');


const PWA_INSTALL = (install_button)=>{

  const INIT=()=>{
    //TMPL.check_install();
    const isInWindow=TMPL.check_lanzada();
    TMPL.initialize();
  },
  EVENTOS=()=>{
    // Si está instalada no se dispara
    window.addEventListener('beforeinstallprompt',OPS.saveBeforeInstallPromptEvent);
    // Se dispara al instalar
    window.addEventListener('appinstalled',OPS.logAppInstalled);
  },
  OPS={

    install: evt=>{
      deferredInstallPrompt.prompt();
      evt.srcElement.setAttribute('hidden',true);
      deferredInstallPrompt.userChoice.then(choice=>{
        if(choice.outcome==="accepted"){
console.log("[pwa/install.js] install aceptado");
        }
        else{
console.log("[pwa/install.js] install No aceptado");
        }
        deferredInstallPrompt=null;
      });
    },

    logAppInstalled: evt=>{
console.log("[pwa/install.js] logAppInstalled()  APP INSTALADA");
      if(install_button){
        button_install.hidden=true;
      }
    },

    saveBeforeInstallPromptEvent: evt=>{
console.log("[pwa/install.js] OPS.saveBeforeInstallPromptEvent() evt",evt);
      deferredInstallPrompt = evt;
      if(install_button){
        button_install.removeAttribute('hidden');
        button_install.addEventListener("click",OPS.install);
      }
    },

  },
  TMPL={
    // navigator.getInstalledRelatedApps () DEVUELVE BLANCO en windows chrome
    // https://caniuse.com/mdn-api_navigator_getinstalledrelatedapps
    check_install:async()=>{
      const relatedApps = await navigator.getInstalledRelatedApps();
      console.log('[pwa/install.js] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PWA check_install relatedApps',relatedApps);
      relatedApps.forEach((app) => {
        console.log("[pwa/install.js] APP INSTALLED:::::::::::::::::::",app.id, app.platform, app.url);
      });
    },
    check_lanzada:()=>{
      // Para iOS
      if (window.navigator.standalone) return true;
      // Para Android
      if (window.matchMedia('(display-mode:standalone)').Matches) return true;
      // Si ninguna de las dos es verdadera, no está instalada
      return false;
    },
    initialize:()=>{
      if(install_button){
        // Botón para instalar PWA
        button_install = document.createElement("button");
        button_install.id ='button_install';
        button_install.innerHTML = "Instalar PWA";
        button_install.hidden = true;
        button_install.classList.add("btn");
        button_install.classList.add("btn-primary");
        footer.appendChild(button_install);
      }
      EVENTOS();
    }
  };

  ////////////////////////////////////////////
  //  INIT
  ////////////////////////////////////////////
  const footer = document.getElementsByTagName("footer")[0];
  let deferredInstallPrompt=null;
  let button_install;
  if (!('serviceWorker' in navigator)) {
    console.warn("[pwa/install.js] WARNING!!!! Service-worker no soportado en este navegador");
    return false;
  }
  INIT();

};


// {bool} para mostrar ó no un botón en el DOM para instalar la PWA
PWA_INSTALL(false);




