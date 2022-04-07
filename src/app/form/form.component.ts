import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private questionsService: HttpService, public _router: Router) {}
  Ciudades = ['Donostia', 'Valencia', 'Sevilla'];
  Professions = [
    'Local Goverment',
    'Critical Infraestructures',
    'Regional Goverment',
    'Academics and Scientific entities',
    'Media',
    'European legislative body',
    'Volunteers',
    'Citizens',
    'National goverment',
    'Other',
  ];
  // mostrarFormulario: boolean = true;

  cantPaginas = 12;
  paginaActual = 0;
  avPag(): void {
    if (this.paginaActual < this.cantPaginas) {
      this.paginaActual++;
    }
    (<HTMLInputElement>document.getElementById('file')).value = `${
      (100 / this.cantPaginas) * this.paginaActual
    }`;
  }
  rePag(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
    (<HTMLInputElement>document.getElementById('file')).value = `${
      (100 / this.cantPaginas) * this.paginaActual
    }`;
  }

  Email = new FormControl('', [Validators.required, Validators.email]);
  yearsExperience = new FormControl('', [Validators.required]);
  professionRole = new FormControl('', [Validators.required]);
  cityName = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.Email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessage() {
    if (this.yearsExperience.hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
    if (this.professionRole.hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
    if (this.cityName.hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
  }

  ciudad: any;
  role: any;
  changeCiudad(value: any): void {
    this.ciudad = value;
  }
  changeRole(value: any): void {
    this.role = value;
  }

  // chartCreation() {
  //   this.createChartsToChild.emit();
  // }
  // ocultarForm(): void {
  //   this.ocultar.emit();
  // }

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
    // console.log($(`input:radio[name="l4q1a1"]:checked`).val());
    console.log($('input[name="l4q2"]:checked').val());
    this.preguntas.map((d: any) => {
      switch (d.tipoPregunta) {
        case 'radio':
          console.log(
            $(`input:radio[name="${d.preguntaId}Label"]:checked`).val()
          );
          break;
        case 'checkbox':
          console.log($(`input[name="${d.preguntaId}"]:checked`).length);
          break;
      }
    });
  }
}
