import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should display invalid message when input is empty", () => {
    component.formGroup.setValue({
      title: ''
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect((el.nativeElement as HTMLElement).innerHTML).toContain("Title is required");
  });
  it("Should display invalid message when input is less than 10 chars", () => {
    component.formGroup.setValue({
      title: 'Test Test'
    });

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect((el.nativeElement as HTMLElement).innerHTML).toContain("Title should have 10 characters at least");
  });
});
