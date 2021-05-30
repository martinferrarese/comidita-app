import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComidaService } from '../servicios/comida.service';
import { SelectorComidaComponent } from './selector-comida.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DiaService } from '../servicios/dia.service';
import { ActivatedRoute } from '@angular/router';
import { Dia } from '../modelos/dia';
import { Component } from '@angular/core';

fdescribe('SelectorComidaComponent', () => {
  let component: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;
  let comidaService: ComidaService;
  let activatedRoute: ActivatedRoute;
  let diaService: DiaService;

  @Component({selector: 'app-nueva-comida', template: ''})
    class NuevaComidaComponentStub {
  }

  let comidaServiceStub: Partial<ComidaService> = {};
  let diaServiceStub: Partial<DiaService> = {};
  let activatedRouteStub: Partial<ActivatedRoute> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorComidaComponent, NuevaComidaComponentStub ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        [
          { provide: ComidaService, useValue: comidaServiceStub },
          { provide: DiaService, useValue: diaServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub }
        ]
      ]
    });

    fixture = TestBed.createComponent(SelectorComidaComponent);
    component = fixture.componentInstance;
    comidaService = fixture.debugElement.injector.get(ComidaService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    diaService = fixture.debugElement.injector.get(DiaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar todas las propiedades del componente al ejecutar ngOnInit()', () => {
    // Dado que existen dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Sopa", ingredientes: []}, {id: 2, nombre: "Tarta", ingredientes: []} ];
      return of(comidas);
    }
    // Y dado que el día es lunes
    diaService.obtenerDiaPorId = function(id) {
      const diaRespuesta = new Dia();
      diaRespuesta.id = id;
      diaRespuesta.nombre = "Lunes";
      return of(diaRespuesta);
    };
    // Y dado que el momento del día es el almuerzo
    activatedRoute.queryParams = of({ momentoDelDia: "almuerzo", idDia: 1 });

    // Cuando inicio el componente
    component.ngOnInit();

    // Entonces inicializa con esos valores
    expect(component.comidas.length).toEqual(2);
    expect(component.idDia).toEqual(1);
    expect(component.momentoDelDia).toEqual("almuerzo");
    expect(component.diaAModificar.nombre).toEqual("Lunes");
    expect(component.diaAModificar.id).toEqual(1);
  });

  it('debe renderizar dos comidas en la tabla', () => {
    // Dado que tengo dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Milanesas", ingredientes: []}, {id: 2, nombre: "Ravioles", ingredientes: []} ];
      return of(comidas);
    }

    // Cuando inicio el componente
    component.ngOnInit();
    fixture.detectChanges();

    // Entonces veo las dos comidas en la tabla
    const sopa: HTMLElement = fixture.debugElement.nativeElement.querySelector('#comida-1');
    expect(sopa.innerHTML.trim()).toEqual("Milanesas");
    const tarta: HTMLElement = fixture.debugElement.nativeElement.querySelector('#comida-2');
    expect(tarta.innerHTML.trim()).toEqual("Ravioles");
  });

  it('debe seleccionar la comida sopa al hacerle click en la lista y agendarla para el almuerzo el lunes', () => {
    // Dado que tengo dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Sopa", ingredientes: []}, {id: 2, nombre: "Ravioles", ingredientes: []} ];
      return of(comidas);
    }
    // Y dado que el día es Lunes
    diaService.obtenerDiaPorId = function(id){
      const diaRespuesta = new Dia();
      diaRespuesta.id = id;
      diaRespuesta.nombre = "Lunes";
      diaRespuesta.almuerzo = undefined;
      diaRespuesta.cena = undefined;
      return of(diaRespuesta);
    };
    // Y dado que el momento del día es el almuerzo
    activatedRoute.queryParams = of({ momentoDelDia: "almuerzo", idDia: 1 });

    // Al seleccionar la comida sopa
    component.ngOnInit();
    fixture.detectChanges();
    const sopa: HTMLElement = fixture.debugElement.nativeElement.querySelector('#comida-1');
    sopa.click();

    // La sopa se planifica para el almuerzo del día Lunes
    expect(component.diaAModificar.almuerzo?.nombre).toEqual("Sopa");
    expect(component.diaAModificar.nombre).toEqual("Lunes");
  });

  it('debe seleccionar la comida tarta al hacerle click en la lista y agendarla para la cena el martes', () => {
    // Dado que tengo dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Sopa", ingredientes: []}, {id: 2, nombre: "Tarta", ingredientes: []} ];
      return of(comidas);
    }
    // Y dado que el día es martes
    diaService.obtenerDiaPorId = function(id){
      const diaRespuesta = new Dia();
      diaRespuesta.id = id;
      diaRespuesta.nombre = "Martes";
      diaRespuesta.cena = undefined;
      return of(diaRespuesta);
    };
    // Y dado que el momento del día es la cena
    activatedRoute.queryParams = of({ momentoDelDia: "cena", idDia: 1 });

    // Al seleccionar la comida tarta
    component.ngOnInit();
    fixture.detectChanges();
    const sopa: HTMLElement = fixture.debugElement.nativeElement.querySelector('#comida-2');
    sopa.click();

    // La tarta se planifica para la cena del día martes
    expect(component.diaAModificar.nombre).toEqual("Martes");
    expect(component.diaAModificar.cena?.nombre).toEqual("Tarta");
  });

});