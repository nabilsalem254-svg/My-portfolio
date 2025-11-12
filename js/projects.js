
document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");
    if (projectCards.length > 0) {
        const projectObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        projectObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        );
        projectCards.forEach((card) => projectObserver.observe(card));
    }

    const filterButtons = document.querySelectorAll(".project-filter-btn");
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                
                const filterValue = button.getAttribute("data-filter");
                filterProjects(filterValue);
            });
        });
    }
    function filterProjects(filter) {
        const projects = document.querySelectorAll(".project-card");
        projects.forEach(project => {
            if (filter === "all" || project.classList.contains(filter)) {
                project.style.display = "block";
                void project.offsetWidth;
                project.classList.add("visible");
            } else {
                project.style.display = "none";
                project.classList.remove("visible");
            }
        });
    }

    const projectModals = document.querySelectorAll(".project-modal");
    const modalTriggers = document.querySelectorAll("[data-project-modal]");
    const modalCloseBtns = document.querySelectorAll(".modal-close");

    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute("data-project-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".project-modal");
            if (modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    projectModals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });
});
