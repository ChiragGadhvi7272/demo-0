import { UserDetails } from 'src/app/modules/admin/models/user-details.model';
import { AuthenticationDetails } from './authentication-details.model';
import { ClientOrgProfileOptionsInfo } from './client-org-profile-options-info.model';
export class DeliveryRetrieval {
  authenticationDetails!: AuthenticationDetails;
  clientOrgProfileOptionsInfo!: ClientOrgProfileOptionsInfo;
  userInfo!: UserDetails;
  clientId!: number;
  userId!: number;
  labelPath!: string;
  orgId!: string;
  invOrgId!: string;
  deliveryId!: string;
  searchCriteria!: string;
  oracleUserId!: number;
  oracleResponsibilityId!: number;
  erpType!: string;
  reportPath!: string;
}
