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
      // console.log(IdPregunta + ' ' + valor);
      switch (IdPregunta) {
        // L1 Heuristica ------------------------------------------------------
        case 'l1q1':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('L1S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('L1S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1M1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('L1S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1A1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'l1q2':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('L1S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S2', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('L1S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1M2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1M2', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('L1S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1M2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1M2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1A2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1A2', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('L1S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1S2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1M2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1M2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1A2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1A2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1R1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L1T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L1T1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'l1q3':
          this.questionsService
            .getMaturityByLevel('L1M3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L1M3', respuesta)
                .subscribe();
            });
          break;
        // L2 Heuristica ------------------------------------------------------
        case 'l2q1':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2A1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2A1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2R1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2A1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2R1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2T1', respuesta)
                  .subscribe();
              });
          }
          break;

        case 'l2q2':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2A1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2A1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L2T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L2T1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'l2q3':
          this.questionsService
            .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L2M1', respuesta)
                .subscribe();
            });
          break;
        case 'l2q4':
          this.questionsService
            .getMaturityByLevel('L2A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L2A1', respuesta)
                .subscribe();
            });
          break;
        case 'l2q5':
          this.questionsService
            .getMaturityByLevel('L2R1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L2R1', respuesta)
                .subscribe();
            });
          break;
        case 'l2q6':
          this.questionsService
            .getMaturityByLevel('L2M1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L2M1', respuesta)
                .subscribe();
            });
          break;

        // L3 Heuristica ------------------------------------------------------
        case 'l3q1':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('L3S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L3S1', respuesta)
                  .subscribe();
              });
          } else {
            this.questionsService
              .getMaturityByLevel('L3S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L3S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L3M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L3M1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'l3q3':
          this.questionsService
            .getMaturityByLevel('L3M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L3M2', respuesta)
                .subscribe();
            });
          break;
        case 'l3q4':
          this.questionsService
            .getMaturityByLevel('L3A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L3A1', respuesta)
                .subscribe();
            });
          break;
        case 'l3q5':
          this.questionsService
            .getMaturityByLevel('L3T1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L3T1', respuesta)
                .subscribe();
            });
          break;
        case 'l3q6':
          this.questionsService
            .getMaturityByLevel('L3T2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L3T2', respuesta)
                .subscribe();
            });
          break;

        // L4 Heuristica ------------------------------------------------------
        case 'l4q1':
          this.questionsService
            .getMaturityByLevel('L4S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4S2', respuesta)
                .subscribe();
            });
          break;
        case 'l4q2':
          this.questionsService
            .getMaturityByLevel('L4M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4M2', respuesta)
                .subscribe();
            });
          if ((valor = 1)) {
            this.questionsService
              .getMaturityByLevel('L4S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L4S1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('L4S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 1,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L4S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L4A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L4A1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('L4S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 1,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L4S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L4A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L4A1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('L4R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('L4R1', respuesta)
                  .subscribe();
              });
          }
          break;

        case 'l4q3':
          this.questionsService
            .getMaturityByLevel('L4M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4M2', respuesta)
                .subscribe();
            });
          break;
        case 'l4q4':
          this.questionsService
            .getMaturityByLevel('L4M1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4M1', respuesta)
                .subscribe();
            });
          break;
        case 'l4q6':
          this.questionsService
            .getMaturityByLevel('L4M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4M2', respuesta)
                .subscribe();
            });
          break;
        case 'l4q7':
          this.questionsService
            .getMaturityByLevel('L4A2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4A2', respuesta)
                .subscribe();
            });
          break;
        case 'l4q7':
          this.questionsService
            .getMaturityByLevel('L4T1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('L4T1', respuesta)
                .subscribe();
            });
          break;
        // P1 Heuristica ------------------------------------------------------
        case 'p1q1':
          this.questionsService
            .getMaturityByLevel('P1S1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1S1', respuesta)
                .subscribe();
            });
          break;
        case 'p1q2':
          this.questionsService
            .getMaturityByLevel('P1S1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1S1', respuesta)
                .subscribe();
            });
          this.questionsService
            .getMaturityByLevel('P1S3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1S3', respuesta)
                .subscribe();
            });
          break;
        case 'p1q3':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('P1A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P1A1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('P1A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P1A1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P1M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P1M1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('P1A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P1A1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P1M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P1M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P1R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P1R1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'p1q4':
          this.questionsService
            .getMaturityByLevel('P1A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1A1', respuesta)
                .subscribe();
            });
          break;
        case 'p1q5':
          this.questionsService
            .getMaturityByLevel('P1M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1M2', respuesta)
                .subscribe();
            });
          this.questionsService
            .getMaturityByLevel('P1A2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1A2', respuesta)
                .subscribe();
            });
          break;
        case 'p1q7':
          this.questionsService
            .getMaturityByLevel('P1T1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1T1', respuesta)
                .subscribe();
            });
          break;
        case 'p1q8':
          this.questionsService
            .getMaturityByLevel('P1S4', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P1S4', respuesta)
                .subscribe();
            });
          break;

        // P2 Heuristica ------------------------------------------------------
        case 'p2q1':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('P2S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('P2S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2M1', respuesta)
                  .subscribe();
              });
          } else if (valor > 3) {
            this.questionsService
              .getMaturityByLevel('P2S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2A1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'p2q2':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('P2R2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2R2', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('P2R2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2R2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2T1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('P2R2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2R2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2T1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2T2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2T2', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'p2q3':
          this.questionsService
            .getMaturityByLevel('P2A4', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('P2A4', respuesta)
                .subscribe();
            });
          break;
        case 'p2q4':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('P2A4', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2A4', respuesta)
                  .subscribe();
              });
          } else if (valor > 2) {
            this.questionsService
              .getMaturityByLevel('P2S1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2M1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'p2q5':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('P2A2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2A2', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'p2q6':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('P2S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S2', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('P2S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2R1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('P2S2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2R1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2T3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2T3', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'p2q7':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('P2S3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S3', respuesta)
                  .subscribe();
              });
          } else if (valor > 2) {
            this.questionsService
              .getMaturityByLevel('P2S3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2S3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('P2A3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('P2A3', respuesta)
                  .subscribe();
              });
          }
          break;
        // I1 Heuristica ------------------------------------------------------
        case 'i1q1':
          this.questionsService
            .getMaturityByLevel('I1S1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1S1', respuesta)
                .subscribe();
            });
          break;
        case 'i1q2':
          this.questionsService
            .getMaturityByLevel('I1S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1S2', respuesta)
                .subscribe();
            });
          break;
        case 'i1q3':
          this.questionsService
            .getMaturityByLevel('I1S3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1S3', respuesta)
                .subscribe();
            });
          break;
        case 'i1q4':
          this.questionsService
            .getMaturityByLevel('I1S4', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1S4', respuesta)
                .subscribe();
            });
          break;
        case 'i1q5':
          if (valor < 5) {
            this.questionsService
              .getMaturityByLevel('I1M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I1M1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('I1M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I1M1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('I1R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I1R1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'i1q6':
          this.questionsService
            .getMaturityByLevel('I1M4', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1M4', respuesta)
                .subscribe();
            });
          break;
        case 'i1q7':
          this.questionsService
            .getMaturityByLevel('I1A2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1A2', respuesta)
                .subscribe();
            });
          this.questionsService
            .getMaturityByLevel('I1M6', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1M6', respuesta)
                .subscribe();
            });
          break;
        case 'i1q8':
          this.questionsService
            .getMaturityByLevel('I1M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1M2', respuesta)
                .subscribe();
            });
          break;
        case 'i1q9':
          this.questionsService
            .getMaturityByLevel('I1M3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1M3', respuesta)
                .subscribe();
            });
          this.questionsService
            .getMaturityByLevel('I1A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1A1', respuesta)
                .subscribe();
            });
          break;
        case 'i1q10':
          this.questionsService
            .getMaturityByLevel('I1M5', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1M5', respuesta)
                .subscribe();
            });
          break;
        case 'i1q11':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('I1T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I1T1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('I1T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I1T1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('I1T2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I1T2', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'i1q12':
          this.questionsService
            .getMaturityByLevel('I1A3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I1A3', respuesta)
                .subscribe();
            });
          break;
        // I2 Heuristica ------------------------------------------------------
        case 'i2q1':
          this.questionsService
            .getMaturityByLevel('I2S1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I2S1', respuesta)
                .subscribe();
            });
          break;
        case 'i2q2':
          if (valor > 1) {
            this.questionsService
              .getMaturityByLevel('I2M1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2M1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'i2q3':
          this.questionsService
            .getMaturityByLevel('I2A4', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I2A4', respuesta)
                .subscribe();
            });
          break;
        case 'i2q4':
          if ((valor = 2)) {
            this.questionsService
              .getMaturityByLevel('I2R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2R1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('I2R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2R1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('I2A1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2A1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'i2q5':
          this.questionsService
            .getMaturityByLevel('I2T1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I2T1', respuesta)
                .subscribe();
            });
          break;
        case 'i2q6':
          this.questionsService
            .getMaturityByLevel('I2S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('I2S2', respuesta)
                .subscribe();
            });
          break;
        case 'i2q7':
          if ((valor = 2)) {
            this.questionsService
              .getMaturityByLevel('I2A3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2A3', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('I2A3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2A3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('I2M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('I2M3', respuesta)
                  .subscribe();
              });
          }
          break;
        // U1 Heuristica ------------------------------------------------------
        case 'u1q1':
          this.questionsService
            .getMaturityByLevel('U1S1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1S1', respuesta)
                .subscribe();
            });
          break;

        case 'u1q2':
          this.questionsService
            .getMaturityByLevel('U1S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1S2', respuesta)
                .subscribe();
            });
          break;
        case 'u1q3':
          this.questionsService
            .getMaturityByLevel('U1S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1S2', respuesta)
                .subscribe();
            });
          break;
        case 'u1q4':
          this.questionsService
            .getMaturityByLevel('U1S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1S2', respuesta)
                .subscribe();
            });
          break;
        case 'u1q5':
          this.questionsService
            .getMaturityByLevel('U1M3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1M3', respuesta)
                .subscribe();
            });
          break;
        case 'u1q6':
          this.questionsService
            .getMaturityByLevel('U1M3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1M3', respuesta)
                .subscribe();
            });
          break;
        case 'u1q7':
          this.questionsService
            .getMaturityByLevel('U1M2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1M2', respuesta)
                .subscribe();
            });
          break;
        case 'u1q8':
          this.questionsService
            .getMaturityByLevel('U1A2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1A2', respuesta)
                .subscribe();
            });
          break;
        case 'u1q9':
          this.questionsService
            .getMaturityByLevel('U1A3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1A3', respuesta)
                .subscribe();
            });
          break;
        case 'u1q10':
          this.questionsService
            .getMaturityByLevel('U1R3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U1R3', respuesta)
                .subscribe();
            });
          break;
        // U2 Heuristica ------------------------------------------------------
        case 'u2q1':
          this.questionsService
            .getMaturityByLevel('U2S1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2S1', respuesta)
                .subscribe();
            });
          break;
        case 'u2q2':
          this.questionsService
            .getMaturityByLevel('U2S2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2S2', respuesta)
                .subscribe();
            });
          break;
        case 'u2q3':
          this.questionsService
            .getMaturityByLevel('U2M1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2M1', respuesta)
                .subscribe();
            });
          break;
        case 'u2q4':
          this.questionsService
            .getMaturityByLevel('U2A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2A1', respuesta)
                .subscribe();
            });
          break;
        case 'u2q5':
          this.questionsService
            .getMaturityByLevel('U2A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2A1', respuesta)
                .subscribe();
            });
          break;
        case 'u2q6':
          this.questionsService
            .getMaturityByLevel('U2S3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2S3', respuesta)
                .subscribe();
            });
          break;
        case 'u2q7':
          this.questionsService
            .getMaturityByLevel('U2M3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2M3', respuesta)
                .subscribe();
            });
          break;
        case 'u2q8':
          this.questionsService
            .getMaturityByLevel('U2A2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2A2', respuesta)
                .subscribe();
            });
          break;
        case 'u2q9':
          this.questionsService
            .getMaturityByLevel('U2A2', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2A2', respuesta)
                .subscribe();
            });
          break;
        case 'u2q10':
          this.questionsService
            .getMaturityByLevel('U2R1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2R1', respuesta)
                .subscribe();
            });
          break;
        case 'u2q11':
          this.questionsService
            .getMaturityByLevel('U2R3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('U2R3', respuesta)
                .subscribe();
            });
          break;
        // C1 Heuristica ------------------------------------------------------
        case 'c1q1':
          this.questionsService
            .getMaturityByLevel('C1S3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1S3', respuesta)
                .subscribe();
            });
          break;
        case 'c1q2':
          this.questionsService
            .getMaturityByLevel('C1M1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1M1', respuesta)
                .subscribe();
            });
          break;
        case 'c1q3':
          this.questionsService
            .getMaturityByLevel('C1M1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1M1', respuesta)
                .subscribe();
            });
          break;
        case 'c1q4':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('C1S3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1S3', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('C1S3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1S3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M3', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'c1q5':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('C1M2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M2', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('C1M2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1A4', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1A4', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('C1M2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M2', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1A4', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1A4', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1R3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1R3', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'c1q6':
          this.questionsService
            .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor + data[0].valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1M3', respuesta)
                .subscribe();
            });
          break;
        case 'c1q7':
          if (valor < 3) {
            this.questionsService
              .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M3', respuesta)
                  .subscribe();
              });
          } else if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1M5', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M5', respuesta)
                  .subscribe();
              });
          } else if (valor > 3) {
            this.questionsService
              .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 2 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1M5', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M5', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1A2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1A2', respuesta)
                  .subscribe();
              });
          }
          break;

        case 'c1q8':
          if (valor < 4) {
            this.questionsService
              .getMaturityByLevel('C1M4', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M4', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('C1M4', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M4', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1A3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1A3', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('C1M4', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M4', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1M3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1A3', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1A3', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1R2', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1R2', respuesta)
                  .subscribe();
              });
          }
          break;

        case 'c1q9':
          if ((valor = 3)) {
            this.questionsService
              .getMaturityByLevel('C1M5', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M5', respuesta)
                  .subscribe();
              });
          } else if ((valor = 4)) {
            this.questionsService
              .getMaturityByLevel('C1M5', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M5', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1R1', respuesta)
                  .subscribe();
              });
          } else if ((valor = 5)) {
            this.questionsService
              .getMaturityByLevel('C1M5', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 3 + data[0].valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1M5', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1R1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: 4,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1R1', respuesta)
                  .subscribe();
              });
            this.questionsService
              .getMaturityByLevel('C1T1', sessionStorage.getItem('ciudad'))
              .subscribe((resp) => {
                var data: any = resp;

                var respuesta: any = {
                  id: data[0].id,
                  nombreLevel: data[0].nombreLevel,
                  subdimension: data[0].subdimension,
                  maxPregunta: data[0].maxPregunta,
                  valor: valor,
                  ciudad: data[0].ciudad,
                };
                this.questionsService
                  .putMaturityByLevel('C1T1', respuesta)
                  .subscribe();
              });
          }
          break;
        case 'c1q10':
          this.questionsService
            .getMaturityByLevel('C1A1', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1A1', respuesta)
                .subscribe();
            });
          break;
        case 'c1q11':
          this.questionsService
            .getMaturityByLevel('C1A5', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1A5', respuesta)
                .subscribe();
            });
          break;
        case 'c1q12':
          this.questionsService
            .getMaturityByLevel('C1A6', sessionStorage.getItem('ciudad'))
            .subscribe((resp) => {
              var data: any = resp;

              var respuesta: any = {
                id: data[0].id,
                nombreLevel: data[0].nombreLevel,
                subdimension: data[0].subdimension,
                maxPregunta: data[0].maxPregunta,
                valor: valor,
                ciudad: data[0].ciudad,
              };
              this.questionsService
                .putMaturityByLevel('C1A6', respuesta)
                .subscribe();
            });
          break;
        // C2 Heuristica ------------------------------------------------------

        // ********************************************************************************************
      }
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
  ActualizarMadurez() {
    this.questionsService.getMaturityLevelsAll().subscribe((resp) => {
      var data: any = resp;
      for (let i = 0; i < data.length; i++) {
        var respuesta: any = {
          id: data[i].id,
          nombreLevel: data[i].nombreLevel,
          subdimension: data[i].subdimension,
          maxPregunta: data[i].maxPregunta,
          valor: 0,
          ciudad: data[i].ciudad,
        };
        this.questionsService
          .putMaturityByLevel(data[i].nombreLevel, respuesta)
          .subscribe();
      }
    });
  }
  llamarAFuncionesPregunta() {
    this.ActualizarMadurez();
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

  ngOnInit(): void {
    this.createCharts();
    this.llamarAFuncionesPregunta();
    setTimeout(() => {
      this.ObtenerData(this.ciudad);
    }, 3000);
    setInterval(() => this.ObtenerData(this.ciudad), 600000);
  }
}
