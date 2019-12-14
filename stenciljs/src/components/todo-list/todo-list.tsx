import { Component, h, State, Event, EventEmitter, Prop } from "@stencil/core";

export interface Task {
  name: string;
  completed: boolean;
}

@Component({
  tag: 'nwc-todo-list',
  styleUrl: './todo-list.css',
  shadow: true
})
export class TodoList {
  @Prop() namespace = 'nwc-todo-list';
  @State() tasks: Task[] = [];
  @State() active: number = 0;
  @Event({ bubbles: true, composed: true }) nwc_todo_list_update: EventEmitter<Task[]>;

  allChecked: HTMLInputElement;
  newTask: HTMLInputElement;
  filters = ['All', 'Active', 'Completed'];

  componentDidLoad() {
    const tasks = window.localStorage.getItem(this.namespace);

    if (tasks) { this.tasks = JSON.parse(tasks); }
    window.addEventListener('beforeunload', () => window.localStorage.setItem(this.namespace, JSON.stringify(this.tasks)));
  }

  onAddTask(e: KeyboardEvent) {
    const name = this.newTask.value;

    if (e.key === 'Enter' && name) {
      this.tasks = [...this.tasks, { name, completed: false }];
      this.newTask.value = '';
      this.update();
    }
  }

  onCompleteTask(task: Task) {
    const idx = this.tasks.findIndex((t: Task) => t.name === task.name);

    if (idx !== -1) {
      this.tasks[idx].completed = !this.tasks[idx].completed;
      this.tasks = [...this.tasks];
      this.update();
    }
  }

  onRemoveTask(task: Task) {
    const idx = this.tasks.findIndex((t: Task) => t.name === task.name);

    if (idx !== -1) {
      this.tasks.splice(idx, 1);
      this.tasks = [...this.tasks];
      this.update();
    }
  }

  onApplyFilter(idx: number) {
    if (this.active !== idx) {
      this.active = idx;
    }
  }

  onClearCompleted() {
    this.tasks = this.tasks.filter((task: Task) => !task.completed);
    this.update();
  }

  onToggle() {
    this.tasks = this.tasks.map((task: Task) => {
      task.completed = this.allChecked.checked;
      return task;
    });
    this.update();
  }

  render() {
    let main = [
      <section class="main">
        <input
          class="toggle-all"
          id="toggle-all"
          type="checkbox"
          ref={el => this.allChecked = el}
          onChange={this.onToggle.bind(this)}
        />
        <label htmlFor="toggle-all"></label>
        <ul class="list">
          {this.tasks.filter((task: Task) => {
            // 0: All
            // 1: Active
            // 2: Completed
            return this.active === 0 && task || this.active === 1 && !task.completed || this.active === 2 && task.completed;
          }).map((task: Task, idx: number) => (
            <li>
              <input
                class="item-toggle"
                type="checkbox"
                id={'item-' + idx.toString()}
                checked={task.completed}
                onChange={this.onCompleteTask.bind(this, task)}
              />
              <label class={task.completed ? 'item item-completed' : 'item'} htmlFor={'item-' + idx.toString()}>
                {task.name}
              </label>
              <button class="item-remove" onClick={this.onRemoveTask.bind(this, task)}></button>
            </li>
          ))}
        </ul>
      </section>,
      <footer>
        <span>{this.tasks.length} {this.tasks.length === 1 ? 'item' : 'items'} left</span>
        <ul class="filters">
          {this.filters.map((filter: string, idx: number) => (
            <li
              class={this.active === idx ? 'active' : ''}
              onClick={this.onApplyFilter.bind(this, idx)}
            >{filter}</li>
          ))}
        </ul>
        <span
          class={this.tasks.some((task: Task) => task.completed) ? 'clear-completed': 'invisible'}
          onClick={this.onClearCompleted.bind(this)}
        >Clear completed
        </span>
      </footer>
    ];

    if (this.tasks.length === 0) { main = null; }

    return [
      <header>
        <input
          type="text"
          placeholder="What needs to be done?"
          ref={el => this.newTask = el}
          onKeyPress={this.onAddTask.bind(this)}
        />
      </header>,
      main
    ];
  }

  private update() {
    this.nwc_todo_list_update.emit(this.tasks);
  }
}
