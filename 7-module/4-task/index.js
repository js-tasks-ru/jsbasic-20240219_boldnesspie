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

  setValue(val, mouseLeft) {
    this.value = val;

    let percentsValue = val * 100 / this.segments;

    if (mouseLeft) percentsValue = mouseLeft / this.elem.offsetWidth * 100;

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
    this.elem.onpointerdown = this.onMouseDown;
  }

  onClick = event => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;

    this.setValue(Math.round(left * this.segments / this.elem.offsetWidth));

    this.customEvent();
  }

  onMouseDown = event => {
    event.preventDefault();
    if(!event.target.classList.contains('slider__thumb')) return;

    document.onpointermove = event => {
      this.elem.classList.add('slider_dragging');

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      if (left < 0) left = 0;
      if (left > this.elem.offsetWidth) left = this.elem.offsetWidth;

      this.setValue(Math.round(left * this.segments / this.elem.offsetWidth), left);
    }

    document.onpointerup = () => {
      this.elem.classList.remove('slider_dragging');

      this.setValue(this.value);
      this.customEvent();

      document.onpointermove = null;
      document.onpointerdown = null;
    }
  }

  customEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }
}