import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormArray,
  NonNullableFormBuilder,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
  faLink,
  faTruckPlane,
  faAsterisk,
  faPrint,
  faUpRightFromSquare,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientOrgProfileOptionsInfo } from '../../models/client-org-profile-options-info.model';
import { LoadFreight } from '../../models/load-freight.model';
import { ProfileOptionsService } from '../../services/profile-options.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { FreightCostTypesInfo } from '../../models/freight-cost-types-info.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { UsppiInfo } from '../../models/usppi-info.model';
import { OrgProfileOptionsInfo } from '../../models/org-profile-options-info.model';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { ShipperNameLookupInfo } from '../../models/shipper-name-lookup-info.model';
import { AccountNumberDffInfo } from '../../models/account-number-dff-info.model';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { SelectControlsService } from 'src/app/modules/admin/services/select-controls.service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';
@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css'],
})
export class ProfileOptionsComponent implements OnInit {
  faUpRightFromSquare = faUpRightFromSquare;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faCircleInfo = faCircleInfo;
  faLink = faLink;
  faTruckFront = faTruckPlane;
  faAsterisk = faAsterisk;
  faPrint = faPrint;
  faAdd = faAdd;
  profileOptionsForm!: FormGroup;
  usppiForm!: FormGroup;
  clientId!: number;
  invOrgId!: string;
  orgId!: string;
  goED: boolean = true;
  userData: any;
  customerNamesList!: any;
  orgIdList!: any;
  invOrgIdList!: any;
  erpType!: any;
  roleId!: any;
  consolidationCriteriaList!: any;
  countryCodesList!: any;
  customerAddressList!: any;
  defaultCarrierPayMethodList!: any;
  defaultFocusList!: any;
  defaultUOMList!: any;
  departmentList!: any;
  freightCostList!: any;
  freightTermAttributeList!: any;
  originRegionCodeList!: any;
  reference1ValueList!: any;
  reference2ValueList!: any;
  shipFromNameList!: any;
  shipToInfoList!: any;
  shipmentRetrivalCriteriaList!: any;
  sourceOfIntlShippingDataList!: any;
  shipperNamesList!: any;
  timezoneValueList!: any;
  shipToContactList!: any;
  usppiIdList!: any;
  requestOptionsList!: any;
  showCustomerList: boolean = false;
  showCarrier: boolean = true;
  customersList!: any;
  showAddressValidation: boolean = false;
  showFreightShopping: boolean = false;
  showDeniedParty: boolean = false;
  showAddressValidationInfo: boolean = false;
  showFreightShoppingInfo: boolean = false;
  showDeniedPartyInfo: boolean = false;
  mandateRefference1: boolean = false;
  mandateRefference2: boolean = false;
  clientOrgProfileOptionInfo: ClientOrgProfileOptionsInfo =
    new ClientOrgProfileOptionsInfo();
  loadFreight: LoadFreight = new LoadFreight();
  orgProfileOptionServicesInfoList!: FormArray;
  fsCarrierDetails!: FormArray;
  addressValidationForm!: FormGroup;
  deniedPartyForm!: FormGroup;
  addonServicesList!: any;
  profilesList!: any;
  usppiInfoString!: string;
  usppiInfo!: FormGroup;
  accountNumberDffInfoString!: string;
  accountNumberDffInfo!: FormGroup;
  clientProfileSelectionsInfoList!: FormArray;
  freightCostTypesInfoList: FreightCostTypesInfo[] = [];
  fields: any = [];
  fsCarriers: string[] = [
    'UPS',
    'FedEx',
    'DHL',
    'LTL ConnectShip',
    'LTLConsole',
    'TNT',
    'STAMPS',
    'USPS',
    'ShipExec',
    'ABF',
    'FXFR',
    'ECHO',
  ];
  isDisabled = true;
  phoneNumberPattern =
    /^(\+[1-9][0-9]{0,2}\s?)?[1-9][0-9]{9}$|^\(\d{3}\)\s?[1-9][0-9]{2}\s?[0-9]{4}$|^[1-9][0-9]{2}\s?[1-9][0-9]{2}\s?[0-9]{4}$/;
  shipperNameLookupInfo: ShipperNameLookupInfo = new ShipperNameLookupInfo();
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;

  constructor(
    private fb: NonNullableFormBuilder,
    private profileOptionsService: ProfileOptionsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private lookupValuesService: LookupValuesService,
    private sharedUtilService: SharedUtilService,
    private loadLookupsService: LoadLookupsService,
    private selectControls: SelectControlsService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.buildForm(new UsppiInfo());
    this.buildForm(new AccountNumberDffInfo());
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.buildProfileOptionsForm(this.clientOrgProfileOptionInfo);
    this.userData = this.localStorageService.getLocalUserData();
    this.roleId = this.userData.userInfo.roleId;
    this.profileOptionsForm.disable();
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
    if (this.roleId == 3 || this.roleId == 4 || this.roleId == 5) {
      this.profileOptionsFormControls['orgId'].enable();
      this.clientId = this.userData.clientId;
      this.erpType = this.userData.erpType;
      this.loadValuesBasedOnErpType(this.erpType);
      this.showCustomerList = false;
      this.profileOptionsFormControls['clientId'].clearValidators();
      this.profileOptionsFormControls['clientId'].updateValueAndValidity;
      this.showOrgId(this.clientId);
      let listOfServices = this.userData.clientSubscriptionInfoList;
      listOfServices.forEach((service: any) => {
        let serviceName = service.serviceName;
        let activeFlag = service.activeFlag;
        if (serviceName == 'AV') {
          this.showAddressValidation = activeFlag;
        } else if (serviceName == 'FS') {
          this.showFreightShopping = activeFlag;
        } else if (serviceName == 'DP') {
          this.showDeniedParty = activeFlag;
        }
      });
    } else if (this.roleId == 1 || this.roleId == 2) {
      this.profileOptionsFormControls['clientId'].enable();
      this.getCustomerName();
      this.showCustomerList = true;
      this.profileOptionsFormControls['clientId'].setValidators([
        Validators.required,
      ]);
      this.profileOptionsFormControls['clientId'].updateValueAndValidity;
      this.lookupValuesService.getCustomerDetails().subscribe({
        next: (resp: any) => {
          this.customersList = resp.data;
        },
        error: (error) => {},
      });
    }
  }

  buildForm(model: any) {
    const formGroupFields = this.getFormControlsFields(model);
    this.usppiInfo = new FormGroup(formGroupFields);
    this.accountNumberDffInfo = new FormGroup(formGroupFields);
  }

  loadValuesBasedOnErpType(erpType: any) {
    if (erpType == 'JDE') {
      this.profileOptionsFormControls[
        'shipConfirmResponsibility'
      ].clearValidators();
      this.profileOptionsFormControls['shipConfirmResponsibility']
        .updateValueAndValidity;
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].setValidators([Validators.required]);
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].updateValueAndValidity();
    } else if (erpType == 'EBS') {
      this.profileOptionsFormControls[
        'shipConfirmResponsibility'
      ].setValidators([Validators.required]);
      this.profileOptionsFormControls['shipConfirmResponsibility']
        .updateValueAndValidity;
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].clearValidators();
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].updateValueAndValidity();
    } else if (erpType == 'NS') {
      this.profileOptionsFormControls['freightCostType'].clearValidators();
      this.profileOptionsFormControls['freightCostType'].updateValueAndValidity;
      this.profileOptionsFormControls[
        'shipConfirmResponsibility'
      ].clearValidators();
      this.profileOptionsFormControls['shipConfirmResponsibility']
        .updateValueAndValidity;
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].setValidators([Validators.required]);
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].updateValueAndValidity();
    } else if (erpType == 'SCM') {
      this.profileOptionsFormControls[
        'shipConfirmResponsibility'
      ].clearValidators();
      this.profileOptionsFormControls['shipConfirmResponsibility']
        .updateValueAndValidity;
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].clearValidators();
      this.profileOptionsFormControls[
        'shipmentRetrievalCriteria'
      ].updateValueAndValidity();
    }
  }

  //SAMEER G BUILDING MODEL DRIVEN FORMS
  buildProfileOptionsForm(model: any) {
    const formGroupFields = this.getFormControlsFields(model);
    this.profileOptionsForm = new FormGroup(formGroupFields);
    this.addOrUpdateFormArray(
      this.profileOptionsForm,
      'clientProfileSelectionsInfoList',
      [new ClientOrgProfileOptionsInfo()]
    );
    this.addOrUpdateControl(
      this.profileOptionsForm,
      'usppiInfo',
      new UsppiInfo()
    );
    this.addOrUpdateControl(
      this.profileOptionsForm,
      'accountNumberDffInfo',
      new AccountNumberDffInfo()
    );
    this.addOrUpdateFormArray(
      this.profileOptionsForm,
      'orgProfileOptionServicesInfoList',
      [new OrgProfileOptionsInfo()]
    );
    this.addService();
    this.setValidations();
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.profileOptionsForm.get('shipShip')?.setValue(false);
    this.profileOptionsForm.get('intlCommercialInvoicePrint')?.setValue(false);
    this.profileOptionsForm.get('intlUscoPrint')?.setValue(false);
    this.profileOptionsForm.get('scanShip')?.setValue(false);
    this.profileOptionsForm.get('shipShip')?.setValue(false);
    this.profileOptionsForm.get('shipShipPrint')?.setValue(false);
    this.profileOptionsForm.get('shipShipPrintConfirm')?.setValue(false);
    this.profileOptionsForm.get('shipShipPrintConfirmPakslp')?.setValue(false);
    this.profileOptionsForm.get('printPrint')?.setValue(false);
    this.profileOptionsForm.get('printPrintConfirm')?.setValue(false);
    this.profileOptionsForm.get('printPrintConfirmPakslp')?.setValue(false);
    this.profileOptionsForm.get('confirmConfirm')?.setValue(false);
    this.profileOptionsForm.get('confirmPakslipreport')?.setValue(false);
    this.profileOptionsForm.get('reference1Mandatory')?.setValue(false);
    this.profileOptionsForm.get('reference2Mandatory')?.setValue(false);
    this.profileOptionsForm.get('addressValidationFlag')?.setValue(false);
    this.profileOptionsForm.get('freightShoppingFlag')?.setValue(false);
    this.profileOptionsForm.get('deniedPartyFlag')?.setValue(false);
  }

  addOrUpdateFormArray(
    formGroup: FormGroup,
    formArrayName: string,
    formArrayInstance: any[]
  ) {
    // Remove the existing FormArray
    formGroup.removeControl(formArrayName);

    // Add the updated FormArray
    formGroup.addControl(
      formArrayName,
      new FormArray(
        formArrayInstance.map(
          (item) => new FormGroup(this.getFormControlsFields(item))
        )
      )
    );
  }

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
      let validations = [];
      switch (field) {
        case 'usppiPostalCode':
          validations.push(
            Validators.maxLength(60),
            Validators.pattern(/^[a-zA-Z0-9\s]*$/)
          );
          break;
        case 'usppiPhone':
          validations.push(Validators.pattern(this.phoneNumberPattern));
          break;
        default:
          validations.push();
          break;
      }

      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }
    return formGroupFields;
  }

  get usppiInfoControls() {
    return (this.profileOptionsForm.get('usppiInfo') as FormGroup).controls;
  }
  get accountNumberDffControls() {
    return (this.profileOptionsForm.get('accountNumberDffInfo') as FormGroup)
      .controls;
  }
  // Function to add validations to a specific control
  addValidationToControl(controlName: string, validators: ValidatorFn[]) {
    const control = this.profileOptionsForm.get(controlName);

    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity(); // Trigger validation immediately
    } else {
      console.error(`Control with name ${controlName} not found`);
    }
  }

  trackByFn(index: number, option: any): number {
    return option.id;
  }
  setValidations() {
    this.addValidationToControl('orgId', [Validators.required]);
    this.addValidationToControl('invOrgId', [Validators.required]);
    this.addValidationToControl('companyName', [Validators.required]);
    this.addValidationToControl('shipperLocationName', [Validators.required]);
    this.addValidationToControl('originRegionCode', [Validators.required]);
    this.addValidationToControl('countryCode', [Validators.required]);
    this.addValidationToControl('shipFromName', [Validators.required]);
    this.addValidationToControl('shipToName', [Validators.required]);
    this.addValidationToControl('shipToContact', [Validators.required]);
    this.addValidationToControl('customerAddress', [Validators.required]);
    this.addValidationToControl('freightCostType', [Validators.required]);
    this.addValidationToControl('sourceOfIntlShippingData', [
      Validators.required,
    ]);
    this.addValidationToControl('carrierPayMethod', [Validators.required]);
    this.addValidationToControl('numberOfDocCopiesToPrint', [
      Validators.required,
      Validators.pattern('^(0?[1-9]|[1-9][0-9])$'),
    ]);
    this.addValidationToControl('numPackSlipReports', [
      Validators.pattern('^(0?[0-9]|[1-9][0-9]?)$'),
    ]);
    this.addValidationToControl('defaultUom', [Validators.required]);
    this.addValidationToControl('timeZoneValue', [Validators.required]);
    this.addValidationToControl('defaultFocus', [Validators.required]);
  }

  addService() {
    this.orgProfileOptionServicesInfoList = this.profileOptionsFormControls[
      'orgProfileOptionServicesInfoList'
    ] as FormArray;
    this.orgProfileOptionServicesInfoList.removeAt(0);
    this.orgProfileOptionServicesInfoList.push(this.createService('AV'));
    this.orgProfileOptionServicesInfoList.push(this.createService('DP'));
    this.orgProfileOptionServicesInfoList.push(this.createService('FS'));
    this.addFsCarrierDetails();
  }

  createService(serviceType: any) {
    return this.fb.group({
      clientId: this.clientId,
      orgId: this.orgId,
      invOrgId: this.invOrgId,
      typeOfService: [serviceType],
      carrierUserName: [],
      carrierPassword: [],
      carrierUrl: [],
      requestOption: [],
      serviceCarrier: ['UPS'],
      carrierAccountNumber: [],
      meterNumber: [],
      fsSortRule: ['rate'],
      fsCarrierDetails: new FormArray([]),
    });
  }

  addFsCarrierDetails() {
    const orgProfileOptionServicesInfoList =
      this.profileOptionsFormControls['orgProfileOptionServicesInfoList'];
    if (orgProfileOptionServicesInfoList instanceof FormArray) {
      this.fsCarrierDetails = orgProfileOptionServicesInfoList
        .at(2)
        .get('fsCarrierDetails') as FormArray;
      this.fsCarriers.forEach((carrier) => {
        this.fsCarrierDetails.push(this.createFsCarrierDetails(carrier));
      });
    }
  }

  createFsCarrierDetails(name: string) {
    return this.fb.group({
      name: [name],
      value: [],
    });
  }

  loadAVFieldValidationsOnCarrierChange() {
    let carrier =
      this.orgProfileOptionServicesInfoList.at(0).value.serviceCarrier;
    this.addressValidationForm = (
      this.profileOptionsFormControls[
        'orgProfileOptionServicesInfoList'
      ] as FormArray
    ).at(0) as FormGroup;
    if (carrier == 'UPS') {
      this.showCarrier = true;
    } else {
      this.showCarrier = false;
    }
  }

  loadAVFieldValidationsOnCheck() {
    let addressValidationFlag =
      this.profileOptionsForm.value['addressValidationFlag'];
    this.addressValidationForm = (
      this.profileOptionsFormControls[
        'orgProfileOptionServicesInfoList'
      ] as FormArray
    ).at(0) as FormGroup;
    if (addressValidationFlag && this.showAddressValidation) {
      this.showAddressValidationInfo = true;
      this.addressValidationForm.controls['serviceCarrier'].setValidators([
        Validators.required,
      ]);
      this.addressValidationForm.controls['carrierUserName'].setValidators([
        Validators.required,
      ]);
      this.addressValidationForm.controls['carrierUrl'].setValidators([
        Validators.required,
      ]);
      this.addressValidationForm.controls['carrierPassword'].setValidators([
        Validators.required,
      ]);
      this.addressValidationForm.controls['carrierAccountNumber'].setValidators(
        [Validators.required]
      );
      this.addressValidationForm.controls['requestOption'].setValidators([
        Validators.required,
      ]);
    } else {
      this.showAddressValidationInfo = false;
      this.addressValidationForm.controls['serviceCarrier'].clearValidators();
      this.addressValidationForm.controls['carrierUserName'].clearValidators();
      this.addressValidationForm.controls['carrierPassword'].clearValidators();
      this.addressValidationForm.controls[
        'carrierAccountNumber'
      ].clearValidators();
    }
    this.addressValidationForm.controls[
      'serviceCarrier'
    ].updateValueAndValidity();
    this.addressValidationForm.controls[
      'carrierUserName'
    ].updateValueAndValidity();
    this.addressValidationForm.controls['carrierUrl'].updateValueAndValidity();
    this.addressValidationForm.controls[
      'requestOption'
    ].updateValueAndValidity();
    this.addressValidationForm.controls[
      'carrierPassword'
    ].updateValueAndValidity();
    this.addressValidationForm.controls[
      'carrierAccountNumber'
    ].updateValueAndValidity();
  }

  loadFSFieldValidationsOnCheck() {
    let freightShoppingFlag =
      this.profileOptionsForm.value['freightShoppingFlag'];
    if (freightShoppingFlag) {
      this.showFreightShoppingInfo = true;
    } else {
      this.showFreightShoppingInfo = false;
    }
  }

  loadDPFieldValidationsOnCheck() {
    let deniedPartyFlag = this.profileOptionsForm.value['deniedPartyFlag'];
    this.deniedPartyForm = (
      this.profileOptionsFormControls[
        'orgProfileOptionServicesInfoList'
      ] as FormArray
    ).at(1) as FormGroup;
    if (deniedPartyFlag && this.showDeniedParty) {
      this.showDeniedPartyInfo = true;
      this.deniedPartyForm.controls['carrierUserName'].setValidators([
        Validators.required,
      ]);
      this.deniedPartyForm.controls['carrierPassword'].setValidators([
        Validators.required,
      ]);
    } else {
      this.showDeniedPartyInfo = false;
      this.deniedPartyForm.controls['carrierUserName'].clearValidators();
      this.deniedPartyForm.controls['carrierPassword'].clearValidators();
    }
    this.deniedPartyForm.controls['carrierUserName'].updateValueAndValidity();
    this.deniedPartyForm.controls['carrierPassword'].updateValueAndValidity();
  }

  getProfileOptionsLookups(erpType: string, clientId: number): Promise<void> {
    this.spinner.show();
    const formArray = this.profileOptionsFormControls[
      'clientProfileSelectionsInfoList'
    ] as FormArray;
    formArray.clear();
    this.clear();

    const profileOptionsDataPromise = new Promise<void>((resolve, reject) => {
      this.profileOptionsService
        .getProfileOptionsLookupValues(erpType, clientId)
        .subscribe({
          next: (resp: any) => {
            this.consolidationCriteriaList =
              resp.data.consolidationCriteriaList;
            this.customerAddressList = resp.data.customerAddressList;
            this.defaultCarrierPayMethodList =
              resp.data.defaultCarrierPayMethodList;
            this.defaultFocusList = resp.data.defaultFocusList;
            this.defaultUOMList = resp.data.defaultUOMList;
            this.departmentList = resp.data.departmentList;
            this.freightCostList = resp.data.freightCostList;
            this.freightTermAttributeList = resp.data.freightTermAttributeList;
            this.originRegionCodeList = resp.data.originRegionCodeList;
            this.reference1ValueList = resp.data.reference1ValueList;
            this.reference2ValueList = resp.data.reference2ValueList;
            this.shipFromNameList = resp.data.shipFromNameList;
            this.shipToContactList = resp.data.shipToContactList;
            this.shipToInfoList = resp.data.shipToInfoList;
            this.shipmentRetrivalCriteriaList =
              resp.data.shipmentRetrivalCriteriaList;
            this.shipperNamesList = resp.data.shipperNamesList;
            this.sourceOfIntlShippingDataList =
              resp.data.sourceOfIntlShippingDataList;
            this.timezoneValueList = resp.data.timezoneValueList;
            this.usppiIdList = resp.data.usppiIdList;
            this.profilesList = resp.data.profilesList;
            this.requestOptionsList = resp.data.requestOptionsList;
            this.setProfiles();
            resolve();
          },
          error: (error) => {
            reject(error);
          },
        });
      this.spinner.hide();
    });
    return profileOptionsDataPromise;
  }

  patchFormData(data: any) {
    Object.keys(data).forEach((controlName) => {
      const controlValue = data[controlName];
      if (null != controlValue && controlValue != undefined) {
        this.profileOptionsForm.get(controlName)?.patchValue(controlValue);
      }
    });
  }
  getCustomerName() {
    if (this.clientId != 0) {
      this.lookupValuesService.getAllCustomerNames().subscribe({
        next: (resp: any) => {
          this.customerNamesList = resp.data;
        },
        error: (error) => {},
      });
    } else {
      this.customerNamesList = [];
    }
  }

  showOrgId(clientId: any) {
    this.orgIdList = [];
    this.invOrgIdList = [];
    this.profileOptionsFormControls['orgId']?.reset('');
    this.profileOptionsFormControls['invOrgId']?.reset('');
    this.profileOptionsFormControls['invOrgId']?.disable();
    if (clientId == '') {
      this.profileOptionsFormControls['orgId']?.disable();
    } else {
      this.clientId = clientId;
      if (this.roleId == 1 || this.roleId == 2) {
        this.customersList.forEach((customer: any) => {
          if (customer.clientId == clientId) {
            this.erpType = customer.erpType;
            this.loadValuesBasedOnErpType(this.erpType);
            this.userData = customer;
            let listOfServices = customer.clientSubscriptionInfoList;
            listOfServices.forEach((service: any) => {
              let serviceName = service.serviceName;
              let activeFlag = service.activeFlag;
              if (serviceName == 'AV') {
                this.showAddressValidation = activeFlag;
              } else if (serviceName == 'FS') {
                this.showFreightShopping = activeFlag;
              } else if (serviceName == 'DP') {
                this.showDeniedParty = activeFlag;
              }
            });
          }
        });
      }
      this.lookupValuesService.getOrganizationsList(clientId).subscribe({
        next: (resp: any) => {
          this.orgIdList = resp.data;
          this.profileOptionsFormControls['orgId'].enable();
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

  showInvOrgId(orgId: any) {
    this.invOrgIdList = [];
    this.profileOptionsFormControls['invOrgId']?.reset('');
    if (orgId == '') {
      this.profileOptionsFormControls['invOrgId']?.disable();
    } else {
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.invOrgIdList = resp.data;
            this.profileOptionsFormControls['invOrgId'].enable();
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

  showGoButton(orgId: any, invOrgId: any) {
    if (this.clientId != 0 && orgId != '' && invOrgId != '') {
      this.goED = false;
    } else {
      this.goED = true;
    }
    this.resetOnChange();
  }
  resetOnChange() {
    const clientId = this.profileOptionsForm?.get('clientId')?.value;
    const orgId = this.profileOptionsForm?.get('orgId')?.value;
    const invOrgId = this.profileOptionsForm?.get('invOrgId')?.value;
    this.profileOptionsForm.reset();
    this.profileOptionsForm.disable();
    this.selectControls.selectControls(this.profileOptionsForm);
    if (this.roleId == 1 || this.roleId == 2) {
      this.profileOptionsForm?.get('clientId')?.enable();
    } else {
      this.profileOptionsForm?.get('orgId')?.enable();
    }
    this.goED = true;
    if (clientId != '') {
      this.profileOptionsForm?.get('orgId')?.enable();
      this.profileOptionsForm?.get('clientId')?.setValue(clientId);
    }
    if (orgId != '') {
      this.profileOptionsForm?.get('invOrgId')?.enable();
      this.profileOptionsForm?.get('orgId')?.setValue(orgId);
    }
    if (invOrgId != '') {
      this.goED = false;
      this.profileOptionsForm?.get('invOrgId')?.setValue(invOrgId);
    }
  }

  loadFreightCost() {
    this.loadFreight.authenticationDetails =
      this.sharedUtilService.getAuthenticationDetails(this.userData);
    this.loadFreight.clientId = this.clientId;
    this.loadFreight.labelPath = this.userData.labelPath;
    this.loadFreight.productCode = this.userData.productCode;
    this.loadFreight.userDefinedCodes = this.userData.userDefinedCodes;
    this.loadFreight.reportPath = this.userData.reportPath;
    this.loadFreight.erpType = this.erpType;
    this.loadFreight.productCode = this.userData.jdeProductCode;
    this.loadFreight.userDefinedCodes = this.userData.jdeUserDefinedCode;
    this.spinner.show();
    this.profileOptionsService
      .loadFreightCostTypes(this.loadFreight)
      .subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          this.toastr.success(resp.message);
          this.freightCostTypesInfoList = resp.data;
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
  }

  getFreightCostsList(clientId: number) {
    this.profileOptionsService.getFreightCostNamesList(clientId).subscribe({
      next: (resp: any) => {
        this.freightCostTypesInfoList = resp;
      },
      error: (error) => {
        this.toastr.error(error.error.status);
      },
    });
  }

  getProfileOptionsDetails(orgId: any, invOrgId: any) {
    this.spinner.show();
    this.isDisabled = false;
    const profileOptionsDataPromise = this.getProfileOptionsLookups(
      this.erpType,
      this.clientId
    );
    this.orgId = orgId;
    this.invOrgId = invOrgId;
    profileOptionsDataPromise
      .then(() => {
        if (this.clientId != 0 && this.orgId != '' && this.invOrgId != '') {
          this.profileOptionsForm.enable();
          this.spinner.show();
          this.getFreightCostsList(this.clientId);
          this.profileOptionsService
            .getProfileOptions(this.orgId, this.invOrgId, this.clientId)
            .subscribe({
              next: (resp: any) => {
                this.clientOrgProfileOptionInfo = resp.data;
                if (this.clientOrgProfileOptionInfo.companyName) {
                  const orgProfileOptionServicesInfoList =
                    resp.data.orgProfileOptionServicesInfoList;
                  for (
                    let i = 0;
                    i < orgProfileOptionServicesInfoList.length;
                    i++
                  ) {
                    const fsCarrierDetailsValue =
                      orgProfileOptionServicesInfoList[i].fsCarrierDetails;
                    const parsedValue = JSON.parse(fsCarrierDetailsValue);
                    this.clientOrgProfileOptionInfo.orgProfileOptionServicesInfoList[
                      i
                    ].fsCarrierDetails = parsedValue;
                  }
                  this.profileOptionsForm.patchValue(
                    this.clientOrgProfileOptionInfo
                  );
                } else {
                  this.profileOptionsForm.reset();
                  this.profileOptionsFormControls['clientId'].patchValue(
                    this.clientId
                  );
                  this.profileOptionsFormControls['orgId'].patchValue(
                    this.orgId
                  );
                  this.profileOptionsFormControls['invOrgId'].patchValue(
                    this.invOrgId
                  );
                  this.setDefaultValues();
                }
                this.loadAVFieldValidationsOnCheck();
                this.loadDPFieldValidationsOnCheck();
                this.loadFSFieldValidationsOnCheck();
                this.spinner.hide();
                this.goED = true;
                setTimeout(() => {
                  this.goED = false;
                  if (this.showAddressValidation) {
                    this.loadAVFieldValidationsOnCarrierChange();
                  }
                }, 2000);
                this.mandateReferences();
              },
              error: (error) => {
                this.spinner.hide();
                this.toastr.error(error.error.status);
                this.goED = false;
              },
            });
        } else {
          this.spinner.hide();
          this.goED = false;
        }
      })
      .catch((error) => {
        this.spinner.hide();
      });
    this.spinner.hide();
    this.orgId = orgId;
    this.invOrgId = invOrgId;
  }

  submitProfileOptions() {
    this.spinner.show();
    if (this.profileOptionsForm.invalid) {
      Object.values(this.profileOptionsFormControls).forEach((control) => {
        control.markAsTouched();
      });
      const servicesFormArray = this.profileOptionsFormControls[
        'orgProfileOptionServicesInfoList'
      ] as FormArray;
      for (let i = 0; i < servicesFormArray.length; i++) {
        const serviceform = servicesFormArray.at(i) as FormGroup;
        Object.values(serviceform.controls).forEach((control) => {
          control.markAsTouched();
        });
      }
      this.toastr.error(
        'Please provide mandatory details .Please recheck popups'
      );
      this.spinner.hide();
    } else {
      this.profileOptionsForm.enable();
      this.clientOrgProfileOptionInfo = this.profileOptionsForm.value;
      const orgProfileOptionServicesInfoList = this.profileOptionsFormControls[
        'orgProfileOptionServicesInfoList'
      ] as FormArray;
      orgProfileOptionServicesInfoList.controls.forEach((control, index) => {
        const fsCarrierDetails = control.get('fsCarrierDetails') as FormArray;
        this.clientOrgProfileOptionInfo.orgProfileOptionServicesInfoList[
          index
        ].fsCarrierDetails = JSON.stringify(fsCarrierDetails.value);
        this.clientOrgProfileOptionInfo.orgProfileOptionServicesInfoList[
          index
        ].clientId = this.clientId;
        this.clientOrgProfileOptionInfo.orgProfileOptionServicesInfoList[
          index
        ].orgId = this.orgId;
        this.clientOrgProfileOptionInfo.orgProfileOptionServicesInfoList[
          index
        ].invOrgId = this.invOrgId;
      });
      this.clientOrgProfileOptionInfo.clientId = this.clientId;
      if (this.profileOptionsForm.valid) {
        this.usppiInfoString = JSON.stringify(
          this.clientOrgProfileOptionInfo.usppiInfo
        );
        this.accountNumberDffInfoString = JSON.stringify(
          this.clientOrgProfileOptionInfo.accountNumberDffInfo
        );
        const profilesInfo = this.profileOptionsFormControls[
          'clientProfileSelectionsInfoList'
        ] as FormArray;

        this.clientOrgProfileOptionInfo.clientProfileSelectionsInfoList =
          profilesInfo.value;
        this.profileOptionsService
          .saveProfileOptions(this.clientOrgProfileOptionInfo)
          .subscribe({
            next: (resp: any) => {
              this.spinner.hide();
              this.toastr.success(resp.message);
              this.goED = false;
            },
            error: (error) => {
              this.spinner.hide();
              this.toastr.error(error.error.status);
              this.goED = false;
            },
          });
      } else {
        this.toastr.error(
          'Error while saving the profile options. Please recheck and save'
        );
      }
    }
  }

  get profileOptionsFormControls() {
    return this.profileOptionsForm.controls;
  }

  onScanShipChange(event: any) {
    if (event.target.checked) {
      this.profileOptionsFormControls['shipShip'].setValue(true);
    }
  }

  validateAv() {
    let av = this.addressValidationForm as FormGroup;
    Object.values(av.controls).forEach((con) => {
      con.markAsTouched();
    });
  }

  onshipShipChange(event: any) {
    if (event.target.checked === false) {
      this.profileOptionsForm.controls['shipShipPrint'].setValue(false);
      this.profileOptionsForm.controls['scanShip'].setValue(false);
    }
  }

  onshipShipPrintChange(event: any) {
    if (event.target.checked === false) {
      this.profileOptionsForm.controls['shipShipPrintConfirm'].setValue(false);
      this.profileOptionsForm.controls['shipShipPrintConfirm'].disable();
    } else {
      this.profileOptionsForm.controls['shipShipPrintConfirm'].enable();
    }
  }

  onshipShipPrintConfirmChange(event: any) {
    if (event.target.checked) {
      this.profileOptionsForm.controls['printPrintConfirm'].setValue(false);
      this.profileOptionsForm.controls['printPrintConfirm'].disable();
      this.profileOptionsForm.controls['confirmConfirm'].setValue(false);
      this.profileOptionsForm.controls['confirmConfirm'].disable();
      this.profileOptionsForm.controls['confirmPakslipreport'].setValue(false);
      this.profileOptionsForm.controls['confirmPakslipreport'].disable();
    } else {
      this.profileOptionsForm.controls['printPrintConfirm'].enable();
      this.profileOptionsForm.controls['confirmConfirm'].enable();
    }
  }

  onprintPrintConfirmChange() {
    if (this.profileOptionsForm.get('printPrintConfirm')?.value == true) {
      this.profileOptionsForm.controls['shipShipPrintConfirm'].disable();
      this.profileOptionsForm.controls['confirmConfirm'].disable();
      this.profileOptionsForm.controls['shipShipPrintConfirm'].setValue(false);
      this.profileOptionsForm.controls['confirmConfirm'].setValue(false);
      this.profileOptionsForm.controls['confirmPakslipreport'].setValue(false);
      this.profileOptionsForm.controls['confirmPakslipreport'].disable();
    } else {
      this.profileOptionsForm.controls['shipShipPrintConfirm'].enable();
      this.profileOptionsForm.controls['confirmConfirm'].enable();
    }
  }
  onconfirmConfirmchange() {
    if (this.profileOptionsForm.get('confirmConfirm')?.value == true) {
      this.profileOptionsForm.controls['confirmPakslipreport'].enable();
      this.profileOptionsForm.controls['confirmPakslipreport'].setValue(false);
      this.profileOptionsForm.controls['shipShipPrintConfirm'].setValue(false);
      this.profileOptionsForm.controls['shipShipPrintConfirm'].disable();
      this.profileOptionsForm.controls['printPrintConfirm'].setValue(false);
      this.profileOptionsForm.controls['printPrintConfirm'].disable();
    } else {
      this.profileOptionsForm.controls['confirmPakslipreport'].disable();
      this.profileOptionsForm.controls['confirmPakslipreport'].setValue(false);
      this.profileOptionsForm.controls['shipShipPrintConfirm'].enable();
      this.profileOptionsForm.controls['printPrintConfirm'].enable();
    }
  }
  clear() {
    this.profileOptionsFormControls['clientProfileSelectionsInfoList']?.reset();
    this.profileOptionsForm.reset();
  }

  clearForm(): void {
    this.profileOptionsForm.reset();
    this.getProfileOptionsDetails(this.orgId, this.invOrgId);
  }
  setProfiles() {
    this.clientProfileSelectionsInfoList = this.profileOptionsFormControls[
      'clientProfileSelectionsInfoList'
    ] as FormArray;
    this.profilesList.forEach((profile: any) => {
      this.clientProfileSelectionsInfoList.push(
        this.createProfile(profile.profileCode)
      );
    });
  }
  createProfile(profileCode: string) {
    const arr = this.profileOptionsFormControls[
      'clientProfileSelectionsInfoList'
    ] as FormArray;
    return this.fb.group({
      clientId: [this.clientId],
      orgId: [this.orgId],
      invOrgId: [this.invOrgId],
      profileCode: [profileCode],
      enabled: [false],
    });
  }

  mandateReferences() {
    if (true == this.profileOptionsFormControls['reference1Mandatory']?.value) {
      this.profileOptionsForm
        .get('reference1Value')
        ?.setValidators(Validators.required);
      this.mandateRefference1 = true;
    } else {
      this.mandateRefference1 = false;
      this.profileOptionsFormControls['reference1Value']?.clearValidators();
    }
    if (true == this.profileOptionsFormControls['reference2Mandatory']?.value) {
      this.profileOptionsForm
        .get('reference2Value')
        ?.setValidators(Validators.required);
      this.mandateRefference2 = true;
    } else {
      this.mandateRefference2 = false;
      this.profileOptionsFormControls['reference2Value']?.clearValidators();
    }

    this.profileOptionsFormControls[
      'reference2Value'
    ]?.updateValueAndValidity();
    this.profileOptionsFormControls[
      'reference1Value'
    ]?.updateValueAndValidity();
  }

  get getCreateShipperNameDsbl() {
    if (
      this.profileOptionsFormControls['addShipperName'].value &&
      this.profileOptionsFormControls['addShipperName'].value.trim('')
    ) {
      return false;
    }
    return true;
  }

  shipperNameLoading() {
    this.lookupValuesService.getShipperNames(this.clientId).subscribe({
      next: (resp: any) => {
        this.shipperNamesList = resp.data;
      },
    });
  }

  addNewShipperName() {
    this.shipperNameLookupInfo.clientId = this.clientId;
    this.shipperNameLookupInfo.invOrgId = this.invOrgId;
    this.shipperNameLookupInfo.shipperName =
      this.profileOptionsFormControls['addShipperName'].value;
    this.profileOptionsService
      .saveShipperName(this.shipperNameLookupInfo)
      .subscribe({
        next: (resp: any) => {
          this.toastr.success(resp.message);
          this.profileOptionsFormControls['addShipperName']?.reset('');
          this.shipperNameLoading();
          this.removeAddShipperValidation();
        },
        error: (error: any) => {
          this.toastr.error(error.error.status);
        },
      });
  }

  setAddShipperNameValidation() {
    this.addValidationToControl('addShipperName', [Validators.required]);
  }

  removeAddShipperValidation() {
    this.profileOptionsFormControls['addShipperName'].clearValidators();
    this.profileOptionsFormControls['addShipperName'].updateValueAndValidity();
  }
}
