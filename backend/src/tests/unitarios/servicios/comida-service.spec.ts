import 'mocha';
import sinon, { SinonMock, SinonStub } from 'sinon';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { ComidaService } from '../../../servicios/comida-service';

let comidaRepository: ComidaRepository;

describe('ComidaService', () => {

  describe('Pruebas sobre la obtención de la comida', () => {

    before(() => {
      comidaRepository = new ComidaRepository();
    });

    it(`Debe enviar un filtro vacío al repositorio si no recibe un id`, () => {
      const comidaRepositoryMock: SinonMock = sinon.mock(comidaRepository);
      let filtroEsperado: Object = {};
      comidaRepositoryMock.expects('buscarComida').withArgs(filtroEsperado);
  
      new ComidaService(comidaRepository).obtenerComida(null);
  
      comidaRepositoryMock.verify();
    });
  
    it(`Debe enviar un filtro con un id al repositorio cuando se recibe un id por parámetro`, () => {
      const comidaRepositoryMock: SinonMock = sinon.mock(comidaRepository);
      let filtroEsperado: Object = {
        id: '0x00',
      }
      comidaRepositoryMock.expects('buscarComida').withArgs(filtroEsperado);
    
      new ComidaService(comidaRepository).obtenerComida("0x00");
  
      comidaRepositoryMock.verify();
    });
  });
});
