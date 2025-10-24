const contentData = {
    'Latina Solo': {
        title: 'Latina Solo',
        text: 'Содержит элементы всех популярных латиноамериканских танцев, таких как сальса, меренге, бачата, румба, самба, ча-ча-ча, реггетон, но адаптированных под сольное исполнение. Это направление идеально подойдет тем, кто по каким-либо причинам не готов к танцу с малознакомым партнером. Подойдет латина соло и самодостаточным, темпераментным танцорам, способным зажечь танцпол самостоятельно и не нуждающимся в партнере. Дарит чувство свободы, независимости и раскрепощенности.',
        image: 'https://4dance.ru/wp-content/uploads/2018/08/latina3-1.jpg'
    },
    'BellyDance': {
        title: 'BellyDance',
        text: 'Танец живота — это завораживающее искусство, сочетающее грациозные движения, пластику и энергию. Подходит для всех возрастов и уровней подготовки. Помогает развить гибкость, укрепить мышцы и повысить уверенность в себе.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzBi4U95AWVzA_pRR-3gC2nU6Xqt-8aLM4Mg&s'
    },
    'DanceMix': {
        title: 'DanceMix',
        text: 'Энергичный микс различных танцевальных стилей, включая элементы хип-хопа, джаз-фанка и современных танцев. Идеально для тех, кто хочет попробовать что-то новое, динамичное и разнообразное.',
        image: 'https://svoyazhizn.ru/wp-content/uploads/2024/10/jazz-fank-mitino4.jpg'
    },
    'Pandora KIDS': {
        title: 'Pandora KIDS',
        text: 'Танцевальная программа для детей, направленная на развитие координации, чувства ритма и уверенности. Занятия проходят в игровой форме, помогая раскрыть творческий потенциал юных танцоров.',
        image: 'https://deeclub.ru/wp-content/uploads/deeclub_hip-hop-4-1-1000x1000.jpg'
    },
    'Hustle&Discofox': {
        title: 'Hustle & Discofox',
        text: 'Парные танцы, сочетающие динамику и экспрессию. Подходят для тех, кто хочет научиться танцевать с партнером, развивая чувство ритма и умение взаимодействовать в паре.',
        image: 'https://youdance.ru/wp-content/uploads/2023/03/young-couple-dancing-bachata-1-800x533.jpg?x68363'
    },
    'Yoga-stretching': {
        title: 'Yoga & Stretching',
        text: 'Программа, сочетающая элементы йоги и растяжки. Помогает улучшить гибкость, снять стресс и укрепить тело. Подходит для начинающих и опытных практиков.',
        image: 'https://static.tildacdn.com/tild3336-3235-4539-a338-366437306430/pexels-polina-tankil.jpg'
    },
    'High heels': {
        title: 'High Heels',
        text: 'Современный танцевальный стиль, исполняемый на каблуках. Развивает уверенность, женственность и грацию. Подходит для тех, кто хочет почувствовать себя звездой сцены.',
        image: 'https://us-ds.ru/wp-content/uploads/2017/08/dscf0053-800x1200.webp'
    }
};


const sidebarLinks = document.querySelectorAll('#default-sidebar a');
const titleElement = document.querySelector('h2.text-2xl');
const paragraphElement = document.querySelector('p.text-gray-900');
const imageElement = document.querySelector('img.w-full.rounded-lg');

const drawerButton = document.querySelector('[data-drawer-toggle]');
  const drawer = document.getElementById('default-sidebar');
  drawerButton.addEventListener('click', () => {
    drawer.classList.toggle('-translate-x-full');
  });
function resetButtonStyles() {
    sidebarLinks.forEach(link => {
        link.classList.remove('bg-gray-300'); 

    });
}

function setContentAndStyles(link, buttonText) {
 
    if (contentData[buttonText]) {
        titleElement.textContent = contentData[buttonText].title;
        paragraphElement.textContent = contentData[buttonText].text;
        imageElement.src = contentData[buttonText].image; 

    }

 
    resetButtonStyles();

   
    link.classList.remove('bg-gray-100');
    link.classList.add('bg-gray-300');
}

document.addEventListener('DOMContentLoaded', () => {
    const firstLink = sidebarLinks[0];
    const firstButtonText = firstLink.querySelector('span').textContent;
    setContentAndStyles(firstLink, firstButtonText); 
});


sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 

     
        const buttonText = link.querySelector('span').textContent;

   
        setContentAndStyles(link, buttonText);
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const drawerButton = document.querySelector('[data-drawer-toggle]');
  const drawer = document.getElementById('default-sidebar');

  drawerButton.addEventListener('click', () => {
    // переключаем два класса: скрыть (-translate-x-full) / показать (translate-x-0)
    drawer.classList.toggle("bg-white")
    drawer.classList.toggle('-translate-x-full');
    drawer.classList.toggle('translate-x-0');
  });
});
