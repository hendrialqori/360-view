import{R as f,b,j as c}from"./index-ea34eb57.js";import{a as w,L as j}from"./tour-9d138c09.js";import{a as H}from"./room-3ade9bb0.js";import{P as m}from"./PannellumVideo-b8c8c28a.js";const L="";function E(){var t;const[d,s]=f.useState(null),{idTour:y}=b(),{data:e,status:r}=w({id:Number(y)});f.useEffect(()=>{e!=null&&e.data.length&&s(e==null?void 0:e.data[0].id)},[e==null?void 0:e.data]);const i=f.useMemo(()=>{const a=e==null?void 0:e.data[0],n=e==null?void 0:e.data.find(l=>l.id===d);return d?n:a},[d,e==null?void 0:e.data]),{data:u}=H({id:String(d)}),x=({room_id:a})=>()=>{a&&s(a)},g=(a,n)=>{console.log("this func re-render!",n),a.classList.add("custom-tooltip");const l=document.createElement("span");l.innerHTML=n.label,a.appendChild(l),l.style.width=l.scrollWidth-20+"px",l.style.marginLeft=-(l.scrollWidth-a.offsetWidth)/2+"px",l.style.marginTop=-l.scrollHeight-12+"px"};return c.jsx(j,{children:c.jsx(m,{title:i==null?void 0:i.name,width:"100%",height:"93vh",image:r==="success"?L+(i==null?void 0:i.image_url):"",autoLoad:!0,hfov:100,haov:360,vaov:180,pitch:(i==null?void 0:i.pitch)??0,yaw:(i==null?void 0:i.yaw)??0,children:(t=u==null?void 0:u.data)==null?void 0:t.map((a,n)=>a.type==="info"?c.jsx(m.Hotspot,{type:"info",pitch:a==null?void 0:a.pitch,yaw:a==null?void 0:a.yaw,text:a.text},n):c.jsx(m.Hotspot,{type:"custom",pitch:a==null?void 0:a.pitch,yaw:a==null?void 0:a.yaw,tooltip:(a==null?void 0:a.type)==="label"&&g,tooltipArg:{label:a==null?void 0:a.text},cssClass:(a==null?void 0:a.type)==="label"&&"label-custom-style",handleClick:x({room_id:Number(a.room_link_id)})},n))})})}export{E as default};
