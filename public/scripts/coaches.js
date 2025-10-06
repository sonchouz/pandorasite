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
 const container = document.getElementById('coachesdiv')
function displaycoaches()
{
   container.innerHTML = ''; // Очистка перед загрузкой
    const coachesRef = ref(database, "Coaches");
     get(coachesRef).then(snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.keys(data).forEach(key => {
        const coachData = data[key];
        const card = createcoachescard(coachData, key);
        container.appendChild(card);
      });
    } else {
      console.log("Нет данных");
    }
  }).catch(error => {
    console.error("Ошибка загрузки данных:", error);
  });
}
 
 function createcoachescard(data, key)
 {
    const coachdiv = document.createElement('div');
    coachdiv.className = 'max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700';
    coachdiv.dataset.key = key;
    coachdiv.innerHTML=`
     <a href="#">
                <img class="rounded-t-lg h-[350px] w-full" src="" alt="${data.Name}" />
            </a>
            <div class="p-5 text-center">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data.Name}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> ${data.Info}

          <br>Тренерский опыт: ${data.Work} 

          <br>Направления: ${data.Dance}
          </p>
    `;
    coachdiv.addEventListener('click', (event) =>
    {
      event.preventDefault();
    });
    return coachdiv;
  }

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });
    }
  });
  document.addEventListener('DOMContentLoaded', displaycoaches);