import{p as f,g as c,r as a,a4 as i,V as p,E as R,al as u,P as m}from"./index-7bb1b45e.js";const d=f({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function y(n){const t=c("useRender");t.render=n}function g(n){const t=a(),s=a();if(i){const r=new ResizeObserver(e=>{n==null||n(e,r),e.length&&(s.value=e[0].contentRect)});p(()=>{r.disconnect()}),R(t,(e,o)=>{o&&(r.unobserve(u(o)),s.value=void 0),e&&r.observe(u(e))},{flush:"post"})}return{resizeRef:t,contentRect:m(s)}}export{y as a,d as m,g as u};
