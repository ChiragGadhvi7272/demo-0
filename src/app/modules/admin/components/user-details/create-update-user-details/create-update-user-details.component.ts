import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import { UserDetailsService } from '../../../services/user-details.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShipFromLocations } from '../../../models/ship-from-locations.model';
import { UserDetailsComponent } from '../user-details.component';
import { UserDetails } from '../../../models/user-details.model';
import { SelectControlsService } from '../../../services/select-controls.service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';
@Component({
  selector: 'app-create-update-user-details',
  templateUrl: './create-update-user-details.component.html',
  styleUrls: ['./create-update-user-details.component.css'],
})
export class CreateUpdateUserDetailsComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faArrowAltCircleLeft = faArrowsRotate;
  createUpdateUsersForm!: FormGroup;
  createUpdate!: string;
  weighingScaleNamesList!: any[];
  shipperNamesList!: any[];
  invDetailsList!: any[];
  statusList!: any[];
  userRolesList!: any[];
  shipFromLocationsList!: any[];
  filteredShipFromLocationsList: ShipFromLocations[] = [];
  filteredShipperNamesList: Array<any> = [];
  invOrgRequired: boolean = false;
  userDetails: UserDetails = new UserDetails();
  defaultSelect!: boolean;
  @Input('clientId') clientId!: number;
  @Input('erpType') erpType!: string;
  @Input('documentStorageApiFlag') documentStorageApiFlag!: boolean;
  @Input('mobileAppAccessFlag') mobileAppAccessFlag!: boolean;
  isDisabled!: boolean;
  fields: any = [];
  invOrgIdNameLabel: any;
  constructor(
    private userDetailsService: UserDetailsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userDetailsComponent: UserDetailsComponent,
    private controlService: SelectControlsService,
    private configService: ConfigurationLoaderService
  ) {}
  ngOnInit(): void {
    this.getUserLookupValues(this.clientId);
    this.buildForm(new UserDetails());
    this.defaultSelect = true;
    this.configService.getConfiguration().subscribe((config) => {
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
  }
  buildForm(model: any) {
    const formGroupFields = this.getFormControlsFields(model);
    this.createUpdateUsersForm = new FormGroup(formGroupFields);
  }
  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      const validations = this.getValidatorsForField(field, this.erpType);
      formGroupFields[field] = new FormControl(obj[field], validations);
      this.fields.push(field);
    }
    return formGroupFields;
  }
  getValidatorsForField(fieldName: string, erpType: string) {
    const validations = [];
    switch (fieldName) {
      case 'userName':
        validations.push(
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
        );
        break;
      case 'password':
        validations.push(
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&#].{7,}'
          )
        );
        break;
      case 'roleId':
        validations.push(Validators.required);
        break;
      case 'emailId':
        validations.push(
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.maxLength(100)
        );
        break;
      case 'status':
        validations.push(Validators.required);
        break;
      case 'firstName':
        validations.push(
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
        );
        break;
      case 'lastName':
        validations.push(
          Validators.maxLength(100),
          Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
        );
        break;
      case 'zplPrinter':
      case 'gifPrinter':
      case 'op900Printer':
      case 'pdfPrinter':
      case 'dgFormPrinter':
        if (erpType != 'EBS') {
          validations.push(Validators.maxLength(200));
        }
        break;
      case 'userTokenId':
      case 'userTokenSecret':
        if (erpType === 'NS') {
          validations.push(
            Validators.maxLength(100),
            Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$')
          );
        }
        break;
      case 'oracleResponsibilityId':
      case 'oracleUserId':
        if (erpType === 'EBS') {
          validations.push(Validators.min(0));
        }
        break;
      default:
        break;
    }
    return validations;
  }
  onRoleChange(roleId: any) {
    if (roleId == 4) {
      this.createUpdateUsersFormControls['invOrgId']?.setValidators([
        Validators.required,
      ]);
      this.invOrgRequired = true;
    } else {
      this.createUpdateUsersFormControls['invOrgId']?.clearValidators();
      this.invOrgRequired = false;
    }
    this.createUpdateUsersFormControls['invOrgId']?.updateValueAndValidity();
  }
  getUserDetails(userDetails: UserDetails) {
    if (userDetails.userName) {
      this.createUpdateUsersForm.patchValue(userDetails);
      this.createUpdate = 'Edit User';
      this.onInvOrgChange(userDetails.invOrgId);
      this.isDisabled = true;
    } else {
      this.createUpdateUsersForm.reset();
      this.controlService.selectControls(this.createUpdateUsersForm);
      this.createUpdateUsersForm.controls['userId'].setValue('');
      this.createUpdateUsersForm.controls['clientId'].setValue(this.clientId);
      this.createUpdateUsersForm.controls['status'].setValue('Y');
      this.createUpdateUsersForm.controls['superUser'].setValue(false);
      this.defaultSelect = true;
      this.createUpdate = 'Create User';
      this.isDisabled = false;
    }
  }
  get createUpdateUsersFormControls() {
    return this.createUpdateUsersForm.controls;
  }
  getUserLookupValues(clientId: number) {
    this.userDetailsService.getUserLookupValues(clientId).subscribe({
      next: (resp: any) => {
        this.invDetailsList = resp.data.invDetailsList;
        this.shipFromLocationsList = resp.data.shipFromLocationsList;
        this.shipperNamesList = resp.data.shipperNamesList;
        this.statusList = resp.data.statusList;
        this.userRolesList = resp.data.userRolesList;
        this.weighingScaleNamesList = resp.data.weighingScaleNamesList;
      },
      error: (error) => {},
    });
  }
  //To save the user details
  onSubmit() {
    this.patchFormData(this.createUpdateUsersForm.value);
    if (this.createUpdateUsersForm.valid) {
      this.spinner.show();
      this.userDetails = this.createUpdateUsersForm.value;
      let selectedInvOrgId = this.createUpdateUsersForm.value['invOrgId'];
      if (selectedInvOrgId) {
        this.invDetailsList.forEach((invOrg: any) => {
          if (invOrg.invOrgId == selectedInvOrgId)
            this.userDetails.orgId = invOrg.orgId;
        });
      } else {
        this.userDetails.invOrgId = '0';
        this.userDetails.orgId = '0';
      }
      this.userDetailsService.saveUserDetails(this.userDetails).subscribe({
        next: (resp: any) => {
          if (resp.code == 200) {
            this.userDetailsComponent.getUserDetails();
            this.spinner.hide();
            this.toastr.success(resp.message);
          } else {
            this.spinner.hide();
            this.toastr.error(resp.message);
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
    } else {
      this.createUpdateUsersForm.markAllAsTouched();
    }
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
  //To get Ship From Locations and Shipper Names List
  onInvOrgChange(invOrg: any) {
    if (this.shipFromLocationsList != null) {
      this.filteredShipFromLocationsList = [];
      this.shipFromLocationsList.forEach((shipFromLocation: any) => {
        if (shipFromLocation.invOrgId == invOrg) {
          this.filteredShipFromLocationsList.push(shipFromLocation);
        }
      });
    }
    if (this.shipperNamesList != null) {
      this.shipperNamesList.forEach((shipperName: any) => {
        if (shipperName.invOrgId == invOrg) {
          this.filteredShipperNamesList.push(shipperName);
        }
      });
    }
  }
  resetForms() {
    this.createUpdateUsersForm.reset();
    this.controlService.selectControls(this.createUpdateUsersForm);
    this.createUpdateUsersForm.controls['status'].setValue('Y');
    this.createUpdateUsersForm.controls['superUser'].setValue(false);
  }
  patchFormData(data: any) {
    Object.keys(data).forEach((controlName) => {
      const controlValue = data[controlName];
      if (controlValue !== null && controlValue !== undefined) {
        console.log('controlName :: ', controlName);
        console.log(
          'this.createUpdateUsersForm.get(controlName)?.valid :: ',
          this.createUpdateUsersForm.get(controlName)?.valid
        );
      }
    });
  }
}
