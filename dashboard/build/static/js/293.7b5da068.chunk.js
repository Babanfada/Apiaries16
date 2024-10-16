"use strict";(self.webpackChunkapiaries_16_dashboard=self.webpackChunkapiaries_16_dashboard||[]).push([[293],{1293:(t,e,i)=>{i.r(e),i.d(e,{default:()=>T});var n=i(58294),r=i(56084),a=i(49779),o=i(26298),s=i(39460),l=i(26325),h=i(40791),d=i(10056),c=i(84559);function u(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function m(t){return parseFloat(t)}var g=i(80093),f=i(64319),p=i(6756),b=i(15201),v=i(48701);function x(t){return(0,v.Ay)("MuiSkeleton",t)}(0,b.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var A=i(28326);const w=["animation","className","component","height","style","variant","width"];let k,y,j,C,S=t=>t;const R=(0,d.i7)(k||(k=S`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),W=(0,d.i7)(y||(y=S`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),$=(0,f.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:i}=t;return[e.root,e[i.variant],!1!==i.animation&&e[i.animation],i.hasChildren&&e.withChildren,i.hasChildren&&!i.width&&e.fitContent,i.hasChildren&&!i.height&&e.heightAuto]}})((t=>{let{theme:e,ownerState:i}=t;const n=u(e.shape.borderRadius)||"px",r=m(e.shape.borderRadius);return(0,l.A)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,g.X4)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===i.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${n}/${Math.round(r/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===i.variant&&{borderRadius:"50%"},"rounded"===i.variant&&{borderRadius:(e.vars||e).shape.borderRadius},i.hasChildren&&{"& > *":{visibility:"hidden"}},i.hasChildren&&!i.width&&{maxWidth:"fit-content"},i.hasChildren&&!i.height&&{height:"auto"})}),(t=>{let{ownerState:e}=t;return"pulse"===e.animation&&(0,d.AH)(j||(j=S`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),R)}),(t=>{let{ownerState:e,theme:i}=t;return"wave"===e.animation&&(0,d.AH)(C||(C=S`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),W,(i.vars||i).palette.action.hover)})),_=n.forwardRef((function(t,e){const i=(0,p.A)({props:t,name:"MuiSkeleton"}),{animation:n="pulse",className:r,component:a="span",height:o,style:d,variant:u="text",width:m}=i,g=(0,s.A)(i,w),f=(0,l.A)({},i,{animation:n,component:a,variant:u,hasChildren:Boolean(g.children)}),b=(t=>{const{classes:e,variant:i,animation:n,hasChildren:r,width:a,height:o}=t,s={root:["root",i,n,r&&"withChildren",r&&!a&&"fitContent",r&&!o&&"heightAuto"]};return(0,c.A)(s,x,e)})(f);return(0,A.jsx)($,(0,l.A)({as:a,ref:e,className:(0,h.A)(b.root,r),ownerState:f},g,{style:(0,l.A)({width:m,height:o},d)}))}));var N=i(56995),F=i(33991),M=i(83648),X=i(25813),E=i(56794),G=i(40068),B=i(77748),D=i(89522),H=i(24009);const T=function(){const[t,e]=(0,n.useState)(!1),{email:i,password:s}=(0,r.d4)((t=>t.users)),{loginUser:l,isLoginIn:h}=(0,N.yh)(),{userDetails:d}=(0,F.A)(),c=(0,a.Zp)(),{data:u,refetch:m,isCheckingCurrentUser:g}=(0,N.iZ)();return(0,n.useEffect)((()=>{"success"===h&&m(),"success"===g&&c("/dashboard")}),[h,g,c]),(0,A.jsx)(B.A,{image:D,children:(0,A.jsxs)(o.A,{children:[(0,A.jsxs)(M.A,{variant:"gradient",bgColor:"info",borderRadius:"lg",coloredShadow:"info",mx:2,mt:-3,p:2,mb:1,textAlign:"center",children:[(0,A.jsx)(X.A,{variant:"h6",fontWeight:"medium",color:"white",mt:1,children:"Glad to see you back again !!"}),(0,A.jsx)(X.A,{variant:"h6",fontWeight:"small",color:"white",mt:1,children:"Enter your password to retrieve your info..."})]}),(0,A.jsx)(M.A,{pt:4,pb:3,px:3,children:(0,A.jsxs)(M.A,{component:"form",role:"form",onSubmit:t=>{t.preventDefault(),i&&s?l({email:i,password:s}):toast.error("You have not provided your email or password")},children:[(0,A.jsxs)(M.A,{mt:0,mb:0,textAlign:"start",children:[(0,A.jsxs)(X.A,{fontFamily:"inherit",fontWeight:"bold",variant:"button",color:"text",children:["Not your Email?"," ",(0,A.jsx)(X.A,{component:H.N_,to:"/authentication/check",variant:"button",color:"info",fontWeight:"medium",textGradient:!0,children:"go back"})]}),(0,A.jsx)(X.A,{variant:"h6",fontWeight:"bold",color:"info",mt:1,children:i?(0,A.jsx)(X.A,{variant:"span",fontWeight:"bold",color:"info",mt:1,children:i}):(0,A.jsx)(_,{variant:"rectangular",width:"fit-content",height:"fit-content",sx:{borderRadius:"5px",background:"none",fontSize:"small",color:"red",fontWeight:"bold"},children:"Your email is missing, you have to go back!!!"})})]}),(0,A.jsx)(M.A,{mb:2,children:d[1].TextField}),(0,A.jsx)(M.A,{mt:4,mb:1,children:(0,A.jsx)(E.A,{type:"submit",disabled:!s,variant:"gradient",color:"info",fullWidth:!0,children:"pending"===h?(0,A.jsx)(G.du,{}):"Sign in"})}),(0,A.jsx)(M.A,{mt:3,mb:1,textAlign:"center",children:(0,A.jsxs)(X.A,{variant:"button",color:"text",children:["Forgot password?"," ",(0,A.jsx)(X.A,{component:H.N_,to:"/authentication/forget-password",variant:"button",color:"info",fontWeight:"medium",textGradient:!0,children:"reset it"})]})})]})})]})})}}}]);
//# sourceMappingURL=293.7b5da068.chunk.js.map