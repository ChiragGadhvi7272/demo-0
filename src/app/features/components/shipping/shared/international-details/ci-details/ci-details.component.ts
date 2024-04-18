import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { InternationalDetailsComponent } from '../international-details.component';

@Component({
  selector: 'app-ci-details',
  templateUrl: './ci-details.component.html',
  styleUrls: ['./ci-details.component.css'],
})
export class CiDetailsComponent implements OnInit, OnChanges {
  constructor(
    private sharedUtilService: SharedUtilService,
    private loadLookupsService: LoadLookupsService,
    private internationationDetails: InternationalDetailsComponent
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes in the CiDetails', changes);
    this.intlCiInfo
      .get('invoiceDate')
      ?.setValue(
        this.sharedUtilService.extractDate(
          this.intlCiInfo.get('invoiceDate')?.value
        )
      );
  }
  ciDetailsFlag!: boolean;
  toggleCiDetailsFlag!: boolean;
  faChevronDown = faCaretDown;
  faChevronUp = faCaretUp;
  currencyCodesList!: any[];

  @Input() intlCiInfo!: FormGroup;
  @Input() reasonForExportList!: any[];
  @Input() termsOfSaleList!: any[];

  ngOnInit(): void {
    this.toggleCiDetailsFlag = false;
    this.loadLookupsService
      .getCurrencyCodes()
      .subscribe((currencyCodesList) => {
        this.currencyCodesList = currencyCodesList;
      });
    this.internationationDetails.ciFlagSubject.subscribe((ciFlag) => {
      this.ciDetailsFlag = ciFlag;
    });
  }

  trackByFn(index: number, option: any): number {
    return option.id;
  }

  toggleCI() {
    this.toggleCiDetailsFlag = !this.toggleCiDetailsFlag;
  }
}
