
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.hero-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const typed = new Typed('.typing', {
    strings: [
        'I\'M A FRONT-END',
        'I\'M A WEB DESIGNER',
        'I\'M A UI/UX ENTHUSIAST'
    ],
    typeSpeed: 40,          
    backSpeed: 30,          
    startDelay: 500,        
    backDelay: 1500,     
    loop: true,           
    showCursor: false,      
    cursorChar: '',       
    smartBackspace: true,   
    shuffle: false,         
    fadeOut: false,         
    contentType: 'text',
    onStringTyped: function() {
    
        return new Promise(resolve => setTimeout(resolve, 800));
    },
    preStringTyped: function() {
        
        return new Promise(resolve => setTimeout(resolve, 200));
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});
