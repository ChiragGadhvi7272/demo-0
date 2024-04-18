import { Component, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faCirclePlus,
  faCircleMinus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-hazmat-details',
  templateUrl: './hazmat-details.component.html',
  styleUrls: ['./hazmat-details.component.css'],
})
export class HazmatDetailsComponent {
  @Input() hazmatInfo!: FormGroup;
  @Input() hazmatLookUps: any;
  @Input() shipFlag!:boolean
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  faTrash = faTrash;
  hazmatFlagCheck!: boolean;
  hideButtons!: boolean;
  qvalueList!: any;
  outerPackagingTypeList!: any;
  packagingGroupTypelist!: any;
  regulationSetList!: any;
  commodityRegulatedLevelCodeList!: any;
  transportCategoryList!: any;
  transportationModeList!: any;
  hazmatQuantityUOMList!: any;
  hazmatClassList!: any;
  hazmatDetailsList: any;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.hazmatFlagCheck = this.hazmatInfo?.controls['hazmatFlag'].value;
    this.hideButtons = true;
    console.log('hazmatInfo init:: ', this.hazmatInfo);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('this.hazmatLookUps', this.hazmatLookUps);
    this.qvalueList = this.hazmatLookUps.qvalueList;
    this.outerPackagingTypeList = this.hazmatLookUps.outerPackagingTypeList;
    this.packagingGroupTypelist = this.hazmatLookUps.packagingGroupTypelist;
    this.regulationSetList = this.hazmatLookUps.regulationSetList;
    this.commodityRegulatedLevelCodeList =
      this.hazmatLookUps.commodityRegulatedLevelCodeList;
    this.transportCategoryList = this.hazmatLookUps.transportCategoryList;
    this.transportationModeList = this.hazmatLookUps.transportationModeList;
    this.hazmatQuantityUOMList = this.hazmatLookUps.hazmatQuantityUOMList;
    this.hazmatClassList = this.hazmatLookUps.hazmatClassList;
    this.hazmatDetailsList = this.hazmatLookUps.hazmatDetailsList;
  }
  addRow() {
    const HAZMATINFOARRAY: FormArray = this.hazmatCommodityInfoList;
    const NEWROWVALUE = (
      this.hazmatCommodityInfoList.at(
        this.hazmatCommodityInfoList.length - 1
      ) as FormGroup
    ).value;
    HAZMATINFOARRAY.push(this.addValidations(this.fb.group(NEWROWVALUE)));
    this.hazmatInfo.removeControl('hazmatCommodityInfoList');
    this.hazmatInfo.setControl('hazmatCommodityInfoList', HAZMATINFOARRAY);
    if (this.hazmatCommodityInfoList.length > 1) {
      this.hideButtons = false;
    }
  }
  removeRow() {
    if (this.hazmatCommodityInfoList.length > 1) {
      this.hazmatCommodityInfoList.removeAt(
        this.hazmatCommodityInfoList.length - 1
      );
    }
    if (this.hazmatCommodityInfoList.length === 1) {
      this.hideButtons = true;
    } else {
      this.hideButtons = false;
    }
  }

  removeAllRows() {
    while (this.hazmatCommodityInfoList.length > 1) {
      this.hazmatCommodityInfoList.removeAt(1); // Remove all rows except the first one
      if (this.hazmatCommodityInfoList.length > 1) {
        this.hideButtons = false;
      } else {
        this.hideButtons = true;
      }
    }
  }

  get hazmatInfoControls() {
    return this.hazmatInfo.controls;
  }
  getGroup(index: number) {
    return this.hazmatCommodityInfoList.at(index) as FormGroup;
  }

  get hazmatCommodityInfoList() {
    return this.hazmatInfo.get('hazmatCommodityInfoList') as FormArray;
  }
  onHazmatIdChange(event: any, index: any) {
    let selectedIndex = event.target['selectedIndex'];
    this.hazmatCommodityInfoList.at(index).reset();
    if (0 != selectedIndex) {
      this.hazmatCommodityInfoList
        .at(index)
        .patchValue(this.hazmatDetailsList.at(selectedIndex - 1));
    }

  }
  trackByFn(index: number, option: any): number {
    return option.id;
  }
  addValidations(form: FormGroup) {
    form.get('quantity')?.addValidators(Validators.required)
    form.get('quantityUnits')?.addValidators(Validators.required)
    form.get('idNumber')?.addValidators(Validators.required)
    form.get('shipperClass')?.addValidators(Validators.required)
    form.get('properShippingName')?.addValidators(Validators.required)
    form.get('regulationSet')?.addValidators(Validators.required)
    form.get('commodityRegulatedLevelCode')?.addValidators(Validators.required)
    form.get('chemicalRecordId')?.addValidators(Validators.required)
    form.get('packagingType')?.addValidators(Validators.required)
    form.get('packagingTypeQuantity')?.addValidators(Validators.required)
    form.get('packagingGroup')?.addValidators(Validators.required)
    form.get('packingInstruction')?.addValidators(Validators.required)
    return form;
  }
  onhazmatCheck(event: any) {
    console.log('event : ', event)
    if (event.target.checked) {
      (this.hazmatCommodityInfoList as FormArray).controls.forEach((commodity, index) => {
        this.addValidations(this.hazmatCommodityInfoList.at(index) as FormGroup);
      })
    }
    else{
      (this.hazmatCommodityInfoList as FormArray).controls.forEach((commodity, index) =>{
        this.clearValidators(commodity as FormGroup);
      })
    }
  }
  packageRadioCheckChange(event: any) {
    console.log('clicked : ',event)
    if('allPackedInOneFlag'==event.target.id && event.target.checked){
      console.log('inside if  : ')
    this.hazmatInfo.get('overPackedFlag')?.setValue(false)
    this.hazmatInfo.get('allPackedInOneFlag')?.setValue(true)
    
    }
    else{
      console.log('inside else  : ')
      this.hazmatInfo.get('allPackedInOneFlag')?.setValue(false)
      this.hazmatInfo.get('overPackedFlag')?.setValue(true)
    }
  }
clearValidators(form : FormGroup){
  Object.values(form.controls).forEach(control => {
    control.clearValidators();
    control.updateValueAndValidity();
  });
}
}
