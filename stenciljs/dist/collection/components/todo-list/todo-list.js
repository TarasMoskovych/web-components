import { h } from "@stencil/core";
export class TodoList {
    constructor() {
        this.namespace = 'nwc-todo-list';
        this.tasks = [];
        this.active = 0;
        this.filters = ['All', 'Active', 'Completed'];
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
            h("section", { class: "main" },
                h("input", { class: "toggle-all", id: "toggle-all", type: "checkbox", ref: el => this.allChecked = el, onChange: this.onToggle.bind(this) }),
                h("label", { htmlFor: "toggle-all" }),
                h("ul", { class: "list" }, this.tasks.filter((task) => {
                    // 0: All
                    // 1: Active
                    // 2: Completed
                    return this.active === 0 && task || this.active === 1 && !task.completed || this.active === 2 && task.completed;
                }).map((task, idx) => (h("li", null,
                    h("input", { class: "item-toggle", type: "checkbox", id: 'item-' + idx.toString(), checked: task.completed, onChange: this.onCompleteTask.bind(this, task) }),
                    h("label", { class: task.completed ? 'item item-completed' : 'item', htmlFor: 'item-' + idx.toString() }, task.name),
                    h("button", { class: "item-remove", onClick: this.onRemoveTask.bind(this, task) })))))),
            h("footer", null,
                h("span", null,
                    this.tasks.length,
                    " ",
                    this.tasks.length === 1 ? 'item' : 'items',
                    " left"),
                h("ul", { class: "filters" }, this.filters.map((filter, idx) => (h("li", { class: this.active === idx ? 'active' : '', onClick: this.onApplyFilter.bind(this, idx) }, filter)))),
                h("span", { class: this.tasks.some((task) => task.completed) ? 'clear-completed' : 'invisible', onClick: this.onClearCompleted.bind(this) }, "Clear completed"))
        ];
        if (this.tasks.length === 0) {
            main = null;
        }
        return [
            h("header", null,
                h("input", { type: "text", placeholder: "What needs to be done?", ref: el => this.newTask = el, onKeyPress: this.onAddTask.bind(this) })),
            main
        ];
    }
    update() {
        this.nwc_todo_list_update.emit(this.tasks);
    }
    static get is() { return "nwc-todo-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./todo-list.css"]
    }; }
    static get styleUrls() { return {
        "$": ["todo-list.css"]
    }; }
    static get properties() { return {
        "namespace": {
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
            "attribute": "namespace",
            "reflect": false,
            "defaultValue": "'nwc-todo-list'"
        }
    }; }
    static get states() { return {
        "tasks": {},
        "active": {}
    }; }
    static get events() { return [{
            "method": "nwc_todo_list_update",
            "name": "nwc_todo_list_update",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "Task[]",
                "resolved": "Task[]",
                "references": {
                    "Task": {
                        "location": "local"
                    }
                }
            }
        }]; }
}
