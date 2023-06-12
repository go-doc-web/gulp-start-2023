// If you need scroll animations just uncomment
// В случае если нужны анимации при скролле разкомментировать

// gsap.registerPlugin(ScrollTrigger)
// Hero animations (TimeLine example)
const tl = gsap.timeline()
tl.fromTo(
    '.logo',
    {
        // y: -50,
        opacity: 0,
    },
    { opacity: 1, duration: 1 },
    0,
).fromTo(
    '.menu li',
    {
        y: -50,
        opacity: 0,
    },
    { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
    0.3,
)

// Scroll animation example
// animation element
gsap.to('.about__title', {
    scrollTrigger: {
        trigger: '.section__about', // trigger animation
        // start: "top bottom", // the default values
        // end: "bottom top",
        scrub: true,
    },
    yPercent: -40,
    ease: 'none',
})
