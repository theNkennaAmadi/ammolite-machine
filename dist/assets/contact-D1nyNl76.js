import{g as o,S as a,a as c}from"./ScrollTrigger-DjNdyQeP.js";import{L as u}from"./lenis-DvwNn7nP.js";o.registerPlugin(a);class h{constructor(t){this.container=t,this.contactLine=this.container.querySelectorAll(".contact-line"),this.textFields=this.container.querySelectorAll(".text-field"),this.socialLine=this.container.querySelectorAll(".social-line"),this.socialBlocks=this.container.querySelectorAll(".social-block"),this.landinglogo=this.container.querySelector(".l-nav-logo"),this.init(),console.log("hello")}init(){this.splitText(),this.initLenis(),this.lineReveal(),this.initLinkHovers(),this.socialReveal(),this.initTextArea(),this.initLogoAnim(),o.to(".main",{visibility:"visible",opacity:1})}initLogoAnim(){const t=o.timeline({paused:!0,defaults:{ease:"expo.out"}});t.fromTo(this.landinglogo.querySelectorAll(".sh"),{fill:"transparent",opacity:0},{fill:"currentColor",opacity:1,duration:.5,ease:"expo.out"},"<").from(this.landinglogo.querySelectorAll(".sh"),{x:"-1ch",duration:1,ease:"expo.out"},"<"),this.landinglogo.addEventListener("mouseover",()=>{t.timeScale(1),t.play()}),this.landinglogo.addEventListener("mouseout",()=>{t.timeScale(1.25),t.reverse()})}initLenis(){const t=new u({smooth:!0});t.on("scroll",a.update),o.ticker.add(e=>{t.raf(e*1e3)}),o.ticker.lagSmoothing(0)}splitText(){let t=Array.from(this.container.querySelectorAll("h1:not([no-split]), h2:not([no-split]), h3:not([no-split]), p:not([no-split]), a:not([no-split]), label:not([no-split]) span:not([no-split]) blockquote:not([no-split])"));this.elementsToSplit=t.filter(e=>!t.some(i=>i!==e&&i.contains(e))),this.elementsToSplit.forEach(e=>{c({target:e,by:"chars"})}),this.setupTextAnimations()}setupTextAnimations(){this.elementsToSplit.forEach(t=>{const e=t.querySelectorAll(".char"),i=t.getAttribute("split-text");if(!t.hasAttribute("no-scroll")){o.set(e,{yPercent:110,opacity:0});let s=o.timeline({scrollTrigger:{trigger:t,start:"top 92%",end:"bottom bottom",invalidateOnRefresh:!0}});i==="chars"?s.to(e,{yPercent:0,stagger:{each:.05},opacity:1,ease:"power4.inOut",duration:1}):i==="intro"?s.to(e,{yPercent:0,opacity:1,delay:1,stagger:{each:.05,from:"center"}}):s.to(e,{yPercent:0,opacity:1,ease:"expo.out",duration:2})}})}lineReveal(){o.from(this.contactLine,{clipPath:"inset(0% 100% 0% 0%)",duration:2.5,stagger:.3,ease:"expo.out"}),o.from(this.textFields,{clipPath:"inset(0% 100% 0% 0%)",duration:2.5,stagger:.3,ease:"expo.out"}),o.from(this.socialLine,{clipPath:"inset(0% 100% 0% 0%)",duration:2.5,stagger:.3,ease:"expo.out",onComplete:()=>{}})}socialReveal(){this.socialBlocks.forEach(e=>{const i=e.querySelectorAll(".char"),n=o.timeline({paused:!0});n.to(i,{yPercent:-100,duration:.5,ease:"power4.out",stagger:{amount:.1}}),e.addEventListener("mouseover",()=>{n.play()}),e.addEventListener("mouseout",()=>{n.reverse()})}),this.container.querySelectorAll(".grey").forEach(e=>{const i=e.querySelectorAll(".char"),n=o.timeline({paused:!0});n.to(i,{yPercent:-100,duration:.8,ease:"power4.out",stagger:{amount:.15}}),e.addEventListener("mouseover",()=>{n.play()}),e.addEventListener("mouseout",()=>{n.reverse()})})}initLinkHovers(){document.querySelectorAll("[s-link]").forEach(s=>{const l=s.querySelectorAll(".char"),r=o.timeline({paused:!0});r.to(l,{yPercent:-100,duration:.5,ease:"power4.out",stagger:{amount:.1}}),s.addEventListener("mouseover",()=>{r.play()}),s.addEventListener("mouseout",()=>{r.reverse()})});let e=o.matchMedia();const i=this.container.querySelector(".mob-menu");let n=!1;e.add("(max-width: 479px)",()=>{const s=()=>{n?o.to(".nav-main-links-wrapper",{opacity:0}):o.to(".nav-main-links-wrapper",{opacity:1}),n=!n};return i.addEventListener("click",s),()=>{n||i.click(),i.removeEventListener("click",s)}})}initTextArea(){const t=this.container.querySelector(".auto-resize-textarea");function e(){t.style.height="auto",t.style.height=t.scrollHeight+"px"}t.addEventListener("input",e),t.addEventListener("focus",e),e(),window.addEventListener("resize",e)}}new h(document.querySelector(".page-wrapper"));