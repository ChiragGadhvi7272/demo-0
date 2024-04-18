import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SharedShippingSubjectsService } from 'src/app/features/services/shared-shipping-subjects.service';
import { ShippingService } from 'src/app/features/services/shipping.service';

@Component({
  selector: 'app-international-details',
  templateUrl: './international-details.component.html',
  styleUrls: ['./international-details.component.css'],
})
export class InternationalDetailsComponent implements OnInit, OnChanges {
  @Input() shipFlag!: boolean;
  @Input() shipmentHeadersInfo!: FormGroup;
  @Input() shipmentLinesInfoList!: FormArray;
  carrierCode!: number;
  carrierMode!: string;
  carrierId!: number;
  @Input() orgId!: string;
  @Input() invOrgId!: string;
  @Input() clientId!: number;
  @Input() erpType!: string;
  @Input() ciFlag!: boolean;
  @Input() uscoFlag!: boolean;
  @Input() activeComponent!: any;
  reasonForExportList!: any;
  termsOfSaleList!: any;
  uomList!: any;
  weightUomList!: any;
  paymethodsList!: any;
  intlDocSubTypeList!: any;
  cn22TypeList!: any;
  cn22Flag!: any;
  usppiIdList!:any;
  mailInnovationFlag: boolean = false;
  ciFlagSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  uscoFlagSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  @Input() shipMethodMappingInfo: any;
  constructor(
    private shippingService: ShippingService,
    private sharedShippingSubjectsService: SharedShippingSubjectsService
  ) {}

  ngOnInit(): void {
    if (this.shipmentHeadersInfo) {
      this.cn22Flag = this.shipmentHeadersInfo.get('cn22Flag')?.value;
      this.ciFlag = this.shipmentHeadersInfo.get('ciFlag')?.value;
      this.uscoFlag = this.shipmentHeadersInfo.get('uscoFlag')?.value;
      this.setValidationsToEinTaxId();
      this.setValidationsToCn22(this.cn22Flag);
      this.setValidationsToUsco(this.uscoFlag);
      this.setValidationsToCI(this.ciFlag);
      this.setValidationsToCommodity();
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
    this.getIntlLookups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes in the intl-details', changes);
  }

  getIntlSoldToInfo(): FormGroup {
    return this.shipmentHeadersInfo.get('intlSoldToInfo') as FormGroup;
  }

  getIntlDutiesTaxesInfo(): FormGroup {
    return this.shipmentHeadersInfo.get('intlDutiesTaxesInfo') as FormGroup;
  }

  getIntlCiInfo(): FormGroup {
    return this.shipmentHeadersInfo.get('intlCiInfo') as FormGroup;
  }

  getIntlUscoInfo(): FormGroup {
    return this.shipmentHeadersInfo.get('intlUscoInfo') as FormGroup;
  }
  getIntlCN22Info(): FormGroup {
    return this.shipmentHeadersInfo.get('intlCN22Info') as FormGroup;
  }
  getCommodityList() {
    return this.shipmentHeadersInfo.get('shipmentLinesInfoList') as FormArray;
  }

  getIntlLookups() {
    if (
      this.shipMethodMappingInfo &&
      Object.keys(this.shipMethodMappingInfo).length !== 0
    ) {
      let serviceLevel = this.shipMethodMappingInfo.carrierServiceLevel;
      if (
        this.shipMethodMappingInfo.carrierCode &&
        100 == this.shipMethodMappingInfo.carrierCode
      ) {
        this.mailInnovationFlag = isNaN(Number(serviceLevel));
      }
    }

    this.shippingService
      .getIntlLookups(
        this.clientId,
        this.orgId,
        this.invOrgId,
        this.carrierId,
        this.carrierCode,
        this.carrierMode
      )
      .subscribe({
        next: (resp: any) => {
          this.reasonForExportList = resp.data.reasonForExportList;
          this.termsOfSaleList = resp.data.termsOfSaleList;
          this.weightUomList = resp.data.weightUomList;
          this.uomList = resp.data.uomList;
          this.paymethodsList = resp.data.paymethodsList;
          this.intlDocSubTypeList = resp.data.intlDocSubTypeList;
          this.cn22TypeList = resp.data.intlCN22TypeList;
          this.usppiIdList=resp.data.usppiIdList;
          this.cn22Flag = this.shipmentHeadersInfo.get('cn22Flag')?.value;
        },
        error: (error: any) => {},
      });
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  setValidationsToCn22(addValidator: boolean) {
    if (addValidator) {
      this.shipmentHeadersInfo
        .get('intlCN22Info')
        ?.get('cn22Type')
        ?.addValidators(Validators.required);
      this.shipmentHeadersInfo
        .get('intlCN22Info')
        ?.get('cn22OtherDescription')
        ?.addValidators(Validators.required);
    } else {
      this.shipmentHeadersInfo
        .get('intlCN22Info')
        ?.get('cn22Type')
        ?.clearValidators();
      this.shipmentHeadersInfo
        .get('intlCN22Info')
        ?.get('cn22OtherDescription')
        ?.clearValidators();
    }
    this.shipmentHeadersInfo
      .get('intlCN22Info')
      ?.get('cn22Type')
      ?.updateValueAndValidity();
    this.shipmentHeadersInfo
      .get('intlCN22Info')
      ?.get('cn22OtherDescription')
      ?.updateValueAndValidity();
  }
  setValidationsToCI(ciFlag: boolean) {
    this.ciFlagSubject.next(ciFlag);
    if (ciFlag) {
      this.getIntlCiInfo()
        .get('invoiceNumber')
        ?.addValidators(Validators.required);

      this.getIntlCiInfo()
        ?.get('invoiceDate')
        ?.addValidators(Validators.required);
    } else {
      this.getIntlCiInfo().get('invoiceNumber')?.clearValidators();

      this.getIntlCiInfo()?.get('invoiceDate')?.clearValidators();
    }
    this.getIntlCiInfo().get('invoiceNumber')?.updateValueAndValidity();

    this.getIntlCiInfo()?.get('invoiceDate')?.updateValueAndValidity();
  }

  setValidationsToUsco(uscoFlag: boolean) {
    this.uscoFlagSubject.next(uscoFlag);
    if (uscoFlag) {
      this.getIntlUscoInfo()
        .get('exportCarrier')
        ?.addValidators(Validators.required);

      this.getIntlUscoInfo()
        ?.get('exportDate')
        ?.addValidators(Validators.required);
    } else {
      this.getIntlUscoInfo()?.get('exportDate')?.clearValidators();
      this.getIntlUscoInfo()?.get('exportCarrier')?.clearValidators();
    }

    this.getIntlUscoInfo()?.get('exportDate')?.updateValueAndValidity();
    this.getIntlUscoInfo()?.get('exportCarrier')?.updateValueAndValidity();
  }

  setValidationsToEinTaxId() {
    this.getIntlDutiesTaxesInfo()
      ?.get('payorType')
      ?.addValidators(Validators.required);

    var payorType = this.getIntlDutiesTaxesInfo()?.get('payorType')?.value;

    if (payorType != 'CONSIGNEE') {
      this.getIntlDutiesTaxesInfo()
        ?.get('accountNumber')
        ?.addValidators(Validators.required);
    } else {
      this.getIntlDutiesTaxesInfo()?.get('accountNumber')?.clearValidators();
    }

    if (payorType === 'THIRD PARTY BILLING') {
      this.getIntlDutiesTaxesInfo()
        ?.get('postalCode')
        ?.addValidators(Validators.required);
      this.getIntlDutiesTaxesInfo()
        ?.get('countryCode')
        ?.addValidators(Validators.required);
    } else {
      this.getIntlDutiesTaxesInfo()?.get('postalCode')?.clearValidators();
      this.getIntlDutiesTaxesInfo()?.get('countryCode')?.clearValidators();
    }

    this.getIntlDutiesTaxesInfo()?.get('payorType')?.updateValueAndValidity();
    this.getIntlDutiesTaxesInfo()
      ?.get('accountNumber')
      ?.updateValueAndValidity();
    this.getIntlDutiesTaxesInfo()?.get('postalCode')?.updateValueAndValidity();
    this.getIntlDutiesTaxesInfo()?.get('countryCode')?.updateValueAndValidity();
  }

  setValidationsToSoldToDetails(ciFlag: boolean) {
    this.ciFlagSubject.next(ciFlag);
    if (ciFlag) {
      this.getIntlSoldToInfo()
        .get('locationName')
        ?.addValidators(Validators.required);

      this.getIntlSoldToInfo()
        .get('addressLine1')
        ?.addValidators(Validators.required);

      this.getIntlSoldToInfo().get('city')?.addValidators(Validators.required);

      this.getIntlSoldToInfo()
        .get('countryCode')
        ?.addValidators(Validators.required);

      this.getIntlSoldToInfo()
        .get('contactName')
        ?.addValidators(Validators.required);

      this.getIntlSoldToInfo()
        .get('phoneNumber')
        ?.addValidators(Validators.required);
    } else {
      this.getIntlSoldToInfo().get('locationName')?.clearValidators();

      this.getIntlSoldToInfo().get('addressLine1')?.clearValidators();

      this.getIntlSoldToInfo().get('city')?.clearValidators();

      this.getIntlSoldToInfo().get('countryCode')?.clearValidators();

      this.getIntlSoldToInfo().get('contactName')?.clearValidators();

      this.getIntlSoldToInfo().get('phoneNumber')?.clearValidators();
    }
    this.getIntlSoldToInfo().get('locationName')?.updateValueAndValidity();

    this.getIntlSoldToInfo().get('addressLine1')?.updateValueAndValidity();

    this.getIntlSoldToInfo().get('city')?.updateValueAndValidity();

    this.getIntlSoldToInfo().get('countryCode')?.updateValueAndValidity();

    this.getIntlSoldToInfo().get('contactName')?.updateValueAndValidity();

    this.getIntlSoldToInfo().get('phoneNumber')?.updateValueAndValidity();
  }

  setValidationsToCommodity() {
    this.getCommodityList().controls.forEach((commodity) => {
      var commInfo = commodity as FormGroup;
      commInfo.get('shippedQuantity')?.setValidators(Validators.required);
      commInfo.get('quantityUom')?.setValidators(Validators.required);
      commInfo.get('quantityUom')?.setValidators(Validators.required);
      commInfo.get('itemWeight')?.setValidators(Validators.required);
      commInfo.get('weightUom')?.setValidators(Validators.required);
      commInfo.get('itemDescription')?.setValidators(Validators.required);

      commInfo.get('shippedQuantity')?.updateValueAndValidity();
      commInfo.get('quantityUom')?.updateValueAndValidity();
      commInfo.get('quantityUom')?.updateValueAndValidity();
      commInfo.get('itemWeight')?.updateValueAndValidity();
      commInfo.get('weightUom')?.updateValueAndValidity();
      commInfo.get('itemDescription')?.updateValueAndValidity();
    });
  }
}
