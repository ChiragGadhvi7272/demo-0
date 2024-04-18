import { Component } from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-electronic-export-details',
  templateUrl: './electronic-export-details.component.html',
  styleUrls: ['./electronic-export-details.component.css']
})
export class ElectronicExportDetailsComponent {
  eeiDetails!: boolean; 
  faChevronDown = faCaretDown;
  faChevronUp = faCaretUp;


  
  ngOnInit(): void {
    this.eeiDetails = false; 
  } 
  toggleEEI() {
    this.eeiDetails = !this.eeiDetails;
  }
}
