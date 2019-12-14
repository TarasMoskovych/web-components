import { h } from "@stencil/core";
import { AV_API_KEY } from "../../global/configs";
export class StockFinder {
    constructor() {
        this.list = [];
        this.empty = false;
        this.loading = false;
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
    render() {
        let content = (h("ul", null, this.list.map(result => (h("li", { onClick: this.onSelect.bind(this, result.symbol) },
            h("strong", null, result.symbol),
            ": ",
            result.name)))));
        if (this.empty) {
            content = (h("p", null, "Your search does not match any results"));
        }
        if (this.loading) {
            content = h("nwc-spinner", { color: "purple" });
        }
        return [
            h("form", { onSubmit: this.onFindStocks.bind(this) },
                h("input", { id: "stock-company", type: "text", placeholder: "Type a company", ref: el => this.stockName = el }),
                h("button", { type: "submit", disabled: this.loading }, "Find"),
                h("button", { type: "button", onClick: this.onClear.bind(this) }, "Clear")),
            h("div", null, content)
        ];
    }
    static get is() { return "nwc-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-finder.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-finder.css"]
    }; }
    static get states() { return {
        "list": {},
        "empty": {},
        "loading": {}
    }; }
    static get events() { return [{
            "method": "nwc_symbol_selected",
            "name": "nwc_symbol_selected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
