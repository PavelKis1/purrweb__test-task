(() => {
    document.addEventListener("DOMContentLoaded", () => {

        const modal = document.querySelector('.modal');
        const modalBox = document.querySelector('.modal__box');

        // Footer adaptive list
        const footerItems = document.querySelectorAll('.footer__bot-item');
        const footerTopList = document.querySelector('.footer__left .footer__list');
        const footerBotList = document.querySelector('.footer__bot .footer__list');
        const mql = window.matchMedia('(max-width: 575px)');

        if (mql.matches) {
            for (const item of footerItems) {
                if (!item.classList.contains('done')) {
                    footerTopList.append(item);
                    item.classList.add('done');
                }
            }
        }

        mql.addEventListener('change', (e) => {
            if (e.matches) {
                for (const item of footerItems) {
                    if (!item.classList.contains('done')) {
                        footerTopList.append(item);
                        item.classList.add('done');
                    }
                }
            } else {
                for (const item of footerItems) {
                    if (item.classList.contains('done')) {
                        item.classList.remove('done');
                        footerBotList.append(item);
                    }
                }
            }
        });
        //

        //Burger
        const burger = document.querySelector('.burger');
        const burgerNav = document.querySelector('.burger__nav');
        const select = document.querySelector('.select');
        const header = document.querySelector('.header');
        const body = document.querySelector('body');
        const mqlBurger = window.matchMedia('(min-width: 576px)');

        burger.addEventListener('click', () => {
            burger.classList.add('burger--off');
            setTimeout(() => {
                burger.classList.remove('burger--off');
            }, 300);
            if (header.classList.contains('header--off')) {
                setTimeout(() => {
                    header.classList.remove('header--off');
                }, 300);
            } else {
                header.classList.add('header--off');
            }
            body.classList.toggle('body--off');
            select.classList.toggle('select--off');
            burger.classList.toggle('burger--active');
            burgerNav.classList.toggle('burger__nav--active');
        });
        //При повороте экрана телефона при открытом бургер меню нельзя было взаимодействовать с сайтом
        // Поэтому добавил медиа запрос
        mqlBurger.addEventListener('change', (e) => {
            if (!modalBox.classList.contains('modal__box--active')) {
                burger.classList.remove('burger--off');
                header.classList.remove('header--off');
                body.classList.remove('body--off');
                select.classList.remove('select--off');
                burger.classList.remove('burger--active');
                burgerNav.classList.remove('burger__nav--active');
            }
        });
        //

        // Modal form 

        const btn = document.querySelectorAll('.btn');
        const closeBtn = document.querySelectorAll('.close__modal');
        const modalBtn = document.querySelector('.modal__btn');
        const form = document.querySelector('.modal__form');
        const modalSuccess = document.querySelector('.modal-success');
        const inputRequired = document.querySelectorAll('.modal__required');
        const allInputs = document.querySelectorAll('.modal__input');
        const inputWrap = document.querySelector('.modal__input-wrap');

        function closeModal() {
            const fillMessage = document.querySelector('.fill-message');
            modalBox.classList.remove('modal__box--active');
            body.classList.remove('body--off');
            modal.classList.remove('modal--off');
            modalSuccess.classList.remove('modal-success--active');
            if (fillMessage) {
                inputWrap.removeChild(fillMessage);
            }
            allInputs.forEach(el => {
                el.value = '';
                if (el.classList.contains('error')) {
                    const errorMessage = el.parentNode.querySelector('.error-message');
                    el.parentNode.removeChild(errorMessage);
                    el.classList.remove('error');
                }
            });
            modalBtn.classList.add('btn--disable');

        }

        function addModalListener() {
            modalBox.classList.add('modal__box--active');
            body.classList.add('body--off');
        }

        function validationFunc(e) {
            if (e.value.trim() === '' && e.classList.contains('modal__required')) {
                if (!e.classList.contains('error')) {
                    const createErrorMessage = document.createElement('span');
                    createErrorMessage.classList.add('error-message');
                    createErrorMessage.textContent = 'This field is required.';
                    e.classList.add('error');
                    e.parentNode.appendChild(createErrorMessage);
                }
            } else {
                if (e.classList.contains('error')) {
                    const errorMessage = e.parentNode.querySelector('.error-message');
                    e.parentNode.removeChild(errorMessage);
                    e.classList.remove('error');
                }
            }
        }

        btn.forEach(e => {
            e.addEventListener('click', addModalListener);
        });

        modalBtn.removeEventListener('click', addModalListener);

        form.addEventListener('input', (e) => {
            const createFillMessage = document.createElement('span');
            createFillMessage.classList.add('fill-message', 'error-message');
            createFillMessage.textContent = 'Please fill in all required fields';
            const fillMessage = document.querySelector('.fill-message');
            let validation = true;

            validationFunc(e.target);

            inputRequired.forEach(el => {
                if (el.value.trim() === '') {
                    validation = false;
                }
            });

            if (validation) {
                if (fillMessage) {
                    inputWrap.removeChild(fillMessage);
                }
                modalBtn.classList.remove('btn--disable');
            } else {
                if (!fillMessage && e.target.classList.contains('modal__required')) {
                    inputWrap.append(createFillMessage);
                }
                modalBtn.classList.add('btn--disable');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let validation = true;
            const createFillMessage = document.createElement('span');
            createFillMessage.classList.add('fill-message', 'error-message');
            createFillMessage.textContent = 'Please fill in all required fields';
            const fillMessage = document.querySelector('.fill-message');

            inputRequired.forEach(el => {
                validationFunc(el);
                if (el.value.trim() === '') {
                    validation = false;
                }
            });
            if (!validation) {
                if (!fillMessage) {
                    inputWrap.append(createFillMessage);
                }
                return
            } else {
                modal.classList.add('modal--off');
                modalSuccess.classList.add('modal-success--active');
            }
        })

        closeBtn.forEach(e => {
            e.addEventListener('click', () => {
                closeModal();
            });
        })

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        })

        modalBox.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__box')) {
                closeModal();
            }
        });
        // END
    });
})();