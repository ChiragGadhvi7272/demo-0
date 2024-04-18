import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ToastrService } from 'ngx-toastr';
import { ShipmentCarrierDetails } from '../models/shipment-carrier-details.model';
import { ShipmentHeadersInfo } from 'src/app/shared/models/shipment-headers-info.model';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  shipmentCarrierDetails!: ShipmentCarrierDetails;
  shipmentHeaderInfo!: ShipmentHeadersInfo;
  carrierCode: any;
  carrierName: any;
  qzLabelFormat!: string;
  printerName: any;
  documentPrinterName: any;
  userData: any;
  labelPath!: string;
  op900PrinterName: any;
  dgformPrinterName: any;
  machineName: any;
  startPage: any;
  endPage: any;
  noOfCopiesPrinted: any;
  noOfLabelsToPrint: any;
  numPackSlipReports: any;
  waybillNumber: any;
  labelFormat!: string;
  shipmentPackagesInfoList!: any;
  printerInfo: any;
  intlFlag: any;
  isHazmatFlag: boolean = false;
  printl: any;
  dgFormSaveName!: any;
  intlDocSaveName: any;

  constructor(
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  printLabelService(
    shipmentHeadersInfo: ShipmentHeadersInfo,
    shipmentCarrierDetails: ShipmentCarrierDetails,
    deliveryIdsList: string[],
    packSlipFlag: string,
    toPageChange: number,
    mpsFlag: boolean
  ) {
    console.log('shipmentHeadersInfo :', shipmentHeadersInfo);
    console.log('shipmentCarrierDetails :', shipmentCarrierDetails);
    console.log('deliveryIdsList :', deliveryIdsList);
    this.shipmentHeaderInfo = shipmentHeadersInfo;
    this.shipmentCarrierDetails = shipmentCarrierDetails;
    this.userData = this.localStorageService.getLocalUserData();
    this.labelPath = this.userData.labelPath;
    this.carrierCode = this.shipmentCarrierDetails.carrierCode;
    this.labelFormat = this.shipmentCarrierDetails.labelFormat.toUpperCase();
    this.shipmentPackagesInfoList =
      this.shipmentHeaderInfo.shipmentPackagesInfoList;
    this.intlFlag = this.shipmentHeaderInfo.intlFlag;
    this.printerInfo = this.shipmentHeaderInfo.printerInfo;
    this.op900PrinterName = this.printerInfo.op900PrinterName;
    this.dgformPrinterName = this.printerInfo.dgformPrinterName;
    this.machineName = this.printerInfo.machineName;
    this.startPage = this.printerInfo.printFromPage;
    this.endPage = this.printerInfo.printToPage;
    this.noOfLabelsToPrint = this.printerInfo.noOfLabelsToPrint;
    this.noOfCopiesPrinted = this.printerInfo.noOfCopiesPrinted;
    this.documentPrinterName = this.printerInfo.documentPrinter;
    this.printerName = this.printerInfo.printerName;
    this.waybillNumber = this.shipmentHeaderInfo.waybillNumber;
    this.carrierName = this.shipmentCarrierDetails.carrierName;
    if (mpsFlag) {
      this.startPage = toPageChange + 1;
    }

    this.loadCertificate()
      .then(() => this.startConnection())
      .then(() => {
        const printPromises = [];
        console.log('Certificate loaded and connection established.');
        /*
        //hardCode
        this.labelPath = "D:\\labels\\";
        let trackingNumber = "XPO_PackSlip.pdf";
        this.qzLabelFormat = "pdf"
        let filePath = this.labelPath + trackingNumber;
        this.documentPrinterName = "LABELPDF"

        this.printLabelsUsingQZ(filePath, this.qzLabelFormat, this.documentPrinterName, 1, trackingNumber).then(() => this.endConnection()).catch((error) => {
          console.error("Error occurred:", error);
        });*/
        let fileExtension =
          this.labelFormat == 'ZPL' || this.labelFormat == 'EPL'
            ? '.txt'
            : '.' + this.labelFormat.toLowerCase();
        if (this.labelFormat == 'PDF') {
          this.qzLabelFormat = 'pdf';
        } else if (
          this.labelFormat == 'ZPL' ||
          this.labelFormat == 'ZEBRA' ||
          this.labelFormat == 'ZPL2' ||
          this.labelFormat == 'AZpl' ||
          this.labelFormat == 'EPL'
        ) {
          this.qzLabelFormat = 'raw';
        } else if (this.labelFormat == 'GIF' || this.labelFormat == 'PNG') {
          this.qzLabelFormat = 'raw';
        } else if (this.labelFormat == 'IMAGE') {
          this.qzLabelFormat = 'IMAGE';
        }
        try {
          if (packSlipFlag == 'packSlip') {
            console.log('no of packSlip print only : ', deliveryIdsList.length);
            if (deliveryIdsList.length > 0) {
              for (let idx = 0; idx < deliveryIdsList.length; idx++) {
                let path =
                  this.labelPath +
                  deliveryIdsList[idx] +
                  '_PackingSlip' +
                  '.pdf';
                let fileName = deliveryIdsList[idx] + '_PackingSlip';
                printPromises.push(
                  this.printLabelsUsingQZ(
                    path,
                    'pdf',
                    this.documentPrinterName,
                    this.numPackSlipReports,
                    fileName
                  )
                );
              }
            }
          } else if (mpsFlag) {
            console.log('mpsFlag : ', mpsFlag);
            console.log(
              'startPage :',
              this.startPage,
              ' endPage : ',
              this.endPage
            );
            for (let index = this.startPage; index <= this.endPage; index++) {
              let trackingNumber =
                this.shipmentPackagesInfoList[index - 1].trackingNumber;
              let filePath = this.labelPath + trackingNumber + fileExtension;
              printPromises.push(
                this.printLabelsUsingQZ(
                  filePath,
                  this.qzLabelFormat,
                  this.printerName,
                  this.noOfCopiesPrinted,
                  trackingNumber
                )
              );
              if (
                this.shipmentPackagesInfoList[index - 1].hazmatInfo.hazmatFlag
              ) {
                this.isHazmatFlag = true;
              }
              if (
                this.shipmentPackagesInfoList[index - 1].returnShipmentInfo
                  .returnFlag
              ) {
                let returnTrackingNumber =
                  this.shipmentPackagesInfoList[index - 1].returnShipmentInfo
                    .carrierInfo.trackingNumber;
                let returnFilePath =
                  this.labelPath +
                  returnTrackingNumber +
                  '_Return' +
                  fileExtension;
                printPromises.push(
                  this.printLabelsUsingQZ(
                    returnFilePath,
                    this.qzLabelFormat,
                    this.printerName,
                    this.noOfCopiesPrinted,
                    returnTrackingNumber
                  )
                );
              }
            }
          } else {
            console.log('deliveryIdsList.length : ', deliveryIdsList.length);
            if (deliveryIdsList.length > 0) {
              for (let idx = 0; idx < deliveryIdsList.length; idx++) {
                let path =
                  this.labelPath +
                  deliveryIdsList[idx] +
                  '_PackingSlip' +
                  '.pdf';
                let fileName = deliveryIdsList[idx] + '_PackingSlip';
                printPromises.push(
                  this.printLabelsUsingQZ(
                    path,
                    'pdf',
                    this.documentPrinterName,
                    this.numPackSlipReports,
                    fileName
                  )
                );
              }
            }
            console.log(
              'startPage :',
              this.startPage,
              ' endPage : ',
              this.endPage
            );
            for (let index = this.startPage; index <= this.endPage; index++) {
              let trackingNumber =
                this.shipmentPackagesInfoList[index - 1].trackingNumber;
              if (
                this.shipmentPackagesInfoList[index - 1].hazmatInfo.hazmatFlag
              ) {
                this.isHazmatFlag = true;
              }
              let filePath = this.labelPath + trackingNumber + fileExtension;
              printPromises.push(
                this.printLabelsUsingQZ(
                  filePath,
                  this.qzLabelFormat,
                  this.printerName,
                  this.noOfCopiesPrinted,
                  trackingNumber
                )
              );

              if (
                this.shipmentPackagesInfoList[index - 1].returnShipmentInfo
                  .returnFlag
              ) {
                let returnTrackingNumber =
                  this.shipmentPackagesInfoList[index - 1].returnShipmentInfo
                    .carrierInfo.trackingNumber;
                let returnFilePath =
                  this.labelPath +
                  returnTrackingNumber +
                  '_Return' +
                  fileExtension;
                printPromises.push(
                  this.printLabelsUsingQZ(
                    returnFilePath,
                    this.qzLabelFormat,
                    this.printerName,
                    this.noOfCopiesPrinted,
                    returnTrackingNumber
                  )
                );
              }
            }
            if (this.intlFlag) {
              console.log('intl flag : ', this.intlFlag);
              //CI Documents
              let ciDocumentList =
                this.shipmentHeaderInfo.documentInfo.ciDocumentList;

              if (mpsFlag) {
                //last label when mpsFlag is enabled
                let intlDocPath =
                  this.labelPath +
                  'intlDocs\\' +
                  ciDocumentList[ciDocumentList.length - 1] +
                  '.pdf';
                this.intlDocSaveName =
                  ciDocumentList[ciDocumentList.length - 1];
                printPromises.push(
                  this.printLabelsUsingQZ(
                    intlDocPath,
                    'pdf',
                    this.documentPrinterName,
                    this.noOfCopiesPrinted,
                    this.intlDocSaveName
                  )
                );
              } else {
                //for all intlDoc
                for (let idx = 0; idx < ciDocumentList.length; idx++) {
                  let intlDocPath =
                    this.labelPath +
                    'intlDocs\\' +
                    ciDocumentList[idx] +
                    '.pdf';
                  this.intlDocSaveName = ciDocumentList[idx];
                  printPromises.push(
                    this.printLabelsUsingQZ(
                      intlDocPath,
                      'pdf',
                      this.documentPrinterName,
                      this.noOfCopiesPrinted,
                      this.intlDocSaveName
                    )
                  );
                }
              }
            }
          }
          if (this.isHazmatFlag) {
            console.log('hazmatflag : ', this.isHazmatFlag);
            let dgFormList = this.shipmentHeaderInfo.documentInfo.dgFormList;
            console.log('dgFormList : ', dgFormList);

            if (mpsFlag) {
              console.log(
                'mps flag with last dgForm  : ',
                dgFormList[dgFormList.length - 1]
              );
              let dgFormPath =
                this.labelPath + dgFormList[dgFormList.length - 1] + '.pdf';
              this.dgFormSaveName = dgFormList[dgFormList.length - 1];
              printPromises.push(
                this.printLabelsUsingQZ(
                  dgFormPath,
                  'pdf',
                  this.dgformPrinterName,
                  this.noOfCopiesPrinted,
                  this.dgFormSaveName
                )
              );
            } else {
              for (let idx = 0; idx < dgFormList.length; idx++) {
                let dgFormPath = this.labelPath + dgFormList[idx] + '.pdf';
                this.dgFormSaveName = dgFormList[idx];
                printPromises.push(
                  this.printLabelsUsingQZ(
                    dgFormPath,
                    'pdf',
                    this.dgformPrinterName,
                    this.noOfCopiesPrinted,
                    this.dgFormSaveName
                  )
                );
              }
            }
            this.isHazmatFlag = false;
          }
        } catch (err) {
          console.error(err);
        }

        console.log('Executing print promise');
        Promise.all(printPromises)
          .then(() => this.endConnection())
          .catch((error) => {
            console.error('Error occurred:', error);
            this.endConnection(); // Ensure connection is closed even if there's an error
          });
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        this.endConnection();
      });
  }

  printLabelsUsingQZ(
    filePath: string,
    fileFormat: string,
    printerName: string,
    noOfCopiesPrinted: number,
    docSaveName: string
  ): Promise<void> {
    console.log(
      'filePath : ',
      filePath,
      ' fileFormat : ',
      fileFormat,
      ' printerName : ',
      printerName,
      ' noOfCopiesPrinted : ',
      noOfCopiesPrinted,
      ' docSaveName : ',
      docSaveName
    );
    return new Promise((resolve, reject) => {
      try {
        const found = qz.printers.find(printerName);
        const config = qz.configs.create(printerName, {
          jobName: docSaveName,
          copies: noOfCopiesPrinted,
        });
        let data = null;
        if (fileFormat == 'pdf') {
          data = [
            {
              type: fileFormat,
              data: filePath,
            },
          ];
        } else if (fileFormat == 'raw') {
          data = [
            {
              type: fileFormat,
              format: 'command',
              flavor: 'file',
              data: filePath,
            },
          ];
        }
        resolve(qz.print(config, data));
      } catch (err) {
        console.error('Error:', err);
        reject(err);
      }
    });
  }

  loadCertificate(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        qz.security.setCertificatePromise(
          (certResolve: any, certReject: any) => {
            fetch('assets/digital-certificate.txt', {
              cache: 'no-store',
              headers: { 'Content-Type': 'text/plain' },
            })
              .then((data) => certResolve(data.text()))
              .catch((error) => certReject(error));
          }
        );

        qz.security.setSignatureAlgorithm('SHA512'); // Since 2.1

        qz.security.setSignaturePromise((hash: any) => {
          return (sigResolve: any, sigReject: any) => {
            fetch('assets/private-key.pem', {
              cache: 'no-store',
              headers: { 'Content-Type': 'text/plain' },
            })
              .then((wrapped) => wrapped.text())
              .then((data) => {
                var pk = KEYUTIL.getKey(data);
                var sig = new KJUR.crypto.Signature({ alg: 'SHA512withRSA' });
                sig.init(pk);
                sig.updateString(hash);
                var hex = sig.sign();
                sigResolve(stob64(hextorstr(hex)));
              })
              .catch((err) => sigReject(err));
          };
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  startConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('start connection');
      if (!qz.websocket.isActive()) {
        try {
          resolve(qz.websocket.connect());
        } catch (e) {
          console.error(e);
          reject(e);
        }
      } else {
        resolve(qz.websocket.disconnect());
      }
    });
  }

  endConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('End connection');
      if (qz.websocket.isActive()) {
        try {
          resolve(qz.websocket.disconnect());
        } catch (e) {
          console.error(e);
          reject(e);
        }
      } else {
        resolve(qz.websocket.disconnect());
      }
    });
  }
}
