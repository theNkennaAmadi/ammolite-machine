import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Home{
    constructor(container) {
        this.container = container
        this.video = this.container.querySelector('.embed.is-1').querySelector('video');
        this.video2 = this.container.querySelector('.embed.is-2').querySelector('video');
        this.landinglogo = this.container.querySelector('.l-nav-logo');
        this.init()
    }

    init(){
        this.initPageLoad()
        gsap.to('.main', {visibility: 'visible', opacity: 1})
        gsap.to('.page-wrapper', {visibility: 'visible', opacity: 1})


        this.splitText()
        this.initLenis()
        this.initLinkHovers()
        this.initLinkHovers2()
        this.initLogoAnim();
    }

    initLogoAnim(){
        const tlM = gsap.timeline({paused:true,defaults: {ease: 'expo.out'}});
        tlM.fromTo(this.landinglogo.querySelectorAll('.sh'),{fill: 'transparent', opacity: 0}, {fill: 'currentColor', opacity: 1, duration: 0.5, ease: 'expo.out'}, "<")
            .from(this.landinglogo.querySelectorAll('.sh'), {x: '-1ch', duration: 1, ease: 'expo.out'}, "<")


        this.landinglogo.addEventListener('mouseover', () => {
            tlM.timeScale(1)
            tlM.play()
        })

        this.landinglogo.addEventListener('mouseout', () => {
            tlM.timeScale(1.25)
            tlM.reverse();
        })
    }

    initLenis(){
        const lenis = new Lenis({ smooth: true });
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time)=>{
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
    }

    splitText() {
        // Select all elements that need to be split
        let elementsToSplit = Array.from(this.container.querySelectorAll('h1:not([no-split]), h2:not([no-split]), h3:not([no-split]), p:not([no-split]), a:not([no-split]), label:not([no-split]) span:not([no-split]) blockquote:not([no-split])'));

        // Filter out elements that are descendants of other elements in the list
        this.elementsToSplit = elementsToSplit.filter(element => {
            return !elementsToSplit.some(otherElement => otherElement !== element && otherElement.contains(element));
        });


        this.elementsToSplit.forEach((element) => {

            const result = Splitting({
                target: element,
                by: 'chars'
            });

        });
        this.setupTextAnimations();
    }

    initLinkHovers(){
        const links = document.querySelectorAll('[s-link]');
        links.forEach(link => {
            const linkText = link.querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.fromTo(linkText,{yPercent:0}, {yPercent: -100, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.reverse()
            });
        });

    }

    initLinkHovers2(){
        const links = document.querySelectorAll('.home-menu-link');
        links.forEach(link => {
            const linkText = link.querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.fromTo(linkText, {yPercent:0}, {yPercent: -120, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.reverse()
            });
        });

    }

    setupTextAnimations() {
        this.elementsToSplit.forEach(element => {
            const chars = element.querySelectorAll('.char');
            const animationType = element.getAttribute('split-text');
            const noScroll = element.hasAttribute('no-scroll');

            if (!noScroll) {
                gsap.set(chars, {yPercent: 110, opacity: 0});
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: "top 92%",
                        end: "bottom bottom",
                        invalidateOnRefresh: true,
                    }
                });

                if (animationType === 'chars') {
                    tl.to(chars, {
                        yPercent: 0,
                        stagger: {
                            each: 0.05
                        },
                        opacity: 1,
                        ease: 'power4.inOut',
                        duration: 1,
                    });
                } else if (animationType === 'intro') {
                    //gsap.set(chars, {scale: 0})
                    tl.to(chars, {
                        yPercent: 0,
                        opacity: 1,
                        delay: 1,
                        //scale:1,
                        //ease: 'expo.out',
                        stagger: {
                            each: 0.05,
                            from: 'center',
                        }
                    })
                } else {
                    tl.to(chars, {
                        yPercent: 0,
                        opacity: 1,
                        ease: 'expo.out',
                        duration: 2
                    });
                }
            }
        });
    }

    initPageLoad(){
        this.videoPlayed = false;

        this.video.addEventListener('timeupdate', () => {
            if (Math.floor(this.video.currentTime) === 5 && !this.videoPlayed){
                //gsap.to(this.newsletterForm, {opacity: 1, duration: 1})
            }
            if (Math.floor(this.video.currentTime) === 3 ){
                //gsap.to(this.newsletterForm, {opacity: 1, duration: 1})

               // gsap.from('.home-line', {clipPath: 'inset(0% 100% 0% 0%)', duration: 2.5, ease: 'expo.out'})
                gsap.to('.home-menu-link', {opacity: 1, duration: 1, pointerEvents: 'auto'})

            }
            if(this.video.currentTime === this.video.duration){
                gsap.to('.embed.is-2', {opacity: 1, duration: 1})
            }
        });

        this.video.addEventListener('ended', () => {
            gsap.set('.embed.is-2', {opacity: 1, duration: 1})
            this.video2.play();
        });

    }

}


new Home(document.querySelector('.page-wrapper'))
