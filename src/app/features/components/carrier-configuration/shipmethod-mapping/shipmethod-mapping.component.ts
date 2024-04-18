import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  faCircleXmark,
  faArrowAltCircleLeft,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ShipMethodMappingInfo } from 'src/app/features/models/ship-method-mapping-info.model';
import { LookupValuesService } from 'src/app/shared/services/lookup-values.service';

@Component({
  selector: 'app-shipmethod-mapping',
  templateUrl: './shipmethod-mapping.component.html',
  styleUrls: ['./shipmethod-mapping.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipmethodMappingComponent implements OnInit {
  faCircleXmark = faCircleXmark;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faCircleCheck = faCircleCheck;
  @Input('shipMethodInfoList') shipMethodInfoList: ShipMethodMappingInfo[] = [];
  @Output() updatedShipMethodInfoList = new EventEmitter<any[]>();
  @Input('carrierServiceLevelCodesList') carrierServiceLevelCodesList!: any[];
  shipmethodValidationCodeList: any;
  isButtonDisabled: boolean = false;
  selectedCount: number = 0;

  constructor(private lookupValuesService: LookupValuesService) {}

  ngOnInit() {
    this.getShipmethodValidationCode();
  }

  getShipmethodValidationCode() {
    this.lookupValuesService
      .getLookUps('SHIPMETHOD_VALIDATION_CODE', 'ALL')
      .subscribe({
        next: (resp: any) => {
          this.shipmethodValidationCodeList = resp.data;
        },
        error: (error: any) => {},
      });
  }

  updateCarrierServiceLevel(shipMethodMapping: any, event: any): void {
    shipMethodMapping.carrierServiceLevel = event.target.value;
    this.checkEnableSaveButton();
  }

  updateShipMethodValidationCode(shipMethodMapping: any, event: any): void {
    shipMethodMapping.shipMethodValidationCode = event.target.value;
  }

  updateEnableFlag(shipMethodMapping: any, event: any): void {
    shipMethodMapping.enableFlag = event.target.checked;
    if (!shipMethodMapping.enableFlag) {
      shipMethodMapping.internationalFlag = false;
      shipMethodMapping.carrierServiceLevel = '';
    }
    this.checkEnableSaveButton();
  }

  updateUserShipMethodMeaning(shipMethodMapping: any, event: any): void {
    shipMethodMapping.userShipMethodMeaning = event.target.value;
  }

  updateInternationalFlag(shipMethodMapping: any, event: any): void {
    shipMethodMapping.internationalFlag = event.target.checked;
  }

  enableFlagCount(): number {
    return this.shipMethodInfoList.filter((shipMethodMapping: any) => {
      return shipMethodMapping.enableFlag;
    }).length;
  }

  checkEnableSaveButton(): void {
    this.selectedCount = this.shipMethodInfoList.filter(
      (shipMethodMapping: any) => {
        return (
          shipMethodMapping.enableFlag &&
          shipMethodMapping.carrierServiceLevel !== '' &&
          shipMethodMapping.carrierServiceLevel !== null
        );
      }
    ).length;
    this.isButtonDisabled = this.selectedCount !== this.enableFlagCount();
  }

  onSubmit() {
    this.updatedShipMethodInfoList.emit(this.shipMethodInfoList);
  }
}
