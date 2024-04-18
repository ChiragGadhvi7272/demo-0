import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import {
  faCalendarCheck,
  faCheckSquare,
  faPencilSquare,
  faCircleCheck,
  faTimesCircle,
  faCircleInfo,
  faUpRightFromSquare,
  faCalculator,
} from '@fortawesome/free-solid-svg-icons';
import { ShippingService } from 'src/app/features/services/shipping.service';
import { CarrierOrgAcctDetailsInfo } from 'src/app/features/models/carrier-org-acct-details-info.model';
import { AddressInfo } from 'src/app/shared/models/address-info.model';
import { AddOnServicesService } from 'src/app/features/services/add-on-services.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { AddressValidationResponse } from 'src/app/features/models/address-validation-response.model';
import { AddressValidationRequest } from 'src/app/features/models/address-validation-request.model';
import { AddressValidationComponent } from './address-validation/address-validation.component';
import { ClientOrgProfileOptionsInfo } from 'src/app/features/models/client-org-profile-options-info.model';
import { PaytermDetailsComponent } from './payterm-details/payterm-details.component';
import { ShipMethodChangeRequest } from 'src/app/features/models/ship-method-change-request.model';
import { DeliveryRetrievalResponse } from 'src/app/features/models/delivery-retrieval-response.model';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { SharedShippingUtilService } from 'src/app/features/services/shared-shipping-util.service';
import { CarrierAcctNumbersInfo } from 'src/app/features/models/carrier-acct-numbers-info.model';
import { ShipMethodMappingInfo } from 'src/app/features/models/ship-method-mapping-info.model';
import { ShipmentCarrierDetails } from 'src/app/features/models/shipment-carrier-details.model';
import { SharedComponent } from '../shared/shared.component';
import { BehaviorSubject } from 'rxjs';
import { SharedShippingSubjectsService } from 'src/app/features/services/shared-shipping-subjects.service';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.css'],
})
export class HeaderDetailsComponent implements OnInit, OnChanges {
  faCalendarCheck = faCalendarCheck;
  faCheckSquare = faCheckSquare;
  faPencilSquare = faPencilSquare;
  faCircleCheck = faCircleCheck;
  faTimesCircle = faTimesCircle;
  faCircleInfo = faCircleInfo;
  faUpRightFromSquare = faUpRightFromSquare;
  faCalculator = faCalculator;
  isDisabled!: boolean;
  @Input()
  shipmentHeadersInfo!: FormGroup;
  paytermDetails!: boolean;
  payModalName!: string;
  payMethod!: string;
  emailModalName!: string;
  addressDetails!: string;
  lookupValues: any;
  @Input() clientId!: number;
  @Input() orgId!: string;
  @Input() invOrgId!: string;
  shipperNamesList!: any;
  @Input() shipMethodMappingInfoList!: any[];
  @Input() shipFromLocationsInfoList!: any[];
  @Input() shipFlag!: boolean;
  @ViewChild(PaytermDetailsComponent)
  paytermDetailsComponent!: PaytermDetailsComponent;

  sharedcomponent!: SharedComponent;
  @Output() carrierDetails = new EventEmitter<any[]>();
  @Output() packageDimensionsEvent = new EventEmitter<void>();
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  paymethodsList!: any;
  packagingTypeList!: any;
  accountNumbersList!: any;
  carrierOrgAcctDetailsInfo: CarrierOrgAcctDetailsInfo =
    new CarrierOrgAcctDetailsInfo();
  proposedAddressList: AddressInfo[] = [];
  addressClassification: string = '';
  addressType: string = '';
  addressValidationRequest: AddressValidationRequest =
    new AddressValidationRequest();
  addressValidationResponse: AddressValidationResponse =
    new AddressValidationResponse();
  userData: any;
  avActiveFlag: boolean = false;
  shipMethodCss!: string;
  carrierPayCodeCss!: string;
  adressDetailsCss!: string;
  payMethodFlag: boolean = false;
  @ViewChild('addressValidationComponent') addressValidationComponent:
    | AddressValidationComponent
    | undefined;
  profileOptions!: any;
  clientProfileSelectionsInfoList!: any[];
  editFlag!: boolean;
  addressValidationFlag: boolean = false;
  shipMethodFlag: boolean = false;
  saturdayShipFalg: boolean = false;
  shipMethodChangeRequest: ShipMethodChangeRequest =
    new ShipMethodChangeRequest();
  deliveryRetrievalResponse: DeliveryRetrievalResponse =
    new DeliveryRetrievalResponse();
  clientOrgProfileOptionsInfo: ClientOrgProfileOptionsInfo =
    new ClientOrgProfileOptionsInfo();
  returnShipmethodsList: any;
  defaultAccountNumber!: String;
  shipmentCarrierDetails: ShipmentCarrierDetails = new ShipmentCarrierDetails();
  shipMethodMappingInfo: ShipMethodMappingInfo = new ShipMethodMappingInfo();
  carrierAcctNumbersInfo: CarrierAcctNumbersInfo = new CarrierAcctNumbersInfo();
  constructor(
    private shippingService: ShippingService,
    private addOnServicesService: AddOnServicesService,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef,
    private sharedUtilService: SharedUtilService,
    private sharedShippingUtilService: SharedShippingUtilService,
    private sharedShippingSubjectsService: SharedShippingSubjectsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateDestinationAddress();
    this.updateAccountDetailsInfo();
    if (this.shipmentHeadersInfo && changes['shipmentHeadersInfo']) {
      this.shipFlag = this.shipmentHeadersInfo.get('shipFlag')?.value;
      this.showPaytermDetails();
      const emailNotificationFlag = this.shipmentHeadersInfo.get(
        'emailNotificationInfo'
      )?.value['emailNotificationFlag'];
      if (!emailNotificationFlag) {
        this.shipmentHeadersInfo.get('emailNotificationInfo')?.disable();
      }
      this.showEmailNotification(emailNotificationFlag);
      this.updateDestinationAddress();
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.carrierPayCodeCss = 'width:100%';
    this.getInventoryLookups(this.clientId, this.orgId, this.invOrgId);
    this.paytermDetails = true;
    this.payModalName = '';
    this.showPaytermDetails();
    const emailNotificationFlag = this.shipmentHeadersInfo.get(
      'emailNotificationInfo'
    )?.value['emailNotificationFlag'];
    if (!emailNotificationFlag) {
      this.shipmentHeadersInfo.get('emailNotificationInfo')?.disable();
    }
    this.showEmailNotification(emailNotificationFlag);
    this.updateDestinationAddress();
    this.userData = this.localStorageService.getLocalUserData();
    this.profileOptions = localStorage.getItem('profile_options');
    this.clientOrgProfileOptionsInfo = JSON.parse(this.profileOptions);
    this.clientProfileSelectionsInfoList =
      this.clientOrgProfileOptionsInfo.clientProfileSelectionsInfoList;
    this.addressValidationFlag =
      this.clientOrgProfileOptionsInfo.addressValidationFlag;
    this.clientProfileSelectionsInfoList.forEach((Element) => {
      if (Element.profileCode == 'EDIT_SHIP_TO_ADDRESS' && Element.enabled) {
        this.editFlag = true;
      }
      if (Element.profileCode == 'CHANGE_PAY_METHOD_FLAG' && Element.enabled) {
        this.payMethodFlag = true;
      }
      if (Element.profileCode == 'CHANGE_SHIP_METHOD' && Element.enabled) {
        this.shipMethodFlag = true;
      }
      if (Element.profileCode == 'ENABLE_SATURDAY' && Element.enabled) {
        this.saturdayShipFalg = true;
      }
    });

    const avService = this.userData.clientSubscriptionInfoList.find(
      (service: any) => service.serviceName === 'AV'
    );

    if (avService) {
      this.avActiveFlag = avService.activeFlag;
    }
    this.proposedAddressList = [];
    this.addressType = '';
    this.addressClassification = '';
    if (this.carrierCode == 110) {
      this.shipMethodCss = 'width: 90%';
    } else {
      this.shipMethodCss = 'width: 100%';
    }
    this.sharedShippingSubjectsService
      .getCarrierCode()
      .subscribe((carrierCode) => {
        this.carrierCode = carrierCode;
      });
    this.sharedShippingSubjectsService.getCarrierId().subscribe((carrierId) => {
      this.carrierId = carrierId;
    });
    this.sharedShippingSubjectsService
      .getCarrierMode()
      .subscribe((carrierMode) => {
        this.carrierMode = carrierMode;
      });
    this.sharedShippingSubjectsService
      .getCarrierAcctNumbersInfo()
      .subscribe((accountInfo) => {
        this.carrierAcctNumbersInfo = accountInfo;
      });

    this.sharedShippingSubjectsService
      .getShipMethodMappingInfo()
      .subscribe((shipMethodMapping) => {
        this.shipMethodMappingInfo = shipMethodMapping;
      });
    this.sharedShippingSubjectsService
      .getShipmentCarrierDetails()
      .subscribe((carrierDetails) => {
        this.shipmentCarrierDetails = carrierDetails;
      });
  }

  getInventoryLookups(clientId: number, orgId: string, invOrgId: string) {
    this.shippingService
      .getInventoryLookups(clientId, orgId, invOrgId)
      .subscribe({
        next: (resp: any) => {
          this.shipFromLocationsInfoList = resp.data.shipFromLocationsInfoList;
          this.shipMethodMappingInfoList = resp.data.shipMethodMappingInfoList;
          this.sharedShippingUtilService.shipMethodMappingInfoList =
            resp.data.shipMethodMappingInfoList;
        },
      });
  }

  onshipMethodChange(shipMethod: any) {
    this.sharedUtilService.changeProperty('packageComponent');
    // new method implementation

    let headerValue = this.shipmentHeadersInfo.value;
    let packageArray = [];
    let linesArray = [];

    let packages: FormArray = this.shipmentHeadersInfo.get(
      'shipmentPackagesInfoList'
    ) as FormArray;

    let lines: FormArray = this.shipmentHeadersInfo.get(
      'shipmentLinesInfoList'
    ) as FormArray;

    packages.enable();
    lines.enable();

    for (let i = 0; i <= packages.length; i++) {
      if (packages.at(i))
        packageArray.push(this.getFormAsJson(packages.at(i).value));
    }

    for (let i = 0; i <= lines.length; i++) {
      if (lines.at(i)) linesArray.push(this.getFormAsJson(lines.at(i).value));
    }

    headerValue.shipmentPackagesInfoList = packageArray;
    headerValue.shipmentLinesInfoList = linesArray;

    this.deliveryRetrievalResponse.shipmentHeadersInfo = headerValue;
    this.shipMethodChangeRequest.clientOrgProfileOptionsInfo =
      this.clientOrgProfileOptionsInfo;
    this.shipMethodChangeRequest.userInfo = this.userData.userInfo;
    this.shipMethodChangeRequest.deliveryRetrievalResponse =
      this.deliveryRetrievalResponse;
    console.log(
      'this.deliveryRetrievalResponse : ',
      this.deliveryRetrievalResponse
    );
    this.shippingService
      .getShipMethodChangeDetails(this.shipMethodChangeRequest)
      .subscribe({
        next: (resp: any) => {
          if (
            resp.data.deliveryRetrievalResponse.shipmentCarrierDetails
              .defaultRtnShipMethod &&
            resp.data.deliveryRetrievalResponse.shipmentCarrierDetails
              .defaultRtnShipMethod !== null
          ) {
            resp.data.deliveryRetrievalResponse.shipmentHeadersInfo.shipmentPackagesInfoList[0].returnShipmentInfo.carrierInfo.shipMethodName =
              resp.data.deliveryRetrievalResponse.shipmentCarrierDetails.defaultRtnShipMethod;
          }
          this.carrierOrgAcctDetailsInfo = resp.data.carrierOrgAcctDetailsInfo;
          this.carrierCode = this.carrierOrgAcctDetailsInfo.carrierCode;
          this.carrierMode = this.carrierOrgAcctDetailsInfo.carrierMode;
          this.carrierId = this.carrierOrgAcctDetailsInfo.carrierId;
          this.paymethodsList =
            resp.data.carrierLookupValuesInfo.paymethodsList;
          this.sharedShippingUtilService.updatePaymethodsList(
            this.paymethodsList
          );
          this.packagingTypeList =
            resp.data.carrierLookupValuesInfo.packagingTypeList;
          this.accountNumbersList =
            resp.data.carrierLookupValuesInfo.accountNumbersList;
          this.returnShipmethodsList = this.shipMethodMappingInfoList.filter(
            (shipmethod) => shipmethod.carrierCode == this.carrierCode
          );
          this.sharedShippingUtilService.updateReturnShipmethodList(
            this.carrierId
          );
          this.shipmentCarrierDetails =
            resp.data.deliveryRetrievalResponse.shipmentCarrierDetails;
          this.shipMethodMappingInfo =
            resp.data.deliveryRetrievalResponse.shipMethodMappingInfo;
          this.shipmentHeadersInfo.patchValue(
            resp.data.deliveryRetrievalResponse.shipmentHeadersInfo
          );
          let emailNotificationFlag: boolean = this.shipmentHeadersInfo
            .get('emailNotificationInfo')
            ?.get('emailNotificationFlag')?.value;
          console.log('emailNotificationFlag' + emailNotificationFlag);
          if (!emailNotificationFlag) {
            this.shipmentHeadersInfo
              .get('emailNotificationInfo')
              ?.get('emailNotificationFlag')
              ?.disable();
          } else {
            this.shipmentHeadersInfo
              .get('emailNotificationInfo')
              ?.get('emailNotificationFlag')
              ?.enable();
          }
          this.updateAccountDetailsInfo();
          this.UpdateDefaultAccountNumber();
          this.packageDimensionsEvent.emit();
          //           added for subject
          this.sharedShippingSubjectsService.setCarrierId(this.carrierId);
          this.sharedShippingSubjectsService.setCarrierCode(this.carrierCode);
          this.sharedShippingSubjectsService.setCarrierMode(this.carrierMode);
          this.sharedShippingSubjectsService.setShipMethodMappingInfo(
            this.shipMethodMappingInfo
          );
          this.sharedShippingSubjectsService.setShipmentCarrierDetails(
            this.shipmentCarrierDetails
          );
          this.sharedShippingSubjectsService.setCarrierAcctNumbersInfo(
            this.carrierAcctNumbersInfo
          );
        },
      });
  }
  getHeaderLookupValues(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ) {
    this.carrierId = carrierId;
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;

    //   added for subject
    console.log('this.carrierId ', this.carrierId);
    this.sharedShippingSubjectsService.setCarrierId(this.carrierId);
    this.sharedShippingSubjectsService.setCarrierCode(this.carrierCode);
    this.sharedShippingSubjectsService.setCarrierMode(this.carrierMode);

    this.shippingService
      .getCarrierLookups(
        clientId,
        orgId,
        invOrgId,
        carrierId,
        carrierCode,
        carrierMode
      )
      .subscribe({
        next: (resp: any) => {
          this.paymethodsList = resp.data.paymethodsList;
          this.packagingTypeList = resp.data.packagingTypeList;
          this.accountNumbersList = resp.data.accountNumbersList;
          this.UpdateDefaultAccountNumber();
          this.updateAccountDetailsInfo();
          this.sharedShippingUtilService.updatePaymethodsList(
            this.paymethodsList
          );
        },
      });
  }
  onPaymethodChange(payMethod: any) {
    this.sharedShippingUtilService.paymethodSubject$.next(payMethod);

    console.log('payMethod :: ', payMethod);
    let headerValue = this.shipmentHeadersInfo.value;
    switch (payMethod) {
      case 'PREPAID':
        this.shipmentHeadersInfo
          .get('carrierAccountNo')
          ?.patchValue(this.defaultAccountNumber);
        this.shipmentHeadersInfo
          .get('carrierAccountNo')
          ?.setValidators(Validators.required);
        break;
      case 'RECIPIENT':
        this.shipmentHeadersInfo
          .get('carrierAccountNo')
          ?.setValidators(Validators.required);
        switch (this.carrierCode) {
          case 100:
            this.shipmentHeadersInfo
              .get('carrierAccountNo')
              ?.patchValue(headerValue.rpUpsAccNum);
            console.log('headerValue.rpUpsAccNum : ', headerValue.rpUpsAccNum);
            this.shipmentHeadersInfo
              .get('paytermInfo')
              ?.patchValue(headerValue.rpAddressInfo);
            this.sharedShippingUtilService.defaultRetuenRpAccountNumber =
              headerValue.rpUpsAccNum;
            break;
        }
        break;
      case 'THIRD PARTY BILLING':
        this.shipmentHeadersInfo
          .get('carrierAccountNo')
          ?.setValidators(Validators.required);
        switch (this.carrierCode) {
          case 100:
            this.shipmentHeadersInfo
              .get('carrierAccountNo')
              ?.patchValue(headerValue.tpUpsAccNum);
            console.log('headerValue.tpUpsAccNum : ', headerValue.tpUpsAccNum);
            this.shipmentHeadersInfo
              .get('paytermInfo')
              ?.patchValue(headerValue.tpAddressInfo);
            this.sharedShippingUtilService.defaultReturnTpAccountNumber =
              headerValue.tpUpsAccNum;
            break;
        }
        break;
      case 'CONSIGNEE':
        this.shipmentHeadersInfo
          .get('carrierAccountNo')
          ?.removeValidators([Validators.required]);
        switch (this.carrierCode) {
          case 100:
            this.shipmentHeadersInfo.get('carrierAccountNo')?.patchValue('');
            break;
        }
        break;
    }
    //sameer g added below code to default intl accountNumber
    this.sharedShippingUtilService._accountNumberSubject$.next(
      this.shipmentHeadersInfo.get('carrierAccountNo')?.value
    );
    this.sharedShippingUtilService.returnAccountNumber =
      this.shipmentHeadersInfo.get('carrierAccountNo')?.value;
    this.sharedShippingUtilService.returnPaycode =
      this.shipmentHeadersInfo.get('carrierPayCode')?.value;
    this.updateAccountDetailsInfo();
  }

  loadPaymethodDetails(payMethod: string) {
    this.paytermDetailsComponent.loadPaytermValues(
      this.shipmentHeadersInfo.get('paytermInfo') as FormGroup,
      payMethod,
      this.carrierCode,
      this.carrierMode
    );
  }

  get getPaytermInfo() {
    return this.shipmentHeadersInfo?.get('paytermInfo') as FormGroup;
  }
  get getEmailNotificationInfo() {
    return this.shipmentHeadersInfo?.get('emailNotificationInfo') as FormGroup;
  }

  get getShipToAddrInfo() {
    return this.shipmentHeadersInfo?.get('shipToAddrInfo') as FormGroup;
  }
  showPaytermDetails() {
    this.payMethod = this.shipmentHeadersInfo.controls['carrierPayCode'].value;
    if (
      this.payMethod === 'TP' ||
      this.payMethod === 'DA' ||
      this.payMethod === 'DU' ||
      this.payMethod === 'DV' ||
      this.payMethod === 'CG'
    ) {
      this.paytermDetails = false;
      this.payModalName = '#payTermInfo';
    } else {
      this.paytermDetails = true;
      this.payModalName = '';
    }
  }

  showEmailNotification(emailNotificationFlag: boolean) {
    if (emailNotificationFlag) {
      this.getEmailNotificationInfo;
    }
  }
  onAddressValidation() {
    this.proposedAddressList = [];
    this.addressType = '';
    this.addressClassification = '';
    if (!this.profileOptions) {
      return;
    }
    this.addressValidationRequest.clientId = this.clientId;
    this.addressValidationRequest.userId = this.userData.userInfo.userId;
    this.addressValidationRequest.deliveryId =
      this.shipmentHeadersInfo.value.deliveryId;
    this.addressValidationRequest.orgAVCarrierInfo =
      this.clientOrgProfileOptionsInfo.orgProfileOptionServicesInfoList[0];
    this.addressValidationRequest.shipToAddressInfo =
      this.shipmentHeadersInfo.value.shipToAddrInfo;
    this.addressValidationRequest.labelPath = this.userData.labelPath;
    this.addOnServicesService
      .validateAddress(this.addressValidationRequest)
      .subscribe({
        next: (resp: any) => {
          this.proposedAddressList = resp.data.proposedAddressesList;
          this.addressClassification = resp.data.addressClassification;
          this.addressType = resp.data.addressType;
        },
        error: (error: any) => {
          this.proposedAddressList = [];
          this.addressType = 'ERROR';
          this.addressClassification = error.error.status;
        },
      });
  }
  onUpdateShipToAddress(shipToAddress: AddressInfo) {
    const ignoredProperties: (keyof AddressInfo)[] = [
      'contactName',
      'customerName',
      'phoneNumber',
    ];
    const shipToAddrInfo = this.shipmentHeadersInfo.get(
      'shipToAddrInfo'
    ) as FormGroup;

    if (shipToAddrInfo) {
      const currentValuesOfIgnoredProperties: Partial<AddressInfo> = {};
      ignoredProperties.forEach((key) => {
        const control = shipToAddrInfo.get(key);
        if (control) {
          currentValuesOfIgnoredProperties[key] = control.value;
        }
      });
      const sanitizedShipToAddress: Partial<AddressInfo> = Object.entries(
        shipToAddress
      )
        .filter(
          ([key]) => !ignoredProperties.includes(key as keyof AddressInfo)
        )
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      const finalShipToAddress = {
        ...sanitizedShipToAddress,
        ...currentValuesOfIgnoredProperties,
      };

      shipToAddrInfo.patchValue(finalShipToAddress);

      this.shipmentHeadersInfo
        .get('shipToAddrInfo')
        ?.patchValue(shipToAddrInfo);
      this.updateDestinationAddress();
    }
  }

  changeShipFromAddress() {
    let selectedLocation = this.shipmentHeadersInfo
      .get('shipFromAddrInfo')
      ?.get('locationName')?.value;
    var selectedAddress: any;
    this.shipFromLocationsInfoList.forEach((shipfrom) => {
      if (selectedLocation == shipfrom.locationName) {
        selectedAddress = shipfrom;
      }
    });
    if (selectedAddress instanceof AddressInfo) {
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.patchValue(selectedAddress);
    } else {
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.patchValue(selectedAddress);
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.get('addressLine1')
        ?.patchValue(selectedAddress.address1);
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.get('addressLine2')
        ?.patchValue(selectedAddress.address2);
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.get('addressLine3')
        ?.patchValue(selectedAddress.address3);
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.get('state')
        ?.patchValue(selectedAddress.stateProvinceCode);
      this.shipmentHeadersInfo
        .get('shipFromAddrInfo')
        ?.get('customerName')
        ?.patchValue(selectedAddress.companyName);
    }
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  updateAccountDetailsInfo() {
    if (this.accountNumbersList) {
      this.accountNumbersList.forEach((accountNumberInfo: any) => {
        if (
          accountNumberInfo.accountNumber ==
          this.shipmentHeadersInfo.get('carrierAccountNo')?.value
        ) {
          this.carrierAcctNumbersInfo = accountNumberInfo;
        } else {
          this.carrierAcctNumbersInfo = new CarrierAcctNumbersInfo();
        }
      });
      this.sharedShippingSubjectsService.setCarrierAcctNumbersInfo(
        this.carrierAcctNumbersInfo
      );
      this.sharedShippingUtilService._accountNumberSubject$.next(
        this.shipmentHeadersInfo.get('carrierAccountNo')?.value
      );
    }
  }
  updateDestinationAddress() {
    const ignoredProperties = ['locationName', 'customerName'];
    this.addressDetails = '';
    for (const key in this.getShipToAddrInfo.value) {
      if (this.getShipToAddrInfo.value.hasOwnProperty(key)) {
        const value = this.getShipToAddrInfo.value[key];
        if (value && !ignoredProperties.includes(key)) {
          if (value.length - 1 != 0) {
            if (this.addressDetails) {
              this.addressDetails += ', ';
            }
            this.addressDetails += value;
          }
        }
      }
    }
  }
  UpdateDefaultAccountNumber() {
    this.accountNumbersList.forEach((accountNumberInfo: any) => {
      if (accountNumberInfo.accountDefault) {
        this.defaultAccountNumber = accountNumberInfo.accountNumber;
      }
    });
    this.sharedShippingUtilService.defaultReturnAccountNumber =
      this.defaultAccountNumber;
  }
  getFormAsJson(data: any): any {
    if (data) {
      Object.keys(data).forEach((controlName) => {
        const controlValue = data[controlName];
        if (controlValue !== null && controlValue !== undefined) {
          if (controlValue instanceof FormGroup) {
            data[controlName] = this.getFormAsJson(controlValue.value);
          } else {
            data[controlName] = controlValue;
          }
        }
      });
    }
    return data;
  }
}
