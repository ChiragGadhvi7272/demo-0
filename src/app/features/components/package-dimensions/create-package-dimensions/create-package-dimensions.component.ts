import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DimensionsInfo } from 'src/app/features/models/dimensions-info.model';
import { PackageDimensionsService } from 'src/app/features/services/package-dimensions.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { PackageDimensionsComponent } from '../package-dimensions.component';
@Component({
  selector: 'app-create-package-dimensions',
  templateUrl: './create-package-dimensions.component.html',
  styleUrls: ['./create-package-dimensions.component.css'],
})
export class CreatePackageDimensionsComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faRefresh = faRefresh;
  createEditPackageDimensionsForm!: FormGroup;
  createUpdate!: string;
  @Input('clientId') clientId!: number;
  @Input('orgId') orgId!: string;
  @Input('invOrgId') invOrgId!: string;
  dimensionUnitsList: any;
  weightUnitsList: any;
  // dimensionsInfo!: DimensionsInfo;
  isDisabled!: boolean;
  dimensionsInfo: DimensionsInfo = new DimensionsInfo();
  readonly NoWhitespaceRegExp: RegExp = new RegExp(
    '^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$'
  );
  fields: any = [];
  constructor(
    private packageDimensionsService: PackageDimensionsService,
    private lookupValuesService: LookupValuesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private packageDimensionsComponent: PackageDimensionsComponent
  ) {}
  ngOnInit(): void {
    this.buildForm(new DimensionsInfo());
    this.getDimensionUnitsList();
    this.getWeightUnitsList();
  }
  buildForm(model: any) {
    // console.log('inside buildForm');
    const formGroupFields = this.getFormControlsFields(model);
    this.createEditPackageDimensionsForm = new FormGroup(formGroupFields);
    // console.log(this.createEditInvDetailsForm)
  }
  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      //Form validation
      let validations = [];
      switch (field) {
        case 'dimensionName':
          validations.push(
            Validators.required,
            Validators.maxLength(100),
            Validators.pattern(this.NoWhitespaceRegExp)
          );
          break;
        case 'dimensionLength':
          validations.push(
            Validators.required,
            Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')
          );
          break;
        case 'dimensionWidth':
          validations.push(
            Validators.required,
            Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')
          );
          break;
        case 'dimensionHeight':
          validations.push(
            Validators.required,
            Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')
          );
          break;
        case 'dimensionUnits':
          validations.push(Validators.required);
          break;
        case 'dimensionWeight':
          validations.push(Validators.pattern('^[0-9]+(.[0-9]{0,3})?$'));
          break;
        default:
          break;
      }
      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }
    return formGroupFields;
  }
  getPackageDimenstionDetails(dimensionsInfo: DimensionsInfo) {
    if (dimensionsInfo.dimensionId) {
      this.createEditPackageDimensionsForm.patchValue(dimensionsInfo);
      this.createUpdate = 'Edit Package Dimension Details';
      this.isDisabled = true;
    } else {
      this.createEditPackageDimensionsForm.reset('');
      this.createUpdate = 'Create Package Dimension Details';
      this.isDisabled = false;
      this.createEditPackageDimensionsFormControls['dimensionUnits'].setValue(
        ''
      );
      this.createEditPackageDimensionsFormControls['weightUnits'].setValue('');
    }
  }
  onSubmit() {
    if (this.createEditPackageDimensionsForm.valid) {
      this.spinner.show();
      this.dimensionsInfo = this.createEditPackageDimensionsForm.value;
      this.dimensionsInfo.clientId = this.clientId;
      this.packageDimensionsService
        .createOrEditPackageDimensions(this.dimensionsInfo)
        .subscribe({
          next: (resp: any) => {
            if (resp.code == 200) {
              console.log(
                'this.orgId  ' + this.orgId + '  this.invOrgId' + this.invOrgId
              );
              this.packageDimensionsComponent.getPackageDimensionDetailsList(
                this.clientId,
                this.orgId,
                this.invOrgId
              );
              this.spinner.hide();
              this.toastr.success(resp.message);
            } else {
              this.spinner.hide();
              this.toastr.error(resp.message);
            }
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error(error.error.status);
          },
        });
    } else {
      this.createEditPackageDimensionsForm.markAllAsTouched();
    }
  }
  getDimensionUnitsList() {
    this.lookupValuesService.getLookUps('DIM_WEIGHT_UNITS', 'ALL').subscribe({
      next: (resp: any) => {
        this.dimensionUnitsList = resp.data;
      },
      error: (error) => {},
    });
  }
  getWeightUnitsList() {
    this.lookupValuesService.getLookUps('DEFAULT_UOM', 'ALL').subscribe({
      next: (resp: any) => {
        this.weightUnitsList = resp.data;
      },
      error: (error) => {},
    });
  }
  get createEditPackageDimensionsFormControls() {
    return this.createEditPackageDimensionsForm.controls;
  }
  resetForms() {
    this.createEditPackageDimensionsForm.reset();
    this.createEditPackageDimensionsFormControls['dimensionUnits'].setValue('');
    this.createEditPackageDimensionsFormControls['weightUnits'].setValue('');
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
