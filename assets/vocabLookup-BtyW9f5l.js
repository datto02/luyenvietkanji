import{c as p}from"./createLucideIcon-x0jF7PNH.js";import{r}from"./index-NihTSZ-_.js";import{s as l}from"./supabaseClient-BZu_YtKX.js";import{u}from"./fetchData-CqIYHDvX.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],E=p("search",y);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],S=p("triangle-alert",A);function q(){const n=u(),[s,t]=r.useState(void 0);return r.useEffect(()=>{if(n===void 0){t(void 0);return}if(!l||!n){t(!1);return}let e=!0;return l.from("profiles").select("vaitro").eq("id",n.id).single().then(({data:a})=>{e&&t((a==null?void 0:a.vaitro)==="admin")}),()=>{e=!1}},[n]),s}const w=(n,s,t,e)=>{const a=(t==null?void 0:t[n])||{},h=n.split("").map(d=>{var f;return((f=e==null?void 0:e[d])==null?void 0:f.sound)||""}).filter(Boolean).join(" "),i={},c=((s==null?void 0:s.hanviet)||"").trim()||h,o=((s==null?void 0:s.reading)||"").trim()||a.reading||"",m=((s==null?void 0:s.meaning)||"").trim()||a.meaning||"";return c&&(i.hanviet=c),o&&(i.reading=o),m&&(i.meaning=m),i},B=(n,s)=>!!(s!=null&&s[n]);export{E as S,S as T,w as r,q as u,B as w};
