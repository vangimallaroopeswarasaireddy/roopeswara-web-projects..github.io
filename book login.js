document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form'); 

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            alert('Login successful!');
            window.location.href = 'index.html'; 
        });
    }
});