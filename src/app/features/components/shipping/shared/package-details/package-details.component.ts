import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  faCirclePlus,
  faCircleMinus,
  faTrash,
  faCircleCheck,
  faLocationArrow,
  faUpRightFromSquare,
  faBroom,
} from '@fortawesome/free-solid-svg-icons';
import { PackageOptionsComponent } from './package-options/package-options.component';
import { ToastrService } from 'ngx-toastr';
import { ShippingService } from 'src/app/features/services/shipping.service';
import { SharedShippingUtilService } from 'src/app/features/services/shared-shipping-util.service';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';
import { SharedShippingSubjectsService } from 'src/app/features/services/shared-shipping-subjects.service';
@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css'],
})
export class PackageDetailsComponent implements OnInit, OnChanges {
  @ViewChild(PackageOptionsComponent)
  packageOptionsComponent!: PackageOptionsComponent;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  faTrash = faTrash;
  faCircleCheck = faCircleCheck;
  faLocationArrow = faLocationArrow;
  faBroom = faBroom;
  faUpRightFromSquare = faUpRightFromSquare;
  addDisable!: boolean;
  mpsDisable!: boolean;
  removeDisabled!: boolean;
  packageTableHeight!: String;
  numToAdd: number = 1;
  mpsCount: number = 0;
  @Input() shipmentPackagesInfoList!: FormArray;
  @Input() clientId!: number;
  @Input() orgId!: string;
  @Input() invOrgId!: string;
  @Input() erpType!: string;
  @Input() shipFlag!: boolean;
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  @Input() packageCount!: any;
  @Output() addPackageEvent = new EventEmitter<any>();
  @Output() removePackageEvent = new EventEmitter<any>();
  weightUOMList!: any;
  dimensionUOMList!: any;
  dimensionsInfoList!: any;
  modalClose!: string;
  @Input() freightShoppingFlag!: boolean;
  @ViewChild('weight') weight!: ElementRef;
  @ViewChild('dimensionName') dimensionName!: ElementRef;
  @Input() defaultFocus!: any;
  @ViewChild('myTable') myTable!: ElementRef;
  @Input() activeComponent!: any;
  shipMethodMappingInfo: any;
  mailInnovationFlag: boolean = false;
  @Output() isMps = new EventEmitter<Boolean>();
  @Input() shipmentHeadersInfo!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private shippingService: ShippingService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private sharedShippingUtilService: SharedShippingUtilService,
    private sharedShippingSubjectsService: SharedShippingSubjectsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showScroll();
    this.hideRemoveButtons();
    this.setDefaultFocus();
    this.checkMailInnovation();
  }

  setDefaultFocus() {
    const focusField = (fieldPrefix: any) => {
      setTimeout(() => {
        for (let idx = 0; idx < this.shipmentPackagesInfoList.length; idx++) {
          let inputField = this.elementRef.nativeElement.querySelector(
            `[id="${fieldPrefix}${idx}"]`
          );
          inputField && inputField.focus();
        }
      }, 100);
    };

    if (this.defaultFocus === 'weight') {
      focusField('weight');
    } else if (this.defaultFocus === 'dimension') {
      focusField('dimensionName');
    }
  }

  ngOnInit(): void {
    let packagesPromise = this.getPackageLookupValues(
      this.clientId,
      this.orgId,
      this.invOrgId
    );
    packagesPromise.then(() => {});
    this.removeDisabled = true;
    console.log('in pkg details');
    if (this.carrierCode == 100 || this.carrierCode == 110) {
      this.addDisable = false;
      if (this.carrierCode == 100) {
        this.mpsDisable = true;
      } else {
        this.mpsDisable = false;
      }
    } else {
      this.addDisable = !this.shipFlag;
      this.mpsDisable = false;
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
      .getShipMethodMappingInfo()
      .subscribe((shipMethodMapping) => {
        this.shipMethodMappingInfo = shipMethodMapping;
      });

    this.shipmentPackagesInfoList.valueChanges.subscribe((changes) => {});
    this.modalClose = 'modal';
  }

  getPackageLookupValues(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Promise<void> {
    const getPackageLookupValuesPromise = new Promise<void>(
      (resolve, reject) => {
        this.shippingService
          .getPackageLookupValues(clientId, orgId, invOrgId)
          .subscribe({
            next: (response: any) => {
              this.weightUOMList = response.data.weightUOMList;
              this.dimensionUOMList = response.data.dimensionUOMList;
              this.dimensionsInfoList = response.data.dimensionsInfoList;
              resolve();
            },
            error: (error) => {
              reject(error);
            },
          });
      }
    );
    return getPackageLookupValuesPromise;
  }

  addPackage(numberOfRowsToAdd: any) {
    //sgmps change to carrierCode ups or fedex
    //this.showButtons(weight);

    var weight = (
      this.shipmentPackagesInfoList.at(
        this.shipmentPackagesInfoList.length - 1
      ) as FormGroup
    ).get('weight')?.value;

    if (weight == null || Number(weight) <= 0 || Number(weight) > 150) {
      let inputField = this.elementRef.nativeElement.querySelector(
        `[id="${'weight'}${this.shipmentPackagesInfoList.length - 1}"]`
      );
      inputField && inputField.focus();
    } else if (this.carrierCode == 100 || this.carrierCode == 110) {
      if (this.mailInnovationFlag) {
        this.toastr.warning('UPS Mail Innovation Supports Single Package');
        this.addDisable = true;
      } else {
        this.sharedShippingUtilService.changeShipButtonProperty(true);
        this.addPackageEvent.emit(numberOfRowsToAdd);
        this.showScroll();
        this.hideRemoveButtons();
        this.setDefaultFocus();
      }
    }
  }
  removePackage() {
    if (!this.shipFlag || this.carrierCode == 100 || this.carrierCode == 110) {
      this.removePackageEvent.emit(false);
      this.hideRemoveButtons();
      this.showScroll();
    }
  }
  removeAllPackage() {
    if (!this.shipFlag || this.carrierCode == 100 || this.carrierCode == 110) {
      this.removePackageEvent.emit(true);
      this.hideRemoveButtons();
      this.showScroll();
    }
  }
  showScroll() {
    let packValue: any = !this.packageCount || this.packageCount <= 3;
    if (window.innerWidth >= 1920) {
      if (packValue) {
        this.packageTableHeight = 'height: 236px;';
      } else {
        this.packageTableHeight = 'overflow-y:scroll; height: 236px;';
        this.scrollToLastRow();
      }
    } else if (window.innerWidth >= 1680 && window.innerWidth <= 1919) {
      if (packValue) {
        this.packageTableHeight = 'height: 176px;';
      } else {
        this.packageTableHeight = 'overflow-y:scroll; height: 176px;';
        this.scrollToLastRow();
      }
    } else if (window.innerWidth > 1366 && window.innerWidth <= 1679) {
      if (packValue) {
        this.packageTableHeight = 'height: 162px';
      } else {
        this.packageTableHeight = 'overflow-y:scroll; height: 162px;';
        this.scrollToLastRow();
      }
    } else {
      if (packValue) {
        this.packageTableHeight = 'height: 145px;';
      } else {
        this.scrollToLastRow();
        this.packageTableHeight = 'overflow-y:scroll; height: 145px;';
      }
    }
    //height: 268px;
  }
  scrollToLastRow() {
    setTimeout(() => {
      this.myTable.nativeElement.scrollHeight; // Force recalculation
      this.myTable.nativeElement.scrollTo({
        top: this.myTable.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 10);
  }
  hideRemoveButtons() {
    if (!this.shipFlag || this.carrierCode == 100 || this.carrierCode == 110) {
      if (!this.packageCount || this.packageCount == 1) {
        this.removeDisabled = true;
      } else {
        this.removeDisabled = false;
      }
    } else {
      this.removeDisabled = true;
    }
  }
  showButtons(weigth: any) {
    if (!this.shipFlag || this.carrierCode == 100 || this.carrierCode == 110) {
      if (weigth <= 0) {
        this.addDisable = true;
      } else {
        this.addDisable = false;
      }
    } else {
      this.addDisable = true;
    }
  }
  changedDimensions(index: any) {
    let exitLoop: boolean = false;
    let pack = this.shipmentPackagesInfoList.at(index) as FormGroup;
    let selectedDimensionValue = pack.get('dimensionName')?.value;
    let selectElementStyle =
      'Other' != selectedDimensionValue
        ? 'dimension-select-disabled'
        : 'dimension-select-enabled';
    let dimensionEnabled = 'Other' == selectedDimensionValue ? false : true;
    this.dimensionsInfoList.forEach((dimension: any) => {
      if (!exitLoop) {
        if (
          null != pack.get('dimensionName') &&
          selectedDimensionValue == dimension.dimensionName
        ) {
          pack.get('dimensionName')?.patchValue(dimension.dimensionName);
          var a = document.getElementById('dimUom' + index)?.style;

          this.addStyleToDimUom('dimUom' + index, selectElementStyle);

          pack = this.addControlValueAndEnable(
            pack,
            'packageLength',
            dimension.dimensionLength,
            dimensionEnabled
          );
          pack = this.addControlValueAndEnable(
            pack,
            'packageWidth',
            dimension.dimensionWidth,
            dimensionEnabled
          );
          pack = this.addControlValueAndEnable(
            pack,
            'packageHeight',
            dimension.dimensionHeight,
            dimensionEnabled
          );
          pack = this.addControlValueAndEnable(
            pack,
            'dimUom',
            dimension.dimensionUnits,
            dimensionEnabled
          );
          pack = this.addControlValueAndEnable(
            pack,
            'dimensionWeight',
            dimension.dimensionWeight,
            dimensionEnabled
          );
          pack = this.addControlValueAndEnable(
            pack,
            'dimensionUnits',
            dimension.dimensionUnits,
            dimensionEnabled
          );
          exitLoop = true;
        }
      }
    });
  }

  getGroup(index: number) {
    return this.shipmentPackagesInfoList.at(index) as FormGroup;
  }
  savePackageOptions() {
    this.shipmentPackagesInfoList.markAllAsTouched();
    if (this.shipmentPackagesInfoList.valid) {
      this.modalClose = 'modal';
      this.toastr.success(
        'Package Options saved successfully , please close the popup'
      );
    } else {
      this.modalClose = '';
      this.toastr.error(
        'Please enter/select the checked Package Options and proceed'
      );
    }
  }
  getPackageOptionsLookupValues(packagedetails: any, index: number) {
    if (
      this.clientId != 0 &&
      this.orgId != '' &&
      this.invOrgId != '' &&
      this.carrierId != 0 &&
      this.carrierCode != 0 &&
      this.carrierMode != ''
    ) {
      // karthik.k added code for mail innovation
      if (
        this.shipMethodMappingInfo &&
        Object.keys(this.shipMethodMappingInfo).length !== 0
      ) {
        let serviceLevel = this.shipMethodMappingInfo.carrierServiceLevel;
        this.mailInnovationFlag = isNaN(Number(serviceLevel));
      }
      // added mail innovation flag as parameter
      this.packageOptionsComponent.loadPackageOptions(
        this.clientId,
        this.orgId,
        this.invOrgId,
        this.carrierId,
        this.carrierCode,
        this.carrierMode,
        packagedetails,
        index,
        this.mailInnovationFlag
      );
      this.packageOptionsComponent.getHazmatLookUps(
        this.clientId,
        this.orgId,
        this.invOrgId,
        this.carrierId,
        this.carrierCode,
        this.carrierMode
      );
    }
  }

  addControlValueAndEnable(
    formGroup: FormGroup,
    controlName: string,
    value: any,
    readonly: boolean
  ) {
    formGroup.get(controlName)?.patchValue(value);
    readonly
      ? formGroup.get(controlName)?.disable()
      : formGroup.get(controlName)?.enable();
    return formGroup;
  }
  enableOrDisableDimensions(formGroup: FormGroup) {
    formGroup.get('');
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  addStyleToDimUom(elementId: string, cssClassName: string): void {
    var element = document.getElementById(elementId);
    if (element) {
      this.renderer.addClass(element, cssClassName);
    }
  }

  disableDimensions(packageForm: FormGroup) {
    if (packageForm.get('dimensionName')?.value !== 'Other') {
      packageForm.get('packageLength')?.disable();
      packageForm.get('packageWidth')?.disable();
      packageForm.get('packageHeight')?.disable();
      packageForm.get('dimUom')?.disable();
      packageForm.get('dimensionWeight')?.disable();
      packageForm.get('dimensionUnits')?.disable();
    }
  }
  checkMailInnovation() {
    if (
      this.shipMethodMappingInfo &&
      Object.keys(this.shipMethodMappingInfo).length !== 0 &&
      100 == this.carrierCode
    ) {
      let serviceLevel = this.shipMethodMappingInfo.carrierServiceLevel;
      console.log('service level', serviceLevel);
      this.mailInnovationFlag = isNaN(Number(serviceLevel));
    } else {
      this.mailInnovationFlag = false;
    }
    if (this.mailInnovationFlag) {
    }
  }
}
