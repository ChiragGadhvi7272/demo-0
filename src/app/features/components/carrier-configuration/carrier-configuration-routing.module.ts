import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrierConfigurationComponent } from './carrier-configuration.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ShipmethodMappingComponent } from './shipmethod-mapping/shipmethod-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: CarrierConfigurationComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'shipMethodMapping',
        component: ShipmethodMappingComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarrierConfigurationRoutingModule {}
