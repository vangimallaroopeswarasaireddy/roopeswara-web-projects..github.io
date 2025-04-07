const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('form-status').textContent = 'Message sent successfully!';
    });
}