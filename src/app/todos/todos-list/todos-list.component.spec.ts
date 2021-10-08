import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListComponent } from './todos-list.component';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should display pending items", () => {
    // Arrange 
    component.list = [{
      completed: false,
      createdAt: Date.now(),
      title: "Test",
      id: 0,
      lastUpdate: Date.now()
    }];

    // Act
    component.ngOnChanges();
    fixture.detectChanges();

    // Assert
    expect(component.pendingItems.length).toBe(1);
  })

});
