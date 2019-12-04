class Tooltip extends HTMLElement {
  constructor() {
    super();

    this._container = null;
    this._tooltipIcon = null;
    this.attachShadow({ mode: 'open' });
  }

  // listen to attributes changing
  static get observedAttributes() {
    return ['text'];
  }

  connectedCallback() {
    this._initUI();
    this._initListeners();
  }

  disconnectedCallback() {
    this._toggleListeners('removeEventListener');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) { return; }

    if (name === 'text') {
      this._text = newValue;
      this._tooltipIcon && this._tooltipIcon.setAttribute('aria-label', newValue);
    }
  }

  _initUI() {
    this._text = this.getAttribute('text') || 'Default tooltip text';
    this._icon = this.getAttribute('icon') || ' (?)';
    this._position = this.getAttribute('position') || 'bottom';

    this.shadowRoot.innerHTML = `
      <style>
        .tooltip {
          background-color: #555;
          border-radius: 10px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.5);
          color: white;
          font-size: .85em;
          font-weight: normal;
          padding: 5px;
          position: absolute;
          text-align: center;
          z-index: 10;
        }

        .tooltip::after {
          border-style: solid;
          border-width: 5px;
          content: "";
          position: absolute;
        }

        .bottom::after {
          border-color: transparent transparent #555 transparent;
          bottom: 100%;
          left: 50%;
          margin-left: -5px;
        }

        .right::after {
          border-color: transparent #555 transparent transparent;
          margin-top: -5px;
          right: 100%;
          top: 50%;
        }

        .icon {
          background: #555;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          padding: .05rem .4rem;
          text-align: center;
        }

        .icon:hover,
        .icon:focus {
          background: #000;
        }

        :host {
          position: relative;
        }

        :host(.important) {
          color: var(--color-primary, blue);
        }

        :host-context(p.parent) {
          color: blue;
        }

        ::slotted(.highlight) {
          border-bottom: 1px solid red;
        }
      </style>

      <slot>Default value</slot>
      <span tabindex="0" aria-label="${this._text}" class="icon">${this._icon}</span>
    `;

    this._tooltipIcon = this.shadowRoot.querySelector('.icon');
  }

  _initListeners() {
    this._toggleListeners('addEventListener');
  }

  _show() {
    if (this._contains()) { return; }

    this._container = document.createElement('div');
    this._container.textContent = this._text;
    this._container.classList.add(this._position, 'tooltip');

    this.shadowRoot.appendChild(this._container);
    this._setPosition();
  }

  _hide() {
    if (this._contains()) {
      this.shadowRoot.removeChild(this._container);
    }
  }

  _contains() {
    return this.shadowRoot.contains(this._container);
  }

  _setPosition() {
    const tooltipRect = this._tooltipIcon.getBoundingClientRect();

    this._container.style.top = this._position === 'bottom'
      ? `${tooltipRect.height + 10}px`
      : `${-tooltipRect.height / 2 - 10}px`;

    this._container.style.left = this._position === 'bottom'
      ? `${tooltipRect.left - this._container.getBoundingClientRect().width / 4 - 5}px`
      : `${tooltipRect.right}px`;
  }

  _toggleListeners(method) {
    if (typeof this._tooltipIcon[method] !== 'function') { throw new Error(`Wrong method name: "${method}"`); }

    this._tooltipIcon[method]('mouseenter', this._show.bind(this));
    this._tooltipIcon[method]('mouseleave', this._hide.bind(this));
    this._tooltipIcon[method]('focusin', this._show.bind(this));
    this._tooltipIcon[method]('focusout', this._hide.bind(this));
  }
}

customElements.define('nwc-tooltip', Tooltip);
