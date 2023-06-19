import{d as J,x as U,N as W,A as ee,E as te,B as O,j as Q,k as ae,b as le,e as s,J as oe,Q as _,n as R,K as ue,C as se,T as ne,a as ie,c as ve,f as M,t as re}from"./index-85d9d6f5.js";import{v as pe,g as de,y as ce}from"./resizeObserver-53831856-10f0d73b.js";const K=Symbol.for("vuetify:layout"),fe=Symbol.for("vuetify:layout-item"),j=1e3,ye=J({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),me=(i,d,v,l)=>{let u={top:0,left:0,right:0,bottom:0};const r=[{id:"",layer:{...u}}];for(const p of i){const f=d.get(p),m=v.get(p),x=l.get(p);if(!f||!m||!x)continue;const g={...u,[f.value]:parseInt(u[f.value],10)+(x.value?parseInt(m.value,10):0)};r.push({id:p,layer:g}),u=g}return r};function ge(i){const d=le(K,null),v=s(()=>d?d.rootZIndex.value-100:j),l=oe([]),u=_(new Map),r=_(new Map),p=_(new Map),f=_(new Map),m=_(new Map),{resizeRef:x,contentRect:g}=ce(),X=s(()=>{const t=new Map,n=i.overlaps??[];for(const e of n.filter(o=>o.includes(":"))){const[o,a]=e.split(":");if(!l.value.includes(o)||!l.value.includes(a))continue;const y=u.get(o),h=u.get(a),w=r.get(o),S=r.get(a);!y||!h||!w||!S||(t.set(a,{position:y.value,amount:parseInt(w.value,10)}),t.set(o,{position:h.value,amount:-parseInt(S.value,10)}))}return t}),I=s(()=>{const t=[...new Set([...p.values()].map(e=>e.value))].sort((e,o)=>e-o),n=[];for(const e of t){const o=l.value.filter(a=>{var y;return((y=p.get(a))==null?void 0:y.value)===e});n.push(...o)}return me(n,u,r,f)}),V=s(()=>!Array.from(m.values()).some(t=>t.value)),b=s(()=>I.value[I.value.length-1].layer),Y=s(()=>({"--v-layout-left":R(b.value.left),"--v-layout-right":R(b.value.right),"--v-layout-top":R(b.value.top),"--v-layout-bottom":R(b.value.bottom),...V.value?void 0:{transition:"none"}})),$=s(()=>I.value.slice(1).map((t,n)=>{let{id:e}=t;const{layer:o}=I.value[n],a=r.get(e),y=u.get(e);return{id:e,...o,size:Number(a.value),position:y.value}})),k=t=>$.value.find(n=>n.id===t),B=ue("createLayout"),E=se(!1);ne(()=>{E.value=!0}),ie(K,{register:(t,n)=>{let{id:e,order:o,position:a,layoutSize:y,elementSize:h,active:w,disableTransitions:S,absolute:D}=n;p.set(e,o),u.set(e,a),r.set(e,y),f.set(e,w),S&&m.set(e,S);const H=ve(fe,B==null?void 0:B.vnode).indexOf(t);H>-1?l.value.splice(H,0,e):l.value.push(e);const N=s(()=>$.value.findIndex(z=>z.id===e)),A=s(()=>v.value+I.value.length*2-N.value*2),F=s(()=>{const z=a.value==="left"||a.value==="right",C=a.value==="right",P=a.value==="bottom",T={[a.value]:0,zIndex:A.value,transform:`translate${z?"X":"Y"}(${(w.value?0:-110)*(C||P?-1:1)}%)`,position:D.value||v.value!==j?"absolute":"fixed",...V.value?void 0:{transition:"none"}};if(!E.value)return T;const c=$.value[N.value];if(!c)throw new Error(`[Vuetify] Could not find layout item "${e}"`);const L=X.value.get(e);return L&&(c[L.position]+=L.amount),{...T,height:z?`calc(100% - ${c.top}px - ${c.bottom}px)`:h.value?`${h.value}px`:void 0,left:C?void 0:`${c.left}px`,right:C?`${c.right}px`:void 0,top:a.value!=="bottom"?`${c.top}px`:void 0,bottom:a.value!=="top"?`${c.bottom}px`:void 0,width:z?h.value?`${h.value}px`:void 0:`calc(100% - ${c.left}px - ${c.right}px)`}}),G=s(()=>({zIndex:A.value-1}));return{layoutItemStyles:F,layoutItemScrimStyles:G,zIndex:A}},unregister:t=>{p.delete(t),u.delete(t),r.delete(t),f.delete(t),m.delete(t),l.value=l.value.filter(n=>n!==t)},mainRect:b,mainStyles:Y,getLayoutItem:k,items:$,layoutRect:g,rootZIndex:v});const Z=s(()=>["v-layout",{"v-layout--full-height":i.fullHeight}]),q=s(()=>({zIndex:v.value,position:d?"relative":void 0,overflow:d?"hidden":void 0}));return{layoutClasses:Z,layoutStyles:q,getLayoutItem:k,items:$,layoutRect:g,layoutRef:x}}const he={__name:"View",setup(i){return(d,v)=>{const l=re("router-view");return O(),Q(l)}}},xe=J({...pe(),...ye({fullHeight:!0}),...U()},"VApp"),Ie=W()({name:"VApp",props:xe(),setup(i,d){let{slots:v}=d;const l=ee(i),{layoutClasses:u,layoutStyles:r,getLayoutItem:p,items:f,layoutRef:m}=ge(i),{rtlClasses:x}=te();return de(()=>{var g;return M("div",{ref:m,class:["v-application",l.themeClasses.value,u.value,x.value,i.class],style:[r.value,i.style]},[M("div",{class:"v-application__wrap"},[(g=v.default)==null?void 0:g.call(v)])])}),{getLayoutItem:p,items:f,theme:l}}}),we={__name:"Default",setup(i){return(d,v)=>(O(),Q(Ie,null,{default:ae(()=>[M(he)]),_:1}))}};export{we as default};
