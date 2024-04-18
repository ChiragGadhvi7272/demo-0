import { AddressInfo } from './address-info.model';
import { CarrierInfo } from './carrier-info.model';
import { PaytermInfo } from './payterm-info.model';

export class ReturnShipmentInfo {
  returnFlag: boolean = false;
  description:String="";
  shipFromAddrInfo: AddressInfo = new AddressInfo();
  shipToAddrInfo: AddressInfo = new AddressInfo();
  carrierInfo: CarrierInfo = new CarrierInfo();
  paytermInfo: PaytermInfo = new PaytermInfo();
}
