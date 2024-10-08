"use strict";(self.webpackChunkapiaries_16_dashboard=self.webpackChunkapiaries_16_dashboard||[]).push([[293],{1293:(t,e,i)=>{i.r(e),i.d(e,{default:()=>T});var n=i(58294),a=i(56084),r=i(49779),o=i(26298),s=i(39460),h=i(26325),l=i(40791),d=i(10056),c=i(84559);function u(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function m(t){return parseFloat(t)}var g=i(80093),p=i(64319),f=i(6756),b=i(15201),v=i(48701);function w(t){return(0,v.Ay)("MuiSkeleton",t)}(0,b.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var x=i(28326);const A=["animation","className","component","height","style","variant","width"];let k,y,C,j,S=t=>t;const R=(0,d.i7)(k||(k=S`
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
`)),$=(0,p.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:i}=t;return[e.root,e[i.variant],!1!==i.animation&&e[i.animation],i.hasChildren&&e.withChildren,i.hasChildren&&!i.width&&e.fitContent,i.hasChildren&&!i.height&&e.heightAuto]}})((t=>{let{theme:e,ownerState:i}=t;const n=u(e.shape.borderRadius)||"px",a=m(e.shape.borderRadius);return(0,h.A)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,g.X4)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===i.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${n}/${Math.round(a/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===i.variant&&{borderRadius:"50%"},"rounded"===i.variant&&{borderRadius:(e.vars||e).shape.borderRadius},i.hasChildren&&{"& > *":{visibility:"hidden"}},i.hasChildren&&!i.width&&{maxWidth:"fit-content"},i.hasChildren&&!i.height&&{height:"auto"})}),(t=>{let{ownerState:e}=t;return"pulse"===e.animation&&(0,d.AH)(C||(C=S`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),R)}),(t=>{let{ownerState:e,theme:i}=t;return"wave"===e.animation&&(0,d.AH)(j||(j=S`
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
    `),W,(i.vars||i).palette.action.hover)})),_=n.forwardRef((function(t,e){const i=(0,f.A)({props:t,name:"MuiSkeleton"}),{animation:n="pulse",className:a,component:r="span",height:o,style:d,variant:u="text",width:m}=i,g=(0,s.A)(i,A),p=(0,h.A)({},i,{animation:n,component:r,variant:u,hasChildren:Boolean(g.children)}),b=(t=>{const{classes:e,variant:i,animation:n,hasChildren:a,width:r,height:o}=t,s={root:["root",i,n,a&&"withChildren",a&&!r&&"fitContent",a&&!o&&"heightAuto"]};return(0,c.A)(s,w,e)})(p);return(0,x.jsx)($,(0,h.A)({as:r,ref:e,className:(0,l.A)(b.root,a),ownerState:p},g,{style:(0,h.A)({width:m,height:o},d)}))}));var N=i(56995),M=i(33991),X=i(83648),F=i(25813),B=i(56794),E=i(40068),G=i(77748),D=i(89522),H=i(24009);const T=function(){const[t,e]=(0,n.useState)(!1),{email:i,password:s}=(0,a.d4)((t=>t.users)),{loginUser:h,isLoginIn:l}=(0,N.yh)(),{userDetails:d}=(0,M.A)(),c=(0,r.Zp)(),{data:u,refetch:m,isCheckingCurrentUser:g}=(0,N.iZ)();return(0,n.useEffect)((()=>{"success"===l&&m(),"success"===g&&c("/dashboard")}),[l,g,c]),(0,x.jsx)(G.A,{image:D,children:(0,x.jsxs)(o.A,{children:[(0,x.jsxs)(X.A,{variant:"gradient",bgColor:"info",borderRadius:"lg",coloredShadow:"info",mx:2,mt:-3,p:2,mb:1,textAlign:"center",children:[(0,x.jsx)(F.A,{variant:"h6",fontWeight:"medium",color:"white",mt:1,children:"Glad to see you back again !!"}),(0,x.jsx)(F.A,{variant:"h6",fontWeight:"small",color:"white",mt:1,children:"Enter your password to retrieve your info..."})]}),(0,x.jsx)(X.A,{pt:4,pb:3,px:3,children:(0,x.jsxs)(X.A,{component:"form",role:"form",onSubmit:t=>{t.preventDefault(),i&&s?h({email:i,password:s}):toast.error("You have not provided your email or password")},children:[(0,x.jsxs)(F.A,{variant:"h6",fontWeight:"light",color:"white",mt:1,children:[(0,x.jsx)(H.N_,{to:"/authentication/check",children:"Not your Email? Go Back"}),i?(0,x.jsx)(F.A,{variant:"span",fontWeight:"small",color:"black",mt:1,children:i}):(0,x.jsx)(_,{variant:"rectangular",width:"fit-content",height:"fit-content",sx:{borderRadius:"5px",background:"none",fontSize:"small",color:"red",fontWeight:"bold"},children:"Your email is missing, you have to go back!!!"})]}),(0,x.jsx)(X.A,{mb:2,children:d[1].TextField}),(0,x.jsx)(X.A,{mt:4,mb:1,children:(0,x.jsx)(B.A,{type:"submit",disabled:!s,variant:"gradient",color:"info",fullWidth:!0,children:"pending"===l?(0,x.jsx)(E.du,{}):"Sign in"})}),(0,x.jsx)(X.A,{mt:3,mb:1,textAlign:"center",children:(0,x.jsxs)(F.A,{variant:"button",color:"text",children:["Forgot password?"," ",(0,x.jsx)(F.A,{component:H.N_,to:"/authentication/forget-password",variant:"button",color:"info",fontWeight:"medium",textGradient:!0,children:"reset it"})]})})]})})]})})}}}]);
//# sourceMappingURL=293.ba9b6d85.chunk.js.map