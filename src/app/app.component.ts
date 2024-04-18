import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from './config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  typeSelected!: string;
  title = 'ShipConsoleUI';
  static roleMap = new Map([
    [1, 'sc-admin'],
    [2, 'sc-shipper'],
    [3, 'admin'],
    [4, 'shipper'],
    [5, 'tracker'],
    [6, 'document-controller'],
  ]);

  constructor(private spinnerService: NgxSpinnerService,private configService: ConfigService) {
    this.typeSelected = 'ball-pulse';
     
  }
  ngOnInit(): void {
    //this.showSpinner();
  }
}
