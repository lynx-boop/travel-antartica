import './vendor.js';
import './pristine/pristine.min.js';

const mobileMenu = document.querySelector('.mobile');
const logoImg = document.querySelector('.page-header__logo-img');
const main = document.querySelector('.main');
const toggle = document.querySelector('.page-header__toggle');
const mobileIconClose = document.querySelector('.mobile__icon--close');

const closeMobileMenu = () => {
    mobileMenu.classList.remove('shown');
    mobileMenu.classList.add('visually-hidden');
    logoImg.classList.remove('visually-hidden');
    logoImg.classList.add('shown');
    main.classList.remove('visually-hidden--text');
    main.classList.add('shown__text');
};

if (mobileMenu) {
    closeMobileMenu();
};

const openMobileMenu = () => {
    mobileMenu.classList.add('shown');
    logoImg.classList.remove('shown');
    main.classList.remove('shown__text');
    logoImg.classList.add('visually-hidden');
    main.classList.add('visually-hidden--text');
};

// Реализация открытия-закрытия мобильного меню
const toggleMobileMenu = () => {
    if (toggle) {
        toggle.addEventListener('click', () => {
            openMobileMenu();
        });
    };

    if (mobileIconClose) {
        mobileIconClose.addEventListener('click', () => {
            closeMobileMenu();
        })
    };
};
toggleMobileMenu();

// Валидация формы и отправка данных на сервер

// const pristine = new Pristine(formOfAdvert,
//     {
//         classTo: 'ad-form__label',
//         errorTextParent: 'ad-form__label',
//         errorTextClass: 'ad-form__label--error'
//     },
//     true
// );