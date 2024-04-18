import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-printer-details',
  templateUrl: './printer-details.component.html',
  styleUrls: ['./printer-details.component.css'],
})
export class PrinterDetailsComponent {
  @Input() printerInfo!: FormGroup;
  @Input() printersList!: any[];
  @Input() erpType!: string;
  constructor() {}
}
