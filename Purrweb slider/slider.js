const sliderItem = document.querySelectorAll('.slider__item');
const sliderImg = document.querySelectorAll('.slider__item img');
const sliderWrap = document.querySelector('.slider__wrap');
const sliderLine = document.querySelector('.slider__line');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const width = sliderWrap.offsetWidth;
const duration = 800;
const firstClone = sliderItem[0].cloneNode(true);
const lastClone = sliderItem[sliderItem.length - 1];
let currentWidth = 0;
let index = 0;
init();

function init() {
    sliderLine.append(firstClone);
    sliderLine.prepend(lastClone);
    sliderLine.style.width = width * sliderItem.length + 2 + 'px';
    sliderImg.forEach(e => {
        e.style.width = width + 'px';
        e.style.heigth = 'auto';
    });
    firstClone.querySelector('.slider__item img').style.width = width + 'px';
    firstClone.querySelector('.slider__item img').style.heigth = 'auto';
    lastClone.querySelector('.slider__item img').style.width = width + 'px';
    lastClone.querySelector('.slider__item img').style.heigth = 'auto';
    sliderLine.style.transform = `translateX(-${width}px)`;
}

function moveLeft() {
    sliderLine.style.left = `-${currentWidth += 20}px`;
}

function moveRigth() {
    sliderLine.style.left = `${currentWidth += 20}px`;
}

function nextSlide() {
    index++
    nextBtn.removeEventListener('click', nextSlide);
    let animation = setInterval(() => {
        moveLeft();
        if (sliderLine.style.left === `-${width * index}px`) {
            clearInterval(animation);
            nextBtn.addEventListener('click', nextSlide);
            if (index == sliderImg.length - 1) {
                index = 0;
                currentWidth = 0;
                sliderLine.style.left === `0px`;
            }
        }
    }, 15);
}


function prevSlide() {
    prevBtn.removeEventListener('click', prevSlide);
    sliderLine.style.left === `${width * (sliderImg.length - 1)}px`;
    let animation = setInterval(() => {
        moveRigth();
        if (condition) {

        }

    }, 15);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
