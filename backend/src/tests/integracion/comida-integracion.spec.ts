import 'mocha';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Pruebas de integración sobra Comida', () => {
  it('Debe devolver un status 200 al pedir las comidas sin parámetros', (done) => {
    chai
      .request('http://localhost:8000')
      .get('/api')
      .end((err, res) => {
        expect(res).to.not.be.undefined;
        expect(res).to.not.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
