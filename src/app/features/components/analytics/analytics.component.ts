import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  faRefresh,
  faFileExport,
  faCircleCheck,
  faExchange,
} from '@fortawesome/free-solid-svg-icons';
import { PaginationInstance } from 'ngx-pagination';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  @ViewChild('apxChart') apxChart!: ChartComponent;
  faRefresh = faRefresh;
  faFileExport = faFileExport;
  faCircleCheck = faCircleCheck;
  faExchange = faExchange;
  chartOptions: any;
  barChartOptions: any = {
    series: [
      {
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: 'Reborn Kid',
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: 'Fiction Books Sales',
    },
    xaxis: {
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      labels: {
        formatter: function (val: string) {
          return val + 'K';
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val + 'K';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };
  lineChartoptions: any = {
    series: [
      {
        name: 'High - 2013',
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: 'Low - 2013',
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  currentPage: number = 1; // Initial value of current page is 1
  countPerpage: number = 100;
  listPerPage: number[] = [];
  paginationConfig: PaginationInstance = {
    itemsPerPage: 10, // Number of items per page
    currentPage: 1, // Current page number
  };
  reportsList: any = [];
  dashboradForm!: FormGroup;
  tableHeight!: string;
  isDonutChart: boolean = false;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    for (let i = 1; i <= 30; i++) {
      let list: any = {
        carrier: 'UPS',
        noOfShipments: i,
        shipmentPercent: '53',
        noOfPackages: i,
        packagesPercent: 95,
      };
      this.reportsList.push(list);
    }
    for (let i = 10; i <= this.countPerpage; i = i + 10) {
      this.listPerPage.push(i);
    }
    // console.log(this.reportsList);
    this.dashboradForm = this.fb.group({
      changeRows: [10],
      toDate: [],
      fromDate: [],
      locations: [''],
    });

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: '100%',
        type: 'donut', // or 'donut'
      },
      labels: ['UPS', 'FedEx', 'DHL', 'TNT', 'LTL'],
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: '100%',
              height: 200,
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                  },
                },
              },
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.changeView();
  }
  barChartResponse(series: any) {
    console.log(series);
  }

  changeView() {
    this.isDonutChart = !this.isDonutChart;
    this.chartOptions = {
      ...this.chartOptions,
      chart: {
        ...this.chartOptions.chart,
        type: this.isDonutChart ? 'pie' : 'donut',
      },
    };
  }
  showNoOfRows() {
    let noOfRows = this.dashboradForm.value['changeRows'];
    if (noOfRows) {
      this.paginationConfig.itemsPerPage = noOfRows;
      this.paginationConfig.currentPage = this.currentPage;
      noOfRows == 10 || this.reportsList.length <= 10
        ? (this.tableHeight = 'overflow-y:hidden;height:auto;')
        : (this.tableHeight = 'overflow-y:scroll; height: 365px;');
    } else {
      this.paginationConfig.itemsPerPage = 10;
    }
  }
  onPageChange(newPage: number) {
    this.paginationConfig.currentPage = newPage;
  }
}
