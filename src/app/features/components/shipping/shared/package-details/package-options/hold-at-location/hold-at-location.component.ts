import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hold-at-location',
  templateUrl: './hold-at-location.component.html',
  styleUrls: ['./hold-at-location.component.css']
})
export class HoldAtLocationComponent implements OnInit
{ 
  @Input() holdAtLocInfo!: FormGroup;
  isEmitting: any;

  constructor(private fb : NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.holdAtLocationValidations();
    // this.enableRestFields();
  }

  holdAtLocationValidations()
  {
    let phoneNumberPattern =
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[]\d{9}|(\d[ -]?){9}\d$/;
    this.holdAtLocInfo = this.fb.group({
      locationFlag : [''],
      line1 : [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$'),
        ],
      ],
      line2 : [''],
      city : [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      state : [
        '',
        [
          Validators.required,
          Validators.maxLength(2),
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      postalCode : [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$'),
        ],
      ],
      country : [''],
      phone : ['',
      [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern(phoneNumberPattern),
        Validators.pattern('^\\S+(\\s\\S+)*(\\s{2,}\\S+)*$'),
      ],
    ],
      companyName : [''],
    });
  }

  showAccordion(event: any) { 
    if (!event.target.checked) {
     this.holdAtLocInfo.reset()
    }
  }

  get holdAtLocationInfoControls()
  {
    return this.holdAtLocInfo.controls;
  }
 

}
