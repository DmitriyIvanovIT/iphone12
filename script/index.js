document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const tabs = () => {
        const cardDetailChange = document.querySelectorAll('.card-detail__change'),
            cardDetailsTitle = document.querySelector('.card-details__title'),
            cardImage = document.querySelector('.card__image_item'),
            descriptionMemory = document.querySelector('.description__memory'),
            cardDetailsPrice = document.querySelector('.card-details__price');

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95990,
                memoryROM: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
                img: 'img/iPhone-silver.png',
                price: 120990,
                memoryROM: 256
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 99990,
                memoryROM: 128
            }
        ];

        const hideAll = () => {
            cardDetailChange.forEach(item => item.classList.remove('active'));
        };

        cardDetailChange.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                if (!tab.classList.contains('active')) {
                    hideAll();

                    cardDetailChange[i].classList.add('active');
                    cardDetailsTitle.textContent = data[i].name;
                    cardImage.setAttribute('src', data[i].img);
                    cardDetailsPrice.textContent = `${data[i].price}₽`;
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            });
        });
    };

    tabs();
});