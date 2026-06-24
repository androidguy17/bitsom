document.addEventListener("DOMContentLoaded", () => {

    // Sport Selector Logic
    const tabs = document.querySelectorAll('.sport-tab');
    const sportNameEl = document.getElementById('sportName');
    const equipNameEl = document.getElementById('equipName');
    const mainImgEl = document.getElementById('sportMainImage');

    const sportData = {
        football: {
            name: 'Football',
            equip: 'FIFA Quality Pro Match Ball',
            img: 'assets/arena_football.png'
        },
        basketball: {
            name: 'Basketball',
            equip: 'Official Indoor Leather Game Ball',
            img: 'assets/arena_basketball.png'
        },
        tennis: {
            name: 'Tennis',
            equip: 'Pro Tour Extra Duty Tennis Balls (3-can)',
            img: 'assets/arena_tennis.png'
        },
        tabletennis: {
            name: 'Table Tennis',
            equip: 'Carbon Fiber Competition Paddle',
            img: 'assets/arena_tabletennis.png'
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked
            tab.classList.add('active');

            // Update content
            const sportKey = tab.getAttribute('data-sport');
            const data = sportData[sportKey];

            // Animate image transition
            mainImgEl.style.opacity = 0;
            
            setTimeout(() => {
                sportNameEl.textContent = data.name;
                equipNameEl.textContent = data.equip;
                mainImgEl.src = data.img;
                mainImgEl.style.opacity = 1;
            }, 300);
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Initial Reveal
    gsap.from(".gs-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.from(".gs-reveal-right", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
    });

    // Scroll Reveals
    const revealElements = document.querySelectorAll(".gs-reveal-up");
    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });
});
