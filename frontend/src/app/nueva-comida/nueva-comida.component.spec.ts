import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ComidaService } from '../servicios/comida.service';
import { NuevaComidaComponent } from './nueva-comida.component';

describe('NuevaComidaComponent', () => {
  let component: NuevaComidaComponent;
  let fixture: ComponentFixture<NuevaComidaComponent>;
  let comidaService: ComidaService;
  
  beforeEach(() => {
    let comidaServiceStub: Partial<ComidaService> = { agregarComida: () => { return of() } };

    TestBed.configureTestingModule({
      declarations: [ NuevaComidaComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: ComidaService, useValue: comidaServiceStub } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaComidaComponent);
    component = fixture.componentInstance;
    comidaService = fixture.debugElement.injector.get(ComidaService);
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe vaciar el input luego de agregar una nueva comida ', fakeAsync(() => {
    // Dado que inicio el componente
    const comidaServiceSpy = spyOn(comidaService, 'agregarComida').and.callFake(() => of(delay(1)));
    const emitterSpy = spyOn(component.agregarComidaEmmiter, 'emit');
    fixture.detectChanges();

    // Cuando ingreso un nombre de comida
    const inputAgregarComida: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#nombre-nueva-comida');
    inputAgregarComida.value = "Asado";
    // Y hago clic en agregar comida
    const botonAgregarComida: HTMLElement = fixture.debugElement.nativeElement.querySelector('#boton-agregar-comida');
    botonAgregarComida.click();
    tick(1);
    fixture.detectChanges();

    // Entonces el valor del input se limpia
    expect(inputAgregarComida.value).toEqual("");
    // Y el servicio de comida es llamado para agregar la comida
    expect(comidaServiceSpy).toHaveBeenCalled();
    expect(emitterSpy).toHaveBeenCalled();
  }));

  it('debe no hacer nada al querer agregar una nueva comida si el valor del input está vacío', () => {
    // Dado que inicio el componente
    const comidaServiceSpy = spyOn(comidaService, 'agregarComida');
    component.ngOnInit();

    // Cuando hago clic en agregar comida con el valor del input vacío
    const botonAgregarComida: HTMLElement = fixture.debugElement.nativeElement.querySelector('#boton-agregar-comida');
    botonAgregarComida.click();
    fixture.detectChanges();

    // Entonces el servicio de comida no es llamado
    expect(comidaServiceSpy).not.toHaveBeenCalled();
  });

});
