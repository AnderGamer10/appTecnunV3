import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { HttpService } from '../services/http.service';
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
  public radarL1Chart: Partial<RadarChart> | any;
  public radarL2Chart: Partial<RadarChart> | any;
  public radarL3Chart: Partial<RadarChart> | any;
  public radarL4Chart: Partial<RadarChart> | any;
  public radarP1Chart: Partial<RadarChart> | any;
  public radarP2Chart: Partial<RadarChart> | any;
  public radarI1Chart: Partial<RadarChart> | any;
  public radarI2Chart: Partial<RadarChart> | any;
  public radarU1Chart: Partial<RadarChart> | any;
  public radarU2Chart: Partial<RadarChart> | any;
  public radarC1Chart: Partial<RadarChart> | any;

  constructor(private questionsService: HttpService) {}
  ciudad: any = sessionStorage.getItem('ciudad');
  vistaMain: Boolean = true;
  DashboardView: string = 'Main';
  RespuestasAFiltrar: any = {};
  Respuestas: any = {};
  agnoSeleccionado: number = 2020;
  UltimoAgno: Date = new Date();
  prueba: any = {};

  async ObtenerData(ciudad: string) {
    await this.questionsService.getRespuestas().subscribe((resp) => {
      this.RespuestasAFiltrar = resp;
      this.Respuestas = this.RespuestasAFiltrar.filter(
        (respuesta: { ciudad: string }) => respuesta.ciudad === ciudad
      );
      this.DataInfo();
    });
  }

  obtenerDataSubdimension(IdPregunta: string, agno: number) {
    try {
      let cantidad = this.Respuestas.filter(
        (resp: { idPregunta: string; año: number }) =>
          resp.idPregunta === IdPregunta && resp.año === agno
      ).length;
      let valor = 0;
      for (let i = 0; i < cantidad; i++) {
        valor += this.Respuestas.filter(
          (resp: { idPregunta: string; año: number }) =>
            resp.idPregunta === IdPregunta && resp.año === agno
        )[i].respuesta;
      }
      if (valor === 0) {
        return 0;
      } else {
        return Math.floor(valor / cantidad);
      }
    } catch (error) {
      return 0;
    }
  }

  L1Values = [0, 0, 0];
  L1ValuesOtherYear = [0, 0, 0];

  L2Values = [0, 0, 0, 0, 0, 0];
  L2ValuesOtherYear = [0, 0, 0, 0, 0, 0];

  L3Values = [0, 0, 0, 0, 0, 0];
  L3ValuesOtherYear = [0, 0, 0, 0, 0, 0];

  L4Values = [0, 0, 0, 0, 0, 0, 0, 0];
  L4ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0];

  P1Values = [0, 0, 0, 0, 0, 0, 0, 0];
  P1ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0];

  P2Values = [0, 0, 0, 0, 0, 0, 0];
  P2ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0];

  I1Values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  I1ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  I2Values = [0, 0, 0, 0, 0, 0, 0, 0];
  I2ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0];

  C1Values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  C1ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  U1Values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  U1ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  U2Values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  U2ValuesOtherYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  DataInfo() {
    this.radarL1Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('l1q1', 2022),
          this.obtenerDataSubdimension('l1q2', 2022),
          this.obtenerDataSubdimension('l1q3', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('l1q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l1q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l1q3', this.agnoSeleccionado),
        ],
      },
    ];

    this.radarL2Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('l2q1', 2022),
          this.obtenerDataSubdimension('l2q2', 2022),
          this.obtenerDataSubdimension('l2q3', 2022),
          this.obtenerDataSubdimension('l2q4', 2022),
          this.obtenerDataSubdimension('l2q5', 2022),
          this.obtenerDataSubdimension('l2q6', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('l2q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l2q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l2q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l2q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l2q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l2q6', this.agnoSeleccionado),
        ],
      },
    ];

    this.radarL3Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('l3q1', 2022),
          this.obtenerDataSubdimension('l3q2', 2022),
          this.obtenerDataSubdimension('l3q3', 2022),
          this.obtenerDataSubdimension('l3q4', 2022),
          this.obtenerDataSubdimension('l3q5', 2022),
          this.obtenerDataSubdimension('l3q6', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('l3q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l3q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l3q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l3q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l3q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l3q6', this.agnoSeleccionado),
        ],
      },
    ];

    this.radarL4Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('l4q1', 2022),
          this.obtenerDataSubdimension('l4q2', 2022),
          this.obtenerDataSubdimension('l4q3', 2022),
          this.obtenerDataSubdimension('l4q4', 2022),
          this.obtenerDataSubdimension('l4q5', 2022),
          this.obtenerDataSubdimension('l4q6', 2022),
          this.obtenerDataSubdimension('l4q7', 2022),
          this.obtenerDataSubdimension('l4q8', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('l4q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('l4q8', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarP1Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('p1q1', 2022),
          this.obtenerDataSubdimension('p1q2', 2022),
          this.obtenerDataSubdimension('p1q3', 2022),
          this.obtenerDataSubdimension('p1q4', 2022),
          this.obtenerDataSubdimension('p1q5', 2022),
          this.obtenerDataSubdimension('p1q6', 2022),
          this.obtenerDataSubdimension('p1q7', 2022),
          this.obtenerDataSubdimension('p1q8', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('p1q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p1q8', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarP2Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('p2q1', 2022),
          this.obtenerDataSubdimension('p2q2', 2022),
          this.obtenerDataSubdimension('p2q3', 2022),
          this.obtenerDataSubdimension('p2q4', 2022),
          this.obtenerDataSubdimension('p2q5', 2022),
          this.obtenerDataSubdimension('p2q6', 2022),
          this.obtenerDataSubdimension('p2q7', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('p2q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p2q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p2q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p2q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p2q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p2q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('p2q7', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarI1Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('i1q1', 2022),
          this.obtenerDataSubdimension('i1q2', 2022),
          this.obtenerDataSubdimension('i1q3', 2022),
          this.obtenerDataSubdimension('i1q4', 2022),
          this.obtenerDataSubdimension('i1q5', 2022),
          this.obtenerDataSubdimension('i1q6', 2022),
          this.obtenerDataSubdimension('i1q7', 2022),
          this.obtenerDataSubdimension('i1q8', 2022),
          this.obtenerDataSubdimension('i1q9', 2022),
          this.obtenerDataSubdimension('i1q10', 2022),
          this.obtenerDataSubdimension('i1q11', 2022),
          this.obtenerDataSubdimension('i1q12', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('i1q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q8', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q9', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q10', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q11', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i1q12', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarI2Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('i2q1', 2022),
          this.obtenerDataSubdimension('i2q2', 2022),
          this.obtenerDataSubdimension('i2q3', 2022),
          this.obtenerDataSubdimension('i2q4', 2022),
          this.obtenerDataSubdimension('i2q5', 2022),
          this.obtenerDataSubdimension('i2q6', 2022),
          this.obtenerDataSubdimension('i2q7', 2022),
          this.obtenerDataSubdimension('i2q8', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('i2q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('i2q8', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarC1Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('c1q1', 2022),
          this.obtenerDataSubdimension('c1q2', 2022),
          this.obtenerDataSubdimension('c1q3', 2022),
          this.obtenerDataSubdimension('c1q4', 2022),
          this.obtenerDataSubdimension('c1q5', 2022),
          this.obtenerDataSubdimension('c1q6', 2022),
          this.obtenerDataSubdimension('c1q7', 2022),
          this.obtenerDataSubdimension('c1q8', 2022),
          this.obtenerDataSubdimension('c1q9', 2022),
          this.obtenerDataSubdimension('c1q10', 2022),
          this.obtenerDataSubdimension('c1q11', 2022),
          this.obtenerDataSubdimension('c1q12', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('c1q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q8', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q9', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q10', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q11', this.agnoSeleccionado),
          this.obtenerDataSubdimension('c1q12', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarU1Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('u1q1', 2022),
          this.obtenerDataSubdimension('u1q2', 2022),
          this.obtenerDataSubdimension('u1q3', 2022),
          this.obtenerDataSubdimension('u1q4', 2022),
          this.obtenerDataSubdimension('u1q5', 2022),
          this.obtenerDataSubdimension('u1q6', 2022),
          this.obtenerDataSubdimension('u1q7', 2022),
          this.obtenerDataSubdimension('u1q8', 2022),
          this.obtenerDataSubdimension('u1q9', 2022),
          this.obtenerDataSubdimension('u1q10', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('u1q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q8', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q9', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u1q10', this.agnoSeleccionado),
        ],
      },
    ];
    this.radarU2Chart.series = [
      {
        data: [
          this.obtenerDataSubdimension('u2q1', 2022),
          this.obtenerDataSubdimension('u2q2', 2022),
          this.obtenerDataSubdimension('u2q3', 2022),
          this.obtenerDataSubdimension('u2q4', 2022),
          this.obtenerDataSubdimension('u2q5', 2022),
          this.obtenerDataSubdimension('u2q6', 2022),
          this.obtenerDataSubdimension('u2q7', 2022),
          this.obtenerDataSubdimension('u2q8', 2022),
          this.obtenerDataSubdimension('u2q9', 2022),
          this.obtenerDataSubdimension('u2q10', 2022),
          this.obtenerDataSubdimension('u2q11', 2022),
        ],
      },
      {
        data: [
          this.obtenerDataSubdimension('u2q1', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q2', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q3', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q4', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q5', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q6', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q7', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q8', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q9', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q10', this.agnoSeleccionado),
          this.obtenerDataSubdimension('u2q11', this.agnoSeleccionado),
        ],
      },
    ];
  }

  cambiarVista(subdimension: string): void {
    this.vistaMain = false;
    this.DashboardView = subdimension;
  }

  createCharts() {
    this.radarL1Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.L1Values,
        },
        {
          name: this.agnoSeleccionado,
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
    this.radarL2Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.L2Values,
        },
        {
          name: this.agnoSeleccionado,
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
        text: 'Legislation Development and Refinement',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
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
          name: this.UltimoAgno.getFullYear(),
          data: this.L3Values,
        },
        {
          name: this.agnoSeleccionado,
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
        text: 'Learning culture (learning and dissemination)',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
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
          name: this.UltimoAgno.getFullYear(),
          data: this.L4Values,
        },
        {
          name: this.agnoSeleccionado,
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
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };

    this.radarP1Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.P1Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.P1ValuesOtherYear,
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
        text: 'DIAGNOSIS AND ASSESSMENT',
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
    this.radarP2Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.P2Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.P2ValuesOtherYear,
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
        text: 'Education and Training/Capacity building',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
    this.radarC1Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.C1Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.C1ValuesOtherYear,
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
        text: 'COLLECTIVE ENGAGEMENT AND AWARENESS',
      },
      xaxis: {
        categories: [
          'Q1',
          'Q2',
          'Q3',
          'Q4',
          'Q5',
          'Q6',
          'Q7',
          'Q8',
          'Q9',
          'Q10',
          'Q11',
          'Q12',
        ],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
    this.radarI1Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.I1Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.I1ValuesOtherYear,
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
        text: 'Infrastructures and essential services',
      },
      xaxis: {
        categories: [
          'Q1',
          'Q2',
          'Q3',
          'Q4',
          'Q5',
          'Q6',
          'Q7',
          'Q8',
          'Q9',
          'Q10',
          'Q11',
          'Q12',
        ],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
    this.radarI2Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.I2Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.I2ValuesOtherYear,
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
        text: 'Resources to Build up Resilience',
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
    this.radarU1Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.U1Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.U1ValuesOtherYear,
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
        text: 'Urban development',
      },
      xaxis: {
        categories: [
          'Q1',
          'Q2',
          'Q3',
          'Q4',
          'Q5',
          'Q6',
          'Q7',
          'Q8',
          'Q9',
          'Q10',
        ],
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };
    this.radarU2Chart = {
      series: [
        {
          name: this.UltimoAgno.getFullYear(),
          data: this.U2Values,
        },
        {
          name: this.agnoSeleccionado,
          data: this.U2ValuesOtherYear,
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
        text: 'LANDSCAPE AND URBAN PLANNING - ENVIRONMENTAL',
      },
      xaxis: {
        categories: [
          'Q1',
          'Q2',
          'Q3',
          'Q4',
          'Q5',
          'Q6',
          'Q7',
          'Q8',
          'Q9',
          'Q10',
          'Q11',
        ],
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
    this.ObtenerData(this.ciudad);
  }
}
