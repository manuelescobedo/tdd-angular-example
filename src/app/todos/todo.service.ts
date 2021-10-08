import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Todo } from "./todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `${environment.config.apiUrl}/todos?_sort=createdAt,title&_order=desc,asc`
    );
  }

  getItem(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.config.apiUrl}/todos/${todoId}`);
  }

  createItem(todo: Todo): Observable<Todo> {
   
    return this.http.post<Todo>(`${environment.config.apiUrl}/todos`, todo);
  }

  updateItem(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${environment.config.apiUrl}/todos/${todo.id}`,
      todo
    );
  }

  deleteItem(todoId: number): Observable<any> {
    return this.http.delete(`${environment.config.apiUrl}/todos/${todoId}`);
  }
}
