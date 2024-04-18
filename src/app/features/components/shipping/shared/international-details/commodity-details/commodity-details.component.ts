import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  faCirclePlus,
  faTrash,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.css'],
})
export class CommodityDetailsComponent implements OnInit, OnChanges {
  @Input() shipFlag!: boolean;
  @Input() shipmentLinesInfoList!: FormArray;
  @Input() uomList!: any;
  @Input() weightUomList!: any;
  countryCodesList!: any;

  faCirclePlus = faCirclePlus;
  faTrash = faTrash;
  faCopy = faCopy;
  lineDetails!: any[];
  packageDetails!: any;
  otherPackageDetails!: any;
  isDisabled!: boolean;
  addDisable!: boolean;
  removeDisabled!: boolean;
  getWeights!: any;
  lineNumbers!: number;
  lineTableHeight!: String;
  packageTableHeight!: String;
  readOnlyColor!: String;
  isEmitting: any;
  constructor(private loadLookupsService: LoadLookupsService) {}

  ngOnInit(): void {
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    if (!this.shipFlag) {
      this.shipmentLinesInfoList.enable();
    }

    this.shipmentLinesInfoList.valueChanges.subscribe(() => {
      this.showScroll();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showScroll();
    console.log('commodity details', changes);
    if (changes['shipmentLinesInfoList']) {
      console.log('commodity details', changes);
    }
  }

  //if is a FormArray of FormGroup
  showScroll() {
    if (this.shipmentLinesInfoList.length <= 3) {
      this.lineTableHeight = 'auto';
    } else {
      this.lineTableHeight =
        'overflow-y:scroll; height: 137px;border-radius: 10px 0 0 10px;';
    }
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  getGroup(index: number) {
    return this.shipmentLinesInfoList.at(index) as FormGroup;
  }
}
