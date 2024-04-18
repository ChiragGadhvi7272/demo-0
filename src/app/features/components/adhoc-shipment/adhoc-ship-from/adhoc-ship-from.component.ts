import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adhoc-ship-from',
  templateUrl: './adhoc-ship-from.component.html',
  styleUrls: ['./adhoc-ship-from.component.css'],
})
export class AdhocShipFromComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.shipFromAddrInfo)
  }
  @Input() shipFromAddrInfo!: FormGroup;
  ngOnInit() {
  }
  
}
