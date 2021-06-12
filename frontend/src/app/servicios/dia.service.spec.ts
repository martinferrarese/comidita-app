import { fakeAsync, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { Dia } from "../modelos/dia";
import { DiaService } from "./dia.service";

describe('DiaService', () => {
  let diaService: DiaService;
  let httpClientSpy: {get: jasmine.Spy, put: jasmine.Spy};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HTTPClient', ['get', 'put']);
    diaService = new DiaService(httpClientSpy as any);
  });

  it('debe crear el servicio', () => {
    expect(diaService).toBeTruthy();
  });

  it('debe obtener los días', fakeAsync(() => {
    // Dado que existen 5 días
    const dias: Dia[] = [
      {id: 1, nombre: 'Lunes', almuerzo: undefined, cena: undefined},
      {id: 2, nombre: 'Martes', almuerzo: undefined, cena: undefined},
      {id: 3, nombre: 'Miércoles', almuerzo: undefined, cena: undefined},
      {id: 4, nombre: 'Jueves', almuerzo: undefined, cena: undefined},
      {id: 5, nombre: 'Viernes', almuerzo: undefined, cena: undefined}
    ];
    httpClientSpy.get.and.returnValue(of(dias).pipe(delay(1)));

    // Cuando se quieren obtener esos 5 días
    let diasObtenidos: Dia[] = [];
    diaService.obtenerDias().subscribe(
      respuesta => diasObtenidos = respuesta
    );
    tick(1);

    // Entonces se obtienen esos días
    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(diasObtenidos).toEqual(dias);
  }));

  it('debe devolver el día buscado por id', fakeAsync(() => {
    // Dado que existe un día con id 4
    let idDia = 4;
    const dia: Dia = {id: idDia, nombre: 'Jueves', almuerzo: undefined, cena: undefined};
    httpClientSpy.get.and.returnValue(of(dia).pipe(delay(1)));

    // Cuando se lo busca por ese id
    let diaObtenido = new Dia;
    diaService.obtenerDiaPorId(idDia).subscribe(
      respuesta => diaObtenido = respuesta
    );
    tick(1);

    // Entonces obtengo el día con id 4
    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(diaObtenido).toEqual(dia);
  }));

  it('debe actualizar el día', () => {
    // Dado que se tiene un día
    const dia: Dia = {id: 3, nombre: 'Miércoles', almuerzo: undefined, cena: undefined};
    httpClientSpy.put.and.callThrough();

    // Cuando quiero actualizar el día
    diaService.actualizarDia(dia);

    // Entonces actualizo el día
    expect(httpClientSpy.put).toHaveBeenCalled();
  })
});
