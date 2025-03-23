// Add this to your existing myscripts.js file

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Add ID to form if not present
        if (!contactForm.id) {
            contactForm.id = 'contact-form';
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ensure all inputs have name attributes
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (!input.name && input.placeholder) {
                    // Create name attribute based on placeholder if missing
                    const placeholderText = input.placeholder.toLowerCase().replace(/[^a-z0-9]/g, '_');
                    input.name = placeholderText;
                }
            });
            
            // Create FormData object from the form
            const formData = new FormData(this);
            
            // Send the form data using fetch API
            fetch('/resources/contact_handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    alert(data.message);
                    // Reset the form
                    contactForm.reset();
                    
                    // Optional: Redirect to thank you page
                    // window.location.href = '/resources/redirect.html';
                } else {
                    // Show error message
                    alert(data.message || 'An error occurred while sending your message.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while sending your message. Please try again later.');
            });
        });
    }
});


// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.style.display = 'none';
        });
        document.querySelectorAll('.faq-question').forEach(item => {
            item.classList.remove('active');
        });
        
        // If it wasn't open before, open it
        if (!isOpen) {
            answer.style.display = 'block';
            question.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
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

