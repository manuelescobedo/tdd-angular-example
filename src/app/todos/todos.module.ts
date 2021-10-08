import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodosRoutingModule } from "./todos-routing.module";
import { TodosViewComponent } from "./todos-view/todos-view.component";
import { TodosListComponent } from "./todos-list/todos-list.component";
import { TodoFormComponent } from "./todo-form/todo-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoItemDirective } from "./todo-item/todo-item.directive";

@NgModule({
  imports: [CommonModule, TodosRoutingModule, ReactiveFormsModule, FormsModule],
  declarations: [
    TodosViewComponent,
    TodosListComponent,
    TodoItemDirective,
    TodoFormComponent,
  ],
})
export class TodosModule {}
