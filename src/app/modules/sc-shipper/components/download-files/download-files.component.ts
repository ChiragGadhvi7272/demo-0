import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faCircleCheck, faDownload } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationInstance } from 'ngx-pagination';
import { DownloadFilesService } from '../../services/download-files.service';
import { DownloadFilesInfo } from '../../models/download-files-info.model';
import { LoadLookupsService } from 'src/app/shared/services/load-lookups-service';

interface files {
  fileName: string;
}

@Component({
  selector: 'app-download-files',
  templateUrl: './download-files.component.html',
  styleUrls: ['./download-files.component.css'],
})
export class DownloadFilesComponent implements OnInit {
  downloadFiles!: FormGroup;
  faCircleCheck = faCircleCheck;
  faDownload = faDownload;
  clientId!: number;
  keyword!: any;
  goED: boolean = true;
  searchInput!: any;
  searchForm!: FormGroup;
  filteredData: files[] = [];
  filteredItems: any[] = [];
  customerNamesList!: any;
  responseData!: any;
  currentPage: number = 1;
  countPerpage: number = 80;
  listPerPage: number[] = [];
  downloadFilesInfo: DownloadFilesInfo = new DownloadFilesInfo();
  paginationConfig: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
  };
  tableHeight!: string;
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private downloadFileService: DownloadFilesService,
    private toastr: ToastrService,
    private loadLookupsService: LoadLookupsService
  ) {}
  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }
  showNoOfRows() {
    let noOfRows = this.downloadFiles.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 8 || this.responseData.length <= 8
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 355px;');
    } else {
      this.paginationConfig.itemsPerPage = 8;
    }
  }

  ngOnInit(): void {
    this.downloadFilesValidations();
    this.downloadFilesControls['keyword'].disable();
    this.loadLookupsService
      .getCustomerNames()
      .subscribe((customerNamesList) => {
        this.customerNamesList = customerNamesList;
      });
    this.getDownloadFiles;
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
  }

  downloadFilesValidations() {
    this.downloadFiles = this.fb.group({
      clientId: ['', [Validators.required]],
      keyword: ['', [Validators.required]],
      changeRows: ['8'],
    });
  }

  get downloadFilesControls() {
    return this.downloadFiles.controls;
  }

  showKeyword(clientId: any) {
    this.downloadFilesControls['keyword'].setValue('');
    this.goED = true;
    this.responseData = null;
    if (clientId == '') {
      this.downloadFilesControls['keyword'].disable();
    } else {
      this.downloadFilesControls['keyword'].enable();
    }
  }

  showGoButton() {
    const keywordValue = this.downloadFilesControls['keyword'].value;
    if (this.clientId !== 0 && keywordValue !== '') {
      this.goED = false;
    } else {
      this.goED = true;
      this.responseData = null;
    }
  }

  getDownloadFiles(clientId: string, keyword: string) {
    this.spinner.show();
    this.downloadFilesInfo.clientId = Number(clientId);
    this.downloadFilesInfo.keyword = keyword;
    this.downloadFileService.getDowloadFiles(this.downloadFilesInfo).subscribe({
      next: (resp: any) => {
        if (
          resp.data &&
          resp.data.length !== undefined &&
          resp.data.length !== null &&
          resp.data.length !== 0
        ) {
          this.responseData = resp.data;
          console.log(this.responseData);
          this.spinner.hide();
          this.filterData();
          this.listPerPage = [];
          for (let i = 8; i <= this.countPerpage; i = i + 8) {
            this.listPerPage.push(i);
          }
        } else {
          this.toastr.error('No Files Found');
          this.spinner.hide();
          this.filteredData = [];
          this.listPerPage[0] = 0;
          this.responseData = null;
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Unable to get the Files');
      },
    });
  }

  filterData() {
    const searchInput = this.searchForm.value['searchInput'].toLowerCase();
    this.filteredData = this.responseData.filter((fileName: string) =>
      fileName.toLowerCase().includes(searchInput)
    );
  }

  downloadFile(fileName: any): void {
    const fileContentUrl =
      this.downloadFileService.getDownloadFileContentUrl(fileName);

    const downloadLink = document.createElement('a');
    downloadLink.href = fileContentUrl;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }
}
