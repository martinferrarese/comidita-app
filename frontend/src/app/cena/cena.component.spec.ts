import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Comida } from '../modelos/comida';
import { Dia } from '../modelos/dia';
import { DiaService } from '../servicios/dia.service';
import { CenaComponent } from './cena.component';

describe('CenaComponent', () => {
  let component: CenaComponent;
  let fixture: ComponentFixture<CenaComponent>;

  beforeEach(() => {
    let diaServiceStub: Partial<DiaService> = {};

    TestBed.configureTestingModule({
      declarations: [ CenaComponent ],
      imports: [ RouterTestingModule ],
      providers: [{ provider: DiaService, useValue: diaServiceStub }]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(CenaComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe eliminar la cena del día recibido', () => {
    // Dado que recibe una día con una cena
    const comidaDeLaCena: Comida = {id: 8, nombre: "Pescado con papas", ingredientes: []};
    const diaDeEntrada: Dia = {id: 1, nombre: "Jueves", almuerzo: undefined, cena: comidaDeLaCena};
    component.dia = diaDeEntrada;
    fixture.detectChanges();

    // Cuando se hace clic en el botón para eliminar la comida
    const botonEliminarComida: HTMLElement = fixture.debugElement.nativeElement.querySelector('#boton-eliminar-cena');
    botonEliminarComida.click();

    // Entonces se elimina la cena del día
    expect(component.dia.cena).toBe(undefined);
  });
});
