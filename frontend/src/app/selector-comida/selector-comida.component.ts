import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private diaService: DiaService) { }

  ngOnInit(): void {
    this.obtenerComidas();
  }

  obtenerComidas(): void {
    this.comidaService.obtenerComidas().subscribe(
      (comidasObtenidas) => {
        this.comidas = comidasObtenidas;
      }
    );
  }

  seleccionarComida(idComidaSeleccionada: number): void{
    this.activatedRoute.queryParams.subscribe(
      params => {
        let momentoDelDía: string = params['momentoDelDia'];
        let idDia: number = params['idDia'];

        this.diaService.obtenerDiaPorId(idDia).subscribe(
          diaObtenido => {
            let comidaSeleccionada = this.comidas.filter(comida => comida.id === idComidaSeleccionada)[0];
            this.agregaComidaAlMomentoDelDíaCorrespondiente(momentoDelDía, diaObtenido, comidaSeleccionada);
            this.diaService.actualizarDia(diaObtenido).subscribe(
              () => this.router.navigate(['/'])
            );
          }
        );
      }
    );
  }

  private agregaComidaAlMomentoDelDíaCorrespondiente(tipoDeComida: any, diaObtenido: Dia, comidaSeleccionada: Comida) {
    if (tipoDeComida === "almuerzo") {
      diaObtenido.almuerzo = comidaSeleccionada;
    }
    if (tipoDeComida === "cena") {
      diaObtenido.cena = comidaSeleccionada;
    }
  }

  onAgregarComida(comidaNuevaSeleccionada: Comida): void {
      this.activatedRoute.queryParams.subscribe(
      params => {
        let momentoDelDía: string = params['momentoDelDia'];
        let idDia: number = params['idDia'];

        this.diaService.obtenerDiaPorId(idDia).subscribe(
          diaObtenido => {
            
            this.agregaComidaAlMomentoDelDíaCorrespondiente(momentoDelDía, diaObtenido, comidaNuevaSeleccionada);
            this.diaService.actualizarDia(diaObtenido).subscribe(
              () => this.router.navigate(['/'])
            );
          }
        );
      }
    );
  }

}
