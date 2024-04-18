import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReportsComponent } from 'src/app/features/components/reports/reports.component'
import { ShippingComponent } from 'src/app/features/components/shipping/shipping.component'
import { TrackingComponent } from 'src/app/features/components/tracking/tracking.component'
import { HomeComponent } from 'src/app/general/components/home/home.component'
import { TrackingGuard } from 'src/app/shared/guards/tracking.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [TrackingGuard],
    children: [
      {
        path: 'shipping',
        component: ShippingComponent,
        canActivate: [TrackingGuard],
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        canActivate: [TrackingGuard],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [TrackingGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerRoutingModule {}
