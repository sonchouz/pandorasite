document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.form__signup');
    const loginForm = document.querySelector('.form__login');

    // Находим две кнопки в верхнем блоке по тексту
    const signupBtn = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.textContent.trim() === 'Регистрация');
    const loginBtn = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.textContent.trim() === 'Вход');

    // Показать форму регистрации, скрыть форму входа
    signupBtn.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Показать форму входа, скрыть форму регистрации
    loginBtn.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });
});
