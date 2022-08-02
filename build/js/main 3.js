import './vendor.js';

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
    mobileIconClose.classList.remove('visually-hidden');
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