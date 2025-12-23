/**
 * SaaSPro X - Main JavaScript
 * Premium Dark Theme Template
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initPreloader();
    initNavbar();
    initParticles();
    initAnimations();
    initCounters();
    initTestimonials();
    initThemeToggle();
    initBackToTop();
    initScrollSpy();
    initSmoothScroll();
    initContactForm();
    initThemeToggle();
    initVideoDemo();
    
    console.log('🚀 SaaSPro X loaded successfully!');
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking on nav links (only on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only auto-close on mobile screens
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
                
                // Update active state
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    });
}

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6366f1"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6366f1",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .solution-card').forEach(el => {
        observer.observe(el);
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    // Start counter animation after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                let count = 0;
                const speed = 2000 / target; // Adjust speed based on target
                
                const updateCounter = () => {
                    if (count < target) {
                        count++;
                        counter.innerText = count;
                        setTimeout(updateCounter, speed);
                    }
                };
                
                updateCounter();
            });
        }, 300); // Small delay to ensure everything is ready
    });
}

// Testimonials Slider
function initTestimonials() {
    // Simple testimonial hover effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn?.querySelector('i');
    
    if (!themeBtn || !icon) return;
}

// Back to Top
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Scroll Spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Pricing Toggle Functionality
function initPricingToggle() {
    const monthlyRadio = document.getElementById('monthly');
    const yearlyRadio = document.getElementById('yearly');
    const priceAmounts = document.querySelectorAll('.pricing-price .amount');
    const saveBadges = document.querySelectorAll('.pricing-save');
    const periodElements = document.querySelectorAll('.period');
    
    if (monthlyRadio && yearlyRadio) {
        // Monthly toggle
        monthlyRadio.addEventListener('change', () => {
            if (monthlyRadio.checked) {
                priceAmounts.forEach(amount => {
                    const monthlyPrice = amount.getAttribute('data-monthly');
                    amount.textContent = monthlyPrice;
                });
                periodElements.forEach(period => {
                    period.textContent = '/month';
                });
                saveBadges.forEach(badge => {
                    badge.classList.add('d-none');
                });
            }
        });
        
        // Yearly toggle
        yearlyRadio.addEventListener('change', () => {
            if (yearlyRadio.checked) {
                priceAmounts.forEach(amount => {
                    const yearlyPrice = amount.getAttribute('data-yearly');
                    amount.textContent = yearlyPrice;
                });
                periodElements.forEach(period => {
                    period.textContent = '/year';
                });
                saveBadges.forEach(badge => {
                    badge.classList.remove('d-none');
                });
            }
        });
        
        // Add click events to labels for better mobile compatibility
        document.querySelectorAll('.pricing-toggle .btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const inputId = this.getAttribute('for');
                const input = document.getElementById(inputId);
                
                if (input) {
                    input.checked = true;
                    
                    // Trigger the change event
                    const event = new Event('change');
                    input.dispatchEvent(event);
                }
            });
        });
    }
}

// Initialize pricing toggle
initPricingToggle();

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const sendAnotherBtn = document.getElementById('sendAnother');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    
    if (!contactForm) return;
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (optional)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    // Real-time validation
    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('change', function() {
            validateField(this);
        });
    });
    
    // Custom validation for select dropdown
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            validateField(this);
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitText = submitBtn.querySelector('.submit-text');
            const spinner = submitBtn.querySelector('.spinner-border');
            
            submitText.classList.add('d-none');
            spinner.classList.remove('d-none');
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide form, show success message
                contactForm.classList.add('d-none');
                successMessage.classList.remove('d-none');
                
                // Reset button state
                submitText.classList.remove('d-none');
                spinner.classList.add('d-none');
                submitBtn.disabled = false;
                
                // Reset form
                contactForm.reset();
                contactForm.querySelectorAll('.is-invalid').forEach(el => {
                    el.classList.remove('is-invalid');
                });
                
                // Reset custom dropdown
                if (subjectSelect) {
                    subjectSelect.selectedIndex = 0;
                }
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                firstError.focus();
            }
        }
    });
    
    // Send another message button
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            successMessage.classList.add('d-none');
            contactForm.classList.remove('d-none');
        });
    }
    
    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        const fieldType = field.type;
        const fieldId = field.id;
        const fieldTag = field.tagName.toLowerCase();
        
        // Clear previous validation
        field.classList.remove('is-invalid');
        
        // Check required fields
        if (isRequired && !value) {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Special handling for select dropdown
        if (fieldTag === 'select' && isRequired && (!value || value === '')) {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value && !emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Phone validation (optional)
        if (fieldId === 'phone' && value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Message length validation
        if (fieldId === 'message' && value && value.length < 10) {
            field.classList.add('is-invalid');
            return false;
        }
        
        return true;
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
}


// Simple Smooth Scroll Fix
function initSmoothScroll() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight + 20; // Navbar height + 20px extra
    
    // For all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Scroll to target minus navbar height
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (window.innerWidth < 992) {
                    const mobileMenu = document.querySelector('.navbar-collapse.show');
                    if (mobileMenu) {
                        const bsCollapse = bootstrap.Collapse.getInstance(mobileMenu);
                        if (bsCollapse) bsCollapse.hide();
                    }
                }
            }
        });
    });
}


function initVideoDemo() {
    const videoContainer = document.getElementById('demoVideo');
    const videoPlaceholder = videoContainer?.querySelector('.video-placeholder');
    const videoIframeContainer = videoContainer?.querySelector('.video-iframe-container');
    const closeVideoBtn = videoContainer?.querySelector('.close-video');
    const videoElement = videoContainer?.querySelector('.video-iframe');
    
    if (!videoContainer || !videoPlaceholder || !videoIframeContainer) return;
    
    // Show video when placeholder clicked
    videoPlaceholder.addEventListener('click', function() {
        videoPlaceholder.style.display = 'none';
        videoIframeContainer.style.display = 'block';
        
        // Start video playback
        if (videoElement) {
            videoElement.play().catch(e => {
                console.log("Autoplay prevented:", e);
                // Show play button if autoplay is blocked
                videoElement.controls = true;
            });
        }
    });
    
    // Close video when close button clicked
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            videoIframeContainer.style.display = 'none';
            videoPlaceholder.style.display = 'block';
            
            // Pause video
            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        });
    }
    
    // Close video with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoIframeContainer.style.display === 'block') {
            videoIframeContainer.style.display = 'none';
            videoPlaceholder.style.display = 'block';
            if (videoElement) {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initVideoDemo();
});


// Initialize smooth scroll
initSmoothScroll();