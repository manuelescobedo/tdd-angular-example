import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "todos",
    loadChildren: './todos/todos.module#TodosModule'
  },
  {
    path: "",
    redirectTo: "todos",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
