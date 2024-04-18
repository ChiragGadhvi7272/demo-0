import { AuthenticationDetails } from 'src/app/features/models/authentication-details.model';

export class ErpSyncRequest {
  authenticationDetails!: AuthenticationDetails;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  fromDate!: any;
  toDate!: any;
  erpType!: string;
  labelPath!: string;
  deliveryList!: string;
}
