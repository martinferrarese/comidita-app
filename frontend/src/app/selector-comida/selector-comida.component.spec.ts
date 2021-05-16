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

  it('debe renderizar una comida en la tabla', () => {
    //Dado que tengo una sola comida
    const comidaMock = [ {id: 1, nombre: "Sopa", ingredientes: []} ];
    spyOn(comidaService, 'obtenerComidas').and.returnValue(of(comidaMock));
    //Cuando inicio el componente
    component.ngOnInit();
    fixture.detectChanges();
    //Entonces veo la comida
    const comidaListada: HTMLElement = fixture.debugElement.nativeElement.querySelector('td');
    expect(comidaListada.innerHTML.trim()).toEqual(comidaMock[0].nombre);
  })

});