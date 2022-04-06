export interface Preguntas {
  pregunta: string;
  preguntaId: string;
  subdimension: string;
  tipoPregunta: string;
}
export interface Elementos {
  elemento: string;
  idPregunta: string;
  tipoPregunta: string;
  valor: number;
}
export interface ElementosPreguntas {
  elementoPregunta: string;
  idPregunta: string;
  valor: number;
}
