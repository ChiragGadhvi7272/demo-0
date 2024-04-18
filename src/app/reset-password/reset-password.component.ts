import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from './customValidator.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetFormValues!: FormGroup;
  faCheckCircle = faCheckCircle;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  submitted!: boolean;
  pwdResetToken!: string;
  eye!: boolean;
  eyeslash!: boolean;
  show!: boolean;
  showC!: boolean;
  ngOnInit(): void {
    this.eyeslash = true;
    this.loginValidations();
  }
  constructor(
    private router: ActivatedRoute,
    private mainRouter: Router,
    private logInService: LoginService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  showPassword() {
    this.show = !this.show;
    this.eyeslash = !this.eyeslash;
  }

  showConfirmPassword() {
    this.showC = !this.showC;
    this.eyeslash = !this.eyeslash;
  }

  loginValidations() {
    this.submitted = true;
    this.resetFormValues = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&#].{7,}'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get resetFormControls() {
    return this.resetFormValues.controls;
  }
  resetPassword() {
    this.pwdResetToken = this.router.snapshot.params['pwdResetToken'];
    this.spinner.show();
    this.logInService
      .resetUserPassword(
        this.pwdResetToken,
        this.resetFormValues.value.confirmPassword
      )
      .subscribe({
        next: (response: any) => {
          if (200 == response.code) {
            this.resetFormValues.reset();
            this.spinner.hide();
            this.mainRouter.navigate(['login']);
            this.toastr.success(response.message);
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.resetFormValues.reset();
          this.toastr.error(error.error.status);
          this.mainRouter.navigate(['login']);
        },
      });
  }
}
