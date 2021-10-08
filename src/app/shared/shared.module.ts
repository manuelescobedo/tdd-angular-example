import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogsModule } from "./dialogs/dialogs.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { GlobalErrorHandler } from "./global-error-handler";

@NgModule({
  imports: [CommonModule, DialogsModule, ModalModule.forRoot()],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  declarations: [],
})
export class SharedModule {}
