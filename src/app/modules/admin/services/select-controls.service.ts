import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class SelectControlsService {
  constructor(private http: HttpClient) {}
  selectControls(selectControls: FormGroup | FormArray) {
    if (
      selectControls instanceof FormGroup ||
      selectControls instanceof FormArray
    ) {
      Object.keys(selectControls.controls).forEach((controlName) => {
        const control = selectControls.get(controlName);
        if (control instanceof FormControl && control.value !== undefined) {
          control.setValue('');
        }
      });
    }
  }
}
