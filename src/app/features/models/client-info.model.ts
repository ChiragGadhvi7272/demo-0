import { UserDetails } from 'src/app/modules/admin/models/user-details.model';
import { ClientSubscriptionInfo } from './client-subscription-info.model';

export class ClientInfo {
  clientId: number = 0;
  companyName: string = '';
  contactName: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  city: string = '';
  state: string = '';
  postalCode: string = '';
  country: string = '';
  contactPhoneNumber: string = '';
  erpType: string = '';
  authUserName: string = '';
  authPassword: string = '';
  authProtocol: string = '';
  authUrl: string = '';
  reportPath: string = '';
  transactionRange: string = '';
  licenseStartDate: string = '';
  licenseEndDate: string = '';
  subscriptionDate: string = '';
  maxInventoryOrganizations: number = 0;
  labelPath: string = '';
  status: string = '';
  consumerKey: string = '';
  consumerSecret: string = '';
  tokenKey: string = '';
  tokenSecret: string = '';
  accountId: string = '';
  authorizationType: string = '';
  signatureMethod: string = '';
  webserviceLabelPath: string = '';
  aceShipmentFilingUrl: string = '';
  aceShipmentInquiryUrl: string = '';
  documentStorageAccessKey: string = '';
  documentStorageSecureKey: string = '';
  documentStorageRegion: string = '';
  documentStorageBucketName: string = '';
  documentPath: string = '';
  eodURL: string = '';
  eodUserName: string = '';
  eodPassword: string = '';
  jdeCarrierType: string = '';
  jdeMotProductCode: string = '';
  jdeMotUserDefinedCode: string = '';
  jdeCarrierProductCode: string = '';
  jdeCarrierUserDefinedCode: string = '';
  jdeProductCode: string = '';
  jdeUserDefinedCode: string = '';
  clientSubscriptionInfoList: any = new ClientSubscriptionInfo();
  userInfo: UserDetails = new UserDetails();
}
