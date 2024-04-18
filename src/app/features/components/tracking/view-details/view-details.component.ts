import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
})
export class ViewDetailsComponent {
  @Input() typeOfView!: string;
  heading!: string;
  ngOnChanges() {
    if (this.typeOfView == 'wayBill') {
      this.heading = 'View Packages Shipped';
    } else {
      this.heading = 'View Details';
    }
  }
  ngOnInit() {
    
  }
}
