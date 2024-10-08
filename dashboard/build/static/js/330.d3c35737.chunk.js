"use strict";(self.webpackChunkapiaries_16_dashboard=self.webpackChunkapiaries_16_dashboard||[]).push([[330],{74996:(e,i,r)=>{r.d(i,{A:()=>n});r(58294);const n=r.p+"static/media/logo-asana.5c9ced4f9006cfb2d4c10f905cf6d310.svg"},3186:(e,i,r)=>{r.d(i,{A:()=>d});var n=r(58294),t=r(49052),o=r.n(t),s=r(88015);const a=(0,r(64319).Ay)(s.A)((e=>{let{theme:i,ownerState:r}=e;const{palette:n,typography:t,borders:o,functions:s}=i,{color:a,circular:c,border:l,size:d,indicator:p,variant:m,container:h,children:u}=r,{white:g,dark:x,gradients:v,badgeColors:f}=n,{size:A,fontWeightBold:j}=t,{borderRadius:b,borderWidth:y}=o,{pxToRem:_,linearGradient:w}=s,P={xs:"0.45em 0.775em",sm:"0.55em 0.9em",md:"0.65em 1em",lg:"0.85em 1.375em"},S="xs"===d?A.xxs:A.xs,k=l?`${y[3]} solid ${g.main}`:"none",z=c?b.section:b.md;return{"& .MuiBadge-badge":{height:"auto",padding:P[d]||P.xs,fontSize:S,fontWeight:j,textTransform:"uppercase",lineHeight:1,textAlign:"center",whiteSpace:"nowrap",verticalAlign:"baseline",border:k,borderRadius:z,...p&&(e=>{let i=_(20),r=_(20);return"medium"===e?(i=_(24),r=_(24)):"large"===e&&(i=_(32),r=_(32)),{width:i,height:r,display:"grid",placeItems:"center",textAlign:"center",borderRadius:"50%",padding:0,border:k}})(d),..."gradient"===m&&(H=a,{background:v[H]?w(v[H].main,v[H].state):w(v.info.main,v.info.state),color:"light"===H?x.main:g.main}),..."contained"===m&&(e=>{const i=f[e]?f[e].background:f.info.background;let r=f[e]?f[e].text:f.info.text;return"light"===e&&(r=x.main),{background:i,color:r}})(a),...!u&&!h&&{position:"static",marginLeft:_(8),transform:"none",fontSize:_(9)},...h&&{position:"relative",transform:"none"}}};var H}));var c=r(28326);const l=(0,n.forwardRef)(((e,i)=>{let{color:r,variant:n,size:t,circular:o,indicator:s,border:l,container:d,children:p,...m}=e;return(0,c.jsx)(a,{...m,ownerState:{color:r,variant:n,size:t,circular:o,indicator:s,border:l,container:d,children:p},ref:i,color:"default",children:p})}));l.defaultProps={color:"info",variant:"gradient",size:"sm",circular:!1,indicator:!1,border:!1,children:!1,container:!1},l.propTypes={color:o().oneOf(["primary","secondary","info","success","warning","error","light","dark"]),variant:o().oneOf(["gradient","contained"]),size:o().oneOf(["xs","sm","md","lg"]),circular:o().bool,indicator:o().bool,border:o().bool,children:o().node,container:o().bool};const d=l},17330:(e,i,r)=>{r.r(i),r.d(i,{CreateUpdatePollination:()=>W,default:()=>H});var n=r(68282),t=r(26298),o=r(58294),s=r(83648),a=r(25813),c=r(16789),l=r(59251),d=r(63945),p=r(35016),m=(r(12682),r(49779)),h=r(80608),u=(r(85785),r(97950),r(47417),r(77183)),g=r(74503),x=(r(22562),r(38079)),v=r(28326);function f(e){let{info:i,children:r}=e;const[c,l]=(0,o.useState)("horizontal"),[d,p]=(0,o.useState)(0);(0,o.useEffect)((()=>{function e(){return window.innerWidth<g.A.values.sm?l("vertical"):l("horizontal")}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)}),[c]);const{image:m="",hive_type:h,status:f}=i;return(0,v.jsxs)(s.A,{position:"relative",mb:5,children:[(0,v.jsx)(s.A,{display:"flex",alignItems:"center",position:"relative",minHeight:"18.75rem",borderRadius:"xl",sx:{backgroundImage:e=>{let{functions:{rgba:i,linearGradient:r},palette:{gradients:n}}=e;return`${r(i(n.info.main,.6),i(n.info.state,.6))}, url(${x})`},backgroundSize:"cover",backgroundPosition:"50%",overflow:"hidden"}}),(0,v.jsxs)(t.A,{sx:{position:"relative",mt:-8,mx:3,py:2,px:2},children:[(0,v.jsxs)(n.Ay,{container:!0,spacing:3,alignItems:"center",children:[(0,v.jsx)(n.Ay,{item:!0,children:(0,v.jsx)(u.A,{src:m,alt:"profile-image",size:"xl",shadow:"sm"})}),(0,v.jsx)(n.Ay,{item:!0,children:(0,v.jsxs)(s.A,{height:"100%",mt:.5,lineHeight:1,children:[(0,v.jsx)(a.A,{variant:"h5",fontWeight:"medium",children:h}),(0,v.jsx)(a.A,{variant:"button",color:"text",fontWeight:"regular",children:f})]})})]}),r]})]})}f.defaultProps={info:{image:"",hive_type:"First Name",status:"Last Name"},children:null};var A=r(56084),j=r(24009),b=r(66801),y=r(40068),_=r(15570),w=(r(74996),r(14149),r(86586)),P=r(82592),S=r(57580),k=(r(3186),r(96338));function z(){const e=(0,A.wA)(),{deletePolService:i}=(0,S.O1)(),{isGettingAllPolServices:r,polservices:{polservices:n=[],totalPolServices:t,count:o,numOfPages:c}={},refetch:l}=(0,S.xd)(),d=e=>{let{image:i,crop_type:r,pol_service_id:n}=e;return(0,v.jsxs)(s.A,{display:"flex",alignItems:"center",lineHeight:1,children:[(0,v.jsx)(u.A,{src:i,size:"sm"}),(0,v.jsxs)(s.A,{ml:2,lineHeight:1,children:[(0,v.jsx)(a.A,{display:"block",variant:"button",fontWeight:"medium",children:`${n} `}),(0,v.jsx)(a.A,{variant:"caption",children:r})]})]})};return{columns:[{Header:"pollination",accessor:"pollination",width:"45%",align:"left"},{Header:"service",accessor:"service",align:"left"},{Header:"description",accessor:"description",align:"center"},{Header:"rendered",accessor:"rendered",align:"center"},{Header:"price",accessor:"price",align:"center"},{Header:"update",accessor:"update",align:"center"},{Header:"remove",accessor:"remove",align:"center"}],rows:n.map(((r,n)=>{const{pol_service_id:t,service_id:o,crop_type:s,service_description:c,rendered:l,price:p}=r,m={service_id:o,crop_type:s,service_description:c,rendered:l,price:p};return{pollination:(0,v.jsx)(d,{image:k.A,crop_type:s,pol_service_id:t}),service:(0,v.jsx)(a.A,{component:"a",href:"#",variant:"caption",color:"text",fontWeight:"medium",children:o}),description:(0,v.jsx)(a.A,{title:c,component:"a",href:"#",variant:"caption",color:"text",fontWeight:"medium",children:c.length>20?`${c.slice(0,20)}...`:c}),rendered:(0,v.jsxs)(a.A,{component:"a",href:"#",variant:"caption",color:"text",fontWeight:"medium",children:["# ",l]}),price:(0,v.jsxs)(a.A,{component:"a",href:"#",variant:"caption",color:"text",fontWeight:"medium",children:["# ",p]}),update:(0,v.jsx)(a.A,{component:"a",variant:"caption",color:"text",fontWeight:"medium",children:(0,v.jsx)(j.N_,{onClick:()=>{e((0,w.Ri)(m))},to:`/createupdatepollination/${t}`,children:"Edit"})}),remove:(0,v.jsx)(a.A,{component:"a",variant:"caption",color:"text",fontWeight:"medium",onClick:()=>{window.confirm("You are about to Delete a pollination service records permanently, ARE YOU SURE?")&&i(t)},children:(0,v.jsx)(j.N_,{children:"remove"})})}})),numOfPages:c,refetch:l,count:o,isGettingAllPolServices:r,totalPolServices:t}}const H=function(){const e=(0,A.wA)(),{rows:i,numOfPages:r,refetch:m,count:h,isGettingAllPolServices:u,columns:g,totalPolServices:x}=z(),{sort:f,pages:y,priceRangeP:P,service_id:S,crop_type:k,service_description:H,rendered:W,price:R}=(0,A.d4)((e=>e.polservices));return o.useEffect((()=>{m()}),[y,S,k,H,W,R,f,P]),(0,v.jsxs)(c.A,{children:[(0,v.jsx)(l.A,{}),(0,v.jsx)(s.A,{pt:6,pb:3,children:(0,v.jsx)(n.Ay,{container:!0,spacing:6,children:(0,v.jsxs)(n.Ay,{item:!0,xs:12,children:[(0,v.jsxs)(t.A,{children:[(0,v.jsx)(s.A,{mx:2,mt:-3,py:3,px:2,variant:"gradient",bgColor:"info",borderRadius:"lg",coloredShadow:"info",children:(0,v.jsxs)(a.A,{variant:"h6",color:"white",children:["Pollination",h,"/",x,(0,v.jsx)(j.N_,{onClick:()=>e((0,w.sy)()),to:"/createupdatepollination/add",children:"create pollination"}),(0,v.jsx)(b.bX,{isGettingAllPolServices:u})]})}),(0,v.jsx)(s.A,{pt:3,children:(0,v.jsx)(p.A,{table:{columns:g,rows:i},isSorted:!1,entriesPerPage:!1,showTotalEntries:!1,noEndBorder:!0})})]}),(0,v.jsx)(_.A,{pageDetails:{handleChange:(i,r)=>{i.preventDefault(),e((0,w.yd)(r))},numOfPages:r,pages:y}})]})})}),(0,v.jsx)(d.A,{})]})},W=()=>{const{id:e}=(0,m.g)(),{polServiceInputs:i}=(0,P.dx)(),{isUpdatingPolservices:r,updatePolService:t}=(0,S.UX)(),{createPolService:o,isCreatingPolservice:a}=(0,S.Hk)(),{service_id:p,crop_type:u,service_description:g,rendered:x,price:f,isEdit:_}=(0,A.d4)((e=>e.polservices)),w={service_id:p,crop_type:u,service_description:g,rendered:x,price:f};return(0,v.jsxs)(c.A,{children:[(0,v.jsx)(l.A,{}),(0,v.jsx)(s.A,{mt:5,mb:3,children:(0,v.jsx)(n.Ay,{container:!0,spacing:1,children:(0,v.jsxs)(n.Ay,{item:!0,xs:12,md:6,xl:4,sx:{display:"flex"},children:[(0,v.jsx)(h.A,{orientation:"vertical",sx:{ml:-2,mr:1}}),(0,v.jsxs)("div",{children:[(0,v.jsx)(j.N_,{to:"/pollinations",children:"Go back"}),(0,v.jsxs)("form",{onSubmit:i=>{i.preventDefault();if(Object.values(w).every((e=>void 0!==e&&null!==e&&""!==e)))return _?t({polServiceDetails:w,id:e}):void o(w);alert("Please fill out all required fields.")},children:[i.filter((e=>"sort"!==e.name&&"priceRangeP"!==e.name)).map((e=>{const{name:i,TextField:r}=e;return(0,v.jsx)("div",{children:r},i)})),(0,v.jsx)(b.Sv,{background:"#1212121F",backgroundhover:"#59d9d9",size:"100%",height:"3vh",type:"submit",children:"pending"===a||"pending"===r?(0,v.jsx)(y.du,{}):_?"Update":"Submit"})]})]}),(0,v.jsx)(h.A,{orientation:"vertical",sx:{mx:0}})]})})}),(0,v.jsx)(d.A,{})]})}},12682:(e,i,r)=>{r(83648),r(25813),r(77183),r(47310),r(74996),r(58294);r.p;r(21806),r(96338),r(21904),r(17351),r(28326)}}]);
//# sourceMappingURL=330.d3c35737.chunk.js.map