import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Elementos,
  ElementosPreguntas,
  Preguntas,
  dataInfo,
} from '../models/req-response';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_RESPUESTAS = 'https://localhost:5001/api/Respuestas';
  private API_CLIENTES = 'https://localhost:5001/api/Clientes';
  private API_PREGUNTAS = 'https://localhost:5001/api/Preguntas';
  private API_ELEMENTOS = 'https://localhost:5001/api/Elementos';
  private API_PREGUNTASTABLA = 'https://localhost:5001/api/PreguntasTablas';
  constructor(private http: HttpClient) {}

  public postClientData(cliente: any): Observable<any> {
    return this.http.post(this.API_CLIENTES, cliente);
  }

  public postRespuestas(respuesta: dataInfo): Observable<dataInfo> {
    return this.http.post<dataInfo>(this.API_RESPUESTAS, respuesta);
  }

  public getRespuestas() {
    return this.http.get(this.API_RESPUESTAS);
  }
  public getClientes() {
    return this.http.get(this.API_CLIENTES);
  }
  public getPreguntas() {
    return this.http.get<Preguntas>(this.API_PREGUNTAS);
  }
  public getElementos() {
    return this.http.get<Elementos>(this.API_ELEMENTOS);
  }
  public getPreguntasTabla() {
    return this.http.get<ElementosPreguntas>(this.API_PREGUNTASTABLA);
  }
}
