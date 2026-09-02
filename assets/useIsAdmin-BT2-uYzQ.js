import{c as u,u as o}from"./useAuthUser-CwLjsp1K.js";import{r as n,s as t}from"./supabaseClient-9tPJHV2u.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],m=u("search",f);function l(){const e=o(),[c,s]=n.useState(void 0);return n.useEffect(()=>{if(e===void 0){s(void 0);return}if(!t||!e){s(!1);return}let i=!0;return t.from("profiles").select("vaitro").eq("id",e.id).single().then(({data:r})=>{i&&s((r==null?void 0:r.vaitro)==="admin")}),()=>{i=!1}},[e]),c}export{m as S,l as u};
