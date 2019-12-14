import { r as registerInstance, h } from './core-cff8c951.js';

const SideDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        let main = (h("div", { class: "contact-info" }, h("h2", null, "Contact Information"), h("ul", null, h("li", null, "Phone: +123456789"), h("li", null, "Email: abc@gmail.com"))));
        if (!this.showContactTab) {
            main = h("slot", null);
        }
        return [
            h("div", { onClick: this.close.bind(this), class: "backdrop" }),
            h("aside", null, h("header", null, h("h1", null, this.titletext), h("button", { onClick: this.close.bind(this) }, "X")), h("section", { class: "tabs" }, h("button", { class: !this.showContactTab ? 'active' : '', onClick: this.onContentChange.bind(this, 'nav') }, "Navigation"), h("button", { class: this.showContactTab ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")), h("main", null, main))
        ];
    }
    onContentChange(content) {
        this.showContactTab = content === 'contact';
    }
    static get style() { return ".backdrop {\n  background-color: rgba(0, 0, 0, .75);\n  height: 100vh;\n  left: 0%;\n  opacity: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  -webkit-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n  width: 100%;\n  z-index: 10;\n}\n\naside {\n  background: #e9e9e9;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .26);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, .26);\n  height: 100vh;\n  left: -100%;\n  max-width: 80%;\n  position: fixed;\n  top: 0;\n  -webkit-transition: all .35s ease-out;\n  transition: all .35s ease-out;\n  width: 30rem;\n  z-index: 100;\n}\n\n:host([opened]) aside {\n  left: 0\n}\n\n:host([opened]) .backdrop {\n  opacity: 1;\n  pointer-events: all;\n}\n\nheader {\n  background: #222;\n  padding: 1rem;\n  position: relative;\n}\n\nheader h1 {\n  font-size: 1.5rem;\n  color: white;\n  margin: 0;\n}\n\nheader button {\n  background: transparent;\n  border: none;\n  color: white;\n  cursor: pointer;\n  font-size: 1.2rem;\n  padding: 1rem;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\nheader button:focus {\n  outline: none;\n}\n\n.tabs {\n  display: -ms-flexbox;\n  display: flex;\n  margin: 1rem 0;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.tabs button {\n  background: white;\n  border: 1px solid black;\n  font-size: .9rem;\n  color: black;\n  text-align: center;\n  -webkit-transition: .3s;\n  transition: .3s;\n  padding: .25rem 0;\n  width: 30%;\n}\n\n.tabs button.active,\n.tabs button:hover,\n.tabs button:active {\n  background: black;\n  color: white;\n}\n\n.tabs button:focus {\n  outline: none;\n}\n\n.contact-info {\n  padding: 0 1rem;\n}"; }
};

export { SideDrawer as nwc_side_drawer };
