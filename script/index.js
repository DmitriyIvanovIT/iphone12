document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const crossSellList = document.querySelector('.swiper-wrapper'),
        modal = document.querySelector('.modal'),
        cardDetailsTitle = document.querySelector('.card-details__title'),
        modalSubtitle = document.querySelector('.modal__subtitle');

    crossSellList.textContent = '';

    const getData = async () => await fetch('./cross-sell-dbase/dbase.json');

    const tabs = () => {
            const cardDetailChange = document.querySelectorAll('.card-detail__change'),
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
                },
                closeAllDrops = () => {
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
        modalFunc = () => {
            const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy'),
                cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');

            const closeModal = e => {
                const target = e.target;

                if (target === modal || target.classList.contains('modal__close') || e.code === 'Escape') {
                    modal.classList.remove('open');
                }
            }

            cardDetailsButtonBuy.addEventListener('click', () => {
                openModal('Оплата', cardDetailsTitle.textContent);
            });

            cardDetailsButtonDelivery.addEventListener('click', () => {
                openModal('Доставка и оплата')
            });

            modal.addEventListener('click', closeModal);

            document.body.addEventListener('keydown', closeModal);
        },
        openModal = (text, title) => {
            modalSubtitle.textContent = text;
            document.querySelector('.modal__title').textContent = title;
            modal.classList.add('open');
        };

    tabs();
    accordion();
    modalFunc();

    getData()
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }

            return res.json();
        })
        .then(data => {
            data.forEach(item => {
                crossSellList.insertAdjacentHTML('beforeend', `
                <li id="${item.id}" class="swiper-slide">
                    <article class="cross-sell__item">
                        <img class="cross-sell__image" src="${item.photo}" alt="${item.name}">
                        <h3 class="cross-sell__title">${item.name}</h3>
                        <p class="cross-sell__price">${item.price}₽</p>
                        <div class="button button_buy cross-sell__button">Купить</div>
                    </article>
                </li>
                `);
            });

            const crossSellItem = document.querySelectorAll('.cross-sell__item');

            return crossSellItem;
        })
        .then(sellItems => {
            const swiper = new Swiper('.cross-sell__list', {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 2000,
                },
            });
            sellItems.forEach(item =>
                item.addEventListener('click', e => {
                    const target = e.target;

                    if (target.classList.contains('cross-sell__button')) {
                        openModal('Оплатить', item.querySelector('.cross-sell__title').textContent);
                    }
                })
            )
        })
        .catch(error => console.error(error));
});