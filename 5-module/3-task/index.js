function initCarousel() {

  let leftBtn = document.querySelector('.carousel__arrow_left');
  let rightBtn = document.querySelector('.carousel__arrow_right');

  let slides = document.querySelector('.carousel__inner');
  let slideWidth = slides.offsetWidth;
  let slidesLength = slides.children.length - 1; // 1 слайд показывается сразу

  let counter = 0;
  leftBtn.style.display = 'none';

  leftBtn.addEventListener('click', previous);
  rightBtn.addEventListener('click', next);

  function previous() {
    rightBtn.style.display = '';
    counter--;
    slides.style.transform = `translateX(-${slideWidth * counter}px)`;
    
    if(counter === 0) {
      leftBtn.style.display = 'none';
    }
  }

  function next() {
    leftBtn.style.display = '';
    counter++;
    slides.style.transform = `translateX(-${slideWidth * counter}px)`;

    if (counter === slidesLength) {
      rightBtn.style.display = 'none';
      counter = slidesLength;
    }
  }
}
