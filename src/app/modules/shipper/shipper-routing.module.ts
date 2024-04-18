import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdhocShipmentComponent } from 'src/app/features/components/adhoc-shipment/adhoc-shipment.component'
import { ReportsComponent } from 'src/app/features/components/reports/reports.component'
import { TrackingComponent } from 'src/app/features/components/tracking/tracking.component'
import { HomeComponent } from 'src/app/general/components/home/home.component'
import { ShipperGuard } from 'src/app/shared/guards/shipper.guard'
import { EodComponent } from './components/eod/eod.component'
import { ErpSyncComponent } from './components/erp-sync/erp-sync.component'
import { ImportOrdersComponent } from './components/import-orders/import-orders.component'
import { MasterBolComponent } from './components/master-bol/master-bol.component'
import { ShippingDocumentsComponent } from './components/shipping-documents/shipping-documents.component'
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component'
import { ShippingComponent } from 'src/app/features/components/shipping/shipping.component'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ShipperGuard],
    children: [
      {
        path: 'shipping',
        component: ShippingComponent,
        canActivate: [ShipperGuard],
        title:'Shipping'
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        canActivate: [ShipperGuard],
        title:'Tracking'
      },
      {
        path: 'adhoc-shipping',
        component: AdhocShipmentComponent,
        canActivate: [ShipperGuard],
        title:'Adhoc Shipping'
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [ShipperGuard],
        title:'Reports'
      },
      {
        path: 'eod',
        component: EodComponent,
        canActivate: [ShipperGuard],
        title:'EOD'
      },
      {
        path: 'importOrders',
        component: ImportOrdersComponent,
        canActivate: [ShipperGuard],
        title:'Import Orders'
      },
      {
        path: 'erpSync',
        component: ErpSyncComponent,
        canActivate: [ShipperGuard],
        title:'ERP Sync'
      },
      {
        path: 'shippingDocuments',
        component: ShippingDocumentsComponent,
        canActivate: [ShipperGuard],
        title:'Shipping Documents'
      },
      {
        path: 'uploadDocuments',
        component: UploadDocumentsComponent,
        canActivate: [ShipperGuard],
        title:'Upload Documents'
      },
      {
        path: 'masterBol',
        component: MasterBolComponent,
        canActivate: [ShipperGuard],
        title:'Master BOL'
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipperRoutingModule {}
