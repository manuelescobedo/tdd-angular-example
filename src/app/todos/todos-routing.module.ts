import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosViewComponent } from './todos-view/todos-view.component';

const routes: Routes = [{
  path: '',
  component: TodosViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
