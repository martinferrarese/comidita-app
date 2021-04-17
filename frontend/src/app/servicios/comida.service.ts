import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comida } from '../modelos/comida';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(private http: HttpClient) { }

  obtenerComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>('api/comidas');
  }
}
