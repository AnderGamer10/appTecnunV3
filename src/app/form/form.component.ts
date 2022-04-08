import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(public _router: Router) {}
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

  ngOnInit(): void {}
}
