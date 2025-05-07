// Initialize AOS
AOS.init({
    duration: 1000,
    offset: 100,
    once: true
});

// Initialize Swiper
const swiper = new Swiper('.mySwiper', {
    effect: 'fade',
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    fadeEffect: {
        crossFade: true
    }
});

// Create floating chickens and eggs
function createFloatingElement(type) {
    const element = document.createElement('div');
    element.className = `floating-${type}`;
    element.textContent = type === 'chicken' ? '🐔' : '🥚';
    
    // Random position within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const randomX = Math.random() * viewportWidth;
    const randomY = Math.random() * viewportHeight;
    
    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
    element.style.animationDuration = `${8 + Math.random() * 4}s`;
    element.style.animationDelay = `${Math.random() * 5}s`;
    
    document.querySelector('.floating-chickens').appendChild(element);
    
    // Remove element after animation completes
    element.addEventListener('animationend', () => {
        element.remove();
        // Create new element to maintain constant number
        createFloatingElement(type);
    });
}

// Create initial floating elements
function initializeFloatingElements() {
    const container = document.querySelector('.floating-chickens');
    container.innerHTML = ''; // Clear existing elements
    
    // Create more elements
    for (let i = 0; i < 5; i++) {
        createFloatingElement('chicken');
        createFloatingElement('egg');
    }
}

// Initialize floating elements
initializeFloatingElements();

// Reinitialize on window resize
window.addEventListener('resize', () => {
    initializeFloatingElements();
});

// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    hero.style.backgroundPositionY = `${scroll * 0.5}px`;
});

// Add hover effect to cards
document.querySelectorAll('.info-card, .fun-fact-box').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to social buttons
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});

// Add random chicken sounds on hover over floating chickens
const chickenSounds = [
    'https://www.soundjay.com/button/button-1.mp3',
    'https://www.soundjay.com/button/button-2.mp3',
    'https://www.soundjay.com/button/button-3.mp3'
];

document.querySelectorAll('.floating-chicken').forEach(chicken => {
    chicken.addEventListener('mouseenter', () => {
        const sound = new Audio(chickenSounds[Math.floor(Math.random() * chickenSounds.length)]);
        sound.volume = 0.2;
        sound.play();
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
}); 