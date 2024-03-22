import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;

    this.render();
    this.addEventListeners();
    this.setValue(value);
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">${'<span></span>'.repeat(this.steps)}</div>
      </div>
    `);
  }

  setValue(val) {
    this.value = val;

    let percentsValue = val * 100 / this.segments;

    this.sub('progress').style.width = `${percentsValue}%`;
    this.sub('thumb').style.left = `${percentsValue}%`;
    this.sub('value').textContent = this.value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.elem.onclick = this.onClick;
  }

  onClick = event => {
    let coordX = event.clientX - this.elem.getBoundingClientRect().left;
    let value = Math.round(coordX * this.segments / this.elem.offsetWidth);

    this.setValue(value);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }))
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }
}