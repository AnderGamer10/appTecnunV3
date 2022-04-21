import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
export type RadialBar = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
export type RadarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
};
export type ColumnChart = {
  series: ApexAxisChartSeries;
  responsive: ApexResponsive;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  public radarL4Chart: Partial<RadarChart> | any;
  public pruebaRadar: Partial<RadarChart> | any;
  constructor() {}
  email: string = 'antonio@gmail.com';

  ngOnInit(): void {
    this.radarL4Chart = {
      series: [
        {
          name: 'Value',
          data: [5, 4, 3, 2, 4, 1, 5, 2],
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
        text: 'Resilience action plan development',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
  }
}
