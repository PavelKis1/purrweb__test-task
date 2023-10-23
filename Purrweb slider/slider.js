const sliderItem = document.querySelectorAll('.slider__item');
const sliderImg = document.querySelectorAll('.slider__item img');
const sliderWrap = document.querySelector('.slider__wrap');
const sliderPagination = document.querySelector('.slider__pagination');
const sliderLine = document.querySelector('.slider__line');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const width = sliderWrap.offsetWidth;
let currentWidth = 0;
let index = 0;
for (let i = 0; i < sliderImg.length; i++) {
    const sliderPaginationBullet = document.createElement('li');
    sliderPaginationBullet.classList.add('slider__bullet');
    sliderPaginationBullet.dataset.number = i;
    sliderPagination.append(sliderPaginationBullet);
}
const allBullets = document.querySelectorAll('.slider__bullet');
allBullets[index].classList.add('slider__bullet--active');

const firstClone = sliderItem[0].cloneNode(true);
const lastClone = sliderItem[sliderItem.length - 1].cloneNode(true);
init();

function init() {
    sliderLine.style.width = width * (sliderItem.length + 2) + 'px';
    sliderLine.append(firstClone);
    sliderLine.prepend(lastClone);
    sliderImg.forEach(e => {
        e.style.width = width + 'px';
        // e.style.heigth = 'auto';
    });
    firstClone.querySelector('.slider__item img').style.width = width + 'px';
    firstClone.querySelector('.slider__item img').style.heigth = 'auto';
    lastClone.querySelector('.slider__item img').style.width = width + 'px';
    lastClone.querySelector('.slider__item img').style.heigth = 'auto';
    sliderLine.style.transform = `translateX(-${width}px)`;

    allBullets.forEach(e => {
        e.addEventListener('click', movePagination);
    });
}

function movePagination() {
    if (this.dataset.number != index) {
        allBullets.forEach(e => {
            e.removeEventListener('click', movePagination);
            allBullets[index].classList.remove('slider__bullet--active');
        });
    }
    if (this.dataset.number > index) {
        currentWidth = width * index;
        index = this.dataset.number;
        allBullets[index].classList.add('slider__bullet--active');
        let animation = setInterval(() => {
            currentWidth = currentWidth + 40;
            moveLeft();
            if (currentWidth == width * this.dataset.number) {
                clearInterval(animation);
                allBullets.forEach(e => {
                    e.addEventListener('click', movePagination);
                });
            }
        }, 1)
    } else if (this.dataset.number < index) {
        currentWidth = -width * index;
        index = this.dataset.number;
        allBullets[index].classList.add('slider__bullet--active');
        let animation = setInterval(() => {
            currentWidth = currentWidth + 40;
            moveRight();
            if (currentWidth == -width * this.dataset.number) {
                clearInterval(animation);
                allBullets.forEach(e => {
                    e.addEventListener('click', movePagination);
                });
            }
        }, 1)
    }
}

function moveLeft() {
    sliderLine.style.left = `${-currentWidth}px`;
}

function moveRight() {
    sliderLine.style.left = `${currentWidth}px`;
}

function nextSlide() {
    nextBtn.removeEventListener('click', nextSlide);
    if (index == sliderImg.length) {
        allBullets[sliderImg.length - 1].classList.remove('slider__bullet--active');
    } else {
        allBullets[index].classList.remove('slider__bullet--active');
    }
    currentWidth = width * index;
    index++;
    if (index == sliderImg.length) {
        allBullets[0].classList.add('slider__bullet--active');
    } else {
        allBullets[index].classList.add('slider__bullet--active');
    }
    let animation = setInterval(() => {
        if (index == sliderImg.length) {
            index = 0;
            sliderLine.style.left = `${width}px`
            currentWidth = -800;
        }
        currentWidth = currentWidth + 20;
        moveLeft();
        if (sliderLine.style.left === `${-width * index}px`) {
            clearInterval(animation);
            nextBtn.addEventListener('click', nextSlide);
            if (index == sliderImg.length) {
                index = 0;
                currentWidth = 0;
                sliderLine.style.left === `${currentWidth}px`;
            }
        }
    }, 2);
}


function prevSlide() {
    prevBtn.removeEventListener('click', prevSlide);
    currentWidth = -width * index;
    allBullets[index].classList.remove('slider__bullet--active');
    index--;
    if (index < 0) {
        allBullets[sliderImg.length - 1].classList.add('slider__bullet--active');
    } else {
        allBullets[index].classList.add('slider__bullet--active');
    }
    let animation = setInterval(() => {
        currentWidth = currentWidth + 20;
        moveRight();
        if (sliderLine.style.left === `${width}px`) {
            index = sliderImg.length - 1;
            clearInterval(animation);
            sliderLine.style.left = `-${width * (index)}px`;

            prevBtn.addEventListener('click', prevSlide);
            return;
        } else if (sliderLine.style.left === `${-width * index}px` && index >= 0) {
            clearInterval(animation);
            prevBtn.addEventListener('click', prevSlide);
            return;
        }

    }, 2);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
