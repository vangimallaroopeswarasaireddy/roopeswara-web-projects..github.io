const profilePicInput = document.getElementById('profile-pic');
const profilePreview = document.getElementById('profile-preview');
if (profilePicInput) {
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

const editProfileForm = document.getElementById('edit-profile-form');
if (editProfileForm) {
    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const address = document.getElementById('address').value;

        console.log('Profile Updated:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Mobile:', mobile);
        console.log('Address:', address);

        alert('Profile updated successfully!');
    });
}