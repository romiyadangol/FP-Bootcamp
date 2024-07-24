import { request } from './request.js';

document.addEventListener("DOMContentLoaded", function() {
    const URL = 'https://reqres.in/api/register';
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const form = document.getElementById('signIn_form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const closeModalBtn = document.getElementById('closeModalBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');
        if (validateForm()) {
            const mockData = {
                email: email.value.trim(),
                password: password.value.trim()
            };
            console.log('Posting data:', mockData);
            request('POST', URL, mockData)
            .then(data => {
                if (data && data.token) {
                    alert('Login successful');
                    localStorage.setItem('signIn-data', JSON.stringify(data.token));
                    location.href = 'home.html'; 
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch(error => {
                console.error('Request failed:', error);
            });
        }
    });

    function validateForm() {
        clearErrors();

        let isValid = true;
        if (!validateEmail(email.value.trim())) {
            setError(email, 'Invalid email address');
            isValid = false;
        }

        if (!validatePassword(password.value.trim())) {
            setError(password, 'Password must be at least 8 characters long and include at least one letter and one number');
            isValid = false;
        }
        return isValid;
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

    function closeModal() {
        console.log('closeModal called');
        document.getElementById('signIn-container').style.display = 'none';
        location.href = 'index.html';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
});
