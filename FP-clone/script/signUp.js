document.addEventListener("DOMContentLoaded", function() {

    const URL = 'https://reqres.in/api/login';
    const FIRST_NAME_REGEX = /^[a-zA-Z]{2,20}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const form = document.getElementById('signup_form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');



    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validate()) {
            const mockData = {
                name: name.value.trim(),
                email: email.value.trim(),
                password: password.value.trim(),
                confirmPassword: confirmPassword.value.trim()
            };
            SignUpUser(mockData);
        }
    });

    function validate() {
        clearErrors();

        let isValid = true;

        if (!validateName(name.value.trim())) {
            setError(name, 'Username must be 3-20 characters long and can include letters, numbers, and underscores');
            isValid = false;
        }

        if (!validateEmail(email.value.trim())) {
            setError(email, 'Invalid email address');
            isValid = false;
        }

        if (!validatePassword(password.value.trim())) {
            setError(password, 'Password must be at least 8 characters long and include at least one letter and one number');
            isValid = false;
        }

        if (password.value.trim() !== confirmPassword.value.trim()) {
            setError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
        return isValid;
    }

    function validateName(username) {
        return FIRST_NAME_REGEX.test(username);
    }

    function validateEmail(email) {
        return EMAIL_REGEX.test(email);
    }

    function validatePassword(password) {
        return PASSWORD_REGEX.test(password);
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

    function SignUpUser(mockData){
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data);
            if(data.id){
                alert('SignUp successful');
                localStorage.setItem('signUpData', JSON.stringify(mockData));
                location.href = 'index.html';
            }
            else{
                alert('SignUp failed');
            
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        });
    }
    
    function closeModal() {
        document.getElementById('signUp-container').style.display = 'none';
        location.href = 'index.html';
    }
    if(closeModalBtn){
        closeModalBtn.addEventListener('click', closeModal);
    }
});



