import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';

@Injectable({
  providedIn: 'root',
})
export class ConsolidationDataService {
  private _childShipmentHeaderInfoListSubject: BehaviorSubject<
    ShipmentHeadersInfo[]
  > = new BehaviorSubject<ShipmentHeadersInfo[]>([]);

  constructor() {}

  getChildShipmentHeaderInfoListSubject() {
    return this._childShipmentHeaderInfoListSubject;
  }
}
