import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(public _router: Router, private questionsService: HttpService) {}

  // Variables 
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
  challenge: string | undefined;
  subInfo: any = {};
  subdimensiones: any = [];
  cantPaginas = 2;
  paginaActual = 0;

  // Variable para saber si ha introducido los datos del usuario
  todoRelleno: boolean = false;

  // Funcion para avanzar la pagina
  avPag(): void {
    if (
      this.Email.value != '' &&
      this.yearsExperience.value != '' &&
      this.professionRole.value != '' &&
      this.cityName.value != ''
    ) {
      if (this.paginaActual < this.cantPaginas) {
        this.paginaActual++;
      }
      (<HTMLInputElement>document.getElementById('file')).value = `${
        (100 / this.cantPaginas) * this.paginaActual
      }`;
    } else {
      this.todoRelleno = true;
    }
  }
  // Funcion para ir hacia atras
  rePag(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
    (<HTMLInputElement>document.getElementById('file')).value = `${
      (100 / this.cantPaginas) * this.paginaActual
    }`;
  }
  // Variables con validadores Email...
  Email = new FormControl('', [Validators.required, Validators.email]);
  yearsExperience = new FormControl('', [Validators.required]);
  professionRole = new FormControl('', [Validators.required]);
  cityName = new FormControl('', [Validators.required]);

  // Si introduce mal el email... saltara un error
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

  // Variables de la ciudad y role con 2 funciones para guardar los datos al cambiar
  ciudad: any;
  role: any;
  changeCiudad(value: any): void {
    this.ciudad = value;
  }
  changeRole(value: any): void {
    this.role = value;
  }

  // Para saber que ciudad se a elegido en la parte para ir directamente al dashboard
  cambiarCiudad() {
    let valor: any = $('#selCiudad').val();
    if (valor != '') {
      sessionStorage.setItem('ciudad', valor);
      this.ciudad = sessionStorage.getItem('ciudad');
    }
  }

  ngOnInit(): void {
    sessionStorage.setItem('ciudad', 'Donostia');
    this.questionsService.getSubdimensiones().subscribe((resp) => {
      this.subInfo = resp;
      for (let i = 0; i < this.subInfo.length; i++) {
        this.subdimensiones.push(this.subInfo[i].subdimension);
      }
      this.cantPaginas = this.subdimensiones.length + 2;
    });
  }
}
