import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { PackageDetailsComponent } from '../../shipping/shared/package-details/package-details.component';
@Component({
  selector: 'app-adhoc-shared',
  templateUrl: './adhoc-shared.component.html',
  styleUrls: ['./adhoc-shared.component.css'],
})
export class AdhocSharedComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
  activeComponent!: string;
  pkgComponentIndicator!: string;
  intlComponentIndicator!: string;
  faMoneyBill1Wave = faMoneyBill1Wave;
  @Input() shipmentHeadersInfo!: FormGroup;
  @Input() shipmentLinesInfoList!: FormArray;
  @Input() clientId!: number;
  @Input() orgId!: string;
  @Input() invOrgId!: string;
  @Input() shipFlag!: boolean;
  @Input() paymethodsList!: any;
  @Input() accountNumbersList!: any;
  @Input() erpType!: any;
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  @Input() packageCount!: any;
  @Input() freightShoppingFlag!: any;
  @Input() defaultFocus!: any;
  @Input() ciFlag!: boolean;
  @Input() uscoFlag!: boolean;
  @ViewChild(PackageDetailsComponent)
  packageDetailscomponent!: PackageDetailsComponent;

  @Output() addPackageEvent = new EventEmitter<any>();
  @Output() removePackageEvent = new EventEmitter<any>();
  ngOnInit(): void {
    this.setActiveComponent('adhocPackageComponent');
    // console.log(this.shipmentHeadersInfo);

    // console.log(this.shipmentHeadersInfo.get('shipmentLinesInfoList'));
  }

  setActiveComponent(componentId: string) {
    this.activeComponent = componentId;
    if (this.activeComponent == 'adhocPackageComponent') {
      this.pkgComponentIndicator = 'nav-link active';
      this.intlComponentIndicator = 'nav-link';
    } else if (this.activeComponent == 'adhocInternationalComponent') {
      this.intlComponentIndicator = 'nav-link active';
      this.pkgComponentIndicator = 'nav-link';
    }
  }
  addPackage(value: any) {
    // console.log('value',value);
    this.addPackageEvent.emit(value);
  }
  removePackage(value: any) {
    this.removePackageEvent.emit(value);
  }
  get getPrinterInfo(): FormGroup {
    return this.shipmentHeadersInfo.get('printerInfo') as FormGroup;
  }
  get getShipmentPackagesList() {
    return this.shipmentHeadersInfo.get(
      'shipmentPackagesInfoList'
    ) as FormArray;
  }
}
