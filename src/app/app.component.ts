import { Component, VERSION } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { usernameValidator } from "./async.validator";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  myForm: FormGroup;
  username: FormControl;
  lazyUsername: FormControl;
  constructor() {
    this.initFormControls();
    this.createForm();
  }

  initFormControls() {
    this.lazyUsername = new FormControl("", {
      validators: [Validators.required],
      asyncValidators: [usernameValidator()],
      updateOn: "blur"
    });
    this.username = new FormControl("", {
      validators: [Validators.required],
      asyncValidators: [usernameValidator()]
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      username: this.username,
      lazyUsername: this.lazyUsername
    });
  }
}
