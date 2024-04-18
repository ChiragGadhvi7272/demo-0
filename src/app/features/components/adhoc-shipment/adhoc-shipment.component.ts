import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTruck, faPrint, faBan } from '@fortawesome/free-solid-svg-icons';
import { AddressInfo } from 'src/app/shared/models/address-info.model';
import { IntlCiInfo } from 'src/app/shared/models/intl-ci-info.model';
import { IntlDutiesTaxesInfo } from 'src/app/shared/models/intl-duties-taxes-info.model';
import { IntlUscoInfo } from 'src/app/shared/models/intl-usco-info.model';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';
import { ShipmentLinesInfo } from 'src/app/shared/models/shipment-lines-info.model';
import { ShipmentPackagesInfo } from 'src/app/shared/models/shipment-packages-info.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { ShippingService } from '../../services/shipping.service';
import { HazmatInfo } from 'src/app/shared/models/hazmat-info.model';
import { HazmatCommodityInfo } from 'src/app/shared/models/hazmat-commodity-info.model';
import { ReturnShipmentInfo } from 'src/app/shared/models/return-shipment-info.model';
import { AdhocCarrierDetailsComponent } from './adhoc-shared/adhoc-carrier-details/adhoc-carrier-details.component';
import { CarrierOrgAcctDetailsInfo } from '../../models/carrier-org-acct-details-info.model';
import { AdhocSharedComponent } from './adhoc-shared/adhoc-shared.component';
@Component({
  selector: 'app-adhoc-shipment',
  templateUrl: './adhoc-shipment.component.html',
  styleUrls: ['./adhoc-shipment.component.css'],
})
export class AdhocShipmentComponent implements OnInit {
  faTruck = faTruck;
  faPrint = faPrint;
  faBan = faBan;
  adhocShipFormGroup!: FormGroup;
  shipmentHeadersInfo!: any;
  fields: any = [];
  clientId!: any;
  userData!: any;
  labelPath: any;
  consolidationFlag: any;
  orgId: any;
  invOrgId: any;
  erpType: any;
  profileOptions!: any;
  clientOrgProfileOptionsInfo: any;
  freightShoppingFlag: any;
  defaultFocus: any;
  authenticationDetails: any;
  // authenticationDetails!: import('d:/Product-Development/Redesign-ShipConsole/UI/25-01-2024/shipconsole-ui/src/app/features/models/authentication-details.model').AuthenticationDetails;
  orderDetails!: string;
  shipFlag!: boolean;
  intlFlag!: boolean;
  ciFlag!: boolean;
  uscoFlag!: boolean;
  paymethodsList!: any;
  packagingTypeList!: any;
  accountNumbersList!: any;
  @ViewChild(AdhocCarrierDetailsComponent)
  AdhocCarrierDetailsComponent!: AdhocCarrierDetailsComponent;
  @ViewChild(AdhocSharedComponent)
  adhocSharedComponent!: AdhocSharedComponent;
  carrierOrgAcctDetailsInfo: CarrierOrgAcctDetailsInfo =
    new CarrierOrgAcctDetailsInfo();
  noOfPackages!: any;
  carrierId!: number;
  carrierCode!: number;
  carrierMode!: string;
  shipFromLocationsInfoList!: any[];
  printersList!: any[];
  shipMethodMappingInfoList!: any[];
  getInventoryLookupsPromise!: any;
  shipButtonEnabled: boolean = false;
  voidButtonEnabled: boolean = false;
  shipConfirmButtonEnabled: boolean = false;
  reprintButtonEnabled: boolean = false;
  viewLabelButtonEnabled: boolean = false;
  waybillNumber: string = '';
  constructor(
    private fb: FormBuilder,
    private shippingService: ShippingService,
    private localStorageService: LocalStorageService,
    private sharedUtilService: SharedUtilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.shipmentHeadersInfo = {
      clientId: 95,
      shipmentId: 0,
      orderHeaderId: null,
      orderNumber: 'STDQ00001529',
      orderType: null,
      department: 'Location 1',
      deliveryId: 'I00001734',
      parentDeliveryId: 'I00001734',
      lpnCount: null,
      originalShipMethod: 'FedEx-Standard Overnight',
      originalCarrierCode: null,
      originalShipToAddressInfo: {
        locationName: 'Nashville',
        addressLine1: '245B Great Circle RD',
        addressLine2: 'Bldg 2',
        addressLine3: '',
        city: 'Nashville',
        countryCode: 'US',
        postalCode: '37228',
        state: 'TN',
        phoneNumber: '8004444729',
        contactName: 'Nathan Sherrin',
        customerName: 'Parallon Supply Services',
        taxId: null,
      },
      originalPaytermCode: 'PREPAID',
      carrierId: 5301,
      carrierName: 'FedEx',
      motCode: null,
      shipMethod: 'FedEx-Standard Overnight',
      carrierAccountNo: '5004654321',
      carrierPayCode: 'PREPAID',
      applyFreightFlag: null,
      shipFlag: false,
      printLabelFlag: false,
      shipConfirmFlag: false,
      voidFlag: false,
      manualTrackingFlag: null,
      shipmentStatusFlag: null,
      saturdayShipFlag: false,
      eodFlag: null,
      residentialFlag: false,
      releasedStatus: null,
      separateShipFlag: null,
      largePkgFlag: null,
      shipmentDate: '2024-02-05T10:49:51',
      printDate: null,
      shipConfirmDate: null,
      shipconfirmFailedDate: null,
      shipconfirmFailedFlag: null,
      shipconfirmFailedMessage: null,
      orgId: '1',
      invOrgId: '1',
      shipperName: 'SHIPCONSOLE',
      currencyCode: null,
      additionalShipmentInfo: {
        additionalShipmentInstructions: null,
        shipmentInstructions: null,
        deliveryInstructions: null,
      },
      waybillNumber: null,
      bolNumber: null,
      reference1: 'I00001734',
      reference2: 'STDQ00001529',
      totalPkgWeight: null,
      numberOfCartons: null,
      maxLinesCount: null,
      dropofftype: '',
      packaging: null,
      packSlipRequestId: null,
      distributionCenter: null,
      bundleId: null,
      jobSetName: null,
      jobSetPackageName: null,
      mbolFlag: null,
      mbolFilename: null,
      mbolGenForDelivery: null,
      batchId: null,
      shipFromAddrInfo: {
        locationName: 'Location 1',
        addressLine1: '132, My Street,',
        addressLine2: 'Kingston,',
        addressLine3: null,
        city: 'Mount Vernon',
        countryCode: 'US',
        postalCode: '10550',
        state: 'NY',
        phoneNumber: '7878475896',
        contactName: 'Customer Support',
        customerName: 'Location 1',
        taxId: null,
      },
      shipToAddrInfo: {
        locationName: 'Nashville',
        addressLine1: '245B Great Circle RD',
        addressLine2: 'Bldg 2',
        addressLine3: '',
        city: 'Nashville',
        countryCode: 'US',
        postalCode: '37228',
        state: 'TN',
        phoneNumber: '8004444729',
        contactName: 'Nathan Sherrin',
        customerName: 'Parallon Supply Services',
        taxId: null,
      },
      billToAddrInfo: {
        locationName: null,
        addressLine1: 'PSC 333 Box# 6037',
        addressLine2: '',
        addressLine3: null,
        city: 'APO',
        countryCode: 'United States',
        postalCode: '96251',
        state: 'AP',
        phoneNumber: '8888888888',
        contactName: 'APO Location',
        customerName: 'A. C. Networks - APO',
        taxId: null,
      },
      shipmentChargesInfo: {
        estimatedFreightCost: null,
        handlingCharge: null,
        insuranceCharge: null,
        estimatedNegotiatedRate: null,
        shipmentDeclaredValue: null,
        totalSurcharges: null,
        freightCost: null,
        shipmentCost: null,
        baseCharge: null,
      },
      emailNotificationInfo: {
        emailNotificationFlag: false,
        senderEmails: '',
        recipientEmailAddress1: 'teja007@shipconsole.com',
        recipientEmailAddress2: 'teja.lingabothu@shipconsole.com',
        recipientEmailAddress3: 'teja.lingabothu@shipconsole.com',
        recipientEmailAddress4: 'teja.lingabothu@shipconsole.com',
        recipientEmailAddress5: 'sunday123@shipconsole.com',
        emailMessage: null,
      },
      printerInfo: {
        printerName: null,
        printFromPage: 1,
        printToPage: 1,
        printAllPages: null,
        machineName: null,
        documentPrinter: null,
        op900PrinterName: null,
        dgformPrinterName: null,
        noOfCopiesPrinted: 0,
        noOfLabelsToPrint: 1,
      },
      paytermInfo: {
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        state: '',
        postalCode: '',
        countryCode: '',
        customerName: '',
        contactName: '',
        phoneNumber: '',
        dduCheck: '',
        shippingChargesCheck: '',
      },
      customAttributesInfo: {
        attribute01: '',
        attribute02: '',
        attribute03: '',
        attribute04: '',
        attribute05: '',
        attribute06: '',
        attribute07: '',
        attribute08: '',
        attribute09: '',
        attribute10: '',
      },
      worldEaseFlag: null,
      consolidationIndex: null,
      intlFlag: false,
      intlImporterInfo: {
        locationName: null,
        addressLine1: '245B Great Circle RD',
        addressLine2: 'Bldg 2',
        addressLine3: null,
        city: 'Nashville',
        countryCode: 'US',
        postalCode: '37228',
        state: 'TN',
        phoneNumber: '8004444729',
        contactName: 'Nathan Sherrin',
        customerName: 'Parallon Supply Services',
        taxId: null,
      },
      intlBrokerInfo: null,
      intlSoldToInfo: {
        locationName: null,
        addressLine1: 'PSC 333 Box# 6037',
        addressLine2: null,
        addressLine3: null,
        city: 'APO',
        countryCode: 'US',
        postalCode: '96251',
        state: 'AP',
        phoneNumber: '8888888888',
        contactName: 'APO Location',
        customerName: 'A. C. Networks - APO',
        taxId: '',
      },
      intlUscoInfo: {
        exportDate: '2024-02-05T10:49:52.279+00:00',
        exportCarrier: 'FedEx',
      },
      intlAceInfo: null,
      intlDutiesTaxesInfo: {
        payorType: 'PREPAID',
        accountNumber: '5004654321',
        postalCode: '37228',
        countryCode: 'US',
        shipFromTaxId: null,
        shipFromTaxIdType: null,
        shipToTaxId: null,
        shipToTaxIdType: null,
      },
      intlCiInfo: {
        currencyCode: 'USD',
        invoiceValue: 4200,
        invoiceNumber: '0',
        invoiceDate: '2024-02-05T10:49:52.279+00:00',
        reasonForExport: 'SALE',
        termsOfSale: null,
        additionalComments: null,
        discount: 0,
        freightCharges: 0,
        insuranceCharges: 0,
        otherCharges: 0,
        relatedCompanies: null,
        purchaseOrderNumber: null,
        declarationStatement: null,
      },
      itnNumber: null,
      ftrExcemptionNumber: null,
      intlDocSubmissionType: null,
      ciFlag: true,
      uscoFlag: true,
      cn22Flag: false,
      intlCN22Info: null,
      rpFedExAccNum: '',
      rpFGrdAccNum: '',
      rpUpsAccNum: '',
      rpDhlAccNum: '',
      rpAddressInfo: {
        locationName: null,
        addressLine1: null,
        addressLine2: null,
        addressLine3: null,
        city: null,
        countryCode: '',
        postalCode: '',
        state: null,
        phoneNumber: null,
        contactName: null,
        customerName: '',
        taxId: null,
      },
      tpFedExAccNum: '',
      tpFGrdAccNum: '',
      tpUpsAccNum: '',
      tpDhlAccNum: '',
      tpAddressInfo: {
        locationName: null,
        addressLine1: 'PSC 333 Box# 6037',
        addressLine2: null,
        addressLine3: null,
        city: 'APO',
        countryCode: 'US',
        postalCode: '96251',
        state: 'Armed Forces Pacific',
        phoneNumber: null,
        contactName: 'A. C. Networks - APO',
        customerName: null,
        taxId: null,
      },
      shipmentPackagesInfoList: [
        {
          clientId: 95,
          packageNum: 1,
          shipmentId: null,
          additionalHandlingFlag: null,
          additionalHandlingType: null,
          additionalLabelCount: null,
          weight: null,
          weightUomCode: 'KG',
          voidPackageFlag: null,
          bolnumber: null,
          commodityDesc: null,
          connDescription: null,
          connMsn: null,
          customsOptionsType: null,
          packageDecValueCurr: null,
          description: null,
          dimensionId: 229,
          dimensionName: '9x9x9',
          dimensionUnits: 'IN',
          dimensionWeight: 9,
          dryIceFlag: null,
          dryIceUnits: null,
          dryIceWeight: null,
          enhancementTypes: null,
          eodFlag: null,
          expectedDeliveryDate: null,
          fedexPriorityAlert: null,
          fedexPriorityAlertFlag: null,
          fedexPriorityAlertPlus: null,
          freightClass: null,
          futureDayShipmentFlag: null,
          indiciaType: null,
          intlQty: null,
          intlUnitUom: null,
          intlUnitValue: null,
          intlUnitWeight: null,
          labelCount: null,
          largePackageFlag: null,
          lpnNumber: null,
          lpnWeight: null,
          nonPalletCount: null,
          overSize: null,
          packageDeclaredValue: null,
          packageDescription: null,
          packageHeight: 9,
          packageLength: 9,
          packageWidth: 9,
          packagesCount: null,
          packaging: '02',
          packagingInstructions: null,
          packagingType: null,
          palletCount: null,
          palletNumber: null,
          pieces: null,
          pkgNumber: null,
          signatureName: null,
          signatureOption: null,
          stampsTaxId: null,
          starTrackEodFlag: null,
          starTrackShipmentId: null,
          trackingNumber: null,
          trailerNumber: null,
          transitTime: null,
          dimUom: 'IN',
          upsLabelDeliveryMethod: null,
          codInfo: {
            amount: null,
            chargeBasis: null,
            chargeBasisLevel: null,
            currency: 'USD',
            fundsCode: '0',
            codFlag: false,
            type: null,
          },
          holdAtLocInfo: {
            locationFlag: null,
            line1: null,
            line2: null,
            city: null,
            state: null,
            postalCode: null,
            country: null,
            phone: null,
            companyName: null,
          },
          returnShipmentInfo: {
            returnFlag: false,
            description: null,
            labelDeliveryMethod: null,
            shipFromAddrInfo: {
              locationName: 'Nashville',
              addressLine1: '245B Great Circle RD',
              addressLine2: 'Bldg 2',
              addressLine3: '',
              city: 'Nashville',
              countryCode: 'US',
              postalCode: '37228',
              state: 'TN',
              phoneNumber: '8004444729',
              contactName: 'Nathan Sherrin',
              customerName: 'Parallon Supply Services',
              taxId: null,
            },
            shipToAddrInfo: {
              locationName: 'Location 1',
              addressLine1: '132, My Street,',
              addressLine2: 'Kingston,',
              addressLine3: null,
              city: 'Mount Vernon',
              countryCode: 'US',
              postalCode: '10550',
              state: 'NY',
              phoneNumber: '7878475896',
              contactName: 'Customer Support',
              customerName: 'Location 1',
              taxId: null,
            },
            carrierInfo: {
              shipMethodName: null,
              serviceLevelCode: null,
              accountNumber: null,
              carrierPayCode: null,
              dropOffType: null,
              packageType: null,
              trackingNumber: null,
              returnCharges: null,
            },
            paytermInfo: {
              addressLine1: '',
              addressLine2: '',
              addressLine3: '',
              city: '',
              state: '',
              postalCode: '',
              countryCode: '',
              customerName: '',
              contactName: '',
              phoneNumber: '',
              dduCheck: '',
              shippingChargesCheck: '',
            },
          },
          uspsPkgInfo: {
            labelDeliveryMethod: null,
            carrierRelease: null,
            contentDescription: null,
            contentType: null,
            id: null,
            deliveryOption: null,
            insurance: null,
            machinable: null,
            poBox: null,
            restrictedDelivery: null,
            returnReceipt: null,
            returnReceiptElectronic: null,
            tenAmDelivery: null,
            waiverOfSignature: null,
          },
          ltlPkgInfo: {
            holidayDeliveryFee: null,
            insideDeliveryFee: null,
            liftGateDelivery: null,
            liftGatePickup: null,
            security: null,
            specialDeliveryFee: null,
            sundayDeliveryFee: null,
          },
          hazmatInfo: {
            hazmatFlag: false,
            signatureName: null,
            hazmatCommodityInfoList: null,
            allPackedInOneFlag: false,
            overPackedFlag: false,
            qvalue: '',
            outerPackagingType: '',
            regulationSet: null,
          },
          pkgChargesInfo: {
            estimatedFreightCost: null,
            handlingCharge: null,
            insuranceCharge: null,
            estimatedNegotiatedRate: null,
            shipmentDeclaredValue: null,
            totalSurcharges: null,
            freightCost: null,
            shipmentCost: null,
            baseCharge: null,
          },
        },
      ],
      shipmentLinesInfoList: [
        {
          clientId: 95,
          shipmentLineId: null,
          shipmentId: null,
          deliveryId: 'I00001734',
          orderHeaderId: null,
          orderNumber: 'STDQ00001529',
          orderLineId: null,
          sourceLineNumber: null,
          lineNumber: 1,
          inventoryItemId: 5,
          itemnumber: 'SKU0001',
          itemDescription: 'INVENTORY ITEM 01',
          unitWeight: 0.02205,
          weight: 0.02205,
          weightUom: 'LB',
          orderedQuantity: 3,
          mappableQuantity: null,
          shippedQuantity: 3,
          mappedQuantity: null,
          quantityUom: 'PC',
          itemSellingPrice: 1000,
          amountExtendedPrice: null,
          unitPrice: 1000,
          scheduledShipDate: null,
          serialControlCode: null,
          transactionId: null,
          invOrgId: '1',
          orgId: '1',
          revision: null,
          lotControlCode: null,
          locatorName: '',
          locatorControlCode: null,
          lotNumber: null,
          subinventory: 'Location 1',
          hazardClassId: 0,
          lineStatus: 'Y',
          itemClass: '0',
          itemLength: null,
          itemWidth: null,
          itemHeight: null,
          itemWeight: 0,
          itemDimensionsUnit: null,
          hazmatInfo: null,
          intlAceInfo: null,
          noOfPieces: 1,
          countryOfManufacture: 'US',
          htsCode: '123456789',
          customsValue: null,
          eccn: null,
          exportLicenseNumber: null,
          exportLicenseExpDate: null,
          copyAceFlag: null,
        },
      ],
    };
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
    this.freightShoppingFlag =
      this.clientOrgProfileOptionsInfo.freightShoppingFlag;
    this.defaultFocus = this.clientOrgProfileOptionsInfo.defaultFocus;
    this.authenticationDetails =
      this.sharedUtilService.getAuthenticationDetails(this.userData);
    this.orderDetails = 'fw-bold text-primary d-none';
    this.shipFlag = false;
    this.intlFlag = false;
    this.ciFlag = false;
    this.uscoFlag = false;
    // this.adhocShipFormGroup.disable();
    // console.log(this.userData);
    this.carrierId = this.shipmentHeadersInfo.carrierId;
    this.carrierCode = 100;
    this.carrierMode = 'UPS Direct';
    if (this.shipmentHeadersInfo.shipMethod != '') {
      this.getHeaderLookupValues(
        this.clientId,
        this.orgId,
        this.invOrgId,
        this.carrierId,
        this.carrierCode,
        this.carrierMode
      );
    }
    this.noOfPackages = 1;
    this.buildForm(this.shipmentHeadersInfo);
    this.getInventoryLookupsPromise = this.getInventoryLookups(
      this.clientId,
      this.orgId,
      this.invOrgId
    );
    this.getInventoryLookupsPromise.then(() => {
      this.shipFromLocationsInfoList.push(
        this.shipmentHeadersInfo.shipFromAddrInfo
      );
      // console.log(this.shipmentHeadersInfo);
      this.patchFormData(this.shipmentHeadersInfo);
      if (this.shipmentHeadersInfo.shipmentLinesInfoList) {
        this.patchLinesData(this.shipmentHeadersInfo.shipmentLinesInfoList);
      }
      if (this.shipmentHeadersInfo.shipmentPackagesInfoList) {
        this.patchPackageData(
          this.shipmentHeadersInfo.shipmentPackagesInfoList
        );
      }
      this.intlFlag = this.shipmentHeadersInfo.intlFlag;
      this.uscoFlag = this.shipmentHeadersInfo.uscoFlag;
      this.ciFlag = this.shipmentHeadersInfo.ciFlag;
      // this.deliveryId = this.shipmentHeadersInfo.deliveryId;
      // this.orderNumber = this.shipmentHeadersInfo.orderNumber;
      this.orderDetails = 'fw-bold text-primary d-inline';
      this.shipFlag = this.shipmentHeadersInfo.shipFlag;
      this.carrierId = this.shipmentHeadersInfo.carrierId;
      if (this.shipFlag) {
        this.adhocSharedComponent.packageDetailscomponent.addDisable = true;
        this.carrierId = this.shipmentHeadersInfo.carrierId;
      }
      this.shipButtonEnabled = !this.shipFlag;
      this.shipConfirmButtonEnabled = !(
        this.shipmentHeadersInfo.shipConfirmFlag || !this.shipFlag
      );
      this.voidButtonEnabled = !(
        this.shipmentHeadersInfo.voidFlag || !this.shipFlag
      );
      this.reprintButtonEnabled = this.shipFlag;
      this.viewLabelButtonEnabled = this.shipFlag;
      this.waybillNumber = this.adhocShipFormGroup.get('waybillNumber')?.value;
      console.log('this.shipmentHeadersInfo', this.shipmentHeadersInfo);
      if (this.shipmentHeadersInfo.shipMethod != '') {
        this.carrierId = this.carrierOrgAcctDetailsInfo.carrierId;
        this.carrierCode = this.carrierOrgAcctDetailsInfo.carrierCode;
        this.carrierMode = this.carrierOrgAcctDetailsInfo.carrierMode;
        this.getHeaderLookupValues(
          this.clientId,
          this.orgId,
          this.invOrgId,
          this.carrierId,
          this.carrierCode,
          this.carrierMode
        );
      }
      if (true == this.shipFlag) {
        this.adhocShipFormGroup.disable();
        this.adhocShipFormGroup.get('deliveryId')?.enable();
      } else {
        (
          this.adhocShipFormGroup.get('shipmentLinesInfoList') as FormArray
        ).disable();
      }
    });
  }
  patchLinesData(linesData: Array<any>) {
    if (0 != linesData.length) {
      let linesFormArray: FormArray = this.fb.array([]);
      linesData.forEach((line) => {
        linesFormArray.push(this.buildLinesInfoForm(line));
      });
      this.adhocShipFormGroup.removeControl('shipmentLinesInfoList');
      this.adhocShipFormGroup.addControl(
        'shipmentLinesInfoList',
        linesFormArray
      );

      //sameer g added
      this.cdr.markForCheck();
    }
    // this.shippingFormGroup.get('shipmentLinesInfoList')?.patchValue(linesData);
  }

  patchPackageData(packageData: Array<any>) {
    if (0 != packageData.length) {
      let packagesFormArray: FormArray = this.fb.array([]);
      packageData.forEach((pack, index) => {
        this.noOfPackages = index + 1;
        packagesFormArray.push(this.buildPackagesInfoForm(pack));
      });

      this.adhocShipFormGroup.removeControl('shipmentPackagesInfoList');
      this.adhocShipFormGroup.addControl(
        'shipmentPackagesInfoList',
        packagesFormArray
      );
    }
    // this.shippingFormGroup
    //   .get('shipmentPackagesInfoList')
    //   ?.patchValue(packageData);
  }

  patchFormData(data: any) {
    Object.keys(data).forEach((controlName) => {
      const controlValue = data[controlName];
      if (controlValue !== null && controlValue !== undefined) {
        this.adhocShipFormGroup.get(controlName)?.patchValue(controlValue);
      }
    });
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
            this.paymethodsList = response.data.paymethodsList;
            resolve();
          },
          error: (error) => {
            reject(error);
          },
        });
    });
    return getInventoryLookupsPromise;
  }
  getHeaderLookupValues(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ) {
    this.carrierId = carrierId;
    this.carrierCode = carrierCode;
    this.carrierMode = carrierMode;
    this.shippingService
      .getCarrierLookups(
        clientId,
        orgId,
        invOrgId,
        carrierId,
        carrierCode,
        carrierMode
      )
      .subscribe({
        next: (resp: any) => {
          // console.log(resp);
          this.paymethodsList = resp.data.paymethodsList;
          this.packagingTypeList = resp.data.packagingTypeList;
          this.accountNumbersList = resp.data.accountNumbersList;
        },
      });
  }
  buildForm(shipmentHeaderInfo: ShipmentHeadersInfo) {
    this.adhocShipFormGroup =
      this.fb.group<ShipmentHeadersInfo>(shipmentHeaderInfo);
    //*** Building packages formArray-start **** /
    this.adhocShipFormGroup.removeControl('shipmentPackagesInfoList');
    let packagesArray: FormArray = this.fb.array([]);
    packagesArray.push(this.buildPackagesInfoForm(new ShipmentPackagesInfo()));
    this.adhocShipFormGroup.addControl(
      'shipmentPackagesInfoList',
      packagesArray
    );
    //*** Building packages formArray-end **** /
    //*** Building lines formArray-start **** /
    this.adhocShipFormGroup.removeControl('shipmentLinesInfoList');
    let linesArray: FormArray = this.fb.array([]);
    linesArray.push(this.buildLinesInfoForm(new ShipmentLinesInfo()));
    this.adhocShipFormGroup.addControl('shipmentLinesInfoList', linesArray);
    //*** Building lines formArray-end **** /
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'shipFromAddrInfo',
      shipmentHeaderInfo.shipFromAddrInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'shipToAddrInfo',
      shipmentHeaderInfo.shipToAddrInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'additionalShipmentInfo',
      shipmentHeaderInfo.additionalShipmentInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'billToAddrInfo',
      shipmentHeaderInfo.billToAddrInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'shipmentChargesInfo',
      shipmentHeaderInfo.shipmentChargesInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'emailNotificationInfo',
      shipmentHeaderInfo.emailNotificationInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'customAttributesInfo',
      shipmentHeaderInfo.customAttributesInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'originalShipToAddressInfo',
      shipmentHeaderInfo.originalShipToAddressInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'printerInfo',
      shipmentHeaderInfo.printerInfo
    );
    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'paytermInfo',
      shipmentHeaderInfo.paytermInfo
    );
    this.adhocShipFormGroup
      .get('shipMethod')
      ?.setValidators(Validators.required);
    this.adhocShipFormGroup
      .get('carrierPayCode')
      ?.setValidators(Validators.required);
    this.adhocShipFormGroup
      .get('carrierAccountNo')
      ?.setValidators(Validators.required);
    this.adhocShipFormGroup
      .get('shipmentDate')
      ?.setValidators(Validators.required);

    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'intlCiInfo',
      new IntlCiInfo()
    );

    let intlCiForm: FormGroup = this.adhocShipFormGroup.get(
      'intlCiInfo'
    ) as FormGroup;

    intlCiForm.get('invoiceNumber')?.setValidators(Validators.required);
    intlCiForm.get('invoiceDate')?.setValidators(Validators.required);
    intlCiForm.get('currencyCode')?.setValidators(Validators.required);

    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'intlDutiesTaxesInfo',
      new IntlDutiesTaxesInfo()
    );

    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'intlImporterInfo',
      new AddressInfo()
    );

    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'intlSoldToInfo',
      new AddressInfo()
    );

    this.addOrUpdateControl(
      this.adhocShipFormGroup,
      'intlUscoInfo',
      new IntlUscoInfo()
    );

    console.log('form build in shipping page', this.adhocShipFormGroup);
    //building intl form --sg
  }

  getFormControlsFields(obj: any) {
    const formGroupFields: any = {};
    for (const field of Object.keys(obj)) {
      formGroupFields[field] = new FormControl('');
      this.fields.push(field);
    }
    return formGroupFields;
  }
  buildPackagesInfoForm(shipmentPackageInfo: ShipmentPackagesInfo): FormGroup {
    let packagesInfoFormGroup: FormGroup = this.fb.group(shipmentPackageInfo);
    packagesInfoFormGroup = this.addOrUpdateControlForForm(
      packagesInfoFormGroup,
      'codInfo',
      shipmentPackageInfo.codInfo
    );
    packagesInfoFormGroup = this.addOrUpdateControlForForm(
      packagesInfoFormGroup,
      'holdAtLocInfo',
      shipmentPackageInfo.holdAtLocInfo
    );
    packagesInfoFormGroup.removeControl('returnShipmentInfo');
    packagesInfoFormGroup.setControl(
      'returnShipmentInfo',
      this.buildReturnPackagesInfoForm(shipmentPackageInfo.returnShipmentInfo)
    );
    packagesInfoFormGroup = this.addOrUpdateControlForForm(
      packagesInfoFormGroup,
      'uspsPkgInfo',
      shipmentPackageInfo.uspsPkgInfo
    );
    packagesInfoFormGroup = this.addOrUpdateControlForForm(
      packagesInfoFormGroup,
      'ltlPkgInfo',
      shipmentPackageInfo.ltlPkgInfo
    );
    packagesInfoFormGroup.removeControl('hazmatInfo');
    packagesInfoFormGroup.addControl(
      'hazmatInfo',
      this.buildHazmatInfoForm(shipmentPackageInfo.hazmatInfo)
    );
    packagesInfoFormGroup = this.addOrUpdateControlForForm(
      packagesInfoFormGroup,
      'pkgChargesInfo',
      shipmentPackageInfo.pkgChargesInfo
    );
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
  buildLinesInfoForm(model: any): FormGroup {
    let linesForm: FormGroup = this.fb.group(model);
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
  addPackage(noOfPackagesToAdd: number) {
    // console.log(noOfPackagesToAdd);
    if (noOfPackagesToAdd > 0) {
      let shipmentPackList: FormArray = this.adhocShipFormGroup.get(
        'shipmentPackagesInfoList'
      ) as FormArray;
      shipmentPackList.enable();
      let packagevalue = shipmentPackList.at(this.noOfPackages - 1).value;
      for (let i = 0; i < noOfPackagesToAdd; i++) {
        let packageForm: FormGroup = this.buildPackagesInfoForm(packagevalue);
        packageForm.get('packageNum')?.setValue(this.noOfPackages + 1);
        shipmentPackList.push(packageForm);
        this.noOfPackages = this.noOfPackages + 1;
      }
      this.adhocShipFormGroup.removeControl('shipmentPackagesInfoList');
      this.adhocShipFormGroup.addControl(
        'shipmentPackagesInfoList',
        shipmentPackList
      );
      (
        this.adhocShipFormGroup.get('shipmentPackagesInfoList') as FormArray
      ).controls.forEach((pack, index) => {
        this.adhocSharedComponent.packageDetailscomponent.changedDimensions(
          index
        );
      });
    }
  }

  removePackage(delAllPackages: boolean) {
    let shipmentPackList: FormArray = this.adhocShipFormGroup.get(
      'shipmentPackagesInfoList'
    ) as FormArray;
    let packageAtFirstIndex: FormGroup = shipmentPackList.at(0) as FormGroup;
    if (delAllPackages) {
      this.noOfPackages = 1;
      shipmentPackList = this.fb.array([]);
      shipmentPackList.push(packageAtFirstIndex);
    } else {
      if (1 != this.noOfPackages) {
        shipmentPackList.removeAt(this.noOfPackages - 1);
        this.noOfPackages = this.noOfPackages - 1;
      }
    }
    this.adhocShipFormGroup.removeControl('shipmentPackagesInfoList');
    this.adhocShipFormGroup.addControl(
      'shipmentPackagesInfoList',
      shipmentPackList
    );
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

  get getShipFromAddrInfo(): FormGroup {
    return this.adhocShipFormGroup.get('shipFromAddrInfo') as FormGroup;
  }
  get getShipToAddrInfo(): FormGroup {
    return this.adhocShipFormGroup.get('shipToAddrInfo') as FormGroup;
  }
}
