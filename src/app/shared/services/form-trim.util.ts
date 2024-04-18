// form-trim.utils.ts
import { FormGroup } from '@angular/forms';

export function trimFormValues(form: FormGroup) {
  Object.keys(form.controls).forEach((key) => {
    const control = form.get(key);
    if (control && control.value && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  });
}
