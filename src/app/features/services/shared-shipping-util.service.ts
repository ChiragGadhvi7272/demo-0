import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedShippingUtilService {
  constructor() {}
  returnShipmethodsList!: any[];
  shipMethodMappingInfoList!: any[];
  defaultReturnAccountNumber!: any;
  returnAccountNumber!: any;
  defaultReturnTpAccountNumber!: any;
  defaultRetuenRpAccountNumber!: any;
  paymethodsList!: any;
  returnPaycode: any;
  _shipButtonEnabled: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  paymethodSubject$: BehaviorSubject<String> = new BehaviorSubject<String>('');
  _accountNumberSubject$: BehaviorSubject<String> = new BehaviorSubject<String>(
    ''
  );

  _autoConsolidationSubject$: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(false);

  _allowBackOrderSubject$: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(false);

  updateReturnShipmethodList(carrierId: any) {
    this.returnShipmethodsList = this.shipMethodMappingInfoList.filter(
      (ship) => ship.carrierId == carrierId
    );
  }
  getReturnShipMethodList() {
    return this.returnShipmethodsList;
  }
  updatePaymethodsList(paymethodList: any) {
    this.paymethodsList = paymethodList;
  }
  getPayMethodList() {
    return this.paymethodsList;
  }
  getShipButtonEnabled() {
    return this._shipButtonEnabled;
  }

  changeShipButtonProperty(newValue: Boolean) {
    this._shipButtonEnabled.emit(newValue);
  }
}
