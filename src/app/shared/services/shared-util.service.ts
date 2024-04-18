import { DatePipe } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthenticationDetails } from 'src/app/features/models/authentication-details.model';

@Injectable({
  providedIn: 'root',
})
export class SharedUtilService {
  constructor() {}
  authenticationDetails: AuthenticationDetails = new AuthenticationDetails();

  dateFormatOnSave(date: string): any {
    var datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSS');
  }
  dateFormatOnLoad(date: string): any {
    var datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  extractDate(dateTimeStamp: string): string {
    return dateTimeStamp.split('T')[0];
  }

  getAuthenticationDetails(clientInfo: any): AuthenticationDetails {
    this.authenticationDetails.userName = clientInfo.authUserName;
    this.authenticationDetails.password = clientInfo.authPassword;
    this.authenticationDetails.webservieURL = clientInfo.authUrl;
    this.authenticationDetails.protocol = clientInfo.authProtocol;
    this.authenticationDetails.consumerKey = clientInfo.consumerKey;
    this.authenticationDetails.consumerSecret = clientInfo.consumerSecret;
    this.authenticationDetails.tokenKey = clientInfo.tokenKey;
    this.authenticationDetails.tokenSecret = clientInfo.tokenSecret;
    this.authenticationDetails.accountId = clientInfo.accountId;
    this.authenticationDetails.authorizationType = clientInfo.authorizationType;
    this.authenticationDetails.userTokenId = clientInfo.userInfo.userTokenId;
    this.authenticationDetails.userTokenSecret =
      clientInfo.userInfo.userTokenSecret;
    this.authenticationDetails.signatureMethod = clientInfo.signatureMethod;
    return this.authenticationDetails;
  }

  trackByFn(index: number, option: any): number {
    return option.id;
  }

  //single instance is shared used for changing property of packageComponent..
  public intlShipPropertyChange: EventEmitter<any> = new EventEmitter<any>();

  changeProperty(newValue: any) {
    this.intlShipPropertyChange.emit(newValue);
  }
}
