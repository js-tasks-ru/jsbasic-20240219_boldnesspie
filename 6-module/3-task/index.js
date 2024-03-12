import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    this.slides.forEach(slide => {
      this._container.lastElementChild
        .insertAdjacentHTML('beforeend', `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `);
    });


    this._container.addEventListener('click', event => {
      let btn = event.target.closest('.carousel__button');
      if(!btn) return;

      let id = btn.closest('.carousel__slide').dataset.id;
      
      this._container.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
    });


    let leftBtn = this._container.querySelector('.carousel__arrow_left');
    let rightBtn = this._container.querySelector('.carousel__arrow_right');
    let slider = this._container.querySelector('.carousel__inner');

    let sliderNum = Object.keys(this.slides).length - 1; // первый слайд не учитываем
    let counter = 0;
    leftBtn.style.display = 'none';

    this._container.addEventListener('click', (event) => {
      let btn = event.target.closest('.carousel__arrow');
      if(!btn) return;

      let sliderWidth = slider.offsetWidth;

      if(btn.classList.contains('carousel__arrow_right')) shiftSlide('right', sliderWidth);
      else shiftSlide('left', sliderWidth);
    })

    function shiftSlide(direction, width) {
      direction === 'right' ? counter++ : counter--;
      slider.style.transform = `translateX(-${width * counter}px)`;
      updateVisibility()
    }
    
    function updateVisibility() {
      leftBtn.style.display = counter === 0 ? 'none' : '';
      rightBtn.style.display = counter === sliderNum ? 'none' : '';
    }
  }

  get elem() {
    return this._container;
  }
}
