class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title-text'];
  }

  connectedCallback() {
    this._init();
  }

  disconnectedCallback() {
    this._toggleListeners('removeEventListener');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) { return; }

    if (name === 'title-text') {
      this._title = newValue;
      this.setTitle(this._title);
    }
  }

  // Public custom methods
  setTitle(title) {
    if (this._titleEl) {
      this._titleEl.textContent = title;
    }
  }

  toggle() {
    this.isOpened() ? this.open() : this.close();
  }

  open() {
    this.setAttribute('opened', '');
    this._dispatchEvent('opened');
  }

  isOpened() {
    return this.hasAttribute('opened');
  }

  close() {
    if (this.isOpened()) {
      this.removeAttribute('opened');
      this._dispatchEvent('closed');
    }
  }

  // Private custom methods
  _init() {
    this._title = this.getAttribute('title-text') || 'Default modal title';
    this._build();

    this._titleEl = this.shadowRoot.getElementById('title');
    this._backdropEl = this.shadowRoot.getElementById('backdrop');
    this._closeEl = this.shadowRoot.getElementById('close');
    this._actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]');

    this._initListeners();
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          background: rgba(0, 0, 0, .75);
          display: none;
          height: 100vh;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 10;
        }

        #modal {
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          left: 25%;
          opacity: 0;
          pointer-events: none;
          position: fixed;
          top: 0;
          transition: all .2s ease-out;
          width: 50%;
          z-index: 100;
        }

        #header {
          background: #002F5F;
          border-bottom: 1px solid #ccc;
          color: white;
          font-weight: normal;
          padding: 0 1rem;
          text-transform: uppercase;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
        }

        #close {
          cursor: pointer;
          position: absolute;
          height: 16px;
          right: 10px;
          top: 10px;
          width: 16px;
        }

        #close:hover::before,
        #close:hover::after {
          background-color: #aaa;
        }

        #close::before,
        #close::after {
          background-color: #fff;
          content: '';
          display: inline-block;
          height: 18px;
          left: 9px;
          position: absolute;
          transition: .3s;
          top: 0;
          width: 2px;
        }

        #close::before {
          transform: rotate(45deg);
        }

        #close::after {
          transform: rotate(-45deg);
        }

        :host([opened]) #backdrop {
          display: block;
        }

        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
          top: 10vh;
        }
      </style>

      <div id="backdrop"></div>
      <div id="modal">
        <header id="header">
          <h2 id="title">${this._title}</h2>
          <span id="close"></span>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <slot name="actions"></slot>
        </section>
      </div>
    `;
  }

  _initListeners() {
    this._toggleListeners('addEventListener');
  }

  _toggleListeners(method) {
    if (typeof this._backdropEl[method] !== 'function') { throw new Error(`Wrong method name: "${method}"`); }

    this._backdropEl[method]('click', this.close.bind(this));
    this._closeEl[method]('click', this.close.bind(this));

    this._actionsSlot[method]('slotchange', () => {
      this._actionsSlot.assignedNodes()[0]
        .querySelectorAll('[data-close-modal]')
        .forEach(el => el[method]('click', this.close.bind(this)));
    });
  }

  _dispatchEvent(name) {
    this.dispatchEvent(new Event(name));
  }
}

customElements.define('nwc-modal', Modal);
