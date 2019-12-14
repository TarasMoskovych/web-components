import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/configs';
export class StockPrice {
    constructor() {
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
    render() {
        let content = h("p", null,
            "Price: $",
            this.data.price,
            " ",
            this.data.symbol);
        this.isValid = this.inputValue && this.inputValue.trim().length > 0;
        if (this.error) {
            content = h("p", { class: "error" }, this.error);
        }
        if (this.loading) {
            content = h("nwc-spinner", { color: "purple" });
        }
        return [
            h("form", { onSubmit: this.onFetch.bind(this) },
                h("input", { id: "stock-symbol", type: "text", placeholder: "Type symbol", ref: el => this.stockInput = el, value: this.inputValue, onInput: this.onInput.bind(this) }),
                h("button", { type: "submit", disabled: !this.isValid || this.loading }, "Fetch"),
                h("button", { type: "button", onClick: this.onClear.bind(this) }, "Clear")),
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
    static get is() { return "nwc-stock-price"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-price.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-price.css"]
    }; }
    static get properties() { return {
        "symbol": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "symbol",
            "reflect": true
        }
    }; }
    static get states() { return {
        "data": {},
        "inputValue": {},
        "isValid": {},
        "error": {},
        "loading": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "symbol",
            "methodName": "symbolChanged"
        }]; }
    static get listeners() { return [{
            "name": "nwc_symbol_selected",
            "method": "onSymbolSelected",
            "target": "body",
            "capture": false,
            "passive": false
        }]; }
}
