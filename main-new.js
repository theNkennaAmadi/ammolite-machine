import {gsap} from "gsap";
import Lenis from "lenis";
import Splitting from "splitting";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis Initialization
 *
 */

/*
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

 */

class Home{
    constructor(container) {
        this.container = container;
        this.video = this.container.querySelector('video');
        this.videoDetails = this.container.querySelector('.bg-video-details');
        this.playText = this.container.querySelector('.playback-wrapper div:nth-child(1)');
        this.pauseText = this.container.querySelector('.playback-wrapper div:nth-child(2)');
        this.muteText = this.container.querySelector('.sound-wrapper div:nth-child(2)');
        this.unmuteText = this.container.querySelector('.sound-wrapper div:nth-child(1)');
        this.soundWrapper = this.container.querySelector('.sound-wrapper');
        this.playbackWrapper = this.container.querySelector('.playback-wrapper');
        this.duration = this.container.querySelector('.duration');
        this.footer = this.container.querySelector('.l-footer');
        this.landingInfo  = this.container.querySelector('.landing-info');
        this.landinglogo = this.container.querySelector('.l-nav-logo');

        this.init()
    }

    init(){
        this.initSplitting();
        this.initLinkHovers();
        this.initLogoAnim();
        this.setupVideoControls();
        this.setupEventListeners();
        this.setupResponsiveBehavior();
        gsap.to('.page-wrapper', {opacity: 1, duration: 0.5} )
    }

    initSplitting() {
        //Initialize Splitting, split the text into characters and get the results
        const targets = [...this.container.querySelectorAll("[split-target]")];
        const results = Splitting({target: targets, by: "chars"});

        //Get all the words and wrap each word in a span
        this.wordsC = this.container.querySelectorAll(".word");
        this.wordsC.forEach((word) => {
            let wrapper = document.createElement("span");
            wrapper.classList.add("char-wrap");
            word.parentNode.insertBefore(wrapper, word);
            wrapper.appendChild(word);
        });

        //Get all the characters and move them off the screen
        this.chars = results.map((result) => result.chars);
        gsap.set(this.chars, {yPercent: 120});

        this.videoDetailsChars = this.videoDetails.querySelectorAll('.char');

        if (targets.length !== 0) {
            targets.forEach((title) => {
                if (!title.hasAttribute("no-ins")) {
                    const chars = title.querySelectorAll(".char");
                    gsap.fromTo(
                        chars,
                        {
                            "will-change": "transform",
                            transformOrigin: "0% 50%",
                            yPercent: 120,
                        },
                        {
                            duration: 2,
                            ease: "expo.out",
                            yPercent: 0,
                            scrollTrigger: {
                                trigger: title,
                                invalidateOnRefresh: true,
                                start: "top 95%",
                                end: "bottom bottom",
                                //scrub: true,
                                //markers: true
                            },
                        }
                    );
                }
            });
        }

        gsap.to(this.footer.querySelectorAll('.char'), {yPercent: 0, duration: 2, ease: 'power4.out'})
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

    initLinkHovers(){
        const links = document.querySelectorAll('[s-link]');
        links.forEach(link => {
            const linkText = link.querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.to(linkText, {yPercent: -100, duration: 0.5, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.reverse()
            });
        });

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

    setupResponsiveBehavior() {
        gsap.matchMedia().add("(min-width: 10px)", () => {
            this.setupHoverBehavior();
        });
    }

    setupHoverBehavior() {
        // Initially hide video details chars
        gsap.set(this.videoDetailsChars, { yPercent: 110 });

        // Show video details on hover
        this.video.addEventListener('mouseenter', () => {
            this.showVideoDetails();
            this.resetHideTimeout();
        });

        // Hide video details when mouse leaves
        this.video.addEventListener('mouseleave', () => {
            this.resetHideTimeout();
        });

        // Show video details when mouse moves
        this.video.addEventListener('mousemove', () => {
            this.showVideoDetails();
            this.resetHideTimeout();
        });

        this.resetHideTimeout();
    }

    showVideoDetails() {
        gsap.to(this.videoDetailsChars, {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
        });
    }

    hideVideoDetails() {
        gsap.to(this.videoDetailsChars, {
            yPercent: 110,
            duration: 1,
            ease: "power2.in",
        });
    }

    resetHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        this.hideTimeout = setTimeout(() => {
            this.hideVideoDetails();
        }, 4000);
    }
}

window.addEventListener('load', () => {
    new Home(document.querySelector('.page-wrapper'));
});
//new Home(document.querySelector('.page-wrapper'));