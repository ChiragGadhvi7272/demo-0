import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-labels',
  templateUrl: './view-labels.component.html',
  styleUrls: ['./view-labels.component.css'],
})
export class ViewLabelsComponent implements OnInit {
  packageNum: any;
  trackingNumber: any;
  shipmentPackagesInfoList: any;
  returnTrackingNumber: any;
  @Input() documentInfo!: FormGroup;
  intlDocumentList!: any;
  dgFormList!: any;
  intlLabelPath!: any;
  intlLabelFormat!: any;
  deliveryId!: any;
  intlFlag: boolean = false;
  hazmatFlag: boolean = false;
  labelPath: any;
  ngOnInit(): void {}
  constructor() {}

  setPackageDetails(
    shipmentPackagesInfoList: any,
    labelPath: any,
    labelFormat: any,
    deliveryId: any,
    cn22LabelFormat: any,
    intlFlag: boolean
  ) {
    console.log('documentInfo :: ', this.documentInfo);
    console.log('intlFlag : ', intlFlag);
    this.deliveryId = deliveryId;
    this.intlFlag = intlFlag;
    if (intlFlag) {
      let ciDocumentList = this.documentInfo.get('ciDocumentList')?.value;
      if (ciDocumentList && ciDocumentList.length != 0) {
        this.intlDocumentList = ciDocumentList;
        this.intlLabelFormat = 'pdf';
      } else {
        this.intlDocumentList = this.documentInfo.get('cn22List')?.value;
        this.intlLabelFormat = cn22LabelFormat.toLowerCase();
      }
    }
    let dgFormList = this.documentInfo.get('dgFormList')?.value;
    this.hazmatFlag = dgFormList && dgFormList.length != 0;
    if (this.hazmatFlag) {
      this.dgFormList = dgFormList;
    }
    this.shipmentPackagesInfoList = shipmentPackagesInfoList;
    let fileExtension =
      labelFormat == 'ZPL' || labelFormat == 'EPL' ? 'TXT' : labelFormat;
    for (let index = 1; index <= shipmentPackagesInfoList.length; index++) {
      shipmentPackagesInfoList[index - 1]['viewLabelPath'] = '';
      this.packageNum = shipmentPackagesInfoList[index - 1].packageNum;
      shipmentPackagesInfoList[index - 1]['returnViewLabelPath'] = '';
      this.trackingNumber = shipmentPackagesInfoList[index - 1].trackingNumber;
      this.returnTrackingNumber =
        shipmentPackagesInfoList[
          index - 1
        ].returnShipmentInfo.carrierInfo.trackingNumber;
      shipmentPackagesInfoList[index - 1]['viewLabelPath'] =
        labelPath + this.trackingNumber + '.' + fileExtension.toLowerCase();
      shipmentPackagesInfoList[index - 1]['returnViewLabelPath'] =
        labelPath +
        this.returnTrackingNumber +
        '_Return' +
        '.' +
        fileExtension.toLowerCase();
    }
    this.intlLabelPath = labelPath + '/intlDocs/';
    this.labelPath = labelPath;
  }
}
