import{r as v,o as p,c as n,p as f,m as y,g as d,a as h,u as C,b as o,w as V}from"./index-855c621d.js";import{m as k,a as w,c as A,u as g}from"./layout-75b08b6d.js";const x={__name:"View",setup(e){return(s,t)=>{const a=v("router-view");return p(),n(a)}}};const P=f({...k(),...w({fullHeight:!0}),...y()},"VApp"),L=d()({name:"VApp",props:P(),setup(e,s){let{slots:t}=s;const a=h(e),{layoutClasses:c,layoutStyles:l,getLayoutItem:u,items:m,layoutRef:_}=A(e),{rtlClasses:i}=C();return g(()=>{var r;return o("div",{ref:_,class:["v-application",a.themeClasses.value,c.value,i.value,e.class],style:[l.value,e.style]},[o("div",{class:"v-application__wrap"},[(r=t.default)==null?void 0:r.call(t)])])}),{getLayoutItem:u,items:m,theme:a}}}),T={__name:"Default",setup(e){return(s,t)=>(p(),n(L,null,{default:V(()=>[o(x)]),_:1}))}};export{T as default};