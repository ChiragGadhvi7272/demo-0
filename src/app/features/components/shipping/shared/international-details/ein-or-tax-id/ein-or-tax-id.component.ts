import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { InternationalDetailsComponent } from '../international-details.component';
import { SharedShippingUtilService } from 'src/app/features/services/shared-shipping-util.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
@Component({
  selector: 'app-ein-or-tax-id',
  templateUrl: './ein-or-tax-id.component.html',
  styleUrls: ['./ein-or-tax-id.component.css'],
})
export class EinOrTaxIdComponent implements OnInit {
  @Input() intlDutiesTaxesInfo!: FormGroup;
  @Input() paymethodsList!: any[];
  countryCodesList!: any[];
  eINDetails!: boolean;
  faChevronDown = faCaretDown;
  faChevronUp = faCaretUp;
 @Input() usppiIdList: any;

  constructor(
    private loadLookupsService: LoadLookupsService,
    private internationalDetails: InternationalDetailsComponent,
    private shippingUtilService: SharedShippingUtilService,
    private lookupValuesService: LookupValuesService
  ) { }
  ngOnInit(): void {
    this.eINDetails = false;
    

    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });

    this.shippingUtilService.paymethodSubject$.subscribe(
      (payMethod: String) => {
        if (this.intlDutiesTaxesInfo.get('payorType')?.value == '') {
          this.intlDutiesTaxesInfo.get('payorType')?.setValue(payMethod);
        }
      }
    );

    this.shippingUtilService._accountNumberSubject$.subscribe(
      (accountNumber: String) => {
        if (this.intlDutiesTaxesInfo.get('accountNumber')?.value == '') {
          this.intlDutiesTaxesInfo
            .get('accountNumber')
            ?.setValue(accountNumber);
        }
      }
    );
  }
  setValidatorsEin() {
    this.internationalDetails.setValidationsToEinTaxId();
  }

  toggleeInDetails() {
    this.eINDetails = !this.eINDetails;
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
