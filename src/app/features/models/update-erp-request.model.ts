import { ShipmentHeadersInfo } from "src/app/shared/models/shipment-headers-info.model";
import { ClientOrgProfileOptionsInfo } from "./client-org-profile-options-info.model";
import { ShipmentCarrierDetails } from "./shipment-carrier-details.model";
import { ShipMethodMappingInfo } from "./ship-method-mapping-info.model";
import { AuthenticationDetails } from "./authentication-details.model";
import { CarrierAcctNumbersInfo } from "./carrier-acct-numbers-info.model";

export class UpdateErpRequest {
    shipmentHeadersInfo!: ShipmentHeadersInfo;
    clientOrgProfileOptionsInfo!: ClientOrgProfileOptionsInfo;
    authenticationDetails!: AuthenticationDetails;
    clientId!: number;
    userId!: number;
    orgId!: string;
    invOrgId!: string;
    labelPath!: string;
    oracleUserId!: number;
    oracleResponsibilityId!: number;
    erpType!: string;
    mode!: String;
    shipMethodMappingInfo : ShipMethodMappingInfo = new ShipMethodMappingInfo();
    reportPath!: String;
}
