import { AuthenticationDetails } from './authentication-details.model';

export class LoadFreight {
  authenticationDetails!: AuthenticationDetails;
  clientId!: number;
  labelPath!: string;
  productCode!: string;
  userDefinedCodes!: string;
  reportPath!: string;
  erpType!: string;
}
