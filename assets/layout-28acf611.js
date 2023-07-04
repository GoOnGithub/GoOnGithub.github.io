import{a as ee}from"./resizeObserver-a02783aa.js";import{p as K,U as V,e as s,q as te,Y as $,a7 as N,s as k,V as oe,Z as q,S as R,a8 as ne,a5 as ae,a9 as se,aa as ue,$ as le}from"./index-e315a2ce.js";const M=Symbol.for("vuetify:layout"),D=Symbol.for("vuetify:layout-item"),B=1e3,de=K({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),ye=K({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function fe(){const u=V(M);if(!u)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:u.getLayoutItem,mainRect:u.mainRect,mainStyles:u.mainStyles}}function pe(u){const i=V(M);if(!i)throw new Error("[Vuetify] Could not find injected layout");const d=u.id??`layout-item-${ae()}`,r=N("useLayoutItem");q(D,{id:d});const n=k(!1);se(()=>n.value=!0),ue(()=>n.value=!1);const{layoutItemStyles:c,layoutItemScrimStyles:v}=i.register(r,{...u,active:s(()=>n.value?!1:u.active.value),id:d});return le(()=>i.unregister(d)),{layoutItemStyles:c,layoutRect:i.layoutRect,layoutItemScrimStyles:v}}const ie=(u,i,d,r)=>{let n={top:0,left:0,right:0,bottom:0};const c=[{id:"",layer:{...n}}];for(const v of u){const p=i.get(v),g=d.get(v),z=r.get(v);if(!p||!g||!z)continue;const h={...n,[p.value]:parseInt(n[p.value],10)+(z.value?parseInt(g.value,10):0)};c.push({id:v,layer:h}),n=h}return c};function me(u){const i=V(M,null),d=s(()=>i?i.rootZIndex.value-100:B),r=te([]),n=$(new Map),c=$(new Map),v=$(new Map),p=$(new Map),g=$(new Map),{resizeRef:z,contentRect:h}=ee(),X=s(()=>{const t=new Map,l=u.overlaps??[];for(const e of l.filter(a=>a.includes(":"))){const[a,o]=e.split(":");if(!r.value.includes(a)||!r.value.includes(o))continue;const f=n.get(a),m=n.get(o),S=c.get(a),w=c.get(o);!f||!m||!S||!w||(t.set(o,{position:f.value,amount:parseInt(S.value,10)}),t.set(a,{position:m.value,amount:-parseInt(w.value,10)}))}return t}),I=s(()=>{const t=[...new Set([...v.values()].map(e=>e.value))].sort((e,a)=>e-a),l=[];for(const e of t){const a=r.value.filter(o=>{var f;return((f=v.get(o))==null?void 0:f.value)===e});l.push(...a)}return ie(l,n,c,p)}),E=s(()=>!Array.from(g.values()).some(t=>t.value)),b=s(()=>I.value[I.value.length-1].layer),Y=s(()=>({"--v-layout-left":R(b.value.left),"--v-layout-right":R(b.value.right),"--v-layout-top":R(b.value.top),"--v-layout-bottom":R(b.value.bottom),...E.value?void 0:{transition:"none"}})),x=s(()=>I.value.slice(1).map((t,l)=>{let{id:e}=t;const{layer:a}=I.value[l],o=c.get(e),f=n.get(e);return{id:e,...a,size:Number(o.value),position:f.value}})),H=t=>x.value.find(l=>l.id===t),O=N("createLayout"),T=k(!1);oe(()=>{T.value=!0}),q(M,{register:(t,l)=>{let{id:e,order:a,position:o,layoutSize:f,elementSize:m,active:S,disableTransitions:w,absolute:_}=l;v.set(e,a),n.set(e,o),c.set(e,f),p.set(e,S),w&&g.set(e,w);const U=ne(D,O==null?void 0:O.vnode).indexOf(t);U>-1?r.value.splice(U,0,e):r.value.push(e);const Z=s(()=>x.value.findIndex(L=>L.id===e)),A=s(()=>d.value+I.value.length*2-Z.value*2),G=s(()=>{const L=o.value==="left"||o.value==="right",C=o.value==="right",Q=o.value==="bottom",j={[o.value]:0,zIndex:A.value,transform:`translate${L?"X":"Y"}(${(S.value?0:-110)*(C||Q?-1:1)}%)`,position:_.value||d.value!==B?"absolute":"fixed",...E.value?void 0:{transition:"none"}};if(!T.value)return j;const y=x.value[Z.value];if(!y)throw new Error(`[Vuetify] Could not find layout item "${e}"`);const P=X.value.get(e);return P&&(y[P.position]+=P.amount),{...j,height:L?`calc(100% - ${y.top}px - ${y.bottom}px)`:m.value?`${m.value}px`:void 0,left:C?void 0:`${y.left}px`,right:C?`${y.right}px`:void 0,top:o.value!=="bottom"?`${y.top}px`:void 0,bottom:o.value!=="top"?`${y.bottom}px`:void 0,width:L?m.value?`${m.value}px`:void 0:`calc(100% - ${y.left}px - ${y.right}px)`}}),J=s(()=>({zIndex:A.value-1}));return{layoutItemStyles:G,layoutItemScrimStyles:J,zIndex:A}},unregister:t=>{v.delete(t),n.delete(t),c.delete(t),p.delete(t),g.delete(t),r.value=r.value.filter(l=>l!==t)},mainRect:b,mainStyles:Y,getLayoutItem:H,items:x,layoutRect:h,rootZIndex:d});const F=s(()=>["v-layout",{"v-layout--full-height":u.fullHeight}]),W=s(()=>({zIndex:d.value,position:i?"relative":void 0,overflow:i?"hidden":void 0}));return{layoutClasses:F,layoutStyles:W,getLayoutItem:H,items:x,layoutRect:h,layoutRef:z}}export{ye as a,pe as b,me as c,de as m,fe as u};