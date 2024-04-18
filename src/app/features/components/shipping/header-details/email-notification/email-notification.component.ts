import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css'],
})
export class EmailNotificationComponent implements OnInit, OnChanges {
  faCheckCircle = faCheckCircle;
  @Input() checkEmailNotification!: boolean;
  @Input() emailInfo!: FormGroup;
  @Input() shipFlag!: boolean;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.setValidators();
  }

  ngOnInit() {
    this.setValidators();
  }
  setValidators() {
    if (this.checkEmailNotification && this.emailInfo) {
      this.emailInfo.controls['senderEmails'].setValidators(
        Validators.required
      );
    } else {
      this.emailInfo.controls['senderEmails'].clearValidators();
    }
    this.emailInfo.controls['senderEmails'].updateValueAndValidity();
  }
}
