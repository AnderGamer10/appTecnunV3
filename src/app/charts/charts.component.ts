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

  preguntas: any;
  titulo: string | undefined;
  datosChart: any;

  subdimensionesNombre = [
    'radarL1Chart',
    'radarL2Chart',
    'radarL3Chart',
    'radarL4Chart',
    'radarP1Chart',
    'radarP2Chart',
    'radarI1Chart',
    'radarI2Chart',
    'radarU1Chart',
    'radarU2Chart',
    'radarC1Chart',
  ];

  cambiarVista(
    subdimension: string,
    titulo: string,
    datosChart: object,
    preguntas: object
  ): void {
    this.preguntas = preguntas;
    this.datosChart = datosChart;
    this.titulo = titulo;
    this.vistaMain = false;
    this.DashboardView = subdimension;
  }

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

  createCharts() {
    this.radarL1Chart = {
      series: [
        {
          name: '',
          data: this.L1Values,
        },
        {
          name: '',
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
          name: '',
          data: this.L2Values,
        },
        {
          name: '',
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
          name: '',
          data: this.L3Values,
        },
        {
          name: '',
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
          name: '',
          data: this.L4Values,
        },
        {
          name: '',
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
          name: '',
          data: this.P1Values,
        },
        {
          name: '',
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
          name: '',
          data: this.P2Values,
        },
        {
          name: '',
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
          name: '',
          data: this.C1Values,
        },
        {
          name: '',
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
          name: '',
          data: this.I1Values,
        },
        {
          name: '',
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
          name: '',
          data: this.I2Values,
        },
        {
          name: '',
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
          name: '',
          data: this.U1Values,
        },
        {
          name: '',
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
          name: '',
          data: this.U2Values,
        },
        {
          name: '',
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

  DataInfo() {
    let subdimensiones = [
      this.radarL1Chart,
      this.radarL2Chart,
      this.radarL3Chart,
      this.radarL4Chart,
      this.radarP1Chart,
      this.radarP2Chart,
      this.radarI1Chart,
      this.radarI2Chart,
      this.radarU1Chart,
      this.radarU2Chart,
      this.radarC1Chart,
    ];
    for (let i = 0; i < subdimensiones.length; i++) {
      let longitud = subdimensiones[i].series[0].data.length;
      let data1 = [];
      let data2 = [];
      for (let j = 0; j < longitud; j++) {
        data1.push(
          this.obtenerDataSubdimension(
            `${this.subdimensionesNombre[i].substring(5, 7).toLowerCase()}q${
              j + 1
            }`,
            2022
          )
        );
        data2.push(
          this.obtenerDataSubdimension(
            `${this.subdimensionesNombre[i].substring(5, 7).toLowerCase()}q${
              j + 1
            }`,
            this.agnoSeleccionado
          )
        );
      }

      subdimensiones[i].series = [
        {
          name: this.UltimoAgno.getFullYear(),
          data: data1,
        },
        {
          name: this.agnoSeleccionado,
          data: data2,
        },
      ];
      data1 = [];
      data2 = [];
    }
  }

  ngOnInit(): void {
    this.createCharts();
    setTimeout(() => {
      this.ObtenerData(this.ciudad);
    }, 3000);

    setInterval(() => this.ObtenerData(this.ciudad), 600000);
  }
}
