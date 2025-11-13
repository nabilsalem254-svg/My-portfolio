document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close button has been removed as requested
    
    // Toggle mobile menu
    function toggleMenu() {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true' || false;
        
        if (!isExpanded) {
            // Opening menu
            document.body.classList.add('menu-open');
            navbarCollapse.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
            navbarToggler.classList.add('active');
        } else {
            // Closing menu
            document.body.classList.remove('menu-open');
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.classList.remove('active');
        }
    }
    
    // Event listeners
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Close menu handler removed
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 992) return;
        
        if (navbarCollapse.classList.contains('show') && 
            !navbarCollapse.contains(e.target) && 
            !navbarToggler.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
        
        // Reset menu on larger screens
        if (window.innerWidth > 992) {
            document.body.classList.remove('menu-open');
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.classList.remove('active');
        }
    });
    
    // Prevent Bootstrap from interfering with our custom menu
    const bootstrapCollapse = document.querySelector('.navbar-collapse');
    if (bootstrapCollapse) {
        bootstrapCollapse.addEventListener('show.bs.collapse', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
            }
        });
    }
});
