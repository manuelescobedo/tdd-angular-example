import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Todo } from "../todo";
import { TodoItemDirective } from "./todo-item.directive";

@Component({
  selector: "stub-component",
  template: `
    <ng-container *ngTemplateOutlet="todoItem; context: ctx"></ng-container>
    <ng-template #todoItem appTodoItem let-item="item">
      {{ item.title }}
    </ng-template>
  `,
})
class StubComponent {
  ctx = {
    item: {
      title: "Title",
      completed: false,
      createdAt: Date.now(),
    },
  };

  @Input()
  set todo(value: Todo) {
    this.ctx.item = value;
  }
}

describe("TodoItemDirective", () => {
  let fixture: ComponentFixture<StubComponent>;
  let component: StubComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemDirective, StubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("Should be created", () => {
    const mock: Todo = {
      title: "Test",
      completed: false,
      createdAt: Date.now(),
    };
    component.todo = mock;

    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).innerHTML).toContain(mock.title);
  });
});
