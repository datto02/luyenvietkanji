import{c}from"./arrow-left-BDYvdBfo.js";import{r as n}from"./index-CaeUf6xV.js";import{s}from"./supabaseClient-C2ey8YjU.js";import{a as u}from"./useBodyScrollLock-DR-ZB5p9.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],k=c("user-check",f);function y(){const e=u(),[a,r]=n.useState(void 0);return n.useEffect(()=>{if(e===void 0){r(void 0);return}if(!s||!e){r(!1);return}let t=!0;return r(void 0),s.rpc("la_tro_giang").then(({data:i,error:o})=>{t&&r(!o&&i===!0)}),()=>{t=!1}},[e==null?void 0:e.id,e===void 0]),a}export{k as U,y as u};
