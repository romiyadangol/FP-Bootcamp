document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signIn_form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validate()) {
            const mockData = {
                email: email.value.trim(),
                password: password.value.trim()
            };

            // fetch('https://jsonplaceholder.typicode.com/users')
            // .then(response => response.json())
            // .then(data => {
            //     const user = data.find(user => user.email === mockData.email && user.password === mockData.password);
            //     if (user) {
            //         alert('Login successful');
            //         localStorage.setItem(email.value, data.token);
            //         window.location.href = 'dashboard.html';
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('An error occurred while submitting the form.');
            // });
            

           const storeData = JSON.parse(localStorage.getItem('mockData'));  
           if (storeData.email === mockData.email && storeData.password === mockData.password) {
               alert('Login successful');
               console.log("StoreData", storeData);
               window.location.href = 'why-us.html';

            //    setInterval(() => {
            //     console.log("Checking Login status");
            //    },5000);

            //    setTimeout(() => {
            //     window.location.href = 'index.html';
            //    },2000);
            //    console.log("StoreData", storeData);
               
            }
              else {
                alert('Invalid email or password');
            }
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
