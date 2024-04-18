import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dry-ice',
  templateUrl: './dry-ice.component.html',
  styleUrls: ['./dry-ice.component.css']
})
export class DryIceComponent 
{
  @Output() DryIceInfoValues = new EventEmitter<any>();
  dyIceInfoForm !: FormGroup;
  isEmitting !: any;

  constructor(private fb : NonNullableFormBuilder){}

  ngOnInit(): void {
    this.dryIceInfoValidations();
    this.enableRestFields();
  }

  enableRestFields()
  {
    if(this.dryIceInfoControls['dryIceFlag'].value)
    {
      this.dryIceInfoControls['weight'].enable();
      this.dryIceInfoControls['weightUnits'].enable();
    } else {
      this.dryIceInfoControls['weight'].disable();
      this.dryIceInfoControls['weight'].reset();
      this.dryIceInfoControls['weight'].setValue('');
      this.dryIceInfoControls['weightUnits'].disable();
      this.dryIceInfoControls['weightUnits'].reset();
      this.dryIceInfoControls['weightUnits'].setValue('');
    }
  }

  get dryIceInfoControls() {
    return this.dyIceInfoForm.controls;
  }

  dryIceInfoValidations()
  {
    this.dyIceInfoForm = this.fb.group({
      dryIceFlag : [''],
      weight : ['',Validators.required],
			weightUnits : ['', Validators.required]
    });
  }

  emitDryIceInfoValues()
  {
    const formValues = this.dyIceInfoForm.value;
      if (!this.isEmitting) {
        this.isEmitting = true;
        this.DryIceInfoValues.emit(formValues);
        this.isEmitting = false;
      }
      return formValues;
  }
}
