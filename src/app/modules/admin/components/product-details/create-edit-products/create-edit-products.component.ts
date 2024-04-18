import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  faCircleCheck,
  faCircleXmark,
  faArrowAltCircleLeft,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsService } from '../../../services/product-details.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDetails } from '../../../models/product-details.model';
import { ProductDetailsComponent } from '../product-details.component';
import { trimFormValues } from 'src/app/shared/services/form-trim.util';
import { SelectControlsService } from '../../../services/select-controls.service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
@Component({
  selector: 'app-create-edit-products',
  templateUrl: './create-edit-products.component.html',
  styleUrls: ['./create-edit-products.component.css'],
})
export class CreateEditProductsComponent {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faRefresh = faRefresh;
  createEditProductDetailsForm!: FormGroup;
  isDisabled: boolean = false;
  createUpdate!: string;
  weighingScalesList: any[] = [];
  statusList: any[] = [];
  weightUnitsList: any;
  currencyCodesList: any;
  countryCodesList: any;
  uomlist: any;
  fields: any = [];
  @Input('clientId') clientId!: number;
  @Input('orgId') orgId!: string;
  @Input('invOrgId') invOrgId!: string;
  productDetails: ProductDetails = new ProductDetails();
  constructor(
    private productDetailsService: ProductDetailsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private productDetailsComponent: ProductDetailsComponent,
    private controlService: SelectControlsService,
    private loadLookupsService: LoadLookupsService
  ) {}
  ngOnInit(): void {
    this.buildForm(new ProductDetails());
    this.fetchProductsLookupValues();
    this.loadLookupsService.getCountryCodes().subscribe((countryCodesList) => {
      this.countryCodesList = countryCodesList;
    });
    this.loadLookupsService
      .getCurrencyCodes()
      .subscribe((currencyCodesList) => {
        this.currencyCodesList = currencyCodesList;
      });
  }
  buildForm(model: any) {
    console.log('inside buildForm');
    const formGroupFields = this.getFormControlsFields(model);
    this.createEditProductDetailsForm = new FormGroup(formGroupFields);
  }
  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      let validations = [];
      switch (field) {
        case 'partId':
          validations.push(Validators.required, Validators.maxLength(500));
          break;
        case 'partNumber':
          validations.push(Validators.required, Validators.maxLength(500));
          break;
        case 'description':
          validations.push(Validators.required, Validators.maxLength(500));
          break;
        case 'quantity':
          validations.push(Validators.pattern('^[0-9]+(.[0-9]+)?$'));
          break;
        case 'quantityUnitCode':
          validations.push(Validators.maxLength(50));
          break;
        case 'eCCN':
          validations.push(Validators.maxLength(100));
          break;
        case 'htsCode':
          validations.push(Validators.maxLength(100));
          break;
        case 'listPrice':
          validations.push(Validators.pattern('^[0-9]+(.[0-9]+)?$'));
          break;
        case 'currencyCode':
          validations.push(Validators.maxLength(50));
          break;
        case 'weightUnitCode':
          validations.push(Validators.maxLength(50));
          break;
        case 'netWeight':
          validations.push(Validators.pattern('^[0-9]+(.[0-9]+)?$'));
          break;
        case 'status':
          validations.push(Validators.required);
          break;
        case 'unitValue':
          validations.push(Validators.pattern('^[0-9]+(.[0-9]+)?$'));
          break;
        case 'legalDesc':
          validations.push(Validators.maxLength(500));
          break;
        case 'productFamily':
          validations.push(Validators.maxLength(100));
          break;
        case 'countryOfOrigin':
          validations.push(Validators.maxLength(100));
          break;
        case 'listMainIcs':
          validations.push(Validators.maxLength(100));
          break;
        case 'encryption':
          validations.push(Validators.maxLength(10));
          break;
        case 'fpgasOrcplds':
          validations.push(Validators.maxLength(10));
          break;
        case 'wirelessFunction':
          validations.push(Validators.maxLength(10));
          break;
        case 'lotSerialNumber':
          validations.push(Validators.maxLength(100));
          break;
        case 'total':
          validations.push(Validators.pattern('^[0-9]+(.[0-9]+)?$'));
          break;
        case 'manualHold':
          validations.push(Validators.maxLength(10));
          break;
        case 'exportUom':
          validations.push(Validators.maxLength(50));
          break;
        case 'eodOrgCode':
          validations.push(Validators.maxLength(100));
          break;
        case 'companyCode':
          validations.push(Validators.maxLength(100));
          break;
        case 'licenseNumber':
          validations.push(Validators.maxLength(500));
          break;
        default:
          break;
      }
      formGroupFields[field] = new FormControl('', validations);
      this.fields.push(field);
    }
    return formGroupFields;
  }
  createEditProduct(productDetail: ProductDetails) {
    if (productDetail.productId) {
      this.createEditProductDetailsForm.patchValue(productDetail);
      this.createUpdate = 'Edit Product Details';
      this.isDisabled = true;
    } else {
      this.createEditProductDetailsForm.reset('');
      this.controlService.selectControls(this.createEditProductDetailsForm);
      this.createEditProductDetailsForm.controls['status'].setValue('Y');
      this.createUpdate = 'Create Product Details';
      this.isDisabled = false;
    }
  }
  //Method for saving the InvOrgDetails
  onSubmit() {
    trimFormValues(this.createEditProductDetailsForm);
    this.createEditProductDetailsForm.value['clientId'] = this.clientId;
    this.createEditProductDetailsForm.value['orgId'] = this.orgId;
    this.createEditProductDetailsForm.value['invOrgId'] = this.invOrgId;
    if (this.createEditProductDetailsForm.valid) {
      this.spinner.show();
      this.productDetailsService
        .saveProductDetails(this.createEditProductDetailsForm.value)
        .subscribe({
          next: (resp: any) => {
            this.productDetailsComponent.getProductDetails(
              this.invOrgId,
              this.orgId
            );
            this.spinner.hide();
            this.toastr.success(resp.message);
          },
          error: (error: any) => {
            this.toastr.error(error.error.code);
          },
        });
    }
  }
  resetForms() {
    this.createEditProductDetailsForm.reset();
    this.controlService.selectControls(this.createEditProductDetailsForm);
    this.createEditProductDetailsForm.controls['status'].setValue('Y');
  }
  get createEditProductDetailsFormControls() {
    return this.createEditProductDetailsForm.controls;
  }
  fetchProductsLookupValues() {
    this.productDetailsService.getProductsLookupValues().subscribe({
      next: (resp: any) => {
        this.weightUnitsList = resp.data.weightUnitsList;
        this.statusList = resp.data.statusList;
        this.uomlist = resp.data.uomList;
      },
      error: (error: any) => {},
    });
  }
}
