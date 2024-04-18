import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cn22-details',
  templateUrl: './cn22-details.component.html',
  styleUrls: ['./cn22-details.component.css']
})
export class Cn22DetailsComponent implements OnInit{
 
  @Input() intlCN22Info!:FormGroup;
  @Input()cn22TypeList!:any
  cn22Details!: boolean; 
  faChevronDown = faCaretDown;
  faChevronUp = faCaretUp;
  ngOnInit(): void {
    console.log('Cn22DetailsComponent oninit')
    this.cn22Details=false;
  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
  toggleCn22Details() {
    this.cn22Details = !this.cn22Details;
  }
  get cn22FormControls() {
    return this.intlCN22Info.controls;
  }

}
