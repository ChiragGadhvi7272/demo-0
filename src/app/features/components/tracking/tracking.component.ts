import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  trackingForm!: FormGroup;
  typeOfView!: string;
  constructor(private fb : FormBuilder) { }

  trackingValidations() {
    this.trackingForm = this.fb.group({
      fromDate : [''],
      toDate : [''],
      value : [''],
      type: [''],
    });
  }

  get trackingControls() {
    return this.trackingForm.controls;
  }

  ngOnInit(): void {
    this.trackingValidations();
  }

  viewDetails(typeOfView: string) {
    this.typeOfView = typeOfView;
  }
}
