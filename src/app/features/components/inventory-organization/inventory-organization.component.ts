import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { faEdit, faEye, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InventoryOrganization } from '../../models/inventory-organization.model';
import { InventoryOrganizationService } from '../../services/inventory-organization.service';
import { CreateInventoryOrganizationComponent } from './create-inventory-organization/create-inventory-organization.component';
import { PaginationInstance } from 'ngx-pagination';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inventory-organization',
  templateUrl: './inventory-organization.component.html',
  styleUrls: ['./inventory-organization.component.css'],
})
export class InventoryOrganizationComponent implements OnInit {
  invOrgDetailsForm!: FormGroup;
  faCircleCheck = faCircleCheck;
  faEdit = faEdit;
  faEye = faEye;
  faCirclePlus = faCirclePlus;
  show!: boolean;
  editOrView!: string;
  clientId!: number;
  clientIdVar: any;
  inventoryOrganization: InventoryOrganization = new InventoryOrganization();
  role!: any;
  customerNamesList: any;
  roleId!: number;
  userData: any;
  isScUser: boolean = true;
  maxInvOrgs!: number;
  createUpdate!: string;
  inventoryOrganizationList: InventoryOrganization[] = [];
  showMaxInv!: boolean;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  tableHeight!: string;
  @ViewChild(CreateInventoryOrganizationComponent)
  createInventoryOrganizationComponent!: CreateInventoryOrganizationComponent;
  orgIdLabel: any;
  invOrgIdLabel: any;
  orgIdNameLabel: any;
  invOrgIdNameLabel: any;
  constructor(
    private inventoryOrganizationService: InventoryOrganizationService,
    private fb: NonNullableFormBuilder,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private loadLookupsService: LoadLookupsService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userData = this.localStorageService.getLocalUserData();
    this.roleId = this.userData.userInfo.roleId;
    this.clientId = this.userData.clientId;
    this.clientIdVar = this.clientId;
    this.maxInvOrgs = this.userData.maxInventoryOrganizations;
    this.invOrgValidations();
    this.getInventoryOrgList(this.clientId);
    this.configService.getConfiguration().subscribe((config) => {
      this.orgIdLabel = config?.orgIdLabel;
      this.invOrgIdLabel = config?.invOrgIdLabel;
      this.orgIdNameLabel = config?.orgIdNameLabel;
      this.invOrgIdNameLabel = config?.invOrgIdNameLabel;
    });
    if (this.roleId == 2) {
      this.invOrgDetailsForm.controls['clientId'].enable();
      this.loadLookupsService
        .getCustomerNames()
        .subscribe((customerNamesList) => {
          this.customerNamesList = customerNamesList;
        });
      this.isScUser = true;
      this.show = !this.show;
      this.editOrView = 'View';
    } else {
      this.invOrgDetailsForm.controls['clientId'].disable();
      this.editOrView = 'Edit';
      this.isScUser = false;
    }
  }

  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }
  showNoOfRows() {
    let noOfRows = this.invOrgDetailsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.inventoryOrganizationList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }

  invOrgValidations() {
    this.invOrgDetailsForm = this.fb.group({
      clientId: ['', Validators.required],
      changeRows: ['10'],
    });
  }

  onCustomerChange() {
    this.inventoryOrganizationList = [];
  }

  //To get the inventory list by client id
  getInventoryOrgList(clientId: any) {
    this.spinner.show();
    this.clientId = clientId;
    this.clientIdVar = clientId;
    this.inventoryOrganizationService.getInvOrgList(this.clientId).subscribe({
      next: (resp: any) => {
        this.inventoryOrganizationList = resp.data;
        this.spinner.hide();
          for (let i = 10; i <= this.countPerpage; i = i + 10) {
            this.listPerPage.push(i);
          }
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      },
    });
  }

  showMessage() {
    if (this.inventoryOrganizationList.length >= this.maxInvOrgs) {
      this.showMaxInv = true;
      this.toastr.error(
        'You can create maximum of "' +
          this.maxInvOrgs +
          '" Organization. Please contact ShipConsole Administration'
      );
      setTimeout(() => {
        this.showMaxInv = false;
      }, 10000);
    } else {
      this.showMaxInv = false;
    }
  }

  //To redirect to the create and edit component
  createEditInventoryOrgDetails(inventoryOrganization: InventoryOrganization) {
    this.createInventoryOrganizationComponent.getInvDetails(
      inventoryOrganization
    );
  }

  get invOrgDetailsFormControls() {
    return this.invOrgDetailsForm.controls;
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
}
