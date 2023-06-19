import{p as Z,i as J,c as l,r as Q,a as S,g as ee,s as te,o as oe,b as ne,d as C,f as ae,e as se,h as j,j as D,m as le,k as ue,l as ie,u as re,n as M,w as ce}from"./index-6a2f0970.js";import{u as pe,m as ve,a as de}from"./resizeObserver-c01b3642.js";const E=Symbol.for("vuetify:layout"),fe=Symbol.for("vuetify:layout-item"),N=1e3,me=Z({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),ye=(r,v,u,n)=>{let s={top:0,left:0,right:0,bottom:0};const c=[{id:"",layer:{...s}}];for(const p of r){const f=v.get(p),y=u.get(p),x=n.get(p);if(!f||!y||!x)continue;const g={...s,[f.value]:parseInt(s[f.value],10)+(x.value?parseInt(y.value,10):0)};c.push({id:p,layer:g}),s=g}return c};function ge(r){const v=J(E,null),u=l(()=>v?v.rootZIndex.value-100:N),n=Q([]),s=S(new Map),c=S(new Map),p=S(new Map),f=S(new Map),y=S(new Map),{resizeRef:x,contentRect:g}=pe(),K=l(()=>{const t=new Map,i=r.overlaps??[];for(const e of i.filter(a=>a.includes(":"))){const[a,o]=e.split(":");if(!n.value.includes(a)||!n.value.includes(o))continue;const m=s.get(a),h=s.get(o),w=c.get(a),$=c.get(o);!m||!h||!w||!$||(t.set(o,{position:m.value,amount:parseInt(w.value,10)}),t.set(a,{position:h.value,amount:-parseInt($.value,10)}))}return t}),_=l(()=>{const t=[...new Set([...p.values()].map(e=>e.value))].sort((e,a)=>e-a),i=[];for(const e of t){const a=n.value.filter(o=>{var m;return((m=p.get(o))==null?void 0:m.value)===e});i.push(...a)}return ye(i,s,c,f)}),P=l(()=>!Array.from(y.values()).some(t=>t.value)),b=l(()=>_.value[_.value.length-1].layer),X=l(()=>({"--v-layout-left":C(b.value.left),"--v-layout-right":C(b.value.right),"--v-layout-top":C(b.value.top),"--v-layout-bottom":C(b.value.bottom),...P.value?void 0:{transition:"none"}})),I=l(()=>_.value.slice(1).map((t,i)=>{let{id:e}=t;const{layer:a}=_.value[i],o=c.get(e),m=s.get(e);return{id:e,...a,size:Number(o.value),position:m.value}})),k=t=>I.value.find(i=>i.id===t),R=ee("createLayout"),O=te(!1);oe(()=>{O.value=!0}),ne(E,{register:(t,i)=>{let{id:e,order:a,position:o,layoutSize:m,elementSize:h,active:w,disableTransitions:$,absolute:U}=i;p.set(e,a),s.set(e,o),c.set(e,m),f.set(e,w),$&&y.set(e,$);const T=ae(fe,R==null?void 0:R.vnode).indexOf(t);T>-1?n.value.splice(T,0,e):n.value.push(e);const H=l(()=>I.value.findIndex(z=>z.id===e)),L=l(()=>u.value+_.value.length*2-H.value*2),W=l(()=>{const z=o.value==="left"||o.value==="right",V=o.value==="right",G=o.value==="bottom",B={[o.value]:0,zIndex:L.value,transform:`translate${z?"X":"Y"}(${(w.value?0:-110)*(V||G?-1:1)}%)`,position:U.value||u.value!==N?"absolute":"fixed",...P.value?void 0:{transition:"none"}};if(!O.value)return B;const d=I.value[H.value];if(!d)throw new Error(`[Vuetify] Could not find layout item "${e}"`);const A=K.value.get(e);return A&&(d[A.position]+=A.amount),{...B,height:z?`calc(100% - ${d.top}px - ${d.bottom}px)`:h.value?`${h.value}px`:void 0,left:V?void 0:`${d.left}px`,right:V?`${d.right}px`:void 0,top:o.value!=="bottom"?`${d.top}px`:void 0,bottom:o.value!=="top"?`${d.bottom}px`:void 0,width:z?h.value?`${h.value}px`:void 0:`calc(100% - ${d.left}px - ${d.right}px)`}}),Y=l(()=>({zIndex:L.value-1}));return{layoutItemStyles:W,layoutItemScrimStyles:Y,zIndex:L}},unregister:t=>{p.delete(t),s.delete(t),c.delete(t),f.delete(t),y.delete(t),n.value=n.value.filter(i=>i!==t)},mainRect:b,mainStyles:X,getLayoutItem:k,items:I,layoutRect:g,rootZIndex:u});const q=l(()=>["v-layout",{"v-layout--full-height":r.fullHeight}]),F=l(()=>({zIndex:u.value,position:v?"relative":void 0,overflow:v?"hidden":void 0}));return{layoutClasses:q,layoutStyles:F,getLayoutItem:k,items:I,layoutRect:g,layoutRef:x}}const he={__name:"View",setup(r){return(v,u)=>{const n=se("router-view");return j(),D(n)}}};const xe=Z({...ve(),...me({fullHeight:!0}),...le()},"VApp"),_e=ue()({name:"VApp",props:xe(),setup(r,v){let{slots:u}=v;const n=ie(r),{layoutClasses:s,layoutStyles:c,getLayoutItem:p,items:f,layoutRef:y}=ge(r),{rtlClasses:x}=re();return de(()=>{var g;return M("div",{ref:y,class:["v-application",n.themeClasses.value,s.value,x.value,r.class],style:[c.value,r.style]},[M("div",{class:"v-application__wrap"},[(g=u.default)==null?void 0:g.call(u)])])}),{getLayoutItem:p,items:f,theme:n}}}),$e={__name:"Default",setup(r){return(v,u)=>(j(),D(_e,null,{default:ce(()=>[M(he)]),_:1}))}};export{$e as default};
