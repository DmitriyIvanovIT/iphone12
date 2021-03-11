document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const tabs = () => {
        const cardDetailChange = document.querySelectorAll('.card-detail__change'),
            cardDetailsTitle = document.querySelector('.card-details__title'),
            cardImage = document.querySelector('.card__image_item'),
            descriptionMemory = document.querySelector('.description__memory'),
            cardDetailsPrice = document.querySelector('.card-details__price');

        const data = [{
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
                    document.querySelector('.modal__title').textContent = data[i].name;
                    cardImage.setAttribute('src', data[i].img);
                    cardDetailsPrice.textContent = `${data[i].price}₽`;
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                }
            });
        });
    }, 
    accordion = () => {
        const characteristics = document.querySelector('.characteristics'),
            characteristicsItem = document.querySelectorAll('.characteristics__item');

        const open = (button, dropDown) => {
                closeAllDrops();
                dropDown.style.height = `${dropDown.scrollHeight}px`;
                button.classList.add('active');
                dropDown.classList.add('active');
            },
            close = (button, dropDown) => {
                button.classList.remove('active');
                dropDown.classList.remove('active');
                dropDown.style.height = ``;
            }, closeAllDrops = () => {
                if (Array.from(characteristicsItem).some(item => item.children[1].classList.contains('active'))) {
                    characteristicsItem.forEach(item => {
                        if (item.children[0].classList.contains('active')) {
                            close(item.children[0], item.children[1]);
                        }
                    })
                    
                }
            }

        characteristics.addEventListener('click', e => {
            const target = e.target;

            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item'),
                    description = parent.querySelector('.characteristics__description');

                description.classList.contains('active') ? close(target, description) : open(target, description);
            };

            if (!target.classList.contains('characteristics__title') && !target.closest('.characteristics__description')) {
                closeAllDrops();
            };
        });

        document.body.addEventListener('click', e => {
            const target = e.target;

            if (!target.classList.contains('characteristics__title') && !target.closest('.characteristics__description')) {
                closeAllDrops();
            };
        });
    },
    modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy'),
        cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery'),
        modal = document.querySelector('.modal'),
        modalSubtitle = document.querySelector('.modal__subtitle');

        const openModal = text => {
            modalSubtitle.textContent = text;
            modal.classList.add('open');
        },
        closeModal = e => {
            const target = e.target;

            if (target === modal || target.classList.contains('modal__close') || e.code === 'Escape') {
                modal.classList.remove('open');
            }
        }

        cardDetailsButtonBuy.addEventListener('click', () => {
            openModal('Оплата')
        });

        cardDetailsButtonDelivery.addEventListener('click', () => {
            openModal('Доставка и оплата')
        });

        modal.addEventListener('click', closeModal);

        document.body.addEventListener('keydown', closeModal);
    };

    tabs();
    accordion();
    modal();
});