import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilService } from 'src/app/shared/services/shared-util.service';
import { InternationalDetailsComponent } from '../international-details.component';

@Component({
  selector: 'app-usco-details',
  templateUrl: './usco-details.component.html',
  styleUrls: ['./usco-details.component.css'],
})
export class UscoDetailsComponent implements OnInit, OnChanges {
  constructor(
    private sharedUtilService: SharedUtilService,
    private internationalDetails: InternationalDetailsComponent
  ) {}
  @Input() intlUscoInfo!: FormGroup;
  uscoDetails!: boolean;
  faChevronDown = faCaretDown;
  faChevronUp = faCaretUp;
  toggleUscoDetails!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes in uscoInfo', changes);
    this.intlUscoInfo
      .get('exportDate')
      ?.setValue(
        this.sharedUtilService.extractDate(
          this.intlUscoInfo.get('exportDate')?.value
        )
      );
  }

  ngOnInit(): void {
    this.internationalDetails.uscoFlagSubject.subscribe((uscoFlag) => {
      this.uscoDetails = uscoFlag;
    });
    this.toggleUscoDetails = false;
  }

  toggleUSCO() {
    this.toggleUscoDetails = !this.toggleUscoDetails;
  }
}
