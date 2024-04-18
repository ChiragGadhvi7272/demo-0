import { AuthenticationDetails } from './authentication-details.model';

export class PackingSlipRequest {
  authenticationDetails!: AuthenticationDetails;
  deliveryIdsList!: string[];
  labelPath!: string;
  parentDeliveryId!: string;
  erpType!: string;
  deliveryId!: string;
	JobSetName!: string;
	JobSetPackageName!: string;
}
