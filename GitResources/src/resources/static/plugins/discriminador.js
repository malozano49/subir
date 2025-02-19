/**
 *  @file        : discriminador_con_color.js
 *  
 *  @description : Plugin para control responsive
 *  @license     : baratz
 *  @ver         : 7.0
 *  @copyright   : 2017
 *  
 *  @author      : http://www.baratz.es/
 *  @date        : 2017-12-13
 *  
 *  @human       : Xose Manuel Paz Grana <xose_manuel.paz@baratz.es>
 *  @human       : Jose Antonio Iglesias <jose_antonio.iglesias@baratz.es>
 */

/*! [DEPENDENCIAS */
/*!
 * UAParser.js v0.7.19
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */
!function(i,s){"use strict";var e="0.7.19",o="",r="?",n="function",a="undefined",d="object",t="string",l="major",w="model",u="name",c="type",m="vendor",b="version",p="architecture",g="console",f="mobile",h="tablet",v="smarttv",x="wearable",k="embedded",y={extend:function(i,s){var e={};for(var o in i)s[o]&&s[o].length%2===0?e[o]=s[o].concat(i[o]):e[o]=i[o];return e},has:function(i,s){return"string"==typeof i&&s.toLowerCase().indexOf(i.toLowerCase())!==-1},lowerize:function(i){return i.toLowerCase()},major:function(i){return typeof i===t?i.replace(/[^\d\.]/g,"").split(".")[0]:s},trim:function(i){return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},T={rgx:function(i,e){for(var o,r,a,t,l,w,u=0;u<e.length&&!l;){var c=e[u],m=e[u+1];for(o=r=0;o<c.length&&!l;)if(l=c[o++].exec(i))for(a=0;a<m.length;a++)w=l[++r],t=m[a],typeof t===d&&t.length>0?2==t.length?typeof t[1]==n?this[t[0]]=t[1].call(this,w):this[t[0]]=t[1]:3==t.length?typeof t[1]!==n||t[1].exec&&t[1].test?this[t[0]]=w?w.replace(t[1],t[2]):s:this[t[0]]=w?t[1].call(this,w,t[2]):s:4==t.length&&(this[t[0]]=w?t[3].call(this,w.replace(t[1],t[2])):s):this[t]=w?w:s;u+=2}},str:function(i,e){for(var o in e)if(typeof e[o]===d&&e[o].length>0){for(var n=0;n<e[o].length;n++)if(y.has(e[o][n],i))return o===r?s:o}else if(y.has(e[o],i))return o===r?s:o;return i}},E={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},S={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[u,b],[/(opios)[\/\s]+([\w\.]+)/i],[[u,"Opera Mini"],b],[/\s(opr)\/([\w\.]+)/i],[[u,"Opera"],b],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i],[u,b],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[u,"IE"],b],[/(edge|edgios|edga)\/((\d+)?[\w\.]+)/i],[[u,"Edge"],b],[/(yabrowser)\/([\w\.]+)/i],[[u,"Yandex"],b],[/(puffin)\/([\w\.]+)/i],[[u,"Puffin"],b],[/(focus)\/([\w\.]+)/i],[[u,"Firefox Focus"],b],[/(opt)\/([\w\.]+)/i],[[u,"Opera Touch"],b],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[u,"UCBrowser"],b],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],b],[/(micromessenger)\/([\w\.]+)/i],[[u,"WeChat"],b],[/(brave)\/([\w\.]+)/i],[[u,"Brave"],b],[/(qqbrowserlite)\/([\w\.]+)/i],[u,b],[/(QQ)\/([\d\.]+)/i],[u,b],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[u,b],[/(BIDUBrowser)[\/\s]?([\w\.]+)/i],[u,b],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[u,b],[/(MetaSr)[\/\s]?([\w\.]+)/i],[u],[/(LBBROWSER)/i],[u],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[b,[u,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[b,[u,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/android.+(line)\/([\w\.]+)\/iab/i],[u,b],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[b,[u,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[u,/(.+)/,"$1 WebView"],b],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[u,/(.+(?:g|us))(.+)/,"$1 $2"],b],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[b,[u,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[u,b],[/(dolfin)\/([\w\.]+)/i],[[u,"Dolphin"],b],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[u,"Chrome"],b],[/(coast)\/([\w\.]+)/i],[[u,"Opera Coast"],b],[/fxios\/([\w\.-]+)/i],[b,[u,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[b,[u,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[b,u],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[u,"GSA"],b],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[u,[b,T.str,E.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[u,b],[/(navigator|netscape)\/([\w\.-]+)/i],[[u,"Netscape"],b],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[u,b]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[p,"amd64"]],[/(ia32(?=;))/i],[[p,y.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[p,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[p,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[p,/ower/,"",y.lowerize]],[/(sun4\w)[;\)]/i],[[p,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[p,y.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[w,m,[c,h]],[/applecoremedia\/[\w\.]+ \((ipad)/],[w,[m,"Apple"],[c,h]],[/(apple\s{0,1}tv)/i],[[w,"Apple TV"],[m,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[m,w,[c,h]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[w,[m,"Amazon"],[c,h]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[w,T.str,E.device.amazon.model],[m,"Amazon"],[c,f]],[/android.+aft([bms])\sbuild/i],[w,[m,"Amazon"],[c,v]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[w,m,[c,f]],[/\((ip[honed|\s\w*]+);/i],[w,[m,"Apple"],[c,f]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[m,w,[c,f]],[/\(bb10;\s(\w+)/i],[w,[m,"BlackBerry"],[c,f]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],[w,[m,"Asus"],[c,h]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[m,"Sony"],[w,"Xperia Tablet"],[c,h]],[/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],[w,[m,"Sony"],[c,f]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[m,w,[c,g]],[/android.+;\s(shield)\sbuild/i],[w,[m,"Nvidia"],[c,g]],[/(playstation\s[34portablevi]+)/i],[w,[m,"Sony"],[c,g]],[/(sprint\s(\w+))/i],[[m,T.str,E.device.sprint.vendor],[w,T.str,E.device.sprint.model],[c,f]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[m,w,[c,h]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[m,[w,/_/g," "],[c,f]],[/(nexus\s9)/i],[w,[m,"HTC"],[c,h]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p)/i],[w,[m,"Huawei"],[c,f]],[/(microsoft);\s(lumia[\s\w]+)/i],[m,w,[c,f]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[w,[m,"Microsoft"],[c,g]],[/(kin\.[onetw]{3})/i],[[w,/\./g," "],[m,"Microsoft"],[c,f]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[w,[m,"Motorola"],[c,f]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[w,[m,"Motorola"],[c,h]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[m,y.trim],[w,y.trim],[c,v]],[/hbbtv.+maple;(\d+)/i],[[w,/^/,"SmartTV"],[m,"Samsung"],[c,v]],[/\(dtv[\);].+(aquos)/i],[w,[m,"Sharp"],[c,v]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[m,"Samsung"],w,[c,h]],[/smart-tv.+(samsung)/i],[m,[c,v],w],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[m,"Samsung"],w,[c,f]],[/sie-(\w*)/i],[w,[m,"Siemens"],[c,f]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[m,"Nokia"],w,[c,f]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[w,[m,"Acer"],[c,h]],[/android.+([vl]k\-?\d{3})\s+build/i],[w,[m,"LG"],[c,h]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[m,"LG"],w,[c,h]],[/(lg) netcast\.tv/i],[m,w,[c,v]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[w,[m,"LG"],[c,f]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[w,[m,"Lenovo"],[c,h]],[/linux;.+((jolla));/i],[m,w,[c,f]],[/((pebble))app\/[\d\.]+\s/i],[m,w,[c,x]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[m,w,[c,f]],[/crkey/i],[[w,"Chromecast"],[m,"Google"]],[/android.+;\s(glass)\s\d/i],[w,[m,"Google"],[c,x]],[/android.+;\s(pixel c)[\s)]/i],[w,[m,"Google"],[c,h]],[/android.+;\s(pixel( [23])?( xl)?)\s/i],[w,[m,"Google"],[c,f]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],[[w,/_/g," "],[m,"Xiaomi"],[c,f]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],[[w,/_/g," "],[m,"Xiaomi"],[c,h]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[w,[m,"Meizu"],[c,h]],[/(mz)-([\w-]{2,})/i],[[m,"Meizu"],w,[c,f]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})\s+build/i],[w,[m,"OnePlus"],[c,f]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[w,[m,"RCA"],[c,h]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[w,[m,"Dell"],[c,h]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[w,[m,"Verizon"],[c,h]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[m,"Barnes & Noble"],w,[c,h]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[w,[m,"NuVision"],[c,h]],[/android.+;\s(k88)\sbuild/i],[w,[m,"ZTE"],[c,h]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[w,[m,"Swiss"],[c,f]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[w,[m,"Swiss"],[c,h]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[w,[m,"Zeki"],[c,h]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[m,"Dragon Touch"],w,[c,h]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[w,[m,"Insignia"],[c,h]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[w,[m,"NextBook"],[c,h]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[m,"Voice"],w,[c,f]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[m,"LvTel"],w,[c,f]],[/android.+;\s(PH-1)\s/i],[w,[m,"Essential"],[c,f]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[w,[m,"Envizen"],[c,h]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[m,w,[c,h]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[w,[m,"MachSpeed"],[c,h]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[m,w,[c,h]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[w,[m,"Rotor"],[c,h]],[/android.+(KS(.+))\s+build/i],[w,[m,"Amazon"],[c,h]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[m,w,[c,h]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[c,y.lowerize],m,w],[/(android[\w\.\s\-]{0,9});.+build/i],[w,[m,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[b,[u,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[u,b],[/rv\:([\w\.]{1,9}).+(gecko)/i],[b,u]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[u,b],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[u,[b,T.str,E.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[u,"Windows"],[b,T.str,E.os.windows.version]],[/\((bb)(10);/i],[[u,"BlackBerry"],b],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,/linux;.+(sailfish);/i],[u,b],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[u,"Symbian"],b],[/\((series40);/i],[u],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[u,"Firefox OS"],b],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[u,b],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[u,"Chromium OS"],b],[/(sunos)\s?([\w\.\d]*)/i],[[u,"Solaris"],b],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[u,b],[/(haiku)\s(\w+)/i],[u,b],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[b,/_/g,"."],[u,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[u,"Mac OS"],[b,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[u,b]]},A=function(e,r){if("object"==typeof e&&(r=e,e=s),!(this instanceof A))return new A(e,r).getResult();var n=e||(i&&i.navigator&&i.navigator.userAgent?i.navigator.userAgent:o),a=r?y.extend(S,r):S;return this.getBrowser=function(){var i={name:s,version:s};return T.rgx.call(i,n,a.browser),i.major=y.major(i.version),i},this.getCPU=function(){var i={architecture:s};return T.rgx.call(i,n,a.cpu),i},this.getDevice=function(){var i={vendor:s,model:s,type:s};return T.rgx.call(i,n,a.device),i},this.getEngine=function(){var i={name:s,version:s};return T.rgx.call(i,n,a.engine),i},this.getOS=function(){var i={name:s,version:s};return T.rgx.call(i,n,a.os),i},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(i){return n=i,this},this};A.VERSION=e,A.BROWSER={NAME:u,MAJOR:l,VERSION:b},A.CPU={ARCHITECTURE:p},A.DEVICE={MODEL:w,VENDOR:m,TYPE:c,CONSOLE:g,MOBILE:f,SMARTTV:v,TABLET:h,WEARABLE:x,EMBEDDED:k},A.ENGINE={NAME:u,VERSION:b},A.OS={NAME:u,VERSION:b},typeof exports!==a?(typeof module!==a&&module.exports&&(exports=module.exports=A),exports.UAParser=A):typeof define===n&&define.amd?define(function(){return A}):i&&(i.UAParser=A);var N=i&&(i.jQuery||i.Zepto);if(typeof N!==a&&!N.ua){var z=new A;N.ua=z.getResult(),N.ua.get=function(){return z.getUA()},N.ua.set=function(i){z.setUA(i);var s=z.getResult();for(var e in s)N.ua[e]=s[e]}}}("object"==typeof window?window:this);
/*! *******************************************
// Copyright 2010-2015, Anthony Hand
// File version 2015.05.13 (May 13, 2015)
// Updates: https://github.com/ahand/MobileEsp
******************************************* */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2K 2L={c:6,m:6,n:6,o:6,p:6,r:6,s:6,t:6,u:6,v:6,C:\'2M\',19:\'2N\',1a:\'2O\',1b:\'2P\',1c:\'2Q\',1d:\'2R\',1e:\'2S\',1f:\'h D 2T 7\',1g:\'h D 8\',1h:\'h D 10\',1i:\'h 2U\',1j:\'h\',1k:\'2V\',1l:\'2W\',1m:\'2X 2Y\',1n:\'w\',1o:\'2Z\',1p:\'1q.30\',1r:\'31\',1s:\'32\',1t:\'w 33\',1u:\'34\',1v:\'35\',1w:\'w 36\',1x:\'w 37\',1y:\'38\',E:\'39\',1z:\'3a\',F:\'3b\',1A:\'3c\',1B:\'3d\',1C:\'3e\',1D:\'3f\',1E:\'3g\',1F:\'3h\',1G:\'3i\',1H:\'3j\',1I:\'3k\',G:\'3l\',H:\'3m\',1J:\'3n\',I:\'3o\',1K:\'3p\',1L:\'3q-3r\',1M:\'3s\',1N:\'3t\',3u:\'1q.3v\',1O:\'1O\',i:\'3w\',1P:\'3x\',1Q:\'3y\',1R:\'3z\',J:\'3A\',1S:\'3B\',1T:\'3C\',1U:\'3D\',1V:\'3E\',1W:\'3F\',1X:\'3G\',K:\'3H\',1Y:\'3I\',1Z:\'3J\',20:\'21.3K\',22:\'3L\',3M:\'21.3N\',23:\'3O q\',24:\'3P\',25:\'3Q\',L:\'L\',d:\'d\',x:\'x\',26:\'3R-3S\',27:\'3T\',M:\'M\',N:\'N\',28:\'29/3U\',2a:\'3V\',2b:\'3W\',2c:\'3X-3Y\',2d:\'29\',2e:\'3Z\',2f:\'40\',2g:\'41\',2h:\'42\',2i:\'43\',3:\'\',44:a(){0.c=6;4(O&&O.2j)0.3=O.2j.45();0.m=0.f();0.o=0.P();0.p=0.e();0.r=0.Q();0.n=0.y();0.t=0.j();0.s=0.k();0.u=0.R();0.v=0.2k();0.c=9},P:a(){4(0.c||0.o)2 0.o;4(0.3.5(0.19)>-1){4(0.z()||0.S())2 6;b 2 9}b 2 6},S:a(){4(0.3.5(0.1a)>-1)2 9;b 2 6},T:a(){4(0.P()||0.S())2 9;b 2 6},z:a(){4(0.3.5(0.1b)>-1&&0.f())2 9;b 2 6},U:a(){4(0.T()||0.z())2 9;b 2 6},e:a(){4(0.c||0.p)2 0.p;4((0.3.5(0.1d)>-1)||0.2l())2 9;2 6},Q:a(){4(0.c||0.r)2 0.r;4(!0.e())2 6;4(0.3.5(0.d)>-1)2 9;4(0.l())2 9;2 6},2m:a(){4(!0.e())2 6;4(0.l())2 6;4(0.3.5(0.d)>-1)2 6;b 2 9},46:a(){4(0.e()&&0.f())2 9;b 2 6},2l:a(){4(0.3.5(0.1e)>-1)2 9;b 2 6},f:a(){4(0.c||0.m)2 0.m;4(0.3.5(0.C)>-1)2 9;b 2 6},V:a(){4(0.2n()||0.2o()||0.2p())2 9;b 2 6},2n:a(){4(0.3.5(0.1f)>-1)2 9;b 2 6},2o:a(){4(0.3.5(0.1g)>-1)2 9;b 2 6},2p:a(){4(0.3.5(0.1h)>-1)2 9;b 2 6},W:a(){4(0.V())2 6;4(0.3.5(0.1i)>-1||0.3.5(0.1k)>-1||0.3.5(0.1m)>-1)2 9;4((0.3.5(0.1l)>-1)&&!(0.3.5(0.1c)>-1))2 9;4(0.3.5(0.2e)>-1&&0.3.5(0.1j)>-1)2 9;b 2 6},g:a(){4((0.3.5(0.1n)>-1)||(0.3.5(0.1p)>-1))2 9;4(0.X())2 9;b 2 6},X:a(){4((0.3.5(0.1o)>-1)&&(0.3.5(0.d)>-1))2 9;b 2 6},2q:a(){4(0.3.5(0.1y)>-1)2 9;b 2 6},A:a(){4(0.g()&&0.3.5(0.C)>-1)2 9;b 2 6},Y:a(){4(0.g()&&((0.3.5(0.1r)>-1)||(0.3.5(0.1x)>-1)||(0.3.5(0.1t)>-1)||(0.3.5(0.1w)>-1)))2 9;b 2 6},Z:a(){4(0.A())2 6;4((0.g())&&(0.Y()||0.3.5(0.1s)>-1||0.3.5(0.1u)>-1||0.3.5(0.1v)>-1))2 9;b 2 6},47:a(){4(0.g()){4(0.Z()||0.A())2 6;b 2 9}b 2 6},11:a(){4(0.f()){4((0.3.5(0.F)>-1||0.3.5(0.E)>-1))2 9;b 2 6}b 2 6},2r:a(){4(0.3.5(0.E)>-1||0.3.5(0.F)>-1||((0.3.5(0.1z)>-1)&&(0.l))||0.3.5(0.1A)>-1||0.3.5(0.1B)>-1||0.3.5(0.1C)>-1)2 9;b 2 6},2s:a(){4(0.12())2 6;4(0.3.5(0.1D)>-1||0.3.5(0.1M)>-1||0.3.5(0.1N)>-1)2 9;b 2 6},12:a(){4(0.3.5(0.1E)>-1)2 9;b 2 6},13:a(){4(0.3.5(0.1G)>-1&&0.3.5(0.i)>-1)2 9;b 2 6},48:a(){4(0.3.5(0.1F)>-1&&0.3.5(0.27)>-1)2 9;b 2 6},l:a(){4((0.3.5(0.1Y)>-1)&&((0.3.5(0.L)>-1||0.3.5(0.x)>-1)))2 9;b 2 6},14:a(){4(0.3.5(0.1K)>-1&&!0.e())2 9;b 2 6},2t:a(){4(0.3.5(0.1L)>-1)2 9;b 2 6},49:a(){4(0.3.5(0.1H)>-1)2 9;b 2 6},2u:a(){4(0.3.5(0.1I)>-1)2 9;b 2 6},2v:a(){4(0.3.5(0.G)>-1&&0.3.5(0.d)>-1)2 9;b 2 6},4a:a(){4(0.3.5(0.G)>-1&&0.3.5(0.26)>-1)2 9;b 2 6},4b:a(){4(0.3.5(0.H)>-1)2 9;b 2 6},2w:a(){4(0.3.5(0.H)>-1&&0.3.5(0.x)>-1)2 9;b 2 6},4c:a(){4(0.15()||0.16())2 9;b 2 6},15:a(){4(0.U()||0.e()||0.B())2 6;4((0.3.5(0.K)>-1)&&(0.3.5(0.d)>-1))2 9;2 6},16:a(){4(0.U()||0.e()||0.B())2 6;4((0.3.5(0.K)>-1)&&(0.3.5(0.i)>-1))2 9;2 6},B:a(){4(0.3.5(0.1J)>-1)2 9;b 2 6},2x:a(){4(0.B()&&(0.3.5(0.d)>-1))2 9;2 6},4d:a(){4(0.17()||0.18())2 9;b 2 6},17:a(){4((0.3.5(0.I)>-1)&&(0.3.5(0.d)>-1))2 9;2 6},18:a(){4((0.3.5(0.I)>-1)&&(0.3.5(0.i)>-1))2 9;2 6},2y:a(){4(0.3.5(0.1Q)>-1||0.3.5(0.1R)>-1)2 9;b 2 6},2z:a(){4((0.3.5(0.2d)>-1)&&((0.3.5(0.4e)>-1)||(0.3.5(0.28)>-1)))2 9;b 2 6},2A:a(){4(0.3.5(0.M)>-1)2 9;4((0.3.5(0.N)>-1)&&(0.3.5(0.i)>-1)&&0.13()&&!0.e())2 9;b 2 6},2B:a(){4(0.3.5(0.1X)>-1)2 9;b 2 6},2C:a(){4(0.2D()||0.2E()||0.2F())2 9;b 2 6},2D:a(){4(0.3.5(0.J)>-1)2 9;b 2 6},2G:a(){4((0.3.5(0.J)>-1)&&(0.3.5(0.1S)>-1))2 9;b 2 6},2E:a(){4(0.3.5(0.1U)>-1||0.3.5(0.1V)>-1||0.3.5(0.1T)>-1)2 9;b 2 6},2F:a(){4(0.3.5(0.1W)>-1)2 9;b 2 6},2H:a(){4(0.3.5(0.1P)>-1)2 9;b 2 6},2I:a(){4(0.j()||0.11()||0.2r()||0.W()||0.g()||0.2w()||0.2s())2 9;2 6},y:a(){4(0.c||0.n)2 0.n;4(0.k())2 6;4(0.2I())2 9;4(0.3.5(0.d)>-1)2 9;4(0.l())2 9;4(0.14()||0.2t())2 9;4(0.3.5(0.22)>-1||0.2H())2 9;4((0.3.5(0.24)>-1)||(0.3.5(0.1Z)>-1)||(0.3.5(0.20)>-1))2 9;2 6},2J:a(){4(0.y())2 9;4(0.2C())2 9;4(0.2y()||0.2A()||0.2z()||0.2B())2 9;4((0.3.5(0.25)>-1)&&!(0.3.5(0.2i)>-1))2 9;4((0.3.5(0.2c)>-1)||(0.3.5(0.2a)>-1)||(0.3.5(0.2b)>-1)||(0.3.5(0.2f)>-1)||(0.3.5(0.2g)>-1)||(0.3.5(0.2h)>-1))2 9;2 6},k:a(){4(0.c||0.s)2 0.s;4(0.z()||0.2m()||0.2q()||0.16()||0.18()||0.13())2 9;b 2 6},j:a(){4(0.c||0.t)2 0.t;4(0.T()||0.Q()||0.V()||0.X()||0.12()||0.2u()||0.2v()||0.15()||0.2x()||0.17()||0.2G())2 9;4(0.A()&&0.Y())2 9;b 2 6},R:a(){4(0.c||0.u)2 0.u;4(0.j()||0.14()||0.k())2 6;4(!0.y())2 6;4(0.f())2 9;4(0.11()||0.Z()||0.W()||(0.3.5(0.23)>-1))2 9;b 2 6},2k:a(){4(0.c||0.v)2 0.v;4(0.j()||0.R()||0.k())2 6;4(0.2J())2 9;b 2 6}};',62,263,'this||return|uagent|if|search|false|||true|function|else|initCompleted|mobile|DetectAndroid|DetectWebkit|DetectBlackBerry|windows|deviceTablet|DetectTierIphone|DetectTierTablet|DetectOperaMobile|isWebkit|isMobilePhone|isIphone|isAndroid||isAndroidPhone|isTierTablet|isTierIphone|isTierRichCss|isTierGenericMobile|blackberry|mobi|DetectMobileQuick|DetectIpad|DetectBlackBerryWebKit|DetectSailfish|engineWebKit|phone|deviceSymbian|deviceS60|deviceTizen|deviceMeego|deviceUbuntu|devicePlaystation|engineFirefox|mini|maemo|linux|navigator|DetectIphone|DetectAndroidPhone|DetectTierRichCss|DetectIpod|DetectIphoneOrIpod|DetectIos|DetectWindowsPhone|DetectWindowsMobile|DetectBlackBerry10Phone|DetectBlackBerryTouch|DetectBlackBerryHigh||DetectS60OssBrowser|DetectPalmWebOS|DetectWebOSTablet|DetectKindle|DetectFirefoxOSPhone|DetectFirefoxOSTablet|DetectUbuntuPhone|DetectUbuntuTablet|deviceIphone|deviceIpod|deviceIpad|deviceMacPpc|deviceAndroid|deviceGoogleTV|deviceWinPhone7|deviceWinPhone8|deviceWinPhone10|deviceWinMob|deviceWindows|deviceIeMob|devicePpc|enginePie|deviceBB|deviceBB10|vndRIM|vnd|deviceBBStorm|deviceBBBold|deviceBBBoldTouch|deviceBBTour|deviceBBCurve|deviceBBCurveTouch|deviceBBTorch|deviceBBPlaybook|deviceSymbos|deviceS70|deviceS80|deviceS90|devicePalm|deviceWebOS|deviceWebOStv|deviceWebOShp|deviceNuvifone|deviceBada|deviceSailfish|deviceKindle|engineSilk|engineBlazer|engineXiino|wml|deviceBrew|deviceDanger|deviceHiptop|devicePlaystationVita|deviceNintendoDs|deviceNintendo|deviceWii|deviceXbox|deviceArchos|engineOpera|engineNetfront|engineUpBrowser|up|deviceMidp|engineTelecaQ|engineObigo|devicePda|smartTV1|smartTV2|mylocom2|sony|manuSonyEricsson|manuericsson|manuSamsung1|manuSony|manuHtc|svcDocomo|svcKddi|svcVodafone|disUpdate|userAgent|DetectTierOtherPhones|DetectGoogleTV|DetectAndroidTablet|DetectWindowsPhone7|DetectWindowsPhone8|DetectWindowsPhone10|DetectBlackBerryTablet|DetectSymbianOS|DetectPalmOS|DetectAmazonSilk|DetectBada|DetectTizen|DetectMeegoPhone|DetectSailfishPhone|DetectDangerHiptop|DetectSonyMylo|DetectMaemoTablet|DetectArchos|DetectGameConsole|DetectSonyPlaystation|DetectNintendo|DetectXbox|DetectGamingHandheld|DetectBrewDevice|DetectSmartphone|DetectMobileLong|var|MobileEsp|webkit|iphone|ipod|ipad|macintosh|android|googletv|os|ce|iemobile|ppc|wm5|pie|bb10|rim|blackberry95|blackberry97|99|blackberry96|blackberry89|938|98|playbook|symbian|symbos|series60|series70|series80|series90|palm|webos|web0s|hpwos|nuvifone|bada|tizen|meego|sailfish|ubuntu|kindle|silk|accelerated|blazer|xiino|vndwap|wap|tablet|brew|danger|hiptop|playstation|vita|nitro|nintendo|wii|xbox|archos|firefox|opera|netfront|browser|midp|uplink|link|teleca|obigo|pda|smart|tv|smarttv|com|sonyericsson|ericsson|sec|sgh|htc|docomo|kddi|vodafone|update|InitDeviceScan|toLowerCase|DetectAndroidWebKit|DetectBlackBerryLow|DetectWebOSTV|DetectGarminNuvifone|DetectTizenTV|DetectMeego|DetectFirefoxOS|DetectUbuntu|qtembedded'.split('|'),0,{}));
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
*/
!function(e,t){typeof module!="undefined"&&module.exports?module.exports=t():typeof define=="function"&&define.amd?define(t):this[e]=t()}("bowser",function(){function t(t){function n(e){var n=t.match(e);return n&&n.length>1&&n[1]||""}function r(e){var n=t.match(e);return n&&n.length>1&&n[2]||""}var i=n(/(ipod|iphone|ipad)/i).toLowerCase(),s=/like android/i.test(t),o=!s&&/android/i.test(t),u=/CrOS/.test(t),a=n(/edge\/(\d+(\.\d+)?)/i),f=n(/version\/(\d+(\.\d+)?)/i),l=/tablet/i.test(t),c=!l&&/[^-]mobi/i.test(t),h;/opera|opr/i.test(t)?h={name:"Opera",opera:e,version:f||n(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)}:/yabrowser/i.test(t)?h={name:"Yandex Browser",yandexbrowser:e,version:f||n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/windows phone/i.test(t)?(h={name:"Windows Phone",windowsphone:e},a?(h.msedge=e,h.version=a):(h.msie=e,h.version=n(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(t)?h={name:"Internet Explorer",msie:e,version:n(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:u?h={name:"Chrome",chromeBook:e,chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/chrome.+? edge/i.test(t)?h={name:"Microsoft Edge",msedge:e,version:a}:/chrome|crios|crmo/i.test(t)?h={name:"Chrome",chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:i?(h={name:i=="iphone"?"iPhone":i=="ipad"?"iPad":"iPod"},f&&(h.version=f)):/sailfish/i.test(t)?h={name:"Sailfish",sailfish:e,version:n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(t)?h={name:"SeaMonkey",seamonkey:e,version:n(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(t)?(h={name:"Firefox",firefox:e,version:n(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t)&&(h.firefoxos=e)):/silk/i.test(t)?h={name:"Amazon Silk",silk:e,version:n(/silk\/(\d+(\.\d+)?)/i)}:o?h={name:"Android",version:f}:/phantom/i.test(t)?h={name:"PhantomJS",phantom:e,version:n(/phantomjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(t)||/rim\stablet/i.test(t)?h={name:"BlackBerry",blackberry:e,version:f||n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:/(web|hpw)os/i.test(t)?(h={name:"WebOS",webos:e,version:f||n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(t)&&(h.touchpad=e)):/bada/i.test(t)?h={name:"Bada",bada:e,version:n(/dolfin\/(\d+(\.\d+)?)/i)}:/tizen/i.test(t)?h={name:"Tizen",tizen:e,version:n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||f}:/safari/i.test(t)?h={name:"Safari",safari:e,version:f}:h={name:n(/^(.*)\/(.*) /),version:r(/^(.*)\/(.*) /)},!h.msedge&&/(apple)?webkit/i.test(t)?(h.name=h.name||"Webkit",h.webkit=e,!h.version&&f&&(h.version=f)):!h.opera&&/gecko\//i.test(t)&&(h.name=h.name||"Gecko",h.gecko=e,h.version=h.version||n(/gecko\/(\d+(\.\d+)?)/i)),!h.msedge&&(o||h.silk)?h.android=e:i&&(h[i]=e,h.ios=e);var p="";h.windowsphone?p=n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):i?(p=n(/os (\d+([_\s]\d+)*) like mac os x/i),p=p.replace(/[_\s]/g,".")):o?p=n(/android[ \/-](\d+(\.\d+)*)/i):h.webos?p=n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):h.blackberry?p=n(/rim\stablet\sos\s(\d+(\.\d+)*)/i):h.bada?p=n(/bada\/(\d+(\.\d+)*)/i):h.tizen&&(p=n(/tizen[\/\s](\d+(\.\d+)*)/i)),p&&(h.osversion=p);var d=p.split(".")[0];if(l||i=="ipad"||o&&(d==3||d==4&&!c)||h.silk)h.tablet=e;else if(c||i=="iphone"||i=="ipod"||o||h.blackberry||h.webos||h.bada)h.mobile=e;return h.msedge||h.msie&&h.version>=10||h.yandexbrowser&&h.version>=15||h.chrome&&h.version>=20||h.firefox&&h.version>=20||h.safari&&h.version>=6||h.opera&&h.version>=10||h.ios&&h.osversion&&h.osversion.split(".")[0]>=6||h.blackberry&&h.version>=10.1?h.a=e:h.msie&&h.version<10||h.chrome&&h.version<20||h.firefox&&h.version<20||h.safari&&h.version<6||h.opera&&h.version<10||h.ios&&h.osversion&&h.osversion.split(".")[0]<6?h.c=e:h.x=e,h}var e=!0,n=t(typeof navigator!="undefined"?navigator.userAgent:"");return n.test=function(e){for(var t=0;t<e.length;++t){var r=e[t];if(typeof r=="string"&&r in n)return!0}return!1},n._detect=t,n});

/*!
	Detect Flash is installed
	http://www.featureblend.com/javascript-flash-detection-library.html
*/
var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){}
return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}
return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};}
return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};FlashDetect.JS_RELEASE="1.0.4";

// POLYFILL JSON
/*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
(function(){function M(r,q){function p(a,l){try{a()}catch(c){l&&l()}}function k(a){if(null!=k[a])return k[a];var l;if("bug-string-char-index"==a)l="a"!="a"[0];else if("json"==a)l=k("json-stringify")&&k("date-serialization")&&k("json-parse");else if("date-serialization"==a){if(l=k("json-stringify")&&v){var c=q.stringify;p(function(){l='"-271821-04-20T00:00:00.000Z"'==c(new z(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==c(new z(864E13))&&'"-000001-01-01T00:00:00.000Z"'==c(new z(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==
c(new z(-1))})}}else{var b;if("json-stringify"==a){var c=q.stringify,e="function"==typeof c;e&&((b=function(){return 1}).toJSON=b,p(function(){e="0"===c(0)&&"0"===c(new B)&&'""'==c(new A)&&c(t)===u&&c(u)===u&&c()===u&&"1"===c(b)&&"[1]"==c([b])&&"[null]"==c([u])&&"null"==c(null)&&"[null,null,null]"==c([u,t,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==c({a:[b,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===c(null,b)&&"[\n 1,\n 2\n]"==c([1,2],null,1)},function(){e=!1}));l=e}if("json-parse"==a){var n=
q.parse,d;"function"==typeof n&&p(function(){0===n("0")&&!n(!1)&&(b=n('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'),d=5==b.a.length&&1===b.a[0])&&(p(function(){d=!n('"\t"')}),d&&p(function(){d=1!==n("01")}),d&&p(function(){d=1!==n("1.")}))},function(){d=!1});l=d}}return k[a]=!!l}r||(r=f.Object());q||(q=f.Object());var B=r.Number||f.Number,A=r.String||f.String,E=r.Object||f.Object,z=r.Date||f.Date,I=r.SyntaxError||f.SyntaxError,J=r.TypeError||f.TypeError,K=r.Math||f.Math,F=r.JSON||f.JSON;"object"==
typeof F&&F&&(q.stringify=F.stringify,q.parse=F.parse);var E=E.prototype,t=E.toString,G=E.hasOwnProperty,u,v=new z(-0xc782b5b800cec);p(function(){v=-109252==v.getUTCFullYear()&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()});k["bug-string-char-index"]=k["date-serialization"]=k.json=k["json-stringify"]=k["json-parse"]=null;if(!k("json")){var N=k("bug-string-char-index"),C=function(a,b){var c=0,g,e,n;(g=function(){this.valueOf=
0}).prototype.valueOf=0;e=new g;for(n in e)G.call(e,n)&&c++;g=e=null;c?C=function(a,c){var b="[object Function]"==t.call(a),l,e;for(l in a)b&&"prototype"==l||!G.call(a,l)||(e="constructor"===l)||c(l);(e||G.call(a,l="constructor"))&&c(l)}:(e="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),C=function(a,c){var b="[object Function]"==t.call(a),l,g=!b&&"function"!=typeof a.constructor&&D[typeof a.hasOwnProperty]&&a.hasOwnProperty||G;for(l in a)b&&
"prototype"==l||!g.call(a,l)||c(l);for(b=e.length;l=e[--b];g.call(a,l)&&c(l));});return C(a,b)};if(!k("json-stringify")||!k(" date-serialization")){var L={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},x=function(a,b){return("000000"+(b||0)).slice(-a)},V=function(a){a=a.charCodeAt(0);var b=L[a];return b?b:"\\u00"+x(2,a.toString(16))},O=/[\x00-\x1f\x22\x5c]/g,S=function(a){O.lastIndex=0;return'"'+(O.test(a)?a.replace(O,V):a)+'"'},P=function(a){var b,c,g,e,n,d,h,f,m;if(v)b=function(a){c=
a.getUTCFullYear();g=a.getUTCMonth();e=a.getUTCDate();d=a.getUTCHours();h=a.getUTCMinutes();f=a.getUTCSeconds();m=a.getUTCMilliseconds()};else{var w=K.floor,k=[0,31,59,90,120,151,181,212,243,273,304,334],p=function(a,c){return k[c]+365*(a-1970)+w((a-1969+(c=+(1<c)))/4)-w((a-1901+c)/100)+w((a-1601+c)/400)};b=function(a){e=w(a/864E5);for(c=w(e/365.2425)+1970-1;p(c+1,0)<=e;c++);for(g=w((e-p(c,0))/30.42);p(c,g+1)<=e;g++);e=1+e-p(c,g);n=(a%864E5+864E5)%864E5;d=w(n/36E5)%24;h=w(n/6E4)%60;f=w(n/1E3)%60;
m=n%1E3}}P=function(a){a>-1/0&&a<1/0?(b(a),a=(0>=c||1E4<=c?(0>c?"-":"+")+x(6,0>c?-c:c):x(4,c))+"-"+x(2,g+1)+"-"+x(2,e)+"T"+x(2,d)+":"+x(2,h)+":"+x(2,f)+"."+x(3,m)+"Z",c=g=e=d=h=f=m=null):a=null;return a};return P(a)},Q=function(a,b,c,g,e,n,d){var h,f,m,k,q,r;p(function(){h=b[a]});"object"==typeof h&&h&&(h.getUTCFullYear&&"[object Date]"==t.call(h)&&h.toJSON===z.prototype.toJSON?h=P(h):"function"==typeof h.toJSON&&(h=h.toJSON(a)));c&&(h=c.call(b,a,h));if(h==u)return h===u?h:"null";f=typeof h;"object"==
f&&(m=t.call(h));switch(m||f){case "boolean":case "[object Boolean]":return""+h;case "number":case "[object Number]":return h>-1/0&&h<1/0?""+h:"null";case "string":case "[object String]":return S(""+h)}if("object"==typeof h){for(f=d.length;f--;)if(d[f]===h)throw J();d.push(h);k=[];r=n;n+=e;if("[object Array]"==m){q=0;for(f=h.length;q<f;q++)m=Q(q,h,c,g,e,n,d),k.push(m===u?"null":m);f=k.length?e?"[\n"+n+k.join(",\n"+n)+"\n"+r+"]":"["+k.join(",")+"]":"[]"}else C(g||h,function(a){var b=Q(a,h,c,g,e,n,
d);b!==u&&k.push(S(a)+":"+(e?" ":"")+b)}),f=k.length?e?"{\n"+n+k.join(",\n"+n)+"\n"+r+"}":"{"+k.join(",")+"}":"{}";d.pop();return f}};q.stringify=function(a,b,c){var g,e,f,d;if(D[typeof b]&&b)if(d=t.call(b),"[object Function]"==d)e=b;else if("[object Array]"==d){f={};for(var h=0,m=b.length,k;h<m;k=b[h++],(d=t.call(k),"[object String]"==d||"[object Number]"==d)&&(f[k]=1));}if(c)if(d=t.call(c),"[object Number]"==d){if(0<(c-=c%1))for(g="",10<c&&(c=10);g.length<c;g+=" ");}else"[object String]"==d&&(g=
10>=c.length?c:c.slice(0,10));return Q("",(k={},k[""]=a,k),e,f,g,"",[])}}if(!k("json-parse")){var W=A.fromCharCode,X={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},b,H,m=function(){b=H=null;throw I();},y=function(){for(var a=H,l=a.length,c,g,e,f,d;b<l;)switch(d=a.charCodeAt(b),d){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:return c=N?a.charAt(b):a[b],b++,c;case 34:c="@";for(b++;b<l;)if(d=a.charCodeAt(b),32>d)m();else if(92==d)switch(d=
a.charCodeAt(++b),d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c+=X[d];b++;break;case 117:g=++b;for(e=b+4;b<e;b++)d=a.charCodeAt(b),48<=d&&57>=d||97<=d&&102>=d||65<=d&&70>=d||m();c+=W("0x"+a.slice(g,b));break;default:m()}else{if(34==d)break;d=a.charCodeAt(b);for(g=b;32<=d&&92!=d&&34!=d;)d=a.charCodeAt(++b);c+=a.slice(g,b)}if(34==a.charCodeAt(b))return b++,c;m();default:g=b;45==d&&(f=!0,d=a.charCodeAt(++b));if(48<=d&&57>=d){for(48==d&&(d=a.charCodeAt(b+1),48<=d&&57>=d)&&m();b<
l&&(d=a.charCodeAt(b),48<=d&&57>=d);b++);if(46==a.charCodeAt(b)){for(e=++b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}d=a.charCodeAt(b);if(101==d||69==d){d=a.charCodeAt(++b);43!=d&&45!=d||b++;for(e=b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}return+a.slice(g,b)}f&&m();c=a.slice(b,b+4);if("true"==c)return b+=4,!0;if("fals"==c&&101==a.charCodeAt(b+4))return b+=5,!1;if("null"==c)return b+=4,null;m()}return"$"},R=function(a){var b,c;"$"==a&&m();if("string"==typeof a){if("@"==
(N?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];;){a=y();if("]"==a)break;c?","==a?(a=y(),"]"==a&&m()):m():c=!0;","==a&&m();b.push(R(a))}return b}if("{"==a){for(b={};;){a=y();if("}"==a)break;c?","==a?(a=y(),"}"==a&&m()):m():c=!0;","!=a&&"string"==typeof a&&"@"==(N?a.charAt(0):a[0])&&":"==y()||m();b[a.slice(1)]=R(y())}return b}m()}return a},U=function(a,b,c){c=T(a,b,c);c===u?delete a[b]:a[b]=c},T=function(a,b,c){var g=a[b],e;if("object"==typeof g&&g)if("[object Array]"==t.call(g))for(e=g.length;e--;U(g,
e,c));else C(g,function(a){U(g,a,c)});return c.call(a,b,g)};q.parse=function(a,f){var c,g;b=0;H=""+a;c=R(y());"$"!=y()&&m();b=H=null;return f&&"[object Function]"==t.call(f)?T((g={},g[""]=c,g),"",f):c}}}q.runInContext=M;return q}var I=typeof define==="function"&&define.amd,D={"function":!0,object:!0},A=D[typeof exports]&&exports&&!exports.nodeType&&exports,f=D[typeof window]&&window||this,p=A&&D[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!p||p.global!==p&&p.window!==
p&&p.self!==p||(f=p);if(A&&!I)M(f,A);else{var J=f.JSON,K=f.JSON3,L=!1,B=M(f,f.JSON3={noConflict:function(){L||(L=!0,f.JSON=J,f.JSON3=K,J=K=null);return B}});f.JSON={parse:B.parse,stringify:B.stringify}}I&&define(function(){return B})}).call(this);

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  if (!global.console) {
    global.console = {};
  }
  var con = global.console;
  var prop, method;
  var dummy = function() {};
  var properties = ['memory'];
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
  // Using `this` for web workers & supports Browserify / Webpack.
})(typeof window === 'undefined' ? this : window);

/*! DEPENDENCIAS END]*/


/**
 *  @date 191210
 *
 *  Crea un barra con datos variados en la zona superior de la página y agrega campos data y clases al campo definido en las opciones con objeto de discriminar estilos y operaciones en el FRONT.
 *  La modificación de la responsividad cambia los datos y el pintado de la tabla en tiempo real.
 *  A través de la tecla ESC se controla el intercambio de la vista de la barra
 *
 *  Controla además:
 *  	- Navegador y versión
 *  	- Sistema operativo
 *  	- Modo compatibilidad en IE
 *  	- Modo emulacion en IE y EDGE
 *  	- Tipo de dispositivo diferenciando entre tablet, mobile y desktop
 *  	- Si existe flash y su version
 *
 *  @method DISCRIMINADOR
 *
 *  @person J.A.Iglesias <jose_antonio.iglesias@baratz.es>
 *
 *  @param {object} options  : opciones para el plugin
 *
 *  @details Para su correcto funcionamiento, el plugin debe de ser lanzado una vez el DOM esté cargado [$(window).load(function(){ ]
 *
 *  	Esta barra cambia de color para controlar tamaños (de pantalla del dispositivo y documento) con vista a responsividad.
 *
 *  	En el tag asignado se aplican los siguientes campos data:
 *  		- w_nav : width de la pantalla de navegacion
 *     	- h_nav : height de la pantalla de navegacion
 *     	- flash : {boolean}
 *    	- version_navegador : {numero de version del navegador}
 *  		- isRetina : Si el navegador soporta retina en las imágenes
 *
 *  	En el tag proporcionado se guarda un campo data-discrimininador con los datos necesarios para la evaluacion desde js con todos los datos del compendio
 *
 *  	En el tag asignado se aplican las clases discriminadoras mostradas en el campo clases :
 *  		nombre del navegador
 *  		nombre+version
 *  		modo compatibilidad
 *  		flash/noflash
 *  		dispositivo/desktop
 *  		isRetina,DPR_x (device pixel ratio)
 *  		modo_privado
 *  		sistema operativo y version
 *
 *    Al guardar los datos en el campo data del TAG asingnado, se puede lanzar un evento de finalizacion ya que discrimindor requiere de $(window).load
 *
 */
// jshint jquery : true, multistr : true, evil : true
var DISCRIMINADOR = function(options){
	var defaults = {
		DESARROLLO         : true,      // Si false no se pinta la barra
		DEBUG			   : true,		// Si true y DESARROLLO=true, se muestran datos en console
		TAG                : $("body"), // Tag donde cargar las clases discriminatorias
		VISIBLE_INICIAL    : true,      // Si false, la vista de la barra comienza en no visible, al pulsar esc se muestra
		// vista de colores para los tamaños de pantalla (asociado a los puntos de corte bootstrap)
		RESPONSIVE : {
			"1200"         : "background-color:#FFFFFF!important;color:#000000!important;", // blanco
			"991"          : "background-color:#FFFF00!important;color:#000000!important;", // amarillo
			"768"          : "background-color:#008000!important;color:#FFFFFF!important;", // verde
			"480"          : "background-color:#FF0000!important;color:#FFFFFF!important;", // rojo
			"320"          : "background-color:#FFA500!important;color:#000000!important;"  // naranja
		}
	};
	var opciones = $.extend({},defaults,options);
	// GLOBALES
	var gbs={
		datos_navegador : {
			nombre_real        : "",
			version_real       : "",
			nombre_render      : "",
			version_render     : "",
			flash              : FlashDetect.installed,
			modoCompatibilidad : "",
			isRetina           : false,
			DPR                : 1,
			modo_privado	   : false, //se averigua en modo asíncrono
			sistema_operativo  : {}
		},
		clases 				    : {},
		claseCompatibilidad     : "",
		claseModoDocumento      : "",
		clases_a_pintar         : "",
		mobile                  : false, // detecta mobiles
		tablet					        : false, // detecta tablets
		soporte_mediaqueries    : true,
    dimensiones:{
      orientacion:"",
      nav:{
        w:"",
        h:""
      },
      doc:{
        w:"",
        h:""
      },
      scr:{
        w:"",
        h:""
      }
    },
	};
	/***************************************************
		@FN INIT: inicio del flujo de montaje de capa
	***************************************************/
	var INIT=function(){
		TMPL.navControl();
		TMPL.pinta_sistema_operativo();
		TMPL.pintaClases();
		TMPL.pintaBarra();
		TMPL.pintaFlash();
		TMPL.dispositivoControl();
		EVENTOS();
		opciones.TAG.data("discriminador",gbs);
    // Si esta activo se lanzada un evento de finalizacion (tambien en resize)
    if(opciones.DSC_EVENTO.al_finalizar.activo){
      opciones.TAG.trigger(opciones.DSC_EVENTO.al_finalizar.nombre);
    }
		TMPL.pintaConsole();
    TMPL.lanzaPeticion();
	},
	EVENTOS=function(){
		/************************************************************************************
			Al pulsar esc desaparecen/aparecen los datos en pantalla si está activado el flag opciones.DESARROLLO
		*************************************************************************************/
		$(document).keydown(function(e){
			var code = e.keyCode ? e.keyCode : e.which;
			if(code==27 && opciones.DESARROLLO){
				var $display=$("#datos_nav");
				var modo=$display.css("display");
				if(modo=="block"){
					$display.css("display","none");
				}
				else{
					$display.css("display","block");
				}
			}
		});
		/************************************************************************************
			Al resize obtiene dimensiones al vuelo para muestra en capa de datos
		*************************************************************************************/
		$(window).resize(function() {
			TMPL.obtiene_dimensiones();
		});
		/************************************************************************************
			Creación de evento al efectuar resize de pantalla y que finalice la acción de resize
		*************************************************************************************/
		$(window).on({
			resize:function(){
				if(this.resizeTO){
					clearTimeout(this.resizeTO);
				}
				this.resizeTO = setTimeout(function() {
					// asignamos la ejecución del evento
					$(this).trigger('resizeEnd');
				}, 500);
			},
			resizeEnd:function(){
				if(gbs.mobile){
					TMPL.revisaResizeOrientacion();
				}
				TMPL.pintaConsole();
				opciones.TAG.data("discriminador",gbs);
         // Si esta activo se lanzada un evento de finalizacion (tambien en resize)
        if(opciones.DSC_EVENTO.al_finalizar.activo){
          opciones.TAG.trigger(opciones.DSC_EVENTO.al_finalizar.nombre);
        }
			}
		});
	},
	TMPL={
		/**
		 *  Detecta el tipo de navegacion en el explorador
		 *
		 *  @method TMPL.detectPrivateMode
		 *
		 *  @param {string} cb  : opcion
		 *
		 *  @details método asíncrono, devuelve booleano en la opcion
		 */
		detectPrivateMode:function(cb) {
			var db,
			on = cb.bind(null, true),
			off = cb.bind(null, false);

			function tryls() {
				try {
					localStorage.length ? off() : (localStorage.x = 1, localStorage.removeItem("x"), off());
				} catch (e) {
					// Safari only enables cookie in private mode
					// if cookie is disabled then all client side storage is disabled
					// if all client side storage is disabled, then there is no point
					// in using private mode
					navigator.cookieEnabled ? on() : off();
				}
			}

			// Blink (chrome & opera)
			window.webkitRequestFileSystem ? webkitRequestFileSystem(0, 0, off, on)
			// FF
			: "MozAppearance" in document.documentElement.style ? (db = indexedDB.open("test"), db.onerror = on, db.onsuccess = off)
			// Safari
			: /constructor/i.test(window.HTMLElement) || window.safari ? tryls()
			// IE10+ & edge
			: !window.indexedDB && (window.PointerEvent || window.MSPointerEvent) ? on()
			// Rest
			: off();
		},
		/**
		 *  Controla el tipo de navegador
		 *
		 *  @method TMPL.navControl
		 */
		navControl:function(){
			/////////////////////////////
			// MODO DE NAVEGACION
			/////////////////////////////
			// detecta el modo privado de los navegadores (asincrono) y aplica la clase pertinente al TAG seleccionado en caso positivo
			TMPL.detectPrivateMode(function (isPrivateMode) {
				gbs.datos_navegador.modo_privado=isPrivateMode;
				var clase_tag=isPrivateMode?"modo_privado":"";
				opciones.TAG.addClass(clase_tag);
				// pinta dato en la barra
				if (isPrivateMode){
					var $barra=$(document.body).find("#datos_nav");
					$barra.append('<span id="modo_navegacion" class="dato">MODO PRIVADO</span>');
					$barra.find("#clases_portadas").append("."+clase_tag);
				}
			});
			var nombre_real    = (bowser.name.toLowerCase()).replace(/ /g,"_");
			var version_real   = parseInt(bowser.version,10);
			var nombre_render  = "";
			var version_render = "";
			/////////////////////////////
			// IE CONTROL
			/////////////////////////////
			// para EDGE en el modo emulacion del useragent, también repercute en nombre_real = "internet explorer"
			if (nombre_real=="internet_explorer"){
				// reduce el nombre a ie para la clase a añadir
				nombre_real = "ie";
				nombre_render = "ie";
				// en caso de que esté emulando el modo de documento
				version_render=version_real;
				if(typeof(document.documentMode)=="number"){
					version_render=document.documentMode;
				}

				// comprueba si hay modificacion en el modo de compatibilidad para IE (no Edge)
				var iec = new TMPL.IECompatibility();
				// si esta activado el modo de compatibilidad
				if(iec.IsOn===true){
					gbs.datos_navegador.modoCompatibilidad = iec.IsOn;
					gbs.claseCompatibilidad="modocompatibilidad";
					version_real=parseInt(iec.Version.toLowerCase().replace(/[^0-9]/g, ""),10);
				}
				// si la version real difiere de la renderizada
				if(version_real!==version_render){
					gbs.claseModoDocumento="render_IE"+version_render;
				}
			}
			/////////////////////////////
			// EDGE CONTROL
			/////////////////////////////
			if (nombre_real=="microsoft_edge"){
				nombre_real = "edge";
			}
			// si nombre_real no es edge hay que ver si está EDGE emulando por detrás ya que nombre_real es el del navegador emulado
			if(nombre_real!="edge" && typeof CSS !== 'undefined' && CSS.supports("(-ms-ime-align:auto)")){
				// typeof(window.StyleMedia)
				// EDGE = function
				// IE10 = object
				// IE9  = FALTA COMPROBACION
				// IE8  = undefined
				// si se detecta EDGE
				if (typeof(window.StyleMedia=="function")){
					nombre_render  = nombre_real;
					version_render = version_real;
					nombre_real    = "edge";
					version_real   = "emulate_"+nombre_render+version_render;
				}
			}

			// añade un campo data-version_navegador al TAG con la version del navegador
			opciones.TAG.data({"version_navegador":version_real});

			// guarda datos del navegador
			gbs.datos_navegador.nombre_real    = nombre_real;
			gbs.datos_navegador.version_real   = version_real;
			gbs.datos_navegador.nombre_render  = nombre_render;
			gbs.datos_navegador.version_render = version_render;
			gbs.datos_navegador.flash          = FlashDetect.installed;

			// retina
			TMPL.controlRetina();
		},
		/**
		 *  Guarda la existencia de flash en el opciones.TAG definido y pinta datos en la vista
		 *
		 *  @method TMPL.pintaFlash
		 */
		pintaFlash:function(){
			var flash_installed="FLASH NO instalado";
			if(gbs.datos_navegador.flash){
				flash_installed="FLASH SI instalado. VERSIONES>> Menor:"+FlashDetect.minor +" Mayor:"+FlashDetect.major;
			}
			$("#flash").html(flash_installed);
			opciones.TAG.data("flash",gbs.datos_navegador.flash);
		},
		/**
		 *  Pinta los datos necesarios en la barra superior, y aplica al opciones.TAG seleccionado las clases discriminatorias
		 *
		 *  @method TMPL.pintaClases
		 */
		pintaClases:function(){
			gbs.clases={
				nombre              : gbs.datos_navegador.nombre_real.replace(" ","_"),
				version             : gbs.datos_navegador.nombre_real+gbs.datos_navegador.version_real,
				claseCompatibilidad : gbs.claseCompatibilidad,
				claseModoDocumento  : gbs.claseModoDocumento,
				flash               : (gbs.datos_navegador.flash)?"flash":"noflash",
				isRetina			: (gbs.datos_navegador.isRetina)?"isRetina":"",
				DPR					: (gbs.datos_navegador.isRetina)?"DPR_"+gbs.datos_navegador.DPR:"",
				sistema_operativo   : gbs.datos_navegador.sistema_operativo.name+'_'+gbs.datos_navegador.sistema_operativo.version
			};
			// Recorre clases y las añade al opciones.TAG seleccionado si tienen valor
			$.each(gbs.clases,function(key,value){
				if(value){
					gbs.clases_a_pintar+="."+value;
					// añade clases discriminatorias al tag
					opciones.TAG.addClass(value);
				}
			});
		},
		/**
		 *  Pinta la barra en la vista
		 *
		 *  @method TMPL.pintaBarra
		 */
		pintaBarra:function(){
			// pinta barra de datos en pantalla si opciones.DESARROLLO=true
			if (opciones.DESARROLLO){
				var visible=(opciones.VISIBLE_INICIAL)?"block":"none";
				// inserta hoja de estilos en el DOM
				var hoja=TMPL.creaTagStyle();

				var datosEstilo={
					hoja     : hoja,
					selector : "#datos_nav",
					estilos  : 'position:fixed;display:'+visible+';top:0;left:0;width:100%;z-index:9999;padding-right:8px;padding-left:8px;font-family:arial;font-weight:bold;font-size:.9rem;border:1px solid #ddd;background-color:#fff;color:#000',
					index    :0
				};
				TMPL.addCSSRule(datosEstilo);

				datosEstilo={
					hoja     : hoja,
					selector : ".dato",
					estilos  : 'margin-right:8px;font-size:1em',
					index    : 1
				};
				TMPL.addCSSRule(datosEstilo);

				var $capa='<div id="datos_nav">\
					<span id="sistema_operativo" class="dato"></span>\
					<span id="navegador" class="dato"></span>\
					<span id="dimensiones" class="dato"></span>\
					<span id="flash" class="dato"></span>\
					<span id="clases_portadas" class="dato">clases: '+gbs.clases_a_pintar+'</span>\
					<span id="dispositivo" class="dato"></span>\
					<span id="isRetina" class="dato"></span>\
					<span id="retina_dpr" class="dato"></span>\
					<span id="orientacion" class="dato"></span>\
					<span id="rotacion" class="dato"></span>\
				</div>';
				// Inserta capa en el body
				$(document.body).find("#datos_nav").remove();
				$(document.body).prepend($capa);
				// obtiene las dimensiones
				TMPL.obtiene_dimensiones();
				// Pinta en el id <<#navegador>>
				$("#sistema_operativo").html("S.O: "+gbs.datos_navegador.sistema_operativo.name+gbs.datos_navegador.sistema_operativo.version);
				$("#navegador").append("Navegador: "+gbs.datos_navegador.nombre_real.toUpperCase()+" "+gbs.datos_navegador.version_real);
				$("#isRetina").html("Retina: "+gbs.datos_navegador.isRetina);
				$("#retina_dpr").html("DPR: "+gbs.datos_navegador.DPR);
				// aplica @mediaqueries según los parámetros
				TMPL.aplicaMediaQueriesBarra(hoja);
			}
		},
		/**
		 *  Controla el tipo de dispositivo y la orientación e inserta las clases adecuadas en el opciones.TAG seleccionado
		 *
		 *  @method TMPL.dispositivoControl
		 */
		dispositivoControl:function(){
			/*************************************
				INITIALIZE THE MOBILEESP OBJECT
			*************************************/
			MobileEsp.InitDeviceScan();
			var dispositivo=" Dispositivo=";
			var clase_tipo="device_desktop";
			if(!gbs.tablet){
				gbs.mobile=MobileEsp.DetectTierIphone();
				if(gbs.mobile){
					dispositivo+="Tlfno con pantalla táctil ";
				}
				else{
					dispositivo+="No detectado o Sobremesa ";
				}
			}
			else{
				dispositivo+="Tablet ";
			}
			if (opciones.DESARROLLO){
				$("#dispositivo").html(dispositivo);
			}
			if (gbs.mobile || gbs.tablet){
				//check if the browser supports orientation change
				var supportsOrientationChange = "onorientationchange" in window;
				//if it does, use orientation change, otherwise use resize
				if (supportsOrientationChange){
					TMPL.getDeviceOrientation();
					// Escuchar cambios de orientación [en caso de trabajos con frames, esta invocacion debe de estar en el js del frame contenedor principal, pues el evento de orientacion no se escucha desde los contenidos][El evento de orientacion no se escucha en los navs de escritorio]
					window.addEventListener("orientationchange", function() {
						TMPL.getDeviceOrientation();
					}, false);
				}
				else{
					// FF en android no reconoce el evento orientationchange
					//window.addEventListener("deviceorientation", function(event) {
						//$("#rotacion").html ("rotacion: absolute-"+event.absolute/*+" alpha-"+event.alpha + ' beta-' + event.beta + ' gamma-' + event.gamma*/);
					//}, true);
					TMPL.revisaResizeOrientacion();
				}
				clase_tipo="device_dispositivo";
			}
			opciones.TAG.addClass(clase_tipo);
			$(document.body).find("#clases_portadas").append("."+clase_tipo);
		},
    /**
     *  Aquí iria el lanzado de la peticion
     *
     *  @method TMPL.lanzaPeticion()
     */
		lanzaPeticion:function(){
      if(opciones.CON_PETICION){
        console.log("Datos de la peticion::::::::::::::::::::::::",gbs);
      }
    },

    /**
		 *  Control del modo de compatibilidad en IE
		 *
		 *  @method TMPL.IECompatibility
		 */
		IECompatibility:function() {
			var agentStr = navigator.userAgent;
			this.IsIE = false;
			this.IsOn = undefined;  //defined only if IE
			this.Version = undefined;
			if (agentStr.indexOf("MSIE 7.0") > -1) {
				this.IsIE = true;
				this.IsOn = true;
				if (!!agentStr.match(/Trident\/7\./)) {
					this.Version = 'IE11';
				} else if (agentStr.indexOf("Trident/6.0") > -1) {
					this.Version = 'IE10';
				} else if (agentStr.indexOf("Trident/5.0") > -1) {
					this.Version = 'IE9';
				} else if (agentStr.indexOf("Trident/4.0") > -1) {
					this.Version = 'IE8';
				} else {
					this.IsOn = false; // compatability mimics 7, thus not on
					this.Version = 'IE7';
				}
			} //IE 7
		},
		/**
		 *  Obtiene las dimensiones de pantalla, html y ventana de navegador, para insertar en la capa creada #dimensiones
		 *
		 *  @method TMPL.obtiene_dimensiones
		 */
		obtiene_dimensiones:function(){
			// dimensiones ventana navegador
			var w_navegador=$(window).width();
			var h_navegador=$(window).height();
			var d_navegador="Nav->W:"+w_navegador+" H:"+h_navegador;
			// Se cargan en un campo data para el tag seleccionado las dimensiones de la ventana del navegador
			opciones.TAG.data({
				"w_nav":w_navegador,
				"h_nav":h_navegador
			});
      gbs.dimensiones.nav={
        w:w_navegador,
        h:h_navegador
      };
			// Se carga una clase discriminadora (.disc_min) en el tag para apoyo a las clases css si el ancho del navegador es <=1024
			if(w_navegador<=opciones.DISC_MIN){
				opciones.TAG.addClass("disc_min");
			}
			else{
				opciones.TAG.removeClass("disc_min");
			}
			// dimensiones totales html completo
      var doc_w=$(document).width();
      var doc_h=$(document).height();
			var d_html="&nbsp;&nbsp;&nbsp;Doc->W:"+doc_w+" H:"+doc_h;
      gbs.dimensiones.doc={
        w:doc_w,
        h:doc_h
      };
			// dimensiones de la pantalla del usuario
			var d_pantalla="&nbsp;&nbsp;Scr->"+screen.width+"x"+screen.height;
			$("#dimensiones").html(d_navegador+d_html+d_pantalla);
      gbs.dimensiones.scr={
        w:screen.width,
        h:screen.height
      };
		},
		/**
		 *  Lee la orientación del dispositivo vía window.orientation y muestra datos en pantalla
		 *
		 *  @method TMPL.getDeviceOrientation
		 */
		getDeviceOrientation:function() {
			var orientacion="";
			switch (window.orientation){
			case 0:
				orientacion="Portrait";
				// Portrait Mode
				break;
			case 180:
				orientacion="Portrait";
				// Portrait Mode But (Upside-down)
				break;
			case -90:
				orientacion="Landscape";
				// Landscape Mode with (Clockwise)
				break;
			case 90:
				orientacion="Landscape";
				// Landscape Mode with  (Counterclockwise)
				break;
			}
			if(opciones.DESARROLLO){
				$("#rotacion").html("rotacion: "+window.orientation);
				$("#orientacion").html("orientacion: "+orientacion);
			}
			opciones.TAG.removeClass("Portrait Landscape").addClass(orientacion);
      gbs.dimensiones.orientacion=orientacion;
		},
		/**
		 *  A través de screen, lee y compara dimensiones para determinar la orientación si el dispositivo tiene un navegador que no permite window.orientation
		 *
		 *  @method TMPL.revisaResizeOrientacion
		 */
		revisaResizeOrientacion:function(){
			var orientacion=(screen.height < screen.width)?"Landscape":"Portrait";
			if(opciones.DESARROLLO){
				$("#orientacion").html("orientacion: "+orientacion);
			}
			opciones.TAG.removeClass("Portrait Landscape").addClass(orientacion);
		},
		/**
		 *  Crea un tag style en el head del documento
		 *
		 *  @method TMPL.creaTagStyle
		 *
		 *  @return {dom object} retorno : hoja de estilos creada
		 */
		creaTagStyle:function(){
			// Create the <style> tag
			var style = document.createElement("style");
			var text = "";
			style.setAttribute("type", "text/css");
			style.setAttribute("data-doc", "discriminador.js");
			if (style.styleSheet) {   // for IE
				style.styleSheet.cssText = text;
			} else {
				// Add a media (and/or media query) here if you'd like!
				// style.setAttribute("media", "screen")
				// style.setAttribute("media", "only screen and (max-width : 1024px)")
				var textnode = document.createTextNode(text);
				// WebKit hack :(
				style.appendChild(textnode);
			}
			var h = document.getElementsByTagName('head')[0];
			// Add the <style> element to the page
			h.appendChild(style);
			var retorno=style.sheet;
			if(typeof(retorno)=="undefined"){ //ie9-
				retorno=document.styleSheets[0];
			}
			return retorno;
		},
		/**
		 *  Inserta estilos en una hoja del head
		 *
		 *  @method TMPL.addCSSRule
		 *
		 *  @param {object} datos  : Description for datos
		 *  	{
		 *      	hoja {DOM object}: Tag style del head donde insertar los estilos
		 *      	selector {string}: id o class para insertar los estilos,
		 *      	estilos {string}: estilos a asociar al tag,
		 *      	index {Number}: ordinal para los estilos en la hoja (herencia css)
		 *      }
		 *
		 */
		addCSSRule:function(datos){
			// resto de navegadores
			if("insertRule" in datos.hoja) {
				datos.hoja.insertRule(datos.selector + "{" + datos.estilos + "}", datos.index);
			}
			// ie9-
			else if("addRule" in datos.hoja) {
				datos.hoja.addRule(datos.selector, datos.estilos, datos.index);
			}
		},
		/**
		 *  Aplica colores a la barra según los puntos de corte de la vista (responsive)
		 *
		 *  @method TMPL.aplicaMediaQueriesBarra
		 *
		 *  @param {dom object} hoja  : Hoja de estilos a insertar
		 */
		aplicaMediaQueriesBarra:function(hoja){
			if(opciones.DESARROLLO){
				if ("insertRule" in hoja) {   // all browsers, except IE before version 9
					// busca posicion final en la hoja para añadir las medi@
					var posicion_final=hoja.cssRules.length;
					$.each(opciones.RESPONSIVE,function(punto_corte,atributos){
						hoja.insertRule("@media screen and (max-width:"+punto_corte+"px){#datos_nav{"+atributos+"}}",posicion_final);
					});
				}
				else {  // Internet Explorer before version 9
					if ("addRule" in hoja) {
						gbs.soporte_mediaqueries=false;
					}
				}
			}
		},
		/**
		 *  Control de navegador retina
		 *
		 *  @method TMPL.controlRetina
		 *
		 *  @return {object} retorno:
		 *  	{
		 *  		{bool} isRetina
		 *  		{num} ratio : Ratio retina (DPR) del navegador
		 *		}
		 *
		 *  @details Aplica al tag un campo data isRetina con valor booleano
		 */
		controlRetina:function(){
			var devicePixelRatio=window.devicePixelRatio;
			if (devicePixelRatio>1){
				gbs.datos_navegador.isRetina=true;
				gbs.datos_navegador.DPR=devicePixelRatio;
				opciones.TAG.data("retinaDPR",gbs.datos_navegador.DPR);
			}
			opciones.TAG.data("isRetina",gbs.datos_navegador.isRetina);
		},
		/**
		 *  Pinta datos en console si opciones.DESARROLLO y opciones.DEBUG son {bool}true
		 *
		 *  @method TMPL.pintaConsole
		 */
		pintaConsole:function(){
			if(opciones.DESARROLLO && opciones.DEBUG && typeof(console)!=="undefined"){
				console.log("*********************************************************");
				console.log("[PLUGIN DISCRIMINADOR INIT]*******************************");
				if(opciones.DESARROLLO){
					console.log("ATENCIÓN! ESTE PLUGIN ESTÁ ACTIVADO EN MODO DESARROLLO. REVISAR ESTA CONFIGURACIÓN SI ES NECESARIO EN PRODUCCIÓN.");
				}
				console.log("	[opciones.TAG]: ",opciones.TAG);
				console.log("	[TAG] clases: ",gbs.clases_a_pintar);
				console.log("	[TAG] data: ",opciones.TAG.data());
				console.log("	[gbs] gbs.datos_navegador: ",gbs.datos_navegador);
				if(gbs.soporte_mediaqueries===false){
					console.log("[NAVEGADOR]: Este navegador no soporta media queries");
				}
				console.log("[PLUGIN DISCRIMINADOR END]*******************************");
				console.log("*********************************************************");
			}
		},
		/**
		 *  Pinta datos del sistema operativo y aplica las clases necesarias
		 *
		 *  @method TMPL.pinta_sistema_operativo
		 */
		pinta_sistema_operativo:function(){
			var parser = new UAParser();
			var result = parser.getResult();
      result.os.name=result.os.name.toLowerCase();
      result.os.version=result.os.version.replace(".","_");
			gbs.datos_navegador.sistema_operativo=result.os
		}
	};
	INIT();
};
/*/DISCRIMINADOR */



/* NORMAL */
$( window ).on( "load",function(){ 		 
	var opciones = {
		DESARROLLO         : true,      	// Si false no se muestran los datos
		DEBUG			   : true,			// Si true y DESARROLLO=true, se muestran datos en console
		VISIBLE_INICIAL    : true,      	// Si false, la vista de la barra comienza en no visible, al pulsar esc se muestra
		TAG                : $("body"), 	// Tag donde cargar las clases discriminatorias
		RESPONSIVE : {
			"1200"         : "background-color:#FFFFFF!important;color:#000000!important;", // blanco
			"991"          : "background-color:#FFFF00!important;color:#000000!important;", // amarillo
			"768"          : "background-color:#008000!important;color:#FFFFFF!important;", // verde
			"480"          : "background-color:#FF0000!important;color:#FFFFFF!important;", // rojo
			"320"          : "background-color:#FFA500!important;color:#000000!important;" // naranja
		},
    // hay una zona del desarrollo donde se puede obtener todos los datos recogidos por DISCRIMINADOR
    CON_PETICION : true,
    // puede lanzarse un evento cuando los datos se guardan en los data del body ("dsc:discriminador_end") (tambien en el resize)
    DSC_EVENTO   : {
      al_finalizar:{
        activo:true,
        nombre:"dsc:dsc_end"
      },
    }
	};
	DISCRIMINADOR(opciones);
});	



















	
 