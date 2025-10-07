import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tesis, SeccionTesis, Retroalimentacion } from '../models/tesis.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Tesis
  getTesis(): Observable<Tesis[]> {
    return this.http.get<Tesis[]>(`${this.apiUrl}/tesis/`);
  }

  createTesis(tesis: Partial<Tesis>): Observable<Tesis> {
    return this.http.post<Tesis>(`${this.apiUrl}/tesis/`, tesis);
  }

  getTesisById(id: number): Observable<Tesis> {
    return this.http.get<Tesis>(`${this.apiUrl}/tesis/${id}/`);
  }
  // Secciones
  analizarSeccion(seccionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/secciones/${seccionId}/analizar/`, {});
  }

  solicitarSugerencias(seccionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/secciones/${seccionId}/solicitar_sugerencias/`, {});
  }

  getSeccionById(id: number | string): Observable<SeccionTesis> {
    return this.http.get<SeccionTesis>(`${this.apiUrl}/secciones/${id}/`);
  }

  getSecciones(): Observable<SeccionTesis[]> {
    return this.http.get<SeccionTesis[]>(`${this.apiUrl}/secciones/`);
  }

  // Retroalimentaciones
  getRetroalimentacionesPendientes(): Observable<Retroalimentacion[]> {
    return this.http.get<Retroalimentacion[]>(`${this.apiUrl}/retroalimentaciones/pendientes/`);
  }

    marcarRetroalimentacionAtendida(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/retroalimentaciones/${id}/atender/`, {});
  }

  // Tutor
  consultarTutor(pregunta: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tutor/consulta/`, { pregunta });
  }
}