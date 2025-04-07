document.addEventListener('DOMContentLoaded', function() {
    const logoutPage = document.querySelector('.logout-container');
    if (logoutPage) {
        setTimeout(() => {
            window.location.href = 'book login.html';
        }, 2000);
    }
});
