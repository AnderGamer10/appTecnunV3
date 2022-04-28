import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
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
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  DimensionL = ['L1', 'L2', 'L3', 'L4'];
  public radarL1Chart: Partial<RadarChart> | any;
  public radarL2Chart: Partial<RadarChart> | any;
  public radarL3Chart: Partial<RadarChart> | any;
  public radarL4Chart: Partial<RadarChart> | any;
  public pruebaRadar: Partial<RadarChart> | any;
  constructor() {}
  email: string = 'ander@gmail.com';
  vistaMain: Boolean = true;
  DashboardView: string = 'Main';

  L1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  L1Values = [3, 3, 5, 2, 4, 3, 4, 5];
  L1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  L1ThisYear = '2022';
  L1OtherYear = '2020';

  L2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  L2Values = [2, 1, 4, 5, 2, 3, 2, 4];
  L2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  L2ThisYear = '2022';
  L2OtherYear = '2020';

  L3Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  L3Values = [2, 1, 1, 2, 3, 2, 5, 5];
  L3ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  L3ThisYear = '2022';
  L3OtherYear = '2020';

  L4Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  L4Values = [3, 3, 5, 2, 1, 2, 3, 1];
  L4ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  L4ThisYear = '2022';
  L4OtherYear = '2020';

  P1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  P1Values = [3, 3, 1, 1, 2, 4, 4, 4];
  P1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  P1ThisYear = '2022';
  P1OtherYear = '2020';

  P2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  P2Values = [3, 3, 1, 1, 2, 4, 4, 4];
  P2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  P2ThisYear = '2022';
  P2OtherYear = '2020';

  I1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  I1Values = [3, 3, 5, 1, 4, 3, 4, 5];
  I1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  I1ThisYear = '2022';
  I1OtherYear = '2020';

  I2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  I2Values = [3, 3, 5, 1, 4, 3, 4, 5];
  I2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  I2ThisYear = '2022';
  I2OtherYear = '2020';

  C1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  C1Values = [3, 3, 5, 1, 4, 3, 4, 5];
  C1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  C1ThisYear = '2022';
  C1OtherYear = '2020';

  C2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  C2Values = [3, 3, 5, 1, 4, 3, 4, 5];
  C2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  C2ThisYear = '2022';
  C2OtherYear = '2020';

  cambiarVista(subdimension: string): void {
    this.vistaMain = false;
    this.DashboardView = subdimension;
  }

  async createCharts() {
    this.radarL1Chart = {
      series: [
        {
          name: this.L1ThisYear,
          data: this.L1Values,
        },
        {
          name: this.L1OtherYear,
          data: this.L1ValuesOtherYear,
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
        categories: this.L1Cant,
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
    // new ApexCharts(document.getElementById('#L1'), this.radarL1Chart).render();
    this.radarL2Chart = {
      series: [
        {
          name: this.L2ThisYear,
          data: this.L2Values,
        },
        {
          name: this.L2OtherYear,
          data: this.L2ValuesOtherYear,
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
        categories: this.L2Cant,
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };

    this.radarL3Chart = {
      series: [
        {
          name: this.L3ThisYear,
          data: this.L3Values,
        },
        {
          name: this.L3OtherYear,
          data: this.L3ValuesOtherYear,
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
        categories: this.L3Cant,
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };

    this.radarL4Chart = {
      series: [
        {
          name: this.L4ThisYear,
          data: this.L4Values,
        },
        {
          name: this.L4OtherYear,
          data: this.L4ValuesOtherYear,
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
        categories: this.L4Cant,
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
  }

  ngOnInit(): void {
    this.createCharts();
  }
}
