
// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-container .slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Initialize the first slide
if (slides.length > 0) {
    showSlide(currentSlide);
    // Auto-slide every 2 seconds
    setInterval(() => {
        changeSlide(1);
    }, 2000);
}

// Animation on scroll
const observerOptions = {
    threshold: 0,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!entry.target.dataset.animated) {
                entry.target.style.animationPlayState = 'running';
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-bounce').forEach(el => {
    observer.observe(el);
});

// Populate day options for date of birth
function populateDays() {
    const daySelect = document.getElementById('dob-day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
}

// Populate year options for date of birth
function populateYears() {
    const yearSelect = document.getElementById('dob-year');
    for (let i = 2010; i >= 1950; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// Auto-playing Slideshow
function initAutoSlideshow() {
    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slideshow
    startAutoSlide();

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
    slideshowContainer.addEventListener('mouseleave', startAutoSlide);
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    let currentImageIndex = 0;

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="" class="lightbox-image">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    // Show lightbox
    function showLightbox(index) {
        currentImageIndex = index;
        const img = galleryImages[index];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Hide lightbox
    function hideLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigate images
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showLightbox(currentImageIndex);
    }

    // Event listeners
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => showLightbox(index));
    });

    lightboxClose.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });

    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') hideLightbox();
            else if (e.key === 'ArrowLeft') showPrevImage();
            else if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

// Event Countdown Timers
function initEventCountdowns() {
    const eventDates = [
        new Date('2025-03-15T00:00:00'),
        new Date('2025-10-05T10:00:00'),
        new Date('2025-12-25T18:00:00'),
        new Date('2025-01-04T15:00:00') // First Saturday of January 2025
    ];

    const countdownElements = document.querySelectorAll('.countdown');

    function updateCountdowns() {
        countdownElements.forEach((element, index) => {
            const now = new Date().getTime();
            const distance = eventDates[index].getTime() - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                element.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                `;
            } else {
                element.innerHTML = '<span class="event-passed">Event Passed</span>';
            }
        });
    }

    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

// Animated Statistics Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    }

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countersInView = entry.target.querySelectorAll('.counter-number');
                countersInView.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stats-section').forEach(section => {
        observer.observe(section);
    });
}

// Form Validation and Feedback
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea, select');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        clearError({ target: field });

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (field.value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long.';
                }
                break;
            case 'phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number.';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
            case 'dob-day':
            case 'dob-month':
            case 'dob-year':
                if (!field.value) {
                    isValid = false;
                    errorMessage = 'This field is required.';
                }
                break;
            case 'reason':
                if (field.value.trim().length < 10) {
                    isValid = false;
                    errorMessage = 'Please provide at least 10 characters.';
                }
                break;
        }

        if (!isValid) {
            showError(field, errorMessage);
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    function clearError(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            form.appendChild(successMessage);

            // Reset form
            form.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Dynamic Gallery Loading
function initDynamicGallery() {
    const loadMoreButtons = document.querySelectorAll('.load-more-btn');

    loadMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryGrid = this.previousElementSibling;
            const hiddenImages = galleryGrid.querySelectorAll('img[style*="display: none"]');

            // Show next 8 images (or all remaining if less than 8)
            const imagesToShow = Math.min(8, hiddenImages.length);
            for (let i = 0; i < imagesToShow; i++) {
                hiddenImages[i].style.display = 'block';
            }

            // Hide button if no more images to show
            if (galleryGrid.querySelectorAll('img[style*="display: none"]').length === 0) {
                this.style.display = 'none';
            }
        });
    });
}

// Initialize form dropdowns
document.addEventListener('DOMContentLoaded', function() {
    populateDays();
    populateYears();

    // Initialize all dynamic features
    initAutoSlideshow();
    initGalleryLightbox();
    initEventCountdowns();
    initAnimatedCounters();
    initFormValidation();
    initSmoothScrolling();
    initDynamicGallery();
});
