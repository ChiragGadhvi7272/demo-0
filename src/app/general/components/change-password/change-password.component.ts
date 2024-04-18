import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCheckCircle,
  faCircleXmark,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/reset-password/customValidator.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  faCheckCircle = faCheckCircle;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCircleXmark = faCircleXmark;
  eye!: boolean;
  eyeslash!: boolean;
  show!: boolean;
  showc!: boolean;
  showo!: boolean;
  userData: any;
  userName!: string;
  role!: any;

  constructor(
    private mainRouter: Router,
    private logInService: LoginService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.eyeslash = true;
    this.changePasswordValidations();
    this.userData = this.localStorageService.getLocalUserData();
    this.userName = this.userData.userInfo.userName;
    this.changePasswordFormControls['userName'].setValue(this.userName);
    this.role = localStorage.getItem('role');
  }

  showPassword(type: any) {
    if (type == 'n') {
      this.show = !this.show;
      this.eyeslash = !this.eyeslash;
    } else if (type == 'o') {
      this.showo = !this.showo;
    } else {
      this.showc = !this.showc;
    }
  }

  changePasswordValidations() {
    this.changePasswordForm = this.fb.group(
      {
        userName: [],
        oldPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
            ),
          ],
        ],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('newPassword', 'confirmNewPassword'),
      }
    );
  }

  changeUserPassword() {
    if (this.changePasswordForm.valid) {
      this.spinner.show();
      this.logInService
        .changePassword(
          this.changePasswordForm.value.userName,
          this.changePasswordForm.value.oldPassword,
          this.changePasswordForm.value.confirmNewPassword
        )
        .subscribe({
          next: (response: any) => {
            if (200 == response.code) {
              this.changePasswordForm.reset();
              localStorage.clear();
              sessionStorage.clear();
              this.spinner.hide();
              this.toastr.success(response.message);
              this.mainRouter.navigate(['login']);
            }
          },
          error: (error) => {
            this.spinner.hide();
            this.toastr.error(error.error.status);
          },
        });
    }
  }

  get changePasswordFormControls() {
    return this.changePasswordForm.controls;
  }
}
