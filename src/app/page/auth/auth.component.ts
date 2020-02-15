import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FacadeService } from "../../core/services/facade/facade.service";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit, OnDestroy {
  public $suscribeAuth: Subscription;
  public form: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[0-9]+$/)
    ])
  });

  public constructor(
    protected facade: FacadeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {}

  private openSnackBar(message: string): any {
    this._snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: "top"
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.$suscribeAuth = this.facade.userService
        .authUser(this.form.value)
        .subscribe(
          (result: any) => {
            localStorage.setItem('token', result.token);
            if(localStorage.getItem('token')){
              this.router.navigate(['/inicio']);
            }
          },
          (error) => {
            if(localStorage.getItem('token')){
              localStorage.clear();
              localStorage.removeItem('token');
            }
            this.openSnackBar(error.error.message);
          },
        );
      console.log(this.form.value);
    }
  }

  public ngOnDestroy(): void {
    if (this.$suscribeAuth) {
      this.$suscribeAuth.unsubscribe();
    }
  }
}
