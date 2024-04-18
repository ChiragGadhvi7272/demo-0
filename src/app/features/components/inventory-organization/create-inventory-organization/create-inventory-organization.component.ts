import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InventoryOrganization } from 'src/app/features/models/inventory-organization.model';
import { InventoryOrganizationService } from 'src/app/features/services/inventory-organization.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { InventoryOrganizationComponent } from '../inventory-organization.component';
import { trimFormValues } from 'src/app/shared/services/form-trim.util';
import { SelectControlsService } from 'src/app/modules/admin/services/select-controls.service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';
@Component({
  selector: 'app-create-inventory-organization',
  templateUrl: './create-inventory-organization.component.html',
  styleUrls: ['./create-inventory-organization.component.css'],
})
export class CreateInventoryOrganizationComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faRefresh = faRefresh;
  createEditInvDetailsForm!: FormGroup;
  createUpdate!: string;
  weighingScalesList: any[] = [];
  statusList: any[] = [];
  isSCUser!: boolean;
  isEdit: boolean = false;
  fields: any = [];
  inventoryOrganization: InventoryOrganization = new InventoryOrganization();
  @Input('clientId') clientId!: number;
  @Input('roleId') roleId!: number;
  orgIdLabel: any;
  invOrgIdLabel: any;
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  constructor(
    private inventoryOrganizationService: InventoryOrganizationService,
    private lookupValuesService: LookupValuesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private inventoryOrganizationComponent: InventoryOrganizationComponent,
    private controlService: SelectControlsService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.buildForm(new InventoryOrganization());
    this.getLookupsList();
    if (this.roleId == 2) {
      this.orgIdLabel = 'Org Id';
      this.invOrgIdLabel = 'Organization ID';
      this.orgIdNameLabel = 'Operating Unit';
      this.invOrgIdNameLabel = 'Organization Name';
    } else {
      this.configService.getConfiguration().subscribe((config) => {
        this.orgIdLabel = config?.orgIdLabel;
        this.invOrgIdLabel = config?.invOrgIdLabel;
        this.orgIdNameLabel = config?.orgIdNameLabel;
        this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
      });
    }
  }
  buildForm(model: any) {
    const formGroupFields = this.getFormControlsFields(model);
    this.createEditInvDetailsForm = new FormGroup(formGroupFields);
  }
  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      //Form validation
      let validations = [];
      switch (field) {
        case 'orgName':
          validations.push(Validators.required, Validators.maxLength(300));
          break;
        case 'orgId':
          validations.push(Validators.required, Validators.maxLength(250));
          break;
        case 'invOrgName':
          validations.push(Validators.required, Validators.maxLength(300));
          break;
        case 'invOrgId':
          validations.push(Validators.required, Validators.maxLength(250));
          break;
        case 'status':
          validations.push(Validators.required);
          break;
        default:
          break;
      }
      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }
    return formGroupFields;
  }
  //To get the Invetory Details
  getInvDetails(inventoryOrganization: InventoryOrganization) {
    if (inventoryOrganization.clientId && this.roleId == 3) {
      this.isSCUser = false;
      this.createUpdate = 'Edit Inventory Organization Details';
      this.createEditInvDetailsForm.patchValue(inventoryOrganization);
      this.isEdit = true;
    } else if (inventoryOrganization.clientId && this.roleId == 2) {
      this.isSCUser = true;
      this.createEditInvDetailsFormControls['orgName'].disable();
      this.createEditInvDetailsFormControls['orgId'].disable();
      this.createEditInvDetailsFormControls['invOrgName'].disable();
      this.createEditInvDetailsFormControls['invOrgId'].disable();
      this.createEditInvDetailsFormControls['status'].disable();
      this.createEditInvDetailsFormControls['weighingScaleName'].disable();
      this.createUpdate = 'Inventory Organization Details';
      this.createEditInvDetailsForm.patchValue(inventoryOrganization);
      this.isEdit = true;
    } else {
      this.createEditInvDetailsForm.reset();
      this.controlService.selectControls(this.createEditInvDetailsForm);
      this.createEditInvDetailsFormControls['status'].setValue('Y');
      this.createUpdate = 'Create Inventory Organization';
      this.isSCUser = false;
      this.isEdit = false;
    }
  }
  getLookupsList() {
    this.lookupValuesService.getLookUps('WEIGHING_SCALE', 'ALL').subscribe({
      next: (resp: any) => {
        this.weighingScalesList = resp.data;
      },
      error: (error) => {},
    });
    this.lookupValuesService.getLookUps('STATUS', 'ALL').subscribe({
      next: (resp: any) => {
        this.statusList = resp.data;
      },
      error: (error) => {},
    });
  }
  //Method for saving the InvOrgDetails
  onSubmit(actionType: string) {
    if (this.createEditInvDetailsForm.valid) {
      trimFormValues(this.createEditInvDetailsForm);
      this.spinner.show();
      this.inventoryOrganization = this.createEditInvDetailsForm.value;
      this.inventoryOrganization.clientId = this.clientId;
      this.inventoryOrganizationService
        .createUpdateInvOrgDetails(this.inventoryOrganization, actionType)
        .subscribe({
          next: (resp: any) => {
            console.log(resp.data, this.clientId);
            if (resp.code == 200) {
              this.toastr.success(resp.message);
              this.inventoryOrganizationComponent.getInventoryOrgList(
                this.clientId
              );
              this.spinner.hide();
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
      this.createEditInvDetailsForm.markAllAsTouched();
    }
  }
  get createEditInvDetailsFormControls() {
    return this.createEditInvDetailsForm.controls;
  }
  resetForms() {
    this.createEditInvDetailsForm.reset();
    this.controlService.selectControls(this.createEditInvDetailsForm);
    this.createEditInvDetailsFormControls['status'].setValue('Y');
  }

  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
