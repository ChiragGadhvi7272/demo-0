import { ShipmentHeadersInfo } from "src/app/shared/models/shipment-headers-info.model";
import { ShipmentCarrierDetails } from "./shipment-carrier-details.model";

export class DeliveryRetrievalResponse {

    shipmentHeadersInfo !: ShipmentHeadersInfo;
    shipmentCarrierDetails!: ShipmentCarrierDetails;
    status!: number;
    message!: String;
}
