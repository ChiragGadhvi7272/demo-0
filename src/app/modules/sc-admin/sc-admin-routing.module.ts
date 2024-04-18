import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CarrierConfigurationComponent } from 'src/app/features/components/carrier-configuration/carrier-configuration.component'
import { CustomerComponent } from 'src/app/features/components/customer/customer.component'
import { ProfileOptionsComponent } from 'src/app/features/components/profile-options/profile-options.component'
import { HomeComponent } from 'src/app/general/components/home/home.component'
import { ScAdminGuard } from 'src/app/shared/guards/sc-admin.guard'
import { CustomerShipmentsComponent } from './components/customer-shipments/customer-shipments.component'
import { ApplicationSetupsComponent } from './components/application-setups/application-setups.component'
import { CreateUpdateCustomerDetailsComponent } from 'src/app/features/components/customer/create-update-customer-details/create-update-customer-details.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ScAdminGuard],
    children: [
      {
        path: 'profileOptions',
        component: ProfileOptionsComponent,
        canActivate: [ScAdminGuard],
        title: 'Profile Options'
      },
      {
        path: 'carrierConfiguration',
        component: CarrierConfigurationComponent,
        canActivate: [ScAdminGuard],
        title: 'Carrier Configuration'
      },
      {
        path: 'customerDetails',
        component: CustomerComponent,
        canActivate: [ScAdminGuard],
        title: 'Customer Details'
      },
      {
        path: 'createEditCustomerDetails',
        component: CreateUpdateCustomerDetailsComponent,
        canActivate: [ScAdminGuard],
        title: 'Create or Edit Customer Details'
      },
      {
        path: 'createEditCustomerDetails/:id',
        component: CreateUpdateCustomerDetailsComponent,
        canActivate: [ScAdminGuard],
      },
      {
        path: 'applicationSetups',
        component: ApplicationSetupsComponent,
        canActivate: [ScAdminGuard],
        title: 'Application SetUps'
      },
      {
        path: 'customerShipments',
        component: CustomerShipmentsComponent,
        canActivate: [ScAdminGuard],
        title: 'Customer Shipments'
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScAdminRoutingModule {}
