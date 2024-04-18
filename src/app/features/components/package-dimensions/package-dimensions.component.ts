import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import {
  faCirclePlus,
  faEdit,
  faCircleCheck,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { PackageDimensionsService } from '../../services/package-dimensions.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DimensionsInfo } from '../../models/dimensions-info.model';
import { CreatePackageDimensionsComponent } from './create-package-dimensions/create-package-dimensions.component';
import { PaginationInstance } from 'ngx-pagination';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';

@Component({
  selector: 'app-package-dimensions',
  templateUrl: './package-dimensions.component.html',
  styleUrls: ['./package-dimensions.component.css'],
})
export class PackageDimensionsComponent implements OnInit {
  orgIdList: any;
  invOrgIdList: any;
  faCirclePlus = faCirclePlus;
  faEdit = faEdit;
  faCircleCheck = faCircleCheck;
  faArrowAltCircleUp = faArrowAltCircleUp;
  packageDimensionsForm!: FormGroup;
  dimensionsInfoList: DimensionsInfo[] = [];
  clientId!: number;
  userData: any;
  orgIdVar!: string;
  invOrgIdVar!: string;
  goED: boolean = true;
  currencyCodesList: any;
  role!: any;
  dimensionsInfo: DimensionsInfo = new DimensionsInfo();
  showCreateWhenGo!: boolean;
  dimensionUnitsList: any;
  weightUnitsList: any;
  @ViewChild(CreatePackageDimensionsComponent)
  createPackageDimensionsComponent!: CreatePackageDimensionsComponent;
  showTable!: boolean;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  showCustomerList: boolean = false;
  customerNamesList!: any;
  roleId!: any;
  customersList!: any;
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  tableHeight!: string;

  constructor(
    private fb: NonNullableFormBuilder,
    private packageDimensionService: PackageDimensionsService,
    private lookupValuesService: LookupValuesService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private loadLookupsService: LoadLookupsService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.userData = this.localStorageService.getLocalUserData();
    this.roleId = this.userData.userInfo.roleId;
    this.clientId = this.userData.clientId;
    this.role = localStorage.getItem('role');
    this.packageDimensionsValidations();
    this.loadLookupsService
      .getCurrencyCodes()
      .subscribe((currencyCodesList) => {
        this.currencyCodesList = currencyCodesList;
      });
    this.packageDimensionsFormControls['orgId']?.disable();
    this.packageDimensionsFormControls['invOrgId']?.disable();
    this.showCustomerList = false;
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
    if (this.roleId == 3) {
      this.clientId = this.userData.clientId;
      this.showCustomerList = false;
      this.packageDimensionsFormControls['clientId'].clearValidators();
      this.packageDimensionsFormControls['clientId'].updateValueAndValidity;
      this.showOrgId(this.clientId);
    } else if (this.roleId == 2) {
      this.packageDimensionsFormControls['clientId'].enable();
      this.loadLookupsService
        .getCustomerNames()
        .subscribe((customerNamesList) => {
          this.customerNamesList = customerNamesList;
        });
      this.showCustomerList = true;
      this.packageDimensionsFormControls['clientId'].setValidators([
        Validators.required,
      ]);
      this.packageDimensionsFormControls['clientId'].updateValueAndValidity;
      this.lookupValuesService.getCustomerDetails().subscribe({
        next: (resp: any) => {
          this.customersList = resp.data;
          console.log(resp.data);
        },
        error: (error) => {},
      });
    }
  }
  showNoOfRows() {
    let noOfRows = this.packageDimensionsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.dimensionsInfoList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }
  showOrgId(clientId: any) {
    this.orgIdList = [];
    this.invOrgIdList = [];
    this.dimensionsInfoList = [];
    this.packageDimensionsFormControls['orgId']?.reset('');
    this.packageDimensionsFormControls['invOrgId']?.reset('');
    if (clientId == '') {
      this.packageDimensionsFormControls['orgId']?.disable();
      this.packageDimensionsFormControls['invOrgId']?.disable();
      this.goED = true;
    } else {
      this.clientId = clientId;
      this.lookupValuesService.getOrganizationsList(clientId).subscribe({
        next: (resp: any) => {
          this.orgIdList = resp.data;
          this.packageDimensionsFormControls['orgId'].enable();
        },
        error: (error) => {
          this.toastr.error(
            'Operating Unit and Organization details are not available for the selected Customer',
            ''
          );
        },
      });
    }
  }

  showInvOrgId(orgId: any) {
    this.invOrgIdList = [];
    this.dimensionsInfoList = [];
    this.packageDimensionsFormControls['invOrgId']?.reset('');
    if (orgId == '') {
      this.packageDimensionsFormControls['invOrgId']?.disable();
      this.goED = true;
    } else {
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.invOrgIdList = resp.data;
            this.packageDimensionsFormControls['invOrgId']?.enable();
          },
          error: (error) => {
            this.toastr.error(
              'Operating Unit and Organization details are not available for the selected Customer',
              ''
            );
          },
        });
    }
  }

  showGoButton(orgId: any, invOrgId: any) {
    this.dimensionsInfoList = [];
    if (this.clientId != 0 && orgId != '' && invOrgId != '') {
      this.goED = false;
    } else {
      this.goED = true;
    }
  }

  createEditPackageDimensionDetails(dimensionsInfo: DimensionsInfo) {
    this.createPackageDimensionsComponent.getPackageDimenstionDetails(
      dimensionsInfo
    );
  }

  getPackageDimensionDetailsList(
    clientId: number,
    orgId: string,
    invOrgId: string
  ) {
    this.clientId = clientId;
    this.orgIdVar = orgId;
    this.invOrgIdVar = invOrgId;
    if (
      this.clientId != null &&
      this.orgIdVar != '' &&
      this.invOrgIdVar != ''
    ) {
      this.spinner.show();
      this.packageDimensionService
        .getPackageDimensions(this.clientId, this.orgIdVar, this.invOrgIdVar)
        .subscribe({
          next: (resp) => {
            (this.dimensionsInfoList = []),
              resp.forEach((data) => {
                if (
                  data.orgDimensionsInfoList &&
                  data.orgDimensionsInfoList.length > 0
                ) {
                  this.dimensionsInfoList.push(data);
                }
              });
            if (this.dimensionsInfoList) {
              for (let i = 10; i <= this.countPerpage; i = i + 10) {
                this.listPerPage.push(i);
              }
            }
            this.spinner.hide();
            this.goED = false;
          },
          error: (error) => {
            this.spinner.hide();
            this.toastr.error(
              'No data is available for the selected Customer, Operating Unit and Organization'
            );
            this.goED = false;
          },
        });
    } else {
      this.goED = false;
    }
  }

  updateActive(scOrgDimension: any, event: any): void {
    scOrgDimension.dimActive = event.target.checked;
    if (!event.target.checked) {
      scOrgDimension.dimDefault = false;
    }
  }

  updateDefault(scOrgDimension: any, event: any): void {
    scOrgDimension.dimDefault = event.target.checked;
  }

  updateHandlingCharges(scOrgDimension: any, event: any): void {
    scOrgDimension.handlingCharges = event.target.value;
  }

  updateCurrencyCode(scOrgDimension: any, event: any): void {
    scOrgDimension.currencyCode = event.target.value;
  }

  updatePackageDimensions(packageDimensionData: any) {
    this.spinner.show();
    this.dimensionsInfoList = packageDimensionData;
    this.packageDimensionService
      .updatePackageDimensions(packageDimensionData)
      .subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          this.toastr.success(resp.message);
        },
        error: (error: any) => {
          console.log(error);
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
  }

  packageDimensionsValidations() {
    this.packageDimensionsForm = this.fb.group({
      clientId: ['', [Validators.required]],
      orgId: ['', [Validators.required]],
      invOrgId: ['', [Validators.required]],
      active: [false, [Validators.required]],
      default: [false, [Validators.required]],
      handlingCharges: ['', [Validators.required]],
      currencyCode: ['', [Validators.required]],
      changeRows: ['10'],
    });
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }

  get packageDimensionsFormControls() {
    return this.packageDimensionsForm.controls;
  }
}
