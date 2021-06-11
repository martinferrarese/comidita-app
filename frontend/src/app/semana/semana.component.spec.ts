import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Dia } from '../modelos/dia';
import { DiaService } from '../servicios/dia.service';
import { SemanaComponent } from './semana.component';

describe('SemanaComponent', () => {
  let component: SemanaComponent;
  let fixture: ComponentFixture<SemanaComponent>;
  let diaService: DiaService;

  beforeEach(() => {
    let diaServiceStub: Partial<DiaService> = { obtenerDias: () => {return of([])}};

    TestBed.configureTestingModule({
      declarations: [ SemanaComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{ provider: DiaService, useValue: diaServiceStub }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SemanaComponent);
    component = fixture.componentInstance;
    diaService = fixture.debugElement.injector.get(DiaService);
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar con la semana listada', () => {
    // Dado que tengo los días de la semana laboral
    diaService.obtenerDias = () => {
      const dias: Dia[] = [
        {id: 1, nombre: 'Lunes', almuerzo: undefined, cena: undefined},
        {id: 2, nombre: 'Martes', almuerzo: undefined, cena: undefined},
        {id: 3, nombre: 'Miércoles', almuerzo: undefined, cena: undefined},
        {id: 4, nombre: 'Jueves', almuerzo: undefined, cena: undefined},
        {id: 5, nombre: 'Viernes', almuerzo: undefined, cena: undefined}
      ];
      return of(dias);
    };

    // Cuando inicio el componente
    component.ngOnInit();
    fixture.detectChanges();

    // Entonces se listan los días de la semana
    const lunes: HTMLElement = fixture.debugElement.nativeElement.querySelector('#dia-1');
    expect(lunes.innerHTML).toEqual('Lunes');
    const martes: HTMLElement = fixture.debugElement.nativeElement.querySelector('#dia-2');
    expect(martes.innerHTML).toEqual('Martes');
    const miercoles: HTMLElement = fixture.debugElement.nativeElement.querySelector('#dia-3');
    expect(miercoles.innerHTML).toEqual('Miércoles');
    const jueves: HTMLElement = fixture.debugElement.nativeElement.querySelector('#dia-4');
    expect(jueves.innerHTML).toEqual('Jueves');
    const viernes: HTMLElement = fixture.debugElement.nativeElement.querySelector('#dia-5');
    expect(viernes.innerHTML).toEqual('Viernes');
    expect(component.semana.length).toEqual(5);
  });
})