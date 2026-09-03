import{c as i}from"./createLucideIcon-x0jF7PNH.js";import{r as c}from"./index-NihTSZ-_.js";import{s as n}from"./supabaseClient-BZu_YtKX.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],h=i("loader-circle",a);function m(){const[s,t]=c.useState(void 0);return c.useEffect(()=>{if(!n){t(null);return}let u=!0;n.auth.getUser().then(({data:e,error:r})=>{u&&t(!r&&(e!=null&&e.user)?e.user:null)});const{data:o}=n.auth.onAuthStateChange((e,r)=>{u&&t((r==null?void 0:r.user)??null)});return()=>{u=!1,o.subscription.unsubscribe()}},[]),s}export{h as L,m as u};
