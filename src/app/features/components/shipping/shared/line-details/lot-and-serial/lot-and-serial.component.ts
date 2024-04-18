import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  faCheckCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SharedShippingUtilService } from 'src/app/features/services/shared-shipping-util.service';

@Component({
  selector: 'app-lot-and-serial',
  templateUrl: './lot-and-serial.component.html',
  styleUrls: ['./lot-and-serial.component.css'],
})
export class LotAndSerialComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  isDisabled: boolean = false;
  @Input() shipmentLineInfo!: FormGroup;
  @Input() shipFlag!: boolean;
  modalClose!: string;
  faCircleCheck = faCircleCheck;
  allowBackOrder: Boolean = false;
  showControlLineItems: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private shipUtilService: SharedShippingUtilService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      'this.shipmentLinesInfoList in Lot and Serial is',
      this.shipmentItemControlsInfoList
    );
  }

  ngOnInit(): void {
    this.shipUtilService._allowBackOrderSubject$.subscribe((allowBackOrder) => {
      this.allowBackOrder = allowBackOrder;
    });

    if (this.allowBackOrder && !this.shipFlag) {
      this.shipmentItemControlsInfoList.enable();
    }

    this.showControlLineItems = Array(
      this.shipmentItemControlsInfoList.length
    ).fill(false);
  }

  onclickModelPopup(data: any) {
    this.shipmentLineInfo = data;
    console.log('awsedrftgyh ', this.shipmentLineInfo);
  }

  getGroup(index: number) {
    return this.shipmentItemControlsInfoList.at(index) as FormGroup;
  }

  get shipmentItemControlsInfoList() {
    return this.shipmentLineInfo.get('shipmentItemControlsInfo') as FormArray;
  }

  get shipmentItemControlsInfoListSize(): number {
    console.log(this.shipmentItemControlsInfoList.length);
    return this.shipmentItemControlsInfoList.length;
  }

  saveLotandSerial() {
    let totalQuantity = 0;
    this.shipmentItemControlsInfoList.controls.forEach((shipmentItem) => {
      const quantity = Number(shipmentItem.get('quantity')?.value) || 0;
      totalQuantity += quantity;
    });

    const shippedQuantity =
      this.shipmentLineInfo.get('shippedQuantity')?.value || 0;
    const controlAtIndex0 = this.shipmentItemControlsInfoList.controls.at(0);

    if (totalQuantity > shippedQuantity) {
      alert('Total quantity should not exceed shipped quantity');
      this.modalClose = '';
      if (controlAtIndex0) {
        controlAtIndex0.setErrors({});
      }
    } else {
      if (controlAtIndex0) {
        controlAtIndex0.setErrors(null);
      }
      this.toastr.success('Lot and Serial Component saved successfully');
      this.modalClose = 'modal';
    }
  }
}
