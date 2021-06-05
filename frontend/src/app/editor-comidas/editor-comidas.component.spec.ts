import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Comida } from '../modelos/comida';
import { NuevaComidaComponent } from '../nueva-comida/nueva-comida.component';
import { ComidaService } from '../servicios/comida.service';
import { EditorComidasComponent } from './editor-comidas.component';

fdescribe('EditorComidasComponent', () => {
  let component: EditorComidasComponent;
  let fixture: ComponentFixture<EditorComidasComponent>;
  let comidaService: ComidaService;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    let activatedRouteStub: Partial<ActivatedRoute> = { queryParams: of([]) };
    let comidaServiceStub: Partial<ComidaService> = { obtenerComida: () => {return of()}};

    TestBed.configureTestingModule({
      declarations: [ EditorComidasComponent, NuevaComidaComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub},
        { provide: ComidaService, useValue: comidaServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComidasComponent);
    component = fixture.componentInstance;
    comidaService = fixture.debugElement.injector.get(ComidaService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar con una lista de comidas al no recibir un id de comida como parámetro', () => {
    // Dado que existen dos comidas
    comidaService.obtenerComidas = () => {
      const comidas: Comida[] = [
        {id: 1, nombre: "Arroz con pollo", ingredientes: []},
        {id: 2, nombre: "Milanesa con ensalada", ingredientes: []},
      ];
      return of(comidas);
    }
    // Y no se recibe un id de comida por parámetro
    activatedRoute.queryParams = of([]);

    // Cuando inicio el componente
    component.ngOnInit();
    fixture.detectChanges();
    
    const arroz: HTMLTableDataCellElement = fixture.debugElement.nativeElement.querySelector('#comida-1');
    expect(arroz.innerHTML).toContain("Arroz con pollo");
    const milanesa: HTMLTableDataCellElement = fixture.debugElement.nativeElement.querySelector('#comida-2');
    expect(milanesa.innerHTML).toContain("Milanesa con ensalada");
    expect(component.modoEdicion).toEqual(false);
    expect(component.comidaAEditar).toBeUndefined();
  })
});
