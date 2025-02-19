OpacDiscovery: Javascript


  CONTENEDORES
    Se sigue la lógica de modelo de contenedores en objetos con aplicación de lógica de flujo para ejecución de los scripts


  DESCRIPCION DE DOCUMENTOS JS

    1- js/commons/

      • [utils.js] -> Procedimientos básicos de uso general en toda la aplicación.
      Pequenas Fns de utilidades ó que requieren inicilizacion en primera instancia

      • [scripts.js] -> Contenedores para la aplicacion de plugins y scripts internos, para uso general en toda la aplicación.
      Para la carga de los plugins se usa un modelo de contendor con subcontenedores de aplicación y lógica de flujo (inicializacion, aplicacion de plugin y eventos.
      Los plugins autodetectan si es necesaria su carga, para evitar peticiones innecesarias a servidor
      La carga se realiza (generalmante) en asíncronia desde el modulo .init que iniciliza la vista

      • [commons.js] -> Pequeños procedimientos de desarrollo para uso general en toda la aplicación.


    2- js/init/...
      Cada vista tiene un .init propio, con un modelo de contenedores y logica de flujo.
      Contiene un js de inicialización para la carga asíncrona y ordenada de js y css (tanto plugins como js de templates y logicas), y las llamadas a scripts e inicializadores aplicados en las vistas.


    3- js/_tmpls/...
      Desarrollos en el modelo de contenedores en objetos que pueden o no tener lógica de flujo y pueden ser llamados desde donde se carguen (.init).
      Según el desarrollo pueden contener estructuras en forma de objeto para poder ser llamadas desde cualquier lugar.
      Aplican a un segmento de la vista (por ejemplo filtros)


    4- js/admin
       js/manager
       js/layout
          Carpetas de docs js referentes a las vistas administrados, manager y layout
          Aplican lo mismo que js/_tmpls/...


    6- js/installPWA
        Contiene el js para aplicacion de PWA.


    6- service-worker.js
        JS para PWA que necesita estar en la raiz de la aplicación y se encarga de desencadenar acciones a efectos de PWA.


  CONTROLES CON FLUJO

      Normalmente el flujo de contenedores considera una definición de variables de ambito global al contenedor, una condición de inicializacion y un flujo en deriva hacia una previa de inicializacíon, la aplicación de plugins y acciones desencadenadas por eventos.
      Con esto se consigue evitar duplicidades en la aplicacion de flujos y eventos, asi como una mejor legibilidad del flujo de las interacciones con el usuario.

      Estructura del modelo de contenedores con flujo

        FUNCIÓN (con o sín parametros){

          Fn INIT{

            inicializacion
            PLUGINS()
            EVENTOS()

          }

          PLUGINS -> Fn ó Object

          EVENTOS -> Fn ó Object

          OPS -> Objeto contenedor de operaciones de lógica

          TMPL -> Objeto contenedr de operaciones en el template

          ///////////////////////////////////////
          ///////////////////////////////////////
          DEFINICION DE VARIABLES
          INICIALIZACION PREVIA
            INIT();
        }



  CARGA DE JS

    Para este proyecto los scripts se cargan al final de la página
    Hay determinados plugins que necesitan ser cargados siempre ó presentan dificultades en la crag asíncrona, con lo que se procede a cargarlos desde el footer.
    Los js de aplicación se cargan con un init segun la vista desde el footer, luego este init se encarga de cargar asincronamente los js necesarios para la aplicacion en la vista.
    El js de aplicación se guarda en el objeto Baratz.

    - [resources\templates\public\home\technicalfooter.html] se inserta en la vista con la variable th:with="page='+...
      donde se carga el bloque js perteneciente a la vista:
        <th:block th:if="${page == 'xxx'}">
          <script th:src="@{/js/init/opac-xxx.init.js}"></script>


    - [/js/init/opac-xxx.init.js]

      La inicializacion de este fichero se realiza en el document.ready, salvo algun caso en que se necesite alguna accion anterior (por ejemplo [opac-detail.init.js]). El nombre del doc normalmente se refiere a la vista desde donde se carga.

      DESCRIPCION GENERAL (xxx.init.js)

      • fn:load_plugins
        Para cargar los plugins que se necesiten, en este caso se carga [scripts.js], que contiene la autocarga de los plugins necesarios para las vistas
        En cuanto finaliza la carga de este fichero se llama a los contenedores que se necesiten en la vista para aplicar los plugins convenientemente

      • fn:load_scripts
        Una vez cargados los plugins necesarios para la vista y ejecutadas las secuencias iniciales, se cargan los scripts.js necesarios.

      • fn:secuencia_ejecucion
        Los .js propietarios son documentos.js distribuidos en el arbol js y que recojen las acciones necesarias para la aplicación en la vista.
        Una vez cargados los scripts propietarios.js necesarios, se inicia una secuencia lógica de ejecucion si es necesaria desde esta fn.
        Desde esta fn podríamos tambien ejecutar algunas acciones que sean necesarias únicamente para esta vista por simplificar el arbol de archivos, ahorrandonos el js propietario, ó de ser necesario el paso previo para inicializar elementos.


    - [/js/_tmpls/tmpl_xxxx.js]

      • Son documentos .js que extienden el objeto Baratz con procedimientos y donde se realizan las acciones necesarias del js en la vista, que puede ser comun a varias zonas de las vistas generales (por ejemplo la búsqueda avanzada, reservas, etc...). Al contenerse en un objeto, pueden usarse aisladamente desde el doc js/commons/scripts.js (por ejemplo llamadas a métodos para su uso en modales, etc...).
        Pueden estar formados por procedimientos aislados (incluso un modelo hibrido de contenedor de acciones de template y procedimientos aislados), pero siempre integrados en el objeto Baratz.
        El inicializador ó la secuencia de ejecución deberian de estar en [/js/init/opac-xxx.init.js] -> fn:secuencia_ejecucion(), según la vista.


  SCRIPTS EN LA VISTA

    - Para saber en primera instancia que plugins pueden ser necesarios para la vista:
      En la [/js/init/opac-xxx.init.js]->fn:load_plugins()
        - Comentar todas las llamadas a ejecucion de fns en [scripts.js]
        - En utils.js -> Baratz.tmpls_actions.UTILS.console_script(false), poner el valor a true
        - Descomentar la linea Baratz.tmpls_actions.GENERAL();
      En la consola web developer saldrán los plugins que se necesite ejecutar en primera instancia, al margen de plugins ó procedimientos que puedan ser necesarios en determinados momentos. Debera de estudiarse cada caso


    - Recordatorio:
      Los .js pueden tener 6 estados de inicialización en el tiempo, los más comunes por orden (ver consola) :
        - Justo al finalizar la carga del documento js (se puede utilizar para ir montando los objetos)
        - Usando Jquery $(document).ready (cuando el dom es leido) (normalmente se usa para ir ejecutando acciones)
        - Usando Jquery Al $(window).load (finaliza todo el proceso de carga de la vista) (cuando es necesario que todo esté montado antes de iniciar acciones, para un plugin por ejemplo)

        Ejemplo:
          $(()=>{
            FN();
          });


  CASO BOTONERA FLOTANTE

    [stickySidebar] BOTONERA FLOTANTE: Inclusión html de botones para navegacion interna

      [title/stickySidebar.html] Se carga a través de [public/home/footer.html] con un th:with="page=${page}" para discriminar los botones que deben de aparecer.
      Si no se ecuentra desde el js el anchor de referencia del botón, este no aparece en la vista.

      Cuando se necesitan botones en la botonera flotante desde html y para casos especiales (por ejemplo acciones para un form), estos se integran desde html en un contenedor con clase botonera_flotante_btn_actions
      Este html con os botones se clona en la barra flotante y se destruye desde Baratz.tmpls_actions.BOTONERA_FLOTANTE
      Ejemplo:[\admin\password\editPassword.html}








