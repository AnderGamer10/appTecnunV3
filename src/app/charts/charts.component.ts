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

  constructor(private questionsService: HttpService) {}
  ciudad: any = sessionStorage.getItem('ciudad');
  vistaMain: Boolean = true;
  DashboardView: string = 'Main';
  Respuestas: any = {};
  agnoSeleccionado: number = 2021;
  UltimoAgno: Date = new Date();
  prueba: any = {};
  async ObtenerData(ciudad: string) {
    await this.questionsService.getRespuestas().subscribe((resp) => {
      this.Respuestas = resp;

      console.log(this.Respuestas);
      this.Respuestas = this.Respuestas.filter(
        (resp: { ciudad: string }) => resp.ciudad === ciudad
      );
      this.prueba = this.Respuestas.filter(
        (resp: { idPregunta: string; año: number }) =>
          resp.idPregunta === 'l1q1' && resp.año === 2022
      )[0].respuesta;
      console.log(this.Respuestas);
      // Prueba datos
      console.log(
        this.Respuestas.filter(
          (resp: { idPregunta: string; año: number }) =>
            resp.idPregunta === 'l1q1' && resp.año === 2022
        )[0].respuesta
      );
    });
  }
  // Error ---------------------------------- Carga antes que los datos
  async obtenerDataSubdimension(IdPregunta: string, agno: number) {
    console.log(this.Respuestas);
    console.log(
      this.Respuestas.filter(
        (resp: { idPregunta: string; año: number }) =>
          resp.idPregunta === IdPregunta && resp.año === agno
      )[0].respuesta
    );
    return this.Respuestas.filter(
      (resp: { idPregunta: string; año: number }) =>
        resp.idPregunta === IdPregunta && resp.año === agno
    )[0].respuesta;
  }
  L1Cant = ['Q1', 'Q2', 'Q3'];
  L1Values = [
    this.obtenerDataSubdimension('l1q1', 2022),
    this.obtenerDataSubdimension('l1q2', 2022),
    this.obtenerDataSubdimension('l1q3', 2022),
  ];
  L1ValuesOtherYear = [
    this.obtenerDataSubdimension('l1q1', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l1q2', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l1q3', this.agnoSeleccionado),
  ];

  L2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
  L2Values = [
    this.obtenerDataSubdimension('l2q1', 2022),
    this.obtenerDataSubdimension('l2q2', 2022),
    this.obtenerDataSubdimension('l2q3', 2022),
    this.obtenerDataSubdimension('l2q1', 2022),
    this.obtenerDataSubdimension('l2q2', 2022),
    this.obtenerDataSubdimension('l2q3', 2022),
  ];
  L2ValuesOtherYear = [
    this.obtenerDataSubdimension('l2q1', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l2q2', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l2q3', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l2q1', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l2q2', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l2q3', this.agnoSeleccionado),
  ];

  L3Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  L3Values = [
    this.obtenerDataSubdimension('l3q1', 2022),
    this.obtenerDataSubdimension('l3q2', 2022),
    this.obtenerDataSubdimension('l3q3', 2022),
    this.obtenerDataSubdimension('l3q1', 2022),
    this.obtenerDataSubdimension('l3q2', 2022),
    this.obtenerDataSubdimension('l3q3', 2022),
  ];
  L3ValuesOtherYear = [
    this.obtenerDataSubdimension('l3q1', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l3q2', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l3q3', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l3q1', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l3q2', this.agnoSeleccionado),
    this.obtenerDataSubdimension('l3q3', this.agnoSeleccionado),
  ];

  L4Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  L4Values = [3, 3, 5, 2, 1, 2, 3, 1];
  L4ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];

  P1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  P1Values = [3, 3, 1, 1, 2, 4, 4, 4];
  P1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];

  P2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  P2Values = [3, 3, 1, 1, 2, 4, 4, 4];
  P2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];

  I1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  I1Values = [3, 3, 5, 1, 4, 3, 4, 5];
  I1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];
  I2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  I2Values = [3, 3, 5, 1, 4, 3, 4, 5];
  I2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];

  C1Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  C1Values = [3, 3, 5, 1, 4, 3, 4, 5];
  C1ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];

  C2Cant = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  C2Values = [3, 3, 5, 1, 4, 3, 4, 5];
  C2ValuesOtherYear = [2, 1, 4, 1, 2, 1, 3, 4];

  cambiarVista(subdimension: string): void {
    this.vistaMain = false;
    this.DashboardView = subdimension;
  }

  async createCharts() {
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
    this.ObtenerData(this.ciudad);
    this.createCharts();
  }
}
