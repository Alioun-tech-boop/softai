document.addEventListener('DOMContentLoaded', function() {
    // Préloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Active link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const count = +stat.innerText;
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);

    // Service modal
    const serviceModal = document.getElementById('service-modal');
    const serviceBtns = document.querySelectorAll('.service-btn, .pricing-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = this.getAttribute('data-price');
            
            document.getElementById('selected-service').value = service;
            document.getElementById('selected-price').value = price;
            
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Testimonial modal
    const testimonialModal = document.getElementById('testimonial-modal');
    const openTestimonialBtn = document.getElementById('open-testimonial-form');
    
    openTestimonialBtn.addEventListener('click', function() {
        testimonialModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });

    // Service form submission
    const serviceForm = document.getElementById('service-form');
    
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const service = document.getElementById('selected-service').value;
        const price = document.getElementById('selected-price').value;
        const name = document.getElementById('client-name').value;
        const phone = document.getElementById('client-phone').value;
        const email = document.getElementById('client-email').value;
        const message = document.getElementById('client-message').value;
        
        // Format WhatsApp message
        const whatsappMessage = `Bonjour Soft AI,\n\nJe suis intéressé par votre service "${service}" (${price} FCFA).\n\nNom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\n\nMessage: ${message}\n\nMerci de me contacter pour discuter du projet.`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/22601708323?text=${encodedMessage}`, '_blank');

        // Show success message
        serviceModal.classList.remove('active');
        showSuccessModal();
        
        // Reset form
        this.reset();
    });

    // Feedback form submission
    const feedbackForm = document.getElementById('feedback-form');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to your server
        // For this example, we'll just show a success message
        showSuccessModal();
        
        // Reset form
        this.reset();
    });

    // Testimonial form submission
    const testimonialForm = document.getElementById('testimonial-form');
    
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('testimonial-name').value;
        const role = document.getElementById('testimonial-role').value;
        const text = document.getElementById('testimonial-text').value;
        const email = document.getElementById('testimonial-email').value;
        
        // Here you would typically send this data to your server
        // For this example, we'll just show a success message
        testimonialModal.classList.remove('active');
        showSuccessModal();
        
        // Reset form
        this.reset();
    });

    // Show success modal
    function showSuccessModal() {
        const successModal = document.getElementById('success-modal');
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 3000);
    }

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
});
