import 'mocha';
import { expect } from 'chai';
import sinon, { SinonMock, SinonStub } from 'sinon';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { Comida } from '../../../modelos/comida';
import { ComidaService } from '../../../servicios/comida-service';

let comidaRepository: ComidaRepository;
let stubComidaRepository: SinonStub;

function dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4(): void {
  let tartaDeJamonYQueso: Comida = new Comida();
  tartaDeJamonYQueso.nombre = 'Tarta de jamón y queso';
  const comida: Comida[] = [tartaDeJamonYQueso];
  stubComidaRepository = sinon
    .stub(comidaRepository, 'buscarComida')
    .returns(comida);
}

function dadoQueSeTienen3ComidasAlmacenadas() {
  let sopa: Comida = new Comida();
  let milanesa: Comida = new Comida();
  let fideosConCrema: Comida = new Comida();
  sopa.nombre = 'Sopa';
  milanesa.nombre = 'Milanesa';
  fideosConCrema.nombre = 'Fideos con crema';

  const comidas: Comida[] = [sopa, milanesa, fideosConCrema];
  
  stubComidaRepository = sinon
    .stub(comidaRepository, 'buscarComida')
    .returns(comidas);
}

describe('Pruebas sobre ComidaService', () => {
  before(() => {
    comidaRepository = new ComidaRepository();
  });

  afterEach(() => {
    if(stubComidaRepository)
        stubComidaRepository.restore();
  });

  it(`Debe retornar una comida de nombre 'Tarta de jamón y queso' dado el id 4`, () => {
    dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4();

    const comidaObtenida: Comida[] = new ComidaService(
      comidaRepository,
    ).obtenerComida('4');

    expect(comidaObtenida.length).to.be.equal(1);
    expect(comidaObtenida[0].nombre).to.be.equal('Tarta de jamón y queso');
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
