import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Elementos,
  ElementosPreguntas,
  Preguntas,
  dataInfo,
  Clientes,
  Maturity,
} from '../models/req-response';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private API_RESPUESTAS = 'https://localhost:5001/api/Respuestas';
  private API_RESPUESTAID = 'https://localhost:5001/api/Respuestas';
  private API_CLIENTES = 'https://localhost:5001/api/Clientes';
  private API_PREGUNTAS = 'https://localhost:5001/api/Preguntas';
  private API_SUBDIMENSIONES = 'https://localhost:5001/api/Subdimensiones';
  private API_ELEMENTOS = 'https://localhost:5001/api/Elementos';
  private API_PREGUNTASTABLA = 'https://localhost:5001/api/PreguntasTablas';
  private API_MATURITYLEVELS = 'https://localhost:5001/api/Maturity_levels';
  private API_BYLEVEL = 'https://localhost:5001/api/Maturity_levels/byLevel';

  constructor(private http: HttpClient) {}

  public postClientData(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.API_CLIENTES, cliente);
  }

  public postRespuestas(respuesta: dataInfo): Observable<dataInfo> {
    return this.http.post<dataInfo>(this.API_RESPUESTAS, respuesta);
  }

  public getRespuestas() {
    return this.http.get(this.API_RESPUESTAS);
  }
  public getRespuestasId(idPregunta: string, año: number) {
    return this.http.get(this.API_RESPUESTAID + `/${idPregunta}` + `/${año}`);
  }
  public getPreguntas() {
    return this.http.get<Preguntas>(this.API_PREGUNTAS);
  }
  public getPregunta(subdimension: string) {
    return this.http.get<Preguntas>(this.API_PREGUNTAS + `/${subdimension}`);
  }
  public getSubdimensiones() {
    return this.http.get(this.API_SUBDIMENSIONES);
  }
  public getElementos() {
    return this.http.get<Elementos>(this.API_ELEMENTOS);
  }
  public getPreguntasTabla() {
    return this.http.get<ElementosPreguntas>(this.API_PREGUNTASTABLA);
  }

  public getMaturityLevelsAll() {
    return this.http.get(this.API_MATURITYLEVELS);
  }
  public getMaturityLevels(subdimension: string, ciudad: any) {
    return this.http.get(
      this.API_MATURITYLEVELS + `/${subdimension}` + `/${ciudad}`
    );
  }
  public putMaturityByLevel(
    nombreLevel: string,
    respuesta: Maturity
  ): Observable<Maturity> {
    return this.http.put<Maturity>(
      this.API_MATURITYLEVELS + `/${nombreLevel}`,
      respuesta
    );
  }

  public getMaturityByLevel(nombreLevel: string, ciudad: any) {
    return this.http.get(this.API_BYLEVEL + `/${nombreLevel}` + `/${ciudad}`);
  }
}
