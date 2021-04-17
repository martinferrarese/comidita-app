import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Comida } from '../modelos/comida';
import { Dia } from '../modelos/dia';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    let comidas = [
      { id: 1, nombre: "Tarta de jamón y queso", ingredientes: [] },
      { id: 2 , nombre: "Milanesa con papas al horno", ingredientes: [] }
    ];

    let dias = [
      { id: 1, nombre: "Lunes", almuerzo: null, cena: null},
      { id: 2, nombre: "Martes", almuerzo: null, cena: null},
      { id: 3, nombre: "Miercoles", almuerzo: null, cena: null},
      { id: 4, nombre: "Jueves", almuerzo: null, cena: null},
      { id: 5, nombre: "Viernes", almuerzo: null, cena: null},
    ]
    return {comidas, dias}
  }

  genId<T extends Comida | Dia>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }

}
