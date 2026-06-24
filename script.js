// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

// Disable custom cursor on touch devices
if(window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
        
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    // Interactive element hover effect for cursor
    const interactiveElements = document.querySelectorAll('a, .team-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                width: 60,
                height: 60,
                borderColor: "rgba(255, 0, 127, 0.8)",
                backgroundColor: "rgba(255, 0, 127, 0.1)",
                duration: 0.3
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                width: 40,
                height: 40,
                borderColor: "rgba(0, 210, 255, 0.5)",
                backgroundColor: "transparent",
                duration: 0.3
            });
        });
    });
}

// Initial Hero Animations
const tl = gsap.timeline();

tl.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.2
})
.from(".hero-subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.8")
.from(".scroll-indicator", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
}, "-=0.5");

// Parallax for Background Orbs
gsap.to(".orb-1", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".orb-2", {
    yPercent: -40,
    xPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Team Section Animations
gsap.from(".section-title", {
    scrollTrigger: {
        trigger: ".team-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Staggered reveal for team cards
const cards = gsap.utils.toArray('.team-card');

cards.forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        rotationX: -15,
        duration: 1,
        ease: "power3.out",
        delay: (i % 3) * 0.15 // Stagger based on column position approx
    });
});

// 3D Tilt Effect on Cards + Dynamic Glow
if(window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll('.card-inner').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Dynamic glow following mouse
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
            // fade out glow on leave
            card.style.setProperty('--mouse-x', `-1000px`);
            card.style.setProperty('--mouse-y', `-1000px`);
        });
    });
}
