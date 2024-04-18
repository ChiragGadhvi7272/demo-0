import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ShippingService } from 'src/app/features/services/shipping.service';
import { ReturnShipmentComponent } from './return-shipment/return-shipment.component';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { ToastrService } from 'ngx-toastr';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-package-options',
  templateUrl: './package-options.component.html',
  styleUrls: ['./package-options.component.css'],
})
export class PackageOptionsComponent implements OnInit {
  modalClose!: string;
  faCircleCheck = faCircleCheck;
  currencyCodesList!: any;
  packagingList!: any;
  codFundsCodeList!: any;
  dcisTypeList!: any;
  returnLabelTypeList!: any;
  outerPackagingTypeList!: any;
  carrierCode!: number;
  carrierMode!: string;
  carrierId: any;
  shipmentPackage!: FormGroup;
  index: number = 0;
  hazmatLookUpValues: any[] = [];
  enableSaveButtonFlag!: boolean;
  @Input() shipFlag!: boolean;
  @Input() shipmentPackagesInfoList!: FormArray;
  @ViewChild(ReturnShipmentComponent)
  returnShipmentComponent!: ReturnShipmentComponent;
  isMailInnovation: boolean = false;

  constructor(
    private shippingService: ShippingService,
    private loadLookupsService: LoadLookupsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadLookupsService
      .getCurrencyCodes()
      .subscribe((currencyCodesList) => {
        this.currencyCodesList = currencyCodesList;
      });
  }

  dryIceValidation(event: any) {
    if (event.target.checked) {
      this.packageOptionsControls['dryIceFlag'].setValidators(
        Validators.required
      );
      this.packageOptionsControls['dryIceWeight'].setValidators(
        Validators.required
      );
    } else {
      this.packageOptionsControls['dryIceFlag'].removeValidators(
        Validators.required
      );
      this.packageOptionsControls['dryIceWeight'].removeValidators(
        Validators.required
      );
      this.packageOptionsControls['dryIceFlag'].reset();
      this.packageOptionsControls['dryIceWeight'].reset();
    }
    this.packageOptionsControls['dryIceFlag'].updateValueAndValidity();
    this.packageOptionsControls['dryIceWeight'].updateValueAndValidity();
  }

  loadPackageOptions(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string,
    packagedetails: FormGroup,
    index: number,
    mailInnovationFlag: boolean
  ) {
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;
    this.carrierId = carrierId;
    this.shipmentPackage = packagedetails;
    this.index = index;
    this.isMailInnovation = mailInnovationFlag;
    // update paymethod and account Number
    if (this.returnShipmentComponent) {
      this.returnShipmentComponent.updatePaymentDetails();
    }
    if (
      (this.shipmentPackage as FormGroup).get('trackingNumber')?.value ===
        null ||
      (this.shipmentPackage as FormGroup).get('trackingNumber')?.value === ''
    ) {
      this.enableSaveButtonFlag = true;
    } else {
      this.enableSaveButtonFlag = false;
    }
    this.getPackageOptionsLookups(
      clientId,
      orgId,
      invOrgId,
      carrierId,
      carrierCode,
      carrierMode
    );
  }

  getHazmatLookUps(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ) {
    this.shippingService
      .getHazmatLookUps(
        clientId,
        orgId,
        invOrgId,
        carrierId,
        carrierCode,
        carrierMode
      )
      .subscribe({
        next: (resp: any) => {
          this.hazmatLookUpValues = resp.data;
        },
        error: (error: any) => {},
      });
  }
  getPackageOptionsLookups(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ) {
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;
    this.shippingService
      .getPackageOptionsLookups(
        clientId,
        orgId,
        invOrgId,
        carrierId,
        carrierCode,
        carrierMode
      )
      .subscribe({
        next: (resp: any) => {
          this.packagingList = resp.data.packagingTypeList;
          this.codFundsCodeList = resp.data.codFundsCodeList;
          this.dcisTypeList = resp.data.dcisTypeList;
          this.returnLabelTypeList = resp.data.returnLabelTypeList;
          this.outerPackagingTypeList = resp.data.outerPackagingTypeList;
        },
        error: (error: any) => {},
      });
  }
  get packageOptionsControls() {
    return this.shipmentPackage.controls;
  }
  get getCodInfoList() {
    return this.shipmentPackage?.get('codInfo') as FormGroup;
  }
  get getHoldAtLocInfo() {
    return this.shipmentPackage?.get('holdAtLocInfo') as FormGroup;
  }
  get getHazmatInfo() {
    return this.shipmentPackage?.get('hazmatInfo') as FormGroup;
  }
  get getReturnShipmentInfo() {
    return this.shipmentPackage?.get('returnShipmentInfo') as FormGroup;
  }

  //Return Shipment Details
  get getReturnShipFromAddrInfo() {
    return this.shipmentPackage
      ?.get('returnShipmentInfo')
      ?.get('shipFromAddrInfo') as FormGroup;
  }
  get getReturnShipToAddrInfo() {
    return this.shipmentPackage
      ?.get('returnShipmentInfo')
      ?.get('shipToAddrInfo') as FormGroup;
  }
  get getReturnCarrierInfo() {
    return this.shipmentPackage
      ?.get('returnShipmentInfo')
      ?.get('carrierInfo') as FormGroup;
  }
  get getReturnPaytermInfo() {
    return this.shipmentPackage
      ?.get('returnShipmentInfo')
      ?.get('paytermInfo') as FormGroup;
  }
  //Return Shipment Details
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  savePackageOptions() {
    this.shipmentPackagesInfoList.markAllAsTouched();
    if (this.shipmentPackagesInfoList.valid) {
      this.modalClose = 'modal';
    } else {
      this.modalClose = '';
      this.toastr.error(
        'Please enter/select the checked Package Options and proceed'
      );
    }
  }
}
