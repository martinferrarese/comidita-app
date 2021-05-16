import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComidaService } from '../servicios/comida.service';
import { SelectorComidaComponent } from './selector-comida.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Comida } from '../modelos/comida';
import { DiaService } from '../servicios/dia.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NuevaComidaComponent } from '../nueva-comida/nueva-comida.component';

fdescribe('SelectorComidaComponent', () => {
  let component: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;
  let obtenerComidasSpy: jasmine.Spy;
  let comidaService: ComidaService;
  let activatedRoute: ActivatedRoute;

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
          { provida: ActivatedRoute, useValue: { queryParams: of(1)} }
        ]
      ]
    });

    fixture = TestBed.createComponent(SelectorComidaComponent);
    component = fixture.componentInstance;

    comidaService = TestBed.inject(ComidaService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener comidas al ejecutar ngOnInit()', () => {
    //Dadas dos comidas
    component.comidas = [];
    const respuesta: Comida[] = [
      { id: 1, nombre: "Tarta", ingredientes: [] },
      { id: 2, nombre: "Milanesa", ingredientes: [] }
    ];
    spyOn(comidaService, 'obtenerComidas').and.returnValue(of(respuesta));
    //Cuando inicio el componente
    component.ngOnInit();
    //Entonces contiene el componente tiene dos comidas
    expect(component.comidas.length).toEqual(2);
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
  })

});