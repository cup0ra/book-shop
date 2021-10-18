/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.services';
import { Location } from '@angular/common';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  public login = 'Log in';

  public register = 'Register';

  public isLogin = true;

  constructor(
    private authService: AuthService,
    public snackBar: SnackBarService,
    private cdr: ChangeDetectorRef,
    private location: Location,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.isLogin ? this.singIn() : this.signOn();
  }

  change(): void {
    this.isLogin = !this.isLogin;
  }

  singIn() {
    this.authService.login({ ...this.form.value, name: '' }).subscribe(
      (data) => {
        this.location.back();
        console.log(data);
      },
      (error) => {
        this.snackBar.open(error.error.msg);
      },
    );
  }

  signOn() {
    this.authService.register(this.form.value).subscribe(
      (data) => {
        this.isLogin = true;
        console.log(data);
        this.cdr.markForCheck();
      },
      (error) => {
        this.snackBar.open(error.error.msg);
      },
    );
  }
}
