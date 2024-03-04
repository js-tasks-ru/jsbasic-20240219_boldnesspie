function initCarousel() {
  let leftBtn = document.querySelector('.carousel__arrow_left');
  let rightBtn = document.querySelector('.carousel__arrow_right');
  let carousel = document.querySelector('.carousel');
  let slider = carousel.querySelector('.carousel__inner');

  let sliderNum = slider.children.length - 1; // первый слайд не учитываем
  let counter = 0;
  leftBtn.style.display = 'none';

  carousel.addEventListener('click', (event) => {
    let btn = event.target.closest('.carousel__arrow');
    if(!btn) return;

    let sliderWidth = slider.offsetWidth; // Если пользователь поменяет размер окна,
                                          // надо учитывать в обработчике

    if(btn.classList.contains('carousel__arrow_right')) shiftSlide('right', sliderWidth);
    else shiftSlide('left', sliderWidth);
  })

  function updateVisibility() {
    leftBtn.style.display = counter === 0 ? 'none' : '';
    rightBtn.style.display = counter === sliderNum ? 'none' : '';
  }

  function shiftSlide(direction, width) {
    direction === 'right' ? counter++ : counter--;
    slider.style.transform = `translateX(-${width * counter}px)`;
    updateVisibility()
  }
}
