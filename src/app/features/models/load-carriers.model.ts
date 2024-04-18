import { AuthenticationDetails } from './authentication-details.model';

export class LoadCarriers {
  authenticationDetails!: AuthenticationDetails;
  clientId!: number;
  userId!: number;
  labelPath!: string;
  orgId!: string;
  invOrgId!: string;
  erpType!: string;
  productCode!: string;
  carrierType!: string;
  userDefinedCode!: string;
  reportPath!: string;
  carProductCode!: string;
  carUserDefinedCode!: string;
  carrierNumber!: number;
  moTProductCode!: string;
  moTUserDefinedCode!: string;
}
