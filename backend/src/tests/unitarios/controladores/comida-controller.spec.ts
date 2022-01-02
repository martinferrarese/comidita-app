import 'mocha';
import 'chai';
import { expect } from 'chai';
import sinon from 'sinon';
import { ComidaService } from '../../../servicios/comida-service';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { Comida } from '../../../modelos/comida';
import { ComidaController } from '../../../controladores/comida-controller';

let comidaServiceStub: ComidaService;

describe('Pruebas sobre ComidaController', () => {
  before(() => {
    comidaServiceStub = new ComidaService(new ComidaRepository());
  });
  it('Debe devolver todas las comidas disponibles', () => {
    sinon
      .stub(comidaServiceStub, 'obtenerComida')
      .returns(new Comida('Milanesa'));

    const resultado: Comida[] = new ComidaController(
      comidaServiceStub,
    ).buscarComida();
  });
});
