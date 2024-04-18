import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adhoc-ship-to',
  templateUrl: './adhoc-ship-to.component.html',
  styleUrls: ['./adhoc-ship-to.component.css']
})
export class AdhocShipToComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.shipToAddrInfo)
  }
  @Input() shipToAddrInfo!: FormGroup;
  ngOnInit() {
  }
  
}