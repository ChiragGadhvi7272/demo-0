import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleUp, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ProductDetailsService } from '../../../services/product-details.service';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';

@Component({
  selector: 'app-upload-product-details',
  templateUrl: './upload-product-details.component.html',
  styleUrls: ['./upload-product-details.component.css'],
})
export class UploadProductDetailsComponent implements OnInit {
  faCircleUp = faCircleUp;
  faCircleLeft = faCircleLeft;
  file: any;
  dataNum!: number;
  reportURL!: string;
  messageAlert!: any;
  statusAlert!: any;
  is_uploadButton_disabled: boolean = true;
  uploadProductDetailsForm!: FormGroup;
  role!: any;
  userData: any;
  clientId!: number;
  orgId!: string;
  invOrgId!: string;
  fileFormat: boolean = false;

  downloadSampleFileUrl: any = `${environment.apiUrl}/productDetails/sampleFile`;
  downloadReportFileUrl: any = `${environment.apiUrl}/productDetails/ErrorFile?uploadId=`;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailsService: ProductDetailsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private location: Location,
    private spinner: NgxSpinnerService,
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
    this.productDetailsService
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
    this.uploadProductDetailsForm = this.fb.group({
      fileName: new FormControl('', Validators.required),
    });
  }

  downloadReport() {
    if (!this.dataNum) {
      const fullPath = this.location.prepareExternalUrl(this.router.url);
      const origin = window.location.origin;
      this.reportURL = `${origin}${fullPath}/${this.role}/productDetails`;
      this.toastr.error('No file has uploaded to show the error file!');
    } else {
      this.reportURL = this.downloadReportFileUrl + this.dataNum;
      this.toastr.success('Report Downloaded');
    }
  }

  downloadSampleFile() {
    this.toastr.success('Sample File Downloaded Successfully');
  }
}
