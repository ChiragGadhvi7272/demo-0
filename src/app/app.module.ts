import { NgModule,APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PackageDimensionsComponent } from './features/components/package-dimensions/package-dimensions.component';
import { CreatePackageDimensionsComponent } from './features/components/package-dimensions/create-package-dimensions/create-package-dimensions.component';
import { ApplicationSetupsComponent } from './modules/sc-admin/components/application-setups/application-setups.component';
import { UserDetailsComponent } from './modules/admin/components/user-details/user-details.component';
import { CreateUpdateUserDetailsComponent } from './modules/admin/components/user-details/create-update-user-details/create-update-user-details.component';
import { InventoryOrganizationComponent } from './features/components/inventory-organization/inventory-organization.component';
import { CreateInventoryOrganizationComponent } from './features/components/inventory-organization/create-inventory-organization/create-inventory-organization.component';
import { ShipToLocationsComponent } from './modules/admin/components/ship-to-locations/ship-to-locations.component';
import { UploadShipToLocationDetailsComponent } from './modules/admin/components/ship-to-locations/upload-ship-to-location-details/upload-ship-to-location-details.component';
import { ShipFromLocationsComponent } from './modules/admin/components/ship-from-locations/ship-from-locations.component';
import { CreateUpdateShipFromLocationComponent } from './modules/admin/components/ship-from-locations/create-update-ship-from-location/create-update-ship-from-location.component';
import { CreateUpdateShipToLocationDetailsComponent } from './modules/admin/components/ship-to-locations/create-update-ship-to-location-details/create-update-ship-to-location-details.component';
import { CustomerShipmentsComponent } from './modules/sc-admin/components/customer-shipments/customer-shipments.component';
import { CustomerComponent } from './features/components/customer/customer.component';
import { CreateUpdateCustomerDetailsComponent } from './features/components/customer/create-update-customer-details/create-update-customer-details.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErpSyncComponent } from './modules/shipper/components/erp-sync/erp-sync.component';
import {
  DEFAULT_TIMEOUT,
  TokenInterceptorInterceptor,
} from './shared/services/token-interceptor.interceptor';
import { AuthService } from './shared/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './general/components/home/home.component';
import { DashboardComponent } from './general/components/dashboard/dashboard.component';
import { ChangePasswordComponent } from './general/components/change-password/change-password.component';
import { ProfileOptionsComponent } from './features/components/profile-options/profile-options.component';
import { CarrierConfigurationComponent } from './features/components/carrier-configuration/carrier-configuration.component';
import { DatePipe } from '@angular/common';
import { ProductDetailsComponent } from './modules/admin/components/product-details/product-details.component';
import { CreateEditProductsComponent } from './modules/admin/components/product-details/create-edit-products/create-edit-products.component';
import { UploadProductDetailsComponent } from './modules/admin/components/product-details/upload-product-details/upload-product-details.component';
import { AccountNumbersComponent } from './features/components/carrier-configuration/account-numbers/account-numbers.component';
import { ShipmethodMappingComponent } from './features/components/carrier-configuration/shipmethod-mapping/shipmethod-mapping.component';
import { UnAuthorizedUsersComponent } from './general/components/un-authorized-users/un-authorized-users.component';
import { SharedComponent } from './features/components/shipping/shared/shared.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShippingComponent } from './features/components/shipping/shipping.component';
import { PackageDetailsComponent } from './features/components/shipping/shared/package-details/package-details.component';
import { MapItemsToPackageComponent } from './features/components/shipping/shared/package-details/map-items-to-package/map-items-to-package.component';
import { PackageOptionsComponent } from './features/components/shipping/shared/package-details/package-options/package-options.component';
import { LineDetailsComponent } from './features/components/shipping/shared/line-details/line-details.component';
import { CodComponent } from './features/components/shipping/shared/package-details/package-options/cod/cod.component';
import { HoldAtLocationComponent } from './features/components/shipping/shared/package-details/package-options/hold-at-location/hold-at-location.component';
import { ReturnShipmentComponent } from './features/components/shipping/shared/package-details/package-options/return-shipment/return-shipment.component';
import { InternationalDetailsComponent } from './features/components/shipping/shared/international-details/international-details.component';
import { ConsolidationComponent } from './features/components/shipping/shared/consolidation/consolidation.component';
import { HeaderDetailsComponent } from './features/components/shipping/header-details/header-details.component';
import { PaytermDetailsComponent } from './features/components/shipping/header-details/payterm-details/payterm-details.component';
import { EmailNotificationComponent } from './features/components/shipping/header-details/email-notification/email-notification.component';
import { AddressValidationComponent } from './features/components/shipping/header-details/address-validation/address-validation.component';
import { DestinationAddressComponent } from './features/components/shipping/header-details/destination-address/destination-address.component';
import { TrackingComponent } from './features/components/tracking/tracking.component';
import { DownloadFilesComponent } from './modules/sc-shipper/components/download-files/download-files.component';
import { PrinterDetailsComponent } from './features/components/shipping/shared/printer-details/printer-details.component';
import { HazmatDetailsComponent } from './features/components/shipping/shared/package-details/package-options/hazmat-details/hazmat-details.component';
import { ViewLabelsComponent } from './features/components/shipping/view-labels/view-labels.component';
import { AceDetailsComponent } from './features/components/shipping/shared/international-details/ace-details/ace-details.component';
import { CiDetailsComponent } from './features/components/shipping/shared/international-details/ci-details/ci-details.component';
import { CommodityDetailsComponent } from './features/components/shipping/shared/international-details/commodity-details/commodity-details.component';
import { EinOrTaxIdComponent } from './features/components/shipping/shared/international-details/ein-or-tax-id/ein-or-tax-id.component';
import { ElectronicExportDetailsComponent } from './features/components/shipping/shared/international-details/electronic-export-details/electronic-export-details.component';
import { SoldToDetailsComponent } from './features/components/shipping/shared/international-details/sold-to-details/sold-to-details.component';
import { UscoDetailsComponent } from './features/components/shipping/shared/international-details/usco-details/usco-details.component';
import { Cn22DetailsComponent } from './features/components/shipping/shared/international-details/cn22-details/cn22-details.component';
import { AdhocShipmentComponent } from './features/components/adhoc-shipment/adhoc-shipment.component';
import { AdhocShipFromComponent } from './features/components/adhoc-shipment/adhoc-ship-from/adhoc-ship-from.component';
import { AdhocShipToComponent } from './features/components/adhoc-shipment/adhoc-ship-to/adhoc-ship-to.component';
import { AdhocSharedComponent } from './features/components/adhoc-shipment/adhoc-shared/adhoc-shared.component';
import { AdhocCarrierDetailsComponent } from './features/components/adhoc-shipment/adhoc-shared/adhoc-carrier-details/adhoc-carrier-details.component';
import { AdhocPrinterDetailsComponent } from './features/components/adhoc-shipment/adhoc-shared/adhoc-printer-details/adhoc-printer-details.component';
import { MasterBolComponent } from './modules/shipper/components/master-bol/master-bol.component';
import { AnalyticsComponent } from './features/components/analytics/analytics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ViewDetailsComponent } from './features/components/tracking/view-details/view-details.component';
import { LotAndSerialComponent } from './features/components/shipping/shared/line-details/lot-and-serial/lot-and-serial.component';

import { ConfigService } from './config.service';

export function initializeApp(configService: ConfigService) {
  return () => {
    // const envName = process.env['ENV_NAME'] ?? 'qa'; // Default to 'dev' if ENV_NAME is not set
    // console.log('Initializing application with environment:', envName);
    return configService.loadConfig(process.env['ENV_NAME'] ?? 'qa');
  };
}

@NgModule({
  schemas: [],
  declarations: [
    AppComponent,
    LoginComponent,
    PackageDimensionsComponent,
    CreatePackageDimensionsComponent,
    ApplicationSetupsComponent,
    UserDetailsComponent,
    CreateUpdateUserDetailsComponent,
    InventoryOrganizationComponent,
    CreateInventoryOrganizationComponent,
    ShipToLocationsComponent,
    CreateUpdateShipToLocationDetailsComponent,
    UploadShipToLocationDetailsComponent,
    CreateUpdateShipFromLocationComponent,
    ShipFromLocationsComponent,
    CustomerShipmentsComponent,
    CustomerComponent,
    CreateUpdateCustomerDetailsComponent,
    ResetPasswordComponent,
    HomeComponent,
    DashboardComponent,
    ChangePasswordComponent,
    ProfileOptionsComponent,
    CarrierConfigurationComponent,
    UnAuthorizedUsersComponent,
    AccountNumbersComponent,
    ShipmethodMappingComponent,
    ProductDetailsComponent,
    CreateEditProductsComponent,
    UploadProductDetailsComponent,
    AddressValidationComponent,
    EmailNotificationComponent,
    PaytermDetailsComponent,
    SharedComponent,
    HeaderDetailsComponent,
    ShippingComponent,
    MapItemsToPackageComponent,
    PackageOptionsComponent,
    PackageDetailsComponent,
    LineDetailsComponent,
    CodComponent,
    HoldAtLocationComponent,
    ReturnShipmentComponent,
    InternationalDetailsComponent,
    ConsolidationComponent,
    DestinationAddressComponent,
    PrinterDetailsComponent,
    TrackingComponent,
    DownloadFilesComponent,
    HazmatDetailsComponent,
    ViewLabelsComponent,
    ErpSyncComponent,
    CommodityDetailsComponent,
    CiDetailsComponent,
    UscoDetailsComponent,
    AceDetailsComponent,
    EinOrTaxIdComponent,
    ElectronicExportDetailsComponent,
    SoldToDetailsComponent,
    Cn22DetailsComponent,
    AdhocShipmentComponent,
    AdhocShipFromComponent,
    AdhocShipToComponent,
    AdhocSharedComponent,
    AdhocCarrierDetailsComponent,
    AdhocPrinterDetailsComponent,
    MasterBolComponent,
    AnalyticsComponent,
    ViewDetailsComponent,
     LotAndSerialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgApexchartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      titleClass: 'center',
      messageClass: 'center',
    }),
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, 
      useFactory: initializeApp, deps: [ConfigService], multi: true },
    Title,
    DatePipe,
    [{ provide: DEFAULT_TIMEOUT, useValue: 100000 }],
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
