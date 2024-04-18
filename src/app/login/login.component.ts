import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AuthResponse } from '../shared/models/auth-response.model';
import { LoginService } from '../shared/services/login.service';
import { LocalStorageService } from '../shared/services/local-storage-service';
import {
  faEye,
  faEyeSlash,
  faSignIn,
  faUserLock,
  faCircleCheck,
  faCircleXmark,
  faCopyright,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { ProfileOptionsService } from '../features/services/profile-options.service';
import { ClientOrgProfileOptionsInfo } from '../features/models/client-org-profile-options-info.model';
import { environment } from 'src/environments/environment';
import { LoadLookupsService } from '../shared/services/load-lookups-service';
import { ConfigService } from '../config.service';

declare var window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formModal: any;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSignIn = faSignIn;
  faUserLock = faUserLock;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faCopyright = faCopyright;
  eyeslash!: boolean;
  show!: boolean;
  clientInfo!: any;
  user_Name!: string;
  pass_Word!: string;
  authResp!: AuthResponse;
  forgetPasswordForm!: FormGroup;
  tokenError: string = '';
  role!: any;
  clientOrgProfileOptionsInfo: ClientOrgProfileOptionsInfo =
    new ClientOrgProfileOptionsInfo();
  copyrights: string = `${environment.copyrights}`;

  constructor(
    private router: Router,
    private authService: AuthService,
    private logInService: LoginService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private fb: NonNullableFormBuilder,
    private profileOptionsService: ProfileOptionsService,
    private loadLookupsService: LoadLookupsService,
    private configService:ConfigService
  ) {}

  ngOnInit(): void {
    this.loginValidations();
    this.eyeslash = true;
    this.show = false;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('forgetPasswordModal')
    );
  }

  showPassword() {
    this.show = !this.show;
    this.eyeslash = !this.eyeslash;
  }

  loginValidations() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.forgetPasswordForm = this.fb.group({
      user_name: ['', [Validators.required]],
      email_id: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  onLogin() {
    this.user_Name = this.loginForm.value.userName;
    this.pass_Word = this.loginForm.value.password;
    localStorage.clear();
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService
        .login(this.loginForm.value.userName, this.loginForm.value.password)
        .subscribe({
          next: async (data: any) => {
            this.authResp = data;
            localStorage.setItem('token', this.authResp.access_token);
            localStorage.setItem('refresh_token', this.authResp.refresh_token);
            localStorage.setItem(
              'expires_in',
              this.authResp.expires_in.toString()
            );

            if (data.access_token) {
              this.getUserDetails(this.user_Name);
            } else {
              this.tokenError = data.error_description;
            }
            this.loginForm.reset();
            this.spinner.hide();
            this.loadLookupsService.loadCountryCurrLookUps();
          },
          error: (error) => {
            if (this.tokenError !== '') {
              this.toastr.error(this.tokenError);
            } else if (
              error &&
              error.error &&
              'access_denied' === error.error.error
            ) {
              this.toastr.error('Invalid Credentials');
            } else {
              this.toastr.error('Error in Communicating the Service');
            }
            this.spinner.hide();
            this.router.navigate(['login']);
          },
        });
    }
  }

  openModel() {
    this.formModal.show();
    this.loginForm.reset();
    this.forgetPasswordForm.reset();
  }

  closeModel() {
    this.formModal.hide();
    this.loginForm.reset();
    this.forgetPasswordForm.reset();
  }

  validateUser() {
    this.spinner.show();
    this.logInService
      .validateUserDetails(
        this.forgetPasswordForm.value.user_name,
        this.forgetPasswordForm.value.email_id
      )
      .subscribe({
        next: (response: any) => {
          if (200 == response.code) {
            this.forgetPasswordForm.reset();
            this.formModal.hide();
            this.loginForm.reset();
            this.spinner.hide();
            this.toastr.success(response.message);
          }
        },
        error: (error) => {
          this.forgetPasswordForm.reset();
          this.loginForm.reset();
          this.formModal.hide();
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
  }

  get forgetPasswordFormControls() {
    return this.forgetPasswordForm.controls;
  }
  get loginFormControls() {
    return this.loginForm.controls;
  }

  getUserDetails(userName: string) {
    this.logInService.getUserDetails(userName).subscribe({
      next: (resp: any) => {
        this.clientInfo = resp.data;
        this.localStorageService.saveData(
          'user_data',
          JSON.stringify(this.clientInfo)
        );
        this.localStorageService.loadLocalStorageUserData('user_data');
        this.role = AppComponent.roleMap
          .get(Number(this.clientInfo.userInfo.roleId.toString()))
          ?.toString();

        if (
          this.clientInfo.userInfo.roleId == '1' ||
          this.clientInfo.userInfo.roleId == '2'
        ) {
          this.loadLookupsService.loadCustomerNames();
        }

        if (this.clientInfo.userInfo.roleId == '4') {
          this.profileOptionsService
            .getProfileOptions(
              this.clientInfo.userInfo.orgId,
              this.clientInfo.userInfo.invOrgId,
              this.clientInfo.clientId
            )
            .subscribe({
              next: (resp: any) => {
                console.log(resp);
                this.clientOrgProfileOptionsInfo = resp.data;
                localStorage.setItem(
                  'profile_options',
                  JSON.stringify(this.clientOrgProfileOptionsInfo)
                );
              },
              error: (error: any) => {
                console.log(error.error.status);
              },
            });
        }
        let routeurl: string = '/' + this.role;
        localStorage.setItem('role', this.role);
        this.router.navigate([routeurl]);
      },
      error: (error) => {
        if (error.error.status) {
          this.toastr.error(error.error.status);
        } else {
          this.toastr.error('API Communication Failed');
        }
      },
    });
  }
}
