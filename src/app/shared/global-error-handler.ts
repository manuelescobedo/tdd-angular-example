import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private toastr: ToastrService) {}

  handleError(error: Error) {
    this.zone.run(() => {
      this.toastr.error(error.message || "Undefined client error");
    });
    console.log(error);
  }
}
