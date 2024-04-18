import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { ApplicationSetupsService } from '../../services/application-setups.service';
import { ApplicationSetupsInfo } from '../../models/application-setups-info.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Component({
  selector: 'app-application-setups',
  templateUrl: './application-setups.component.html',
  styleUrls: ['./application-setups.component.css'],
})
export class ApplicationSetupsComponent implements OnInit {
  applicationSetupsForm!: FormGroup;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  loggerModeDetailsList: any;
  clientId!: number;
  role!: any;
  applicationSetupsInfo!: ApplicationSetupsInfo;
  showLogs!: boolean;
  userData: any;

  applicationSetupsValidations() {
    this.applicationSetupsForm = this.fb.group({
      loggerMode: ['', [Validators.required]],
      logFile: ['', [Validators.required]],
    });
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private lookupValuesService: LookupValuesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private applicationSetupsService: ApplicationSetupsService,
    private localStorageService: LocalStorageService
  ) {}
  //On load
  ngOnInit(): void {
    this.userData = this.localStorageService.getLocalUserData();
    this.clientId = this.userData.clientId;
    this.role = localStorage.getItem('role');
    this.applicationSetupsValidations();
    this.load();
    this.showLogs = false;
  }
  get applicationSetupControls() {
    return this.applicationSetupsForm.controls;
  }
  load() {
    this.getLoggerModesList()
      .then(() => {
        return this.getApplicationSetups();
      })
      .catch((error: any) => {
        console.error('Error fetching application setups:', error);
      });
  }
  getLoggerModesList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.lookupValuesService.getLookUps('LOGGERMODE', 'ALL').subscribe({
        next: (resp: any) => {
          this.loggerModeDetailsList = resp.data;
          resolve(resp); // Resolve the promise with the response
        },
        error: (error) => {
          reject(error); // Reject the promise with the error
        },
      });
    });
  }

  //To get the saved details
  getApplicationSetups(): Promise<any> {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.applicationSetupsService
        .getApplicationSetups(this.clientId)
        .subscribe({
          next: (resp: any) => {
            resolve(resp);
            this.applicationSetupsInfo = resp.data;
            console.log(this.applicationSetupsInfo);
            this.applicationSetupsForm.patchValue(this.applicationSetupsInfo);
            this.onLoggerModeChange(this.applicationSetupsInfo.loggerMode);
            this.spinner.hide();
          },
          error: (error) => {
            reject(error);
            this.spinner.hide();
            this.toastr.error(error.error.status);
          },
        });
    });
  }

  onLoggerModeChange(loggerMode: string) {
    if (loggerMode == 'OFF') {
      this.applicationSetupControls['logFile'].clearValidators();
      this.showLogs = true;
      this.applicationSetupControls['logFile'].reset();
      this.applicationSetupControls['logFile'].updateValueAndValidity();
    } else {
      this.showLogs = false;
      this.applicationSetupControls['logFile'].setValidators(
        Validators.required
      );
      this.applicationSetupControls['logFile'].updateValueAndValidity();
    }
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  //To save the details
  onSubmit() {
    if (this.applicationSetupsForm.valid) {
      this.spinner.show();
      this.applicationSetupsInfo = this.applicationSetupsForm.value;
      this.applicationSetupsInfo.clientId = this.clientId;
      this.applicationSetupsService
        .saveApplicationSetups(this.applicationSetupsInfo)
        .subscribe({
          next: (resp: any) => {
            this.spinner.hide();
            this.toastr.success(resp.message);
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error(error.error.status);
          },
        });
    }
  }
}
