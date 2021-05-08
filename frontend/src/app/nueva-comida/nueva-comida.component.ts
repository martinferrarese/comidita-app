import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comida } from '../modelos/comida';
import { ComidaService } from '../servicios/comida.service';

@Component({
  selector: 'app-nueva-comida',
  templateUrl: './nueva-comida.component.html',
  styleUrls: ['./nueva-comida.component.scss']
})
export class NuevaComidaComponent implements OnInit {

  constructor(private comidaService: ComidaService) { }

  @Output()
  agregarComidaEmmiter = new EventEmitter<Comida>();

  ngOnInit(): void {
  }

  agregarComida(nombreComida: HTMLInputElement): void {
    if(nombreComida.value !== ""){
      let nuevaComida = new Comida();
      nuevaComida.nombre = nombreComida.value;
      nombreComida.value = "";
      this.comidaService.agregarComida(nuevaComida).subscribe(
        comida => this.agregarComidaEmmiter.emit(comida)
      );
    }
  }

}
