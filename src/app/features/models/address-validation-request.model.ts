import { AddressInfo } from 'src/app/shared/models/address-info.model';
import { OrgProfileOptionsServicesInfo } from './org-profile-options-services-info.model';

export class AddressValidationRequest {
  orgAVCarrierInfo: OrgProfileOptionsServicesInfo =
    new OrgProfileOptionsServicesInfo();
  shipToAddressInfo: AddressInfo = new AddressInfo();
  clientId: number = 0;
  userId: number = 0;
  deliveryId: string = '';
  labelPath: string = '';
}
