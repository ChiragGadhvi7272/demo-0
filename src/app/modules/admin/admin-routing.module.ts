import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from 'src/app/features/components/analytics/analytics.component';
import { CarrierConfigurationComponent } from 'src/app/features/components/carrier-configuration/carrier-configuration.component';
import { InventoryOrganizationComponent } from 'src/app/features/components/inventory-organization/inventory-organization.component';
import { PackageDimensionsComponent } from 'src/app/features/components/package-dimensions/package-dimensions.component';
import { ProfileOptionsComponent } from 'src/app/features/components/profile-options/profile-options.component';
import { HomeComponent } from 'src/app/general/components/home/home.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ShipFromLocationsComponent } from './components/ship-from-locations/ship-from-locations.component';
import { ShipToLocationsComponent } from './components/ship-to-locations/ship-to-locations.component';
import { UploadShipToLocationDetailsComponent } from './components/ship-to-locations/upload-ship-to-location-details/upload-ship-to-location-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UploadProductDetailsComponent } from './components/product-details/upload-product-details/upload-product-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'profileOptions',
        component: ProfileOptionsComponent,
        canActivate: [AdminGuard],
        title: 'Profile Options'
      },
      {
        path: 'carrierConfiguration',
        component: CarrierConfigurationComponent,
        canActivate: [AdminGuard],
        title: 'Carrier Configuration'
      },
      {
        path: 'packageDimensionsDetails',
        component: PackageDimensionsComponent,
        canActivate: [AdminGuard],
        title: 'Package Dimensions'
      },
      {
        path: 'inventoryOrg',
        component: InventoryOrganizationComponent,
        canActivate: [AdminGuard],
        title: 'Inventory Organization SetUps'
      },
      {
        path: 'userDetails',
        component: UserDetailsComponent,
        canActivate: [AdminGuard],
        title: 'User Details'
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        canActivate: [AdminGuard],
        title: 'Analytics'
      },
      {
        path: 'shipFromLocationDetails',
        component: ShipFromLocationsComponent,
        canActivate: [AdminGuard],
        title: 'Ship From Locations'
      },
      {
        path: 'shipToLocationDetails',
        component: ShipToLocationsComponent,
        canActivate: [AdminGuard],
        title: 'Address Book'
      },
      {
        path: 'uploadCustomerLocationDetails',
        component: UploadShipToLocationDetailsComponent,
        canActivate: [AdminGuard],
        title: 'Upload Address Book'
      },
      {
        path: 'productDetails',
        component: ProductDetailsComponent,
        canActivate: [AdminGuard],
        title: 'Product Details'
      },
      {
        path: 'uploadProductDetails',
        component: UploadProductDetailsComponent,
        canActivate: [AdminGuard],
        title: 'Upload Product Details'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
