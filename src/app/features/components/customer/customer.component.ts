import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleUp,
  faEdit,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientInfo } from '../../models/client-info.model';
import { CustomerDetailsService } from '../../services/customer-details.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { PaginationInstance } from 'ngx-pagination';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerDetailsForm!: FormGroup;
  faCircleUp = faCircleUp;
  faEdit = faEdit;
  faCirclePlus = faCirclePlus;
  clientInfoList: ClientInfo[] = [];
  clientInfoListTemp: any;
  filteredClientInfoList: any;
  role!: any;
  erpTypeList!: any;
  erpTypeMap: { [key: string]: string } = {};
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  tableHeight!: string;
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  filteredItems: any[] = [];

  constructor(
    private router: Router,
    private customerDetailsService: CustomerDetailsService,
    private spinner: NgxSpinnerService,
    private lookupValuesService: LookupValuesService,
    private fb: NonNullableFormBuilder
  ) {}

  getErpType() {
    this.lookupValuesService.getLookUps('CLIENT_TYPE', 'ALL').subscribe({
      next: (resp: any) => {
        this.erpTypeList = resp.data;
        this.erpTypeList.forEach((erpType: any) => {
          this.erpTypeMap[erpType.lookupCode] = erpType.meaning;
        });
      },
      error: (error: any) => {
        console.log(error.error.status);
      },
    });
  }

  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
    console.log('hi');
  }

  showNoOfRows() {
    let noOfRows = this.customerDetailsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.clientInfoList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }

  getCustomerDetails() {
    this.spinner.show();
    this.customerDetailsService.getCustomerDetails().subscribe({
      next: (resp: any) => {
        this.spinner.hide();
        this.clientInfoList = resp.data;
        this.clientInfoListTemp = this.clientInfoList;
        this.clientInfoList.forEach((erpType: any) => {
          erpType.erpType = this.erpTypeMap[erpType.erpType];
        });

        if (resp.code == 200) {
          for (let i = 10; i <= this.countPerpage; i = i + 10) {
            this.listPerPage.push(i);
          }
        }
      },
      error: (error) => {
        this.spinner.hide();
      },
    });
  }

  createEditCustomer(clientId: number) {
    this.router.navigate(
      ['/' + this.role + '/createEditCustomerDetails', clientId],
      { skipLocationChange: true }
    );
  }

  filterData() {
    let searchInput = this.customerDetailsForm.value['searchInput'];
    this.customerDetailsForm.controls['searchInput'].valueChanges.subscribe(
      (value) => {
        this.filteredItems = this.clientInfoList.filter(
          (item: any) =>
            item.companyName.toLowerCase().includes(value.toLowerCase()) ||
            item.erpType.toLowerCase().includes(value.toLowerCase())
        );
        console.log('this.filteredItems', this.filteredItems);
        this.filteredClientInfoList = this.filteredItems;
      }
    );
    if (searchInput) {
      this.clientInfoListTemp = this.filteredClientInfoList;
    } else {
      this.clientInfoListTemp = this.clientInfoList;
    }
  }
  
  trackByFn(index: number, option: any): number {
    return option.id;
  }

  ngOnInit(): void {
    this.tableHeight = 'auto';
    this.role = localStorage.getItem('role');
    this.getCustomerDetails();
    this.getErpType();
    this.customerDetailsForm = this.fb.group({
      changeRows: ['10'],
      searchInput: [''],
    });
  }
}
