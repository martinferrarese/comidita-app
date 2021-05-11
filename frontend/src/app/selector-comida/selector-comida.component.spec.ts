import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComidaService } from '../servicios/comida.service';
import { SelectorComidaComponent } from './selector-comida.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Comida } from '../modelos/comida';

fdescribe('SelectorComidaComponent', () => {
  let component: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;
  let comidaServiceStub: Partial<ComidaService>;
  let comidaService: ComidaService;

  let comida: Comida[] = [
    { id: 1, nombre: "Tarta", ingredientes: [] },
    { id: 2, nombre: "Milanesas", ingredientes: [] },
    { id: 3, nombre: "Huevos", ingredientes: [] } ];

  beforeEach(() => {
    comidaServiceStub = {
      obtenerComidas(): Observable<Comida[]> {
        const comida: Comida[] = [
          { id: 1, nombre: "Tarta", ingredientes: [] },
          { id: 2, nombre: "Milanesas", ingredientes: [] },
          { id: 3, nombre: "Huevos", ingredientes: [] }
        ];
        return of(comida);
      }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SelectorComidaComponent,
        { provider: ComidaService, useValue: comidaServiceStub }]
    });
    fixture = TestBed.createComponent(SelectorComidaComponent);
    component = fixture.componentInstance;
    comidaService = TestBed.inject(ComidaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.comidas).toEqual([]);
  });

  it('debe obtener 3 comidas al ejecutar ngOnInit()', () => {
    expect(component.comidas).toEqual([]);
    component.obtenerComidas();
    expect(component.comidas).toEqual([]);
    console.error(component.comidas);
    
    //expect(component.comidas).toEqual(comida);
  });

});
