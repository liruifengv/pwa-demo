(function(e){function t(t){for(var o,i,c=t[0],s=t[1],u=t[2],d=0,f=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var s=n[i];0!==r[s]&&(o=!1)}o&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={app:0},a=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"f6436e5f"}[e]+".js"}function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var a,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=i(e);var u=new Error;a=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",u.name="ChunkLoadError",u.type=o,u.request=a,n[1](u)}r[e]=void 0}};var d=setTimeout((function(){a({type:"timeout",target:s})}),12e4);s.onerror=s.onload=a,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("扫一扫")]),e._v(" | "),n("router-link",{attrs:{to:"/qrcode"}},[e._v("qrcode")]),e._v(" | "),n("router-link",{attrs:{to:"/Home"}},[e._v("生成二维码")])],1),n("router-view")],1)},a=[],i={name:"APP",data:function(){return{}},components:{},mounted:function(){window.addEventListener("beforeinstallprompt",(function(e){e.userChoice.then((function(e){"accept"===e.outcome?console.log("用户同意安装"):console.log("用户取消安装")}))}))},methods:{}},c=i,s=(n("5c0b"),n("2877")),u=Object(s["a"])(c,r,a,!1,null,null,null),d=u.exports,l=(n("d3b7"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("button",{on:{click:e.sao}},[e._v("扫一扫")]),n("div",{attrs:{id:"qrcode"}}),n("video",{ref:"video",staticStyle:{width:"480px",height:"320px"},attrs:{id:"video",autoplay:""}}),n("canvas",{ref:"canvas",attrs:{id:"canvas",width:"480",height:"320"}})])},v=[],p=(n("b0c0"),n("3ca3"),n("ddb0"),n("2b3d"),n("d044")),h=n.n(p),m={name:"sao",data:function(){return{qrcode:null}},components:{},mounted:function(){this.qrcode=new h.a(document.getElementById("qrcode"),{width:100,height:100})},methods:{sao:function(){navigator.mediaDevices.getUserMedia||navigator.getUserMedia||navigator.mozGetUserMedia||navigator.webkitGetUserMedia?this.getUserMedia({video:{width:480,height:320}},this.success,this.error):console.log("you bower id not getUserMedia")},getUserMedia:function(e,t,n){navigator.mediaDevices.getUserMedia?navigator.mediaDevices.getUserMedia(e).then(t).catch(n):navigator.webkitGetUserMedia?navigator.webkitGetUserMedia(e,t.error):navigator.mozGetUserMedia?navigator.mozkitGetUserMedia(e,t.error):navigator.getUserMedia&&navigator.getUserMedia(e,t,n)},success:function(e){var t=this,n=window.URL||window.webkitURL;this.$resf.video.src=n.createObjectURL(e),this.$resf.video.play(),setTimeout((function(){t.screenShot()}),2e3)},error:function(e){console.log(e.name,e.message)},screenShot:function(){var e=this.$resf.canvas,t=this.$resf.video,n=e[0].getContext("2d");n.drawImage(t[0],0,0,480,320);var o=e[0].toDataURL("images/png");this.decodeQrcode(o)},decodeQrcode:function(e){var t=this;this.qrcode.decode(e),this.qrcode.callback=function(e){t.visible&&("error decoding QR Code"===e?setTimeout((function(){t.screenShot()}),2e3):(alert(e),window.location.href=e))}}}},g=m,b=Object(s["a"])(g,f,v,!1,null,null,null),w=b.exports;o["a"].use(l["a"]);var y=[{path:"/",name:"Home",component:w},{path:"/qrcode",name:"qrcode",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/sao",name:"sao",component:function(){return n.e("about").then(n.bind(null,"f30c"))}}],M=new l["a"]({mode:"history",routes:y}),U=M,_=n("2f62");o["a"].use(_["a"]);var k=new _["a"].Store({state:{},mutations:{},actions:{},modules:{}}),j=n("3a34"),O=n.n(j);o["a"].config.productionTip=!1;var q=new O.a;new o["a"]({router:U,store:k,render:function(e){return e(d)}}).$mount("#app");t["default"]=q},"5c0b":function(e,t,n){"use strict";var o=n("9c0c"),r=n.n(o);r.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.2a5e5136.js.map