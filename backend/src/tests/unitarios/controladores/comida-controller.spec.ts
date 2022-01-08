import 'mocha';
import supertest from 'supertest';
import { App } from '../../../network/server';

describe('Pruebas sobre ComidaController', () => {
  it('Devuelve status 200 al realizar un GET en /comida', (done) => {
    const app = new App().app;
    supertest(app).get('/comida').expect(200, done);
  });
});
