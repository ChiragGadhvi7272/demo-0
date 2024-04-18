import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SharedShippingUtilService } from 'src/app/features/services/shared-shipping-util.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';

@Component({
  selector: 'app-return-shipment',
  templateUrl: './return-shipment.component.html',
  styleUrls: ['./return-shipment.component.css'],
})
export class ReturnShipmentComponent implements OnInit, OnChanges {
  @Input() returnShipmentInfo!: FormGroup;
  @Input() returnShipFromAddrInfo!: FormGroup;
  @Input() returnShipToAddrInfo!: FormGroup;
  @Input() returnCarrierInfo!: FormGroup;
  @Input() returnPaytermInfo!: FormGroup;
  shipFromAddrInfo!: FormGroup;
  isEmitting: any;
  countryCodesList: any;
  clientId!: any;
  orgId!: any;
  invOrgId!: any;
  carrierCode!: any;
  carrierMode!: any;
  carrierId!: any;
  @Input() labelDeliveryMethodList!: any;
  returnShipmentFlag!: boolean;
  shipMethodMappingInfoList!: any;
  CarrierPayMethodList!: any;
  erpType!: any;
  constructor(
    private sharedShippingUtilService: SharedShippingUtilService,
    private loadLookupsService: LoadLookupsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.shipMethodMappingInfoList =
      this.sharedShippingUtilService.getReturnShipMethodList();
    this.CarrierPayMethodList =
      this.sharedShippingUtilService.getPayMethodList();
  }

  ngOnInit(): void {
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.returnShipmentFlag =
      this.returnShipmentInfo.controls['returnFlag'].value;
    this.updatePaymentDetails();
  }

  updatePaymentDetails() {
    if (
      this.returnShipmentInfo &&
      (!this.returnShipmentInfo.get('carrierInfo')?.get('carrierPayCode')
        ?.value ||
        '' ==
          this.returnShipmentInfo.get('carrierInfo')?.get('carrierPayCode')
            ?.value)
    ) {
      this.returnShipmentInfo
        .get('carrierInfo')
        ?.get('carrierPayCode')
        ?.patchValue(this.sharedShippingUtilService.returnPaycode);
    }
    if (
      this.returnShipmentInfo &&
      (!this.returnShipmentInfo.get('carrierInfo')?.get('accountNumber')
        ?.value ||
        '' ==
          this.returnShipmentInfo.get('carrierInfo')?.get('accountNumber')
            ?.value)
    ) {
      this.returnShipmentInfo
        .get('carrierInfo')
        ?.get('accountNumber')
        ?.patchValue(this.sharedShippingUtilService.returnAccountNumber);
    }
  }
  onPaymethodChange(payMethod: any) {
    switch (payMethod) {
      case 'PREPAID':
        this.returnShipmentInfo
          .get('carrierInfo')
          ?.get('accountNumber')
          ?.patchValue(
            this.sharedShippingUtilService.defaultReturnAccountNumber
          );
        break;
      case 'RECIPIENT':
        this.returnShipmentInfo
          .get('carrierInfo')
          ?.get('accountNumber')
          ?.patchValue(
            this.sharedShippingUtilService.defaultRetuenRpAccountNumber
          );
        break;
      case 'THIRD PARTY BILLING':
        this.returnShipmentInfo
          .get('carrierInfo')
          ?.get('accountNumber')
          ?.patchValue(
            this.sharedShippingUtilService.defaultReturnTpAccountNumber
          );
        break;
      case 'CONSIGNEE':
        this.returnShipmentInfo
          .get('carrierInfo')
          ?.get('accountNumber')
          ?.patchValue('');
        break;
    }
  }

  get returnShipmentInfoControls() {
    return this.returnShipmentInfo.controls;
  }

  get shipFromAddrInfoControls() {
    return (this.returnShipmentInfo?.get('shipFromAddrInfo') as FormGroup)
      ?.controls;
  }
  get shipToAddrInfoControls() {
    return (this.returnShipmentInfo?.get('shipToAddrInfo') as FormGroup)
      ?.controls;
  }
  get carrierInfoControls() {
    return (this.returnShipmentInfo?.get('carrierInfo') as FormGroup)?.controls;
  }
  get paytermInfoControls() {
    return (this.returnShipmentInfo?.get('paytermInfo') as FormGroup)?.controls;
  }

  onReturnCheck(event: any) {
    if (event.target.checked) {
      this.addValidations();
    } else {
      this.removeValidations();
    }
  }
  addValidations() {
    this.setValidatiosToField(
      'description',
      [Validators.required, Validators.maxLength(35)],
      ''
    );

    this.setValidatiosToField(
      'customerName',
      [Validators.required, Validators.maxLength(35)],
      'shipFromAddrInfo'
    );
    this.setValidatiosToField(
      'contactName',
      [Validators.required, Validators.maxLength(35)],
      'shipFromAddrInfo'
    );
    this.setValidatiosToField(
      'addressLine1',
      [Validators.required, Validators.maxLength(35)],
      'shipFromAddrInfo'
    );
    this.setValidatiosToField(
      'city',
      [Validators.required, Validators.maxLength(35)],
      'shipFromAddrInfo'
    );
    this.setValidatiosToField(
      'countryCode',
      Validators.required,
      'shipFromAddrInfo'
    );
    this.setValidatiosToField('state', Validators.required, 'shipFromAddrInfo');
    this.setValidatiosToField(
      'phoneNumber',
      Validators.required,
      'shipFromAddrInfo'
    );
    this.setValidatiosToField(
      'postalCode',
      Validators.required,
      'shipFromAddrInfo'
    );

    this.setValidatiosToField(
      'customerName',
      [Validators.required, Validators.maxLength(35)],
      'shipToAddrInfo'
    );
    this.setValidatiosToField(
      'contactName',
      [Validators.required, Validators.maxLength(35)],
      'shipToAddrInfo'
    );
    this.setValidatiosToField(
      'addressLine1',
      [Validators.required, Validators.maxLength(35)],
      'shipToAddrInfo'
    );
    this.setValidatiosToField(
      'city',
      [Validators.required, Validators.maxLength(35)],
      'shipToAddrInfo'
    );
    this.setValidatiosToField(
      'countryCode',
      Validators.required,
      'shipToAddrInfo'
    );
    this.setValidatiosToField('state', Validators.required, 'shipToAddrInfo');
    this.setValidatiosToField(
      'phoneNumber',
      Validators.required,
      'shipToAddrInfo'
    );
    this.setValidatiosToField(
      'postalCode',
      Validators.required,
      'shipToAddrInfo'
    );

    this.setValidatiosToField(
      'shipMethodName',
      Validators.required,
      'carrierInfo'
    );
    this.setValidatiosToField(
      'accountNumber',
      Validators.required,
      'carrierInfo'
    );
    this.setValidatiosToField(
      'carrierPayCode',
      Validators.required,
      'carrierInfo'
    );
  }

  setValidatiosToField(controlName: any, validators: any, innerFormGroup: any) {
    if (innerFormGroup != '') {
      this.returnShipmentInfo
        .get(innerFormGroup)
        ?.get(controlName)
        ?.addValidators(validators);
      this.returnShipmentInfo
        .get(innerFormGroup)
        ?.get(controlName)
        ?.updateValueAndValidity();
    } else {
      this.returnShipmentInfo.get(controlName)?.addValidators(validators);
      this.returnShipmentInfo.get(controlName)?.updateValueAndValidity();
    }
  }

  removeValidations() {
    this.clearValidators('description', '');

    this.clearValidators('customerName', 'shipFromAddrInfo');
    this.clearValidators('contactName', 'shipFromAddrInfo');
    this.clearValidators('addressLine1', 'shipFromAddrInfo');
    this.clearValidators('city', 'shipFromAddrInfo');
    this.clearValidators('countryCode', 'shipFromAddrInfo');
    this.clearValidators('state', 'shipFromAddrInfo');
    this.clearValidators('phoneNumber', 'shipFromAddrInfo');
    this.clearValidators('postalCode', 'shipFromAddrInfo');

    this.clearValidators('customerName', 'shipToAddrInfo');
    this.clearValidators('contactName', 'shipToAddrInfo');
    this.clearValidators('addressLine1', 'shipToAddrInfo');
    this.clearValidators('city', 'shipToAddrInfo');
    this.clearValidators('countryCode', 'shipToAddrInfo');
    this.clearValidators('state', 'shipToAddrInfo');
    this.clearValidators('phoneNumber', 'shipToAddrInfo');
    this.clearValidators('postalCode', 'shipToAddrInfo');

    this.clearValidators('shipMethodName', 'carrierInfo');
    this.clearValidators('accountNumber', 'carrierInfo');
    this.clearValidators('carrierPayCode', 'carrierInfo');
  }
  clearValidators(controlName: any, innerFormGroup: any) {
    if ('' != innerFormGroup) {
      this.returnShipmentInfo
        .get(innerFormGroup)
        ?.get(controlName)
        ?.clearValidators();
      this.returnShipmentInfo
        .get(innerFormGroup)
        ?.get(controlName)
        ?.updateValueAndValidity();
    } else {
      this.returnShipmentInfo.get(controlName)?.clearValidators();
      this.returnShipmentInfo.get(controlName)?.updateValueAndValidity();
    }
  }
  trackByFn(option: any): number {
    return option.id;
  }
}
