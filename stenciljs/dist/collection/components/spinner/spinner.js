import { h } from "@stencil/core";
export class Spinner {
    constructor() {
        this.color = 'black';
    }
    render() {
        return h("div", { class: "loader", style: { color: this.color } }, "Loading...");
    }
    static get is() { return "nwc-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./spinner.css"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": false,
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
            "attribute": "color",
            "reflect": true,
            "defaultValue": "'black'"
        }
    }; }
}
