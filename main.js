import {gsap} from "gsap";
import Lenis from "lenis";
import Splitting from "splitting";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis Initialization
 *
 */


const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

class LandingPage{
    constructor(container){
        this.container = container;
        this.landingContent = document.querySelector('.landing-content');
        this.landingInfo  = document.querySelector('.landing-info');
        this.landingHeader = document.querySelector('.l-header');
        this.lSpans =[...document.querySelectorAll('.landing-info span')];
        this.footer = document.querySelector('.l-footer');
        this.texts = document.querySelectorAll('.am-text div');
        this.newsletterForm = document.querySelector('.newsletter-form');
        this.init();
    }

    init(){
        this.newsletterForm.addEventListener('submit', (e) => {
            setTimeout(()=>{
                this.displaySuccessMessage();
            }, 3000)
        });
        this.initSplittingC()
        this.initPageLoad();
        this.initLinkHovers();
    }

    initSplittingC() {
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
    }

    initPageLoad(){
        const tl = gsap.timeline();
        tl.to(this.footer.querySelectorAll('.char'), {yPercent: 0, duration: 2, ease: 'power4.out'})
            .to([this.landingContent, this.landingHeader], {opacity: 1, duration: 2, ease: 'expo.out'}, "<")


        const duration = 1; // Duration for each fade in/out
        const delay = 1; // Delay before fading to the next text

        const timeline = gsap.timeline({repeat: -1});

        this.texts.forEach((text, index) => {
            const nextIndex = (index + 1) % this.texts.length;
            timeline.to(text, {opacity: 1, duration: duration})
                .to(text, {opacity: 0, duration: duration}, `+=${delay}`)
                .set(this.texts[nextIndex], {opacity: 0}, `+=${delay - duration}`);
        });
    }


    displaySuccessMessage(){
        const tl2 = gsap.timeline({defaults: {ease: 'expo.out'}});
        tl2.to(this.landingContent, {opacity: 0, duration: 0.5})
            .to(this.landingInfo, {opacity: 1, display: 'flex', duration: 0.5})
            .to(this.landingInfo.querySelectorAll('.char'), {yPercent: 0, duration: 2, ease: 'power4.out'})
            .to(this.lSpans, {color: 'white', stagger: {each: 0.2, from: 'start'}, ease: 'expo.out'});
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
}

new LandingPage(document.querySelector('.page-wrapper'));