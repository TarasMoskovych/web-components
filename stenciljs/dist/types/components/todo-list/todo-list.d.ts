import { EventEmitter } from "../../stencil.core";
export interface Task {
    name: string;
    completed: boolean;
}
export declare class TodoList {
    namespace: string;
    tasks: Task[];
    active: number;
    nwc_todo_list_update: EventEmitter<Task[]>;
    allChecked: HTMLInputElement;
    newTask: HTMLInputElement;
    filters: string[];
    componentDidLoad(): void;
    onAddTask(e: KeyboardEvent): void;
    onCompleteTask(task: Task): void;
    onRemoveTask(task: Task): void;
    onApplyFilter(idx: number): void;
    onClearCompleted(): void;
    onToggle(): void;
    render(): any[];
    private update;
}
