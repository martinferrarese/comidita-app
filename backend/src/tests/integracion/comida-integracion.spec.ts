import 'mocha';
import 'chai';
//import app from '../../server';
import { expect } from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Pruebas de integración sobra Comida', () => {
  it('Debe devolver un status 200 al pedir las comidas sin parámetros', () => {
    chai
      .request(app)
      .get('/comida')
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });
});
