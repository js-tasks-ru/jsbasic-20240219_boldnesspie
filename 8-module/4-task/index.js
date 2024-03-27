import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.getProduct(product.id);

    if (!cartItem) {
      cartItem = Object.assign({}, { product, count: 1 });
      this.cartItems.push(cartItem);

    } else {
      cartItem.count += 1;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.getProduct(productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      let index = this.cartItems.findIndex(card => card.product.id === productId);
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  getProduct(id) {
    return this.cartItems.find(card => card.product.id === id);
  }

  isEmpty() {
    return this.cartItems.length ? false : true;
  }

  getTotalCount() {
    return this.cartItems
      .reduce((total, current) => total + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems
      .reduce((total, current) => total + current.product.price * current.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.open();

    this.modal.setTitle('Your order');

    this.modalBody = createElement(`
      <div>
        ${this.cartItems.map(card => this.renderProduct(card.product, card.count).outerHTML).join(' ')}
        ${this.renderOrderForm().outerHTML}
      <div>
    `);
    this.modal.setBody(this.modalBody);
    
    this.modalBody.addEventListener('click', this.onBtnClick);
    this.modalBody.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this); 
    
    if(document.body.className !== 'is-modal-open') return;

    let productId = cartItem.product.id;
    let product = this.modalBody.querySelector(`.cart-product[data-product-id=${productId}]`);

    let productCount = product.querySelector('.cart-counter__count');
    let productPrice = product.querySelector('.cart-product__price');
    let totalPrice = product.closest('.modal__body').querySelector('.cart-buttons__info-price');

    productCount.textContent = cartItem.count;
    productPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    totalPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;

    if ( !cartItem.count ) product.remove();
    if ( this.isEmpty() ) this.modal.close();
  }

  onSubmit = (event) => {
    event.preventDefault();

    let btn = event.target.querySelector('.cart-buttons__button');
    btn.classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(event.target)
      
    }).then(response => {
      if ( response.status !== 200 ) return;

      this.cartItems.length = 0;
      this.cartIcon.update(this); 
      
      this.modal.setTitle('Success!');
      this.modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `;
    });
  };

  onBtnClick = event => {
    let btn = event.target.closest('.cart-counter__button');
    if ( !btn ) return;

    let id = btn.closest('.cart-product').dataset.productId;
    let amount;

    if (btn.classList.contains('cart-counter__button_plus')) amount = 1;
    else amount = -1

    this.updateProductCount(id, amount);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

