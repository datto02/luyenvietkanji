import{r as n,s as u}from"./supabaseClient-9tPJHV2u.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),C=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,s)=>s?s.toUpperCase():r.toLowerCase()),i=t=>{const e=C(t);return e.charAt(0).toUpperCase()+e.slice(1)},l=(...t)=>t.filter((e,r,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===r).join(" ").trim(),w=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=n.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:a="",children:o,iconNode:p,...c},f)=>n.createElement("svg",{ref:f,...b,width:e,height:e,stroke:t,strokeWidth:s?Number(r)*24/Number(e):r,className:l("lucide",a),...!o&&!w(c)&&{"aria-hidden":"true"},...c},[...p.map(([h,d])=>n.createElement(h,d)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(t,e)=>{const r=n.forwardRef(({className:s,...a},o)=>n.createElement(g,{ref:o,iconNode:e,className:l(`lucide-${m(i(t))}`,`lucide-${t}`,s),...a}));return r.displayName=i(t),r};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],v=A("loader-circle",L);function x(){const[t,e]=n.useState(void 0);return n.useEffect(()=>{if(!u){e(null);return}let r=!0;u.auth.getUser().then(({data:a,error:o})=>{r&&e(!o&&(a!=null&&a.user)?a.user:null)});const{data:s}=u.auth.onAuthStateChange((a,o)=>{r&&e((o==null?void 0:o.user)??null)});return()=>{r=!1,s.subscription.unsubscribe()}},[]),t}export{v as L,A as c,x as u};
