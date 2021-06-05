import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComidaService } from '../servicios/comida.service';
import { SelectorComidaComponent } from './selector-comida.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DiaService } from '../servicios/dia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dia } from '../modelos/dia';
import { Component } from '@angular/core';

fdescribe('SelectorComidaComponent', () => {
  let componente: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;
  let comidaService: ComidaService;
  let activatedRoute: ActivatedRoute;
  let diaService: DiaService;
  let router: Router;

  @Component({selector: 'app-nueva-comida', template: ''})
    class NuevaComidaComponentStub {
  }

  beforeEach(() => {
    let comidaServiceStub: Partial<ComidaService> = { obtenerComidas: function() { return of() } };
    let activatedRouteStub: Partial<ActivatedRoute> = { queryParams: of([]) };
    let diaServiceStub: Partial<DiaService> = { obtenerDiaPorId: function(id) {return of()}, actualizarDia: function(id) {return of()}};
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ SelectorComidaComponent, NuevaComidaComponentStub ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        [
          { provide: ComidaService, useValue: comidaServiceStub },
          { provide: DiaService, useValue: diaServiceStub },
          { provide: ActivatedRoute, useValue: activatedRouteStub },
          { provide: Router, useValue: routerSpy }
        ]
      ]
    });

    fixture = TestBed.createComponent(SelectorComidaComponent);
    componente = fixture.componentInstance;
    comidaService = fixture.debugElement.injector.get(ComidaService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    diaService = fixture.debugElement.injector.get(DiaService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('debe crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debe inicializar todas las propiedades del componente al ejecutar ngOnInit()', () => {
    // Dado que existen dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Sopa", ingredientes: []}, {id: 2, nombre: "Tarta", ingredientes: []} ];
      return of(comidas);
    }
    // Y que el día es lunes
    diaService.obtenerDiaPorId = function(id) {
      const diaRespuesta = new Dia();
      diaRespuesta.id = id;
      diaRespuesta.nombre = "Lunes";
      return of(diaRespuesta);
    };
    // Y que el momento del día es el almuerzo
    activatedRoute.queryParams = of({ momentoDelDia: "almuerzo", idDia: 1 });

    // Cuando inicio el componente
    componente.ngOnInit();

    // Entonces inicializa con esos valores
    expect(componente.comidas.length).toEqual(2);
    expect(componente.idDia).toEqual(1);
    expect(componente.momentoDelDia).toEqual("almuerzo");
    expect(componente.diaAModificar.nombre).toEqual("Lunes");
    expect(componente.diaAModificar.id).toEqual(1);
  });

  it('debe renderizar dos comidas en la tabla', () => {
    // Dado que tengo dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Milanesas", ingredientes: []}, {id: 2, nombre: "Ravioles", ingredientes: []} ];
      return of(comidas);
    }

    // Cuando inicio el componente
    componente.ngOnInit();
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
    // Y que el día es Lunes
    diaService.obtenerDiaPorId = function(id){
      const diaRespuesta = new Dia();
      diaRespuesta.id = id;
      diaRespuesta.nombre = "Lunes";
      diaRespuesta.almuerzo = undefined;
      diaRespuesta.cena = undefined;
      return of(diaRespuesta);
    };
    // Y que el momento del día es el almuerzo
    activatedRoute.queryParams = of({ momentoDelDia: "almuerzo", idDia: 1 });
    // Y que luego va a volver a la página principal
    const navigateSpy = router.navigate as jasmine.Spy;

    // Cuando selecciona la sopa
    componente.ngOnInit();
    fixture.detectChanges();
    const sopa: HTMLElement = fixture.debugElement.nativeElement.querySelector('#comida-1');
    sopa.click();

    // Entonces la sopa se planifica para el almuerzo del día Lunes
    expect(componente.diaAModificar.almuerzo?.nombre).toEqual("Sopa");
    expect(componente.diaAModificar.nombre).toEqual("Lunes");
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('debe seleccionar la comida tarta al hacerle click en la lista y agendarla para la cena el martes', () => {
    // Dado que tengo dos comidas
    comidaService.obtenerComidas = function() {
      const comidas = [ {id: 1, nombre: "Sopa", ingredientes: []}, {id: 2, nombre: "Tarta", ingredientes: []} ];
      return of(comidas);
    }
    // Y que el día es martes
    diaService.obtenerDiaPorId = function(id){
      const diaRespuesta = new Dia();
      diaRespuesta.id = id;
      diaRespuesta.nombre = "Martes";
      diaRespuesta.cena = undefined;
      return of(diaRespuesta);
    };
    // Y que el momento del día es la cena
    activatedRoute.queryParams = of({ momentoDelDia: "cena", idDia: 1 });

    // Cuando selecciona la tarta
    componente.ngOnInit();
    fixture.detectChanges();
    const sopa: HTMLElement = fixture.debugElement.nativeElement.querySelector('#comida-2');
    sopa.click();

    // Entonces la tarta se planifica para la cena del día martes
    expect(componente.diaAModificar.nombre).toEqual("Martes");
    expect(componente.diaAModificar.cena?.nombre).toEqual("Tarta");
  });

  it('debe actualizar la lista de comidas al agregar una comida', () => {
    // Dado que al inicio existe una sola comida
    componente.comidas = [{id: 1, nombre: "Tarta de pollo", ingredientes: []}];
    
    // Cuando se agrega la nueva comida
    const nuevaComida = {id: 2, nombre: "Empanadas", ingredientes: []};
    componente.onAgregarComida(nuevaComida);
    fixture.detectChanges();

    //Entonces suma una nueva comida a la lista
    expect(componente.comidas.length).toEqual(2);
    expect(componente.comidas[1].nombre).toEqual("Empanadas");
  });

});