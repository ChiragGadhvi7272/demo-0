import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationDetails } from 'src/app/features/models/authentication-details.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { ErpSyncRequest } from '../../models/erp-sync-request.model';
import { ErpSyncService } from '../../services/erp-sync.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-erp-sync',
  templateUrl: './erp-sync.component.html',
  styleUrls: ['./erp-sync.component.css'],
})
export class ErpSyncComponent implements OnInit {
  erpSync!: FormGroup;
  faRefresh = faRefresh;
  submitted: boolean = false;
  fromDate!: Date;
  toDate!: Date;
  dateFlag!: boolean;
  syncED!: boolean;
  userData: any;
  erpSyncRequest: ErpSyncRequest = new ErpSyncRequest();
  authenticationDetails: AuthenticationDetails = new AuthenticationDetails();
  deliveryDetailsList: any[] = [];

  showTable: boolean = true;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private erpSyncService: ErpSyncService,
    private utilService: SharedUtilService
  ) {}

  ngOnInit(): void {
    this.erpSyncValidations();
    this.disableFromDate();
  }
  showNoOfRows() {
    let noOfRows = this.erpSync.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }
  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }
  performErpSync() {
    this.spinner.show();
    this.userData = this.localStorageService.getLocalUserData();
    let fromDate = this.erpSyncControls['fromDate'].value;
    let toDate = this.erpSyncControls['toDate'].value;

    this.erpSyncRequest.authenticationDetails =
      this.utilService.getAuthenticationDetails(this.userData);
    this.erpSyncRequest.clientId = this.userData.clientId;
    this.erpSyncRequest.orgId = this.userData.userInfo.orgId;
    this.erpSyncRequest.invOrgId = this.userData.userInfo.invOrgId;
    this.erpSyncRequest.fromDate = this.utilService.dateFormatOnSave(fromDate);
    this.erpSyncRequest.toDate = this.utilService.dateFormatOnSave(toDate);
    this.erpSyncRequest.erpType = this.userData.erpType;
    this.erpSyncRequest.labelPath = this.userData.labelPath;

    this.erpSyncService.erpSync(this.erpSyncRequest).subscribe({
      next: (resp: any) => {
        this.spinner.hide();
        this.toastr.success(resp.message);
        this.deliveryDetailsList = resp.data.deliveryDetailsInfoList;
        this.showTable = false;
          for (let i = 10; i <= this.countPerpage; i = i + 10) {
            this.listPerPage.push(i);
          }
      },
      error: (error: any) => {
        this.showTable = true;
        this.spinner.hide();
        this.toastr.error(error.error.status);
      },
    });
  }

  erpSyncValidations() {
    this.erpSync = this.fb.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      changeRows: ['10'],
    });
  }

  get erpSyncControls() {
    return this.erpSync.controls;
  }

  disableFromDate() {
    this.erpSyncControls['toDate']?.disable();
    this.syncED = true;
  }

  showToDate() {
    this.erpSyncControls['toDate'].reset();
    this.syncED = true;
    this.erpSyncControls['toDate'].enable();
  }

  dateValidation(fromDate: any, toDate: any) {
    if (fromDate && toDate && fromDate > toDate) {
      this.dateFlag = true;
      this.syncED = true;
    } else {
      this.dateFlag = false;
      this.syncED = false;
    }
  }
}
