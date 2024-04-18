import { ClientOrgProfileOptionsInfo } from './client-org-profile-options-info.model';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';
import { AuthenticationDetails } from './authentication-details.model';
import { ShipmentCarrierDetails } from 'src/app/features/models/shipment-carrier-details.model';
export class VoidShipmentRequest {
  shipmentHeadersInfo!: ShipmentHeadersInfo;
  clientOrgProfileOptionsInfo!: ClientOrgProfileOptionsInfo;
  shipmentCarrierDetails!: ShipmentCarrierDetails;
  authenticationDetails!: AuthenticationDetails;
  clientId!: number;
  userId!: number;
  orgId!: string;
  invOrgId!: string;
  labelPath!: string;
  oracleUserId!: number;
  oracleResponsibilityId!: number;
  erpType!: string;
  reportPath!: string;
}
