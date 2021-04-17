import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Dia } from '../modelos/dia';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DiaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  obtenerDias(): Observable<Dia[]>{
    return this.http.get<Dia[]>('api/dias');
  }

  obtenerDiaPorId(id: number): Observable<Dia> {
    return this.http.get<Dia>(`api/dias/${id}`);
  }

  actualizarDia(nuevoDia: Dia): Observable<any>{
    return this.http.put('api/dias', nuevoDia, this.httpOptions);
  }

}
