import { Component, Input, OnInit } from '@angular/core';
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

  eliminarCena(dia: Dia): void{
    dia.cena = undefined;
  }

}
