import { Component, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faEdit,
  faFileImport,
  faCircleCheck,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { ShipToLocations } from '../../models/ship-to-locations.model';
import { ShipToLocationsService } from '../../services/ship-to-locations.service';
import { PaginationInstance } from 'ngx-pagination';
import { CreateUpdateShipToLocationDetailsComponent } from './create-update-ship-to-location-details/create-update-ship-to-location-details.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';

@Component({
  selector: 'app-ship-to-locations',
  templateUrl: './ship-to-locations.component.html',
  styleUrls: ['./ship-to-locations.component.css'],
})
export class ShipToLocationsComponent implements OnInit {
  shipToLocationsList: ShipToLocations[] = [];
  shipToLocations: ShipToLocations = new ShipToLocations();
  shipToLocationDetailsForm!: FormGroup;
  showTable!: boolean;
  operatingUnitList: any;
  organizationList: any;
  faCircleCheck = faCircleCheck;
  faCirclePlus = faCirclePlus;
  faEdit = faEdit;
  faFile = faFileImport;
  role: any;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  userData: any;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  @ViewChild(CreateUpdateShipToLocationDetailsComponent)
  createUpdateShipToLocationDetailsComponent!: CreateUpdateShipToLocationDetailsComponent;
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  tableHeight!: string;
  constructor(
    private router: Router,
    private fb: NonNullableFormBuilder,
    private getShipToLocationService: ShipToLocationsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private lookupValuesService: LookupValuesService,
    private localStorageService: LocalStorageService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.role = localStorage.getItem('role');
    this.userData = this.localStorageService.getLocalUserData();
    this.clientId = this.userData.clientId;
    this.showTable = true;
    this.shipToLocationDetailsValidations();
    this.getOperatingUnitList();
    this.shipToLocationDetailsFormControls['organization']?.disable();
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
    this.spinner.hide();
  }

  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }
  shipToLocationDetailsValidations() {
    this.shipToLocationDetailsForm = this.fb.group({
      operatingUnit: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      changeRows: ['10'],
    });
  }
  showNoOfRows() {
    let noOfRows = this.shipToLocationDetailsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.shipToLocationsList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
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

  //get Organization LOV values
  getOrganizationList(orgId: any) {
    this.shipToLocationsList = [];
    this.showTable = true;
    if (orgId == '') {
      this.shipToLocationDetailsFormControls['organization'].patchValue('');
      this.shipToLocationDetailsFormControls['organization']?.disable();
    } else {
      this.orgId = orgId;
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.organizationList = resp.data;
            this.shipToLocationDetailsFormControls['organization']?.enable();
          },
          error: (error: any) => {},
        });
    }
  }

  onInvOrgIdChange() {
    this.shipToLocationsList = [];
    this.showTable = true;
  }

  getShipToLocations(clientId: number, orgId: string, invOrg: string) {
    this.spinner.show();
    this.getShipToLocationService
      .getShipToLocations(clientId, orgId, invOrg)
      .subscribe({
        next: (data: any) => {
          this.shipToLocationsList = data.data;
          if (this.shipToLocationsList) {
            for (let i = 10; i <= this.countPerpage; i = i + 10) {
              this.listPerPage.push(i);
            }
          }
          this.spinner.hide();
          this.showTable = false;
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
  }

  createEditShipToLocationDetails(
    shipToLocations: ShipToLocations,
    invOrgId: string
  ) {
    this.invOrgId = invOrgId;
    this.createUpdateShipToLocationDetailsComponent.createUpdateShipToLocationDetails(
      shipToLocations,
      this.clientId,
      this.orgId,
      this.invOrgId
    );
  }

  uploadShipToLocationDetails(invOrg: String, org: String) {
    this.router.navigate(['/' + this.role + '/uploadCustomerLocationDetails'], {
      queryParams: { org: org, invOrg: invOrg },
      skipLocationChange: true,
    });
  }

  get shipToLocationDetailsFormControls() {
    return this.shipToLocationDetailsForm.controls;
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
