import{c}from"./createLucideIcon-x0jF7PNH.js";import{r as t}from"./index-NihTSZ-_.js";import{s as n}from"./supabaseClient-BZu_YtKX.js";import{u}from"./useAuthUser-BV94pC_7.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],l=c("search",f);function h(){const e=u(),[o,r]=t.useState(void 0);return t.useEffect(()=>{if(e===void 0){r(void 0);return}if(!n||!e){r(!1);return}let i=!0;return n.from("profiles").select("vaitro").eq("id",e.id).single().then(({data:s})=>{i&&r((s==null?void 0:s.vaitro)==="admin")}),()=>{i=!1}},[e]),o}export{l as S,h as u};
