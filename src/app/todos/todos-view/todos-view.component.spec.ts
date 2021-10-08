
import { inject, async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../todo.service';
import { TodosListComponent } from '../todos-list/todos-list.component';
import { TodosViewComponent } from './todos-view.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from '../todo';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { TodoItemDirective } from '../todo-item/todo-item.directive';

describe('TodosViewComponent', () => {
  let component: TodosViewComponent;
  let fixture: ComponentFixture<TodosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ToastrModule.forRoot(), FormsModule, HttpClientTestingModule, ReactiveFormsModule, ModalModule.forRoot()],
      declarations: [TodosViewComponent, TodoItemDirective, ConfirmDialogComponent, TodosListComponent, TodoFormComponent],
      providers: [BsModalService, TodoService],

    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ConfirmDialogComponent],
        }
      })
      .compileComponents()
      ;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should show a toastr success message when user adds a todo item", fakeAsync(inject([TodoService, ToastrService], (todoService: TodoService, toastrService: ToastrService) => {
    spyOn(todoService, 'createItem').and.returnValue(of({}));
    spyOn(toastrService, 'success');

    component.savedItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });
    flush();

    expect(toastrService.success).toHaveBeenCalled();
  })));


  it("Should display the list when user adds a todo item", inject([TodoService, ToastrService], (todoService: TodoService, toastrService: ToastrService) => {
    spyOn(todoService, 'createItem').and.returnValue(of({}));
    spyOn(toastrService, 'success');
    spyOn(component, 'loadTodosList');

    component.savedItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(component.loadTodosList).toHaveBeenCalled();
  }));

  it("Should show a toastr error message when user adds a todo item and failed", inject([TodoService, ToastrService], (todoService: TodoService, toastrService: ToastrService) => {
    spyOn(todoService, 'createItem').and.returnValue(throwError("Error"));
    spyOn(toastrService, 'error');

    component.savedItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(toastrService.error).toHaveBeenCalled();
  }));

  it("should display n elements", inject([TodoService], (todoService: TodoService) => {
    const dummyData = [{

      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    }, {

      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    }];
    spyOn(todoService, 'getItems').and.returnValue(of<Todo[]>(dummyData));

    fixture.detectChanges();

    const el = fixture.debugElement.queryAll(By.css('app-todos-list .list-group-item'));
    expect(el.length).toBe(dummyData.length);
  }));

  it("Should prompt confirmation when item is deleted", inject([BsModalService], (modal: BsModalService) => {
    spyOn(modal, 'show').and.returnValue({
      content: {
        confirmed$: new Subject<boolean>()
      }
    });

    component.deleteItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(modal.show).toHaveBeenCalled();
  }));

  it("Should delete item when user confirms", inject([BsModalService, TodoService], (modal: BsModalService, todoService: TodoService) => {
    spyOn(modal, 'show').and.returnValue({
      content: {
        confirmed$: new BehaviorSubject<boolean>(true)
      }
    });
    
    spyOn(todoService, 'deleteItem').and.returnValue(of({}));
    spyOn(component, 'loadTodosList').and.returnValue(of({}));

    component.deleteItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(todoService.deleteItem).toHaveBeenCalled();
  }));
  
  it("Should display items when an item is deleted", inject([BsModalService, TodoService], (modal: BsModalService, todoService: TodoService) => {
    spyOn(modal, 'show').and.returnValue({
      content: {
        confirmed$: new BehaviorSubject<boolean>(true)
      }
    });
    
    spyOn(todoService, 'deleteItem').and.returnValue(of({}));
    spyOn(component, 'loadTodosList').and.returnValue(of({}));

    component.deleteItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(component.loadTodosList).toHaveBeenCalled();
  }));
  
  it("Should display a toastr message when an item is deleted", inject([BsModalService, TodoService, ToastrService], (modal: BsModalService, todoService: TodoService, toastrService: ToastrService) => {
    spyOn(modal, 'show').and.returnValue({
      content: {
        confirmed$: new BehaviorSubject<boolean>(true)
      }
    });
    
    spyOn(todoService, 'deleteItem').and.returnValue(of({}));
    spyOn(component, 'loadTodosList').and.returnValue(of({}));
    spyOn(toastrService, 'success');

    component.deleteItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(toastrService.success).toHaveBeenCalled();
  }));

  it("Should display a toastr message when an item is deleted", inject([BsModalService, TodoService, ToastrService], (modal: BsModalService, todoService: TodoService, toastrService: ToastrService) => {
    spyOn(modal, 'show').and.returnValue({
      content: {
        confirmed$: new BehaviorSubject<boolean>(true)
      }
    });
    
    spyOn(todoService, 'deleteItem').and.returnValue(throwError("Error"));
    spyOn(component, 'loadTodosList').and.returnValue(of({}));
    spyOn(toastrService, 'error');

    component.deleteItem({
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    });

    expect(toastrService.error).toHaveBeenCalled();
  }));
});
