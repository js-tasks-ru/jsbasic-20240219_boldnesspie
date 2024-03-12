import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this._container = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    this._menu = this._container.querySelector('.ribbon__inner');

    this.categories.forEach(category => {
      this._menu.insertAdjacentHTML('beforeend', `
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
    });

    this._menu.firstElementChild.classList.add('ribbon__item_active');

    this._container.addEventListener('click', event => {
      event.preventDefault();

      let menuItem = event.target.closest('.ribbon__item');
      if ( !menuItem ) return;
      
      let items = this._menu.children;
      addClassToElem(items);

      let id = menuItem.dataset.id;
      menuItem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: id,
        bubbles: true
      }));

      function addClassToElem(elems) {
        for(let elem of elems) {
          elem.classList.remove('ribbon__item_active');
        }
        menuItem.classList.add('ribbon__item_active');
      }
    });

    let btnLeft = this._container.querySelector('.ribbon__arrow_left');
    let btnRight = this._container.querySelector('.ribbon__arrow_right');

    this._container.addEventListener('click', event => {
      let btn = event.target.closest('.ribbon__arrow');
      if ( !btn ) return;
      
      let menu = this._menu;
      let value = 350;
      let onRightBtn = btn.classList.contains('ribbon__arrow_right');

      if( onRightBtn ) shiftMenu('right');
      else shiftMenu('left');

      menu.addEventListener('scroll', btnVisibility);

      function shiftMenu(direction) {
        let scrlDirection = direction === 'right' ? value : -value;
        menu.scrollBy(scrlDirection, 0);
      }

      function btnVisibility() {
        let scrollWidth = menu.scrollWidth;
        let clientWidth = menu.clientWidth;

        let scrollLeft = menu.scrollLeft;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;
        let borderVal = 1;

        scrollLeft > borderVal ? btnLeft.classList.add('ribbon__arrow_visible')
          : btnLeft.classList.remove('ribbon__arrow_visible');
        scrollRight > borderVal ? btnRight.classList.add('ribbon__arrow_visible')
          : btnRight.classList.remove('ribbon__arrow_visible');
      }
    });
  }

  get elem() {
    return this._container;
  }
}