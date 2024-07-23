document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signup_form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validate()) {
            const mockData = {
                username: name.value.trim(),
                email: email.value.trim(),
                password: password.value.trim(),
                confirmPassword: confirmPassword.value.trim()
            };

            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mockData)
            })
            .then(response => response.json())
            .then(data => {
                    console.log('Response data:', data);
                    window.location.href = 'index.html'; 
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });

            let storeData = JSON.parse(localStorage.getItem('mockData'));
            if (!Array.isArray(storeData)) {
                storeData = [];
            }
            storeData.push(mockData);
            localStorage.setItem('mockData', JSON.stringify(mockData));
            console.log('SignUp successful', mockData);
            setTimeout(() => {
                window.location.href = 'index.html';
            },2000)
        }
    });

    function validate() {
        clearErrors();

        let valid = true;

        if (!validateUsername(name.value.trim())) {
            setError(name, 'Username must be 3-20 characters long and can include letters, numbers, and underscores');
            valid = false;
        }

        if (!isValid(email.value.trim())) {
            setError(email, 'Invalid email address');
            valid = false;
        }

        if (!validatePassword(password.value.trim())) {
            setError(password, 'Password must be at least 8 characters long and include at least one letter and one number');
            valid = false;
        }

        if (password.value.trim() !== confirmPassword.value.trim()) {
            setError(confirmPassword, 'Passwords do not match');
            valid = false;
        }

        return valid;
    }

    function validateUsername(username) {
        const re = /^[a-zA-Z0-9_]{3,20}$/;
        return re.test(username);
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
    document.getElementById('signup-container').style.display = 'none';
    window.location.href = 'index.html';
}


