import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { filter, switchMap, take } from "rxjs/operators";
import { ConfirmDialogComponent } from "src/app/shared/dialogs/confirm-dialog/confirm-dialog.component";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todos-view",
  templateUrl: "./todos-view.component.html",
  styleUrls: ["./todos-view.component.css"],
})
export class TodosViewComponent implements OnInit {
  todos: Todo[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadTodosList();
  }

  loadTodosList() {
    this.todoService
      .getItems()
      .pipe(take(1))
      .subscribe((todos) => (this.todos = todos));
  }

  checkItem(item: Todo): void {
    this.todoService
      .updateItem({
        ...item,
        lastUpdate: Date.now(),
      })
      .pipe(take(1))
      .subscribe(
        () => {
          this.loadTodosList();
        },
        () => {
          this.toastr.error(
            "An error occured when item attempts to be checked"
          );
        }
      );
  }

  deleteItem(item: Todo): void {
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState: {
        title: "Delete item",
        description: "Are you sure do you want to delete this item?",
        declineBtnLabel: "Cancel",
        confirmBtnLabel: "Ok",
      },
    });

    (this.bsModalRef.content as ConfirmDialogComponent).confirmed$
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.todoService.deleteItem(item.id)),
        take(1)
      )
      .subscribe(
        () => {
          this.loadTodosList();
          this.toastr.success("Item was deleted!");
        },
        () => {
          this.toastr.error(
            "An error ocurred when item attempts to be deleted"
          );
        }
      );
  }
  savedItem(item: Todo) {
    this.todoService
      .createItem({
        completed: false,
        createdAt: Date.now(),
        title: item.title,
      })
      .pipe(take(1))
      .subscribe(
        () => {
          this.toastr.success("New item was added!");
          this.loadTodosList();
        },
        () => {
          this.toastr.error(
            "An error ocurred when item attempts to be created"
          );
        }
      );
  }
}
