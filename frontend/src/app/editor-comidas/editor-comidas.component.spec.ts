import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comida } from '../modelos/comida';
import { NuevaComidaComponent } from '../nueva-comida/nueva-comida.component';
import { ComidaService } from '../servicios/comida.service';
import { EditorComidasComponent } from './editor-comidas.component';
import { Location } from '@angular/common';

describe('EditorComidasComponent', () => {
  let component: EditorComidasComponent;
  let fixture: ComponentFixture<EditorComidasComponent>;
  let comidaService: ComidaService;
  let activatedRoute: ActivatedRoute;
  let location: Location;

  beforeEach(() => {
    let activatedRouteStub: Partial<ActivatedRoute> = { queryParams: of([]) };
    let comidaServiceStub: Partial<ComidaService> = { 
      obtenerComida: () => {return of()}, obtenerComidas: () => {return of([])},
      actualizarComida: () => {return of()}
    };
    let locationStub: Partial<Location> = { back: jasmine.createSpy('back') };

    TestBed.configureTestingModule({
      declarations: [ EditorComidasComponent, NuevaComidaComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub},
        { provide: ComidaService, useValue: comidaServiceStub },
        { provide: Location, useValue: locationStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComidasComponent);
    component = fixture.componentInstance;
    comidaService = fixture.debugElement.injector.get(ComidaService);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    location = fixture.debugElement.injector.get(Location);
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

    // Entonces se listan las comidas
    const arroz: HTMLTableDataCellElement = fixture.debugElement.nativeElement.querySelector('#nombre-comida-1');
    expect(arroz.innerHTML).toContain("Arroz con pollo");
    const milanesa: HTMLTableDataCellElement = fixture.debugElement.nativeElement.querySelector('#nombre-comida-2');
    expect(milanesa.innerHTML).toContain("Milanesa con ensalada");
    expect(component.modoEdicion).toEqual(false);
    expect(component.comidaAEditar).toBeUndefined();
  });

  it('debe iniciar en modo edición cuando recibe el id de una comida por parámetro', fakeAsync(() => {
    // Dado que se recibe un id de comida por parámetro
    const idComida = 3;
    const comida = new Comida();
    comida.id = Number(idComida);
    comida.nombre = "Puchero";
    comida.ingredientes = [];
    activatedRoute.queryParams = of({idComida: 3});
    // Y que esa comida existe
    spyOn(comidaService, 'obtenerComida').and.returnValue(of(comida).pipe(delay(1)));

    // Cuando inicia el componente
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();

    // Entonces muestra la edición de esa comida
    const inputNombreComida: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#nombre-comida');
    expect(inputNombreComida.value).toEqual("Puchero");
    expect(comidaService.obtenerComida).toHaveBeenCalled();
    expect(component.comidaAEditar).toBe(comida);
    expect(component.modoEdicion).toEqual(true);
  }));

  it('debe mostrar una nueva comida en la lista al agregar una comida', () => {
    // Dado que se tienen dos comidas al inicio
    comidaService.obtenerComidas = () => {
      const comidas: Comida[] = [
        {id: 1, nombre: "Arroz con pollo", ingredientes: []},
        {id: 2, nombre: "Milanesa con ensalada", ingredientes: []},
      ];
      return of(comidas);
    };
    // Y se quiere agregar una nueva comida
    const idNuevaComida = 5;
    const nuevaComida: Comida = {id: idNuevaComida, nombre: "Picada", ingredientes: []};

    // Cuando se agrega una nueva comida
    fixture.detectChanges();
    component.onAgregarComida(nuevaComida);
    fixture.detectChanges();

    // Se muestra por pantalla la nueva comida
    const elementoNuevaComida: HTMLTableDataCellElement = fixture.debugElement.nativeElement.querySelector('#nombre-comida-' + idNuevaComida);
    expect(elementoNuevaComida.innerHTML).toContain("Picada");
    expect(component.comidas.length).toEqual(3);
  });

  it('debe dejar de mostrar la comida en la lista cuando ésta es eliminada', () => {
    // Dado que se listan 3 comidas
    const idComidaAEliminar = 3;
    comidaService.obtenerComidas = () => {
      const comidas: Comida[] = [
        {id: 5, nombre: "Arroz con pollo", ingredientes: []},
        {id: 6, nombre: "Milanesa con ensalada", ingredientes: []},
        {id: idComidaAEliminar, nombre: "Pizza", ingredientes: []},
      ];
      return of(comidas);
    }
    fixture.detectChanges();
    expect(component.comidas.length).toEqual(3);
    const pizza: HTMLTableDataCellElement = fixture.debugElement.nativeElement.querySelector('#comida-' + idComidaAEliminar);
    expect(pizza).toBeDefined();

    // Cuando elimino una de ellas
    const botonEliminarPizza: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#btn-eliminar-comida-' + idComidaAEliminar);
    botonEliminarPizza.click();

    // Entonces se deja de mostrar en la lista
    fixture.detectChanges();
    expect(component.comidas.length).toEqual(2);
    expect(pizza).toBeNull();
  });

  it('debe volver luego de hacer clic en volver', () => {
    // Dado que estoy en el modo edición de una comida
    const idComida = 2;
    activatedRoute.queryParams = of({idComida: idComida});
    comidaService.obtenerComida = () => {
      return of({id: idComida, nombre: 'Tarta de atún', ingredientes: []})
    };
    fixture.detectChanges();

    // Cuando hago clic en el botón volver
    const btnVolver: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#btn-volver');
    btnVolver.click();

    // Entonces verifico que vuelvo
    expect(location.back).toHaveBeenCalled();
  });

  it('debe cambiar el nombre de la comida y guardarla y volver al hacer clic en el botón guardar y volver', fakeAsync(() => {
    // Dado que estoy en el modo edición de una comida
    const idComida = 6;
    activatedRoute.queryParams = of({idComida: idComida});
    comidaService.obtenerComida = () => {
      return of({id: idComida, nombre: 'Ensalada de garbanzos', ingredientes: []})
    };
    // Y dado que se va a guardar
    const actualizarComidaSpy = spyOn(comidaService, 'actualizarComida').and.callFake(() => of(delay(1)));
    fixture.detectChanges();

    // Cuando le cambio el nombre a la comida
    const inputNombreComida: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#nombre-comida');
    inputNombreComida.value = "Ensalada de garbanzo y huevo";
    // Cuando hago clic en el botón guardar y volver
    const btnGuardarYVolver: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#btn-guardar-y-volver');
    btnGuardarYVolver.click();
    tick(1);

    // Entonces se actualiza la comida
    expect(actualizarComidaSpy).toHaveBeenCalledWith(component.comidaAEditar);
    expect(component.comidaAEditar.nombre).toEqual('Ensalada de garbanzo y huevo');
    // Y vuelve
    expect(location.back).toHaveBeenCalled();
  }));
});
