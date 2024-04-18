import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './general/components/change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ScAdminGuard } from './shared/guards/sc-admin.guard';
import { ScShipperGuard } from './shared/guards/sc-shipper.guard';
import { ShipperGuard } from './shared/guards/shipper.guard';
import { TrackingGuard } from './shared/guards/tracking.guard';
import { UnAuthorizedUsersComponent } from './general/components/un-authorized-users/un-authorized-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'resetPassword/:pwdResetToken', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  {
    path: 'sc-admin',
    loadChildren: () =>
      import('./modules/sc-admin/sc-admin.module').then((m) => m.ScAdminModule),
    canActivate: [ScAdminGuard],
    title: 'Dashboard',
  },
  {
    path: 'sc-shipper',
    loadChildren: () =>
      import('./modules/sc-shipper/sc-shipper.module').then(
        (m) => m.ScShipperModule
      ),
    canActivate: [ScShipperGuard],
    title: 'Dashboard',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
    title: 'Dashboard',
  },
  {
    path: 'shipper',
    loadChildren: () =>
      import('./modules/shipper/shipper.module').then((m) => m.ShipperModule),
    canActivate: [ShipperGuard],
    title: 'Dashboard',
  },
  {
    path: 'tracker',
    loadChildren: () =>
      import('./modules/tracker/tracker.module').then((m) => m.TrackerModule),
    canActivate: [TrackingGuard],
    title: 'Dashboard',
  },
  {
    path: 'unAuthorizedAccess',
    component: UnAuthorizedUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
