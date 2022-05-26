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
export interface Clientes {
  email: String;
  profesionalRole: String;
  yearsOfExperience: number;
  mainChallenges?: String;
}
export interface dataInfo {
  idRespuesta?: number;
  ciudad: String;
  año: number;
  email: String;
  idPregunta: String;
  respuesta: Number;
}

export interface Maturity {
  id: number;
  nombreLevel: String;
  subdimension: String;
  maxPregunta: number;
  valor: number;
  ciudad: String;
}
