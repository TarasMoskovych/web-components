class ConfirmLink extends HTMLAnchorElement {

  connectedCallback() {
    this.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(e) {
    if (!confirm('Do you really want to leave?')) {
      e.preventDefault();
    }
  }
}

customElements.define('nwc-confirm-link', ConfirmLink, { extends: 'a' });
