import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
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
  // chartCreation() {
  //   this.createChartsToChild.emit();
  // }
  // ocultarForm(): void {
  //   this.ocultar.emit();
  // }

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

  mostrar: boolean = true;
  subdimensiones = ['L1', 'L2', 'L3', 'L4'];
  preguntas: any = {};
  elementos: any = {};
  tablaPreguntas: any = {};
  public L1: any = [];
  public L2: any = [];
  public L3: any = [];
  public L4: any = [];
  constructor(private questionsService: HttpService) {}
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

  ngOnInit(): void {
    this.questionsService.getPreguntas().subscribe((resp) => {
      this.preguntas = resp;
      console.log(this.preguntas);
      console.log(this.preguntas[0]);
      this.L1 = this.preguntas.filter((resp: any) => {
        return resp.subdimension === 'L1';
      });
      this.L2 = this.preguntas.filter((resp: any) => {
        return resp.subdimension === 'L2';
      });
      this.L3 = this.preguntas.filter((resp: any) => {
        return resp.subdimension === 'L3';
      });
      this.L4 = this.preguntas.filter((resp: any) => {
        return resp.subdimension === 'L4';
      });
      console.log('---------------');
      console.log(this.L4);
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
}
