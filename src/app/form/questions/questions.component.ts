import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import * as $ from 'jquery';
import { dataInfo, Clientes } from '../../models/req-response';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(private questionsService: HttpService) {}
  @Input() paginaActual: number | undefined;
  @Input() cantPaginas: number | undefined;
  @Input() subdimensiones: any | undefined;

  @Input() ciudad: any | undefined;
  @Input() Email: any | undefined;
  @Input() yearsExperience: any | undefined;
  @Input() role: any | undefined;

  preguntas: any = {};
  elementos: any = {};
  tablaPreguntas: any = {};
  respuesta: any;

  datosObtenidos: boolean = false;
  dataSend: boolean = false;

  filtrarElementos(id: string) {
    return this.elementos
      .filter((resp: { idPregunta: string }) => resp.idPregunta === id)
      .sort((a: { valor: number }, b: { valor: number }) =>
        a.valor > b.valor ? 1 : -1
      );
  }

  filtrarTablaPreguntas(id: string) {
    return this.tablaPreguntas
      .filter((resp: { idPregunta: string }) => resp.idPregunta === id)
      .sort((a: { valor: number }, b: { valor: number }) =>
        a.valor > b.valor ? 1 : -1
      );
  }
  filtrarSubdimension(sub: string) {
    return this.preguntas
      .filter((resp: { subdimension: string }) => resp.subdimension === sub)
      .sort((a: { preguntaId: string }, b: { preguntaId: string }) =>
        a.preguntaId > b.preguntaId ? 1 : -1
      );
  }

  mostrarDatos() {
    // Obtendre la cantidad de respuestas elegidas para saber los "puntos" que tendra la pregunta.
    // En el futuro cambiarlo para obtener cual ha sido seleccionado. ----------------------------
    console.log($('input[name="l4q3"]:checked').length);

    // console.log($('input[name="l4q3"]:checked'));
    // console.log($('input[name="l4q3"]:checked').val());
    // console.log($('input[name="l4q3"]:checked').attr('id'));
    // $('input[name="l4q3"]:checked').map((d) => {
    //   console.log(d);
    // });
  }
  ngOnInit(): void {
    this.questionsService.getPreguntas().subscribe((resp) => {
      this.preguntas = resp;
    });

    this.questionsService.getElementos().subscribe((resp) => {
      this.elementos = resp;
    });

    this.questionsService.getPreguntasTabla().subscribe((resp) => {
      this.tablaPreguntas = resp;
      this.datosObtenidos = true;
    });
  }
  postData() {
    let cliente: Clientes = {
      email: this.Email.value,
      profesionalRole: this.role,
      yearsOfExperience: this.yearsExperience.value,
      mainChallenges: 's',
    };
    this.questionsService.postClientData(cliente).subscribe((data) => {
      console.log(data);
    });
    let data: dataInfo;
    this.dataSend = true;
    this.preguntas.map((d: any) => {
      switch (d.tipoPregunta) {
        case 'radio':
          this.respuesta = $(
            `input:radio[name="${d.preguntaId}"]:checked`
          ).val();
          data = {
            ciudad: this.ciudad,
            año: 2022,
            email: this.Email.value,
            idPregunta: d.preguntaId,
            respuesta: this.respuesta,
          };
          this.questionsService.postRespuestas(data).subscribe((data) => {
            console.log(data);
          });
          break;
        case 'checkbox':
          console.log(
            `${d.tipoPregunta} ${d.preguntaId} = ` +
              $(`input[name="${d.preguntaId}"]:checked`).length
          );
          this.respuesta = $(`input[name="${d.preguntaId}"]:checked`).length;
          data = {
            ciudad: this.ciudad,
            año: 2022,
            email: this.Email.value,
            idPregunta: d.preguntaId,
            respuesta: this.respuesta,
          };
          this.questionsService.postRespuestas(data).subscribe((data) => {
            console.log(data);
          });
          break;
        case 'table':
          this.respuesta = 0;
          let cantPreguntas = 0;
          switch (this.filtrarElementos(d.preguntaId)[0].tipoPregunta) {
            case 'checkbox':
              for (
                let i = 1;
                i < this.filtrarElementos(d.preguntaId).length + 1;
                i++
              ) {
                this.respuesta += $(
                  `input[name="${d.preguntaId}a${i}"]:checked`
                ).length;
                cantPreguntas++;
              }
              data = {
                ciudad: this.ciudad,
                año: 2022,
                email: this.Email.value,
                idPregunta: d.preguntaId,
                respuesta: this.respuesta / cantPreguntas,
              };
              this.questionsService.postRespuestas(data).subscribe((data) => {
                console.log(data);
              });
              break;
            case 'radio':
              for (
                let i = 1;
                i < this.filtrarElementos(d.preguntaId).length + 1;
                i++
              ) {
                let valorRespuesta: any = $(
                  `input[name="${d.preguntaId}a${i}"]:checked`
                ).val();
                this.respuesta += valorRespuesta - 0;
                cantPreguntas++;
              }
              data = {
                ciudad: this.ciudad,
                año: 2022,
                email: this.Email.value,
                idPregunta: d.preguntaId,
                respuesta: this.respuesta / cantPreguntas,
              };
              this.questionsService.postRespuestas(data).subscribe((data) => {
                console.log(data);
              });
              break;
          }
          break;
      }
    });
  }
}
