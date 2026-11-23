import{c as r}from"./arrow-left-BPNUywEc.js";import{j as t}from"./index-WN3x_683.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}]],p=r("circle-minus",i);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]],h=r("refresh-ccw",x),d={N5:"text-emerald-600",N4:"text-sky-600",N3:"text-amber-600",N2:"text-orange-600",N1:"text-rose-600"},u=({level:e,title:s,count:n,unit:a="câu"})=>{const o=e&&s?String(s).replace(new RegExp(`^${e}\\s*[·・-]\\s*`,"i"),""):s;return t.jsxs("div",{className:"w-full rounded-3xl bg-blue-50/70 border border-blue-100 px-4 py-4 sm:py-5 text-center",children:[t.jsx("p",{className:"text-base sm:text-xl font-black text-zinc-800 leading-snug break-words whitespace-pre-line",children:o}),t.jsxs("div",{className:"mt-2.5 flex items-center justify-center gap-2",children:[e&&t.jsx("span",{className:`px-3 py-0.5 rounded-full bg-white text-sm font-black ${d[e]||"text-blue-600"}`,children:e}),t.jsxs("span",{className:"px-3 py-0.5 rounded-full bg-white text-sm font-bold text-zinc-500 tabular-nums",children:[n," ",a]})]})]})},c=e=>`luyende-furigana-${e?"n5n4":"n3n2n1"}`,y=e=>{try{const s=sessionStorage.getItem(c(e));if(s==="1"||s==="0")return s==="1"}catch{}return!!e},b=(e,s)=>{try{sessionStorage.setItem(c(e),s?"1":"0")}catch{}};export{p as C,u as E,h as R,y as r,b as w};
