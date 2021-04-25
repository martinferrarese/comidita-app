import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comida } from '../modelos/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  obtenerComida(idComida: number): Observable<Comida> {
    return this.http.get<Comida>(`api/comidas/${idComida}`);
  }

  eliminarComida(comidaAEliminar: Comida): Observable<any>{
    return this.http.delete<Comida>(`api/comidas/${comidaAEliminar.id}`, this.httpOptions);
  }

  constructor(private http: HttpClient) { }

  obtenerComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>('api/comidas');
  }

  agregarComida(nuevaComida: Comida): Observable<any> {
    return this.http.post('api/comidas', nuevaComida);
  }
}
