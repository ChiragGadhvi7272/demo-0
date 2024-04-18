import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  faCircleCheck,
  faChevronCircleRight,
  faSearch,
  faEye,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  ApexChart,
  ApexAnnotations,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStates,
  ApexTitleSubtitle,
  ApexTheme,
} from 'ng-apexcharts';
@Component({
  selector: 'app-master-bol',
  templateUrl: './master-bol.component.html',
  styleUrls: ['./master-bol.component.css'],
})
export class MasterBolComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faSearch = faSearch;
  faChevronCircleRight = faChevronCircleRight;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  masterBol!: FormGroup;
  @Input() chart!: ApexChart;
  @Input() annotations!: ApexAnnotations;
  @Input() colors!: string[];
  @Input() dataLabels!: ApexDataLabels;
  @Input() series!: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input() stroke!: ApexStroke;
  @Input() labels!: string[];
  @Input() legend!: ApexLegend;
  @Input() fill!: ApexFill;
  @Input() tooltip!: ApexTooltip;
  @Input() plotOptions!: ApexPlotOptions;
  @Input() responsive!: ApexResponsive[];
  @Input() xaxis!: ApexXAxis;
  @Input() yaxis!: ApexYAxis | ApexYAxis[];
  @Input() grid!: ApexGrid;
  @Input() states!: ApexStates;
  @Input() title!: ApexTitleSubtitle;
  @Input() subtitle!: ApexTitleSubtitle;
  @Input() theme!: ApexTheme;
  constructor() {}

  ngOnInit(): void {}
}
