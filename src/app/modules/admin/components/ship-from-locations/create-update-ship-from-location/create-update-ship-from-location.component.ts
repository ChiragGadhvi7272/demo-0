import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { ShipFromLocations } from '../../../models/ship-from-locations.model';
import { ShipFromLocationsService } from '../../../services/ship-from-locations.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShipFromLocationsComponent } from '../ship-from-locations.component';
import { trimFormValues } from 'src/app/shared/services/form-trim.util';
import { SelectControlsService } from '../../../services/select-controls.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-create-update-ship-from-location',
  templateUrl: './create-update-ship-from-location.component.html',
  styleUrls: ['./create-update-ship-from-location.component.css'],
})
export class CreateUpdateShipFromLocationComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faRefresh = faRefresh;
  shipFromLocations!: ShipFromLocations;
  createUpdateShipFromLocationForm!: FormGroup;
  countryCodesList!: any;
  locationId!: number;
  isDisabled: boolean = false;
  createUpdate!: String;
  @Input('clientId') clientId!: number;
  @Input('orgId') orgId!: string;
  @Input('invOrgId') invOrgId!: string;
  shipperNamesList: any;
  fdxeAccountNumersList: any;
  fdxgAccountNumersList: any;
  upsAccountNumersList: any;
  dhlAccountNumersList: any;
  defaultSelect!: boolean;
  fields: any = [];
  phoneNumberPattern =
    /^(\+[1-9][0-9]{0,2}\s?)?[1-9][0-9]{9}$|^\(\d{3}\)\s?[1-9][0-9]{2}\s?[0-9]{4}$|^[1-9][0-9]{2}\s?[1-9][0-9]{2}\s?[0-9]{4}$/;

  constructor(
    private shipFromLocationsService: ShipFromLocationsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private shipFromLocationsComponent: ShipFromLocationsComponent,
    private controlService: SelectControlsService,
    private loadLookupsService: LoadLookupsService
  ) {}

  ngOnInit(): void {
    this.defaultSelect = true;
    this.buildForm(new ShipFromLocations());
    this.getShipFromLookupValues();
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
  }

  buildForm(model: any) {
    const formGroupFields = this.getFormControlsFields(model);
    this.createUpdateShipFromLocationForm = new FormGroup(formGroupFields);
  }

  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      let validations = [];
      switch (field) {
        case 'locationName':
          validations.push(Validators.required, Validators.maxLength(240));
          break;
        case 'address1':
          validations.push(Validators.required, Validators.maxLength(240));
          break;
        case 'address2':
          validations.push(Validators.maxLength(240));
          break;
        case 'address3':
          validations.push(Validators.maxLength(240));
          break;
        case 'address4':
          validations.push(Validators.maxLength(240));
          break;
        case 'city':
          validations.push(Validators.required, Validators.maxLength(60));
          break;
        case 'stateProvinceCode':
          validations.push(Validators.required, Validators.maxLength(2));
          break;
        case 'postalCode':
          validations.push(
            Validators.required,
            Validators.maxLength(60),
            Validators.pattern(/^[a-zA-Z0-9\s]*$/)
          );
          break;
        case 'countryCode':
          validations.push(Validators.required);
          break;
        case 'contactName':
          validations.push(
            Validators.required,
            Validators.maxLength(200),
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
        case 'companyName':
          validations.push(
            Validators.required,
            Validators.maxLength(200),
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
        case 'phoneNumber':
          validations.push(
            Validators.required,
            Validators.pattern(this.phoneNumberPattern)
          );
          break;
        case 'emailId':
          validations.push(
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            Validators.maxLength(100)
          );
          break;
        default:
          validations.push();
          break;
      }

      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }

    return formGroupFields;
  }

  createEditShipFromLocationDetails(shipFromLocations: ShipFromLocations) {
    if (shipFromLocations.locationId) {
      this.isDisabled = true;
      this.createUpdateShipFromLocationForm.patchValue(shipFromLocations);
      this.createUpdate = 'Edit Ship From Location Details';
    } else {
      this.createUpdateShipFromLocationForm.reset('');
      this.controlService.selectControls(this.createUpdateShipFromLocationForm);
      this.createUpdate = 'Create Ship From Location';
      this.isDisabled = false;
      this.defaultSelect = true;
    }
  }

  getShipFromLookupValues() {
    this.shipFromLocationsService
      .getShipFromLookupValues(this.clientId, this.orgId, this.invOrgId)
      .subscribe({
        next: (resp: any) => {
          this.shipperNamesList = resp.data.shipperNamesList;
          this.fdxeAccountNumersList = resp.data.fdxeAccountNumersList;
          this.fdxgAccountNumersList = resp.data.fdxgAccountNumersList;
          this.upsAccountNumersList = resp.data.upsAccountNumersList;
          this.dhlAccountNumersList = resp.data.dhlAccountNumersList;
        },
        error: (error: any) => {},
      });
  }

  onSubmit() {
    trimFormValues(this.createUpdateShipFromLocationForm);
    if (this.createUpdateShipFromLocationForm.valid) {
      this.spinner.show();
      this.shipFromLocations = this.createUpdateShipFromLocationForm.value;
      this.shipFromLocations.clientId = this.clientId;
      this.shipFromLocations.orgId = this.orgId;
      this.shipFromLocations.invOrgId = this.invOrgId;
      this.shipFromLocationsService
        .saveShipFromLocationDetails(this.shipFromLocations)
        .subscribe({
          next: (resp: any) => {
            this.toastr.success(resp.message);
            this.shipFromLocationsComponent.getShipFromLocations(
              this.clientId,
              this.orgId,
              this.invOrgId
            );
            this.spinner.hide();
          },
          error: (error: any) => {
            this.toastr.error(error.error.status);
            this.spinner.hide();
          },
        });
    } else {
      this.createUpdateShipFromLocationForm.markAllAsTouched();
      this.toastr.error(
        'Please provide mandatory details .Please recheck popups'
      );
    }
  }

  get createUpdateShipFromLocationFormControls() {
    return this.createUpdateShipFromLocationForm.controls;
  }

  resetForms() {
    this.createUpdateShipFromLocationForm.reset();
    this.controlService.selectControls(this.createUpdateShipFromLocationForm);
  }
}
