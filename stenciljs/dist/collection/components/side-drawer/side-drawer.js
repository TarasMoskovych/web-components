import { h } from "@stencil/core";
export class SideDrawer {
    constructor() {
        this.showContactTab = false;
        this.titletext = 'Default title text';
    }
    async open() {
        if (!this.opened) {
            this.opened = true;
        }
    }
    async close() {
        if (this.opened) {
            this.opened = false;
        }
    }
    render() {
        let main = (h("div", { class: "contact-info" },
            h("h2", null, "Contact Information"),
            h("ul", null,
                h("li", null, "Phone: +123456789"),
                h("li", null, "Email: abc@gmail.com"))));
        if (!this.showContactTab) {
            main = h("slot", null);
        }
        return [
            h("div", { onClick: this.close.bind(this), class: "backdrop" }),
            h("aside", null,
                h("header", null,
                    h("h1", null, this.titletext),
                    h("button", { onClick: this.close.bind(this) }, "X")),
                h("section", { class: "tabs" },
                    h("button", { class: !this.showContactTab ? 'active' : '', onClick: this.onContentChange.bind(this, 'nav') }, "Navigation"),
                    h("button", { class: this.showContactTab ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")),
                h("main", null, main))
        ];
    }
    onContentChange(content) {
        this.showContactTab = content === 'contact';
    }
    static get is() { return "nwc-side-drawer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./side-drawer.css"]
    }; }
    static get styleUrls() { return {
        "$": ["side-drawer.css"]
    }; }
    static get properties() { return {
        "titletext": {
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
            "attribute": "titletext",
            "reflect": true,
            "defaultValue": "'Default title text'"
        },
        "opened": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "opened",
            "reflect": true
        }
    }; }
    static get states() { return {
        "showContactTab": {}
    }; }
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "close": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
