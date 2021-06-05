import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comida } from '../modelos/comida';
import { ComidaService } from '../servicios/comida.service';

@Component({
  selector: 'app-editor-comidas',
  templateUrl: './editor-comidas.component.html',
  styleUrls: ['./editor-comidas.component.scss']
})
export class EditorComidasComponent implements OnInit {

  idComidaAEditar: number = 0;
  comidas : Comida[];
  comidaAEditar: Comida;
  modoEdicion: boolean = false;

  constructor(private comidaService: ComidaService, private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => this.idComidaAEditar = Number(params['idComida'])
    );
    if(isNaN(this.idComidaAEditar)){
      this.modoEdicion = false;
      this.comidaService.obtenerComidas().subscribe(
        comidasObtenidas => this.comidas = comidasObtenidas
      );
    }
    else {
      this.modoEdicion = true;
      this.comidaService.obtenerComida(this.idComidaAEditar).subscribe(
        comidaObtenida => this.comidaAEditar = comidaObtenida
      );
    }
  }

  onAgregarComida(comidaNuevaAgregada: Comida) {
    this.comidas.push(comidaNuevaAgregada);
  }

  eliminarComida(comidaAEliminar: Comida): void {
    this.comidas = this.comidas.filter(comida => comida.id !== comidaAEliminar.id);
    this.comidaService.eliminarComida(comidaAEliminar);
  }

  volver(){
    this.location.back();
  }
  
  guardarYVolver(nombreNuevo: string){
    this.comidaAEditar.nombre = nombreNuevo;
    this.comidaService.actualizarComida(this.comidaAEditar).subscribe(
      () => this.location.back()
    );
  }

}
