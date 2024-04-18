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
import { FormGroup } from '@angular/forms';
import {
  faCalculator,
  faCalendarCheck,
  faCheckSquare,
  faCircleCheck,
  faCircleInfo,
  faPencilSquare,
  faTimesCircle,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AddressValidationRequest } from 'src/app/features/models/address-validation-request.model';
import { AddressValidationResponse } from 'src/app/features/models/address-validation-response.model';
import { CarrierOrgAcctDetailsInfo } from 'src/app/features/models/carrier-org-acct-details-info.model';
import { ClientOrgProfileOptionsInfo } from 'src/app/features/models/client-org-profile-options-info.model';
import { DeliveryRetrievalResponse } from 'src/app/features/models/delivery-retrieval-response.model';
import { ShipMethodChangeRequest } from 'src/app/features/models/ship-method-change-request.model';
import { AddOnServicesService } from 'src/app/features/services/add-on-services.service';
import { CarrierConfigurationsService } from 'src/app/features/services/carrier-configurations.service';
import { ShippingService } from 'src/app/features/services/shipping.service';
import { AddressInfo } from 'src/app/shared/models/address-info.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { AddressValidationComponent } from '../../../shipping/header-details/address-validation/address-validation.component';
import { PaytermDetailsComponent } from '../../../shipping/header-details/payterm-details/payterm-details.component';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-adhoc-carrier-details',
  templateUrl: './adhoc-carrier-details.component.html',
  styleUrls: ['./adhoc-carrier-details.component.css'],
})
export class AdhocCarrierDetailsComponent implements OnInit, OnChanges {
  faCalendarCheck = faCalendarCheck;
  faCheckSquare = faCheckSquare;
  faPencilSquare = faPencilSquare;
  faCircleCheck = faCircleCheck;
  faTimesCircle = faTimesCircle;
  faCircleInfo = faCircleInfo;
  faUpRightFromSquare = faUpRightFromSquare;
  faCalculator = faCalculator;
  isDisabled!: boolean;
  @Input() shipmentHeadersInfo!: FormGroup;
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
  shipMethodMappingInfoList!: any[];
  @Input() shipFromLocationsInfoList!: any[];
  @Input() shipFlag!: boolean;
  @Input() AdhocPaymethodsList: any;
  @Input() AdhocAccountNumbersList: any;
  @ViewChild(PaytermDetailsComponent)
  paytermDetailsComponent!: PaytermDetailsComponent;
  @Output() carrierDetails = new EventEmitter<any[]>();
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  paymethodsList!: any;
  packagingTypeList!: any;
  accountNumbersList!: any;
  carrierOrgAcctDetailsInfo: CarrierOrgAcctDetailsInfo =
    new CarrierOrgAcctDetailsInfo();
  countryCodesList!: any;
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
  constructor(
    private shippingService: ShippingService,
    private addOnServicesService: AddOnServicesService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private sharedUtilService: SharedUtilService,
    private loadLookupsService: LoadLookupsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCarrierDetails();
    if (this.shipmentHeadersInfo && changes['shipmentHeadersInfo']) {
      this.shipFlag = this.shipmentHeadersInfo.get('shipFlag')?.value;
      this.showEmailNotification(
        this.shipmentHeadersInfo.get('emailNotificationInfo')?.value[
          'emailNotificationFlag'
        ].value
      );
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    // console.log(this.shipmentHeadersInfo);
    // console.log(this.shipmentHeadersInfo.get('shipMethod')?.value)
    // this.shipmentHeadersInfo.get('shipMethod')?.setValue('Test')
    this.carrierPayCodeCss = 'width:100%';
    this.shipMethodCss = 'width: 100%';
    this.getInventoryLookups(this.clientId, this.orgId, this.invOrgId);
    this.paytermDetails = true;
    this.payModalName = '';
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.shipmentHeadersInfo.valueChanges.subscribe(() => {
      this.showPaytermDetails();
      const emailNotificationFlag = this.shipmentHeadersInfo.get(
        'emailNotificationInfo'
      )?.value['emailNotificationFlag'];
      this.showEmailNotification(emailNotificationFlag);
    });
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

    // const avService = this.convertedUserDat  a.clientSubscriptionInfoList.find(
    //   (service: any) => service.serviceName === 'AV'
    // );

    // if (avService) {
    //   this.avActiveFlag = avService.activeFlag;
    // }
    this.proposedAddressList = [];
    this.addressType = '';
    this.addressClassification = '';
    if (this.carrierCode == 110) {
      this.shipMethodCss = 'width: 90%';
    } else {
      this.shipMethodCss = 'width: 100%';
    }
  }

  getInventoryLookups(clientId: number, orgId: string, invOrgId: string) {
    this.shippingService
      .getInventoryLookups(clientId, orgId, invOrgId)
      .subscribe({
        next: (resp: any) => {
          this.shipFromLocationsInfoList = resp.data.shipFromLocationsInfoList;
          this.shipMethodMappingInfoList = resp.data.shipMethodMappingInfoList;
          this.updateCarrierDetails();
        },
      });
  }

  onshipMethodChange(shipMethod: any) {
    this.sharedUtilService.changeProperty('packageComponent');
    // new method implementation
    this.deliveryRetrievalResponse.shipmentHeadersInfo =
      this.shipmentHeadersInfo.value;
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
      .getShipMethodChangeDetails(
        this.shipMethodChangeRequest
        // this.clientId,
        // this.orgId,
        // this.invOrgId
      )
      .subscribe({
        next: (resp: any) => {
          this.carrierOrgAcctDetailsInfo = resp.data.carrierOrgAcctDetailsInfo;
          this.carrierCode = this.carrierOrgAcctDetailsInfo.carrierCode;
          this.carrierMode = this.carrierOrgAcctDetailsInfo.carrierMode;
          this.carrierId = this.carrierOrgAcctDetailsInfo.carrierId;
          this.paymethodsList =
            resp.data.carrierLookupValuesInfo.paymethodsList;
          this.packagingTypeList =
            resp.data.carrierLookupValuesInfo.packagingTypeList;
          this.accountNumbersList =
            resp.data.carrierLookupValuesInfo.accountNumbersList;
          this.updateCarrierDetails();
          this.shipmentHeadersInfo.patchValue(
            resp.data.deliveryRetrievalResponse.shipmentHeadersInfo
          );
        },
      });
  }

  onPaymethodChange(payMethod: any) {
    console.log('payMethod :: ', payMethod);
    let headerValue = this.shipmentHeadersInfo.value;
    switch (payMethod) {
      case 'PREPAID':
        this.accountNumbersList.forEach((accountNumberInfo: any) => {
          if (accountNumberInfo.accountDefault) {
            this.shipmentHeadersInfo
              .get('carrierAccountNo')
              ?.patchValue(accountNumberInfo.accountNumber);
          }
        });
        break;
      case 'RECIPIENT':
        switch (this.carrierCode) {
          case 100:
            this.shipmentHeadersInfo
              .get('carrierAccountNo')
              ?.patchValue(headerValue.rpUpsAccNum);
            console.log('headerValue.rpUpsAccNum : ', headerValue.rpUpsAccNum);
            this.shipmentHeadersInfo
              .get('paytermInfo')
              ?.patchValue(headerValue.rpAddressInfo);
            break;
        }
        break;
      case 'THIRD PARTY BILLING':
        switch (this.carrierCode) {
          case 100:
            this.shipmentHeadersInfo
              .get('carrierAccountNo')
              ?.patchValue(headerValue.tpUpsAccNum);
            console.log('headerValue.tpUpsAccNum : ', headerValue.tpUpsAccNum);
            this.shipmentHeadersInfo
              .get('paytermInfo')
              ?.patchValue(headerValue.tpAddressInfo);
            break;
        }
        break;
      case 'CONSIGNEE':
        switch (this.carrierCode) {
          case 100:
            this.shipmentHeadersInfo.get('carrierAccountNo')?.patchValue('');
            break;
        }
        break;
    }
    this.updateCarrierDetails();
  }

  loadPaymethodDetails(payMethod: string) {
    this.paytermDetailsComponent.loadPaytermValues(
      this.shipmentHeadersInfo.get('paytermInfo') as FormGroup,
      payMethod,
      this.carrierCode,
      this.carrierMode
    );
  }

  get getEmailNotificationInfo() {
    return this.shipmentHeadersInfo?.get('emailNotificationInfo') as FormGroup;
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
    this.addressValidationRequest.orgAVCarrierInfo.clientId = this.clientId;
    this.addressValidationRequest.orgAVCarrierInfo.orgId = this.orgId;
    this.addressValidationRequest.orgAVCarrierInfo.invOrgId = this.invOrgId;
    this.addressValidationRequest.orgAVCarrierInfo =
      this.clientOrgProfileOptionsInfo.orgProfileOptionServicesInfoList[0];
    this.addressValidationRequest.shipToAddressInfo.locationName =
      this.shipmentHeadersInfo.value.shipToAddrInfo.locationName;
    this.addressValidationRequest.shipToAddressInfo.addressLine1 =
      this.shipmentHeadersInfo.value.shipToAddrInfo.addressLine1;
    this.addressValidationRequest.shipToAddressInfo.addressLine2 =
      this.shipmentHeadersInfo.value.shipToAddrInfo.addressLine2;
    this.addressValidationRequest.shipToAddressInfo.addressLine3 =
      this.shipmentHeadersInfo.value.shipToAddrInfo.addressLine3;
    this.addressValidationRequest.shipToAddressInfo.city =
      this.shipmentHeadersInfo.value.shipToAddrInfo.city;
    this.addressValidationRequest.shipToAddressInfo.state =
      this.shipmentHeadersInfo.value.shipToAddrInfo.state;
    this.addressValidationRequest.shipToAddressInfo.postalCode =
      this.shipmentHeadersInfo.value.shipToAddrInfo.postalCode;
    this.addressValidationRequest.shipToAddressInfo.countryCode =
      this.shipmentHeadersInfo.value.shipToAddrInfo.countryCode;
    this.addressValidationRequest.shipToAddressInfo.contactName =
      this.shipmentHeadersInfo.value.shipToAddrInfo.contactName;
    this.addressValidationRequest.shipToAddressInfo.customerName =
      this.shipmentHeadersInfo.value.shipToAddrInfo.customerName;

    this.addOnServicesService
      .validateAddress(this.addressValidationRequest)
      .subscribe({
        next: (resp: any) => {
          this.proposedAddressList = resp.data.proposedAddressesList;
          this.addressClassification = resp.data.addressClassification;
          this.addressType = resp.data.addressType;
          if (resp.data.status != 200) {
            this.toastr.error(resp.data.message);
          }
        },
        error: (error: any) => {
          this.proposedAddressList = [];
          this.addressType = 'ERROR';
          this.addressClassification =
            'Please contact shipconsole administrator';
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
  updateCarrierDetails() {
    let carrierDetailsArray = [
      this.carrierId,
      this.carrierCode,
      this.carrierMode,
    ];
    this.carrierDetails.emit(carrierDetailsArray);
  }
}
