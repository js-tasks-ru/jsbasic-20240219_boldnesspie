import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    this.sub('carousel-holder').append(this.carousel.elem);
    this.sub('ribbon-holder').append(this.ribbonMenu.elem);
    this.sub('slider-holder').append(this.stepSlider.elem);
    this.sub('cart-icon-holder').append(this.cartIcon.elem);


    let response = await fetch('./products.json');
    this.products = await response.json();
    this.productsGrid = new ProductsGrid(this.products);

    
    this.renderProducts({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.customEvents();
  }
  
  renderProducts(filters) {
    this.productsGrid.updateFilter(filters);

    this.sub('products-grid-holder').innerHTML = '';
    this.sub('products-grid-holder').append(this.productsGrid.elem);
  }

  customEvents() {
    document.body.addEventListener('product-add', event => {
      let product = this.products.find(product => product.id === event.detail);
      this.cart.addProduct(product);
    });

    document.body.addEventListener('change', event => {
      if (event.target.id === 'nuts-checkbox') this.renderProducts({ noNuts: event.target.checked });
      if (event.target.id === 'vegeterian-checkbox')  this.renderProducts({ vegeterianOnly: event.target.checked });
    });

    this.stepSlider.elem.addEventListener('slider-change', event => this.renderProducts({ maxSpiciness: event.detail }));

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => this.renderProducts({ category: event.detail }));
  }

  sub(ref) {
    return document.querySelector(`[data-${ref}]`);
  }
}
