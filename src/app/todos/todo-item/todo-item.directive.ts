import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[appTodoItem]'
})
export class TodoItemDirective {
  constructor(public templateRef: TemplateRef<any>) {

  }
}
