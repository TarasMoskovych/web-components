import { r as registerInstance, c as createEvent, h, H as Host } from './core-cff8c951.js';
import { A as AV_API_KEY } from './configs-3a1b6a76.js';

const StockFinder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.list = [];
        this.empty = false;
        this.loading = false;
        this.nwc_symbol_selected = createEvent(this, "nwc_symbol_selected", 7);
    }
    onFindStocks(e) {
        e.preventDefault();
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.stockName.value}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(res => {
            const list = res['bestMatches'];
            if (list.length === 0) {
                return this.empty = true;
            }
            this.list = list.map(element => {
                return { name: element['2. name'], symbol: element['1. symbol'] };
            });
        })
            .catch(e => console.log(e))
            .then(() => this.loading = false);
    }
    onClear() {
        this.stockName.value = '';
        this.list = [];
        this.empty = false;
    }
    onSelect(symbol) {
        this.nwc_symbol_selected.emit(symbol);
    }
    hostData() {
        return { class: this.empty ? 'error' : '' };
    }
    __stencil_render() {
        let content = (h("ul", null, this.list.map(result => (h("li", { onClick: this.onSelect.bind(this, result.symbol) }, h("strong", null, result.symbol), ": ", result.name)))));
        if (this.empty) {
            content = (h("p", null, "Your search does not match any results"));
        }
        if (this.loading) {
            content = h("nwc-spinner", { color: "purple" });
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-company", type: "text", placeholder: "Type a company", ref: el => this.stockName = el }), h("button", { type: "submit", disabled: this.loading }, "Find"), h("button", { type: "button", onClick: this.onClear.bind(this) }, "Clear")),
            h("div", null, content)
        ];
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  border: 2px solid purple;\n  display: block;\n  max-width: 100%;\n  padding: 2rem;\n  width: 25rem;\n}\n\n:host(.error) {\n  border-color: red;\n}\n\nform input {\n  font: inherit;\n  color: purple;\n  padding: .1rem .25rem;\n}\n\nform input:focus,\nform button:focus {\n  outline: none;\n}\n\nform button {\n  background: purple;\n  border: none;\n  color: white;\n  cursor: pointer;\n  font: inherit;\n  margin-left: 5px;\n  padding: .25rem .5rem;\n}\n\nform button[disabled] {\n  background: #999;\n  cursor: not-allowed;\n}\n\nform button:hover:not([disabled]) {\n  background: #7e0a27;\n}\n\nform button:active {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n\n.content p {\n  font-weight: 700;\n}\n\nul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\nli {\n  border: 1px solid #ccc;\n  cursor: pointer;\n  margin: .3rem 0;\n  padding: .25rem;\n}\n\nli:hover,\nli:active {\n  background: #7e0a27;\n  color: white;\n}"; }
};

export { StockFinder as nwc_stock_finder };
