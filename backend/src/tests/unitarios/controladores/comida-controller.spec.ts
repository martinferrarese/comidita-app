import 'mocha';
import supertest from 'supertest';
import { App } from '../../../server';

describe('Pruebas sobre ComidaController', () => {
  it('Devuelve status 200 al interactuar con /api', (done) => {
    const app = new App().app;
    supertest(app).get('/api').expect({ message: 'Alooooo' }).expect(200, done);
  });
});
