import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  faCircleXmark,
  faAngleDown,
  faXmark,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ConsolidationDataService } from './consolidation-data.service';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';
import { SharedShippingUtilService } from 'src/app/features/services/shared-shipping-util.service';
@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.css'],
})
export class ConsolidationComponent implements OnInit {
  @Input() childShipmentHeaderList!: FormArray;
  consolidationInfo!: FormGroup;
  faCircleXmark = faCircleXmark;
  faXmark = faXmark;
  faAngleDown = faAngleDown;
  faFileArrowDown = faFileArrowDown;
  status!: string;
  errorMessage!: string;
  convertedUserData: any;
  dataValues!: any;
  consolidationFlag = false;
  erpType!: string;
  showLineItems: any;
  childLineItems: any[] = [];
  index!: any;
  tableData!: any;
  isTableDisabled: boolean = true;
  item: any;
  autoConsolidation: Boolean = false;
  @Input() activeComponent!: any;

  constructor(
    private localStorageService: LocalStorageService,
    private fb: NonNullableFormBuilder,
    private shipUtilService: SharedShippingUtilService
  ) {}

  ngOnInit(): void {
    this.dataValues = this.localStorageService.getLocalUserData();
    this.erpType = this.dataValues.erpType;
    if (this.erpType == 'NS') {
      this.childShipmentHeaderList.disable();
    }
    let subscriptionData = this.dataValues.clientSubscriptionInfoList;
    subscriptionData.forEach((subscription: any) => {
      if ('CONSOLIDATION' === subscription.serviceName) {
        this.consolidationFlag = subscription.activeFlag;
      }
    });

    this.shipUtilService._autoConsolidationSubject$.subscribe(
      (autoConsolidation) => {
        this.autoConsolidation = autoConsolidation;
      }
    );
    this.showLineItems = Array(this.childShipmentHeaderList.length).fill(false);
  }

  onButtonClick(index: number) {
    this.showLineItems[index] = !this.showLineItems[index];
  }

  getChildLines(childHeader: AbstractControl<any, any>): FormArray {
    console.log('lineGroup', childHeader.get('shipmentLinesInfoList'));
    return (childHeader as FormGroup).get('shipmentLinesInfoList') as FormArray;
  }

  getGroup(index: number): FormGroup<any> {
    return this.childShipmentHeaderList.at(index) as FormGroup;
  }

  getLineGroup(parentIndex: number, childIndex: number): FormGroup<any> {
    return (
      (this.childShipmentHeaderList.at(parentIndex) as FormGroup).get(
        'shipmentLinesInfoList'
      ) as FormArray
    ).at(childIndex) as FormGroup;
  }

  showAllLines(event: any) {
    if (event.target.checked) {
      // Set all elements to true when checkbox is enabled
      this.showLineItems = Array(this.childShipmentHeaderList.length).fill(
        true
      );
    } else {
      // Set all elements to false when checkbox is disabled
      this.showLineItems = Array(this.childShipmentHeaderList.length).fill(
        false
      );
    }
  }
}
