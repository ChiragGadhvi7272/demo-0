import { UserDetails } from "src/app/modules/admin/models/user-details.model";
import { ClientOrgProfileOptionsInfo } from "./client-org-profile-options-info.model";
import { DeliveryRetrievalResponse } from "./delivery-retrieval-response.model";

export class ShipMethodChangeRequest {

    deliveryRetrievalResponse!:DeliveryRetrievalResponse;
    clientOrgProfileOptionsInfo!:ClientOrgProfileOptionsInfo;
    userInfo!:UserDetails;
}
