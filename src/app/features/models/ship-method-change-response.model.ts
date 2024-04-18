import { CarrierOrgAcctDetailsInfo } from "./carrier-org-acct-details-info.model";
import { DeliveryRetrievalResponse } from "./delivery-retrieval-response.model";

export class ShipMethodChangeResponse {

    deliveryRetrievalResponse !:DeliveryRetrievalResponse;
    carrierOrgAcctDetailsInfo !:CarrierOrgAcctDetailsInfo;
    carrierLookupValuesInfo!:any
}
