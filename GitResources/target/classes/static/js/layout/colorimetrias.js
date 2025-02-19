/**
 *  @file        : colorimetrias.js
 *
 *  @description : JS de maquetación para la visualización de las tablas de colores del proyecto OPAC
 *  @license     : baratz
 *  @ver         : 7.0
 *  @copyright   : 2019
 *
 *  @author      : http://www.baratz.es/
 *  @date        : 2021-06-18
 *
 *  @validate    : https://jshint.com/
 */
// jshint jquery :true, esversion:10
/* globals Baratz,BaratzContextPath */

console.log("[colorimetrias.js] CARGA-------------------------------");

/**
 *  @cont COLORIMETRIAS
 *
 *  Pintado de la tabla de colores con sus nombres y alias definidos en _variables.scss
 *
 *  @AVISO No se pueden insertar style inline por políticas de seguridad, se inserta tag style en el head
 */
const COLORIMETRIAS=function(){
  // VARS GLOBALES
  const $body=$(document.body);
  const $cont_colorimetrias=$body.find(".cont_colorimetrias");
  // Definicion de colores en sass (_colors_normal.scss // _colors_personalization // _colors_high.scss)
  // http://scg.ar-ch.org/

  /**
   *  Flujo inicial de acciones
   */
  const INIT= async()=>{
    $('<pre class="cont_colors_sass colors_normal-data"></pre>').appendTo($cont_colorimetrias);
    $('<pre class="cont_colors_sass colors_high-data"></pre>').appendTo($cont_colorimetrias);
    $('<pre class="cont_colors_sass colors_personalization-data"></pre>').appendTo($cont_colorimetrias);
    $('<pre class="cont_colors_sass colors_red-data"></pre>').appendTo($cont_colorimetrias);
    const $cont_colors_sass=$cont_colorimetrias.find(".cont_colors_sass");
    let paletas=[];
    $cont_colors_sass.each((i,e)=>{
      const $cont  = $(e);
      const before = window.getComputedStyle(e, '::before').getPropertyValue('content').replace( /[\r\n]+/gm, "" );
      if(before==="none"){
        console.log("[colorimetrias.js] Error en la paleta ",e);
        return;
      }
      let datos  = before.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
      datos = datos.replace('"[',"[").replace(']"',"]");
      paletas.push(JSON.parse(datos));
    });

    await OPS.pinta_paletas(paletas);

    EVENTOS();
  },
  /**
   *  Contenedor de eventos
   *
   *  @details: Plugin de resaltado
   *      mark.js
   *      https://markjs.io/
   *      https://github.com/julmot/mark.js/
   *    ESTILOS: .markjs [_forms.scss]
   *
   */
  EVENTOS=()=>{
    const $input=$body.find('#filter_colors');
    const $con_reduccion=$body.find("#con_reduccion");
    const $containers_color=$cont_colorimetrias.find(".container_color");

    $input.on("keyup",e=>{
      const keyword = $(e.currentTarget).val();
      const key_length=""+keyword.length;
      ///////////////////////////////////////////////////////
      // mark.js
      // https://markjs.io/
      // https://github.com/julmot/mark.js/
      ///////////////////////////////////////////////////////
      const options={
        "className" : "markjs",
        "each"      : element=>{
          $(element).addClass(key_length);
        }
      };
      // Aplicación de plugin
      $containers_color.unmark({
        done:()=>{
          $containers_color.mark(keyword,options);
          const con_reduccion=$con_reduccion.is(":checked");
          const data={
            con_reduccion     : con_reduccion,
            $containers_color : $containers_color,
            keyword           : keyword
          };
          OPS.muestra_oculta(data);
        }
      });
    });

    // cambio de estado del check para la aplicacion de reduccion de filtros
    $con_reduccion.on("change",e=>{
      const $el           = $(e.currentTarget);
      const keyword       = $input.val();
      const con_reduccion = $el.is(":checked");
      const data={
        con_reduccion     : con_reduccion,
        $containers_color : $containers_color,
        keyword           : keyword
      };
      OPS.muestra_oculta(data);
    });
  },

  /**
   *  Contenedor de operaciones
   *
   *  @cont OPS
   */
  OPS={

    /**
     *  Muestra u oculta contenedores según si hay marcas o no
     *
     *  @method OPS.muestra_oculta
     *
     *  @param {obj} data : Datos necesarios
     */
    muestra_oculta:data=>{
      if(data.con_reduccion){
        data.$containers_color.each((i,e)=>{
          const $el=$(e);
          const hayMarcas=($el.find('.markjs').length>0);
          if(!hayMarcas && data.keyword!==""){
            $el.hide();
          }
          else{
            $el.show();
          }
        });
      }
      else{
        data.$containers_color.show();
      }
    },

    /**
     *  Transforma un color dado a hexadecimal, incluso hexadecimal
     *
     *  @method OPS.getHexColor
     *
     *  @param {string} colorStr  : color a transformar en hexadecimal (incluso hexadecimal)
     *
     *  @return {string} colorHex : color en hexadecimal ó {bool} false si no es correcta la operación de conversión
     */
    getHexColor:colorStr=>{
      const a = document.createElement('div');
      a.style.color = colorStr;
      const colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map((a)=>{
        return parseInt(a,10);
      });
      document.body.removeChild(a);
      const colorHex=(colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
      return colorHex;
    },

    /**
     *  Transforma un color dado a rgba
     *
     *  @method OPS.colorToRGBA
     *
     *  @param {string} color  : color a transformar en hexadecimal ó nombre
     *
     *  @return {string} colorRGBA : color en formato rgba
     */
    colorToRGBA:color=>{
      // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
      // color must be a valid canvas fillStyle. This will cover most anything
      // you'd want to use.
      // Examples:
      // colorToRGBA('red')  # [255, 0, 0, 255]
      // colorToRGBA('#f00') # [255, 0, 0, 255]
      let cvs, ctx;
      cvs = document.createElement('canvas');
      cvs.height = 1;
      cvs.width = 1;
      ctx = cvs.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const colorRGBA=ctx.getImageData(0, 0, 1, 1).data;
      return colorRGBA;
    },

    /**
     *  Pinta tablas de colores
     *
     *  @method OPS.pinta_paletas
     *
     *  @param {object} paletas: datos de las paletas
     */
    pinta_paletas:paletas=>{
      let styles_css_paletas="";
      for (const val of Object.values(paletas)){
        for (const [k, v] of Object.entries(val)){
          $(`<h3 class="col-12 pl-2">Tabla de colores <strong>${k}</strong></h3>`).appendTo($cont_colorimetrias);
          const $cont_colores=$('<article class="cont_colores col-lg-12 col-md-12 col-sm-12"></article>').appendTo($cont_colorimetrias);
          const colorize_classes=OPS.pinta_colores(k,v,$cont_colores);
          styles_css_paletas+=colorize_classes;
        }
      }
      $('[data-id="css_colors"]').html(styles_css_paletas);
    },

    /**
     *  Pinta colores con nombres, alias, y hexadecimal
     *
     *  @method OPS.pinta_colores
     *
     *  @param {object} colores: array de colores
     *  @param {object} $cont_colores: contenedor donde pintar los colores
     *
     */
    pinta_colores:(nombre_paleta,colores,$cont_colores)=>{
      let colorize_classes="";
      colores.forEach((color,i)=>{
//consoleScript.log("[colorimetrias.js] OPS.pinta_colores...color.color,color.nom:::::",color.color,color.nom);
        const nom=`<span class="color_name">${color.nom}</span>`;
        let alias="";
        if(typeof(color.alias)==="string"){
          if(color.alias!==""){
            color.alias=color.alias.split(",");
          }
          else{
            color.alias=[];
          }
        }
        color.alias.forEach(e=>{
          alias+=`<span class="color_alias">${e}</span>`;
        });
        // pueden venir colores por su NOMBRE con lo que se transforma a hexadecimal
        let colorhex=color.color.toUpperCase();
        let colorhex_html=`<span class="color_hex">${colorhex}`;
        if(color.color.indexOf("#")===-1){
          colorhex      = OPS.getHexColor(color.color).toUpperCase();
          colorhex_html = `${colorhex_html} ${colorhex}`;
        }
        color_name_hex= colorhex.replace(/[\#]/g,'');
        // nombre de clase para el color
        color_style_css= `${nombre_paleta}_${color_name_hex}`;
        colorize_classes+=`.${color_style_css}{background-color:${colorhex};}\n`;
        //const color_html=(color.color!=="")?`<span class="color ${color_style_css}" style="background-color:${colorhex}"></span>
        const color_html=(color.color!=="")?`<span class="color ${color_style_css}"></span>
          <div class="cont_color_hex">
            ${colorhex_html}
            <a href="//www.color-hex.com/color/${color_name_hex}" class="btn_color_hex" target="_blank" title="Acceso externo a colorHex para ver la info del color ${colorhex}">
              <span class="icono fa fas fa-info-circle p-1" aria-hidden="true"></span>
            </a>
          </div>`:"&nbsp;";
        const $color=`<div class="container_color col-md-3 col-sm-4">
          ${nom}
          ${alias}
          ${color_html}
        </div>`;
        $cont_colores.append($color);
      });
      return colorize_classes;
    },
  };
  // inicialización del contenedor
  INIT();
};

COLORIMETRIAS();


