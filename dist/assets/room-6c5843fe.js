import{g as u,f as s,A as r}from"./tour-c04c67b3.js";import{e as o}from"./index-51d7b655.js";const l=({id:e})=>{const a=async()=>(await r.get(`/api/room/${e}`)).data;return u({queryKey:["ROOM",e],queryFn:async()=>a(),enabled:e!=="null"})},p=({id:e})=>{const a=async()=>(await r.get(`/api/room/${e}/hotspots`)).data;return u({queryKey:["HOTSPOTS",e],queryFn:async()=>a(),enabled:e!=="null"})},q=()=>{const e=o();return s({mutationFn:async t=>{const n=new FormData;return n.append("tour_id",String(t.tour_id)),n.append("name",String(t.name)),n.append("image_url",String(t.image_url)),(await r.post("/api/room",n)).data},onSuccess:()=>e.invalidateQueries(["ROOMS"])})},y=()=>{const e=o();return s({mutationFn:async({room_id:t,payload:n})=>(await r.post(`/api/room/${t}`,n)).data,onSuccess:()=>e.invalidateQueries(["ROOMS"])})},S=()=>{const e=o();return s({mutationFn:async({room_id:t})=>(await r.delete(`/api/room/${t}`)).data,onSuccess:()=>e.invalidateQueries(["ROOMS"])})};export{p as a,y as b,S as c,l as d,q as u};
