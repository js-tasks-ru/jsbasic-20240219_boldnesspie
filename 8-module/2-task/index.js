import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        ${this.products
          .map(product => new ProductCard(product).elem.outerHTML)
          .join(' ')}
      </div>
    </div>
    `);
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let filtered = this.products.filter(filterCards, this.filters);
    
    this.elem.querySelector('.products-grid__inner').innerHTML = filtered
      .map(product => new ProductCard(product).elem.outerHTML)
      .join(' ');

    function filterCards(product) {
      let condition = true;

      for (let key in this) {
        
        switch (key) {
          case 'noNuts':
            if(this[key] && product.nuts === this[key]) condition = false;
            break;

          case 'vegeterianOnly':
            if(this[key] && product.vegeterian !== this[key]) condition = false;
            break;

          case 'maxSpiciness':
            if(this[key] && product.spiciness > this[key]) condition = false;
            break;

          case 'category':
            if(this[key] && product.category !== this[key]) condition = false;
            break;
        }
      }

      return condition;
    }
  }
}
