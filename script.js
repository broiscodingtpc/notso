// Initialize AOS with mobile-specific settings
AOS.init({
    duration: 800,
    offset: 50,
    once: true,
    disable: 'mobile' // Disable on mobile for better performance
});

// Initialize Swiper with mobile-specific settings
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
    },
    // Mobile-specific settings
    slidesPerView: 1,
    spaceBetween: 0,
    touchRatio: 1,
    touchAngle: 45,
    resistance: true,
    resistanceRatio: 0.85
});

// Create floating chickens and eggs with mobile optimization
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
    
    // Adjust animation duration based on screen size
    const isMobile = window.innerWidth <= 768;
    const baseDuration = isMobile ? 6 : 8;
    element.style.animationDuration = `${baseDuration + Math.random() * 4}s`;
    element.style.animationDelay = `${Math.random() * 5}s`;
    
    document.querySelector('.floating-chickens').appendChild(element);
    
    // Remove element after animation completes
    element.addEventListener('animationend', () => {
        element.remove();
        // Create new element to maintain constant number
        createFloatingElement(type);
    });
}

// Create initial floating elements with mobile optimization
function initializeFloatingElements() {
    const container = document.querySelector('.floating-chickens');
    container.innerHTML = ''; // Clear existing elements
    
    // Adjust number of elements based on screen size
    const isMobile = window.innerWidth <= 768;
    const elementCount = isMobile ? 3 : 5;
    
    for (let i = 0; i < elementCount; i++) {
        createFloatingElement('chicken');
        createFloatingElement('egg');
    }
}

// Initialize floating elements
initializeFloatingElements();

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Reinitialize on window resize with debounce
window.addEventListener('resize', debounce(() => {
    initializeFloatingElements();
}, 250));

// Mobile menu toggle with improved touch handling
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
let touchStartX = 0;
let touchEndX = 0;

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Add touch swipe support for mobile menu
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - close menu
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - open menu
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links with mobile optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Navbar scroll effect with mobile optimization
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
const scrollThreshold = 50;

window.addEventListener('scroll', debounce(() => {
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
}, 100));

// Parallax effect for hero section with mobile optimization
const hero = document.querySelector('.hero');
window.addEventListener('scroll', debounce(() => {
    const scroll = window.pageYOffset;
    const isMobile = window.innerWidth <= 768;
    const parallaxFactor = isMobile ? 0.3 : 0.5;
    hero.style.backgroundPositionY = `${scroll * parallaxFactor}px`;
}, 100));

// Add hover effect to cards with touch support
document.querySelectorAll('.info-card, .fun-fact-box').forEach(card => {
    const handleHover = () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    };
    
    const handleLeave = () => {
        card.style.transform = 'translateY(0) scale(1)';
    };
    
    card.addEventListener('mouseenter', handleHover);
    card.addEventListener('mouseleave', handleLeave);
    card.addEventListener('touchstart', handleHover);
    card.addEventListener('touchend', handleLeave);
});

// Add click effect to social buttons with touch support
document.querySelectorAll('.social-button').forEach(button => {
    const handleClick = (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const y = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x - rect.left - size/2}px`;
        ripple.style.top = `${y - rect.top - size/2}px`;
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    };
    
    button.addEventListener('click', handleClick);
    button.addEventListener('touchstart', handleClick);
});

// Add random chicken sounds on hover/touch over floating chickens
const chickenSounds = [
    'https://www.soundjay.com/button/button-1.mp3',
    'https://www.soundjay.com/button/button-2.mp3',
    'https://www.soundjay.com/button/button-3.mp3'
];

document.querySelectorAll('.floating-chicken').forEach(chicken => {
    const playSound = () => {
        const sound = new Audio(chickenSounds[Math.floor(Math.random() * chickenSounds.length)]);
        sound.volume = 0.2;
        sound.play();
    };
    
    chicken.addEventListener('mouseenter', playSound);
    chicken.addEventListener('touchstart', playSound);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll progress indicator with mobile optimization
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', debounce(() => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
}, 100)); 