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

        // Clear existing table rows
        const table = document.getElementById('profileTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';

        // Insert new row with updated profile information
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = name;
        newRow.insertCell(1).innerText = email;
        newRow.insertCell(2).innerText = mobile;
        newRow.insertCell(3).innerText = address;

        // Show success message
        alert('Profile updated successfully!');
    });
}