document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Language switching
    function switchLanguage(lang) {
        // Update HTML dir attribute
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update active button
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all translatable elements
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (element.dataset[lang]) {
                element.textContent = element.dataset[lang];
            }
        });
        
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Initialize language from localStorage or browser language
    function initLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
        const defaultLang = savedLang || browserLang;
        switchLanguage(defaultLang);
    }
    
    // Add click event for language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            switchLanguage(lang);
        });
    });
    
    // Initialize language
    initLanguage();

    // Toggle sidebar function
    function toggleSidebar() {
        const isOpen = sidebarNav.classList.contains('active');
        
        if (!isOpen) {
            // Opening sidebar
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            sidebarNav.classList.add('active');
            setTimeout(() => {
                sidebarOverlay.classList.add('active');
            }, 10);
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            // Closing sidebar
            closeSidebar();
        }
    }

    // Close sidebar function
    function closeSidebar() {
        document.body.style.overflow = ''; // Re-enable scrolling
        sidebarOverlay.classList.remove('active');
        sidebarNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle sidebar when menu button is clicked
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // Close sidebar when close button is clicked
    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            closeSidebar();
        });
    }

    // Close sidebar when clicking on overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }

    // Close sidebar when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarNav.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Handle window resize
    function handleResize() {
        // Close sidebar if window is resized to desktop size
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    }

    // Add debounce to resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
});
