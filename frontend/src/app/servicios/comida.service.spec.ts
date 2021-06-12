import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Comida } from '../modelos/comida';
import { ComidaService } from './comida.service';

describe('ComidaService', () => {
  // Define el spy
  let httpClientSpy: {get: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy};
  let comidaService: ComidaService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HTTPClient', ['get', 'put', 'delete', 'post']);
    comidaService = new ComidaService(httpClientSpy as any);
  });

  it('debe crear el servicio', () => {
    expect(comidaService).toBeTruthy();
  });

  it('debe llamar al http.put al actualizar una comida', () => {
    // Dada una comida
    const comida: Comida = {id: 1, nombre: 'Ñoquis', ingredientes: []};
    httpClientSpy.put.and.callThrough();

    // Cuando la actualiza
    comidaService.actualizarComida(comida);

    // Entonces hace la petición y actualiza
    expect(httpClientSpy.put).toHaveBeenCalled();
  });

  it('debe obtener una comida', () => {
    // Dadas dos comidas
    const comidas: Comida[] = [{id: 1, nombre: 'Tarta', ingredientes: []}, {id: 2, nombre: 'Papas fritas', ingredientes: []}];
    httpClientSpy.get.and.returnValue(of(comidas));

    // Cuando quiero obtener todas las comidas
    const comidasObtenidas = comidaService.obtenerComidas();

    // Entonces obtengo todas las comidas
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('debe poder eliminar una comida', () => {
    // Dada una comida a eliminar
    const comida: Comida = {id: 1, nombre: 'Ñoquis', ingredientes: []};
    httpClientSpy.delete.and.callThrough();

    // Cuando quiero eliminar esa comida
    comidaService.eliminarComida(comida);

    // Entonces elimina la comida
    expect(httpClientSpy.delete).toHaveBeenCalled();
  });

  it('debe obtener una comida por id', fakeAsync(() => {
    // Dado que tengo una comida con id 2
    const idComidaABuscar = 2;
    const comida: Comida = {id: idComidaABuscar, nombre: 'Hamburguesa', ingredientes: []};
    httpClientSpy.get.and.returnValue(of(comida).pipe(delay(1)));

    // Cuando busco esa comida por id
    let comidaObtenida: Comida = new Comida;
    comidaService.obtenerComida(idComidaABuscar).subscribe(
      respuesta => comidaObtenida = respuesta
    );
    tick(1);

    // Entonces obtengo la comida
    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(comidaObtenida).toEqual(comida);
  }));

  it('debe agregar una comida', () => {
    // Dado que existe una comida
    const comida: Comida = {id: 3, nombre: 'Arroz con queso', ingredientes: []};
    httpClientSpy.post.and.callThrough();

    // Cuando quiere agregarla
    comidaService.agregarComida(comida);

    // Entonces agrega esa comida
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

});
