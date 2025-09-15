 document.addEventListener('DOMContentLoaded', () => {
            const signupForm = document.querySelector('.form__signup');
            const loginForm = document.querySelector('.form__login');
            const signupBtn = document.querySelector('.signup-btn');
            const loginBtn = document.querySelector('.login-btn');

            signupBtn.addEventListener('click', () => {
                signupForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            });

            loginBtn.addEventListener('click', () => {
                loginForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
            });
        });



