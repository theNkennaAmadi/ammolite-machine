import{g as t,S as c,a as u}from"./ScrollTrigger-DjNdyQeP.js";import{L as p}from"./lenis-DvwNn7nP.js";t.registerPlugin(c);class m{constructor(e){this.container=e,this.landinglogo=this.container.querySelector(".l-nav-logo"),this.init()}init(){this.splitText(),this.initLenis(),this.initLinkHovers(),this.imageReveal(),this.initLogoAnim(),t.to(".main",{visibility:"visible",opacity:1})}initLenis(){const e=new p({smooth:!0});e.on("scroll",c.update),t.ticker.add(o=>{e.raf(o*1e3)}),t.ticker.lagSmoothing(0)}initLogoAnim(){const e=t.timeline({paused:!0,defaults:{ease:"expo.out"}});e.fromTo(this.landinglogo.querySelectorAll(".sh"),{fill:"transparent",opacity:0},{fill:"currentColor",opacity:1,duration:.5,ease:"expo.out"},"<").from(this.landinglogo.querySelectorAll(".sh"),{x:"-1ch",duration:1,ease:"expo.out"},"<"),this.landinglogo.addEventListener("mouseover",()=>{e.timeScale(1),e.play()}),this.landinglogo.addEventListener("mouseout",()=>{e.timeScale(1.25),e.reverse()})}splitText(){let e=Array.from(this.container.querySelectorAll("h1:not([no-split]), h2:not([no-split]), h3:not([no-split]), p:not([no-split]), a:not([no-split]), label:not([no-split]) span:not([no-split]) blockquote:not([no-split])"));this.elementsToSplit=e.filter(o=>!e.some(r=>r!==o&&r.contains(o))),this.elementsToSplit.forEach(o=>{u({target:o,by:"chars"})}),this.setupTextAnimations()}initLinkHovers(){document.querySelectorAll("[s-link]").forEach(i=>{const l=i.querySelectorAll(".char"),s=t.timeline({paused:!0});s.fromTo(l,{yPercent:0},{yPercent:-100,duration:.5,ease:"power4.out",stagger:{amount:.1}}),i.addEventListener("mouseover",()=>{s.play()}),i.addEventListener("mouseout",()=>{s.reverse()})}),document.querySelectorAll(".work-item-grid").forEach(i=>{const l=i.querySelector(".work-header").querySelectorAll(".char"),s=t.timeline({paused:!0});s.fromTo(l,{yPercent:0},{yPercent:-100,duration:.5,ease:"power4.out",stagger:{amount:.1}}),i.addEventListener("mouseover",()=>{s.play()}),i.addEventListener("mouseout",()=>{s.reverse()})});let r=t.matchMedia();const a=this.container.querySelector(".mob-menu");let n=!1;r.add("(max-width: 479px)",()=>{const i=()=>{n?t.to(".nav-main-links-wrapper",{opacity:0}):t.to(".nav-main-links-wrapper",{opacity:1}),n=!n};return a.addEventListener("click",i),()=>{n||a.click(),a.removeEventListener("click",i)}})}setupTextAnimations(){this.elementsToSplit.forEach(e=>{const o=e.querySelectorAll(".char"),r=e.getAttribute("split-text");if(!e.hasAttribute("no-scroll")){t.set(o,{yPercent:110,opacity:0});let n=t.timeline({scrollTrigger:{trigger:e,start:"top 92%",end:"bottom bottom",invalidateOnRefresh:!0}});r==="chars"?n.to(o,{yPercent:0,stagger:{each:.05},opacity:1,ease:"power4.inOut",duration:1}):r==="intro"?n.to(o,{yPercent:0,opacity:1,delay:1,stagger:{each:.05,from:"center"}}):n.to(o,{yPercent:0,opacity:1,ease:"expo.out",duration:2})}})}imageReveal(){t.from(".work-visual",{clipPath:"inset(50% 50% 50% 50%)",duration:2,ease:"expo.inOut"}),t.from(".category",{yPercent:110,duration:1,ease:"expo.out"})}}new m(document.querySelector(".page-wrapper"));