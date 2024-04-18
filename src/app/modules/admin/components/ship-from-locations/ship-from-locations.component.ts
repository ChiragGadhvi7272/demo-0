import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faArrowAltCircleUp,
  faCircleCheck,
  faCirclePlus,
  faCircleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { ShipFromLocations } from '../../models/ship-from-locations.model';
import { ShipFromLocationsService } from '../../services/ship-from-locations.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdateShipFromLocationComponent } from './create-update-ship-from-location/create-update-ship-from-location.component';
import { PaginationInstance } from 'ngx-pagination';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';

@Component({
  selector: 'app-ship-from-locations',
  templateUrl: './ship-from-locations.component.html',
  styleUrls: ['./ship-from-locations.component.css'],
})
export class ShipFromLocationsComponent implements OnInit {
  shipFromLocationDetailsForm!: FormGroup;
  shipFromLocationsList: ShipFromLocations[] = [];
  showTable!: boolean;
  operatingUnitList: any;
  organizationList: any;
  faEdit = faEdit;
  faCircleUp = faCircleUp;
  faCircleCheck = faCircleCheck;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faCirclePlus = faCirclePlus;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  userData: any;
  shipFromLocations: ShipFromLocations = new ShipFromLocations();
  @ViewChild(CreateUpdateShipFromLocationComponent)
  createUpdateShipFromLocationComponent!: CreateUpdateShipFromLocationComponent;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  tableHeight!: string;
  constructor(
    private shipFromLocationsService: ShipFromLocationsService,
    private fb: NonNullableFormBuilder,
    private spinner: NgxSpinnerService,
    private lookupValuesService: LookupValuesService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.userData = this.localStorageService.getLocalUserData();
    this.clientId = this.userData.clientId;
    this.showTable = true;
    this.shipFromLocationDetailsValidations();
    this.getOperatingUnitList();
    this.shipFromLocationDetailsFormControls['organization']?.disable();
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
    this.spinner.hide();
  }
  showNoOfRows() {
    let noOfRows = this.shipFromLocationDetailsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.shipFromLocationsList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }
  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }

  shipFromLocationDetailsValidations() {
    this.shipFromLocationDetailsForm = this.fb.group({
      operatingUnit: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      changeRows: ['10'],
    });
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
    this.shipFromLocationsList = [];
    this.showTable = true;
    if (orgId == '') {
      this.shipFromLocationDetailsFormControls['organization'].patchValue('');
      this.shipFromLocationDetailsFormControls['organization']?.disable();
    } else {
      this.orgId = orgId;
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.organizationList = resp.data;
            this.shipFromLocationDetailsFormControls['organization'].enable();
          },
          error: (error: any) => {},
        });
    }
  }

  onInvOrgIdChange() {
    this.shipFromLocationsList = [];
    this.showTable = true;
  }

  //To get the Ship From Details List
  getShipFromLocations(clientId: any, orgId: any, invOrgId: any) {
    this.spinner.show();
    this.invOrgId = invOrgId;
    this.shipFromLocationsService
      .getShipFromLocations(clientId, orgId, invOrgId)
      .subscribe({
        next: (resp: any) => {
          this.showTable = false;
          this.spinner.hide();
          this.shipFromLocationsList = resp.data;
          if (this.shipFromLocationsList) {
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

  //To redirect to create/update page
  createEditShipFromLocationDetails(
    shipFromLocations: ShipFromLocations,
    invOrgId: string
  ) {
    this.invOrgId = invOrgId;
    this.createUpdateShipFromLocationComponent.createEditShipFromLocationDetails(
      shipFromLocations
    );
  }

  get shipFromLocationDetailsFormControls() {
    return this.shipFromLocationDetailsForm.controls;
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
