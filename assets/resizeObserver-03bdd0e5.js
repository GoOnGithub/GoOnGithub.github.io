import{p as f,g as c,r as a,a3 as i,U as p,E as R,ad as u,ag as m}from"./index-2f152ae5.js";const v=f({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function g(n){const t=c("useRender");t.render=n}function y(n){const t=a(),s=a();if(i){const r=new ResizeObserver(e=>{n==null||n(e,r),e.length&&(s.value=e[0].contentRect)});p(()=>{r.disconnect()}),R(t,(e,o)=>{o&&(r.unobserve(u(o)),s.value=void 0),e&&r.observe(u(e))},{flush:"post"})}return{resizeRef:t,contentRect:m(s)}}export{g as a,v as m,y as u};
