import { Component, Input, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { HttpService } from 'src/app/services/http.service';
export type RadarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
})
export class ChartViewComponent implements OnInit {
  @Input() subdimension: string | undefined;

  public radarChart: Partial<RadarChart> | any;

  constructor(private questionsService: HttpService) {}
  agnoSeleccionado: number = 2020;
  UltimoAgno: Date = new Date();

  ngOnInit(): void {
    console.log(this.subdimension);
    this.radarChart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: [0],
        },
        {
          name: this.agnoSeleccionado,
          data: [0],
        },
      ],
      chart: {
        height: 350,
        width: 350,
        type: 'radar',
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      title: {
        text: 'Municipality, cross-sectorial and multigovernance collaboration',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3'],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
  }
}
