import 'mocha';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { Comida } from '../../../modelos/comida';
import { ComidaService } from '../../../servicios/comida-service';

let comidaRepository: ComidaRepository;
let stubComidaRepository: SinonStub;

function dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4(): void {
  const comida: Comida[] = [new Comida('Tarta de jamón y queso')];
  stubComidaRepository = sinon
    .stub(comidaRepository, 'buscarComida')
    .returns(comida);
}

function dadoQueSeTienen3ComidasAlmacenadas() {
  const comidas: Comida[] = [
    new Comida('Sopa'),
    new Comida('Milanesa'),
    new Comida('Fideos con crema'),
  ];
  stubComidaRepository = sinon
    .stub(comidaRepository, 'buscarComida')
    .returns(comidas);
}

describe('Pruebas sobre ComidaService', () => {
  before(() => {
    comidaRepository = new ComidaRepository();
  });

  afterEach(() => {
    stubComidaRepository.restore();
  });

  it(`Debe retornar una comida de nombre 'Tarta de jamón y queso' dado el id 4`, () => {
    dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4();

    const comidaObtenida: Comida[] = new ComidaService(
      comidaRepository,
    ).obtenerComida(4);

    expect(comidaObtenida.length).to.be.equal(1);
    expect(comidaObtenida[0].nombre).to.be.equal('Tarta de jamón y queso');
  });

  it(`Debe devolver todas las comidas almacenadas si recibe un id nulo`, () => {
    dadoQueSeTienen3ComidasAlmacenadas();

    const comidasObtenidas: Comida[] = new ComidaService(
      comidaRepository,
    ).obtenerComida(null);

    expect(comidasObtenidas.length).to.be.equal(3);
  });
});
