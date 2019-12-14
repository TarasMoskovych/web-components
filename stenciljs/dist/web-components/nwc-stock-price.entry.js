import { r as registerInstance, h, d as getElement, H as Host } from './core-cff8c951.js';
import { A as AV_API_KEY } from './configs-3a1b6a76.js';

const StockPrice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.data = { price: 0, symbol: '' };
        this.isValid = false;
        this.error = '';
        this.loading = false;
    }
    symbolChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.updateData(newValue);
        }
    }
    onSymbolSelected(e) {
        if (e.detail && e.detail !== this.symbol) {
            this.updateData(e.detail);
        }
    }
    componentWillLoad() {
        console.log('will load hook');
    }
    componentWillUpdate() {
        console.log('will update hook');
    }
    componentDidUpdate() {
        console.log('did update hook');
        // if (this.symbol !== this.initialSymbol) {
        //   this.updateData(this.symbol);
        // }
    }
    componentDidUnload() {
        console.log('did unload hook');
    }
    componentDidLoad() {
        if (this.symbol) {
            this.updateData(this.symbol);
        }
    }
    hostData() {
        return { class: this.error ? 'error' : '' };
    }
    __stencil_render() {
        let content = h("p", null, "Price: $", this.data.price, " ", this.data.symbol);
        this.isValid = this.inputValue && this.inputValue.trim().length > 0;
        if (this.error) {
            content = h("p", { class: "error" }, this.error);
        }
        if (this.loading) {
            content = h("nwc-spinner", { color: "purple" });
        }
        return [
            h("form", { onSubmit: this.onFetch.bind(this) }, h("input", { id: "stock-symbol", type: "text", placeholder: "Type symbol", ref: el => this.stockInput = el, value: this.inputValue, onInput: this.onInput.bind(this) }), h("button", { type: "submit", disabled: !this.isValid || this.loading }, "Fetch"), h("button", { type: "button", onClick: this.onClear.bind(this) }, "Clear")),
            h("div", { class: "content" }, content)
        ];
    }
    onFetch(e) {
        e.preventDefault();
        // this.data.symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value || 'MSFT';
        this.data = Object.assign(Object.assign({}, this.data), { symbol: this.stockInput.value || 'MSFT' });
        this.symbol = this.data.symbol;
    }
    onInput(e) {
        this.inputValue = e.target.value;
    }
    onClear() {
        this.inputValue = '';
        this.error = '';
        this.data = { symbol: '', price: 0 };
    }
    fetchPrice(symbol) {
        this.error = '';
        this.loading = true;
        return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`)
            .then(response => {
            if (response.status !== 200) {
                throw new Error('Invalid');
            }
            return response.json();
        })
            .then(data => {
            const price = data['Global Quote'];
            if (!price) {
                return this.error = 'Invalid symbol!';
            }
            this.data = Object.assign(Object.assign({}, this.data), { price: price['05. price'] || 0 });
        })
            .catch(err => this.error = err.message || 'Something wrong!')
            .then(() => this.loading = false);
    }
    updateData(symbol) {
        // this.initialSymbol = symbol;
        this.data.symbol = symbol;
        this.fetchPrice(symbol);
        this.inputValue = symbol;
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "symbol": ["symbolChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  border: 2px solid purple;\n  display: block;\n  max-width: 100%;\n  padding: 2rem;\n  width: 25rem;\n}\n\n:host(.error) {\n  border-color: red;\n}\n\nform input {\n  font: inherit;\n  color: purple;\n  padding: .1rem .25rem;\n}\n\nform input:focus,\nform button:focus {\n  outline: none;\n}\n\nform button {\n  background: purple;\n  border: none;\n  color: white;\n  cursor: pointer;\n  font: inherit;\n  margin-left: 5px;\n  padding: .25rem .5rem;\n}\n\nform button[disabled] {\n  background: #999;\n  cursor: not-allowed;\n}\n\nform button:hover:not([disabled]) {\n  background: #7e0a27;\n}\n\nform button:active {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n\n.content p {\n  font-weight: 700;\n}"; }
};

export { StockPrice as nwc_stock_price };
