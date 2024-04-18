import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adhoc-printer-details',
  templateUrl: './adhoc-printer-details.component.html',
  styleUrls: ['./adhoc-printer-details.component.css'],
})
export class AdhocPrinterDetailsComponent {
  @Input() printerInfo!: FormGroup;
  ngOnInit() {
    console.log(this.printerInfo);
  }
}
