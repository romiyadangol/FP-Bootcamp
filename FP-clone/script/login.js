document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signIn_form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validate()) {
            form.submit(); 
            window.location.href = 'index.html';
            console.log('Form submitted');
        }
    });

    function validate() {
        clearErrors();

        let valid = true;
        if (!isValid(email.value.trim())) {
            setError(email, 'Invalid email address');
            valid = false;
        }

        if (!validatePassword(password.value.trim())) {
            setError(password, 'Password must be at least 8 characters long and include at least one letter and one number');
            valid = false;
        }
        return valid;
    }

    function isValid(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        return re.test(password);
    }

    function setError(element, message) {
        const formField = element.parentElement;
        const small = formField.querySelector('small');
        small.innerText = message;
        formField.classList.add('error');
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.classList.remove('error');
            const small = element.querySelector('small');
            small.innerText = '';
        });
    }
});
function closeModal() {
    document.getElementById('signIn-container').style.display = 'none';
    window.location.href = 'index.html';
}
