import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from '../../models/user-details.model';
import { UserDetailsService } from '../../services/user-details.service';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';
import { CreateUpdateUserDetailsComponent } from './create-update-user-details/create-update-user-details.component';
import { PaginationInstance } from 'ngx-pagination';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';

@Component({
  selector: 'app-users',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  faCircleUp = faCirclePlus;
  faEdit = faEdit;
  clientId!: number;
  clientIdVar: any;
  userDetailsForm!: FormGroup;
  @ViewChild(CreateUpdateUserDetailsComponent)
  createUpdateUserDetailsComponent!: CreateUpdateUserDetailsComponent;
  userDetailsList: UserDetails[] = [];
  userDetails: UserDetails = new UserDetails();
  role!: any;
  userData!: any;
  userRoles!: any;
  rolesMap: { [key: string]: string } = {};
  usersIndividualDetails!: any;
  showTable!: boolean;
  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  erpType!: string;
  documentStorageApiFlag!: any;
  mobileAppAccessFlag!: any;
  tableHeight!: string;
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  invOrgIdLabel: any;
  constructor(
    private fb: NonNullableFormBuilder,
    private getUsersService: UserDetailsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private lookupValuesService: LookupValuesService,
    private localStorageService: LocalStorageService,
    private configService: ConfigurationLoaderService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.role = localStorage.getItem('role');
    this.userData = this.localStorageService.getLocalUserData();
    this.clientId = this.userData.clientId;
    this.erpType = this.userData.erpType;
    let clientServices = this.userData.clientSubscriptionInfoList;
    this.configService.getConfiguration().subscribe((config) => {
      this.invOrgIdLabel = config?.invOrgIdLabel;
    });
    clientServices.forEach((service: any) => {
      if (service.serviceName == 'DS') {
        this.documentStorageApiFlag = service.activeFlag;
      } else if (service.serviceName == 'MOBILE') {
        this.mobileAppAccessFlag = service.activeFlag;
      }
    });
    this.clientIdVar = this.clientId;
    this.showTable = true;
    this.getUserDetails();
    this.userDetailsForm = this.fb.group({
      changeRows: ['10'],
    });
  }

  getRoles() {
    this.lookupValuesService.getLookUps('USER_ROLES', 'ALL').subscribe({
      next: (resp: any) => {
        this.userRoles = resp.data;
        this.userRoles.forEach((role: any) => {
          this.rolesMap[role.lookupCode] = role.meaning;
        });
      },
      error: (error: any) => {},
    });
  }

  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }

  showNoOfRows() {
    let noOfRows = this.userDetailsForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.userDetailsList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 435px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }
  //To get the User Details list
  getUserDetails() {
    this.spinner.show();
    this.getUsersService.getUserDetails(this.clientId).subscribe({
      next: (resp: any) => {
        this.userDetailsList = resp.data;
        if (resp.code == 200) {
          this.showTable = false;
          for (let i = 10; i <= this.countPerpage; i = i + 10) {
            this.listPerPage.push(i);
          }
        } else {
          this.showTable = true;
          this.toastr.error(resp.message);
        }
        this.userDetailsList.forEach((user: any) => {
          user.roleName = this.rolesMap[user.roleId];
        });
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.showTable = true;
        this.toastr.error(error.error.status);
      },
    });
  }

  createEditUser(userDetails: any) {
    this.createUpdateUserDetailsComponent.getUserDetails(userDetails);
  }
}
