import 'mocha';
import { expect } from 'chai';
import { ComidaRepository } from '../../repositorios/comida-repository';
import { Comida } from '../../modelos/comida';
import { config } from 'dotenv';

config({path: '.env'});

const db = require('mongoose');
db.Promise = global.Promise;

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

  before(async() => {
    try {
      db.connect(process.env.DB_URI, {
        useNewUrlParser: true
      });
    } catch (error) {
      console.log('No se pudo conectar con la base de datos de testing');
    }
  });

  after(() => {
    db.connection.close();
  });

  it(`Debe almacenar una nueva comida`, () => {
    const nuevaComida = dadoQueTengoUnaNuevaComidaParaAlmacenar();

    const comidaAlmacenada = new ComidaRepository().almacenarComida(
      nuevaComida,
    );

    entoncesLaComidaFueAlmacenada(nuevaComida, comidaAlmacenada);
  });
});
