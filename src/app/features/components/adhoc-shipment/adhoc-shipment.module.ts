import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdhocShipmentRoutingModule } from './adhoc-shipment-routing.module';
import { AdhocShipFromComponent } from './adhoc-ship-from/adhoc-ship-from.component';
import { AdhocShipToComponent } from './adhoc-ship-to/adhoc-ship-to.component';
import { AdhocSharedComponent } from './adhoc-shared/adhoc-shared.component';
import { AdhocPackageDetailsComponent } from './adhoc-shared/adhoc-package-details/adhoc-package-details.component';
import { AdhocCarrierDetailsComponent } from './adhoc-shared/adhoc-carrier-details/adhoc-carrier-details.component';
import { AdhocPrinterDetailsComponent } from './adhoc-shared/adhoc-printer-details/adhoc-printer-details.component';
import { AdhocIntlShippingComponent } from './adhoc-shared/adhoc-intl-shipping/adhoc-intl-shipping.component';

@NgModule({
  declarations: [
    // AdhocShipFromComponent,
    // AdhocShipToComponent,
    // AdhocSharedComponent,
    // AdhocPackageDetailsComponent,
    // AdhocCarrierDetailsComponent,
    // AdhocPrinterDetailsComponent,
    // AdhocIntlShippingComponent,
  ],
  imports: [CommonModule, AdhocShipmentRoutingModule],
})
export class AdhocShipmentModule {}
