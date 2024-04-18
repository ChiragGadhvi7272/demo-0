import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { LotAndSerialComponent } from './lot-and-serial/lot-and-serial.component';
@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.css'],
})
export class LineDetailsComponent implements OnInit, OnChanges {
  checkIfLotOrSerial(lineGroup: AbstractControl): boolean {
    if (
      lineGroup.get('serialControlCode')?.value == 0 ||
      lineGroup.get('lotControlCode')?.value == 0
    ) {
      if (!this.shipFlag) {
        lineGroup.get('shippedQuantity')?.enable();
      }
      return true;
    } else {
      return false;
    }

    throw new Error('Method not implemented.');
  }
  @Input() shipmentLinesInfoList!: FormArray;
  @Input() erpType!: string;
  isDisabled!: boolean;
  lineTableHeight!: string;
  faUpRightFromSquare = faUpRightFromSquare;
  @Input() shipFlag!: boolean; //sameer.p
  @ViewChild(LotAndSerialComponent)
  lotAndSerialComponent!: LotAndSerialComponent; //sameer.p
  showLotOrSerial: boolean = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.scrollToLastRow();
    console.log('this.shipmentLinesInfoList', this.shipmentLinesInfoList);
  }
  ngOnInit(): void {
    this.shipmentLinesInfoList.valueChanges.subscribe(() => {
      this.scrollToLastRow();
    });
  }
  scrollToLastRow() {
    if (window.innerWidth >= 1920) {
      if (this.shipmentLinesInfoList.length <= 3) {
        this.lineTableHeight = 'height: 238px;';
      } else {
        this.lineTableHeight =
          'overflow-y:scroll; height: 236px;scrollbar-width: thin;scrollbar-color: var(--thumbBG) var(--scrollbarBG);';
      }
    } else if (window.innerWidth >= 1680 && window.innerWidth <= 1919) {
      if (this.shipmentLinesInfoList.length <= 3) {
        this.lineTableHeight = 'height: 176px;';
      } else {
        this.lineTableHeight =
          'overflow-y:scroll; height: 176px;scrollbar-width: thin;scrollbar-color: var(--thumbBG) var(--scrollbarBG);';
      }
    } else if (window.innerWidth > 1366 && window.innerWidth <= 1679) {
      if (this.shipmentLinesInfoList.length <= 3) {
        this.lineTableHeight = 'height: 162px;';
      } else {
        this.lineTableHeight =
          'overflow-y:scroll; height: 162px;scrollbar-width: thin;scrollbar-color: var(--thumbBG) var(--scrollbarBG);';
      }
    } else {
      if (this.shipmentLinesInfoList.length <= 3) {
        this.lineTableHeight = 'height: 143px;';
      } else {
        this.lineTableHeight =
          'overflow-y:scroll; height: 143px;scrollbar-width: thin;scrollbar-color: var(--thumbBG) var(--scrollbarBG);';
        this.scrollToLastRow();
      }
    }
  }
  //if is a FormArray of FormGroup
  getGroup(index: number) {
    return this.shipmentLinesInfoList.at(index) as FormGroup;
  }

  get shipmentItemControlsInfoList() {
    return this.shipmentLinesInfoList.get(
      'shipmentItemControlsInfo'
    ) as FormArray;
  }

  openLotAndSerial(group: FormGroup) {
    //sameer.p
    if (this.lotAndSerialComponent) {
      this.lotAndSerialComponent.onclickModelPopup(group);
      console.log('Current Values::', group.value.shipmentItemControlsInfo);
    } else {
      console.error('lotAndSerialComponent is not initialized.');
    }
  }
}
