import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faCircleCheck,
  faCircleXmark,
  faArrowAltCircleLeft,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientInfo } from 'src/app/features/models/client-info.model';
import { ClientSubscriptionInfo } from 'src/app/features/models/client-subscription-info.model';
import { CustomerDetailsService } from 'src/app/features/services/customer-details.service';
import { SharedCustomerService } from 'src/app/shared/services/shared-customer.service';
import { UserDetails } from 'src/app/modules/admin/models/user-details.model';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-create-update-customer-details',
  templateUrl: './create-update-customer-details.component.html',
  styleUrls: ['./create-update-customer-details.component.css'],
})
export class CreateUpdateCustomerDetailsComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faUpRightFromSquare = faUpRightFromSquare;
  customerForm!: FormGroup;
  clientSubscriptionInfoList!: FormArray;
  isDisabled: boolean = false;
  requestParam!: any;
  clientId: number = 0;
  createUpdate!: String;
  matchedPassword!: boolean;
  countryCodesList!: any;
  erpTypeList!: any;
  protocolsList!: any;
  statusList!: any;
  addonServicesList!: any;
  clientInfo: ClientInfo = new ClientInfo();
  clientSubscriptionInfo: ClientSubscriptionInfo = new ClientSubscriptionInfo();
  userDetails: UserDetails = new UserDetails();
  role!: any;
  licenseEndDate!: any;
  userId: number = 0;
  nextDayofStart!: any;
  sameDayofStart!: any;
  clientInfoList!: ClientInfo[];
  fields: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private customerDetailsService: CustomerDetailsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public sharedCustomerService: SharedCustomerService,
    private sharedUtilService: SharedUtilService,
    private loadLookupsService: LoadLookupsService
  ) {}
  ngOnInit(): void {
    this.getCustomerLookupValues();
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.buildForm(this.clientInfo);
    this.role = localStorage.getItem('role');
    this.requestParam = this.activatedRoute.snapshot.params['id'];
    if (this.requestParam) {
      this.getCustomerDetails();
      this.isDisabled = true;
      this.createUpdate = 'Edit Customer';
      this.clientId = this.requestParam;
    } else {
      this.customerForm.get('status')?.patchValue('Y');
      this.createUpdate = 'Create Customer';
      this.isDisabled = false;
      this.customerForm.controls['subscriptionDate'].disable();
      this.customerForm.controls['licenseEndDate'].disable();
    }
  }

  buildForm(model: any) {
    const formGroupFields =
      this.sharedCustomerService.getFormControlsFields(model);
    this.customerForm = new FormGroup(formGroupFields);
    this.customerForm.removeControl('userInfo');
    this.customerForm.addControl(
      'userInfo',
      new FormGroup(
        this.sharedCustomerService.getFormControlsFields(this.userDetails)
      )
    );
    this.customerForm.removeControl('clientSubscriptionInfoList');
    this.customerForm.addControl(
      'clientSubscriptionInfoList',
      new FormArray([
        new FormGroup(
          this.sharedCustomerService.getFormControlsFields(
            this.clientSubscriptionInfo
          )
        ),
      ])
    );
  }
  get customerFormControls() {
    return this.customerForm.controls;
  }
  get userInfoControls() {
    return this.customerForm.get('userInfo') as FormGroup;
  }
  checkPassword() {
    if (
      this.userInfoControls.controls['password'].value !==
      this.userInfoControls.value['retypePassword']
    ) {
      this.userInfoControls.controls['retypePassword'].setErrors({
        confirmedValidator: true,
      });
    } else {
      this.userInfoControls.controls['retypePassword'].setErrors(null);
    }
  }
  addServices() {
    this.clientSubscriptionInfoList = this.customerForm.get(
      'clientSubscriptionInfoList'
    ) as FormArray;
    this.clientSubscriptionInfoList.removeAt(0);
    this.addonServicesList.forEach((service: any) => {
      this.clientSubscriptionInfoList.push(
        this.createService(service.serviceName)
      );
    });
  }
  createService(name: string) {
    return this.fb.group({
      clientId: [this.clientId],
      serviceName: [name],
      activeFlag: [false],
    });
  }
  getCustomerDetails() {
    this.spinner.show();
    this.customerDetailsService.getCustomerDetails().subscribe({
      next: (resp: any) => {
        this.clientInfoList = resp.data;
        let details = this.clientId;
        this.clientInfoList.forEach((valueById: any) => {
          if (details == valueById['clientId']) {
            this.clientInfo = valueById;
            this.clientInfo.clientSubscriptionInfoList.forEach((val: any) => {
              let serviceName = val.serviceName;
              let activeFlag = val.activeFlag;
              this.sharedCustomerService.showInfoIcons(
                serviceName,
                activeFlag,
                this.customerForm
              );
            });
            this.clientId = this.clientInfo.clientId;
            this.userId = this.clientInfo.userInfo.userId;
            this.clientInfo.licenseStartDate =
              this.sharedUtilService.dateFormatOnLoad(
                this.clientInfo.licenseStartDate
              );
            this.clientInfo.licenseEndDate =
              this.sharedUtilService.dateFormatOnLoad(
                this.clientInfo.licenseEndDate
              );
            this.clientInfo.subscriptionDate =
              this.sharedUtilService.dateFormatOnLoad(
                this.clientInfo.subscriptionDate
              );
            setTimeout(() => {
              this.customerForm.patchValue(this.clientInfo);
              this.userInfoControls
                .get('retypePassword')
                ?.setValue(this.clientInfo.userInfo.password);
            }, 100);
            this.sharedCustomerService.onErpTypeChange(
              this.clientInfo.erpType,
              this.customerForm
            );
          }
        });
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
      },
    });
  }
  onSubmit(action: string) {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.toastr.error('Please provide all the mandatory details');
    } else {
      this.spinner.show();
      this.clientInfo = this.customerForm.value;
      if (action == 'create') {
        this.clientInfo.userInfo.roleId = 3;
        this.clientInfo.userInfo.orgId = '0';
        this.clientInfo.userInfo.invOrgId = '0';
        this.clientInfo.userInfo.superUser = true;
      }
      this.clientInfo.licenseStartDate =
        this.sharedUtilService.dateFormatOnSave(
          this.clientInfo.licenseStartDate
        );
      this.clientInfo.licenseEndDate = this.sharedUtilService.dateFormatOnSave(
        this.clientInfo.licenseEndDate
      );
      this.clientInfo.subscriptionDate =
        this.sharedUtilService.dateFormatOnSave(
          this.clientInfo.subscriptionDate
        );
      this.customerDetailsService
        .saveCustomerDetails(this.clientInfo)
        .subscribe({
          next: (resp: any) => {
            if (resp.code == 200) {
              this.toastr.success(resp.message);
            } else {
              this.toastr.error(resp.message);
            }
            this.spinner.hide();
          },
          error: (error) => {
            this.toastr.error(error.error.status);
            this.spinner.hide();
          },
        });
    }
  }
  getCustomerLookupValues() {
    this.customerDetailsService.getCustomerLookups().subscribe({
      next: (resp: any) => {
        this.erpTypeList = resp.data.erpTypeList;
        this.protocolsList = resp.data.protocolsList;
        this.statusList = resp.data.statusList;
        this.addonServicesList = resp.data.addonServicesList;
        console.log(this.addonServicesList);
        this.addServices();
      },
      error: () => {},
    });
  }
  resetForms() {
    this.customerForm.reset();
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
