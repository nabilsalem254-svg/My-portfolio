document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const closeMenu = document.createElement('button');
    
    // Create close button
    closeMenu.className = 'close-menu';
    closeMenu.innerHTML = '&times;';
    closeMenu.setAttribute('aria-label', 'Close menu');
    
    // Add close button after navbar collapse
    if (navbarCollapse) {
        navbarCollapse.parentNode.insertBefore(closeMenu, navbarCollapse.nextSibling);
    }
    
    // Toggle mobile menu
    function toggleMenu() {
        document.body.classList.toggle('menu-open');
        navbarCollapse.classList.toggle('show');
        
        // Toggle aria-expanded attribute
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true' || false;
        navbarToggler.setAttribute('aria-expanded', !isExpanded);
    }
    
    // Event listeners
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            toggleMenu();
        });
    }
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && 
            !navbarToggler.contains(e.target) && 
            navbarCollapse.classList.contains('show')) {
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
        }
    });
});
