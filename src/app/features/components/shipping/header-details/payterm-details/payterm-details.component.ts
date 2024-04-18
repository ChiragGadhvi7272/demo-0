import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-payterm-details',
  templateUrl: './payterm-details.component.html',
  styleUrls: ['./payterm-details.component.css'],
})
export class PaytermDetailsComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  @Input() paytermInfo!: FormGroup;
  countryCodesList: any;
  payMethod: any;
  carrierCode: any;
  carrierMode!: any;
  constructor(private loadLookupsService: LoadLookupsService) {}
  ngOnInit(): void {
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
  }

  loadPaytermValues(
    paytermInfo: FormGroup,
    payMethod: string,
    carrierCode: any,
    carrierMode: any
  ) {
    this.paytermInfo = paytermInfo;
    this.payMethod = payMethod;
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;
  }
}
