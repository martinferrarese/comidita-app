import 'mocha';
import { expect } from 'chai';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import { Comida } from '../../../modelos/comida';

function dadoQueTengoUnaNuevaComidaParaAlmacenar(): Comida {
  let comida: Comida = new Comida();
  comida.nombre = 'Papas al horno';
  return comida;
}

function entoncesLaComidaFueAlmacenada(
  comidaAlmacenada: Comida,
  nuevaComida: Comida,
): void {
  expect(comidaAlmacenada.nombre).to.equal(nuevaComida.nombre);
}

describe(`Pruebas sobre ComidaRepository`, () => {
  it(`Debe almacenar una nueva comida`, () => {
    const nuevaComida = dadoQueTengoUnaNuevaComidaParaAlmacenar();

    const comidaAlmacenada = new ComidaRepository().almacenarComida(
      nuevaComida,
    );

    entoncesLaComidaFueAlmacenada(nuevaComida, comidaAlmacenada);
  });
});
