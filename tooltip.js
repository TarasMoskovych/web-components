class Tooltip extends HTMLElement {
  constructor() {
    super();

    this._container = null;
    this._tooltip = null;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._initVariables();
    this._initUI();
    this._initListeners();
  }

  _initVariables() {
    this._text = this.getAttribute('text') || 'Default tooltip text';
    this._icon = this.getAttribute('icon') || ' (?)';
    this._position = this.getAttribute('position') || 'bottom';

    this.shadowRoot.innerHTML = `
      <style>
        span {
          cursor: pointer;
        }

        div {
          background-color: #555;
          border-radius: 10px;
          color: white;
          font-size: .85em;
          padding: 5px;
          position: absolute;
          text-align: center;
          transition: all 1s;
          z-index: 10;
        }

        div::after {
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
      </style>

      <slot>Default value</slot>
      <span>${this._icon}</span>
    `;

    this._tooltip = this.shadowRoot.querySelector('span');
  }

  _initUI() {
    this.shadowRoot.appendChild(this._tooltip);

    this.style.position = 'relative';
  }

  _initListeners() {
    this._tooltip.addEventListener('mouseenter', this._show.bind(this));
    this._tooltip.addEventListener('mouseleave', this._hide.bind(this));
  }

  _show() {
    this._container = document.createElement('div');
    this._container.textContent = this._text;
    this._container.classList.add(this._position);

    this.shadowRoot.appendChild(this._container);
    this._setPosition();
  }

  _hide() {
    this.shadowRoot.removeChild(this._container);
  }

  _setPosition() {
    const tooltipRect = this._tooltip.getBoundingClientRect();

    this._container.style.top = this._position === 'bottom' ? `${tooltipRect.height + 10}px` : `${-tooltipRect.height / 2 - 10}px`;
    this._container.style.left = this._position === 'bottom' ? `${tooltipRect.left - this._container.getBoundingClientRect().width / 4 - 5}px` : `${tooltipRect.right}px`;
  }
}

customElements.define('nwc-tooltip', Tooltip);
