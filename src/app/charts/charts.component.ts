import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { HttpService } from '../services/http.service';
import * as $ from 'jquery';
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
  public radarC2Chart: Partial<RadarChart> | any;

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

  cambiarAgno() {
    let valor: any = $('#year').val();
    this.agnoSeleccionado = parseInt(valor);
    this.ObtenerData(this.ciudad);
  }
  cambiarCiudad() {
    let valor: any = $('#selCiudad').val();
    sessionStorage.setItem('ciudad', valor);
    this.ciudad = sessionStorage.getItem('ciudad');
    this.ObtenerData(this.ciudad);
  }
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
    'radarC2Chart',
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
    if (cantidad != 0) {
      for (let i = 0; i < cantidad; i++) {
        if (i != 0) {
          let num = this.Respuestas.filter(
            (resp: { idPregunta: string; año: number }) =>
              resp.idPregunta === IdPregunta && resp.año === agno
          )[i].respuesta;
          if (valor > num) {
            valor = num;
          }
        } else {
          valor = this.Respuestas.filter(
            (resp: { idPregunta: string; año: number }) =>
              resp.idPregunta === IdPregunta && resp.año === agno
          )[i].respuesta;
        }
      }
    }
    if (valor === 0) {
      return 0;
    } else {
      return Math.floor(valor);
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

  C2Values = [0, 0];
  C2ValuesOtherYear = [0, 0];

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
        width: 550,
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
        text: [
          'Municipality, cross-sectorial and multigovernance',
          'collaboration',
        ],
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3'],
        labels: {
          style: {
            colors: ['black', 'black', 'black'],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: ['black', 'black', 'black', 'black', 'black', 'black'],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: ['black', 'black', 'black', 'black', 'black', 'black'],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        text: 'Diagnosis and assesment',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        text: ['Landscape and urban planning', '- ENVIRONMENTAL'],
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
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
        width: 550,
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
        text: 'Colletive engagement and awareness',
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
        labels: {
          style: {
            colors: [
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
              'black',
            ],
            fontWeight: 800,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 5,
        forceNiceScale: true,
      },
    };

    this.radarC2Chart = {
      series: [
        {
          name: '',
          data: this.C2Values,
        },
        {
          name: '',
          data: this.C2ValuesOtherYear,
        },
      ],
      chart: {
        height: 350,
        width: 550,
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
        text: 'Involvement in resilience networks of cities',
      },
      xaxis: {
        categories: ['Q1', 'Q2'],
        labels: {
          style: {
            colors: ['black', 'black'],
            fontWeight: 800,
          },
        },
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
      this.radarC2Chart,
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

  preguntaL1: any = [];
  preguntaL2: any = {};
  preguntaL3: any = {};
  preguntaL4: any = {};

  preguntaP1: any = {};
  preguntaP2: any = {};

  preguntaU1: any = {};
  preguntaU2: any = {};

  preguntaI1: any = {};
  preguntaI2: any = {};

  preguntaC1: any = {};
  preguntaC2: any = {};

  obtenerPregunta(subdimension: string) {
    this.questionsService.getPregunta(subdimension).subscribe((resp) => {
      switch (subdimension) {
        case 'L1':
          this.preguntaL1 = resp;
          break;
        case 'L2':
          this.preguntaL2 = resp;
          break;
        case 'L3':
          this.preguntaL3 = resp;
          break;
        case 'L4':
          this.preguntaL4 = resp;
          break;

        case 'P1':
          this.preguntaP1 = resp;
          break;
        case 'P2':
          this.preguntaP2 = resp;
          break;

        case 'U1':
          this.preguntaU1 = resp;
          break;
        case 'U2':
          this.preguntaU2 = resp;
          break;

        case 'I1':
          this.preguntaI1 = resp;
          break;
        case 'I2':
          this.preguntaI2 = resp;
          break;

        case 'C1':
          this.preguntaC1 = resp;
          break;
        case 'C2':
          this.preguntaC2 = resp;
          break;
      }
    });
  }

  llamarAFuncionesPregunta() {
    this.obtenerPregunta('L1');
    this.obtenerPregunta('L2');
    this.obtenerPregunta('L3');
    this.obtenerPregunta('L4');

    this.obtenerPregunta('P1');
    this.obtenerPregunta('P2');

    this.obtenerPregunta('U1');
    this.obtenerPregunta('U2');

    this.obtenerPregunta('I1');
    this.obtenerPregunta('I2');

    this.obtenerPregunta('C1');
    this.obtenerPregunta('C2');
  }

  actualizarNivelesDeMadured() {
    let subdimensiones = [
      'L1',
      'L2',
      'L3',
      'L4',
      'P1',
      'P2',
      'U1',
      'U2',
      'I1',
      'I2',
      'C1',
      'C2',
    ];
    for (let i = 0; i < subdimensiones.length; i++) {
      this.questionsService
        .getMaturityLevels(subdimensiones[i], sessionStorage.getItem('ciudad'))
        .subscribe((resp) => {});
    }
  }

  ngOnInit(): void {
    this.createCharts();
    this.llamarAFuncionesPregunta();
    setTimeout(() => {
      this.ObtenerData(this.ciudad);
    }, 3000);
    this.actualizarNivelesDeMadured();
    setInterval(() => this.ObtenerData(this.ciudad), 600000);
  }
}
