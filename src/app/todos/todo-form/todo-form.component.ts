import { EventEmitter, Component, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.css"],
})
export class TodoFormComponent {
  formGroup: FormGroup;

  @Output() updatedItem = new EventEmitter<Todo>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      title: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
  }

  savedItem() {
    this.updatedItem.emit(this.formGroup.value);
    this.formGroup.reset();
  }
}
