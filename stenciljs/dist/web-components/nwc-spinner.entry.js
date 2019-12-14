import { r as registerInstance, h } from './core-cff8c951.js';

const Spinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.color = 'black';
    }
    render() {
        return h("div", { class: "loader", style: { color: this.color } }, "Loading...");
    }
    static get style() { return ".loader,\n.loader:before,\n.loader:after {\n  border-radius: 50%;\n  width: 2.5em;\n  height: 2.5em;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  -webkit-animation: load7 1.8s infinite ease-in-out;\n  animation: load7 1.8s infinite ease-in-out;\n}\n\n.loader {\n  font-size: 10px;\n  margin: 20px auto;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n.loader:before,\n.loader:after {\n  content: \'\';\n  position: absolute;\n  top: 0;\n}\n\n.loader:before {\n  left: -3.5em;\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.loader:after {\n  left: 3.5em;\n}\n\n\@-webkit-keyframes load7 {\n  0%,\n  80%,\n  100% {\n    -webkit-box-shadow: 0 2.5em 0 -1.3em;\n    box-shadow: 0 2.5em 0 -1.3em;\n  }\n  40% {\n    -webkit-box-shadow: 0 2.5em 0 0;\n    box-shadow: 0 2.5em 0 0;\n  }\n}\n\n\@keyframes load7 {\n  0%,\n  80%,\n  100% {\n    -webkit-box-shadow: 0 2.5em 0 -1.3em;\n    box-shadow: 0 2.5em 0 -1.3em;\n  }\n  40% {\n    -webkit-box-shadow: 0 2.5em 0 0;\n    box-shadow: 0 2.5em 0 0;\n  }\n}"; }
};

export { Spinner as nwc_spinner };
