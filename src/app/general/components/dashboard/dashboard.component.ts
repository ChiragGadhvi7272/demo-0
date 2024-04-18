import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUserAlt,
  faAddressCard,
  faWrench,
  faFile,
  faNewspaper,
  faTruck,
  faMapMarker,
  faPencilSquare,
  faFolderOpen,
  faBoxOpen,
  faShoppingCart,
  faCloudDownload,
  faCheckSquare,
  faCloudUpload,
  faRefresh,
  faChartLine,
  faCloudUploadAlt,
  faCubesStacked,
  faLocationDot,
  faAddressBook,
  faSignOut,
  faSignOutAlt,
  faDesktopAlt,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';
import { ConfigurationLoaderService } from '../configuration/configuration-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
  erpType!: string;
  shipButton!: string;
  deliveryLabel!: string;
  operatingUnit!: string;
  organization!: string;
  companyName!: string;
  shipFromName!: string;
  shipToName!: String;
  orgId!: string;
  organizationName!: string;
  organizationId!: string;
  role!: any;
  roleId!: number;
  faUndoAlt = faUndoAlt;
  faDesktopAlt = faDesktopAlt;
  faUserAlt = faUserAlt;
  faAddressCard = faAddressCard;
  faWrench = faWrench;
  faFile = faFile;
  faNewspaper = faNewspaper;
  faTruck = faTruck;
  faMapMarker = faMapMarker;
  faPencilSquare = faPencilSquare;
  faFolderOpen = faFolderOpen;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;
  faCloudDownload = faCloudDownload;
  faRefresh = faRefresh;
  faChartLine = faChartLine;
  faCloudUploadAlt = faCloudUploadAlt;
  faSignOut = faSignOut;
  faSignOutAlt = faSignOutAlt;
  userData: any;

  sideNavList!: Array<any>;
  showProfileOptions: boolean = false;
  showCarrierConfiguration: boolean = false;
  showPackageDimentions: boolean = false;
  showInvOrg: boolean = false;
  showAnalytics: boolean = false;
  showcreateCustomer: boolean = false;
  showCreateUser: boolean = false;
  showShipFrom: boolean = false;
  showShipTo: boolean = false;
  showProduct: boolean = false;
  showCustomerShipments: boolean = false;

  showShipping: boolean = false;
  showTracking: boolean = false;
  showAdhocShipping: boolean = false;
  showReports: boolean = false;
  showDownloadFiles: boolean = false;
  showUploadDocuments: boolean = false;

  showApplicationSetups: boolean = false;
  showEod: boolean = false;
  showImportOrders: boolean = false;
  showERPSync: boolean = false;
  showShippingReports: boolean = false;
  showMasterBol: boolean = false;
  showUploadDoc: boolean = false;
  showSignIn: boolean = false;
  showTransactionReports: boolean = false;
  showFreightShopping: boolean = false;
  showBatchForm: boolean = false;
  userName!: string;
  version!: string;
  ngOnInit(): void {
    this.getData();
    this.ShowIcons();
    this.loadLookUpService.loadCountryCurrLookUps();
  }

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private loadLookUpService: LoadLookupsService,
    private configService: ConfigurationLoaderService
  ) {
    console.log('in dashboard constuctor');
    this.loadLookUpService.loadCountryCurrLookUps();
    this.userData = this.localStorageService.getLocalUserData();
    if (
      this.userData.userInfo.roleId == 1 ||
      this.userData.userInfo.roleId == 2
    ) {
      this.erpType = 'ShipConsole';
    } else {
      this.erpType = this.userData.erpType;
    }
    this.configService.loadConfiguration(this.erpType);
    this.loadLookUpService.loadCustomerNames();
  }

  getData() {
    this.userData = this.localStorageService.getLocalUserData();
    this.role = localStorage.getItem('role');
    this.roleId = this.userData.userInfo.roleId;
    this.userName = this.userData.userInfo.userName;
    this.version = `${environment.version}`;
  }

  ShowIcons() {
    switch (this.roleId) {
      case 1: {
        this.showProfileOptions = true;
        this.showCarrierConfiguration = true;
        this.showcreateCustomer = true;
        this.showApplicationSetups = true;
        this.showCustomerShipments = true;
        this.showSignIn = true;
        break;
      }
      case 2: {
        this.showShipping = true;
        this.showTracking = true;
        this.showAdhocShipping = true;
        this.showReports = true;
        this.showProfileOptions = true;
        this.showCarrierConfiguration = true;
        this.showPackageDimentions = true;
        this.showInvOrg = true;
        this.showDownloadFiles = true;
        this.showSignIn = true;
        break;
      }
      case 3: {
        this.showShippingReports = true;
        this.showProfileOptions = true;
        this.showCarrierConfiguration = true;
        this.showPackageDimentions = true;
        this.showInvOrg = true;
        this.showShipFrom = true;
        this.showShipTo = true;
        this.showProduct = true;
        this.showAnalytics = true;
        this.showCreateUser = true;
        this.showSignIn = true;
        break;
      }
      case 4: {
        this.showShippingReports = true;
        this.showTransactionReports = true;
        this.showFreightShopping = true;
        this.showShipping = true;
        this.showTracking = true;
        this.showAdhocShipping = true;
        this.showBatchForm = true;
        this.showReports = true;
        this.showEod = true;
        this.showImportOrders = true;
        this.showERPSync = true;
        this.showMasterBol = true;
        this.showSignIn = true;
        break;
      }
      case 5: {
        this.showTracking = true;
        this.showReports = true;
        this.showShipping = true;
        this.showSignIn = true;
        break;
      }
      case 6: {
        this.showShippingReports = true;
        this.showUploadDoc = true;
        this.showSignIn = true;
        break;
      }
      default:
        console.log('No Role Found');
        break;
    }

    this.sideNavList = [
      {
        _name: 'Shipping',
        _icon: faTruck,
        _show: this.showShipping,
        _route: 'shipping',
      },
      {
        _name: 'Tracking',
        _icon: faMapMarker,
        _show: this.showTracking,
        _route: 'tracking',
      },
      {
        _name: 'Adhoc Shipping',
        _icon: faPencilSquare,
        _show: this.showAdhocShipping,
        _route: 'adhoc-shipping',
      },
      {
        _name: 'Reports',
        _icon: faFolderOpen,
        _show: this.showReports,
        _route: 'reports',
      },
      {
        _name: 'Profile Options',
        _icon: faUserAlt,
        _show: this.showProfileOptions,
        _route: 'profileOptions',
      },
      {
        _name: 'Carrier Configuration',
        _icon: faWrench,
        _show: this.showCarrierConfiguration,
        _route: 'carrierConfiguration',
      },
      {
        _name: 'Customer Details',
        _icon: faAddressCard,
        _show: this.showcreateCustomer,
        _route: 'customerDetails',
      },
      {
        _name: 'User Details',
        _icon: faAddressCard,
        _show: this.showCreateUser,
        _route: 'userDetails',
      },
      {
        _name: 'Application Setups',
        _icon: faFile,
        _show: this.showApplicationSetups,
        _route: 'applicationSetups',
      },
      {
        _name: 'Analytics',
        _icon: faChartLine,
        _show: this.showAnalytics,
        _route: 'analytics',
      },
      {
        _name: 'Customer Shipments',
        _icon: faNewspaper,
        _show: this.showCustomerShipments,
        _route: 'customerShipments',
      },

      {
        _name: 'Upload Documents',
        _icon: faCloudUploadAlt,
        _show: this.showUploadDocuments,
        _route: 'uploadDocuments',
      },
      {
        _name: 'Package Dimensions',
        _icon: faBoxOpen,
        _show: this.showPackageDimentions,
        _route: 'packageDimensionsDetails',
      },
      {
        _name: 'Inventory Organization',
        _icon: faShoppingCart,
        _show: this.showInvOrg,
        _route: 'inventoryOrg',
      },
      {
        _name: 'Download Files',
        _icon: faCloudDownload,
        _show: this.showDownloadFiles,
        _route: 'downloadFiles',
      },
      {
        _name: 'End Of Day',
        _icon: faCheckSquare,
        _show: this.showEod,
        _route: 'eod',
      },
      {
        _name: 'Import Orders',
        _icon: faCloudUpload,
        _show: this.showImportOrders,
        _route: 'importOrders',
      },
      {
        _name: 'ERP Sync',
        _icon: faRefresh,
        _show: this.showERPSync,
        _route: 'erpSync',
      },
      {
        _name: 'Master BOL',
        _icon: faShoppingCart,
        _show: this.showMasterBol,
        _route: 'masterBol',
      },
      {
        _name: 'Ship From Locations',
        _icon: faLocationDot,
        _show: this.showShipFrom,
        _route: 'shipFromLocationDetails',
      },
      {
        _name: 'Address Book',
        _icon: faAddressBook,
        _show: this.showShipTo,
        _route: 'shipToLocationDetails',
      },
      {
        _name: 'Product Details',
        _icon: faCubesStacked,
        _show: this.showProduct,
        _route: 'productDetails',
      },
    ];
  }
  logout() {
    this.configService.clearConfiguration();
    this.localStorageService.clearLocalUserData();
    this.loadLookUpService.clearCustomerNames();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  changePassword() {
    this.router.navigate(['changepassword']);
  }
}
