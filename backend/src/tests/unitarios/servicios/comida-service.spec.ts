import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { Comida } from '../../../modelos/comida';
import { ComidaService } from '../../../servicios/comida-service';

function dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4() : ComidaRepository {
    let comidaRepository = new ComidaRepository();
    const comida : Comida = new Comida('Tarta de jamón y queso');
    comida.id = 4;
    sinon.stub(comidaRepository, 'buscarComida').returns(comida);
    return comidaRepository;
}

describe('Pruebas sobre ComidaService', () => {
    it(`Debe retornar una comida de nombre 'Tarta de jamón y queso' dado el id 4`, () => {
        let comidaRepository = dadoQueSeTieneUnaTartaDeJamonYQuesoAlmacenadaConId4();

        const comidaObtenida : Comida = new ComidaService(comidaRepository).obtenerComida(4);

        expect(comidaObtenida.nombre).to.equal('Tarta de jamón y queso');
        expect(comidaObtenida.id).to.equal(4);
    })
})