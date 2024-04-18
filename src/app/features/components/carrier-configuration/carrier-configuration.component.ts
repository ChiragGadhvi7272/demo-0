import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faCircleCheck,
  faCircleXmark,
  faCloudUpload,
  faLink,
  faCircleInfo,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { ShipMethodMappingInfo } from '../../models/ship-method-mapping-info.model';
import { CarrierConfigurationsService } from '../../services/carrier-configurations.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { CarrierOrgAcctDetailsInfo } from '../../models/carrier-org-acct-details-info.model';
import { CarrierAcctNumbersInfo } from '../../models/carrier-acct-numbers-info.model';
import { LoadCarriers } from '../../models/load-carriers.model';
import { ShipmethodMappingComponent } from './shipmethod-mapping/shipmethod-mapping.component';
import { ClientOrgProfileOptionsInfo } from '../../models/client-org-profile-options-info.model';
import { EmailNotificationInfo } from '../../models/email-notification-info';
import { FxfrInfo } from '../../models/fxfr-info';
import { StarTrackInfo } from '../../models/star-track-info';
import { TntInfo } from '../../models/tnt-info';
import { ShipExecLabelInfo } from '../../models/ship-exec-label-info';
import { WorldEaseInfo } from '../../models/world-ease-info';
import { FedExDirectDistInfo } from '../../models/fed-ex-direct-dist-info';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { SelectControlsService } from 'src/app/modules/admin/services/select-controls.service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';
@Component({
  selector: 'app-carrier-configuration',
  templateUrl: './carrier-configuration.component.html',
  styleUrls: ['./carrier-configuration.component.css'],
  providers: [],
})
export class CarrierConfigurationComponent implements OnInit {
  carrierConfigurationsForm!: FormGroup;
  faUpRightFromSquare = faUpRightFromSquare;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faCloudUpload = faCloudUpload;
  faLink = faLink;
  faCircleInfo = faCircleInfo;
  goED: boolean = true;
  carrierId!: number;
  clientId!: number;
  clientIdTemp!: string;
  orgId!: string;
  invOrgId!: string;
  customerNamesList!: any;
  carrierCodesList!: any;
  orgIdList!: any;
  invOrgIdList!: any;
  roleId!: any;
  carrierCode!: any;
  userData: any;
  erpType!: any;
  role!: any;
  countryCodesList!: any;
  showCustomerList: boolean = false;
  carrierNamesList!: any;
  carrierLookUpsList!: any;
  hubIdList!: any;
  bolLabelFormatList!: any;
  cModeList!: any;
  cn22LabelFormatList!: any;
  cn22LabelSizeList!: any;
  docTabLocationList!: any;
  eodLabelFormatList!: any;
  fxfrClassCodeList!: any;
  intlLabelFormatList!: any;
  labelFormatList!: any;
  labelStockOrientationList!: any;
  shipExecBolFormatList!: any;
  uspsPriceOptionsList!: any;
  uspsReceiptOptionsList!: any;
  paperSizeList!: any;
  intlPrintLayoutList!: any;
  nonDeliveryOptionsList!: any;
  defaultSignOptionList!: any;
  intlDocSubTypeList!: any;
  op900LabelFormatList!: any;
  regionCodeList!: any;
  requestOptionsList!: any;
  carrierOrgAcctDetailsInfo: CarrierOrgAcctDetailsInfo =
    new CarrierOrgAcctDetailsInfo();
  carrierAcctNumbersInfoList: CarrierAcctNumbersInfo[] = [];
  shipMethodMappingInfoList!: FormArray;
  shipMethodInfoList: ShipMethodMappingInfo[] = [];
  carrierMode!: string;
  loadCarriers: LoadCarriers = new LoadCarriers();
  hideUploadCarriersButton: boolean = true;
  hideShipmethodMappingButton: boolean = true;
  customersList!: any;
  carrierServiceLevelCodesList: any;
  profileDetails!: ClientOrgProfileOptionsInfo;
  fields: any = [];
  @ViewChild(ShipmethodMappingComponent)
  shipmethodMappingComponent!: ShipmethodMappingComponent;
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  isDisabled!: boolean;
  constructor(
    private carrierConfigurationsService: CarrierConfigurationsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private lookupValuesService: LookupValuesService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sharedUtilService: SharedUtilService,
    private loadLookupsService: LoadLookupsService,
    private selectControls: SelectControlsService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.isDisabled = true;
    this.getCustomerDetailsValue();
    this.buildForm(this.carrierOrgAcctDetailsInfo);
    this.setValidations();
    this.enableRestFields();
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.role = localStorage.getItem('role');
    this.userData = this.localStorageService.getLocalUserData();
    this.roleId = this.userData.userInfo.roleId;
    this.carrierConfigurationsForm.disable();
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
    if (this.roleId == 3 || this.roleId == 4 || this.roleId == 5) {
      this.carrierConfigurationsFormControls['orgId'].enable();
      this.clientId = this.userData.clientId;
      this.clientIdTemp = this.userData.clientId;
      this.erpType = this.userData.erpType;
      this.showCustomerList = false;
      this.carrierConfigurationsFormControls['clientId'].clearValidators();
      this.carrierConfigurationsFormControls['clientId'].updateValueAndValidity;
      this.showOrgId(this.clientId);
    } else if (this.roleId == 1 || this.roleId == 2) {
      this.carrierConfigurationsFormControls['clientId'].enable();
      this.loadLookupsService
        .getCustomerNames()
        .subscribe((customerNamesList) => {
          this.customerNamesList = customerNamesList;
        });

      this.showCustomerList = true;
      this.carrierConfigurationsFormControls['clientId'].setValidators([
        Validators.required,
      ]);
      this.carrierConfigurationsFormControls['clientId'].updateValueAndValidity;
      this.getCustomerDetailsValue();
    }
    const shipMethodInfoList = this.activatedRoute.snapshot.queryParams['data']
      ? JSON.parse(this.activatedRoute.snapshot.queryParams['data'])
      : null;
    if (shipMethodInfoList) {
      this.shipMethodInfoList = shipMethodInfoList;
    }
  }

  buildForm(model: any) {
    console.log('inside buildForm');
    const formGroupFields = this.getFormControlsFields(model);
    this.carrierConfigurationsForm = new FormGroup(formGroupFields);
    // Add or update controls
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'emailNotificationInfo',
      new EmailNotificationInfo()
    );
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'fxfrInfo',
      new FxfrInfo()
    );
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'starTrackInfo',
      new StarTrackInfo()
    );
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'tntInfo',
      new TntInfo()
    );
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'shipExecLabelInfo',
      new ShipExecLabelInfo()
    );
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'worldEaseInfo',
      new WorldEaseInfo()
    );
    this.addOrUpdateControl(
      this.carrierConfigurationsForm,
      'fedexDirectDistInfo',
      new FedExDirectDistInfo()
    );
  }

  //function to add or replace a control in the FormGroup
  addOrUpdateControl(
    formGroup: FormGroup,
    controlName: string,
    controlInstance: any
  ) {
    formGroup.removeControl(controlName);
    formGroup.addControl(
      controlName,
      new FormGroup(this.getFormControlsFields(controlInstance))
    );
  }

  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};

    for (const field of Object.keys(obj)) {
      formGroupFields[field] = new FormControl('');
      this.fields.push(field);
    }
    return formGroupFields;
  }

  // Function to add validations to a specific control
  addValidationToControl(controlName: string, validators: ValidatorFn[]) {
    const control = this.carrierConfigurationsForm.get(controlName);

    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity(); // Trigger validation immediately
    } else {
      console.error(`Control with name ${controlName} not found`);
    }
  }

  setValidations() {
    this.addValidationToControl('carrierId', [Validators.required]);
    this.addValidationToControl('clientId', [Validators.required]);
    this.addValidationToControl('orgId', [Validators.required]);
    this.addValidationToControl('invOrgId', [Validators.required]);
    this.addValidationToControl('userName', [Validators.required]);

    const senderEmailControl = this.carrierConfigurationsForm
      .get('emailNotificationInfo')
      ?.get('senderEmailAddress');

    if (senderEmailControl) {
      senderEmailControl.setValidators([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]);
    }
  }

  get carrierConfigurationsFormControls() {
    return this.carrierConfigurationsForm.controls;
  }

  get emailNotificationInfoControls() {
    return (
      this.carrierConfigurationsForm.get('emailNotificationInfo') as FormGroup
    ).controls;
  }

  get fxfrInfoControls() {
    return (this.carrierConfigurationsForm.get('fxfrInfo') as FormGroup)
      .controls;
  }
  get starTrackInfoControls() {
    return (this.carrierConfigurationsForm.get('starTrackInfo') as FormGroup)
      .controls;
  }
  get tntInfoControls() {
    return (this.carrierConfigurationsForm.get('tntInfo') as FormGroup)
      .controls;
  }
  get fedexDirectDistInfoControls() {
    return (
      this.carrierConfigurationsForm.get('fedexDirectDistInfo') as FormGroup
    ).controls;
  }
  get worldEaseInfoControls() {
    return (this.carrierConfigurationsForm.get('worldEaseInfo') as FormGroup)
      .controls;
  }
  get shipExecLabelInfoControls() {
    return (
      this.carrierConfigurationsForm.get('shipExecLabelInfo') as FormGroup
    ).controls;
  }

  getCustomerDetailsValue() {
    this.lookupValuesService.getCustomerDetails().subscribe({
      next: (resp: any) => {
        this.customersList = resp.data;
      },
      error: (error: any) => {},
    });
  }
  clearForm(): void {
    this.carrierConfigurationsForm.reset();
    this.getCarrierConfigurations(this.orgId, this.invOrgId, this.carrierId);
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  showOrgId(clientId: any) {
    this.orgIdList = [];
    this.invOrgIdList = [];
    this.carrierLookUpsList = [];
    this.carrierConfigurationsFormControls['orgId']?.reset('');
    this.carrierConfigurationsFormControls['invOrgId']?.reset('');
    this.carrierConfigurationsFormControls['carrierId']?.reset('');
    this.carrierConfigurationsFormControls['invOrgId']?.disable();
    this.carrierConfigurationsFormControls['carrierId']?.disable();
    if (clientId == '') {
      this.carrierConfigurationsFormControls['orgId']?.disable();
    } else {
      this.clientId = clientId;
      this.clientIdTemp = clientId;
      this.hideUploadCarriersButton = true;
      if (this.roleId == 1 || this.roleId == 2) {
        this.customersList.forEach((customer: any) => {
          if (customer.clientId == this.clientId) {
            this.erpType = customer.erpType;
            this.userData = customer;
          }
        });
      }
      this.lookupValuesService.getOrganizationsList(clientId).subscribe({
        next: (resp: any) => {
          this.orgIdList = resp.data;
          this.carrierConfigurationsFormControls['orgId'].enable();
        },
        error: (error: any) => {
          this.toastr.error(
            'Operating Unit and Organization details are not available for the selected Customer',
            ''
          );
        },
      });
    }
    this.resetOnChange();
  }

  showInvOrgId(orgId: any) {
    this.invOrgIdList = [];
    this.carrierLookUpsList = [];
    this.carrierConfigurationsFormControls['invOrgId']?.reset('');
    this.carrierConfigurationsFormControls['carrierId']?.reset('');
    this.carrierConfigurationsFormControls['carrierId']?.disable();
    if (orgId == '') {
      this.carrierConfigurationsFormControls['invOrgId']?.disable();
    } else {
      this.orgId = orgId;
      this.hideUploadCarriersButton = true;
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.invOrgIdList = resp.data;
            this.carrierConfigurationsFormControls['invOrgId'].enable();
          },
          error: (error) => {
            this.toastr.error(
              'Operating Unit and Organization details are not available for the selected Customer',
              ''
            );
          },
        });
    }
    this.resetOnChange();
  }

  showCarrierNames(orgId: string, invOrgId: string) {
    this.carrierLookUpsList = [];
    this.carrierConfigurationsFormControls['carrierId']?.reset('');
    if (invOrgId == '') {
      this.carrierConfigurationsFormControls['carrierId']?.disable();
      this.hideUploadCarriersButton = true;
    } else {
      this.invOrgId = invOrgId;
      this.lookupValuesService
        .getCarriersList(this.clientId, orgId, invOrgId)
        .subscribe({
          next: (resp: any) => {
            this.carrierNamesList = resp.data;
            this.carrierConfigurationsFormControls['carrierId'].enable();
            this.hideUploadCarriersButton = false;
          },
          error: (error) => {
            this.toastr.error(
              'carrierNames are not available for the selected Customer',
              ''
            );
          },
        });
    }
    this.resetOnChange();
  }

  showGoButton(orgId: string, invOrgId: string, carrierId: any) {
    if (this.clientId != 0 && orgId != '' && invOrgId != '' && carrierId != 0) {
      this.goED = false;
    } else {
      this.goED = true;
    }
    this.resetOnChange();
  }

  resetOnChange() {
    const clientId = this.carrierConfigurationsForm?.get('clientId')?.value;
    const orgId = this.carrierConfigurationsForm?.get('orgId')?.value;
    const invOrgId = this.carrierConfigurationsForm?.get('invOrgId')?.value;
    const carrierId = this.carrierConfigurationsForm?.get('carrierId')?.value;
    this.carrierConfigurationsForm.reset();
    this.carrierConfigurationsForm.disable();
    this.selectControls.selectControls(this.carrierConfigurationsForm);
    if (this.roleId == 1 || this.roleId == 2) {
      this.carrierConfigurationsForm?.get('clientId')?.enable();
    } else {
      this.carrierConfigurationsForm?.get('orgId')?.enable();
    }

    this.goED = true;
    if (clientId != '') {
      this.carrierConfigurationsForm?.get('orgId')?.enable();
      this.carrierConfigurationsForm?.get('clientId')?.setValue(clientId);
    }
    if (orgId != '') {
      this.carrierConfigurationsForm?.get('invOrgId')?.enable();
      this.carrierConfigurationsForm?.get('orgId')?.setValue(orgId);
    }
    if (invOrgId != '') {
      this.carrierConfigurationsForm?.get('carrierId')?.enable();
      this.carrierConfigurationsForm?.get('invOrgId')?.setValue(invOrgId);
    }
    if (carrierId != '') {
      this.goED = false;
      this.carrierConfigurationsForm?.get('carrierId')?.setValue(carrierId);
    }
  }

  getCarrierConfigurations(orgId: any, invOrgId: any, carrierId: any) {
    if (orgId != '' && invOrgId != '' && carrierId != 0 && this.clientId != 0) {
      this.isDisabled = false;
      this.valuesResetNew('onGo');
      this.carrierId = carrierId;
      this.orgId = orgId;
      this.invOrgId = invOrgId;
      this.carrierConfigurationsForm.enable();
      this.getCarrierCodes();
      this.spinner.show();
      const dataPromise = new Promise<void>((resolve, reject) => {
        this.carrierConfigurationsService
          .getCarrierConfigurationDetails(
            this.clientId,
            this.orgId,
            this.invOrgId,
            this.carrierId
          )
          .subscribe({
            next: (resp: any) => {
              this.carrierOrgAcctDetailsInfo = resp.data;
              this.modifyValidations(
                this.carrierOrgAcctDetailsInfo.carrierCode,
                this.carrierOrgAcctDetailsInfo.carrierMode
              );
              this.shipMethodInfoList = resp.data.shipMethodMappingInfoList;
              this.hideShipmethodMappingButton =
                !this.carrierOrgAcctDetailsInfo.enabledFlag;
              let lookUpPromise = this.getCarrierLookUpValues(
                this.carrierOrgAcctDetailsInfo.carrierCode
              );
              lookUpPromise
                .then(() => {
                  resolve(); // Resolve the Promise when data is available
                })
                .catch((error) => {
                  reject(error); // Reject the Promise if there is an error
                });
            },
            error: (error) => {
              reject(error); // Reject the Promise if there is an error
            },
          });
      });
      dataPromise
        .then(() => {
          //sameer g changed to patch dynamically
          if (this.carrierOrgAcctDetailsInfo) {
            Object.keys(this.carrierOrgAcctDetailsInfo).forEach((property) => {
              const propertyName = property as keyof CarrierOrgAcctDetailsInfo;
              const control =
                this.carrierConfigurationsFormControls[propertyName];
              const propertyValue =
                this.carrierOrgAcctDetailsInfo[propertyName];
              if (
                control &&
                propertyValue !== null &&
                propertyValue !== undefined
              ) {
                control.patchValue(JSON.parse(JSON.stringify(propertyValue)));
              }
            });
            this.spinner.hide();
            this.carrierConfigurationsForm?.patchValue(
              this.carrierOrgAcctDetailsInfo
            );
            this.carrierCode = this.carrierOrgAcctDetailsInfo.carrierCode;
            this.carrierMode = this.carrierOrgAcctDetailsInfo.carrierMode;
            this.enableRestFields();
            this.spinner.hide();
            this.goED = false;
          }
        })
        .catch((error) => {
          this.spinner.hide();
          this.toastr.error(
            'No data is available for the selected Customer, Operating Unit and Organization'
          );
          this.goED = true;
          this.goED = false;
        });
    } else {
      this.goED = false;
    }
  }

  carrierServicesDetails(carrierCode: any, carrierMode: any) {
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;
    this.getCarrierLookUpValues(carrierCode);
    this.modifyValidations(carrierCode, carrierMode);
    this.valuesResetNew('onCarrierCodeChange');
  }

  onCarrierModeChange(carrierCode: any, carrierMode: any) {
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;
    this.modifyValidations(carrierCode, carrierMode);
    this.valuesResetNew('onCarrierModeChange');
  }

  enableRestFields() {
    const emailNotificationFlag =
      this.emailNotificationInfoControls['emailNotificationFlag'];
    if (emailNotificationFlag.value) {
      Object.keys(this.emailNotificationInfoControls).forEach((controlName) => {
        if (controlName !== 'emailNotificationFlag') {
          this.emailNotificationInfoControls[controlName].enable();
        }
      });
    } else {
      Object.keys(this.emailNotificationInfoControls).forEach((controlName) => {
        if (controlName !== 'emailNotificationFlag') {
          if (controlName === 'senderEmailAddress') {
            this.emailNotificationInfoControls[controlName].setValue('');
          } else {
            this.emailNotificationInfoControls[controlName].setValue(false);
          }
          this.emailNotificationInfoControls[controlName].disable();
        }
      });
    }
  }

  onUpdateShipmethodMappingList(shipmethodMappingList: any[]) {
    this.shipMethodInfoList = shipmethodMappingList;
  }

  valuesResetNew(type: string) {
    Object.keys(this.carrierConfigurationsFormControls).forEach(
      (controlName) => {
        if (type === 'onCarrierCodeChange') {
          if (
            controlName === 'clientId' ||
            controlName === 'orgId' ||
            controlName === 'invOrgId' ||
            controlName === 'carrierId' ||
            controlName === 'carrierCode' ||
            controlName === 'carrierName'
          ) {
            return;
          }
        }
        if (type === 'onCarrierModeChange') {
          if (
            controlName === 'clientId' ||
            controlName === 'orgId' ||
            controlName === 'invOrgId' ||
            controlName === 'carrierId' ||
            controlName === 'carrierName' ||
            controlName === 'carrierMode' ||
            controlName === 'carrierCode'
          ) {
            return;
          }
        }

        if (type === 'onGo') {
          if (
            controlName === 'clientId' ||
            controlName === 'orgId' ||
            controlName === 'invOrgId' ||
            controlName === 'carrierId'
          ) {
            return;
          }
        }

        this.carrierConfigurationsFormControls[controlName].reset();
      }
    );
  }

  onSubmit() {
    if (this.carrierConfigurationsForm.valid) {
      this.spinner.show();
      this.carrierOrgAcctDetailsInfo = this.carrierConfigurationsForm.value;
      this.carrierOrgAcctDetailsInfo.shipMethodMappingInfoList =
        this.shipMethodInfoList;
      this.carrierOrgAcctDetailsInfo.clientId = this.clientId;
      this.carrierOrgAcctDetailsInfo.starTrackInfo = (
        this.carrierConfigurationsFormControls['starTrackInfo'] as FormGroup
      ).value;
      this.carrierOrgAcctDetailsInfo.emailNotificationInfo = (
        this.carrierConfigurationsFormControls[
          'emailNotificationInfo'
        ] as FormGroup
      ).value;
      this.carrierOrgAcctDetailsInfo.fxfrInfo = (
        this.carrierConfigurationsFormControls['fxfrInfo'] as FormGroup
      ).value;
      this.carrierOrgAcctDetailsInfo.shipExecLabelInfo = (
        this.carrierConfigurationsFormControls['shipExecLabelInfo'] as FormGroup
      ).value;
      this.carrierOrgAcctDetailsInfo.worldEaseInfo = (
        this.carrierConfigurationsFormControls['worldEaseInfo'] as FormGroup
      ).value;
      this.carrierOrgAcctDetailsInfo.fedexDirectDistInfo = (
        this.carrierConfigurationsFormControls[
          'fedexDirectDistInfo'
        ] as FormGroup
      ).value;

      this.carrierOrgAcctDetailsInfo.tntInfo = (
        this.carrierConfigurationsFormControls['tntInfo'] as FormGroup
      ).value;

      this.carrierConfigurationsService
        .saveDetails(this.carrierOrgAcctDetailsInfo)
        .subscribe({
          next: (resp: any) => {
            if (resp.code == 200 || resp.code == 201) {
              this.spinner.hide();
              this.toastr.success(resp.message);
              this.goED = true;
              setTimeout(() => {
                this.goED = false;
              }, 2000);
            } else {
              this.spinner.hide();
              this.toastr.error(resp.message);
            }
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error(error.status);
            this.goED = true;
            setTimeout(() => {
              this.goED = false;
            }, 2000);
          },
        });
    } else {
      this.carrierConfigurationsForm.markAllAsTouched();
      this.toastr.error(
        'Please provide mandatory details .Please recheck popups'
      );
    }
  }

  getCarrierCodes() {
    this.lookupValuesService.getCarrierCodes().subscribe({
      next: (resp: any) => {
        this.carrierCodesList = resp.data;
      },
      error: (error: any) => {},
    });
  }

  getCarrierLookUpValues(carrierCode: number): Promise<void> {
    const profileOptionsDataPromise = new Promise<void>((resolve, reject) => {
      this.lookupValuesService.getCarrierLookups(carrierCode).subscribe({
        next: (resp: any) => {
          this.carrierLookUpsList = resp.data;
          if (this.carrierLookUpsList != '') {
            this.hubIdList = this.carrierLookUpsList.hubIdList;
            this.bolLabelFormatList =
              this.carrierLookUpsList.bolLabelFormatList;
            this.cModeList = this.carrierLookUpsList.cmodeList;
            this.cn22LabelFormatList =
              this.carrierLookUpsList.cn22LabelFormatList;
            this.cn22LabelSizeList = this.carrierLookUpsList.cn22LabelSizeList;
            this.docTabLocationList =
              this.carrierLookUpsList.docTabLocationList;
            this.eodLabelFormatList =
              this.carrierLookUpsList.eodLabelFormatList;
            this.fxfrClassCodeList = this.carrierLookUpsList.fxfrClassCodeList;
            this.intlLabelFormatList =
              this.carrierLookUpsList.intlLabelFormatList;
            this.labelFormatList = this.carrierLookUpsList.labelFormatList;
            this.labelStockOrientationList =
              this.carrierLookUpsList.labelStockOrientationList;
            this.shipExecBolFormatList =
              this.carrierLookUpsList.shipExecBolFormatList;
            this.uspsPriceOptionsList =
              this.carrierLookUpsList.uspsPriceOptionsList;
            this.uspsReceiptOptionsList =
              this.carrierLookUpsList.uspsReceiptOptionsList;
            this.paperSizeList = this.carrierLookUpsList.paperSize;
            this.intlPrintLayoutList =
              this.carrierLookUpsList.intlPrintLayoutList;
            this.nonDeliveryOptionsList =
              this.carrierLookUpsList.nonDeliveryOptionsList;
            this.defaultSignOptionList =
              this.carrierLookUpsList.defaultSignOptionList;
            this.intlDocSubTypeList =
              this.carrierLookUpsList.intlDocSubTypeList;
            this.op900LabelFormatList =
              this.carrierLookUpsList.op900LabelFormatList;
            this.regionCodeList = this.carrierLookUpsList.regionCodeList;
            this.requestOptionsList =
              this.carrierLookUpsList.requestOptionsList;
            resolve();
          }
        },
        error: (error) => {
          this.toastr.error(error.error.status);
          reject();
        },
      });
    });

    return profileOptionsDataPromise;
  }

  getAccountNumbersList() {
    this.spinner.show();
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
          this.spinner.hide();
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(
            'accountNumbers are not available for the selected Customer',
            ''
          );
        },
      });
  }

  uploadCarriers() {
    this.loadCarriers.authenticationDetails =
      this.sharedUtilService.getAuthenticationDetails(this.userData);
    this.loadCarriers.clientId = this.clientId;
    this.loadCarriers.orgId = this.orgId;
    this.loadCarriers.invOrgId = this.invOrgId;
    this.loadCarriers.userId = this.userData.userInfo.userId;
    this.loadCarriers.labelPath = this.userData.labelPath;
    this.loadCarriers.erpType = this.erpType;
    this.loadCarriers.reportPath = this.userData.reportPath;
    this.loadCarriers.carrierType = this.userData.jdeCarrierType;
    this.loadCarriers.moTProductCode = this.userData.jdeMotProductCode;
    this.loadCarriers.moTUserDefinedCode = this.userData.jdeMotUserDefinedCode;
    this.loadCarriers.carrierNumber = 0;

    this.spinner.show();
    this.carrierConfigurationsService
      .loadCarriers(this.loadCarriers)
      .subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          this.toastr.success(resp.message);
          this.showCarrierNames(this.orgId, this.invOrgId);
        },
        error: (error: any) => {
          this.spinner.hide();
          console.log(error);
          this.toastr.error(error.error.status);
        },
      });
  }

  onShipmethodMapping(carrierCode: any, carrierMode: any) {
    let clientVar = this.clientId;
    if (this.carrierCode != 999) {
      clientVar = 0;
    }
    this.lookupValuesService
      .getCarrierServiceLevelCodes(clientVar, carrierCode, carrierMode)
      .subscribe({
        next: (resp: any) => {
          this.carrierServiceLevelCodesList = [...resp.data];
          //manually detect changes
          this.cdr.detectChanges();
          this.cdr.markForCheck();
        },
        error: (error: any) => {},
      });
  }

  modifyValidations(carrierCode: any, carrierMode: any) {
    this.carrierConfigurationsFormControls['senderEmailAddress']?.setValidators(
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]
    );
    this.carrierConfigurationsFormControls['hubId']?.updateValueAndValidity();
    this.fxfrInfoControls['fxfrAccountNumber']?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'op900LabelFormat'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'carrierUrl'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'labelFormat'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'senderEmailAddress'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'labelStockOrientation'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'userName'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'password'
    ]?.updateValueAndValidity();
    this.tntInfoControls['rateRequestUrl']?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'carrierMode'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'dhlRegionCode'
    ]?.updateValueAndValidity();
    this.carrierConfigurationsFormControls[
      'requestOption'
    ]?.updateValueAndValidity();
    if (carrierCode != '999') {
      this.carrierConfigurationsFormControls['carrierMode']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'carrierMode'
      ]?.updateValueAndValidity();
    }
    if (carrierCode != '999' || carrierMode != '') {
      this.carrierConfigurationsFormControls['carrierUrl']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'carrierUrl'
      ]?.updateValueAndValidity();
      this.carrierConfigurationsFormControls['userName']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'userName'
      ]?.updateValueAndValidity();
      this.carrierConfigurationsFormControls['password']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'password'
      ]?.updateValueAndValidity();
      this.carrierConfigurationsFormControls['labelFormat']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'labelFormat'
      ]?.updateValueAndValidity();
    }
    if (carrierCode == 111) {
      this.carrierConfigurationsFormControls['op900LabelFormat']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'op900LabelFormat'
      ]?.updateValueAndValidity();
      this.carrierConfigurationsFormControls['hubId']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls['hubId']?.updateValueAndValidity();
    }
    if (carrierCode == 112) {
      this.fxfrInfoControls['fxfrAccountNumber']?.setValidators(
        Validators.required
      );
      this.fxfrInfoControls['fxfrAccountNumber']?.updateValueAndValidity();
    }

    if (
      carrierCode == 110 ||
      carrierCode == 111 ||
      (this.carrierCode == '100' && this.carrierMode == 'UPS Direct')
    ) {
      this.carrierConfigurationsFormControls[
        'labelStockOrientation'
      ]?.setValidators(Validators.required);
      this.carrierConfigurationsFormControls[
        'labelStockOrientation'
      ]?.updateValueAndValidity();
    }

    if (carrierCode == 100 && this.carrierMode == 'UPS Direct') {
      this.carrierConfigurationsFormControls['requestOption']?.setValidators(
        Validators.required
      );
      this.carrierConfigurationsFormControls[
        'requestOption'
      ]?.updateValueAndValidity();
    }

    if (carrierCode == 113) {
      this.tntInfoControls['rateRequestUrl']?.setValidators(
        Validators.required
      );
      this.tntInfoControls['rateRequestUrl']?.updateValueAndValidity();
    }
    if (carrierCode == 114 && carrierMode != 'ShipExec') {
      this.carrierConfigurationsForm
        .get('dhlRegionCode')
        ?.setValidators(Validators.required);
      this.carrierConfigurationsForm
        .get('dhlRegionCode')
        ?.updateValueAndValidity();
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.carrierConfigurationsFormControls['dhlLogoImage']?.setValue(
        reader.result
      );
    };
  }
  onEnableFlagChange(enableFlag: boolean) {
    console.log(enableFlag);
    this.hideShipmethodMappingButton = !enableFlag;
  }
}
