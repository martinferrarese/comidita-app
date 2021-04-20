import { Component, OnInit } from '@angular/core';
import { Dia } from '../modelos/dia';
import { DiaService } from '../servicios/dia.service';

@Component({
  selector: 'app-semana',
  templateUrl: './semana.component.html',
  styleUrls: ['./semana.component.scss']
})
export class SemanaComponent implements OnInit {

  semana: Dia[];

  constructor(private diaService: DiaService) { }

  ngOnInit(): void {
    this.inicializarSemana();
  }

  inicializarSemana(): void{
    this.diaService.obtenerDias().subscribe(
      dias => this.semana = dias
    );
  }

  eliminarAlmuerzo(dia: Dia): void{
    dia.almuerzo = undefined;
  }

  eliminarCena(dia: Dia): void{
    dia.cena = undefined;
  }

}
