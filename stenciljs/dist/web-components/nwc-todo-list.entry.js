import { r as registerInstance, c as createEvent, h } from './core-cff8c951.js';

const TodoList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.namespace = 'nwc-todo-list';
        this.tasks = [];
        this.active = 0;
        this.filters = ['All', 'Active', 'Completed'];
        this.nwc_todo_list_update = createEvent(this, "nwc_todo_list_update", 7);
    }
    componentDidLoad() {
        const tasks = window.localStorage.getItem(this.namespace);
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
        window.addEventListener('beforeunload', () => window.localStorage.setItem(this.namespace, JSON.stringify(this.tasks)));
    }
    onAddTask(e) {
        const name = this.newTask.value;
        if (e.key === 'Enter' && name) {
            this.tasks = [...this.tasks, { name, completed: false }];
            this.newTask.value = '';
            this.update();
        }
    }
    onCompleteTask(task) {
        const idx = this.tasks.findIndex((t) => t.name === task.name);
        if (idx !== -1) {
            this.tasks[idx].completed = !this.tasks[idx].completed;
            this.tasks = [...this.tasks];
            this.update();
        }
    }
    onRemoveTask(task) {
        const idx = this.tasks.findIndex((t) => t.name === task.name);
        if (idx !== -1) {
            this.tasks.splice(idx, 1);
            this.tasks = [...this.tasks];
            this.update();
        }
    }
    onApplyFilter(idx) {
        if (this.active !== idx) {
            this.active = idx;
        }
    }
    onClearCompleted() {
        this.tasks = this.tasks.filter((task) => !task.completed);
        this.update();
    }
    onToggle() {
        this.tasks = this.tasks.map((task) => {
            task.completed = this.allChecked.checked;
            return task;
        });
        this.update();
    }
    render() {
        let main = [
            h("section", { class: "main" }, h("input", { class: "toggle-all", id: "toggle-all", type: "checkbox", ref: el => this.allChecked = el, onChange: this.onToggle.bind(this) }), h("label", { htmlFor: "toggle-all" }), h("ul", { class: "list" }, this.tasks.filter((task) => {
                // 0: All
                // 1: Active
                // 2: Completed
                return this.active === 0 && task || this.active === 1 && !task.completed || this.active === 2 && task.completed;
            }).map((task, idx) => (h("li", null, h("input", { class: "item-toggle", type: "checkbox", id: 'item-' + idx.toString(), checked: task.completed, onChange: this.onCompleteTask.bind(this, task) }), h("label", { class: task.completed ? 'item item-completed' : 'item', htmlFor: 'item-' + idx.toString() }, task.name), h("button", { class: "item-remove", onClick: this.onRemoveTask.bind(this, task) })))))),
            h("footer", null, h("span", null, this.tasks.length, " ", this.tasks.length === 1 ? 'item' : 'items', " left"), h("ul", { class: "filters" }, this.filters.map((filter, idx) => (h("li", { class: this.active === idx ? 'active' : '', onClick: this.onApplyFilter.bind(this, idx) }, filter)))), h("span", { class: this.tasks.some((task) => task.completed) ? 'clear-completed' : 'invisible', onClick: this.onClearCompleted.bind(this) }, "Clear completed"))
        ];
        if (this.tasks.length === 0) {
            main = null;
        }
        return [
            h("header", null, h("input", { type: "text", placeholder: "What needs to be done?", ref: el => this.newTask = el, onKeyPress: this.onAddTask.bind(this) })),
            main
        ];
    }
    update() {
        this.nwc_todo_list_update.emit(this.tasks);
    }
    static get style() { return ":host {\n  background: #fff;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);\n  display: block;\n  font: 14px \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  position: relative;\n}\n\nheader input {\n  background: rgba(0, 0, 0, 0.003);\n  border: none;\n  -webkit-box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);\n  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);\n  color: #4d4d4d;\n  font-size: 24px;\n  padding: 16px 16px 16px 60px;\n  width: calc(100% - 76px);\n}\n\nheader input:focus {\n  outline: none;\n}\n\n.main {\n  position: relative;\n}\n\n.toggle-all {\n  border: none;\n  opacity: 0;\n  position: absolute;\n  text-align: center;\n}\n\n.toggle-all + label {\n  font-size: 0;\n  height: 34px;\n  left: -6px;\n  position: absolute;\n  top: -50px;\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n  width: 60px;\n}\n\n.toggle-all + label::before {\n  color: #e6e6e6;\n  cursor: pointer;\n  font-size: 22px;\n  padding: 10px 27px;\n  content: \"❯\";\n}\n\n.toggle-all:checked + label::before {\n  color: #737373;\n}\n\n.list,\n.filters {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.list li {\n  border-bottom: 1px solid #ededed;\n  font-size: 24px;\n  position: relative;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\n\n.list li:hover {\n  background: #f5f5f5;\n}\n\n.list li:hover .item-remove {\n  display: block;\n}\n\n.item {\n  background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);\n  background-position: center left;\n  background-repeat: no-repeat;\n  color: #4d4d4d;\n  cursor: pointer;\n  display: block;\n  line-height: 1.2;\n  padding: 15px 15px 15px 60px;\n  -webkit-transition: color 0.4s;\n  transition: color 0.4s;\n  word-break: break-all;\n}\n\n.item-completed {\n  color: #d9d9d9;\n  text-decoration: line-through;\n}\n\n.item-toggle {\n  -webkit-appearance: none;\n  border: none;\n  bottom: 0;\n  cursor: pointer;\n  height: auto;\n  margin: auto 0;\n  opacity: 0;\n  position: absolute;\n  text-align: center;\n  top: 0;\n  width: 40px;\n}\n\n.item-toggle:checked + .item {\n  background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E);\n}\n\n.item-remove {\n  background: none;\n  border: 0;\n  bottom: 0;\n  color: #cc9a9a;\n  cursor: pointer;\n  display: none;\n  font-size: 30px;\n  height: 40px;\n  margin: auto 0;\n  position: absolute;\n  right: 10px;\n  top: 0;\n  -webkit-transition: color 0.2s ease-out;\n  transition: color 0.2s ease-out;\n  width: 40px;\n}\n\n.item-remove:focus,\n.item-remove:hover {\n  color: #af5b5e;\n  outline: none;\n}\n\n.item-remove::after {\n  content: \"×\";\n}\n\nfooter {\n  border-top: 1px solid #e6e6e6;\n  color: #777;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  height: 20px;\n  padding: 10px 15px;\n  text-align: center;\n}\n\n.filters {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.filters li {\n  cursor: pointer;\n  padding: 0 5px;\n}\n\n.filters li.active {\n  border-bottom: 1px solid #777;\n  color: #000;\n}\n\n.clear-completed {\n  cursor: pointer;\n}\n\n.clear-completed:hover {\n  text-decoration: underline;\n}\n\n.invisible {\n  visibility: hidden;\n}"; }
};

export { TodoList as nwc_todo_list };
