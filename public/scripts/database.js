import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get, set, push} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZXeRP-U6v8d9ZJGZwGFBevQNWP5JRD7Y",
    authDomain: "pandorasite-6cccf.firebaseapp.com",
    databaseURL: "https://pandorasite-6cccf-default-rtdb.firebaseio.com",
    projectId: "pandorasite-6cccf",
    storageBucket: "pandorasite-6cccf.firebasestorage.app",
    messagingSenderId: "593153776184",
    appId: "1:593153776184:web:d7e830b7436eaf788f64cd",
    measurementId: "G-FNWBL482FW"

  };
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
 async function signup()
 {
    const nickname = document.getElementById("signnickname").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("signpswd").value;
    const confpswd = document.getElementById("confpswd").value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.,!?;:\-]).{8,}$/;
    const termsChecked = document.getElementById("terms").checked;
    const phoneRegex = /^\+?[0-9]{10,15}$/; 

    if(!nickname || !phone || !password || !confpswd)
    {
         Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Заполните все поля формы",
          });
        return;
    }
    if (!phoneRegex.test(phone)) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Введите корректный номер телефона",
        });
        return;
    }

    if(!passwordRegex.test(password))
    {
         Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Пароль должен быть не менее 8 символов, содержать хотя бы одну строчную и одну прописную латинскую букву, а также один знак препинания (.,!?;:-).",
        });
        return;
    }
    if(confpswd !== password)
    {
         Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Пароли не совпадают",
         });   
        return;
    }
    if (!termsChecked) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Вы должны согласиться с условиями пользовательского соглашения!",
        });
        return;
    }
    try{
        const snapshot = await get(ref(database, 'Users'));
        const users = snapshot.val();
        const exists = users && Object.values(users).some(u => u && u.Login === nickname);
        if (exists) {
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Пользователь с таким логином уже существует!",
            });
            return;
        }

        let UserId = 1; // Начальное значение, если база пустая
        if (users) {
            const userIds = Object.values(users)
                .filter(u => u && u.ID)
                .map(u => parseInt(u.ID));
            UserId = userIds.length > 0 ? Math.max(...userIds) + 1 : 1;
        }
         const userData = {
            Login: nickname,
            Password: password,
            Phone: phone,
            ID: UserId,// Уникальный ID
            Role: 'user'
        };
        await set(ref(database, `Users/${UserId}`), userData);
        Swal.fire({
            icon: "success",
            title: "Готово",
            text: "Регистрация пройдена успешно",
        });

    }
    catch{
        console.error('Ошибка при регистрации пользователя:', error);
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Произошла ошибка при регистрации",
        });
    }

 }
 async function login() {
    // Получение email и пароля из формы
    const login = document.getElementById("lognickname").value;
    const password = document.getElementById("logpswd").value;

    // Простая валидация формы
    if (!login || !password) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Введите логин и пароль!",
          });
        return;
    }

    try {
        const snapshot = await get(ref(database, 'Users'));
        const users = snapshot.val();

        const filteredUsers = Object.values(users).filter(u => u);

        // Поиск пользователя с соответствующим логином и паролем (без учета регистра)
        const user = filteredUsers.find(u => u.Login  === login  
        && u.Password === password);

        if (user) {
            // Сохранение данных пользователя в localStorage
            localStorage.setItem('userID', user.ID);
            localStorage.setItem('userlogin', login);
            window.location.href='index.html';
        } else {
            // Пользователь не найден или неверный email/пароль
            console.error('Ошибка при получении данных пользователя');
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Неверный логин или пароль",
              });
        }
    } catch (error) {
        // Обработка ошибок при получении данных пользователя
        console.error('Ошибка при получении данных пользователя:', error);
    }
}

// Добавление слушателя события click к кнопке входа
document.getElementById('signupbutton').addEventListener('click', signup);
document.getElementById('loginbutton').addEventListener('click', login);
