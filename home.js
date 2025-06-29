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
        gsap.to('.main', {visibility: 'visible', opacity: 1})
        gsap.to('.page-wrapper', {visibility: 'visible', opacity: 1})

        this.splitText()
        this.initLenis() // Initialize Lenis first
        this.initPageLoad() // Then check for video state
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
        this.lenis = new Lenis({ smooth: true });
        this.lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time)=>{
            this.lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
        this.lenis.scrollTo(0)
        this.lenis.stop();
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
            tllink.fromTo(linkText, {yPercent:0}, {yPercent: -100, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.reverse()
            });
        });

        const projects = document.querySelectorAll('.work-item-grid')
        projects.forEach(project=>{
            const linkText = project.querySelector('.work-header').querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.fromTo(linkText,{yPercent: 0}, {yPercent: -100, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            project.addEventListener('mouseover', () => {
                tllink.play()
            });

            project.addEventListener('mouseout', () => {
                tllink.reverse()
            });
        })

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
        this.videoInfoHidden = false; // Flag to ensure video info is only hidden once

        // Check if video has already been played in this session
        const videoAlreadyPlayed = sessionStorage.getItem('videoIntroPlayed') === 'true';

        if (videoAlreadyPlayed) {
            // Skip video intro and go straight to main content
            this.skipVideoIntro();
            return;
        }

        // Handle video errors (e.g., video cannot be played)
        this.video.addEventListener('error', () => {
            this.handleVideoFallback();
        });

        // Handle case where video cannot load or play
        this.video.addEventListener('loadstart', () => {
            // Set a timeout as fallback in case video doesn't load
            setTimeout(() => {
                if (this.video.readyState === 0 || this.video.paused) {
                    this.handleVideoFallback();
                }
            }, 3000); // Wait 3 seconds before falling back
        });

        this.video.addEventListener('timeupdate', () => {
            if (Math.floor(this.video.currentTime) === 4 && !this.videoInfoHidden){
                this.hideVideoInfoAndStartScroll();
            }
            if(this.video.currentTime === this.video.duration){
                console.log('video played')
                gsap.to('.embed.is-2', {opacity: 1, duration: 1})
            }
        });
    }

    hideVideoInfoAndStartScroll() {
        if (this.videoInfoHidden) return; // Prevent multiple calls

        this.videoInfoHidden = true;

        // Store the state in sessionStorage
        sessionStorage.setItem('videoIntroPlayed', 'true');

        gsap.to('.am-video-info', {opacity: 0, display: 'none', duration: 0.75});
        this.lenis.start();
    }

    handleVideoFallback() {
        if (this.videoInfoHidden) return; // Prevent multiple calls

        console.log('Video cannot be played, falling back to manual start');
        this.hideVideoInfoAndStartScroll();
    }

    skipVideoIntro() {
        // Immediately hide video info and start scroll without playing video
        gsap.set('.am-video-info', {opacity: 0, display: 'none'});
        gsap.set('.embed.is-1', {opacity: 0, display: 'none'}); // Hide first video
        gsap.set('.embed.is-2', {opacity: 1}); // Show second video immediately

        // Safety check to ensure lenis is initialized before calling start()
        if (this.lenis) {
            this.lenis.start();
        }

        this.videoInfoHidden = true;
        console.log('Skipped video intro - already played in this session');
    }

}


new Home(document.querySelector('.page-wrapper'))
