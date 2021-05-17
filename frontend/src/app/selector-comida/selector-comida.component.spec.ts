import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComidaService } from '../servicios/comida.service';
import { SelectorComidaComponent } from './selector-comida.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Comida } from '../modelos/comida';
import { DiaService } from '../servicios/dia.service';
import { ActivatedRoute } from '@angular/router';
import { Dia } from '../modelos/dia';

fdescribe('SelectorComidaComponent', () => {
  let component: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;
  let comidaService: ComidaService;
  let activatedRoute: ActivatedRoute;
  let diaService: DiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorComidaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        [
          { provide: ComidaService },
          { provide: DiaService },
          { provide: ActivatedRoute, useValue: { queryParams: of({ momentoDelDia: "almuerzo", idDia: 1 })} }
        ]
      ]
    });

    fixture = TestBed.createComponent(SelectorComidaComponent);
    component = fixture.componentInstance;

    comidaService = TestBed.inject(ComidaService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    diaService = TestBed.inject(DiaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar todas sus properties al ejecutar ngOnInit()', () => {
    //Dadas dos comidas
    component.comidas = [];
    const respuesta: Comida[] = [
      { id: 1, nombre: "Tarta", ingredientes: [] },
      { id: 2, nombre: "Milanesa", ingredientes: [] }
    ];
    const comidaServiceSpy = spyOn(comidaService, 'obtenerComidas').and.returnValue(of(respuesta));
    const diaRespuesta = new Dia();
    diaRespuesta.id = 1;
    const diaServiceSpy = spyOn(diaService, 'obtenerDiaPorId').and.returnValue(of(diaRespuesta))
    //Cuando inicio el componente
    component.ngOnInit();
    //Entonces contiene el componente tiene dos comidas
    expect(comidaServiceSpy).toHaveBeenCalled();
    expect(component.comidas.length).toEqual(2);
    expect(component.idDia).toEqual(1);
    expect(component.momentoDelDia).toEqual("almuerzo");
    expect(diaServiceSpy).toHaveBeenCalled();
    expect(component.diaAModificar.id).toEqual(1);
  });

  it('debe renderizar dos comidas en la tabla', () => {
    //Dado que tengo dos comidas
    const comidasEnPantalla = [ {id: 1, nombre: "Sopa", ingredientes: []}, {id: 2, nombre: "Tarta", ingredientes: []} ];
    spyOn(comidaService, 'obtenerComidas').and.returnValue(of(comidasEnPantalla));
    //Cuando inicio el componente
    component.ngOnInit();
    fixture.detectChanges();
    //Entonces veo las dos comidas en la tabla
    const sopa: HTMLElement = fixture.debugElement.nativeElement.querySelectorAll('td')[0];
    expect(sopa.innerHTML.trim()).toEqual(comidasEnPantalla[0].nombre);
    const tarta: HTMLElement = fixture.debugElement.nativeElement.querySelectorAll('td')[1];
    expect(tarta.innerHTML.trim()).toEqual(comidasEnPantalla[1].nombre);
  });

});