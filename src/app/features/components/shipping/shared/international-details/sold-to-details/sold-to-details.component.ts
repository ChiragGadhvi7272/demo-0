import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { InternationalDetailsComponent } from '../international-details.component';

@Component({
  selector: 'app-sold-to-details',
  templateUrl: './sold-to-details.component.html',
  styleUrls: ['./sold-to-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoldToDetailsComponent implements OnInit, OnChanges {
  constructor(
    private loadLookupsService: LoadLookupsService,
    private internationalDetails: InternationalDetailsComponent,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes in the soldTODetails', changes);
    this.internationalDetails.ciFlagSubject.subscribe((ciFlag) => {
      this.ciDetailsFlag = ciFlag;
      this.cdr.detectChanges();
    });
  }
  ciDetailsFlag!: boolean;
  soldToDetailsFlag!: boolean;
  faChevronDown = faCaretDown;
  faChevronUp = faCaretUp;
  @Input() intlSoldToInfo!: FormGroup;
  countryCodesList!: any[];

  ngOnInit(): void {
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });

    this.soldToDetailsFlag = false;
  }

  toggleSoldTo() {
    this.soldToDetailsFlag = !this.soldToDetailsFlag;
  }

  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
