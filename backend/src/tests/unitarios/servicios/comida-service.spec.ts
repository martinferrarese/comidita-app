import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { Comida } from '../../../modelos/comida';
import { ComidaService } from '../../../servicios/comida-service';
let comidaRepository : ComidaRepository;

function dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4() : void {
    // let comidaRepository = new ComidaRepository();
    const comida : Comida = new Comida('Tarta de jamón y queso');
    comida.id = 4;
    sinon.stub(comidaRepository, 'buscarComida').returns(comida);
}

function dadoQueSeTienen3ComidasAlmacenadas() {
    const comidas =[
        new Comida('Sopa'),
        new Comida('Milanesa'),
        new Comida('Fideos con crema')
    ];
    sinon.stub(comidaRepository, 'buscarComidas').returns(comidas);
}

describe('Pruebas sobre ComidaService', () => {

    before(() => {
        comidaRepository = new ComidaRepository();
    });

    afterEach(() => {
        sinon.restore;
    })

    it(`Debe retornar una comida de nombre 'Tarta de jamón y queso' dado el id 4`, () => {
        dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4();

        const comidaObtenida = new ComidaService(comidaRepository).obtenerComida(4);

        expect(comidaObtenida.nombre).to.equal('Tarta de jamón y queso');
        expect(comidaObtenida.id).to.equal(4);
    });

    it(`Debe retornar todas las comidas almacenadas`, () => {
        dadoQueSeTienen3ComidasAlmacenadas();

        const comidas = new ComidaService(comidaRepository).obtenerComidas();

        expect(comidas.length).to.equal(3);
    });
})