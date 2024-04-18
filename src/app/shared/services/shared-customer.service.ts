import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedCustomerService {
  showACE: boolean = true;
  showDS: boolean = true;
  showEOD: boolean = true;
  erpTypeVal!: string;
  fields: any = [];
  customerForm!: FormGroup;
  licenseEndDate!: any;
  nextDayofStart!: any;
  sameDayofStart!: any;
  constructor(private fb: FormBuilder) {}

  getFormControlsFields(obj: any) {
    let phoneNumberPattern =  /^(\+[1-9][0-9]{0,2}\s?)?[1-9][0-9]{9}$|^\(\d{3}\)\s?[1-9][0-9]{2}\s?[0-9]{4}$|^[1-9][0-9]{2}\s?[1-9][0-9]{2}\s?[0-9]{4}$/;
    let postalCode = /^[a-zA-Z0-9\s]*$/;
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      let validations: any = [];
      switch (field) {
        case 'clientId':
          validations.push(/* Add clientId validations if needed */);
          break;
        case 'companyName':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'contactName':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
        case 'addressLine1':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'addressLine2':
          validations.push(
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'city':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
        case 'state':
          validations.push(
            Validators.required,
            Validators.maxLength(2),
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
        case 'postalCode':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern(postalCode)
          );
          break;
        case 'country':
          validations.push(Validators.required);
          break;
        case 'contactPhoneNumber':
          validations.push(
            Validators.required,
            Validators.maxLength(16),
            Validators.pattern(phoneNumberPattern),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'erpType':
          validations.push(Validators.required);
          break;
        case 'authUserName':
          validations.push(
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'authPassword':
          validations.push(
            Validators.required,
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'authProtocol':
          validations.push(Validators.required);
          break;
        case 'authUrl':
          validations.push(
            Validators.required,
            Validators.maxLength(1000),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'reportPath':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'transactionRange':
          validations.push(Validators.min(0));
          break;
        case 'licenseStartDate':
          validations.push(Validators.required);
          break;
        case 'subscriptionDate':
          validations.push(Validators.required);
          break;
        case 'maxInventoryOrganizations':
          validations.push(
            Validators.required,
            Validators.min(1),
            Validators.max(99)
          );
          break;
        case 'labelPath':
          validations.push(
            Validators.required,
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'consumerKey':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'consumerSecret':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'userName':
          validations.push(
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'firstName':
          validations.push(
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'emailId':
          validations.push(
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          );
          break;
        case 'password':
          validations.push(
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&#].{7,}'
            ),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        case 'retypePassword':
          validations.push(
            Validators.required,
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
          break;
        default:
          break;
      }
      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }
    return formGroupFields;
  }

  onErpTypeChange(erpType: any, customerForm: FormGroup) {
    this.erpTypeVal = erpType;
    customerForm.controls['authUserName'].setValidators(Validators.required);
    customerForm.controls['authUserName'].updateValueAndValidity();
    customerForm.controls['authPassword'].setValidators(Validators.required);
    customerForm.controls['authPassword'].updateValueAndValidity();
    if (erpType == 'NS') {
      customerForm.controls['consumerKey'].setValidators(Validators.required);
      customerForm.controls['consumerKey'].updateValueAndValidity();
      customerForm.controls['tokenKey'].setValidators(Validators.required);
      customerForm.controls['tokenKey'].updateValueAndValidity();
      customerForm.controls['consumerSecret'].setValidators(
        Validators.required
      );
      customerForm.controls['consumerSecret'].updateValueAndValidity();
      customerForm.controls['tokenSecret'].setValidators(Validators.required);
      customerForm.controls['tokenSecret'].updateValueAndValidity();
      customerForm.controls['accountId'].setValidators(Validators.required);
      customerForm.controls['accountId'].updateValueAndValidity();
      customerForm.controls['authUserName'].clearValidators();
      customerForm.controls['authUserName'].reset();
      customerForm.controls['authUserName'].updateValueAndValidity();
      customerForm.controls['authPassword'].clearValidators();
      customerForm.controls['authPassword'].reset();
      customerForm.controls['authPassword'].updateValueAndValidity();
    } else {
      customerForm.controls['consumerKey'].clearValidators();
      customerForm.controls['consumerKey'].reset();
      customerForm.controls['consumerKey'].updateValueAndValidity();
      customerForm.controls['tokenKey'].clearValidators();
      customerForm.controls['tokenKey'].reset();
      customerForm.controls['tokenKey'].updateValueAndValidity();
      customerForm.controls['consumerSecret'].clearValidators();
      customerForm.controls['consumerSecret'].reset();
      customerForm.controls['consumerSecret'].updateValueAndValidity();
      customerForm.controls['tokenSecret'].clearValidators();
      customerForm.controls['tokenSecret'].reset();
      customerForm.controls['tokenSecret'].updateValueAndValidity();
      customerForm.controls['accountId'].clearValidators();
      customerForm.controls['accountId'].reset();
      customerForm.controls['accountId'].updateValueAndValidity();
    }
    if (erpType == 'EBS') {
      customerForm.controls['webserviceLabelPath'].setValidators(
        Validators.required
      );
      customerForm.controls['webserviceLabelPath'].updateValueAndValidity();
    } else {
      customerForm.controls['webserviceLabelPath'].clearValidators();
      customerForm.controls['webserviceLabelPath'].reset();
      customerForm.controls['webserviceLabelPath'].updateValueAndValidity();
    }
    if (erpType == 'SCM') {
      customerForm.controls['reportPath'].setValidators(Validators.required);
      customerForm.controls['reportPath'].updateValueAndValidity();
    } else {
      customerForm.controls['reportPath'].clearValidators();
      customerForm.controls['reportPath'].reset();
      customerForm.controls['reportPath'].updateValueAndValidity();
    }
    if (erpType == 'JDE') {
      customerForm.controls['jdeCarrierType'].setValidators(
        Validators.required
      );
      customerForm.controls['jdeCarrierType'].updateValueAndValidity();
      customerForm.controls['jdeProductCode'].setValidators(
        Validators.required
      );
      customerForm.controls['jdeProductCode'].updateValueAndValidity();
      customerForm.controls['jdeUserDefinedCode'].setValidators(
        Validators.required
      );
      customerForm.controls['jdeUserDefinedCode'].updateValueAndValidity();
    } else {
      customerForm.controls['jdeCarrierType'].clearValidators();
      customerForm.controls['jdeCarrierType'].reset();
      customerForm.controls['jdeCarrierType'].updateValueAndValidity();
      customerForm.controls['jdeProductCode'].clearValidators();
      customerForm.controls['jdeProductCode'].reset();
      customerForm.controls['jdeProductCode'].updateValueAndValidity();
      customerForm.controls['jdeUserDefinedCode'].clearValidators();
      customerForm.controls['jdeUserDefinedCode'].reset();
      customerForm.controls['jdeUserDefinedCode'].updateValueAndValidity();
    }
  }
  showInfoIcons(serviceName: any, event: any, customerForm: FormGroup) {
    if (event == true && serviceName == 'ACE') {
      this.showACE = false;
      customerForm.controls['aceShipmentFilingUrl'].setValidators([
        Validators.required,
      ]);
      customerForm.controls['aceShipmentInquiryUrl'].setValidators([
        Validators.required,
      ]);
    } else if (event == false && serviceName == 'ACE') {
      this.showACE = true;
      customerForm.controls['aceShipmentFilingUrl'].clearValidators();
      customerForm.controls['aceShipmentInquiryUrl'].clearValidators();
      customerForm.controls['aceShipmentFilingUrl'].reset();
      customerForm.controls['aceShipmentInquiryUrl'].reset();
    } else if (event == true && serviceName == 'DS') {
      this.showDS = false;
    } else if (event == false && serviceName == 'DS') {
      this.showDS = true;
    } else if (event == true && serviceName == 'EOD') {
      this.showEOD = false;
      customerForm.controls['eodUserName'].setValidators([Validators.required]);
      customerForm.controls['eodPassword'].setValidators([Validators.required]);
      customerForm.controls['eodURL'].setValidators([Validators.required]);
    } else if (event == false && serviceName == 'EOD') {
      this.showEOD = true;
      customerForm.controls['eodUserName'].clearValidators();
      customerForm.controls['eodPassword'].clearValidators();
      customerForm.controls['eodURL'].clearValidators();
      customerForm.controls['eodUserName'].reset();
      customerForm.controls['eodPassword'].reset();
      customerForm.controls['eodURL'].reset();
    }
    customerForm.get('aceShipmentFilingUrl')?.updateValueAndValidity();
    customerForm.get('aceShipmentInquiryUrl')?.updateValueAndValidity();
    customerForm.controls['eodUserName']?.updateValueAndValidity();
    customerForm.controls['eodPassword']?.updateValueAndValidity();
    customerForm.controls['eodURL']?.updateValueAndValidity();
  }
  showLicenseEndDateValidation(customerForm: FormGroup) {
    const licenseStartDate = customerForm.value['licenseStartDate'];
    const licenseEndDate = customerForm.value['licenseEndDate'];
    const subscriptionDate = customerForm.value['subscriptionDate'];

    if (licenseStartDate) {
      // Start date validation
      const startDate = new Date(licenseStartDate);
      const endDate = new Date(licenseEndDate);

      if (startDate >= endDate) {
        customerForm.controls['licenseStartDate'].setErrors([
          { something: true },
        ]);
        customerForm.controls['licenseEndDate'].setErrors([
          { something: true },
        ]);
      } else {
        customerForm.controls['licenseStartDate'].setErrors(null);
        customerForm.controls['licenseEndDate'].setErrors(null);
      }

      // Subscription date validation
      if (
        subscriptionDate &&
        (subscriptionDate <= startDate || subscriptionDate >= endDate)
      ) {
        customerForm.controls['subscriptionDate'].reset();
      }

      this.nextDayofStart = startDate.toISOString().substring(0, 10);
      this.sameDayofStart = startDate.toISOString().substring(0, 10);
      console.log(this.nextDayofStart, this.sameDayofStart);
      customerForm.controls['licenseEndDate'].enable();
      customerForm.controls['subscriptionDate'].enable();
      customerForm.controls['licenseEndDate'].setValidators([
        Validators.required,
      ]);
      customerForm.controls['licenseEndDate'].updateValueAndValidity();
    } else {
      customerForm.controls['licenseEndDate'].reset('');
      customerForm.controls['subscriptionDate'].disable();
      customerForm.controls['licenseEndDate'].disable();
      customerForm.controls['licenseEndDate'].clearValidators();
      customerForm.controls['licenseEndDate'].updateValueAndValidity();
    }
  }
}
