import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';

@Component({
  selector: 'app-destination-address',
  templateUrl: './destination-address.component.html',
  styleUrls: ['./destination-address.component.css'],
})
export class DestinationAddressComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  @Input() shipToAddrInfo!: FormGroup;
  @Input() shipFlag!: boolean;
  @Input() editFlag!: boolean;
  @Input() isEdit!: boolean;
  @Output() updateDestinationEvent = new EventEmitter<any>();
  countryCodesList!: any;

  constructor(private loadLookupsService: LoadLookupsService) {}

  ngOnInit() {
    this.shipToAddrInfoControls;
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
  }

  get shipToAddrInfoControls() {
    return this.shipToAddrInfo.controls;
  }

  updateDetails() {
    this.updateDestinationEvent.emit(true);
  }
}
