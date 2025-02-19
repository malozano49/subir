/**
 *  @file        : opac-admin.monitoring.js
 *
 *  @description : js de aplicación en la página de administración monitorización
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
/* globals Baratz */

console.log("[opac-admin.monitoring.js] CARGA");

if (!Baratz.monitor){
	Baratz.monitor={
    loggers          : `${BaratzContextPath}admin/monitor/level`,
    logfile          : `${BaratzContextPath}admin/log`,
    actuator_loggers : `${BaratzContextPath}actuator/loggers`,
  };
}

/**
 *  Contenedor de acciones en la pestaña administracion monitorización
 *
 *  @cont Baratz.monitor
 */
Object.assign(Baratz.monitor,{

  init:()=>{
    const $form    = $(document.body).find("form#form_level_logs");
    const $loggers = $form.find("select#package_log");
    const $levels  = $form.find("select#log_level");
    $loggers.on('changed.bs.select',e=>{
      Baratz.monitor.loadLevel($(e.currentTarget).val(), $levels);
    });
  },

  /**
   *  efectua una llamada para pintar la lista de logs en una modal dada modal (API actuator logfile)
   *
   *  @method Baratz.monitor.getLogs
   *
   *  @param {num} jobid         : job instance id
   *  @param {object} $modalLogs : modal
   */
  getLogs:(jobid, $modalLogs)=>{
		$.ajax({
			url  : `${Baratz.monitor.logfile}/${jobid}`,
			type : 'GET',
			success: logs=>{
        // Devuelve un array
				let txt = '';
        logs.forEach((log,i)=>{
          const level = log.split("|")[2];
          txt += `<h3 class="bloque_titulo">Log ${i}: ${level}</h3><div class="bloque_logs">${log}</div>`;
        });
        $modalLogs.find(".modal-body").html(txt);
		  }
		});
	},

	/**
	 *  Efectúa la descarga de logs a través del title de una modal dada (API actuator logfile)
	 *
	 *  @method Baratz.monitor.saveLogs
	 *
	 *  @param {num} jobid         : job instance id
	 *  @param {dom object} $modal : modal
	 */
	saveLogs:(jobid,$modal)=>{
    // Genera el título del txt a guardar a través del título de la modal
    // Reemplaza blancos con _, convierte en minúsculas y reemplaza tildes expresadas con NFD
    // Al usar NFD, la forma normal Unicode descompone los grafemas combinados en la combinación de unos simples. El è de Crème termina expresado como e + `
    const filename = $modal.find(".modal-title").html().replace(/ /g,"_").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // location: Es un DOMString que contiene la URL completa. Si es cambiada, el documento asociado navegará a la nueva pagina. Puede ser cambiada desde un origen diferente que el asociado al documento. En este caso se produce el guardado del log en curso.
    location.href=`${Baratz.monitor.logfile}/save/${jobid}/${filename}`;
	},

	/**
	 *  Pinta en un select dado la lista de opciones a través del API actuator loggers
	 *
	 *  @method Baratz.monitor.loadLevel
	 *
	 *  @param {str} logger :
	 *  @param {dom object} $levels : Select jquery afectado
	 */
	loadLevel:(logger, $levels)=>{
		$.ajax({
			url  : `${Baratz.monitor.loggers}/${logger}`,
			type : 'GET',
      success: result=>{
        // Destruye el plugin selectpicker en un elemento dado
        Baratz.tmpls_actions.APPLY_SELECTPICKERS($levels,false,true);
        $levels.find(`option[value="${result.effectiveLevel}"]`).prop('selected',true);
        // Activa el plugin selectpicker en un elemento dado
        const $cont_select=$levels.closest(".cont_select");
        Baratz.tmpls_actions.APPLY_SELECTPICKERS($cont_select,true);
      }
		});
	},


});

