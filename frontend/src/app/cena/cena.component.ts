import { Component, Input, OnInit } from '@angular/core';
import { Comida } from '../modelos/comida';
import { Dia } from '../modelos/dia';

@Component({
  selector: 'app-cena',
  templateUrl: './cena.component.html',
  styleUrls: ['./cena.component.scss']
})
export class CenaComponent implements OnInit {

  @Input()
  dia: Dia;

  constructor() { }

  ngOnInit(): void {
  }

  agregarCena(dia: Dia):void {
    const comidaEjemplo: Comida = {
      id: 2,
      nombre: "Milanesa con papas",
      ingredientes: []
    }
    dia.cena = comidaEjemplo;
  }
}
