import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(private questionsService: HttpService) {}
  @Input() paginaActual: number | undefined;
  subdimensiones = ['L1', 'L2', 'L3', 'L4'];
  preguntas: any = {};
  elementos: any = {};
  tablaPreguntas: any = {};

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
      console.log(this.preguntas);
    });

    this.questionsService.getElementos().subscribe((resp) => {
      this.elementos = resp;
      console.log(this.elementos);
    });

    this.questionsService.getPreguntasTabla().subscribe((resp) => {
      this.tablaPreguntas = resp;
      console.log(this.tablaPreguntas);
    });
  }

  postData() {
    // ------------------------------------- Falta por obtener los datos de las matrices(los tipo tabla) y las preguntas mix -----------------------------------
    this.preguntas.map((d: any) => {
      switch (d.tipoPregunta) {
        case 'radio':
          console.log(
            `${d.tipoPregunta} ${d.preguntaId} = ` +
              $(`input:radio[name="${d.preguntaId}"]:checked`).val()
          );
          break;
        case 'checkbox':
          console.log(
            `${d.tipoPregunta} ${d.preguntaId} = ` +
              $(`input[name="${d.preguntaId}"]:checked`).length
          );
          break;
        case 'table':
          // Hacer un for para obtener los datos de la tabla a1-a2... -----------------
          console.log(
            `${d.tipoPregunta} ${d.preguntaId} = ` +
              $(`input[name="l2q7a1"]:checked`).length
          );
      }
    });
  }
}
