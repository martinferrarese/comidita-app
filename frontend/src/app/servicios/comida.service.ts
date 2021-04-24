import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comida } from '../modelos/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(private http: HttpClient) { }

  obtenerComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>('api/comidas');
  }

  agregarComida(nuevaComida: Comida): Observable<any> {
    return this.http.post('api/comidas', nuevaComida);
  }
}
