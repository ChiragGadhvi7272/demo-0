import { AddressInfo } from 'src/app/shared/models/address-info.model';

export class AddressValidationResponse {
  addressClassification: string = '';
  addressType: string = '';
  requestOption: string = '';
  proposedAddressesList: AddressInfo[] = [];
  status: number = 0;
  message: string = '';
}
