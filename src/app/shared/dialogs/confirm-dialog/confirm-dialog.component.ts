import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Todo } from "src/app/todos/todo";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
  providers: [BsModalService],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  confirmed$ = new Subject<boolean>();

  title = "";
  description = "";
  declineBtnLabel = "";
  confirmBtnLabel = "";

  ngOnInit() {
    this.modalService.onHidden.pipe(
      filter((reason) => reason == "backdrop-click"),
      tap(() => this.confirmed$.next(false))
    );
  }

  confirm() {
    this.confirmed$.next(true);
    this.bsModalRef.hide();
  }

  decline() {
    this.confirmed$.next(false);
    this.bsModalRef.hide();
  }
}
