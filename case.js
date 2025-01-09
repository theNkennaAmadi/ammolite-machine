import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Case{
    constructor(container) {
        this.container = container
        this.video = this.container.querySelector('#heroVideo');
        this.wrapper = container.querySelector('.work-visuals-wrapper');
        this.layouts = [...this.container.querySelectorAll('.layout-title')];
        this.visuals = [...this.container.querySelectorAll('.work-visual-c')];
        this.layoutStyles = [
            { name: 'Full Bleed', className: 'full-bleed' },
            { name: 'Partial Bleed', className: 'partial-bleed' },
            { name: '2 Column', className: 'col-2' },
            { name: '2 Column 3 Images', className: 'col-2-img-3' },
            { name: '2 Column 4 Images', className: 'col-2-img-4' },
            { name: '2 Column Offset', className: 'col-2-offset' },
            { name: '3 Column', className: 'col-3' },
            { name: '3 Photo Strip', className: 'col-3-alt' },
            { name: 'Collage', className: 'collage' },
        ];
        this.removeInvisibleVisuals();
        this.initLayouts();
        this.landinglogo = this.container.querySelector('.l-nav-logo');
        this.playText = this.container.querySelector('.playback-wrapper div:nth-child(1)');
        this.pauseText = this.container.querySelector('.playback-wrapper div:nth-child(2)');
        this.muteText = this.container.querySelector('.sound-wrapper div:nth-child(2)');
        this.unmuteText = this.container.querySelector('.sound-wrapper div:nth-child(1)');
        this.soundWrapper = this.container.querySelector('.sound-wrapper');
        this.playbackWrapper = this.container.querySelector('.playback-wrapper');
        this.durationWrapper = this.container.querySelector('.duration-wrapper');
        this.duration = this.container.querySelector('.duration');
        this.init()
    }

    init(){
        this.splitText()
        this.initLenis()
        this.initLinkHovers()
        this.setupVideoControls();
        this.setupEventListeners();
        this.setupTimelineNavigation();
        this.initLogoAnim();
        gsap.to('.main', {visibility: 'visible', opacity: 1})
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

    setupTimelineNavigation() {
        this.durationWrapper.addEventListener('click', (event) => {
            const rect = this.durationWrapper.getBoundingClientRect();
            const clickPosition = event.clientX - rect.left;
            const percentageClicked = clickPosition / rect.width;
            const newTime = this.video.duration * percentageClicked;

            this.video.currentTime = newTime;

            // If the video is paused, you might want to start playing it
            if (this.video.paused) {
                this.video.play()
            }
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

    removeInvisibleVisuals() {
        this.visuals = this.visuals.filter(visual => {
            const workImg = visual.querySelector('.work-img');
            const workVideo = visual.querySelector('.work-video');

            const isImgInvisible = workImg && workImg.classList.contains('w-condition-invisible');
            const isVideoInvisible = workVideo && workVideo.classList.contains('w-condition-invisible');

            if (isImgInvisible) {
                workImg.remove()
            }
            if (isVideoInvisible) {
                workVideo.remove()
            }


            if (isImgInvisible && isVideoInvisible) {
                visual.remove();
                return false;
            }
            return true;
        });
    }

    initLayouts() {
        let isFirstLayoutAdded = false;

        this.layouts.forEach((layout) => {
            const layoutName = layout.textContent;

            if (!layoutName || this.visuals.length === 0) {
                return;
            }

            const layoutStyle = this.layoutStyles.find(style => style.name === layoutName);
            const wrapper = document.createElement('div');

            if (layoutStyle) {
                const className = layoutStyle.className;
                wrapper.className = `work-visual-grid ${className}`;

                this.addVisualsToWrapper(wrapper, layoutName);

                if (wrapper.hasChildNodes()) {
                    this.wrapper.appendChild(wrapper);

                    if (!isFirstLayoutAdded) {
                        isFirstLayoutAdded = true;
                    }
                }
            } else {
                console.warn(`No layout style found for ${layoutName}`);
            }
        });

        if (this.visuals.length > 0) {
            this.visuals.forEach(visual => {
                const defaultWrapper = document.createElement('div');
                defaultWrapper.className = 'work-visual-grid';
                defaultWrapper.appendChild(visual);
                this.wrapper.appendChild(defaultWrapper);
            });
        }

        this.visualReveal();
    }

    addVisualsToWrapper(wrapper, layoutName) {
        const visualCounts = {
            'Full Bleed': 1,
            'Partial Bleed': 1,
            '2 Column': 2,
            '2 Column 3 Images': 3,
            '2 Column 4 Images': 4,
            '2 Column Offset': 2,
            '3 Column': 3,
            '3 Photo Strip': 3,
            'Collage': 5
        };

        const count = visualCounts[layoutName] || 0;
        for (let i = 0; i < count && this.visuals.length > 0; i++) {
            wrapper.appendChild(this.visuals.shift());
        }
    }

    visualReveal(){
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const intersecting = entry.isIntersecting
                if(intersecting){
                    gsap.from(entry.target.querySelectorAll('.work-visual-c'), {opacity:0, duration: 2, ease: 'expo.inOut'})
                    observer.unobserve(entry.target)
                }
            })
        })

        this.container.querySelectorAll(".work-visual-grid").forEach((visual) => {
            observer.observe(visual)
        })
    }

    setupVideoControls() {
        // Set initial states

        // Ensure video starts with autoplay and muted
        this.video.autoplay = true;
        this.video.muted = true;
    }

    setupEventListeners() {
        this.playbackWrapper.addEventListener('click', () => this.togglePlayPause());
        this.soundWrapper.addEventListener('click', () => this.toggleMute());
        this.video.addEventListener('play', () => this.onVideoPlay());
        this.video.addEventListener('pause', () => this.onVideoPause());
        this.video.addEventListener('timeupdate', () => this.updateDuration());
    }

    togglePlayPause() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    toggleMute() {
        this.video.muted = !this.video.muted;
        this.animateMuteUI();
    }

    onVideoPlay() {
        this.animatePlayPauseUI(true);
    }

    onVideoPause() {
        this.animatePlayPauseUI(false);
    }

    animatePlayPauseUI(isPlaying) {
        gsap.to(this.playText, {
            yPercent: isPlaying ? -110 : 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
        gsap.to(this.pauseText, {
            yPercent: isPlaying ? -110 : 110,
            duration: 0.3,
            ease: "power2.inOut"
        });
    }

    animateMuteUI() {
        gsap.to(this.unmuteText, {
            yPercent: this.video.muted ? 0 : -110,
            duration: 0.3,
            ease: "power2.inOut"
        });
        gsap.to(this.muteText, {
            yPercent: this.video.muted ? 110 : -110,
            duration: 0.3,
            ease: "power2.inOut"
        });
    }

    updateDuration() {
        const progress = this.video.currentTime / this.video.duration;
        gsap.to(this.duration, {
            width: progress * 100 + '%',
            duration: 0.1,
            ease: "none"
        });
    }

    setupTimelineNavigation() {
        this.durationWrapper.addEventListener('click', (event) => {
            const rect = this.durationWrapper.getBoundingClientRect();
            const clickPosition = event.clientX - rect.left;
            const percentageClicked = clickPosition / rect.width;
            const newTime = this.video.duration * percentageClicked;

            this.video.currentTime = newTime;
        });

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


}


new Case(document.querySelector('.page-wrapper'))
