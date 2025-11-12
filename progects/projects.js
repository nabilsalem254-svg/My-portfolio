
function initLoadingAnimation() {
        const loadingOverlay = document.getElementById('loadingOverlay');
    const percentageDisplay = document.querySelector('.loading-percentage');
    
    if (!loadingOverlay || !percentageDisplay) return;
    
    const CONFIG = {
        minDisplayTime: 6000, 
        animationDuration: 6000, 
        updateInterval: 30,  
        fadeOutDuration: 500   
    };
    
    const steps = CONFIG.animationDuration / CONFIG.updateInterval;
    const increment = 100 / steps;
    let progress = 0;
    const startTime = performance.now();
    
    function updateProgress() {
        const elapsed = performance.now() - startTime;
        progress = Math.min(progress + increment, 100);
        const roundedProgress = Math.round(progress);
        
        requestAnimationFrame(() => {
            percentageDisplay.textContent = roundedProgress;
        });
        
        if (elapsed >= CONFIG.minDisplayTime && progress >= 100) {
            hideLoadingScreen();
            return false;
        }
        return true; 
    }
    
    function hideLoadingScreen() {
        clearInterval(loadingInterval);
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            window.removeEventListener('resize', handleResize);
        }, CONFIG.fadeOutDuration);
    }
    
    function handleResize() {
    }
    
    let loadingInterval = setInterval(() => {
        const shouldContinue = updateProgress();
        if (!shouldContinue) clearInterval(loadingInterval);
    }, CONFIG.updateInterval);
    
    window.addEventListener('resize', handleResize);
    
    window.addEventListener('error', () => {
        setTimeout(hideLoadingScreen, CONFIG.minDisplayTime);
    });
    
    setTimeout(hideLoadingScreen, CONFIG.minDisplayTime + 1000);
}

function createBackgroundEffects() {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const hero = document.querySelector('.egyptian-hero');
    if (!hero) return;

    if (isMobile || reducedMotion) {
        hero.style.background = '#0f0c29';
        return;
    }

    const gridBg = document.createElement('div');
    gridBg.className = 'grid-bg';
    hero.prepend(gridBg);

    const liquid = document.createElement('div');
    liquid.className = 'liquid-shape liquid-1';
    hero.appendChild(liquid);
    
    return () => {
        hero.style.willChange = 'auto';
    };
}

function initPage() {
    initLoadingAnimation();
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        createBackgroundEffects();
    }
    setTimeout(() => {
        initNavbarScroll();
        initSmoothScrolling();
        displayProjects();
        document.addEventListener('click', handleProjectClicks);
    }, 500); // Short delay to ensure loading animation starts
}

document.addEventListener('DOMContentLoaded', () => {
    initPage();
    initNavbarScroll();
    initSmoothScrolling();
    displayProjects();
});

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('data-bs-toggle') || this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }
            }
        });
    });
}


const projects = [
    {
        id: 1,
        title: "API-based Content Management System",
        description: "A comprehensive platform for managing and displaying dynamic data using an API with an interactive user interface. The system excels in fetching and displaying data smoothly and quickly with instant updates. Developed using the latest web technologies to ensure high performance and ease of use.",
        image: "../Screenshot (114).png",
        technologies: ["API", "CSS3", "JavaScript", "HTML5", "Bootstrap", "Font Awesome"],
        demoUrl: "https://nabilsalem254-svg.github.io/Modern-Log-in/",
        sourceUrl: "https://nabilsalem254-svg.github.io/API/",
        duration: 3,
        durationText: "3 days of Development"
    },
    {
        id: 2,
        title: "Modern Login Interface",
        description: "A modern and responsive user interface for a login page that combines simplicity and security. Features an attractive design with smooth animations, input validation, and multiple login options. Developed with the latest web standards to ensure an exceptional user experience.",
        image: "../Screenshot (113).png",
        technologies: ["CSS3", "JavaScript", "Bootstrap", "HTML5", "Responsive Design"],
        demoUrl: "https://nabilsalem254-svg.github.io/Modern-Log-in/",
        sourceUrl: "https://nabilsalem254-svg.github.io/Modern-Log-in/",
        duration: 2,
        durationText: "2 days of Development"
    },
    {
        id: 3,
        title: "Product Management System",
        description: "An integrated platform for managing and displaying products with high professionalism. Allows users to easily add, modify, and delete products with instant preview. Features an intuitive and user-friendly interface with sorting, filtering, and product search capabilities. Developed to be responsive and efficient across all devices.",
        image: "../Screenshot (112).png",
        technologies: ["CSS3", "JavaScript", "HTML5", "Local Storage", "Responsive Design"],
        demoUrl: "https://nabilsalem254-svg.github.io/Product-form/",
        sourceUrl: "https://nabilsalem254-svg.github.io/Product-form/",
        duration: 4,
        durationText: "4 days of Development"
    },
    {
        id: 4,
        title: "Professional Software Company Template",
        description: "A modern and fully responsive landing page design for an integrated software company. Features an attractive user interface showcasing company services, team members, previous projects, and client testimonials. Includes multiple interactive sections such as: services showcase, portfolio, company statistics, and an integrated contact form. Developed with the latest web technologies to ensure high performance and ultra-fast loading speeds.",
        image: "../الشركه.png",
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Font Awesome", "jQuery", "Responsive Design"],
        demoUrl: "https://nabilsalem254-svg.github.io/MY-company/",
        sourceUrl: "https://nabilsalem254-svg.github.io/MY-company/",
        duration: 7,
        durationText: "5 days of Development"
    },
    {
        id: 5,
        title: "Luxury E-Commerce Platform",
        description: "A premium e-commerce platform offering a seamless shopping experience with a focus on luxury products. Features include a sophisticated product catalog, secure checkout process, customer accounts, order tracking, and personalized recommendations. The platform is built with a mobile-first approach, ensuring a flawless experience across all devices. Advanced search functionality, product filtering, and wishlist capabilities enhance user engagement and conversion rates.",
        image: "../المتجر.png",
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Font Awesome", "Responsive Design"],
        demoUrl: "https://nabilsalem254-svg.github.io/Market/",
        sourceUrl: "https://nabilsalem254-svg.github.io/Market/",
        duration: 6,
        durationText: "6 days of Development"
    }
];


const projectsGrid = document.getElementById('projectsGrid');
const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalBody = document.getElementById('projectModalBody');

document.addEventListener('DOMContentLoaded', () => {
    displayProjects();

    document.addEventListener('click', handleProjectClicks);
});

function displayProjects() {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="project-card card h-100">
                <img src="${project.image}" class="card-img-top project-img" alt="${project.title}">
                <div class="duration-overlay">
                    <div class="duration-overlay-content">
                        <i class="fas fa-clock fa-2x mb-2"></i>
                        <p class="mb-2">${project.durationText}</p>
                        <small class="d-block mb-3">${project.duration} days of work</small>
                        <button class="view-project" data-url="${project.sourceUrl}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><span class="duration-badge">${project.duration}day</span> ${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="technologies mb-3">
                        ${project.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


function handleProjectClicks(e) {
    // Find the closest view-project button that was clicked
    const viewButton = e.target.closest('.view-project');
    
    if (viewButton) {
        e.preventDefault();
        // Get the URL from the data-url attribute
        const projectUrl = viewButton.getAttribute('data-url');
        
        // Only redirect if the URL exists and is not '#'
        if (projectUrl && projectUrl !== '#') {
            window.open(projectUrl, '_blank');
        } else if (projectUrl === '#') {
            // If URL is '#', open the modal instead
            const projectId = parseInt(viewButton.getAttribute('data-id'));
            if (!isNaN(projectId)) {
                openProjectModal(projectId);
            }
        }
    }
}

function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    projectModalTitle.textContent = project.title;
    
    projectModalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${project.image}" alt="${project.title}" class="img-fluid rounded mb-3">
                <div class="d-flex flex-wrap gap-2 mb-3">
                    ${project.technologies.map(tech => 
                        `<span class="badge bg-primary">${tech}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="col-md-6">
                <h4>Project Overview</h4>
                <p>${project.description}</p>
                <div class="mt-4">
                    <a href="${project.demoUrl}" class="btn btn-primary me-2" target="_blank">
                        <i class="fas fa-external-link-alt me-1"></i> Live Demo
                    </a>
                    <a href="${project.sourceUrl}" class="btn btn-outline-secondary" target="_blank">
                        <i class="fab fa-github me-1"></i> Source Code
                    </a>
                </div>
            </div>
        </div>
    `;
    
    projectModal.show();
}
