import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comida } from '../modelos/comida';
import { Dia } from '../modelos/dia';
import { ComidaService } from '../servicios/comida.service';
import { DiaService } from '../servicios/dia.service';

@Component({
  selector: 'app-selector-comida',
  templateUrl: './selector-comida.component.html',
  styleUrls: ['./selector-comida.component.scss']
})
export class SelectorComidaComponent implements OnInit {

  comidas: Comida[];
  dia: Dia;

  constructor(private comidaService: ComidaService,
     private location: Location, 
     private router: ActivatedRoute,
     private diaService: DiaService) { }

  ngOnInit(): void {
    this.obtenerComidas();
  }

  obtenerComidas(): void {
    this.comidaService.obtenerComidas().subscribe(
      comidasObtenidas => this.comidas = comidasObtenidas
    );
  }

  seleccionarComida(idComidaSeleccionada: number): void{
    let idDiaAModificar = Number(this.router.snapshot.paramMap.get("idDia"));
      this.router.queryParams.subscribe(
      params => {
        let tipoDeComida = params['tipoDeComida'];
        let idDia = params['idDia'];
        
        this.diaService.obtenerDiaPorId(idDia).subscribe(
          diaObtenido => {
            let comida = this.comidas.filter(comida => comida.id === idComidaSeleccionada)[0];

            if(tipoDeComida === "almuerzo"){
              diaObtenido.almuerzo = comida;
            }
            if(tipoDeComida === "cena"){
              diaObtenido.cena = comida;
            }
            
            this.diaService.actualizarDia(diaObtenido).subscribe(
              () => this.location.back());
          }
        );
      }
    )
  }

}
