import { Component, OnInit } from '@angular/core';
import { Comida } from '../modelos/comida';
import { ComidaService } from '../servicios/comida.service';

@Component({
  selector: 'app-editor-comidas',
  templateUrl: './editor-comidas.component.html',
  styleUrls: ['./editor-comidas.component.scss']
})
export class EditorComidasComponent implements OnInit {

  comidas : Comida[];

  constructor(private comidaService: ComidaService) { }

  ngOnInit(): void {
    this.comidaService.obtenerComidas().subscribe(
      comidasObtenidas => this.comidas = comidasObtenidas
    )
  }

  onAgregarComida(comidaNuevaAgregada: Comida) {
    this.comidas.push(comidaNuevaAgregada);
  }

  eliminarComida(comidaAEliminar: Comida): void {
    this.comidas = this.comidas.filter(comida => comida.id !== comidaAEliminar.id);
    this.comidaService.eliminarComida(comidaAEliminar);
  }

}
