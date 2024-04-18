import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdhocShipmentComponent } from 'src/app/features/components/adhoc-shipment/adhoc-shipment.component'
import { CarrierConfigurationComponent } from 'src/app/features/components/carrier-configuration/carrier-configuration.component'
import { InventoryOrganizationComponent } from 'src/app/features/components/inventory-organization/inventory-organization.component'
import { PackageDimensionsComponent } from 'src/app/features/components/package-dimensions/package-dimensions.component'
import { ProfileOptionsComponent } from 'src/app/features/components/profile-options/profile-options.component'
import { ReportsComponent } from 'src/app/features/components/reports/reports.component'
import { TrackingComponent } from 'src/app/features/components/tracking/tracking.component'
import { HomeComponent } from 'src/app/general/components/home/home.component'
import { ScShipperGuard } from 'src/app/shared/guards/sc-shipper.guard'
import { DownloadFilesComponent } from './components/download-files/download-files.component'
import { ShippingComponent } from 'src/app/features/components/shipping/shipping.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ScShipperGuard],
    children: [
      {
        path: 'shipping',
        component: ShippingComponent,
        canActivate: [ScShipperGuard],
        title:'Shipping'
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        canActivate: [ScShipperGuard],
        title:'Tracking'
      },
      {
        path: 'adhoc-shipping',
        component: AdhocShipmentComponent,
        canActivate: [ScShipperGuard],
        title:'Adhoc Shipping'
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [ScShipperGuard],
        title:'Reports'
      },
      {
        path: 'profileOptions',
        component: ProfileOptionsComponent,
        canActivate: [ScShipperGuard],
        title:'Profile Options'
      },
      {
        path: 'carrierConfiguration',
        component: CarrierConfigurationComponent,
        canActivate: [ScShipperGuard],
        title:'Carrier Configuration'
      },
      {
        path: 'packageDimensionsDetails',
        component: PackageDimensionsComponent,
        canActivate: [ScShipperGuard],
        title:'Package Dimensions'
      },
      {
        path: 'inventoryOrg',
        component: InventoryOrganizationComponent,
        canActivate: [ScShipperGuard],
        title:'Inventory Organization'
      },
      {
        path: 'downloadFiles',
        component: DownloadFilesComponent,
        canActivate: [ScShipperGuard],
        title:'Download Files'
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScShipperRoutingModule {}
