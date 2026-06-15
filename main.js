document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // STICKY HEADER SCROLL EFFECT
    // ==========================================================================
    const header = document.querySelector(".header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });

    // ==========================================================================
    // INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // bottom offset offset trigger
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // NATIVE MODALS LOGIC
    // ==========================================================================
    const modalTriggers = document.querySelectorAll(".footer-modal-trigger");
    const closeButtons = document.querySelectorAll("[data-close]");
    const modalOverlays = document.querySelectorAll(".modal-overlay");

    // Open Modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const targetId = trigger.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent background scroll
            }
        });
    });

    // Close Modal helper
    const closeModal = (modal) => {
        modal.classList.remove("active");
        
        // Re-enable scroll only if no other modal is active
        const activeModals = document.querySelectorAll(".modal-overlay.active");
        if (activeModals.length === 0) {
            document.body.style.overflow = "";
        }
    };

    // Close Modal via buttons
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-close");
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                closeModal(targetModal);
            }
        });
    });

    // Close Modal by clicking overlay backdrop
    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // Close Modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector(".modal-overlay.active");
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // ==========================================================================
    // SIMULATED INTERACTIVE MAP INTERACTIONS (Micro-animations)
    // ==========================================================================
    const mapPin = document.querySelector(".map-pin-marker");
    const mapCard = document.querySelector(".map-card");

    if (mapPin && mapCard) {
        mapPin.addEventListener("click", () => {
            // Trigger a quick pulse effect on click
            mapPin.style.animation = "none";
            // trigger reflow
            void mapPin.offsetWidth;
            mapPin.style.animation = "bounce 1s ease-in-out";
            
            // Add custom effect to the tooltip card
            mapCard.style.transform = "scale(1.05)";
            setTimeout(() => {
                mapCard.style.transform = "scale(1)";
            }, 300);
        });
    }

});
