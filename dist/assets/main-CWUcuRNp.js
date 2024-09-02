var I=Object.defineProperty;var B=(n,t,e)=>t in n?I(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var v=(n,t,e)=>B(n,typeof t!="symbol"?t+"":t,e);import{g as d,S as O,a as $}from"./ScrollTrigger-DjNdyQeP.js";function A(n,t,e){return Math.max(n,Math.min(t,e))}class j{advance(t){var i;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;const s=A(0,this.currentTime/this.duration,1);e=s>=1;const o=e?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}else this.lerp?(this.value=function(o,r,u,p){return function(g,S,y){return(1-y)*g+y*S}(o,r,1-Math.exp(-u*p))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(i=this.onUpdate)==null||i.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:o,onStart:r,onUpdate:u}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=u}}class K{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:s=250}={}){v(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});v(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});v(this,"onContentResize",()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(r,u){let p;return function(){let m=arguments,g=this;clearTimeout(p),p=setTimeout(function(){r.apply(g,m)},u)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var t,e;(t=this.wrapperResizeObserver)==null||t.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class D{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let s=0,o=i.length;s<o;s++)i[s](...e)}on(t,e){var i;return(i=this.events[t])!=null&&i.push(e)||(this.events[t]=[e]),()=>{var s;this.events[t]=(s=this.events[t])==null?void 0:s.filter(o=>e!==o)}}off(t,e){var i;this.events[t]=(i=this.events[t])==null?void 0:i.filter(s=>e!==s)}destroy(){this.events={}}}const C=100/6;class G{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){v(this,"onTouchStart",t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});v(this,"onTouchMove",t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.touchMultiplier,o=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})});v(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});v(this,"onWheel",t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;e*=s===1?C:s===2?this.windowWidth:1,i*=s===1?C:s===2?this.windowHeight:1,e*=this.wheelMultiplier,i*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})});v(this,"onWindowResize",()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight});this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new D,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class J{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:i=t,eventsTarget:s=i,smoothWheel:o=!0,syncTouch:r=!1,syncTouchLerp:u=.075,touchInertiaMultiplier:p=35,duration:m,easing:g=h=>Math.min(1,1.001-Math.pow(2,-10*h)),lerp:S=.1,infinite:y=!1,orientation:l="vertical",gestureOrientation:w="vertical",touchMultiplier:f=1,wheelMultiplier:W=1,autoResize:H=!0,prevent:P=!1,__experimental__naiveDimensions:X=!1}={}){this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.direction=0,this.onVirtualScroll=({deltaX:h,deltaY:E,event:a})=>{if(a.ctrlKey)return;const L=a.type.includes("touch"),k=a.type.includes("wheel");if(this.isTouching=a.type==="touchstart"||a.type==="touchmove",this.options.syncTouch&&L&&a.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();const Y=h===0&&E===0,U=this.options.gestureOrientation==="vertical"&&E===0||this.options.gestureOrientation==="horizontal"&&h===0;if(Y||U)return;let _=a.composedPath();_=_.slice(0,_.indexOf(this.rootElement));const z=this.options.prevent;if(_.find(c=>{var M,b,N,R,x;return c instanceof Element&&((typeof z=="function"?z==null?void 0:z(c):z)||((M=c.hasAttribute)===null||M===void 0?void 0:M.call(c,"data-lenis-prevent"))||L&&((b=c.hasAttribute)===null||b===void 0?void 0:b.call(c,"data-lenis-prevent-touch"))||k&&((N=c.hasAttribute)===null||N===void 0?void 0:N.call(c,"data-lenis-prevent-wheel"))||((R=c.classList)===null||R===void 0?void 0:R.contains("lenis"))&&!(!((x=c.classList)===null||x===void 0)&&x.contains("lenis-stopped")))}))return;if(this.isStopped||this.isLocked)return void a.preventDefault();if(!(this.options.syncTouch&&L||this.options.smoothWheel&&k))return this.isScrolling="native",void this.animate.stop();a.preventDefault();let T=E;this.options.gestureOrientation==="both"?T=Math.abs(E)>Math.abs(h)?E:h:this.options.gestureOrientation==="horizontal"&&(T=h);const F=L&&this.options.syncTouch,q=L&&a.type==="touchend"&&Math.abs(T)>5;q&&(T=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+T,Object.assign({programmatic:!1},F?{lerp:q?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(clearTimeout(this.__resetVelocityTimeout),delete this.__resetVelocityTimeout,this.__preventNextNativeScrollEvent)delete this.__preventNextNativeScrollEvent;else if(this.isScrolling===!1||this.isScrolling==="native"){const h=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-h,this.direction=Math.sign(this.animatedScroll-h),this.isScrolling="native",this.emit(),this.velocity!==0&&(this.__resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}},window.lenisVersion="1.1.3",t&&t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:i,eventsTarget:s,smoothWheel:o,syncTouch:r,syncTouchLerp:u,touchInertiaMultiplier:p,duration:m,easing:g,lerp:S,infinite:y,gestureOrientation:w,orientation:l,touchMultiplier:f,wheelMultiplier:W,autoResize:H,prevent:P,__experimental__naiveDimensions:X},this.animate=new j,this.emitter=new D,this.dimensions=new K({wrapper:t,content:e,autoResize:H}),this.updateClassName(),this.userData={},this.time=0,this.velocity=this.lastVelocity=0,this.isLocked=!1,this.isStopped=!1,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new G(s,{touchMultiplier:f,wheelMultiplier:W}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName()}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:i=!1,lock:s=!1,duration:o=this.options.duration,easing:r=this.options.easing,lerp:u=this.options.lerp,onStart:p,onComplete:m,force:g=!1,programmatic:S=!0,userData:y={}}={}){if(!this.isStopped&&!this.isLocked||g){if(typeof t=="string"&&["top","left","start"].includes(t))t=0;else if(typeof t=="string"&&["bottom","right","end"].includes(t))t=this.limit;else{let l;if(typeof t=="string"?l=document.querySelector(t):t instanceof HTMLElement&&(t!=null&&t.nodeType)&&(l=t),l){if(this.options.wrapper!==window){const f=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?f.left:f.top}const w=l.getBoundingClientRect();t=(this.isHorizontal?w.left:w.top)+this.animatedScroll}}if(typeof t=="number"&&(t+=e,t=Math.round(t),this.options.infinite?S&&(this.targetScroll=this.animatedScroll=this.scroll):t=A(0,t,this.limit),t!==this.targetScroll)){if(this.userData=y,i)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),m==null||m(this),void(this.userData={});S||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:o,easing:r,lerp:u,onStart:()=>{s&&(this.isLocked=!0),this.isScrolling="smooth",p==null||p(this)},onUpdate:(l,w)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=l-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=l,this.setScroll(this.scroll),S&&(this.targetScroll=l),w||this.emit(),w&&(this.reset(),this.emit(),m==null||m(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this.__preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextNativeScrollEvent})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(e,i){return(e%i+i)%i}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.updateClassName())}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.updateClassName())}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}}d.registerPlugin(O);const V=new J;V.on("scroll",O.update);d.ticker.add(n=>{V.raf(n*1e3)});d.ticker.lagSmoothing(0);class Q{constructor(t){this.container=t,this.landingContent=document.querySelector(".landing-content"),this.landingInfo=document.querySelector(".landing-info"),this.landingHeader=document.querySelector(".l-header"),this.lSpans=[...document.querySelectorAll(".landing-info span")],this.footer=document.querySelector(".l-footer"),this.newsletterForm=document.querySelector(".newsletter-form"),this.newsletterFormWrapper=document.querySelector(".newsletter-form-wrapper"),this.video=document.querySelector(".embed.is-1").querySelector("video"),this.video2=document.querySelector(".embed.is-2").querySelector("video"),this.init()}init(){this.newsletterForm.addEventListener("submit",()=>{setTimeout(()=>{this.video2.play(),this.displaySuccessMessage()},1500)}),this.initSplittingC(),this.initPageLoad(),this.initLinkHovers(),this.initLogoAnim()}initSplittingC(){const t=[...this.container.querySelectorAll("[split-target]")],e=$({target:t,by:"chars"});this.wordsC=this.container.querySelectorAll(".word"),this.wordsC.forEach(i=>{let s=document.createElement("span");s.classList.add("char-wrap"),i.parentNode.insertBefore(s,i),s.appendChild(i)}),this.chars=e.map(i=>i.chars),d.set(this.chars,{yPercent:120})}initLogoAnim(){const t=d.timeline({paused:!0,defaults:{ease:"expo.out"}});t.fromTo(this.landinglogo.querySelectorAll(".sh"),{fill:"transparent",opacity:0},{fill:"currentColor",opacity:1,duration:.5,ease:"expo.out"},"<").from(this.landinglogo.querySelectorAll(".sh"),{x:"-1ch",duration:1,ease:"expo.out"},"<"),this.landinglogo.addEventListener("mouseover",()=>{t.timeScale(1),t.play()}),this.landinglogo.addEventListener("mouseout",()=>{t.timeScale(1.25),t.reverse()})}initPageLoad(){const t=d.timeline();this.videoPlayed=!1,t.to(this.footer.querySelectorAll(".char"),{yPercent:0,duration:2,ease:"power4.out"}).to([this.landingHeader],{opacity:1,duration:2,ease:"expo.out"},"<"),this.video.addEventListener("timeupdate",()=>{Math.floor(this.video.currentTime)===5&&!this.videoPlayed&&d.to(this.newsletterForm,{opacity:1,duration:1}),this.video.currentTime===this.video.duration&&d.to(".embed.is-2",{opacity:1,duration:1})})}displaySuccessMessage(){d.timeline({defaults:{ease:"expo.out"}}).to(this.newsletterFormWrapper,{opacity:0,duration:1})}initLinkHovers(){document.querySelectorAll("[s-link]").forEach(e=>{const i=e.querySelectorAll(".char"),s=d.timeline({paused:!0});s.to(i,{yPercent:-100,duration:.5,ease:"power4.out",stagger:{amount:.1}}),e.addEventListener("mouseover",()=>{s.play()}),e.addEventListener("mouseout",()=>{s.reverse()})})}}new Q(document.querySelector(".page-wrapper"));