import{S as x,s as m,t as q,v,w as M,f as p,r as d,x as T,y as E,j as u,L as f,o as y,A as o}from"./index-58093d56.js";class O extends x{constructor(t,e){super(),this.client=t,this.setOptions(e),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var e;const n=this.options;this.options=this.client.defaultMutationOptions(t),m(n,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),(e=this.currentMutation)==null||e.setOptions(this.options)}onUnsubscribe(){if(!this.hasListeners()){var t;(t=this.currentMutation)==null||t.removeObserver(this)}}onMutationUpdate(t){this.updateResult();const e={listeners:!0};t.type==="success"?e.onSuccess=!0:t.type==="error"&&(e.onError=!0),this.notify(e)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(t,e){return this.mutateOptions=e,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:typeof t<"u"?t:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const t=this.currentMutation?this.currentMutation.state:q(),e={...t,isLoading:t.status==="loading",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset};this.currentResult=e}notify(t){v.batch(()=>{if(this.mutateOptions&&this.hasListeners()){if(t.onSuccess){var e,n,c,r;(e=(n=this.mutateOptions).onSuccess)==null||e.call(n,this.currentResult.data,this.currentResult.variables,this.currentResult.context),(c=(r=this.mutateOptions).onSettled)==null||c.call(r,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context)}else if(t.onError){var i,l,a,h;(i=(l=this.mutateOptions).onError)==null||i.call(l,this.currentResult.error,this.currentResult.variables,this.currentResult.context),(a=(h=this.mutateOptions).onSettled)==null||a.call(h,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}}t.listeners&&this.listeners.forEach(({listener:R})=>{R(this.currentResult)})})}}function b(s,t,e){const n=M(s,t,e),c=p({context:n.context}),[r]=d.useState(()=>new O(c,n));d.useEffect(()=>{r.setOptions(n)},[r,n]);const i=T(d.useCallback(a=>r.subscribe(v.batchCalls(a)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),l=d.useCallback((a,h)=>{r.mutate(a,h).catch(S)},[r]);if(i.error&&E(r.options.useErrorBoundary,[i.error]))throw i.error;return{...i,mutate:l,mutateAsync:i.mutate}}function S(){}const g=()=>u.jsx("header",{className:"bg-blue-600 sticky z-40 top-0 py-4",children:u.jsxs("nav",{className:"text-white mx-5 flex items-center gap-3",children:[u.jsx(f,{className:"text-lg tracking-wide",to:"/",children:"Gallery"}),u.jsx(f,{className:"text-lg tracking-wide",to:"/list-tour",children:"Tour"})]})}),C=({children:s})=>u.jsxs("div",{"aria-label":"root",children:[u.jsx(g,{}),u.jsx("main",{children:s})]}),U=({tour_id:s})=>{const t=async()=>(await o.get(`/api/tour/${s}`)).data;return y({queryKey:["TOUR"],queryFn:async()=>t()})},j=()=>{const s=async()=>(await o.get("/api/tours")).data;return y({queryKey:["TOURS"],queryFn:async()=>s()})},L=({id:s})=>{const t=async()=>(await o.get(`/api/tour/${s}/rooms`)).data;return y({queryKey:["ROOMS"],queryFn:async()=>t()})},G=()=>b({mutationFn:async t=>(await o.post("/api/tour",t)).data}),k=()=>{const s=p();return b({mutationFn:async e=>(await o.post(`/api/tour/${e.tour_id}`,e.payload)).data,onSuccess:()=>{s.invalidateQueries(["TOUR"]),s.invalidateQueries(["TOURS"])}})},F=()=>{const s=p();return b({mutationFn:async({tour_id:e})=>(await o.delete(`/api/tour/${e}`)).data,onSuccess:()=>s.invalidateQueries(["TOURS"])})};export{C as L,L as a,k as b,F as c,j as d,U as e,b as f,G as u};
