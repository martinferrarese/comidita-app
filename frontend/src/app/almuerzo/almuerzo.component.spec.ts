import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Comida } from '../modelos/comida';
import { Dia } from '../modelos/dia';
import { DiaService } from '../servicios/dia.service';
import { AlmuerzoComponent } from './almuerzo.component';

describe('AlmuerzoComponent', () => {
  let component: AlmuerzoComponent;
  let fixture: ComponentFixture<AlmuerzoComponent>;

  beforeEach(() => {
    let diaServiceStub: Partial<DiaService> = {};

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AlmuerzoComponent ],
      providers: [ { provider: DiaService, useValue: diaServiceStub } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmuerzoComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe eliminar el almuerzo del día recibido', () => {
    // Dado que recibe una día con un almuerzo
    const comidaDelAlmuerzo: Comida = {id: 8, nombre: "Puchero", ingredientes: []};
    const diaDeEntrada: Dia = {id: 1, nombre: "Viernes", almuerzo: comidaDelAlmuerzo, cena: undefined};
    component.dia = diaDeEntrada;
    fixture.detectChanges();

    // Cuando se hace clic en el botón para eliminar la comida
    const botonEliminarComida: HTMLElement = fixture.debugElement.nativeElement.querySelector('#boton-eliminar-almuerzo');
    botonEliminarComida.click();

    // Entonces se elimina el almuerzo del día
    expect(component.dia.almuerzo).toBe(undefined);
  });
});
