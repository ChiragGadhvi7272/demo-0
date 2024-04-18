import {
  ChangeDetectorRef,
  EventEmitter,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
} from '@angular/core';
import { AddressInfo } from 'src/app/shared/models/address-info.model';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-address-validation',
  templateUrl: './address-validation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./address-validation.component.css'],
})
export class AddressValidationComponent implements OnInit {
  @Input() proposedAddressList: AddressInfo[] = [];
  @Input() addressType: string = '';
  @Input() addressClassification: string = '';
  @Output() shipToAddress = new EventEmitter<any>();
  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.cdr.detectChanges();
    }, 500);
    if (changes['proposedAddressList']) {
      this.cdr.detectChanges();
    }
  }

  onAddressSelected(index: number) {
    const selectedAddress = this.proposedAddressList[index];
    this.shipToAddress.emit(selectedAddress);
  }
}
