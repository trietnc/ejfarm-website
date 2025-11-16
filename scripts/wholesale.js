/**
 * WHOLESALE & PARTNERSHIPS PAGE CONTROLLER
 * Handles AJAX form submission to Formspree
 * Prevents page redirect and shows success message dynamically
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Wholesale page initialized');

        // Get form and success message elements
        const form = document.getElementById('wholesale-form');
        const successMessage = document.getElementById('wholesale-success-msg');
        const submitButton = form.querySelector('.btn-submit');

        if (!form || !successMessage) {
            console.error('❌ Required elements not found');
            return;
        }

        /**
         * Handle form submission
         */
        form.addEventListener('submit', async function(event) {
            // Prevent default form submission (page reload)
            event.preventDefault();

            console.log('📤 Submitting wholesale request...');

            // Get form data
            const formData = new FormData(form);

            // Add loading state to button
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            try {
                // Send form data using fetch API
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Hide form and show success message
                    console.log('✅ Form submitted successfully');
                    
                    // Smooth transition
                    form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    form.style.opacity = '0';
                    form.style.transform = 'translateY(-20px)';

                    setTimeout(() => {
                        form.style.display = 'none';
                        successMessage.classList.add('show');
                        successMessage.style.animation = 'fadeInUp 0.5s ease';
                        
                        // Scroll to success message
                        successMessage.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 300);

                } else {
                    // Error response from server
                    throw new Error('Server returned an error');
                }

            } catch (error) {
                // Handle submission error
                console.error('❌ Submission failed:', error);
                
                // Remove loading state
                submitButton.classList.remove('loading');
                submitButton.disabled = false;

                // Show error alert
                alert('Submission failed. Please try again or contact us directly at trietnct@gmail.com');
            }
        });

        // Add fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        console.log('✅ Wholesale form handler attached');
    });

})();
