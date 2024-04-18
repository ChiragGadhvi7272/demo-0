import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import {
  faMoneyBill1Wave,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { SharedShippingSubjectsService } from 'src/app/features/services/shared-shipping-subjects.service';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export class SharedComponent implements OnInit {
  @Input() clientId!: number;
  @Input() orgId!: string;
  @Input() invOrgId!: string;
  @Input() erpType!: string;
  @Input() intlFlag!: boolean;
  @Input() shipFlag!: boolean;
  @Input() ciFlag!: boolean;
  @Input() uscoFlag!: boolean;
  @Input() consolidationFlag!: boolean;
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  @Input() printersList: any;
  @Input() packageCount: any;
  @Input() shipmentHeadersInfo!: FormGroup;
  @Input() freightShoppingFlag!: boolean;
  @Output() updateActiveComponent = new EventEmitter<string>();
  @Input() defaultFocus!: any;
  activeComponent!: string;
  @Output() addPackageEvent = new EventEmitter<any>();
  @Output() removePackageEvent = new EventEmitter<any>();
  @ViewChild(PackageDetailsComponent)
  packageDetailscomponent!: PackageDetailsComponent;
  shipMethodMappingInfo: any;
  pkgComponentIndicator!: string;
  intlComponentIndicator!: string;
  consolidationIndicator!: string;
  faMoneyBill1Wave = faMoneyBill1Wave;
  faCircleXmark = faCircleXmark;

  ngOnInit(): void {
    console.log('in shared the headerinof is', this.shipmentHeadersInfo);
    this.setActiveComponent('packageComponent');
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
    this.sharedUtilService.intlShipPropertyChange.subscribe((newValue: string) => {
      this.setActiveComponent(newValue);
      this.cdr.detectChanges();
    });
        this.sharedShippingSubjectsService
      .getShipMethodMappingInfo()
      .subscribe((shipMethodMapping) => {
        this.shipMethodMappingInfo = shipMethodMapping;
      });
    console.log('onInit this.activeComponent', this.activeComponent);
    this.showCostsZero();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      // this.updateDestinationAddress();
      this.showCostsZero();
    }
  }
  showCostsZero() {
    Object.keys(this.getshipmentCharges.controls).forEach((controlName) => {
      const controlValue = this.getshipmentCharges.get(controlName)?.value;
      if (controlValue === null || controlValue === '') {
        this.getshipmentCharges.get(controlName)?.patchValue('0');
      }
    });
  }
  constructor(
    private sharedUtilService: SharedUtilService,
    private cdr: ChangeDetectorRef,
    private sharedShippingSubjectsService: SharedShippingSubjectsService
  ) {}

  setActiveComponent(componentId: string) {
    this.activeComponent = componentId;
    if (this.activeComponent == 'packageComponent') {
      this.pkgComponentIndicator = 'nav-link active';
      this.intlComponentIndicator = 'nav-link';
      this.consolidationIndicator = 'nav-link';
    } else if (this.activeComponent == 'internationalComponent') {
      this.intlComponentIndicator = 'nav-link active';
      this.pkgComponentIndicator = 'nav-link';
      this.consolidationIndicator = 'nav-link';
    } else if (this.activeComponent == 'consolidationComponent') {
      this.consolidationIndicator = 'nav-link active';
      this.pkgComponentIndicator = 'nav-link';
      this.intlComponentIndicator = 'nav-link';
    }
  }

  addPackage(value: any) {
    this.addPackageEvent.emit(value);
  }
  removePackage(value: any) {
    this.removePackageEvent.emit(value);
  }

  get getshipmentPackagesList() {
    return this.shipmentHeadersInfo.get(
      'shipmentPackagesInfoList'
    ) as FormArray;
  }

  get getshipmentLinesList() {
    return this.shipmentHeadersInfo.get('shipmentLinesInfoList') as FormArray;
  }

  get getshipmentCharges() {
    return this.shipmentHeadersInfo.get('shipmentChargesInfo') as FormGroup;
  }
  get getprintersInfo() {
    return this.shipmentHeadersInfo.get('printerInfo') as FormGroup;
  }
  get getChildHeadersInfoList() {
    console.log(
      'childShipmentHeader',
      this.shipmentHeadersInfo.get('childShipmentHeadersInfoList')
    );
    return this.shipmentHeadersInfo.get(
      'childShipmentHeadersInfoList'
    ) as FormArray;
  }
}
