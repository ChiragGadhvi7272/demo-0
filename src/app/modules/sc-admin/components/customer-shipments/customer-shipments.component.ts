import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faCircleCheck, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { faCircleUp, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { PaginationInstance } from 'ngx-pagination';
import { ClientInfo } from 'src/app/features/models/client-info.model';
import { environment } from 'src/environments/environment';
import { CustomerShipmentsService } from '../../services/customer-shipments.service';
import { CustomerShipmentsInfo } from '../../models/customer-shipments-info.model';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';

interface Shipment {
  carrierName: string;
  shipMethod: string;
  shipmentCount: number;
  packageCount: number;
}

@Component({
  selector: 'app-customer-shipments',
  templateUrl: './customer-shipments.component.html',
  styleUrls: ['./customer-shipments.component.css'],
})
export class CustomerShipmentsComponent implements OnInit {
  readonly NoWhitespaceRegExp: RegExp = new RegExp('\\S');
  customerShipments!: FormGroup;
  selectedI: boolean = true;
  submitted: boolean = false;
  faCircleCheck = faCircleCheck;
  faFile = faFileImport;
  clientId!: number;
  invOrgId!: string;
  orgId!: string;
  fromDate!: Date;
  toDate!: Date;
  goED: boolean = true;
  exportButton: boolean = true;
  customerNamesList!: any;
  orgIdList!: any;
  invOrgIdList!: any;
  erpType!: any;
  roleId!: any;
  customersList!: any;
  searchInput!: any;
  responseData!: any;
  searchForm!: FormGroup;
  filteredData: Shipment[] = [];
  filteredItems: any[] = [];
  faCircleUp = faCircleUp;
  faCircleLeft = faCircleLeft;
  currentPage: number = 1;
  countPerpage: number = 100;
  listPerPage: number[] = [];
  clientInfoList: ClientInfo[] = [];
  clientInfoListTemp: any;
  filteredClientInfoList: any;
  dateFlag: boolean = false;
  customerShipmentsInfo: CustomerShipmentsInfo = new CustomerShipmentsInfo();
  downloadSampleFileUrl: any = `${environment.apiUrl}/customerShipments/export`;
  tableHeight!: string;
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1,
  };
  constructor(
    private fb: FormBuilder,
    private lookupValuesService: LookupValuesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private customerShipmentsService: CustomerShipmentsService,
    private loadLookupsService: LoadLookupsService
  ) {}

  selectedRowCount: number = -1;

  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }

  ngOnInit(): void {
    this.customerConfigValidations();
    this.loadLookupsService
      .getCustomerNames()
      .subscribe((customerNamesList) => {
        this.customerNamesList = customerNamesList;
      });
    this.customerShipmentControls['orgId']?.disable();
    this.customerShipmentControls['invOrgId']?.disable();
    this.customerShipmentControls['fromDate']?.disable();
    this.customerShipmentControls['toDate']?.disable();
    this.submitted = true;
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
    this.getCustomerShipmentDetails;
  }
  customerConfigValidations() {
    this.customerShipments = this.fb.group({
      clientId: ['', [Validators.required]],
      orgId: ['', [Validators.required]],
      invOrgId: ['', [Validators.required]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      searchInput: ['', Validators.required],
      changeRows: ['10'],
    });
  }
  get customerShipmentControls() {
    return this.customerShipments.controls;
  }

  disableDate() {
    return false;
  }

  showOrgId(clientId: any) {
    this.goED = true;
    this.orgIdList = [];
    this.invOrgIdList = [];
    this.responseData = null;
    this.customerShipmentControls['orgId']?.reset('');
    this.customerShipmentControls['invOrgId']?.reset('');
    this.customerShipmentControls['fromDate']?.reset('');
    this.customerShipmentControls['toDate']?.reset('');
    if (clientId == '') {
      this.customerShipmentControls['orgId']?.disable();
      this.customerShipmentControls['invOrgId']?.disable();
      this.customerShipmentControls['fromDate']?.disable();
      this.customerShipmentControls['toDate']?.disable();
    } else {
      this.clientId = clientId;
      this.customerShipmentControls['orgId']?.enable();
      this.lookupValuesService.getOrganizationsList(clientId).subscribe({
        next: (resp: any) => {
          this.orgIdList = resp.data;
          this.customerShipmentControls['orgId'].enable();
        },
        error: (error) => {},
      });
    }
  }

  showInvOrgId(orgId: any) {
    this.goED = true;
    this.invOrgIdList = [];
    this.responseData = null;
    this.customerShipmentControls['invOrgId']?.reset('');
    this.customerShipmentControls['fromDate']?.reset('');
    this.customerShipmentControls['toDate']?.reset('');
    if (orgId == '') {
      this.customerShipmentControls['invOrgId']?.disable();
      this.customerShipmentControls['fromDate']?.disable();
      this.customerShipmentControls['toDate']?.disable();
    } else {
      this.lookupValuesService
        .getInventoryOrganizationsList(this.clientId, orgId)
        .subscribe({
          next: (resp: any) => {
            this.invOrgIdList = resp.data;
            this.customerShipmentControls['invOrgId'].enable();
          },
          error: (error) => {},
        });
    }
  }

  showFromDate(invOrgId: any) {
    this.goED = true;
    this.responseData = null;
    this.customerShipmentControls['fromDate'].reset('');
    this.customerShipmentControls['toDate']?.reset('');
    this.customerShipmentControls['toDate']?.disable();
    if (invOrgId == '') {
      this.customerShipmentControls['fromDate']?.disable();
    } else {
      this.customerShipmentControls['fromDate'].enable();
    }
  }

  showToDate(fromDate: any) {
    this.goED = true;
    this.responseData = null;
    this.customerShipmentControls['toDate'].reset('');
    if (fromDate == '') {
      this.customerShipmentControls['toDate']?.disable();
    } else {
      this.customerShipmentControls['toDate'].enable();
      this.goED = true;
    }
  }

  dateValidation(fromDate: any, toDate: any) {
    if (fromDate && toDate && fromDate > toDate) {
      this.dateFlag = true;
      this.goED = true;
    } else if (!fromDate || !toDate) {
      this.goED = true;
    } else {
      this.goED = false;
      this.dateFlag = false;
    }
  }

  getCustomerShipmentDetails(
    clientId: string,
    orgId: string,
    invOrgId: string,
    fromDate: string,
    toDate: string
  ) {
    this.spinner.show();
    this.customerShipmentsInfo.clientId = Number(clientId);
    this.customerShipmentsInfo.orgId = orgId;
    this.customerShipmentsInfo.invOrgId = invOrgId;
    this.customerShipmentsInfo.fromDate = this.datePipe.transform(
      fromDate,
      'yyyy-MM-ddThh:mm:ss'
    );
    this.customerShipmentsInfo.toDate = this.datePipe.transform(
      toDate,
      'yyyy-MM-ddThh:mm:ss'
    );
    this.customerShipmentsService
      .getCustomerShipments(this.customerShipmentsInfo)
      .subscribe({
        next: (resp: any) => {
          if (resp.data.length != 0) {
            this.responseData = resp.data;
            this.spinner.hide();
            this.filterData();
            this.listPerPage = [];
            for (let i = 10; i <= this.countPerpage; i = i + 10) {
              this.listPerPage.push(i);
            }
          } else {
            this.toastr.error('No records round.');
            this.spinner.hide();
            this.filteredData = [];
            this.responseData = null;
          }
          this.exportButton = false;
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error('Unable to get Customer Shipments');
        },
      });
  }

  filterData() {
    const searchInput = this.searchForm.value['searchInput'];
    this.filteredData = this.responseData.filter(
      (item: Shipment) =>
        item.carrierName.toLowerCase().includes(searchInput) ||
        item.shipMethod.toLowerCase().includes(searchInput) ||
        item.shipmentCount.toString().includes(searchInput) ||
        item.packageCount.toString().includes(searchInput)
    );
  }

  showNoOfRows() {
    const noOfRows = this.customerShipments.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      noOfRows == 10 || this.responseData.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }

  calculateTotalPackages(): number {
    return this.filteredData.reduce((sum, item) => sum + item.packageCount, 0);
  }

  downloadSampleFile() {
    const downloadLink = document.querySelector(
      '.downloadSampleFile'
    ) as HTMLAnchorElement;
    downloadLink.click();
    this.toastr.success('File Downloaded Successfully');
  }
}
