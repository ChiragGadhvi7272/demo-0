import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faPlusCircle,
  faArrowCircleLeft,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ShipToLocations } from '../../../models/ship-to-locations.model';
import { ShipToLocationsService } from '../../../services/ship-to-locations.service';
import { ShipToLocationsComponent } from '../ship-to-locations.component';
import { trimFormValues } from 'src/app/shared/services/form-trim.util';
import { SelectControlsService } from '../../../services/select-controls.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-create-update-ship-to-location-details',
  templateUrl: './create-update-ship-to-location-details.component.html',
  styleUrls: ['./create-update-ship-to-location-details.component.css'],
})
export class CreateUpdateShipToLocationDetailsComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faArrowCircleLeft = faArrowCircleLeft;
  faPlusCircle = faPlusCircle;
  faRefresh = faRefresh;
  createUpdateShipToLocationForm!: FormGroup;
  companyNamesList: any;
  countryCodesList: any;
  isDisabled: boolean = false;
  createUpdate!: string;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  shipToLocations!: ShipToLocations;
  showNewCompanyInput: boolean = true;
  fields: any = [];
  phoneNumberPattern =
    /^(\+[1-9][0-9]{0,2}\s?)?[1-9][0-9]{9}$|^\(\d{3}\)\s?[1-9][0-9]{2}\s?[0-9]{4}$|^[1-9][0-9]{2}\s?[1-9][0-9]{2}\s?[0-9]{4}$/;

  constructor(
    private shipToLocationsService: ShipToLocationsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private shipToLocationsComponent: ShipToLocationsComponent,
    private controlService: SelectControlsService,
    private loadLookupsService: LoadLookupsService
  ) {}

  ngOnInit(): void {
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.buildForm(new ShipToLocations());
  }

  buildForm(model: any) {
    // console.log('inside buildForm');
    const formGroupFields = this.getFormControlsFields(model);
    this.createUpdateShipToLocationForm = new FormGroup(formGroupFields);
    // console.log('this.createUpdateShipToLocationForm',this.createUpdateShipToLocationForm);
  }

  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      let validations = [];
      switch (field) {
        case 'companyName':
          validations.push(
            Validators.required,
            Validators.maxLength(250),
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
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
        case 'postalCode':
          validations.push(
            Validators.required,
            Validators.maxLength(60),
            Validators.pattern(/^[a-zA-Z0-9\s]*$/)
          );
          break;
        case 'phoneNumber':
          validations.push(
            Validators.required,
            Validators.pattern(this.phoneNumberPattern)
          );
          break;
        case 'stateProvinceCode':
          validations.push(Validators.required, Validators.maxLength(2));
          break;
        case 'emailId':
          validations.push(
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          );
          break;
        case 'countryCode':
          validations.push(Validators.required);
          break;
        case 'contactName':
          validations.push(
            Validators.required,
            Validators.pattern("^[a-zA-Z -']+")
          );
          break;
      }

      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }

    return formGroupFields;
  }

  getCompanyName(clientId: number, orgId: string, invOrgId: string) {
    console.log('inside getCompanyName' + clientId, orgId, invOrgId);
    this.shipToLocationsService
      .getCompanyNames(clientId, orgId, invOrgId)
      .subscribe({
        next: (resp: any) => {
          this.companyNamesList = resp.data;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  createUpdateShipToLocationDetails(
    shipToLocations: ShipToLocations,
    clientId: number,
    orgId: string,
    invOrgId: string
  ) {
    this.getCompanyName(clientId, orgId, invOrgId);
    this.clientId = clientId;
    this.orgId = orgId;
    this.invOrgId = invOrgId;
    console.log(shipToLocations);
    console.log(this.clientId);
    console.log(this.orgId);
    console.log(this.invOrgId);
    if (shipToLocations.locationId) {
      this.createUpdateShipToLocationForm.patchValue(shipToLocations);
      this.isDisabled = true;
      this.createUpdate = 'Edit Address';
    } else {
      this.createUpdateShipToLocationForm.reset('');
      this.controlService.selectControls(this.createUpdateShipToLocationForm);
      this.createUpdate = 'Create Address';
      this.isDisabled = false;
    }
  }

  //onSubmit is triggered when the button are clicked on the shipToLocation UI page
  onSubmit() {
    trimFormValues(this.createUpdateShipToLocationForm);
    if (this.createUpdateShipToLocationForm.valid) {
      this.spinner.show();
      this.shipToLocations = this.createUpdateShipToLocationForm.value;
      this.shipToLocations.clientId = this.clientId;
      this.shipToLocations.orgId = this.orgId;
      this.shipToLocations.invOrgId = this.invOrgId;
      this.shipToLocationsService
        .saveShipToLocationDetails(this.shipToLocations)
        .subscribe({
          next: (resp: any) => {
            this.shipToLocationsComponent.getShipToLocations(
              this.clientId,
              this.orgId,
              this.invOrgId
            );
            this.spinner.hide();
            this.toastr.success(resp.message);
          },
          error: (error: any) => {
            this.toastr.error(error.error.status);
            this.spinner.hide();
          },
        });
    } else {
      this.createUpdateShipToLocationForm.markAllAsTouched();
      this.toastr.error(
        'Please provide mandatory details .Please recheck popups'
      );
    }
  }

  get createUpdateShipToLocationFormControls() {
    return this.createUpdateShipToLocationForm.controls;
  }

  resetForms() {
    this.createUpdateShipToLocationForm.reset();
    this.controlService.selectControls(this.createUpdateShipToLocationForm);
  }

  addNewCustomer(value: string) {
    if (value == '') {
      this.showNewCompanyInput = true;
      this.createUpdateShipToLocationFormControls['companyName'].reset('');
    } else {
      this.showNewCompanyInput = false;
      this.createUpdateShipToLocationFormControls['companyName'].reset('');
    }
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
