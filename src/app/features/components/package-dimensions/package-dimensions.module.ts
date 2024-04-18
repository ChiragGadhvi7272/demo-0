import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageDimensionsRoutingModule } from './package-dimensions-routing.module';
import { CreatePackageDimensionsComponent } from './create-package-dimensions/create-package-dimensions.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PackageDimensionsRoutingModule
  ]
})
export class PackageDimensionsModule { }
