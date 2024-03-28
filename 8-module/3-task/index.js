export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

