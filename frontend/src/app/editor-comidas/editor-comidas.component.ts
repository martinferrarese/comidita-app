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

}
