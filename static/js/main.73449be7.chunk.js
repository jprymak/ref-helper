(this["webpackJsonpref-helper"]=this["webpackJsonpref-helper"]||[]).push([[0],{23:function(t,e,i){},25:function(t,e,i){},31:function(t,e,i){},32:function(t,e,i){},33:function(t,e,i){},34:function(t,e,i){"use strict";i.r(e);var c=i(1),a=i.n(c),n=i(16),s=i.n(n),o=(i(23),i(2)),y=i(6),r=i(7),d=i(3),l=i(10),u=i(0),v=[{id:0,page:"home",url:"/ref-helper/",icon:Object(u.jsx)(l.c,{className:"navbar__icon"})},{id:1,page:"fast calc",url:"/ref-helper/fast-calc",icon:Object(u.jsx)(l.a,{className:"navbar__icon"}),modes:[{id:"calc-1",name:"Select Pipe By Flow",info:["pipe","velocity","pressureDrop"],inputs:["flow","allowedPressureDrop","allowedVelocity"]},{id:"calc-2",name:"Select Pipe By Capacity",info:["pipe","flow","velocity","pressureDrop"],inputs:["capacity","delta","allowedPressureDrop","allowedVelocity"]},{id:"calc-3",name:"Calculate flow",info:["flow"],inputs:["capacity","delta"]}]},{id:2,page:"projects",url:"/ref-helper/projects",icon:Object(u.jsx)(l.b,{className:"navbar__icon"}),modes:[{id:"projects-1",name:"New project"},{id:"projects-2",name:"Browse Projects"}]}],p=a.a.createContext(),h=function(t){var e=t.children,i=Object(c.useState)(!1),a=Object(y.a)(i,2),n=a[0],s=a[1],o=Object(c.useState)(!1),r=Object(y.a)(o,2),d=r[0],l=r[1],h=Object(c.useState)({page:"",modes:[]}),j=Object(y.a)(h,2),m=j[0],b=j[1],C=Object(c.useState)({}),f=Object(y.a)(C,2),w=f[0],O=f[1];return Object(u.jsx)(p.Provider,{value:{isSidebarOpen:n,openSidebar:function(){s(!0)},closeSidebar:function(){s(!1)},isSubmenuOpen:d,openSubmenu:function(t,e){var i=v.find((function(e){return e.page===t}));i.modes&&(b(i),O(e),l(!0))},closeSubmenu:function(){l(!1)},page:m,location:w},children:e})},j=function(){return Object(c.useContext)(p)};i(25);function m(t){var e=t.onModeChange,i=j(),c=i.openSubmenu,a=i.closeSubmenu,n=Object(d.f)(),s=function(t){var e=t.target.closest("li"),i=e.textContent,a=e.getBoundingClientRect(),n=(a.left+a.right)/2,s=a.bottom;c(i,{center:n,bottom:s})};return Object(u.jsx)("nav",{className:"navbar",onMouseOver:function(t){t.target.closest(".navbar__list-item")||a()},children:Object(u.jsx)("ul",{className:"navbar__list",children:v.map((function(t){var i=t.id,c=t.page,a=t.icon,o=t.url,y=t.modes;return Object(u.jsx)("li",{className:"navbar__list-item ".concat(n.pathname===o?"navbar__list-item--active":""),onMouseOver:s,children:Object(u.jsxs)(r.b,{onClick:"home"!==c?function(){return e(y[0].id)}:function(){return e(null)},className:"navbar__link",to:o,children:[a,c]})},i)}))})})}function b(){var t=j().closeSubmenu;return Object(u.jsxs)("div",{onMouseOver:t,className:"Home",children:[Object(u.jsx)("h1",{className:"Home__heading",children:"Home"}),Object(u.jsx)("section",{children:"Welcome! My name is Jakub and I have created this app to help my fellow engineers in their daily tasks. I plan to add many interesting features in the future so stay tuned :)"})]})}function C(t){var e=j().closeSubmenu,i=t.name;return Object(u.jsx)("div",{onMouseOver:e,className:"mode",children:Object(u.jsx)("h1",{children:i})})}var f=i(9);i(31);function w(t){var e=t.inputs,i=t.onInputChange;return Object(u.jsx)("form",{onSubmit:function(t){return t.preventDefault()},className:"form",children:Object.keys(e).map((function(t){switch(t){case"flow":return Object(u.jsxs)(a.a.Fragment,{children:[Object(u.jsx)("label",{htmlFor:"flow-input",children:"Flow: "}),Object(u.jsx)("input",{onChange:i,name:"flow-input",type:"number",min:"0",value:e[t]}),Object(u.jsx)("span",{children:"m3/h"})]},t);case"allowedVelocity":return Object(u.jsxs)(a.a.Fragment,{children:[Object(u.jsxs)("label",{htmlFor:"allowed-velocity-input",children:["Allowed velocity (",e[t],"):"," "]}),Object(u.jsx)("input",{onChange:i,name:"allowed-velocity-input",value:e[t],type:"range",step:"0.1",min:"1",max:"3"}),Object(u.jsx)("span",{children:"m/s"})]},t);case"allowedPressureDrop":return Object(u.jsxs)(a.a.Fragment,{children:[Object(u.jsxs)("label",{htmlFor:"allowed-pressure-drop-input",children:["Allowed pressure drop (",e[t],"):"," "]}),Object(u.jsx)("input",{onChange:i,name:"allowed-pressure-drop-input",value:e[t],type:"range",step:"50",min:"100",max:"1000"}),Object(u.jsx)("span",{children:"Pa/m"})]},t);case"delta":return Object(u.jsxs)(a.a.Fragment,{children:[Object(u.jsxs)("label",{htmlFor:"delta-input",children:["Delta (",e[t],"):"," "]}),Object(u.jsx)("input",{onChange:i,name:"delta-input",type:"number",min:"0",max:"50",value:e[t]}),Object(u.jsx)("span",{children:"K"})]},t);case"capacity":return Object(u.jsxs)(a.a.Fragment,{children:[Object(u.jsx)("label",{htmlFor:"capacity-input",children:"Capacity: "}),Object(u.jsx)("input",{onChange:i,name:"capacity-input",type:"number",min:"0",value:e[t]}),Object(u.jsx)("span",{children:"kW"})]},t);default:return null}}))})}i(32);function O(t){var e=t.infoProps;return Object(u.jsx)("div",{className:"selection-info",children:Object.keys(e).map((function(t){switch(t){case"pipe":return Object(u.jsx)(a.a.Fragment,{children:Object(u.jsxs)("p",{className:"selection-info__item",children:[" Selected pipe: ",Object(u.jsxs)("strong",{children:["DN ",e[t]]})]})},t);case"flow":return Object(u.jsx)(a.a.Fragment,{children:Object(u.jsxs)("p",{className:"selection-info__item",children:[" Flow: ",e[t]," m3/h"]})},t);case"velocity":return Object(u.jsx)(a.a.Fragment,{children:Object(u.jsxs)("p",{className:"selection-info__item",children:[" Velocity: ",e[t]," m/s"]})},t);case"pressureDrop":return Object(u.jsx)(a.a.Fragment,{children:Object(u.jsxs)("p",{className:"selection-info__item",children:[" Pressure drop: ",e[t]," Pa/m"]})},t);default:return null}}))})}function x(t,e,i,c){return t/e/i/c*1e3}function D(t,e){return t/(3.14*Math.pow(e/2,2))/3600}function g(t,e,i,c){var a=function(t){return 18e-5/t}(t);return function(t,e){return Math.pow(1/(-2*Math.log10(6.1/Math.pow(t,.915)+.268*e)),2)}(function(t,e,i){return t*e/i}(i,t,c),a)/t*(e*Math.pow(i,2)/2)}function k(t,e){return t[e]}function F(t,e,i,c,a,n){for(var s=0,o=Object.keys(t);s<o.length;s++){var y=o[s],r=t[y].innerDiameter/1e3,d=D(e,r);if(g(r,c,d,i)<a&&d<n)return y}}var P={15:{externalDiameter:21.3,wallThickness:2,innerDiameter:17.3},20:{externalDiameter:26.9,wallThickness:2,innerDiameter:22.9},25:{externalDiameter:33.7,wallThickness:2,innerDiameter:29.7},32:{externalDiameter:42.4,wallThickness:2.3,innerDiameter:37.8},40:{externalDiameter:48.3,wallThickness:2.3,innerDiameter:43.7},50:{externalDiameter:60.3,wallThickness:2.3,innerDiameter:55.7},65:{externalDiameter:76.1,wallThickness:2.6,innerDiameter:70.9},80:{externalDiameter:88.9,wallThickness:2.9,innerDiameter:83.1},100:{externalDiameter:114.3,wallThickness:3.2,innerDiameter:107.9},125:{externalDiameter:139.7,wallThickness:3.6,innerDiameter:132.5},150:{externalDiameter:168.3,wallThickness:4,innerDiameter:160.3},200:{externalDiameter:219.1,wallThickness:4.5,innerDiameter:210.1},250:{externalDiameter:273,wallThickness:5,innerDiameter:263},300:{externalDiameter:323.9,wallThickness:5.6,innerDiameter:312.7},350:{externalDiameter:355.6,wallThickness:5.6,innerDiameter:344.4},400:{externalDiameter:406.4,wallThickness:6.3,innerDiameter:393.8},450:{externalDiameter:457,wallThickness:6.3,innerDiameter:444.4}},_={"-10":{density:998,heatCapacity:4.278,conductivity:.5424,viscosity:2.646},"-9":{density:998,heatCapacity:4.27,conductivity:.5442,viscosity:2.534},"-8":{density:999,heatCapacity:4.262,conductivity:.546,viscosity:2.43},"-7":{density:999,heatCapacity:4.255,conductivity:.5479,viscosity:2.332},"-6,":{density:999,heatCapacity:4.249,conductivity:.5497,viscosity:2.241},"-5":{density:999,heatCapacity:4.243,conductivity:.5516,viscosity:2.155},"-4":{density:999,heatCapacity:4.237,conductivity:.5534,viscosity:2.073},"-3":{density:1e3,heatCapacity:4.232,conductivity:.5553,viscosity:1.997},"-2":{density:1e3,heatCapacity:4.228,conductivity:.5572,viscosity:1.925},"-1":{density:1e3,heatCapacity:4.223,conductivity:.5591,viscosity:1.857},0:{density:1e3,heatCapacity:4.219,conductivity:.561,viscosity:1.793},1:{density:1e3,heatCapacity:4.216,conductivity:.5629,viscosity:1.732},2:{density:1e3,heatCapacity:4.212,conductivity:.5648,viscosity:1.675},3:{density:1e3,heatCapacity:4.209,conductivity:.5667,viscosity:1.62},4:{density:1e3,heatCapacity:4.206,conductivity:.5686,viscosity:1.568},5:{density:1e3,heatCapacity:4.203,conductivity:.5705,viscosity:1.519},6:{density:1e3,heatCapacity:4.201,conductivity:.5724,viscosity:1.472},7:{density:1e3,heatCapacity:4.199,conductivity:.5743,viscosity:1.428},8:{density:1e3,heatCapacity:4.197,conductivity:.5762,viscosity:1.386},9:{density:1e3,heatCapacity:4.195,conductivity:.5781,viscosity:1.345},10:{density:1e3,heatCapacity:4.193,conductivity:.58,viscosity:1.307},11:{density:1e3,heatCapacity:4.191,conductivity:.5819,viscosity:1.27},12:{density:999,heatCapacity:4.19,conductivity:.5837,viscosity:1.235},13:{density:999,heatCapacity:4.189,conductivity:.5856,viscosity:1.201},14:{density:999,heatCapacity:4.188,conductivity:.5875,viscosity:1.169},15:{density:999,heatCapacity:4.186,conductivity:.5893,viscosity:1.138},16:{density:999,heatCapacity:4.185,conductivity:.5912,viscosity:1.109},17:{density:999,heatCapacity:4.184,conductivity:.593,viscosity:1.081},18:{density:999,heatCapacity:4.184,conductivity:.5948,viscosity:1.054},19:{density:998,heatCapacity:4.183,conductivity:.5966,viscosity:1.027},20:{density:998,heatCapacity:4.182,conductivity:.5984,viscosity:1.002},21:{density:998,heatCapacity:4.182,conductivity:.6002,viscosity:.978},22:{density:998,heatCapacity:4.181,conductivity:.6019,viscosity:.955},23:{density:998,heatCapacity:4.181,conductivity:.6037,viscosity:.933},24:{density:997,heatCapacity:4.18,conductivity:.6054,viscosity:.912},25:{density:997,heatCapacity:4.18,conductivity:.6071,viscosity:.891},26:{density:997,heatCapacity:4.18,conductivity:.6088,viscosity:.871},27:{density:997,heatCapacity:4.179,conductivity:.6105,viscosity:.852},28:{density:996,heatCapacity:4.179,conductivity:.6122,viscosity:.833},29:{density:996,heatCapacity:4.179,conductivity:.6138,viscosity:.815},30:{density:996,heatCapacity:4.179,conductivity:.6154,viscosity:.798},31:{density:995,heatCapacity:4.178,conductivity:.617,viscosity:.781},32:{density:995,heatCapacity:4.178,conductivity:.6186,viscosity:.765},33:{density:995,heatCapacity:4.178,conductivity:.6202,viscosity:.75},34:{density:994,heatCapacity:4.178,conductivity:.6217,viscosity:.735},35:{density:994,heatCapacity:4.178,conductivity:.6233,viscosity:.72},36:{density:994,heatCapacity:4.178,conductivity:.6248,viscosity:.706},37:{density:993,heatCapacity:4.178,conductivity:.6263,viscosity:.692},38:{density:993,heatCapacity:4.178,conductivity:.6277,viscosity:.679},39:{density:993,heatCapacity:4.178,conductivity:.6292,viscosity:.666},40:{density:992,heatCapacity:4.179,conductivity:.6306,viscosity:.654},41:{density:992,heatCapacity:4.179,conductivity:.632,viscosity:.641},42:{density:991,heatCapacity:4.179,conductivity:.6334,viscosity:.63},43:{density:991,heatCapacity:4.179,conductivity:.6347,viscosity:.618},44:{density:991,heatCapacity:4.179,conductivity:.6361,viscosity:.607},45:{density:990,heatCapacity:4.18,conductivity:.6374,viscosity:.597},46:{density:990,heatCapacity:4.18,conductivity:.6386,viscosity:.586},47:{density:989,heatCapacity:4.18,conductivity:.6399,viscosity:.576},48:{density:989,heatCapacity:4.18,conductivity:.6412,viscosity:.566},49:{density:989,heatCapacity:4.181,conductivity:.6424,viscosity:.557},50:{density:988,heatCapacity:4.181,conductivity:.6436,viscosity:.547},51:{density:988,heatCapacity:4.181,conductivity:.6448,viscosity:.538},52:{density:987,heatCapacity:4.182,conductivity:.6459,viscosity:.529},53:{density:987,heatCapacity:4.182,conductivity:.647,viscosity:.521},54:{density:986,heatCapacity:4.182,conductivity:.6482,viscosity:.512},55:{density:986,heatCapacity:4.183,conductivity:.6492,viscosity:.504},56:{density:985,heatCapacity:4.183,conductivity:.6503,viscosity:.496},57:{density:985,heatCapacity:4.184,conductivity:.6514,viscosity:.489},58:{density:984,heatCapacity:4.184,conductivity:.6524,viscosity:.481},59:{density:984,heatCapacity:4.185,conductivity:.6534,viscosity:.474},60:{density:983,heatCapacity:4.185,conductivity:.6544,viscosity:.467},61:{density:983,heatCapacity:4.186,conductivity:.6553,viscosity:.46},62:{density:982,heatCapacity:4.186,conductivity:.6563,viscosity:.453},63:{density:982,heatCapacity:4.187,conductivity:.6572,viscosity:.446},64:{density:981,heatCapacity:4.188,conductivity:.6581,viscosity:.44},65:{density:981,heatCapacity:4.188,conductivity:.659,viscosity:.434},66:{density:980,heatCapacity:4.189,conductivity:.6598,viscosity:.427},67:{density:979,heatCapacity:4.19,conductivity:.6607,viscosity:.421},68:{density:979,heatCapacity:4.19,conductivity:.6615,viscosity:.416},69:{density:978,heatCapacity:4.191,conductivity:.6623,viscosity:.41},70:{density:978,heatCapacity:4.192,conductivity:.6631,viscosity:.404},71:{density:977,heatCapacity:4.192,conductivity:.6638,viscosity:.399},72:{density:977,heatCapacity:4.193,conductivity:.6646,viscosity:.393},73:{density:976,heatCapacity:4.194,conductivity:.6653,viscosity:.388},74:{density:975,heatCapacity:4.194,conductivity:.666,viscosity:.383},75:{density:975,heatCapacity:4.195,conductivity:.6667,viscosity:.378},76:{density:974,heatCapacity:4.196,conductivity:.6674,viscosity:.373},77:{density:974,heatCapacity:4.197,conductivity:.6681,viscosity:.368},78:{density:973,heatCapacity:4.197,conductivity:.6687,viscosity:.364},79:{density:972,heatCapacity:4.198,conductivity:.6693,viscosity:.359},80:{density:972,heatCapacity:4.199,conductivity:.67,viscosity:.355},81:{density:971,heatCapacity:4.2,conductivity:.6706,viscosity:.35},82:{density:971,heatCapacity:4.2,conductivity:.6711,viscosity:.346},83:{density:970,heatCapacity:4.201,conductivity:.6717,viscosity:.342},84:{density:969,heatCapacity:4.202,conductivity:.6722,viscosity:.338},85:{density:969,heatCapacity:4.203,conductivity:.6728,viscosity:.334},86:{density:968,heatCapacity:4.204,conductivity:.6733,viscosity:.33},87:{density:967,heatCapacity:4.205,conductivity:.6738,viscosity:.326},88:{density:967,heatCapacity:4.206,conductivity:.6743,viscosity:.322},89:{density:966,heatCapacity:4.206,conductivity:.6748,viscosity:.318},90:{density:965,heatCapacity:4.207,conductivity:.6752,viscosity:.315},91:{density:965,heatCapacity:4.208,conductivity:.6757,viscosity:.311},92:{density:964,heatCapacity:4.209,conductivity:.6761,viscosity:.308},93:{density:963,heatCapacity:4.21,conductivity:.6765,viscosity:.304},94:{density:963,heatCapacity:4.211,conductivity:.6769,viscosity:.301},95:{density:962,heatCapacity:4.212,conductivity:.6773,viscosity:.298},96:{density:961,heatCapacity:4.214,conductivity:.6777,viscosity:.294},97:{density:961,heatCapacity:4.215,conductivity:.678,viscosity:.291},98:{density:960,heatCapacity:4.216,conductivity:.6783,viscosity:.288},99:{density:959,heatCapacity:4.217,conductivity:.6787,viscosity:.285},100:{density:958,heatCapacity:4.216,conductivity:.679,viscosity:.282},101:{density:958,heatCapacity:4.217,conductivity:.6793,viscosity:.279},102:{density:957,heatCapacity:4.218,conductivity:.6796,viscosity:.276},103:{density:956,heatCapacity:4.219,conductivity:.6799,viscosity:.274},104:{density:956,heatCapacity:4.22,conductivity:.6802,viscosity:.271},105:{density:955,heatCapacity:4.221,conductivity:.6805,viscosity:.268},106:{density:954,heatCapacity:4.223,conductivity:.6807,viscosity:.266},107:{density:953,heatCapacity:4.224,conductivity:.681,viscosity:.263},108:{density:953,heatCapacity:4.225,conductivity:.6812,viscosity:.261},109:{density:952,heatCapacity:4.226,conductivity:.6815,viscosity:.258},110:{density:951,heatCapacity:4.227,conductivity:.6817,viscosity:.256},111:{density:951,heatCapacity:4.229,conductivity:.6819,viscosity:.254},112:{density:950,heatCapacity:4.23,conductivity:.6821,viscosity:.251},113:{density:949,heatCapacity:4.231,conductivity:.6823,viscosity:.249},114:{density:948,heatCapacity:4.233,conductivity:.6825,viscosity:.247},115:{density:948,heatCapacity:4.234,conductivity:.6827,viscosity:.244},116:{density:947,heatCapacity:4.236,conductivity:.6829,viscosity:.242},117:{density:946,heatCapacity:4.237,conductivity:.683,viscosity:.24},118:{density:945,heatCapacity:4.239,conductivity:.6832,viscosity:.238},119:{density:944,heatCapacity:4.24,conductivity:.6833,viscosity:.236},120:{density:944,heatCapacity:4.242,conductivity:.6835,viscosity:.234},121:{density:943,heatCapacity:4.244,conductivity:.6836,viscosity:.232}},S=function(t,e){var i=t.temperature,c=k(_,i).viscosity,a=k(_,i).density,n=c/1e3/a;switch(e.type){case"setStateToInitial":return Object(o.a)({},e.payload);case"setFlow":var s=e.flow>1e3?1e3:e.flow,y=F(P,s,n,a,t.allowedPressureDrop,t.allowedVelocity);if(void 0===y)return Object(o.a)(Object(o.a)({},t),{},{flow:s,pipe:"",velocity:"",pressureDrop:""});var r=D(s,P[y].innerDiameter/1e3).toFixed(2),d=g(P[y].innerDiameter/1e3,a,r,n).toFixed(0);return Object(o.a)(Object(o.a)({},t),{},{flow:s,pipe:y,velocity:r,pressureDrop:d});case"setCapacity":var l=(3.6*x(e.capacity,t.delta,a,4.19)).toFixed(1),u=F(P,l,n,a,t.allowedPressureDrop,t.allowedVelocity);if(void 0===u)return Object(o.a)(Object(o.a)({},t),{},{flow:"",pipe:"",velocity:"",pressureDrop:""});var v=D(l,P[u].innerDiameter/1e3).toFixed(2),p=g(P[u].innerDiameter/1e3,a,v,n).toFixed(0);return Object(o.a)(Object(o.a)({},t),{},{capacity:e.capacity,flow:l,pipe:u,velocity:v,pressureDrop:p});case"setDelta":var h=e.delta>=50?50:e.delta,j=(3.6*x(t.capacity,h,a,4.19)).toFixed(1),m=F(P,j,n,a,t.allowedPressureDrop,t.allowedVelocity);if(void 0===m)return Object(o.a)(Object(o.a)({},t),{},{flow:"",pipe:"",velocity:"",pressureDrop:"",delta:h});var b=D(j,P[m].innerDiameter/1e3).toFixed(2),C=g(P[m].innerDiameter/1e3,a,b,n).toFixed(0);return Object(o.a)(Object(o.a)({},t),{},{delta:h,flow:j,pipe:m,velocity:b,pressureDrop:C});case"setPipe":var f=F(P,t.flow,n,a,t.allowedPressureDrop,t.allowedVelocity),w=D(t.flow,P[f].innerDiameter/1e3).toFixed(2),O=g(P[f].innerDiameter/1e3,a,w,n).toFixed(0);return Object(o.a)(Object(o.a)({},t),{},{pipe:f,velocity:w,pressureDrop:O});case"setAllowedPressureDrop":var S=F(P,t.flow,n,a,e.allowedPressureDrop,t.allowedVelocity);if(void 0===S)return Object(o.a)(Object(o.a)({},t),{},{pipe:"",velocity:"",pressureDrop:"",allowedPressureDrop:e.allowedPressureDrop});var N=D(t.flow,P[S].innerDiameter/1e3).toFixed(2),T=g(P[S].innerDiameter/1e3,a,N,n).toFixed(0);return Object(o.a)(Object(o.a)({},t),{},{pipe:S,allowedPressureDrop:e.allowedPressureDrop,velocity:N,pressureDrop:T});case"setAllowedVelocity":var M=F(P,t.flow,n,a,t.allowedPressureDrop,e.allowedVelocity);if(void 0===M)return Object(o.a)(Object(o.a)({},t),{},{pipe:"",velocity:"",pressureDrop:"",allowedVelocity:e.allowedVelocity});var V=D(t.flow,P[M].innerDiameter/1e3).toFixed(2),W=g(P[M].innerDiameter/1e3,a,V,n).toFixed(0);return Object(o.a)(Object(o.a)({},t),{},{pipe:M,allowedVelocity:e.allowedVelocity,velocity:V,pressureDrop:W});default:return Object(o.a)({},t)}},N=function(t){switch(t.target.name){case"capacity-input":return{type:"setCapacity",capacity:t.target.value};case"delta-input":return{type:"setDelta",delta:t.target.value};case"flow-input":return{type:"setFlow",flow:t.target.value};case"allowed-velocity-input":return{type:"setAllowedVelocity",allowedVelocity:t.target.value};case"allowed-pressure-drop-input":return{type:"setAllowedPressureDrop",allowedPressureDrop:t.target.value};default:return}},T={capacity:100,temperature:20,flow:10,velocity:null,pressureDrop:null,allowedPressureDrop:300,allowedVelocity:2,pipe:15,delta:4};function M(t){var e=t.info,i=t.inputs,a=j().closeSubmenu,n=Object(c.useReducer)(S,T),s=Object(y.a)(n,2),r=s[0],d=s[1];Object(c.useEffect)((function(){d({type:"setStateToInitial",payload:T}),d({type:"setPipe"})}),[e,i]);var l=function(t,e){return t.reduce((function(t,i){return Object(o.a)(Object(o.a)({},t),{},Object(f.a)({},i,e[i]))}),{})};return Object(u.jsxs)("div",{className:"mode",onMouseOver:a,children:[Object(u.jsx)(O,{infoProps:l(e,r)}),Object(u.jsx)(w,{onInputChange:function(t){d(N(t))},inputs:l(i,r)})]})}i(33);function V(t){var e=t.onModeChange,i=t.currentMode,a=j(),n=a.isSubmenuOpen,s=a.page,o=s.page,y=s.modes,d=s.url,l=a.location,v=Object(c.useRef)(null);return Object(c.useEffect)((function(){var t=v.current,e=l.center,i=l.bottom;t.style.left="".concat(e,"px"),t.style.top="".concat(i,"px")}),[o,l]),Object(u.jsxs)("aside",{className:n?"submenu show":"submenu",ref:v,children:[Object(u.jsx)("h3",{className:"submenu__heading",children:o}),Object(u.jsx)("div",{className:"sublinks",children:y.map((function(t){var c=t.id,a=t.name;return Object(u.jsx)(r.b,{className:"sublinks__sublink ".concat(i.id===c?"sublinks__sublink--active":""),onClick:function(){return e(c)},to:d,children:a},c)}))})]})}var W=function(){var t=Object(c.useState)(v[1].modes[0]),e=Object(y.a)(t,2),i=e[0],a=e[1],n=function(t){if(t){var e=t.split("-")[1];switch(t.split("-")[0]){case"calc":a(v[1].modes[e-1]);break;case"projects":a(v[2].modes[e-1]);break;default:return}}};return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(r.a,{children:[Object(u.jsx)(m,{onModeChange:n}),Object(u.jsxs)(d.c,{children:[Object(u.jsx)(d.a,{path:"/ref-helper/fast-calc",children:Object(u.jsx)(M,Object(o.a)({},i))}),Object(u.jsx)(d.a,{path:"/ref-helper/projects",children:Object(u.jsx)(C,Object(o.a)({},i))}),Object(u.jsx)(d.a,{path:"/ref-helper/",children:Object(u.jsx)(b,{})})]}),Object(u.jsx)(V,{onModeChange:n,currentMode:i})]})})},A=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function I(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var i=t.installing;null!=i&&(i.onstatechange=function(){"installed"===i.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}var B=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,35)).then((function(e){var i=e.getCLS,c=e.getFID,a=e.getFCP,n=e.getLCP,s=e.getTTFB;i(t),c(t),a(t),n(t),s(t)}))};s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(h,{children:Object(u.jsx)(W,{})})}),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/ref-helper",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/ref-helper","/service-worker.js");A?(!function(t,e){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(i){var c=i.headers.get("content-type");404===i.status||null!=c&&-1===c.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):I(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):I(e,t)}))}}(),B()}},[[34,1,2]]]);
//# sourceMappingURL=main.73449be7.chunk.js.map