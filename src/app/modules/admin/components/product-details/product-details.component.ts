import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCircleUp,
  faEdit,
  faFileImport,
  faCircleCheck,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { ProductDetails } from '../../models/product-details.model';
import { ProductDetailsService } from '../../services/product-details.service';
import { PaginationInstance } from 'ngx-pagination';
import { CreateEditProductsComponent } from './create-edit-products/create-edit-products.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetailsList: ProductDetails[] = [];
  productDetails: ProductDetails = new ProductDetails();
  productDetailsForm!: FormGroup;
  showTable: boolean = false;
  operatingUnitList: any;
  organizationList: any;
  faCircleUp = faCircleUp;
  faCircleCheck = faCircleCheck;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faEdit = faEdit;
  faFile = faFileImport;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  role!: any;
  userData: any;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  @ViewChild(CreateEditProductsComponent)
  createEditProductsComponent!: CreateEditProductsComponent;
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  tableHeight!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productDetailsService: ProductDetailsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private lookupValuesService: LookupValuesService,
    private localStorageService: LocalStorageService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userData = this.localStorageService.getLocalUserData();
    this.clientId = this.userData.clientId;
    this.showTable = false;
    this.productDetailsValidations();
    this.getOperatingUnitList();
    this.productDetailsFormControls['organization']?.disable();
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
  }

  productDetailsValidations() {
    this.productDetailsForm = this.fb.group({
      operatingUnit: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      changeRows: ['10'],
    });
  }
  showNoOfRows() {
    let noOfRows = this.productDetailsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.productDetailsList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }
  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }
  //get OperatingUnit LOV values
  getOperatingUnitList() {
    this.lookupValuesService.getOrganizationsList(this.clientId).subscribe({
      next: (resp: any) => {
        this.operatingUnitList = resp.data;
      },
      error: (error: any) => {},
    });
  }

  trackByFn(index: number, option: any): number {
    return option.id;
  }
  //get Organization LOV values
  getOrganizationList(orgId: any) {
    this.productDetailsList = [];
    this.showTable = false;
    if (orgId == '') {
      this.productDetailsFormControls['organization'].patchValue('');
      this.productDetailsFormControls['organization']?.disable();
    } else {
      this.orgId = orgId;
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.organizationList = resp.data;
            this.productDetailsFormControls['organization']?.enable();
          },
          error: (error: any) => {},
        });
    }
  }

  onInvOrgIdChange() {
    this.productDetailsList = [];
    this.showTable = false;
  }

  getProductDetails(invOrg: string, org: string) {
    this.spinner.show();
    this.productDetailsService
      .getProductDetails(this.clientId, org, invOrg)
      .subscribe({
        next: (data: any) => {
          this.productDetailsList = data.data;
          this.spinner.hide();
          this.showTable = true;
          if (this.productDetailsList) {
            for (let i = 10; i <= this.countPerpage; i = i + 10) {
              this.listPerPage.push(i);
            }
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
  }

  createEditProductDetails(productDetail: ProductDetails, invOrgId: string) {
    this.invOrgId = invOrgId;
    this.createEditProductsComponent.createEditProduct(productDetail);
  }

  uploadProductDetails(invOrg: String, orgId: String) {
    this.router.navigate(['/' + this.role + '/uploadProductDetails'], {
      queryParams: { org: orgId, invOrg: invOrg },
      skipLocationChange: true,
    });
  }

  get productDetailsFormControls() {
    return this.productDetailsForm.controls;
  }
}
