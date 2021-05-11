import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComidaService } from '../servicios/comida.service';
import { SelectorComidaComponent } from './selector-comida.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Comida } from '../modelos/comida';
import { HttpClient } from '@angular/common/http';

fdescribe('SelectorComidaComponent', () => {
  let component: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;
  let comidaServiceStub: Partial<ComidaService>;
  let comidaService: ComidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SelectorComidaComponent
      ]
    });

    fixture = TestBed.createComponent(SelectorComidaComponent);
    component = fixture.componentInstance;
    comidaService = TestBed.inject(ComidaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener 2 comidas al ejecutar ngOnInit()', () => {
    component.comidas = [];
    const respuesta: Comida[] = [
      { id: 1, nombre: "Tarta", ingredientes: [] },
      { id: 2, nombre: "Milanesa", ingredientes: [] }
    ];
    spyOn(comidaService, 'obtenerComidas').and.returnValue(of(respuesta));

    component.ngOnInit();

    expect(component.comidas.length).toEqual(2);
  });

});

