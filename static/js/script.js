// Main JavaScript file for TryFirst homepage
$(document).ready(function() {
    // Initialize the page
    initializeTheme();
    initializeAnimations();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeVideoPlayer();
    initializeTestimonialSlider();
    
    console.log('TryFirst homepage initialized successfully');
});

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the theme
    if (savedTheme === 'dark') {
        $('html').addClass('dark');
        updateThemeIcons(true);
    } else {
        $('html').removeClass('dark');
        updateThemeIcons(false);
    }
    
    // Theme toggle event handlers
    $('#theme-toggle, #theme-toggle-mobile').on('click', function() {
        toggleTheme();
    });
}

function toggleTheme() {
    const html = $('html');
    const isDark = html.hasClass('dark');
    
    if (isDark) {
        html.removeClass('dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcons(false);
        showNotification('Light theme activated', 'success');
    } else {
        html.addClass('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons(true);
        showNotification('Dark theme activated', 'success');
    }
}

function updateThemeIcons(isDark) {
    const sunIcons = $('.fa-sun');
    const moonIcons = $('.fa-moon');
    
    if (isDark) {
        sunIcons.addClass('hidden');
        moonIcons.removeClass('hidden');
    } else {
        sunIcons.removeClass('hidden');
        moonIcons.addClass('hidden');
    }
}

// Mobile Menu Management
function initializeMobileMenu() {
    $('#mobile-menu-toggle').on('click', function() {
        const mobileMenu = $('#mobile-menu');
        const icon = $(this).find('i');
        
        if (mobileMenu.hasClass('hidden')) {
            mobileMenu.removeClass('hidden').hide().slideDown(300);
            icon.removeClass('fa-bars').addClass('fa-times');
        } else {
            mobileMenu.slideUp(300, function() {
                $(this).addClass('hidden');
            });
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on links
    $('#mobile-menu a').on('click', function() {
        const mobileMenu = $('#mobile-menu');
        const toggleButton = $('#mobile-menu-toggle i');
        
        mobileMenu.slideUp(300, function() {
            $(this).addClass('hidden');
        });
        toggleButton.removeClass('fa-times').addClass('fa-bars');
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            const offsetTop = target.offset().top - 80; // Account for fixed header
            
            $('html, body').animate({
                scrollTop: offsetTop
            }, 800, 'easeInOutCubic');
        }
    });
}

// Scroll Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in animation
    $('section').each(function() {
        $(this).addClass('fade-in');
        observer.observe(this);
    });
    
    // Add floating animation to hero icons
    $('.hero-icon').addClass('floating');
    
    // Add pulse animation to CTA buttons
    $('.cta-button').addClass('pulse-animation');
    
    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.5;
        
        $('.hero-bg').css('transform', `translateY(${parallax}px)`);
    });
}

// Video Player Functionality
function initializeVideoPlayer() {
    $('.video-play-button, .video-thumbnail').on('click', function() {
        const videoContainer = $(this).closest('.video-container');
        const videoId = 'dQw4w9WgXcQ'; // Example video ID
        
        // Create YouTube iframe
        const iframe = $(`
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `);
        
        // Replace the thumbnail with the video
        videoContainer.html(iframe);
        
        // Show notification
        showNotification('Video loaded successfully', 'success');
    });
}

// Testimonial Slider
function initializeTestimonialSlider() {
    let currentSlide = 0;
    const slides = $('.testimonial-slide');
    const totalSlides = slides.length;
    
    if (totalSlides > 0) {
        // Auto-advance testimonials every 5 seconds
        setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showTestimonial(currentSlide);
        }, 5000);
    }
}

function showTestimonial(index) {
    const slides = $('.testimonial-slide');
    slides.removeClass('active').eq(index).addClass('active');
}

// Form Handling and Validation
function handleTrialSignup() {
    const email = $('#email').val();
    const name = $('#name').val();
    
    if (!email || !name) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const button = $('.signup-button');
    const originalText = button.text();
    button.html('<i class="loading"></i> Processing...').prop('disabled', true);
    
    // Simulate API call
    setTimeout(function() {
        button.html(originalText).prop('disabled', false);
        showNotification('Trial signup successful! Check your email for details.', 'success');
        
        // Reset form
        $('#signup-form')[0].reset();
    }, 2000);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    $('.notification').remove();
    
    const notificationClass = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    }[type] || 'bg-blue-500';
    
    const notification = $(`
        <div class="notification fixed top-20 right-4 ${notificationClass} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
            <div class="flex items-center">
                <i class="fas fa-${getNotificationIcon(type)} mr-2"></i>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="$(this).closest('.notification').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `);
    
    $('body').append(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.removeClass('translate-x-full');
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.addClass('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Product Interaction Handlers
$(document).on('click', '.product-try-button', function() {
    const productName = $(this).closest('.product-card').find('.product-name').text();
    showNotification(`Added "${productName}" to your trial cart!`, 'success');
    
    // Add visual feedback
    $(this).addClass('animate-pulse');
    setTimeout(() => {
        $(this).removeClass('animate-pulse');
    }, 1000);
});

// Pricing Toggle
$(document).on('click', '.pricing-toggle', function() {
    const isAnnual = $(this).hasClass('annual');
    $('.pricing-card').each(function() {
        const monthlyPrice = $(this).data('monthly');
        const annualPrice = $(this).data('annual');
        const priceElement = $(this).find('.price');
        
        if (isAnnual) {
            priceElement.text(`$${annualPrice}/year`);
        } else {
            priceElement.text(`$${monthlyPrice}/month`);
        }
    });
});

// FAQ Accordion
$(document).on('click', '.faq-question', function() {
    const answer = $(this).next('.faq-answer');
    const icon = $(this).find('.faq-icon');
    
    if (answer.is(':visible')) {
        answer.slideUp(300);
        icon.removeClass('fa-minus').addClass('fa-plus');
    } else {
        // Close other open FAQs
        $('.faq-answer:visible').slideUp(300);
        $('.faq-icon').removeClass('fa-minus').addClass('fa-plus');
        
        // Open clicked FAQ
        answer.slideDown(300);
        icon.removeClass('fa-plus').addClass('fa-minus');
    }
});

// Newsletter Signup
$(document).on('submit', '#newsletter-form', function(e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    const button = $(this).find('button');
    const originalText = button.text();
    button.html('<i class="loading"></i>').prop('disabled', true);
    
    setTimeout(() => {
        button.html(originalText).prop('disabled', false);
        showNotification('Successfully subscribed to newsletter!', 'success');
        $(this)[0].reset();
    }, 1500);
});

// Scroll to Top Button
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
        if ($('#scroll-to-top').length === 0) {
            $('body').append(`
                <button id="scroll-to-top" class="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 z-50 opacity-0">
                    <i class="fas fa-arrow-up"></i>
                </button>
            `);
            
            setTimeout(() => {
                $('#scroll-to-top').addClass('opacity-100');
            }, 100);
        }
    } else {
        $('#scroll-to-top').removeClass('opacity-100').addClass('opacity-0');
        setTimeout(() => {
            $('#scroll-to-top').remove();
        }, 300);
    }
});

$(document).on('click', '#scroll-to-top', function() {
    $('html, body').animate({
        scrollTop: 0
    }, 800, 'easeInOutCubic');
});

// Performance Optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
$(window).on('scroll', debounce(function() {
    const scrollTop = $(window).scrollTop();
    
    // Update navigation background opacity
    if (scrollTop > 50) {
        $('nav').addClass('bg-opacity-95');
    } else {
        $('nav').removeClass('bg-opacity-95');
    }
}, 10));

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = $('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.each(function() {
        imageObserver.observe(this);
    });
}

// Initialize when DOM is ready
$(document).ready(function() {
    lazyLoadImages();
});

// Add easing function for smooth animations
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};

// Error handling for missing elements
$(document).on('click', '[data-action]', function() {
    const action = $(this).data('action');
    const handler = window[action];
    
    if (typeof handler === 'function') {
        handler.call(this);
    } else {
        console.warn(`Handler function '${action}' not found`);
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Track Event:', eventName, eventData);
    
    // Add your analytics tracking code here
    // Example: gtag('event', eventName, eventData);
}

// Track important interactions
$(document).on('click', '.cta-button', function() {
    const buttonText = $(this).text().trim();
    trackEvent('cta_click', {
        button_text: buttonText,
        page_section: $(this).closest('section').attr('id') || 'unknown'
    });
});

$(document).on('click', '.product-try-button', function() {
    const productName = $(this).closest('.product-card').find('.product-name').text();
    trackEvent('product_trial_click', {
        product_name: productName
    });
});

// Page visibility API for analytics
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('page_hidden');
    } else {
        trackEvent('page_visible');
    }
});

console.log('TryFirst JavaScript loaded successfully');
