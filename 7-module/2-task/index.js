import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalWindow = createElement(`
      <div class="container">
        <div class="modal">
          <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title"></h3>
            </div>
            <div class="modal__body"></div>
          </div>
        </div>
      </div>
    `);

    let closeBtn = this.modalWindow.querySelector('.modal__close');
    closeBtn.onclick = () => this.close();

    document.onkeydown = event => {
      if(event.code !== 'Escape') return;
      this.close();
    }
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.modalWindow);
  }

  setTitle(title) {
    let modalTitle = this.modalWindow.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(elem) {
    let modalBody = this.modalWindow.querySelector('.modal__body');
    modalBody.innerHTML = elem.outerHTML;
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.modalWindow.remove();
    document.onkeydown = null;
  }
}