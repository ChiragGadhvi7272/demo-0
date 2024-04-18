import {
  ChangeDetectorRef,
  ElementRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';
import { ClientOrgProfileOptionsInfo } from '../../models/client-org-profile-options-info.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  faTruck,
  faTruckFast,
  faPrint,
  faSearch,
  faBan,
  faBoxesStacked,
  faFileCircleCheck,
  faListCheck,
  faFile,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ShipmentPackagesInfo } from 'src/app/shared/models/shipment-packages-info.model';
import { ShipmentLinesInfo } from 'src/app/shared/models/shipment-lines-info.model';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';
import { HazmatInfo } from 'src/app/shared/models/hazmat-info.model';
import { ReturnShipmentInfo } from 'src/app/shared/models/return-shipment-info.model';
import { AuthenticationDetails } from '../../models/authentication-details.model';
import { DeliveryRetrieval } from '../../models/delivery-retrieval.model';
import { ShipmentRequest } from '../../models/shipment-request.model';
import { VoidShipmentRequest } from '../../models/void-shipment-request.model';
import { ShipmentCarrierDetails } from '../../models/shipment-carrier-details.model';
import { ShipMethodMappingInfo } from '../../models/ship-method-mapping-info.model';
import { CarrierAcctNumbersInfo } from '../../models/carrier-acct-numbers-info.model';
import { HeaderDetailsComponent } from './header-details/header-details.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { SharedComponent } from './shared/shared.component';
import { PrintService } from '../../services/print.service';
import { ViewLabelsComponent } from './view-labels/view-labels.component';
import { CarrierConfigurationsService } from '../../services/carrier-configurations.service';
import { CarrierOrgAcctDetailsInfo } from '../../models/carrier-org-acct-details-info.model';
import { HazmatCommodityInfo } from 'src/app/shared/models/hazmat-commodity-info.model';
import { AddressInfo } from 'src/app/shared/models/address-info.model';
import { IntlCiInfo } from 'src/app/shared/models/intl-ci-info.model';
import { IntlDutiesTaxesInfo } from 'src/app/shared/models/intl-duties-taxes-info.model';
import { IntlUscoInfo } from 'src/app/shared/models/intl-usco-info.model';
import { UpdateErpRequest } from '../../models/update-erp-request.model';
import { SharedShippingUtilService } from '../../services/shared-shipping-util.service';
import { PackingSlipRequest } from '../../models/packing-slip-request.model';
import { DimensionsInfo } from '../../models/dimensions-info.model';
import { PackageDimensionsService } from '../../services/package-dimensions.service';
import { Observable, of } from 'rxjs';
import { ConfigurationLoaderService } from 'src/app/general/components/configuration/configuration-loader.service';
import { SharedShippingSubjectsService } from '../../services/shared-shipping-subjects.service';
import { ConsolidationDataService } from './shared/consolidation/consolidation-data.service';
import { ShipmentChargesInfo } from 'src/app/shared/models/shipment-charges-info.model';
import { LtlPkgInfo } from 'src/app/shared/models/ltl-pkg-info.model';
import { UspsPkgInfo } from 'src/app/shared/models/usps-pkg-info.model';
import { CodInfo } from 'src/app/shared/models/cod-info.model';
import { HoldAtLocInfo } from 'src/app/shared/models/hold-at-loc-info.model';
import { PrinterInfo } from 'src/app/shared/models/printer-info.model';
import { IntlCN22Info } from 'src/app/shared/models/intl-cn22-info.model';
import { CustomAttributesInfo } from 'src/app/shared/models/custom-attributes-info.model';
import { EmailNotificationInfo } from '../../models/email-notification-info';
import { AdditionalShipmentInfo } from 'src/app/shared/models/additional-shipment-info.model';
import { ChildShipmentHeadersInfo } from 'src/app/shared/models/child-shipment-headers-info';
import { ShipmentItemControlsInfo } from 'src/app/shared/models/shipment-item-controls-info';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnInit {
  faTruck = faTruck;
  faTruckFast = faTruckFast;
  faBan = faBan;
  faPrint = faPrint;
  faSearch = faSearch;
  faBoxesPacking = faBoxesStacked;
  faFileCircleCheck = faFileCircleCheck;
  faCheckSquare = faListCheck;
  faChevronCircleRight = faChevronCircleRight;
  faFile = faFile;
  userData: any;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  authenticationDetails: AuthenticationDetails = new AuthenticationDetails();
  clientOrgProfileOptionsInfo: ClientOrgProfileOptionsInfo =
    new ClientOrgProfileOptionsInfo();
  deliveryRetrievalRequest: DeliveryRetrieval = new DeliveryRetrieval();
  shipmentRequest: ShipmentRequest = new ShipmentRequest();
  voidShipmentRequest: VoidShipmentRequest = new VoidShipmentRequest();
  updateErpRequest: UpdateErpRequest = new UpdateErpRequest();
  shipmentHeadersInfo: ShipmentHeadersInfo = new ShipmentHeadersInfo();
  shipmentCarrierDetails: ShipmentCarrierDetails = new ShipmentCarrierDetails();
  shipMethodMappingInfo: ShipMethodMappingInfo = new ShipMethodMappingInfo();
  carrierAcctNumbersInfo: CarrierAcctNumbersInfo = new CarrierAcctNumbersInfo();
  packingSlipRequest: PackingSlipRequest = new PackingSlipRequest();
  shippingFormGroup!: FormGroup;
  shipmentLinesInfoFormGroup!: FormGroup;
  shipmentPackagesInfoList!: FormArray;
  intlDutiesTaxesFormGroup!: FormGroup;
  orderDetails!: string;
  shipFlag!: boolean;
  uscoFlag!: boolean;
  ciFlag!: boolean;
  fields: any = [];
  deliveryId!: string;
  orderNumber!: string;
  profileOptions: any;
  @ViewChild(HeaderDetailsComponent)
  headerDetailsComponent!: HeaderDetailsComponent;
  @ViewChild(SharedComponent)
  sharedComponent!: SharedComponent;
  shipFromLocationsInfoList!: any[];
  printersList!: any[];
  shipMethodMappingInfoList!: any[];
  shipButtonEnabled: Boolean = false;
  voidButtonEnabled: boolean = false;
  printPackSlipButtonEnabled: boolean = false;
  shipConfirmButtonEnabled: boolean = false;
  reprintButtonEnabled: boolean = false;
  viewLabelButtonEnabled: boolean = false;
  getInventoryLookupsPromise!: any;
  getCarrierDetailsPromise!: any;
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  accountNumber!: string;
  shipmethod!: string;
  erpType!: string;
  intlFlag: boolean = false;
  consolidationFlag: boolean = false;
  waybillNumber: string = '';
  searchCritirea!: string;
  noOfPackages: any;
  labelPath!: string;
  defaultFocus!: string;
  freightShoppingFlag: boolean = false;
  @ViewChild(ViewLabelsComponent) viewLabelsComponent!: ViewLabelsComponent;
  @Input() activeComponent!: string;
  configuration!: string;
  deliveryLabel!: any;
  autoConsolidation: boolean = false;
  //childShipments: ShipmentHeadersInfo[] = [];

  carrierOrgAcctDetailsInfo: CarrierOrgAcctDetailsInfo =
    new CarrierOrgAcctDetailsInfo();
  headerCol!: string;
  shipmentRetrievalCriteria!: string;
  fulfillmentFlag: boolean = false;
  deliveryIdsList: string[] = [];
  dimensionsInfoList: DimensionsInfo[] = [];
  defaultedDimension!: DimensionsInfo;
  defaultWeightUom: any;
  toPageChange!: any;
  mpsFlag: boolean = false;
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private shippingService: ShippingService,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService,
    private sharedUtilService: SharedUtilService,
    private printService: PrintService,
    private carrierConfigurationsService: CarrierConfigurationsService,
    private cdr: ChangeDetectorRef,
    private configService: ConfigurationLoaderService,
    private sharedShippingUtilService: SharedShippingUtilService,
    private elementRef: ElementRef,
    private packageDimensionsService: PackageDimensionsService,
    private sharedShippingSubjectsService: SharedShippingSubjectsService,
    private consodilationDataService: ConsolidationDataService
  ) {}

  ngOnInit() {
    this.userData = this.localStorageService.getLocalUserData();
    this.labelPath = this.userData.labelPath;
    let subscriptionData = this.userData.clientSubscriptionInfoList;
    subscriptionData.forEach((subscription: any) => {
      if ('CONSOLIDATION' === subscription.serviceName) {
        this.consolidationFlag = subscription.activeFlag;
      }
    });
    this.clientId = this.userData.clientId;
    this.orgId = this.userData.userInfo.orgId;
    this.invOrgId = this.userData.userInfo.invOrgId;
    this.erpType = this.userData.erpType;
    this.profileOptions = localStorage.getItem('profile_options');
    this.clientOrgProfileOptionsInfo = JSON.parse(this.profileOptions);
    if (this.erpType == 'NS') {
      this.shipmentRetrievalCriteria =
        'SalesOrder' ==
          this.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria ||
        'SalesOrderNoIf' ==
          this.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria
          ? 'Sales Order'
          : 'Fulfillment Id';
    } else if (this.erpType == 'JDE') {
      if ('SO' == this.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria) {
        this.shipmentRetrievalCriteria = 'Order Number';
      } else if (
        'SN' == this.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria
      ) {
        this.shipmentRetrievalCriteria = 'Shipment Number';
      } else if (
        'PN' == this.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria
      ) {
        this.shipmentRetrievalCriteria = 'Pick Number';
      }
    } else {
      this.shipmentRetrievalCriteria = this.deliveryLabel;
    }
    this.freightShoppingFlag =
      this.clientOrgProfileOptionsInfo.freightShoppingFlag;
    this.defaultFocus = this.clientOrgProfileOptionsInfo.defaultFocus;
    this.defaultWeightUom = this.clientOrgProfileOptionsInfo.defaultUom;
    this.authenticationDetails =
      this.sharedUtilService.getAuthenticationDetails(this.userData);
    this.orderDetails = 'fw-bold text-primary d-none';
    this.shipFlag = false;
    this.intlFlag = false;
    this.ciFlag = false;
    this.uscoFlag = false;
    //sameer g changed for consolidation

    this.shippingFormGroup = this.buildForm(
      this.fb.group<ShipmentHeadersInfo>(this.shipmentHeadersInfo),
      this.shipmentHeadersInfo
    );

    this.clientOrgProfileOptionsInfo.clientProfileSelectionsInfoList.forEach(
      (Element) => {
        if (Element.profileCode == 'AUTO_CONSOLIDATION' && Element.enabled) {
          this.sharedShippingUtilService._autoConsolidationSubject$.next(true);
        }
        if (Element.profileCode == 'ALLOW_BACKORDER_FLAG' && Element.enabled) {
          this.sharedShippingUtilService._allowBackOrderSubject$.next(true);
        }
      }
    );
    this.searchCritirea =
      this.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria;
    this.shippingFormGroup.disable();
    this.shippingFormGroup.get('deliveryId')?.enable();
    this.headerCol = 'col-md-3';
    let inputField =
      this.elementRef.nativeElement.querySelector(`[id="deliveryId"]`);
    inputField && inputField.focus();
    this.updateDefaultPackageDimension(
      this.clientId,
      this.orgId,
      this.invOrgId
    );

    this.configService.getConfiguration().subscribe((config) => {
      this.deliveryLabel = config?.deliveryLabel;
    });
    this.sharedShippingSubjectsService
      .getCarrierCode()
      .subscribe((carrierCode) => {
        this.carrierCode = carrierCode;
      });
    this.sharedShippingSubjectsService.getCarrierId().subscribe((carrierId) => {
      this.carrierId = carrierId;
    });
    this.sharedShippingSubjectsService
      .getCarrierMode()
      .subscribe((carrierMode) => {
        this.carrierMode = carrierMode;
      });
    this.sharedShippingSubjectsService
      .getCarrierAcctNumbersInfo()
      .subscribe((accountInfo) => {
        this.carrierAcctNumbersInfo = accountInfo;
      });

    this.sharedShippingSubjectsService
      .getShipMethodMappingInfo()
      .subscribe((shipMethodMapping) => {
        this.shipMethodMappingInfo = shipMethodMapping;
      });
    this.sharedShippingSubjectsService
      .getShipmentCarrierDetails()
      .subscribe((carrierDetails) => {
        this.shipmentCarrierDetails = carrierDetails;
      });

    console.log('deliveryLabel::' + this.deliveryLabel);
  }

  setShipButtonEnabled(newValue: Boolean) {
    this.shipButtonEnabled = newValue;
  }

  printLabels(checkFlag: string, toPageChange: number, mpsFlag: boolean) {
    console.log('shipping ts : ', toPageChange, ' mpsFlag : ', mpsFlag);
    this.carrierConfigurationsService
      .getCarrierConfigurationDetails(
        this.clientId,
        this.orgId,
        this.invOrgId,
        this.carrierId
      )
      .subscribe({
        next: (resp: any) => {
          console.log(resp.data);
          this.shipmentCarrierDetails = resp.data;
          try {
            this.printService.printLabelService(
              this.shipmentHeadersInfo,
              this.shipmentCarrierDetails,
              this.deliveryIdsList,
              checkFlag,
              toPageChange,
              mpsFlag
            );
            if (checkFlag == 'Y') {
              this.toastr.success('Printed Successfully');
            }
          } catch (error) {
            this.toastr.error('Error occur labels');
          }
        },
      });
  }

  viewLabelPopup() {
    this.shipmentPackagesInfoList = this.shippingFormGroup.get(
      'shipmentPackagesInfoList'
    )?.value as FormArray;
    this.viewLabelsComponent.setPackageDetails(
      this.shipmentPackagesInfoList,
      this.labelPath,
      this.carrierOrgAcctDetailsInfo.labelFormat,
      this.deliveryId,
      this.carrierOrgAcctDetailsInfo.cn22LabelFormat,
      this.intlFlag
    );
  }

  getDeliveryDetails(deliveryId: string) {
    this.deliveryRetrievalRequest.authenticationDetails =
      this.authenticationDetails;
    this.deliveryRetrievalRequest.clientId = this.clientId;
    this.deliveryRetrievalRequest.userId = this.userData.userInfo.userId;
    this.deliveryRetrievalRequest.labelPath = this.userData.labelPath;
    this.deliveryRetrievalRequest.orgId = this.orgId;
    this.deliveryRetrievalRequest.invOrgId = this.invOrgId;
    this.deliveryRetrievalRequest.deliveryId = deliveryId;
    this.deliveryRetrievalRequest.erpType = this.userData.erpType;
    this.deliveryRetrievalRequest.clientOrgProfileOptionsInfo =
      this.clientOrgProfileOptionsInfo;
    this.deliveryRetrievalRequest.clientOrgProfileOptionsInfo.shipmentRetrievalCriteria =
      this.fulfillmentFlag ? 'FulfillmentId' : this.searchCritirea;
    this.deliveryRetrievalRequest.oracleUserId =
      this.userData.userInfo.oracleUserId;
    this.deliveryRetrievalRequest.oracleResponsibilityId =
      this.userData.userInfo.oracleResponsibilityId;
    this.deliveryRetrievalRequest.userInfo = this.userData.userInfo;
    this.deliveryRetrievalRequest.reportPath = this.userData.reportPath;
  }

  getDeliveryInfo(): Promise<void> {
    return new Promise((resolve, reject) => {
      let deliveryId = this.shippingFormGroup.value['deliveryId'];
      if (this.shipFlag) {
        if (
          this.deliveryRetrievalRequest.clientOrgProfileOptionsInfo
            .shipmentRetrievalCriteria != 'FulfillmentId' &&
          this.erpType == 'NS'
        ) {
          deliveryId = this.shippingFormGroup.value['orderNumber'];
          console.log('deliveryId : ', deliveryId);
        } else if (
          this.deliveryRetrievalRequest.clientOrgProfileOptionsInfo
            .shipmentRetrievalCriteria == 'SN' &&
          this.erpType == 'JDE'
        ) {
          deliveryId = this.shippingFormGroup.value['deliveryId'];
        } else if (
          this.deliveryRetrievalRequest.clientOrgProfileOptionsInfo
            .shipmentRetrievalCriteria == 'SO' &&
          this.erpType == 'JDE'
        ) {
          deliveryId = this.shippingFormGroup.value['orderNumber'];
        } else if (
          this.deliveryRetrievalRequest.clientOrgProfileOptionsInfo
            .shipmentRetrievalCriteria == 'PO' &&
          this.erpType == 'JDE'
        ) {
          deliveryId = this.shippingFormGroup.value['deliveryId'];
        }
      }
      if (deliveryId != '') {
        this.getDeliveryDetails(deliveryId);
        this.spinner.show();
        this.sharedComponent.activeComponent = 'packageComponent';
        this.shippingFormGroup.reset();
        this.buildForm(
          this.fb.group<ShipmentHeadersInfo>(new ShipmentHeadersInfo()),
          new ShipmentHeadersInfo()
        );
        this.shippingFormGroup.disable();
        this.shippingFormGroup.get('deliveryId')?.enable();
        this.shipFlag = false;
        this.intlFlag = false;
        this.carrierId = 0;
        this.carrierCode = 0;
        this.carrierMode = '';
        this.headerDetailsComponent.carrierId = 0;
        this.headerDetailsComponent.carrierCode = 0;
        this.headerDetailsComponent.carrierMode = '';
        this.orderNumber = '';
        this.deliveryId = '';
        this.shippingService
          .getDeliveryDetails(this.deliveryRetrievalRequest)
          .subscribe({
            next: (resp: any) => {
              if (resp.code == 200) {
                this.shippingFormGroup.enable();
                //document.getElementById('numberofRowsToAdd').value=
                this.sharedComponent.packageDetailscomponent.numToAdd = 1;

                this.noOfPackages = 1;
                this.shipFromLocationsInfoList = [];
                this.spinner.hide();
                if (this.clientOrgProfileOptionsInfo.usppiInfo.usppiIdType) {
                  resp.data.shipmentHeadersInfo.intlDutiesTaxesInfo.shipFromTaxIdType =
                    this.clientOrgProfileOptionsInfo.usppiInfo.usppiIdType;
                }
                this.shipmentHeadersInfo = resp.data.shipmentHeadersInfo;
                this.carrierOrgAcctDetailsInfo =
                  resp.data.shipmentCarrierDetails;

                //Karthik.k -- added code for adding shipmethodmapping & carrier details for ship request on delivery retrieval
                this.headerDetailsComponent.shipMethodMappingInfo =
                  resp.data.shipMethodMappingInfo;
                this.shipMethodMappingInfo = resp.data.shipMethodMappingInfo;
                this.shipmentCarrierDetails = resp.data.shipmentCarrierDetails;

                //sameer g --added code for consolidation shipments
                this.consodilationDataService
                  .getChildShipmentHeaderInfoListSubject()
                  .next(
                    resp.data.shipmentHeadersInfo.childShipmentHeadersInfoList
                  );

                //sameer g --added code for consistent paymethod
                this.sharedShippingUtilService.paymethodSubject$.next(
                  resp.data.shipmentHeadersInfo.intlDutiesTaxesInfo.payorType
                );

                //sameer g --added code for accnt number
                this.sharedShippingUtilService._accountNumberSubject$.next(
                  resp.data.shipmentHeadersInfo.intlDutiesTaxesInfo
                    .accountNumber
                );

                console.log(
                  'this.shipMethodMappingInfo :: ',
                  this.shipMethodMappingInfo
                );
                console.log(
                  'this.shipmentCarrierDetails :: ',
                  this.shipmentCarrierDetails
                );
                this.getInventoryLookupsPromise = this.getInventoryLookups(
                  this.clientId,
                  this.orgId,
                  this.invOrgId
                );
                this.getInventoryLookupsPromise.then(() => {
                  this.shipFromLocationsInfoList.push(
                    resp.data.shipmentHeadersInfo.shipFromAddrInfo
                  );
                  this.patchFormData(resp.data.shipmentHeadersInfo);

                  this.intlFlag = resp.data.shipmentHeadersInfo.intlFlag;
                  this.uscoFlag = resp.data.shipmentHeadersInfo.uscoFlag;
                  this.ciFlag = resp.data.shipmentHeadersInfo.ciFlag;
                  this.deliveryId = this.shipmentHeadersInfo.deliveryId;
                  this.orderNumber = this.shipmentHeadersInfo.orderNumber;
                  this.orderDetails = 'fw-bold text-primary d-inline';
                  this.shipFlag = this.shipmentHeadersInfo.shipFlag;
                  this.carrierId = this.shipmentHeadersInfo.carrierId;
                  if (resp.data.shipmentHeadersInfo.shipmentLinesInfoList) {
                    this.patchLinesData(
                      resp.data.shipmentHeadersInfo.shipmentLinesInfoList
                    );
                  }
                  if (resp.data.shipmentHeadersInfo.shipmentPackagesInfoList) {
                    this.patchPackageData(
                      resp.data.shipmentHeadersInfo.shipmentPackagesInfoList,
                      this.shipFlag
                    );
                  }
                  //sameer g added code for consolidation
                  if (
                    resp.data.shipmentHeadersInfo.childShipmentHeadersInfoList
                  ) {
                    this.patchConsolidationData(
                      resp.data.shipmentHeadersInfo.childShipmentHeadersInfoList
                    );
                  }
                  this.updateSharedUtilDetails(this.carrierId);
                  if (this.shipFlag) {
                    this.sharedComponent.packageDetailscomponent.addDisable =
                      true;
                    this.carrierId = this.shipmentHeadersInfo.carrierId;
                  }
                  if (this.shipmentHeadersInfo.shipMethod != '') {
                    this.carrierCode =
                      this.carrierOrgAcctDetailsInfo.carrierCode;
                  }
                  if (this.carrierCode == 100 || this.carrierCode == 110) {
                    if (this.carrierCode == 100) {
                      this.sharedComponent.packageDetailscomponent.mpsDisable =
                        true;
                    }

                    this.shipmentPackagesInfoList = this.shippingFormGroup.get(
                      'shipmentPackagesInfoList'
                    ) as FormArray;
                    var weight = (
                      this.shipmentPackagesInfoList.at(
                        this.shipmentPackagesInfoList.length - 1
                      ) as FormGroup
                    ).get('weight')?.value;

                    if (Number(weight) > 0 && Number(weight) < 150) {
                      this.sharedComponent.packageDetailscomponent.addDisable =
                        false;
                    } else {
                      this.sharedComponent.packageDetailscomponent.addDisable =
                        true;
                    }
                  }
                  this.shipButtonEnabled = !this.shipFlag;
                  this.shipConfirmButtonEnabled = !(
                    this.shipmentHeadersInfo.shipConfirmFlag || !this.shipFlag
                  );
                  this.voidButtonEnabled = !(
                    this.shipmentHeadersInfo.voidFlag || !this.shipFlag
                  );
                  this.reprintButtonEnabled = this.shipFlag;
                  this.printPackSlipButtonEnabled = this.shipFlag;
                  this.viewLabelButtonEnabled = this.shipFlag;
                  this.waybillNumber =
                    this.shippingFormGroup.get('waybillNumber')?.value;
                  if (this.shipmentHeadersInfo.shipMethod != '') {
                    this.carrierId = this.carrierOrgAcctDetailsInfo.carrierId;
                    this.carrierCode =
                      this.carrierOrgAcctDetailsInfo.carrierCode;
                    this.carrierMode =
                      this.carrierOrgAcctDetailsInfo.carrierMode;
                    this.headerDetailsComponent.getHeaderLookupValues(
                      this.clientId,
                      this.orgId,
                      this.invOrgId,
                      this.carrierId,
                      this.carrierCode,
                      this.carrierMode
                    );
                  }
                  let emailNotificationFlag: boolean = this.shippingFormGroup
                    .get('emailNotificationInfo')
                    ?.get('emailNotificationFlag')?.value;
                  console.log('emailNotificationFlag' + emailNotificationFlag);
                  if (!emailNotificationFlag) {
                    this.shippingFormGroup
                      .get('emailNotificationInfo')
                      ?.get('emailNotificationFlag')
                      ?.disable();
                  } else {
                    this.shippingFormGroup
                      .get('emailNotificationInfo')
                      ?.get('emailNotificationFlag')
                      ?.enable();
                  }
                  if (this.shipFlag) {
                    this.shippingFormGroup.disable();
                    this.shippingFormGroup.get('deliveryId')?.enable();
                  } else {
                    (
                      this.shippingFormGroup.get(
                        'shipmentLinesInfoList'
                      ) as FormArray
                    ).disable();
                  }
                });
                //   added for subject

                console.log('this.carrierId ', this.carrierId);
                this.sharedShippingSubjectsService.setCarrierId(this.carrierId);
                this.sharedShippingSubjectsService.setCarrierCode(
                  this.carrierCode
                );
                this.sharedShippingSubjectsService.setCarrierMode(
                  this.carrierMode
                );
                this.sharedShippingSubjectsService.setShipMethodMappingInfo(
                  this.shipMethodMappingInfo
                );
                this.sharedShippingSubjectsService.setShipmentCarrierDetails(
                  this.shipmentCarrierDetails
                );
                this.sharedShippingSubjectsService.setCarrierAcctNumbersInfo(
                  this.carrierAcctNumbersInfo
                );

                this.headerCol = 'col-md-3 headerCol';
                this.sharedShippingUtilService._shipButtonEnabled.subscribe(
                  (newValue: Boolean) => {
                    console.log('triggered');
                    this.setShipButtonEnabled(newValue);
                    this.cdr.detectChanges();
                  }
                );
                setTimeout(() => {
                  resolve();
                }, 1000);
              } else {
                this.headerCol = 'col-md-3';
                this.spinner.hide();
                this.orderDetails = 'fw-bold text-primary d-none';
                this.shipFlag = false;
                this.shipButtonEnabled = false;
                this.voidButtonEnabled = false;
                this.shipConfirmButtonEnabled = false;
                this.reprintButtonEnabled = false;
                this.viewLabelButtonEnabled = false;
                this.printPackSlipButtonEnabled = false;
                this.toastr.error(resp.data.message);
                reject();
              }
            },
            error: (error: any) => {
              this.spinner.hide();
              this.orderDetails = 'fw-bold text-primary d-none';
              this.toastr.error(error.error.message);
            },
          });
        this.sharedComponent.setActiveComponent('packageComponent');
      } else {
        this.toastr.error('Please enter Delivery Id and continue!');
        reject();
      }
    });
  }

  get getShipmentHeadersInfo() {
    return this.shippingFormGroup;
  }
  get getDocumentInfo() {
    return this.shippingFormGroup.get('documentInfo') as FormGroup;
  }
  get getShipmentLinesInfoList(): FormArray {
    return this.shippingFormGroup.get('shipmentLinesInfoList') as FormArray;
  }
  get getShipmentPackageInfoList(): FormArray {
    return this.shippingFormGroup.get('shipmentPackagesInfoList') as FormArray;
  }
  get getPrinterInfo(): FormGroup {
    return this.shippingFormGroup.get('printerInfo') as FormGroup;
  }

  removeValidators(formGroup: AbstractControl) {
    if (formGroup instanceof FormGroup || formGroup instanceof FormArray) {
      Object.values(formGroup.controls).forEach((control) => {
        this.removeValidators(control);
      });
    } else {
      formGroup.clearValidators();
      formGroup.updateValueAndValidity();
    }
  }
  ship() {
    console.log('shipform group before ship is', this.shippingFormGroup);

    (
      this.shippingFormGroup.get('childShipmentHeadersInfoList') as FormArray
    ).controls.forEach((control) => {
      this.removeValidators(control);

      if (control.invalid) {
        console.log('validation failed', control);
      }
    });

    Object.keys(this.shippingFormGroup.controls).forEach((key) => {
      const control = this.shippingFormGroup.get(key);
      if (control && control.invalid) {
        console.log(`Validation failed for control: ${key}`);
      }
    });
    if (this.shippingFormGroup.valid) {
      if (this.shippingFormGroup.get('intlFlag')?.value) {
        if (
          !(
            this.shippingFormGroup.get('ciFlag')?.value ||
            this.shippingFormGroup.get('uscoFlag')?.value
          )
        ) {
          this.toastr.error(
            'Please check Commercial Invoice or U.S Certificate Of Origin'
          );
          throw Error(
            'Please check Commercial Invoice or U.S Certificate Of Origin'
          );
        }
      }
      this.shippingFormGroup.enable();
      let deliveryId = this.shippingFormGroup.value['deliveryId'];
      this.shippingFormGroup.get('carrierId')?.patchValue(this.carrierId);
      this.shipmentHeadersInfo = this.shippingFormGroup.value;
      let packageArray = [];
      let packages: FormArray = this.shippingFormGroup.get(
        'shipmentPackagesInfoList'
      )?.value;
      for (let i = 0; i <= packages.length; i++) {
        if (packages.at(i))
          packageArray.push(this.getFormAsJson(packages.at(i)));
      }
      this.shipmentHeadersInfo.shipmentPackagesInfoList = packageArray;
      if (deliveryId != '') {
        this.spinner.show();
        this.shipmentRequest.clientId = this.clientId;
        this.shipmentRequest.userId = this.userData.userInfo.userId;
        this.shipmentRequest.labelPath = this.userData.labelPath;
        this.shipmentRequest.orgId = this.orgId;
        this.shipmentRequest.invOrgId = this.invOrgId;
        this.shipmentRequest.oracleUserId = this.userData.userInfo.oracleUserId;
        this.shipmentRequest.oracleResponsibilityId =
          this.userData.userInfo.oracleResponsibilityId;
        this.shipmentRequest.erpType = this.userData.erpType;
        this.shipmentRequest.authenticationDetails = this.authenticationDetails;
        this.shipmentRequest.clientOrgProfileOptionsInfo =
          this.clientOrgProfileOptionsInfo;
        this.shipmentRequest.shipmentCarrierDetails =
          this.shipmentCarrierDetails;
        this.shipmentRequest.shipMethodMappingInfo = this.shipMethodMappingInfo;
        this.shipmentRequest.carrierAcctNumbersInfo =
          this.carrierAcctNumbersInfo;
        this.shipmentHeadersInfo.shipmentDate =
          this.sharedUtilService.dateFormatOnSave(
            this.shippingFormGroup.get('shipmentDate')?.value
          );
        this.shipmentRequest.shipmentHeadersInfo = this.shipmentHeadersInfo;
        this.shipmentRequest.consolidationFlag = this.consolidationFlag;
      }
      this.shippingService.ship(this.shipmentRequest).subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          if (this.shipFlag) {
            this.toPageChange =
              resp.data.shipmentHeadersInfo.printerInfo.printToPage;
            this.mpsFlag = true;
          }
          this.shipFlag = true;
          this.getDeliveryInfo().then(() => {
            if (
              this.shipmentRequest.clientOrgProfileOptionsInfo
                .shipShipPrintConfirmPakslp
            ) {
              this.toastr.success(
                'Shipped, Printed, ShipConfirmed & Print PackSlip Successfully'
              );
              console.log('shipPrintConfirmPackingSlip');
              this.printPackSlip('N', this.toPageChange, this.mpsFlag).then(
                () => {
                  this.confirm('N');
                }
              );
            } else if (
              this.shipmentRequest.clientOrgProfileOptionsInfo
                .shipShipPrintConfirm
            ) {
              this.toastr.success(
                'Shipped, Printed & ShipConfirmed Successfully'
              );
              this.printLabels('N', this.toPageChange, this.mpsFlag);
            } else if (
              this.shipmentRequest.clientOrgProfileOptionsInfo.shipShipPrint
            ) {
              this.toastr.success('Shipped & Printed Successfully');
              this.printLabels('N', this.toPageChange, this.mpsFlag);
            } else {
              this.toastr.success('Shippped Successfully');
            }
          });
        },
        error: (error: any) => {
          this.spinner.hide();
          if (this.shipmentHeadersInfo.shipFlag) {
            this.shippingFormGroup.disable();
            this.shippingFormGroup.get('deliveryId')?.enable();
            (
              this.shippingFormGroup.get(
                'shipmentPackagesInfoList'
              ) as FormArray
            ).controls.forEach((shipPackageFG: any) => {
              if (
                (shipPackageFG as FormGroup).get('trackingNumber')?.value == ''
              ) {
                (shipPackageFG as FormGroup).enable();
              }
            });
          }
          this.toastr.error('Error in Shipping...' + error.error.status);
        },
      });
    } else {
      //this.shippingFormGroup.enable();
      this.markFormGroupAndControlsTouched(this.shippingFormGroup);
      this.shippingFormGroup.markAllAsTouched();
      if (
        !(this.shippingFormGroup.get('shipmentPackagesInfoList') as FormArray)
          .valid
      ) {
        this.toastr.error(
          'Please Provide Mandatory Package Details & package Options'
        );
      } else {
        this.toastr.error('Please provide mandatory Details');
      }
    }
  }

  markFormGroupAndControlsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      (control as AbstractControl).markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupAndControlsTouched(control);
      }
    });
  }
  printPackSlip(
    packSlipFlag: string,
    toPageChange: number,
    mpsFlag: boolean
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('enter pirnt packslip');
      let deliveryId = this.shippingFormGroup.value['deliveryId'];
      if (deliveryId != '') {
        this.deliveryIdsList.push(this.deliveryId);
        if (packSlipFlag == 'Y') {
          this.spinner.show();
        }
        this.packingSlipRequest.authenticationDetails =
          this.authenticationDetails;
        this.packingSlipRequest.deliveryIdsList = this.deliveryIdsList;
        this.packingSlipRequest.labelPath = this.userData.labelPath;
        this.packingSlipRequest.parentDeliveryId = this.deliveryId;
        this.packingSlipRequest.erpType = this.erpType;
        console.log(this.packingSlipRequest);
        this.shippingService
          .printPackingSlip(this.packingSlipRequest)
          .subscribe({
            next: (resp: any) => {
              if (packSlipFlag == 'Y') {
                this.spinner.hide();
                if (this.erpType == 'SCM') {
                  this.toastr.success(
                    'Packing Slip Report Request ID ' + resp.data
                  );
                } else {
                  this.toastr.success('Pack Slip Printed Successfully');
                }
                resolve(this.printLabels('packSlip', toPageChange, mpsFlag));
              } else if (packSlipFlag == 'N') {
                resolve(this.printLabels('N', toPageChange, mpsFlag));
              }
            },
            error: (error: any) => {
              this.spinner.hide();
              console.log(error);
              this.toastr.error(error.error.message);
              reject();
            },
          });
      }
    });
  }

  confirm(shipConfirmCheckFlag: string) {
    let deliveryId = this.shippingFormGroup.value['deliveryId'];
    if (deliveryId != '') {
      if (shipConfirmCheckFlag == 'Y') {
        this.spinner.show();
      }
      this.updateErpRequest.clientId = this.clientId;
      this.updateErpRequest.userId = this.userData.userInfo.userId;
      this.updateErpRequest.labelPath = this.userData.labelPath;
      this.updateErpRequest.orgId = this.orgId;
      this.updateErpRequest.invOrgId = this.invOrgId;
      this.updateErpRequest.oracleUserId = this.userData.userInfo.oracleUserId;
      this.updateErpRequest.oracleResponsibilityId =
        this.userData.userInfo.oracleResponsibilityId;
      this.updateErpRequest.erpType = this.userData.erpType;
      this.updateErpRequest.authenticationDetails = this.authenticationDetails;
      this.updateErpRequest.clientOrgProfileOptionsInfo =
        this.clientOrgProfileOptionsInfo;
      this.updateErpRequest.shipmentHeadersInfo = this.shipmentHeadersInfo;
      this.updateErpRequest.shipMethodMappingInfo = this.shipMethodMappingInfo;
      this.updateErpRequest.mode = 'S';
    }
    this.shippingService.shipConfirm(this.updateErpRequest).subscribe({
      next: (resp: any) => {
        this.shipConfirmButtonEnabled = false;
        if (shipConfirmCheckFlag == 'Y') {
          this.spinner.hide();
          this.toastr.success('Ship Confirm Successfully');
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }

  void() {
    let deliveryId = this.shippingFormGroup.value['deliveryId'];
    if (deliveryId != '') {
      this.spinner.show();
      this.voidShipmentRequest.clientId = this.clientId;
      this.voidShipmentRequest.userId = this.userData.userInfo.userId;
      this.voidShipmentRequest.labelPath = this.userData.labelPath;
      this.voidShipmentRequest.orgId = this.orgId;
      this.voidShipmentRequest.invOrgId = this.invOrgId;
      this.voidShipmentRequest.oracleUserId =
        this.userData.userInfo.oracleUserId;
      this.voidShipmentRequest.oracleResponsibilityId =
        this.userData.userInfo.oracleResponsibilityId;
      this.voidShipmentRequest.erpType = this.userData.erpType;
      this.voidShipmentRequest.authenticationDetails =
        this.authenticationDetails;
      this.voidShipmentRequest.clientOrgProfileOptionsInfo =
        this.clientOrgProfileOptionsInfo;
      this.voidShipmentRequest.shipmentHeadersInfo = this.shipmentHeadersInfo;
    }
    this.shippingService.void(this.voidShipmentRequest).subscribe({
      next: (resp: any) => {
        this.toastr.success('Voided Successfully');
        this.getDeliveryInfo();
        console.log(resp.data);
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.error.status);
      },
    });
  }

  buildForm(
    shippingFormGroup: FormGroup,
    shipmentHeaderInfo: ShipmentHeadersInfo
  ) {
    //*** Building packages formArray-start **** /
    shippingFormGroup.removeControl('shipmentPackagesInfoList');
    let packagesArray: FormArray = this.fb.array([]);
    packagesArray.push(this.buildPackagesInfoForm(new ShipmentPackagesInfo()));
    shippingFormGroup.addControl('shipmentPackagesInfoList', packagesArray);
    //*** Building packages formArray-end **** /
    //*** Building lines formArray-start **** /
    shippingFormGroup.removeControl('shipmentLinesInfoList');
    let linesArray: FormArray = this.fb.array([]);
    linesArray.push(this.buildLinesInfoForm(new ShipmentLinesInfo()));
    shippingFormGroup.addControl('shipmentLinesInfoList', linesArray);
    //*** Building lines formArray-end **** /
    this.addOrUpdateControl(
      shippingFormGroup,
      'shipFromAddrInfo',
      shipmentHeaderInfo.shipFromAddrInfo != null
        ? shipmentHeaderInfo.shipFromAddrInfo
        : new AddressInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'shipToAddrInfo',
      shipmentHeaderInfo.shipToAddrInfo != null
        ? shipmentHeaderInfo.shipToAddrInfo
        : new AddressInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'additionalShipmentInfo',
      shipmentHeaderInfo.additionalShipmentInfo != null
        ? shipmentHeaderInfo.additionalShipmentInfo
        : new AdditionalShipmentInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'billToAddrInfo',
      shipmentHeaderInfo.billToAddrInfo != null
        ? shipmentHeaderInfo.billToAddrInfo
        : new AddressInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'shipmentChargesInfo',
      shipmentHeaderInfo.shipmentChargesInfo != null
        ? shipmentHeaderInfo.shipmentChargesInfo
        : new ShipmentChargesInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'emailNotificationInfo',
      shipmentHeaderInfo.emailNotificationInfo != null
        ? shipmentHeaderInfo.emailNotificationInfo
        : new EmailNotificationInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'customAttributesInfo',
      shipmentHeaderInfo.customAttributesInfo != null
        ? shipmentHeaderInfo.customAttributesInfo
        : new CustomAttributesInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'originalShipToAddressInfo',
      shipmentHeaderInfo.originalShipToAddressInfo != null
        ? shipmentHeaderInfo.originalShipToAddressInfo
        : new AddressInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'printerInfo',
      shipmentHeaderInfo.printerInfo != null
        ? shipmentHeaderInfo.printerInfo
        : new PrinterInfo()
    );
    this.addOrUpdateControl(
      shippingFormGroup,
      'intlCN22Info',
      shipmentHeaderInfo.intlCN22Info != null
        ? shipmentHeaderInfo.intlCN22Info
        : new IntlCN22Info()
    );
    shippingFormGroup.get('shipMethod')?.setValidators(Validators.required);
    shippingFormGroup.get('carrierPayCode')?.setValidators(Validators.required);
    shippingFormGroup
      .get('carrierAccountNo')
      ?.setValidators(Validators.required);
    shippingFormGroup.get('shipmentDate')?.setValidators(Validators.required);

    this.addOrUpdateControl(shippingFormGroup, 'intlCiInfo', new IntlCiInfo());

    let intlCiForm: FormGroup = shippingFormGroup.get(
      'intlCiInfo'
    ) as FormGroup;

    intlCiForm.get('invoiceNumber')?.setValidators(Validators.required);
    intlCiForm.get('invoiceDate')?.setValidators(Validators.required);
    intlCiForm.get('currencyCode')?.setValidators(Validators.required);

    this.addOrUpdateControl(
      shippingFormGroup,
      'intlDutiesTaxesInfo',
      new IntlDutiesTaxesInfo()
    );

    this.addOrUpdateControl(
      shippingFormGroup,
      'intlImporterInfo',
      new AddressInfo()
    );

    this.addOrUpdateControl(
      shippingFormGroup,
      'intlSoldToInfo',
      new AddressInfo()
    );

    this.addOrUpdateControl(
      shippingFormGroup,
      'intlUscoInfo',
      new IntlUscoInfo()
    );

    //*** Building child consolidation formArray-start **** /
    shippingFormGroup.removeControl('childShipmentHeadersInfoList');
    let childShipmentHeadersArray: FormArray = this.fb.array([]);
    childShipmentHeadersArray.push(
      this.buildConsolidationForm(new ChildShipmentHeadersInfo())
    );
    shippingFormGroup.addControl(
      'childShipmentHeadersInfoList',
      childShipmentHeadersArray
    );

    this.addDestinationAddressValidators(shippingFormGroup);

    return shippingFormGroup;
  }

  buildConsolidationForm(
    childShipmentHeaderInfo: ChildShipmentHeadersInfo
  ): FormGroup {
    let childHeaderFormGroup: FormGroup = this.fb.group(
      childShipmentHeaderInfo
    );

    if (0 != childShipmentHeaderInfo.shipmentLinesInfoList.length) {
      let linesFormArray: FormArray = this.fb.array([]);
      childShipmentHeaderInfo.shipmentLinesInfoList.forEach((line) => {
        linesFormArray.push(this.buildLinesInfoForm(line));
      });

      childHeaderFormGroup.removeControl('shipmentLinesInfoList');
      childHeaderFormGroup.addControl('shipmentLinesInfoList', linesFormArray);
      //sameer g added
      this.cdr.markForCheck();
    }
    return childHeaderFormGroup;
  }

  buildPackagesInfoForm(shipmentPackageInfo: ShipmentPackagesInfo): FormGroup {
    let packagesInfoFormGroup: FormGroup = this.fb.group(shipmentPackageInfo);
    if (shipmentPackageInfo.codInfo != null) {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'codInfo',
        shipmentPackageInfo.codInfo
      );
    } else {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'codInfo',
        new CodInfo()
      );
    }
    if (shipmentPackageInfo.holdAtLocInfo != null) {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'holdAtLocInfo',
        shipmentPackageInfo.holdAtLocInfo
      );
    } else {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'holdAtLocInfo',
        new HoldAtLocInfo()
      );
    }
    packagesInfoFormGroup.removeControl('returnShipmentInfo');
    if (shipmentPackageInfo.returnShipmentInfo != null) {
      packagesInfoFormGroup.setControl(
        'returnShipmentInfo',
        this.buildReturnPackagesInfoForm(shipmentPackageInfo.returnShipmentInfo)
      );
    } else {
      packagesInfoFormGroup.setControl(
        'returnShipmentInfo',
        this.buildReturnPackagesInfoForm(new ReturnShipmentInfo())
      );
    }

    if (shipmentPackageInfo.uspsPkgInfo != null) {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'uspsPkgInfo',
        shipmentPackageInfo.uspsPkgInfo
      );
    } else {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'uspsPkgInfo',
        new UspsPkgInfo()
      );
    }

    if (shipmentPackageInfo.ltlPkgInfo != null) {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'ltlPkgInfo',
        shipmentPackageInfo.ltlPkgInfo
      );
    } else {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'ltlPkgInfo',
        new LtlPkgInfo()
      );
    }

    if (shipmentPackageInfo.hazmatInfo != null) {
      packagesInfoFormGroup.removeControl('hazmatInfo');
      packagesInfoFormGroup.addControl(
        'hazmatInfo',
        this.buildHazmatInfoForm(shipmentPackageInfo.hazmatInfo)
      );
    }

    if (shipmentPackageInfo.pkgChargesInfo != null) {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'pkgChargesInfo',
        shipmentPackageInfo.pkgChargesInfo
      );
    } else {
      packagesInfoFormGroup = this.addOrUpdateControlForForm(
        packagesInfoFormGroup,
        'pkgChargesInfo',
        new ShipmentChargesInfo()
      );
    }
    packagesInfoFormGroup.get('clientId')?.setValue(this.clientId);
    packagesInfoFormGroup.get('weight')?.setValidators(Validators.required);
    packagesInfoFormGroup
      .get('weightUomCode')
      ?.setValidators(Validators.required);
    packagesInfoFormGroup
      .get('dimensionName')
      ?.setValidators(Validators.required);
    packagesInfoFormGroup.get('dimUom')?.setValidators(Validators.required);
    packagesInfoFormGroup
      .get('packageLength')
      ?.setValidators(Validators.required);
    packagesInfoFormGroup
      .get('packageHeight')
      ?.setValidators(Validators.required);
    packagesInfoFormGroup
      .get('packageWidth')
      ?.setValidators(Validators.required);
    packagesInfoFormGroup.get('packaging')?.setValidators(Validators.required);
    packagesInfoFormGroup
      .get('signatureName')
      ?.setValidators(Validators.required);
    return packagesInfoFormGroup;
  }

  buildLinesInfoForm(model: ShipmentLinesInfo): FormGroup {
    let linesForm: FormGroup = this.fb.group(model);
    let itemControlsArray = model.shipmentItemControlsInfo;
    let itemControlsFormArray: FormArray = this.fb.array([]);
    if (itemControlsArray && itemControlsArray.length > 0) {
      itemControlsArray.forEach((element) => {
        itemControlsFormArray.push(this.fb.group(element));
      });
    } else {
      itemControlsFormArray.push(this.fb.group(new ShipmentItemControlsInfo()));
    }
    linesForm.removeControl('shipmentItemControlsInfo');
    linesForm.addControl('shipmentItemControlsInfo', itemControlsFormArray);

    return linesForm;
  }

  buildReturnPackagesInfoForm(
    returnShipmentInfo: ReturnShipmentInfo
  ): FormGroup {
    let returnShipmentForm: FormGroup = this.fb.group(returnShipmentInfo);
    returnShipmentForm = this.addOrUpdateControlForForm(
      returnShipmentForm,
      'shipFromAddrInfo',
      returnShipmentInfo.shipFromAddrInfo
    );
    returnShipmentForm = this.addOrUpdateControlForForm(
      returnShipmentForm,
      'shipToAddrInfo',
      returnShipmentInfo.shipToAddrInfo
    );

    returnShipmentForm = this.addOrUpdateControlForForm(
      returnShipmentForm,
      'carrierInfo',
      returnShipmentInfo.carrierInfo
    );
    returnShipmentForm = this.addOrUpdateControlForForm(
      returnShipmentForm,
      'paytermInfo',
      returnShipmentInfo.paytermInfo
    );
    return returnShipmentForm;
  }

  patchLinesData(linesData: Array<any>) {
    if (0 != linesData.length) {
      let linesFormArray: FormArray = this.fb.array([]);
      linesData.forEach((line) => {
        linesFormArray.push(this.buildLinesInfoForm(line));
      });
      this.shippingFormGroup.removeControl('shipmentLinesInfoList');
      this.shippingFormGroup.addControl(
        'shipmentLinesInfoList',
        linesFormArray
      );

      //sameer g added
      this.cdr.markForCheck();
    }
    // this.shippingFormGroup.get('shipmentLinesInfoList')?.patchValue(linesData);
  }

  patchConsolidationData(consolidationData: Array<any>) {
    if (0 != consolidationData.length) {
      let consolidationFormArray: FormArray = this.fb.array([]);
      consolidationData.forEach((consolidation) => {
        let consolidationFG = this.buildConsolidationForm(consolidation);

        consolidationFormArray.push(consolidationFG);
      });
      this.shippingFormGroup.removeControl('childShipmentHeadersInfoList');
      this.shippingFormGroup.addControl(
        'childShipmentHeadersInfoList',
        consolidationFormArray
      );
    }
  }
  patchPackageData(packageData: Array<any>, shipFlag: boolean) {
    if (0 != packageData.length) {
      let packagesFormArray: FormArray = this.fb.array([]);
      packageData.forEach((pack, index) => {
        this.noOfPackages = index + 1;
        console.log('shipFlag :: ', shipFlag);
        if (!shipFlag) {
          console.log('this.defaultedDimension :: ', this.defaultedDimension);
          if (
            this.defaultedDimension &&
            'Other' != this.defaultedDimension.dimensionName
          ) {
            console.log('patching default dimension');
            pack.dimensionName = this.defaultedDimension.dimensionName;
            pack.packageLength = this.defaultedDimension.dimensionLength;
            pack.packageHeight = this.defaultedDimension.dimensionHeight;
            pack.packageWidth = this.defaultedDimension.dimensionWidth;
            pack.dimUom = this.defaultedDimension.dimensionUnits;
            pack.dimensionWeight = this.defaultedDimension.dimensionWeight;
            pack.dimensionUnits = this.defaultedDimension.dimensionUnits;
            pack.weightUomCode = this.defaultWeightUom;
          } else {
            pack.dimensionName = 'Other';
            pack.packageLength = 0;
            pack.packageHeight = 0;
            pack.packageWidth = 0;
            pack.dimUom = 'IN';
            pack.dimensionWeight = 0;
            pack.dimensionUnits = 'IN';
          }
        }
        let packageFormGroup: FormGroup = this.buildPackagesInfoForm(pack);
        packageFormGroup.get('packageLength')?.disable();
        packageFormGroup.get('packageWidth')?.disable();
        packageFormGroup.get('packageHeight')?.disable();
        packageFormGroup.get('dimUom')?.disable();
        packageFormGroup.get('dimensionWeight')?.disable();
        packageFormGroup.get('dimensionUnits')?.disable();
        packagesFormArray.push(packageFormGroup);
        console.log('formArray ::', packagesFormArray);
      });

      this.shippingFormGroup.removeControl('shipmentPackagesInfoList');
      this.shippingFormGroup.addControl(
        'shipmentPackagesInfoList',
        packagesFormArray
      );
    }
  }

  patchFormData(data: any) {
    Object.keys(data).forEach((controlName) => {
      const controlValue = data[controlName];
      if (controlValue !== null && controlValue !== undefined) {
        this.shippingFormGroup.get(controlName)?.patchValue(controlValue);
      }
    });
  }
  addOrUpdateControl(formGroup: FormGroup, controlName: string, object: any) {
    formGroup.removeControl(controlName);
    formGroup.addControl(controlName, this.fb.group(object));
  }
  addOrUpdateControlForForm(
    formGroup: FormGroup,
    controlName: string,
    controlInstance: any
  ): FormGroup {
    formGroup.removeControl(controlName);
    formGroup.addControl(controlName, this.fb.group(controlInstance));
    return formGroup;
  }

  getFormAsJson(data: any): any {
    if (data) {
      Object.keys(data).forEach((controlName) => {
        const controlValue = data[controlName];
        if (controlValue !== null && controlValue !== undefined) {
          if (controlValue instanceof FormGroup) {
            data[controlName] = this.getFormAsJson(controlValue.value);
          } else {
            data[controlName] = controlValue;
          }
        }
      });
    }
    return data;
  }

  getInventoryLookups(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Promise<void> {
    const getInventoryLookupsPromise = new Promise<void>((resolve, reject) => {
      this.shippingService
        .getInventoryLookups(clientId, orgId, invOrgId)
        .subscribe({
          next: (response: any) => {
            this.shipFromLocationsInfoList =
              response.data.shipFromLocationsInfoList;
            this.printersList = response.data.printersList;

            this.shipMethodMappingInfoList =
              response.data.shipMethodMappingInfoList;
            resolve();
          },
          error: (error) => {
            reject(error);
          },
        });
    });
    return getInventoryLookupsPromise;
  }

  get getShipmentChargesInfo() {
    return this.shippingFormGroup.get('shipmentChargesInfo') as FormGroup;
  }
  addPackage(noOfPackagesToAdd: number) {
    if (noOfPackagesToAdd > 0) {
      let shipmentPackList: FormArray = this.shippingFormGroup.get(
        'shipmentPackagesInfoList'
      ) as FormArray;
      shipmentPackList.enable();
      let packagevalue = shipmentPackList.at(this.noOfPackages - 1).value;
      packagevalue.trackingNumber = '';
      for (let i = 0; i < noOfPackagesToAdd; i++) {
        let packageForm: FormGroup = this.buildPackagesInfoForm(packagevalue);
        packageForm.get('packageNum')?.setValue(this.noOfPackages + 1);
        shipmentPackList.push(packageForm);
        this.noOfPackages = this.noOfPackages + 1;
      }
      shipmentPackList.controls.forEach((abstractControl: AbstractControl) => {
        const formGroup = abstractControl as FormGroup;
        const trackingNumber = formGroup.get('trackingNumber')?.value;
        this.sharedComponent.packageDetailscomponent.disableDimensions(
          formGroup
        );
        if (trackingNumber && trackingNumber.trim() !== '') {
          formGroup.disable();
        }
      });
      this.shippingFormGroup.removeControl('shipmentPackagesInfoList');
      this.shippingFormGroup.addControl(
        'shipmentPackagesInfoList',
        shipmentPackList
      );
    }
  }

  removePackage(delAllPackages: boolean) {
    let shipmentPackList: FormArray = this.shippingFormGroup.get(
      'shipmentPackagesInfoList'
    ) as FormArray;
    const lastPackage = shipmentPackList.at(this.noOfPackages - 1) as FormGroup;
    const trackingNumber = lastPackage.get('trackingNumber')?.value;
    if (delAllPackages) {
      let shippedPackagesFlag = true;
      shipmentPackList.controls.forEach((formGroup: AbstractControl) => {
        const trackingNumber = (formGroup as FormGroup).get(
          'trackingNumber'
        )?.value;
        if (trackingNumber && trackingNumber.trim() !== '') {
          shippedPackagesFlag = false;
        }
      });

      if (!shippedPackagesFlag) {
        shipmentPackList.controls = shipmentPackList.controls.filter(
          (formGroup: AbstractControl) => {
            const trackingNumber = (formGroup as FormGroup).get(
              'trackingNumber'
            )?.value;
            return trackingNumber || trackingNumber.trim() !== '';
          }
        );
      }

      this.noOfPackages = shipmentPackList.length;
      if (this.noOfPackages === 0) {
        let packageAtFirstIndex: FormGroup = shipmentPackList.at(
          0
        ) as FormGroup;
        shipmentPackList = this.fb.array([]);
        shipmentPackList.push(packageAtFirstIndex);
        this.noOfPackages = 1;
      }

      if (!this.shipFlag) {
        let packageAtFirstIndex: FormGroup = shipmentPackList.at(
          0
        ) as FormGroup;
        shipmentPackList = this.fb.array([]);
        shipmentPackList.push(packageAtFirstIndex);
        this.noOfPackages = 1;

        this.shippingFormGroup.removeControl('shipmentPackagesInfoList');
        this.shippingFormGroup.addControl(
          'shipmentPackagesInfoList',
          shipmentPackList
        );
      }
    } else {
      if (1 != this.noOfPackages) {
        let packageAtLastIndex: FormGroup = shipmentPackList.at(
          this.noOfPackages - 1
        ) as FormGroup;
        let trackingNumber = packageAtLastIndex.get('trackingNumber')?.value;
        if (!trackingNumber || trackingNumber.trim() === '') {
          shipmentPackList.removeAt(this.noOfPackages - 1);
          this.noOfPackages = this.noOfPackages - 1;
        } else {
          // Handle the case where tracking number is present (you can show a message, etc.)
        }
      }
      this.shippingFormGroup.removeControl('shipmentPackagesInfoList');
      this.shippingFormGroup.addControl(
        'shipmentPackagesInfoList',
        shipmentPackList
      );
    }
  }
  buildHazmatInfoForm(hazmatInfo: HazmatInfo): FormGroup {
    let hazmatFormGroup: FormGroup = this.fb.group(hazmatInfo);
    let commodityArray = hazmatInfo.hazmatCommodityInfoList;
    let commodityFormArray: FormArray = this.fb.array([]);
    if (commodityArray && commodityArray.length > 0) {
      commodityArray.forEach((element) => {
        commodityFormArray.push(this.fb.group(element));
      });
    } else {
      commodityFormArray.push(this.fb.group(new HazmatCommodityInfo()));
    }
    hazmatFormGroup.removeControl('hazmatCommodityInfoList');
    hazmatFormGroup.addControl('hazmatCommodityInfoList', commodityFormArray);
    return hazmatFormGroup;
  }
  updateSharedUtilDetails(carrierId: any) {
    this.sharedShippingUtilService.returnAccountNumber =
      this.shipmentHeadersInfo.carrierAccountNo;
    this.sharedShippingUtilService.returnPaycode =
      this.shipmentHeadersInfo.carrierPayCode;
    this.sharedShippingUtilService.defaultReturnAccountNumber =
      this.shipmentHeadersInfo.carrierAccountNo;
    // this.sharedShippingUtilService.defaultRetuenRpAccountNumber = this.shipmentHeadersInfo.rpUpsAccNum;
    // this.sharedShippingUtilService.defaultReturnTpAccountNumber = this.shipmentHeadersInfo.tpUpsAccNum;
    if (carrierId) {
      this.sharedShippingUtilService.updateReturnShipmethodList(carrierId);
    }
  }
  updateDefaultPackageDimension(clientId: any, orgId: any, invOrgId: any) {
    this.packageDimensionsService
      .getPackageDimensions(clientId, orgId, invOrgId)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.dimensionsInfoList = resp;
          console.log('this.dimensionsInfoList', this.dimensionsInfoList);
          this.dimensionsInfoList.forEach((dimension) => {
            dimension.orgDimensionsInfoList.forEach((orgDimension) => {
              if (orgDimension.dimDefault) {
                this.defaultedDimension = dimension;
              }
            });
          });
        },
      });
  }

  updatePackageDimensions() {
    (
      this.shippingFormGroup.get('shipmentPackagesInfoList') as FormArray
    ).controls.forEach((pack, index) => {
      this.sharedComponent.packageDetailscomponent.disableDimensions(
        pack as FormGroup
      );
    });
  }
  addDestinationAddressValidators(shippingFormGroup: FormGroup) {
    let destinationAddressInfoForm: FormGroup = shippingFormGroup.get(
      'shipToAddrInfo'
    ) as FormGroup;
    destinationAddressInfoForm
      .get('addressLine1')
      ?.setValidators(Validators.required);
    destinationAddressInfoForm.get('city')?.setValidators(Validators.required);
    destinationAddressInfoForm.get('state')?.setValidators(Validators.required);
    destinationAddressInfoForm
      .get('postalCode')
      ?.setValidators(Validators.required);
    destinationAddressInfoForm
      .get('countryCode')
      ?.setValidators(Validators.required);
    destinationAddressInfoForm
      .get('phoneNumber')
      ?.setValidators(Validators.required);
    destinationAddressInfoForm
      .get('contactName')
      ?.setValidators(Validators.required);
    destinationAddressInfoForm
      .get('customerName')
      ?.setValidators(Validators.required);
  }
}
