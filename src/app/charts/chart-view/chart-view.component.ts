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
  @Input() Respuestas: any;
  @Input() preguntas: any;
  @Input() titulo: any;
  @Input() datosChart: any;

  public radarChart: Partial<RadarChart> | any;

  constructor(private questionsService: HttpService) {}

  createChart() {
    this.radarChart = {
      series: [
        {
          name: '',
          data: [],
        },
        {
          name: '',
          data: [],
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
        text: this.titulo,
      },
      xaxis: {
        categories: this.preguntas,
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
  }
  dataInfo() {
    this.radarChart.series = this.datosChart;
  }

  ngOnInit(): void {
    this.createChart();
    this.dataInfo();
  }
}
