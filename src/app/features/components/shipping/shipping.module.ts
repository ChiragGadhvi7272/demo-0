import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingRoutingModule } from './shipping-routing.module';
import { ConsolidationComponent } from './shared/consolidation/consolidation.component';
import { RateShoppingComponent } from './shared/rate-shopping/rate-shopping.component';

@NgModule({
  declarations: [
    // ConsolidationComponent,
    RateShoppingComponent,
  ],
  imports: [CommonModule, ShippingRoutingModule],
})
export class ShippingModule {}
