import { ShipmentLinesInfo } from './shipment-lines-info.model';

export class ChildShipmentHeadersInfo {
  deliveryId: string = '';
  parentDeliveryId: string = '';
  status: string = '';
  errorMsg: string = '';
  shipmentLinesInfoList: ShipmentLinesInfo[] = [];
}
