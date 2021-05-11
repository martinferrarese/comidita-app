import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
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
  momentoDelDía: string;
  idDia: number;
  diaAModificar: Dia;

  constructor(private comidaService: ComidaService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private diaService: DiaService) { }

  ngOnInit(): void {
    this.obtenerComidas();
    this.obtenerParametrosDeLaUrl();
    this.obtenerDiaEditable();
  }

  obtenerComidas(): void {
    this.comidaService.obtenerComidas().subscribe(
      comidasObtenidas => {
        this.comidas = comidasObtenidas;
      }
    );
  }

  private obtenerParametrosDeLaUrl() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.momentoDelDía = params['momentoDelDia'];
        this.idDia = params['idDia'];
      }
    )
  }

  private obtenerDiaEditable() {
    this.diaService.obtenerDiaPorId(this.idDia).subscribe(
      diaObtenido => { this.diaAModificar = diaObtenido }
    );
  }

  seleccionarComida(idComidaSeleccionada: number): void{
    let comidaSeleccionada = this.comidas.filter(comida => comida.id === idComidaSeleccionada)[0];
    this.agregaComidaAlMomentoDelDíaCorrespondiente(this.momentoDelDía, this.diaAModificar, comidaSeleccionada);
    this.diaService.actualizarDia(this.diaAModificar).subscribe();
    this.router.navigate(['/']);
  }

  private agregaComidaAlMomentoDelDíaCorrespondiente(tipoDeComida: string, diaAModificar: Dia, comidaSeleccionada: Comida) {
    if (tipoDeComida === "almuerzo") {
      diaAModificar.almuerzo = comidaSeleccionada;
    } else if (tipoDeComida === "cena") {
      diaAModificar.cena = comidaSeleccionada;
    }
  }

  onAgregarComida(comidaNuevaSeleccionada: Comida): void {
    this.comidas.push(comidaNuevaSeleccionada);
    this.seleccionarComida(comidaNuevaSeleccionada.id);
  }

}
