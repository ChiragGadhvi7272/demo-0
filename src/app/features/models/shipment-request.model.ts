import { ClientOrgProfileOptionsInfo } from './client-org-profile-options-info.model';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';
import { ShipMethodMappingInfo } from 'src/app/features/models/ship-method-mapping-info.model';
import { AuthenticationDetails } from './authentication-details.model';
import { CarrierAcctNumbersInfo } from 'src/app/features/models/carrier-acct-numbers-info.model';
import { ShipmentCarrierDetails } from 'src/app/features/models/shipment-carrier-details.model';
export class ShipmentRequest {
  shipmentHeadersInfo!: ShipmentHeadersInfo;
  clientOrgProfileOptionsInfo!: ClientOrgProfileOptionsInfo;
  shipmentCarrierDetails!: ShipmentCarrierDetails;
  shipMethodMappingInfo!: ShipMethodMappingInfo;
  authenticationDetails!: AuthenticationDetails;
  carrierAcctNumbersInfo!: CarrierAcctNumbersInfo;
  clientId!: number;
  userId!: number;
  orgId!: string;
  invOrgId!: string;
  labelPath!: string;
  oracleUserId!: number;
  oracleResponsibilityId!: number;
  erpType!: string;
  consolidationFlag!: boolean;
}
