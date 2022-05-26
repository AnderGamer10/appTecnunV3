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
export type BarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
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

  public MaturityLevels: Partial<BarChart> | any;

  data: any = {};
  constructor(private questionsService: HttpService) {}
  ObteniendoData(subdimension: any, ciudad: any) {
    this.questionsService
      .getMaturityLevels(subdimension, ciudad)
      .subscribe((resp) => {
        this.data = resp;
        this.createChart();
        this.actualizarDatos();
      });
  }

  actualizarDatos() {
    let data1 = [];
    let categories1 = [];
    for (let i = 0; i < this.data.length; i++) {
      data1.push(this.data[i].valor);
      categories1.push(this.data[i].nombreLevel);
    }
    this.MaturityLevels.xaxis = {
      categories: categories1,
      min: 0,
      max: 1,
    };
    this.MaturityLevels.series = [
      {
        name: 'Maturity Levels',
        data: data1,
      },
    ];
  }
  createChart() {
    this.MaturityLevels = {
      series: [
        {
          name: 'Maturity Levels',
          data: [0, 0],
        },
      ],
      chart: {
        type: 'bar',
        height: 550,
        width: 650,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      title: {
        text: 'Maturity Levels',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['S', 'M'],
        min: 0,
        max: 1,
      },
    };
  }

  ngOnInit(): void {
    this.ObteniendoData(this.subdimension, sessionStorage.getItem('ciudad'));
  }
}
