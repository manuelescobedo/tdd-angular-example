import {
  EventEmitter,
  Component,
  Input,
  Output,
  OnChanges,
  ContentChild,
} from "@angular/core";
import { Todo } from "../todo";
import { TodoItemDirective } from "../todo-item/todo-item.directive";

@Component({
  selector: "app-todos-list",
  templateUrl: "./todos-list.component.html",
  styleUrls: ["./todos-list.component.css"],
})
export class TodosListComponent implements OnChanges {
  @Input() list: Todo[] = [];

  @ContentChild(TodoItemDirective) todoItem: TodoItemDirective;

  pendingItems: Todo[] = [];

  ngOnChanges() {
    this.pendingItems = this.list.filter((i) => !i.completed);
  }

}
