import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { faCircleUp, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ShipToLocationsService } from '../../../services/ship-to-locations.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Component({
  selector: 'app-upload-ship-to-location-details',
  templateUrl: './upload-ship-to-location-details.component.html',
  styleUrls: ['./upload-ship-to-location-details.component.css'],
})
export class UploadShipToLocationDetailsComponent implements OnInit {
  faCircleUp = faCircleUp;
  faCircleLeft = faCircleLeft;
  file: any;
  dataNum!: number;
  reportURL!: string;
  messageAlert!: any;
  statusAlert!: any;
  is_uploadButton_disabled: boolean = true;
  uploadShipToForm!: FormGroup;
  role!: any;
  userData: any;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  fileFormat: boolean = false;

  downloadSampleFileUrl: any = `${environment.apiUrl}/shipToLocation/sampleFile`;
  downloadReportFileUrl: any = `${environment.apiUrl}/shipToLocation/ErrorFile?uploadId=`;
  constructor(
    private activatedRoute: ActivatedRoute,
    private shipToLocationsService: ShipToLocationsService,
    private fb: NonNullableFormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private location: Location,
    private localStorageService: LocalStorageService
  ) {}

  getFile(event: any) {
    this.file = event.target.files[0];
    if (
      (this.file &&
        this.file.name &&
        'xlsx' === this.file.name.split('.')[1].trim()) ||
      'xls' === this.file.name.split('.')[1].trim()
    ) {
      this.fileFormat = true;
    } else {
      this.toastr.error('please upload xlxs or xlx');
    }
  }

  uploadFile() {
    let formData = new FormData();
    formData.set('file', this.file);
    this.spinner.show();
    this.shipToLocationsService
      .uploadFile(this.clientId, this.orgId, this.invOrgId, formData)
      .subscribe({
        next: (resp: any) => {
          if (this.file != '' && resp.code == 200) {
            this.spinner.hide();
            this.dataNum = resp.data;
            this.toastr.success(resp.message);
          } else {
            this.spinner.hide();
            this.toastr.error(resp.message);
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.error.status);
        },
      });
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.userData = this.localStorageService.getLocalUserData();
    this.clientId = this.userData.clientId;
    this.invOrgId = this.activatedRoute.snapshot.queryParams['invOrg'];
    this.orgId = this.activatedRoute.snapshot.queryParams['org'];
    this.uploadShipToForm = this.fb.group({
      fileName: new FormControl('', Validators.required),
    });
  }

  downloadReport() {
    if (!this.dataNum) {
      this.toastr.error('No file has uploaded to show the error file!');
      const fullPath = this.location.prepareExternalUrl(this.router.url);
      const origin = window.location.origin;
      this.reportURL = `${origin}${fullPath}/${this.role}/shipToLocationDetails`;
    } else {
      this.reportURL = this.downloadReportFileUrl + this.dataNum;
      this.toastr.success('Report Downloaded');
    }
  }

  downloadSampleFile() {
    this.toastr.success('Sample File Downloaded Successfully');
  }
}
