import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-cod',
  templateUrl: './cod.component.html',
  styleUrls: ['./cod.component.css'],
})
export class CodComponent implements OnInit {
  @Input() codInfo!: FormGroup;
  @Input() codFundsCodeList!: any;
  currencyCodesList!: any;
  constructor(private loadLookupsService: LoadLookupsService) {}
  ngOnInit(): void {
    this.loadLookupsService
      .getCurrencyCodes()
      .subscribe((currencyCodesList) => {
        this.currencyCodesList = currencyCodesList;
      });
  }
  showAccordion(event: any) {
    if (event.target.checked) {
      this.codInfoControls['amount'].setValidators(Validators.required);
    } else {
      this.codInfo.reset();
      this.codInfoControls['amount'].removeValidators(Validators.required);
    }
    this.codInfoControls['amount'].updateValueAndValidity();
  }
  get codInfoControls() {
    return this.codInfo.controls;
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
