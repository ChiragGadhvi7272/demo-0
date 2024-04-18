import { Component, Input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  faArrowAltCircleUp,
  faCirclePlus,
  faEdit,
  faCircleXmark,
  faArrowAltCircleLeft,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CarrierAcctNumbersInfo } from 'src/app/features/models/carrier-acct-numbers-info.model';
import { CarrierConfigurationsService } from 'src/app/features/services/carrier-configurations.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';

@Component({
  selector: 'app-account-numbers',
  templateUrl: './account-numbers.component.html',
  styleUrls: ['./account-numbers.component.css'],
})
export class AccountNumbersComponent {
  @Input('clientId') clientId!: any;
  @Input('orgId') orgId!: any;
  @Input('invOrgId') invOrgId!: any;
  @Input('carrierId') carrierId!: any;
  @Input('carrierCode') carrierCode!: any;
  @Input('carrierAcctNumbersInfoList')
  carrierAcctNumbersInfoList: CarrierAcctNumbersInfo[] = [];
  faCircleUp = faCirclePlus;
  faCircleXmark = faCircleXmark;
  faEdit = faEdit;
  faArrowAltCircleUp = faArrowAltCircleUp;
  carrierAcctNumbersInfo: CarrierAcctNumbersInfo = new CarrierAcctNumbersInfo();
  showOnCreate!: boolean;
  hideOnCreate!: boolean;
  carrierConfigurations!: FormGroup;
  faCircleCheck = faCircleCheck;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  createEditAccountNumberForm!: FormGroup;
  createUpdate!: string;
  selectedI: boolean = true;
  submitted: boolean = false;
  is_edit: boolean = false;
  is_disabled: boolean = false;
  is_update_disabled: boolean = true;
  accountNumber!: number;
  showDetailsByDimensionId!: any;
  countryCodesList!: any;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private carrierConfigurationsService: CarrierConfigurationsService,
    private carrierConfigurationService: CarrierConfigurationsService,
    private fb: NonNullableFormBuilder,
    private loadLookupsService: LoadLookupsService
  ) {}

  ngOnInit(): void {
    this.createEditAccountNumberControls();
    this.showOnCreate = true;
    this.hideOnCreate = false;
  }
  createEditAccountNumberControls() {
    this.createEditAccountNumberForm = this.fb.group({
      accountNumberId: [''],
      carrierId: [''],
      accountNumber: ['', Validators.required],
      clientId: [''],
      orgId: [''],
      invOrgId: [''],
      carrierCode: [''],
      accountActive: [''],
      accountDefault: [''],
      accountNumberNegotiatedFlag: [''],
      accountPassword: [''],
      accountUserName: [''],
      meterNumber: ['', Validators.required],
      negotiatedRates: [''],
      registrationStatus: [''],
      shipFromCountryCode: [''],
    });
  }
  updateActive(carrierConfigurationInfo: any, event: any): void {
    carrierConfigurationInfo.accountActive = event.target.checked;
    if (!event.target.checked) {
      carrierConfigurationInfo.accountDefault = false;
    }
  }

  updateDefault(carrierConfigurationInfo: any, event: any): void {
    carrierConfigurationInfo.accountDefault = event.target.checked;
    this.carrierAcctNumbersInfoList.forEach((model) => {
      if (model.accountNumberId !== carrierConfigurationInfo.accountNumberId) {
        model.accountDefault = false;
      }
    });
  }

  updateNegotiatedFlag(carrierConfigurationInfo: any, event: any): void {
    carrierConfigurationInfo.accountNumberNegotiatedFlag = event.target.checked;
  }

  updateNegotiatedRates(carrierConfigurationInfo: any, event: any): void {
    carrierConfigurationInfo.negotiatedRates = event.target.checked;
  }

  updateAccountNumberRegistered(
    carrierConfigurationInfo: any,
    event: any
  ): void {
    carrierConfigurationInfo.registrationStatus = event.target.checked;
  }

  updateAccountNumber(accountNumbers_List: any) {
    this.spinner.show();
    this.carrierAcctNumbersInfoList = accountNumbers_List;
    this.carrierConfigurationsService
      .updateAccountNumbers(accountNumbers_List)
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

  createEditAccountNumbers(
    carrierAcctNumbersInfo: CarrierAcctNumbersInfo,
    createOrEdit: any
  ) {
    this.carrierAcctNumbersInfo = carrierAcctNumbersInfo;
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.submitted = true;
    if (
      this.carrierAcctNumbersInfo.accountNumberId != 0 &&
      createOrEdit == 'edit'
    ) {
      this.createEditAccountNumberForm.patchValue(this.carrierAcctNumbersInfo);
      this.selectedI = true;
      this.is_disabled = true;
      this.is_update_disabled = false;
      this.createUpdate = 'Edit Account Numbers Details';
    } else {
      this.createEditAccountNumberForm.reset('');
      this.createUpdate = 'Create Account Numbers Details';
      this.is_disabled = false;
      this.is_update_disabled = true;
    }
    this.setViews();
    this.showOnCreate = false;
    this.hideOnCreate = true;
  }

  setViews() {
    this.createEditAccountNumberForm.controls['meterNumber'].disable();
    this.createEditAccountNumberForm.controls['registrationStatus'].disable();
    this.createEditAccountNumberForm.controls['accountUserName'].disable();
    this.createEditAccountNumberForm.controls['accountPassword'].disable();

    if (
      this.carrierCode == 110 ||
      this.carrierCode == 111 ||
      this.carrierCode == 112
    ) {
      this.createEditAccountNumberForm.controls['meterNumber'].enable();
    } else {
      if (this.carrierCode == 100) {
        this.createEditAccountNumberForm.controls[
          'registrationStatus'
        ].enable();
      }
    }
    if (
      this.carrierCode == 110 ||
      this.carrierCode == 111 ||
      this.carrierCode == 112 ||
      this.carrierCode == 100
    ) {
      this.createEditAccountNumberForm.controls['accountUserName'].enable();
      this.createEditAccountNumberForm.controls['accountPassword'].enable();
    }
  }

  getAccountNumbersList() {
    this.carrierConfigurationsService
      .getAccountNumbers(
        this.clientId,
        this.orgId,
        this.invOrgId,
        this.carrierCode,
        this.carrierId
      )
      .subscribe({
        next: (resp: any) => {
          this.carrierAcctNumbersInfoList = resp.data;
        },
        error: (error: any) => {
          this.toastr.error(
            'accountNumbers are not available for the selected Customer',
            ''
          );
        },
      });
  }
  onSubmit() {
    if (this.createEditAccountNumberForm.valid) {
      this.spinner.show();
      this.createEditAccountNumberForm.value.clientId = this.clientId;
      this.createEditAccountNumberForm.value.orgId = this.orgId;
      this.createEditAccountNumberForm.value.invOrgId = this.invOrgId;
      this.createEditAccountNumberForm.value.carrierId = this.carrierId;
      this.createEditAccountNumberForm.value.carrierCode = this.carrierCode;
      this.carrierAcctNumbersInfo = this.createEditAccountNumberForm.value;
      this.carrierConfigurationService
        .saveAccountNumbers(this.carrierAcctNumbersInfo)
        .subscribe({
          next: (resp: any) => {
            if (resp.code == 200) {
              this.spinner.hide();
              this.toastr.success(resp.message);
              this.getAccountNumbersList();
              this.showOnCreate = true;
              this.hideOnCreate = false;
            } else {
              this.spinner.hide();
              this.toastr.error(resp.message);
            }
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error(error.error.status);
          },
        });
    } else {
      alert('please enter the required fields to save.');
    }
  }

  resetForms() {
    this.createEditAccountNumberForm.reset();
  }

  hideCreate() {
    this.showOnCreate = true;
    this.hideOnCreate = false;
  }
}
