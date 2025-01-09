import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Contact{
    constructor(container) {
        this.container = container
        this.contactLine = this.container.querySelectorAll('.contact-line')
        this.textFields = this.container.querySelectorAll('.text-field')
        this.socialLine = this.container.querySelectorAll('.social-line')
        this.socialBlocks = this.container.querySelectorAll('.social-block')
        this.landinglogo = this.container.querySelector('.l-nav-logo');
        this.init()
        console.log('hello')
    }

    init(){
        this.splitText()
        this.initLenis()
        this.lineReveal()
        this.initLinkHovers()
        this.socialReveal()
        this.initTextArea()
        this.initLogoAnim();
        gsap.to('.main', {visibility: 'visible', opacity: 1})
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


    lineReveal(){
        const duration = 2.5
        const stagger = 0.3
        gsap.from(this.contactLine, {clipPath: 'inset(0% 100% 0% 0%)', duration: duration, stagger: stagger, ease: 'expo.out'})
        gsap.from(this.textFields, {clipPath: 'inset(0% 100% 0% 0%)', duration: duration, stagger: stagger, ease: 'expo.out'})
        gsap.from(this.socialLine, {clipPath: 'inset(0% 100% 0% 0%)', duration: duration, stagger: stagger, ease: 'expo.out', onComplete: ()=> {}})


    }

    socialReveal(){
        this.socialBlocks.forEach(line => {
            const lineText = line.querySelectorAll('.char')
            const tl = gsap.timeline({paused: true});
            tl.fromTo(lineText,{yPercent: 0},  {yPercent: -100, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            line.addEventListener('mouseover', () => {
                tl.play()
            });

            line.addEventListener('mouseout', () => {
                tl.reverse()
            });
        })

        const locationText =this.container.querySelectorAll('.grey')
        locationText.forEach(text=>{
                const lineText = text.querySelectorAll('.char')
                const tl = gsap.timeline({paused: true});
                tl.fromTo(lineText, {yPercent:0}, {yPercent: -100, duration: 0.8, ease: 'power4.out', stagger: {amount: 0.15}});
                text.addEventListener('mouseover', () => {
                    tl.play()
                });

                text.addEventListener('mouseout', () => {
                    tl.reverse()
                });
        })
        /*
        const addText = this.container.querySelector('.grey').querySelectorAll('.char')
        const tl2 = gsap.timeline({paused: true});
        tl2.to(addText, {yPercent: -100, duration: 0.8, ease: 'power4.out', stagger: {amount: 0.15}})
        this.container.querySelector('.grey').addEventListener('mouseover', () => {
            tl2.play()
        })
        this.container.querySelector('.grey').addEventListener('mouseout', () => {
            tl2.reverse()
        })

         */
    }

    initLinkHovers(){
        const links = document.querySelectorAll('[s-link]');
        links.forEach(link => {
            const linkText = link.querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.fromTo(linkText, {yPercent:0}, {yPercent: -100, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.reverse()
            });
        });

        let mm = gsap.matchMedia();
        const mobMenu = this.container.querySelector('.mob-menu');
        let menuOpen = false;
        mm.add("(max-width: 479px)", () => {
            const toggleMenu = () => {
                menuOpen ? gsap.to('.nav-main-links-wrapper', {opacity: 0}) : gsap.to('.nav-main-links-wrapper', {opacity: 1});
                menuOpen = !menuOpen;
            };

            mobMenu.addEventListener('click', toggleMenu);

            return () => {
                if(!menuOpen){
                    mobMenu.click()
                }
                mobMenu.removeEventListener('click', toggleMenu);
            };
        });

    }

    initTextArea(){
        const textarea = this.container.querySelector('.auto-resize-textarea');

        // Function to adjust height
        function adjustHeight() {
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto';

            // Set the height to match the content
            textarea.style.height = textarea.scrollHeight + 'px';
        }

        // Add event listeners
        textarea.addEventListener('input', adjustHeight);
        textarea.addEventListener('focus', adjustHeight);

        // Initial height adjustment
        adjustHeight();

        // Adjust height on window resize
        window.addEventListener('resize', adjustHeight);
    }

}


new Contact(document.querySelector('.page-wrapper'))
