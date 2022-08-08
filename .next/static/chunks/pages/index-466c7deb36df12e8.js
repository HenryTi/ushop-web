(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9361:function(a,b){"use strict";b.Z=function(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}},1752:function(a,b,c){a.exports=c(8027)},8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(5075)}])},909:function(a,b,c){"use strict";var d=c(5893),e=c(7441),f=c(1664),g=c.n(f),h=c(1163),i=c(7294);b.Z=function(){var a=(0,h.useRouter)(),b=(0,i.useState)(void 0),c=b[0],f=b[1];if((0,i.useEffect)(function(){e.W.load(),f(e.W.user)},[]),!c)return(0,d.jsx)(g(),{href:"/auth/login?backurl="+a.route,children:(0,d.jsx)("a",{className:"btn btn-link",children:"login"})});var j=c.user;return(0,d.jsx)(g(),{href:"/auth/user",children:j})}},7441:function(a,b,c){"use strict";c.d(b,{W:function(){return u}});var d=c(7568),e=c(1438),f=c(4051),g=c.n(f),h=c(6042),i=c(1752),j=(0,i.default)().publicRuntimeConfig,k={get:function(a){return n.apply(this,arguments)},post:function(a,b){return o.apply(this,arguments)},put:function(a,b){return p.apply(this,arguments)},delete:function(a){return q.apply(this,arguments)}};function l(a,b){return m.apply(this,arguments)}function m(){return(m=(0,d.Z)(g().mark(function a(b,c){var d;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch(b,c);case 2:return d=a.sent,a.next=5,s(d);case 5:return a.abrupt("return",a.sent);case 6:case"end":return a.stop()}},a)}))).apply(this,arguments)}function n(){return(n=(0,d.Z)(g().mark(function a(b){var c;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c={method:"GET",headers:r(b)},a.next=3,l(b,c);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop()}},a)}))).apply(this,arguments)}function o(){return(o=(0,d.Z)(g().mark(function a(b,c){var d;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d={method:"POST",headers:(0,h.Z)({"Content-Type":"application/json"},r(b)),credentials:"include",body:JSON.stringify(c)},a.next=3,l(b,d);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop()}},a)}))).apply(this,arguments)}function p(){return(p=(0,d.Z)(g().mark(function a(b,c){var d;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d={method:"PUT",headers:(0,h.Z)({"Content-Type":"application/json"},r(b)),body:JSON.stringify(c)},a.next=3,l(b,d);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop()}},a)}))).apply(this,arguments)}function q(){return(q=(0,d.Z)(g().mark(function a(b){var c;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c={method:"DELETE",headers:r(b)},a.next=3,l(b,c);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop()}},a)}))).apply(this,arguments)}function r(a){var b=u.user,c=b&&b.token,d=a.startsWith(j.apiUrl);return c&&d?{Authorization:"Bearer ".concat(b.token)}:{}}function s(a){return t.apply(this,arguments)}function t(){return(t=(0,d.Z)(g().mark(function a(b){var c,d,e;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,b.text();case 2:if(d=(c=a.sent)&&JSON.parse(c),b.ok){a.next=8;break}return[401,403].includes(b.status)&&u.user&&u.logout(),e=d&&d.message||b.statusText,a.abrupt("return",Promise.reject(e));case 8:return a.abrupt("return",d);case 9:case"end":return a.stop()}},a)}))).apply(this,arguments)}var u=new(function(){function a(){(0,e.Z)(this,a)}var b=a.prototype;return b.load=function(){var a=localStorage.getItem("user");if(null===a?a=void 0:"object"==typeof a&&(a=void 0,localStorage.removeItem("user")),a){var b=localStorage.getItem("token");"string"!=typeof b&&(b=void 0),this.user={user:a,token:b},this.setCookie()}},b.setCookie=function(){if(void 0!==document){if(this.user){var a=this.user,b=(a.user,a.token);document.cookie="token=".concat(b,";path=/")}else document.cookie="token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/"}},b.login=function(a,b){var c=this;return(0,d.Z)(g().mark(function d(){var e,f,h;return g().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,k.post("/api/auth/login",{username:a,password:b});case 2:return e=d.sent,c.user=e,f=e.name,h=e.token,f&&(c.setCookie(),localStorage.setItem("user",f),localStorage.setItem("token",h)),d.abrupt("return",c.user);case 7:case"end":return d.stop()}},d)}))()},b.logout=function(){var a=this;return(0,d.Z)(g().mark(function b(){return g().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:localStorage.removeItem("user"),a.user=void 0,a.setCookie();case 3:case"end":return b.stop()}},b)}))()},a}())},8045:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d,e=c(9361).Z,f=c(4941).Z,g=c(3929).Z;Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a){var b,c,d=a.src,m=a.sizes,o=a.unoptimized,q=void 0!==o&&o,v=a.priority,B=void 0!==v&&v,D=a.loading,E=a.lazyRoot,F=void 0===E?null:E,G=a.lazyBoundary,H=a.className,I=a.quality,J=a.width,K=a.height,L=a.style,M=a.objectFit,N=a.objectPosition,O=a.onLoadingComplete,P=a.placeholder,Q=void 0===P?"empty":P,R=a.blurDataURL,S=p(a,["src","sizes","unoptimized","priority","loading","lazyRoot","lazyBoundary","className","quality","width","height","style","objectFit","objectPosition","onLoadingComplete","placeholder","blurDataURL"]),T=h.useContext(l.ImageConfigContext),U=h.useMemo(function(){var a=s||T||j.imageConfigDefault,b=g(a.deviceSizes).concat(g(a.imageSizes)).sort(function(a,b){return a-b}),c=a.deviceSizes.sort(function(a,b){return a-b});return n({},a,{allSizes:b,deviceSizes:c})},[T]),V=S,W=m?"responsive":"intrinsic";"layout"in V&&(V.layout&&(W=V.layout),delete V.layout);var X=A;if("loader"in V){if(V.loader){var Y,Z=V.loader;X=function(a){a.config;var b=p(a,["config"]);return Z(b)}}delete V.loader}var $="";if(x(d)){var _=w(d)?d.default:d;if(!_.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(_)));if(R=R||_.blurDataURL,$=_.src,(!W||"fill"!==W)&&(K=K||_.height,J=J||_.width,!_.height||!_.width))throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(_)))}d="string"==typeof d?d:$;var aa=!B&&("lazy"===D|| void 0===D);(d.startsWith("data:")||d.startsWith("blob:"))&&(q=!0,aa=!1),t.has(d)&&(aa=!1),r&&(q=!0);var ab=f(h.useState(!1),2),ac=ab[0],ad=ab[1],ae=f(k.useIntersection({rootRef:F,rootMargin:G||"200px",disabled:!aa}),3),af=ae[0],ag=ae[1],ah=ae[2],ai=!aa||ag,aj={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},ak={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},al=!1,am=z(J),an=z(K),ao=z(I),ap=Object.assign({},L,{position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:M,objectPosition:N}),aq="blur"!==Q||ac?{}:{backgroundSize:M||"cover",backgroundPosition:N||"0% 0%",filter:"blur(20px)",backgroundImage:'url("'.concat(R,'")')};if("fill"===W)aj.display="block",aj.position="absolute",aj.top=0,aj.left=0,aj.bottom=0,aj.right=0;else if(void 0!==am&& void 0!==an){var ar=an/am,as=isNaN(ar)?"100%":"".concat(100*ar,"%");"responsive"===W?(aj.display="block",aj.position="relative",al=!0,ak.paddingTop=as):"intrinsic"===W?(aj.display="inline-block",aj.position="relative",aj.maxWidth="100%",al=!0,ak.maxWidth="100%",b="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27".concat(am,"%27%20height=%27").concat(an,"%27/%3e")):"fixed"===W&&(aj.display="inline-block",aj.position="relative",aj.width=am,aj.height=an)}var at={src:u,srcSet:void 0,sizes:void 0};ai&&(at=y({config:U,src:d,unoptimized:q,layout:W,width:am,quality:ao,sizes:m,loader:X}));var au=d,av="imagesrcset",aw="imagesizes";aw="imageSizes";var ax=(e(c={},"imageSrcSet",at.srcSet),e(c,aw,at.sizes),c),ay=h.default.useLayoutEffect,az=h.useRef(O),aA=h.useRef(d);h.useEffect(function(){az.current=O},[O]),ay(function(){aA.current!==d&&(ah(),aA.current=d)},[ah,d]);var aB=n({isLazy:aa,imgAttributes:at,heightInt:an,widthInt:am,qualityInt:ao,layout:W,className:H,imgStyle:ap,blurStyle:aq,loading:D,config:U,unoptimized:q,placeholder:Q,loader:X,srcString:au,onLoadingCompleteRef:az,setBlurComplete:ad,setIntersection:af,isVisible:ai,noscriptSizes:m},V);return h.default.createElement(h.default.Fragment,null,h.default.createElement("span",{style:aj},al?h.default.createElement("span",{style:ak},b?h.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:b}):null):null,h.default.createElement(C,Object.assign({},aB))),B?h.default.createElement(i.default,null,h.default.createElement("link",Object.assign({key:"__nimg-"+at.src+at.srcSet+at.sizes,rel:"preload",as:"image",href:at.srcSet?void 0:at.src},ax))):null)};var h=function(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=o();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}(c(7294)),i=(d=c(5443),d&&d.__esModule?d:{default:d}),j=c(9309),k=c(7190),l=c(9977);c(3794);var m=c(2392);function n(){return(n=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a}).apply(this,arguments)}function o(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return o=function(){return a},a}function p(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],b.indexOf(c)>=0||(e[c]=a[c]);return e}var q={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default"},r=(q.experimentalRemotePatterns,q.experimentalUnoptimized),s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default"},t=new Set,u="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",v=new Map([["default",function(a){var b=a.config,c=a.src,d=a.width,e=a.quality;return c.endsWith(".svg")&&!b.dangerouslyAllowSVG?c:"".concat(m.normalizePathTrailingSlash(b.path),"?url=").concat(encodeURIComponent(c),"&w=").concat(d,"&q=").concat(e||75)}],["imgix",function(a){var b=a.config,c=a.src,d=a.width,e=a.quality,f=new URL("".concat(b.path).concat(D(c))),g=f.searchParams;return g.set("auto",g.get("auto")||"format"),g.set("fit",g.get("fit")||"max"),g.set("w",g.get("w")||d.toString()),e&&g.set("q",e.toString()),f.href}],["cloudinary",function(a){var b=a.config,c=a.src,d=a.width,e=a.quality,f=["f_auto","c_limit","w_"+d,"q_"+(e||"auto")].join(",")+"/";return"".concat(b.path).concat(f).concat(D(c))}],["akamai",function(a){var b=a.config,c=a.src,d=a.width;return"".concat(b.path).concat(D(c),"?imwidth=").concat(d)}],["custom",function(a){var b=a.src;throw Error('Image with src "'.concat(b,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}],]);function w(a){return void 0!==a.default}function x(a){var b;return"object"==typeof a&&(w(a)|| void 0!==(b=a).src)}function y(a){var b=a.config,c=a.src,d=a.unoptimized,e=a.layout,f=a.width,h=a.quality,i=a.sizes,j=a.loader;if(d)return{src:c,srcSet:void 0,sizes:void 0};var k=function(a,b,c,d){var e=a.deviceSizes,f=a.allSizes;if(d&&("fill"===c||"responsive"===c)){for(var h=/(^|\s)(1?\d?\d)vw/g,i=[];j=h.exec(d);j)i.push(parseInt(j[2]));if(i.length){var j,k,l=.01*(k=Math).min.apply(k,g(i));return{widths:f.filter(function(a){return a>=e[0]*l}),kind:"w"}}return{widths:f,kind:"w"}}return"number"!=typeof b||"fill"===c||"responsive"===c?{widths:e,kind:"w"}:{widths:g(new Set([b,2*b].map(function(a){return f.find(function(b){return b>=a})||f[f.length-1]}))),kind:"x"}}(b,f,e,i),l=k.widths,m=k.kind,n=l.length-1;return{sizes:i||"w"!==m?i:"100vw",srcSet:l.map(function(a,d){return"".concat(j({config:b,src:c,quality:h,width:a})," ").concat("w"===m?a:d+1).concat(m)}).join(", "),src:j({config:b,src:c,quality:h,width:l[n]})}}function z(a){return"number"==typeof a?a:"string"==typeof a?parseInt(a,10):void 0}function A(a){var b,c=(null==(b=a.config)?void 0:b.loader)||"default",d=v.get(c);if(d)return d(a);throw Error('Unknown "loader" found in "next.config.js". Expected: '.concat(j.VALID_LOADERS.join(", "),". Received: ").concat(c))}function B(a,b,c,d,e,f){a&&a.src!==u&&a["data-loaded-src"]!==b&&(a["data-loaded-src"]=b,("decode"in a?a.decode():Promise.resolve()).catch(function(){}).then(function(){if(a.parentNode&&(t.add(b),"blur"===d&&f(!0),null==e?void 0:e.current)){var c=a.naturalWidth,g=a.naturalHeight;e.current({naturalWidth:c,naturalHeight:g})}}))}var C=function(a){var b=a.imgAttributes,c=(a.heightInt,a.widthInt),d=a.qualityInt,e=a.layout,f=a.className,g=a.imgStyle,i=a.blurStyle,j=a.isLazy,k=a.placeholder,l=a.loading,m=a.srcString,o=a.config,q=a.unoptimized,r=a.loader,s=a.onLoadingCompleteRef,t=a.setBlurComplete,u=a.setIntersection,v=a.onLoad,w=a.onError,x=(a.isVisible,a.noscriptSizes),z=p(a,["imgAttributes","heightInt","widthInt","qualityInt","layout","className","imgStyle","blurStyle","isLazy","placeholder","loading","srcString","config","unoptimized","loader","onLoadingCompleteRef","setBlurComplete","setIntersection","onLoad","onError","isVisible","noscriptSizes"]);return l=j?"lazy":l,h.default.createElement(h.default.Fragment,null,h.default.createElement("img",Object.assign({},z,b,{decoding:"async","data-nimg":e,className:f,style:n({},g,i),ref:h.useCallback(function(a){u(a),(null==a?void 0:a.complete)&&B(a,m,e,k,s,t)},[u,m,e,k,s,t,]),onLoad:function(a){B(a.currentTarget,m,e,k,s,t),v&&v(a)},onError:function(a){"blur"===k&&t(!0),w&&w(a)}})),(j||"blur"===k)&&h.default.createElement("noscript",null,h.default.createElement("img",Object.assign({},z,y({config:o,src:m,unoptimized:q,layout:e,width:c,quality:d,sizes:x,loader:r}),{decoding:"async","data-nimg":e,style:g,className:f,loading:l}))))};function D(a){return"/"===a[0]?a.slice(1):a}("function"==typeof b.default||"object"==typeof b.default&&null!==b.default)&& void 0===b.default.__esModule&&(Object.defineProperty(b.default,"__esModule",{value:!0}),Object.assign(b.default,b),a.exports=b.default)},5075:function(a,b,c){"use strict";c.r(b),c.d(b,{"__N_SSP":function(){return m}});var d=c(5893),e=c(909),f=c(9008),g=c.n(f),h=c(5675),i=c.n(h),j=c(214),k=c.n(j),l=function(a){var b=a.tokenUser;return(0,d.jsxs)("div",{className:k().container,children:[(0,d.jsxs)(g(),{children:[(0,d.jsx)("title",{children:"Create Next App"}),(0,d.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsx)(e.Z,{}),(0,d.jsxs)("span",{children:["token user: ",JSON.stringify(b)]}),(0,d.jsxs)("main",{className:k().main,children:[(0,d.jsxs)("h1",{className:k().title,children:["Welcome to ",(0,d.jsx)("a",{href:"https://nextjs.org",children:"Next.js!"})]}),(0,d.jsxs)("p",{className:k().description,children:["Get started by editing"," ",(0,d.jsx)("code",{className:k().code,children:"pages/index.tsx"})]}),(0,d.jsxs)("div",{className:k().grid,children:[(0,d.jsx)("a",{href:"auth/login",className:k().card,children:"login"}),(0,d.jsx)("a",{href:"p1/page1",className:k().card,children:"page1"}),(0,d.jsx)("a",{href:"p1/page2",className:k().card,children:"page2"}),(0,d.jsxs)("a",{href:"https://nextjs.org/docs",className:k().card,children:[(0,d.jsx)("h2",{children:"Documentation →"}),(0,d.jsx)("p",{children:"Find in-depth information about Next.js features and API."})]}),(0,d.jsxs)("a",{href:"https://nextjs.org/learn",className:k().card,children:[(0,d.jsx)("h2",{children:"Learn →"}),(0,d.jsx)("p",{children:"Learn about Next.js in an interactive course with quizzes!"})]}),(0,d.jsxs)("a",{href:"https://github.com/vercel/next.js/tree/canary/examples",className:k().card,children:[(0,d.jsx)("h2",{children:"Examples →"}),(0,d.jsx)("p",{children:"Discover and deploy boilerplate example Next.js projects."})]}),(0,d.jsxs)("a",{href:"https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:k().card,children:[(0,d.jsx)("h2",{children:"Deploy →"}),(0,d.jsx)("p",{children:"Instantly deploy your Next.js site to a public URL with Vercel."})]})]})]}),(0,d.jsx)("footer",{className:k().footer,children:(0,d.jsxs)("a",{href:"https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",children:["Powered by"," ",(0,d.jsx)("span",{className:k().logo,children:(0,d.jsx)(i(),{src:"/vercel.svg",alt:"Vercel Logo",width:72,height:16})})]})})]})},m=!0;b.default=l},214:function(a){a.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",title:"Home_title__T09hD",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}},5675:function(a,b,c){a.exports=c(8045)},1163:function(a,b,c){a.exports=c(387)},7568:function(a,b,c){"use strict";function d(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(j){c(j);return}h.done?b(i):Promise.resolve(i).then(d,e)}function e(a){return function(){var b=this,c=arguments;return new Promise(function(e,f){var g=a.apply(b,c);function h(a){d(g,e,f,h,i,"next",a)}function i(a){d(g,e,f,h,i,"throw",a)}h(void 0)})}}c.d(b,{Z:function(){return e}})},1438:function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw TypeError("Cannot call a class as a function")}c.d(b,{Z:function(){return d}})}},function(a){a.O(0,[664,774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])