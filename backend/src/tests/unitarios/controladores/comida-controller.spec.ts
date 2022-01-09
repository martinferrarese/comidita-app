import 'mocha';
import supertest from 'supertest';
import { ComidaController } from '../../../controladores/comida-controller';
import { ComiditaServer } from '../../../network/server';
import sinon, { SinonMock } from 'sinon';
import { ComidaService } from '../../../servicios/comida-service';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import chai from 'chai';

describe('Pruebas sobre ComidaController', () => {
  describe('GET', () => {
    it('Debe enviar al servicio el id recibido en el query params', (done) => {
      const idEnviado: string = '0xssE9';
      const server = new ComiditaServer();
      const comidaService: ComidaService = new ComidaService(new ComidaRepository());
      const comidaServiceMock: SinonMock = sinon.mock(comidaService);
      comidaServiceMock.expects('obtenerComida').withArgs(idEnviado);
      const comidaController = new ComidaController(comidaService);

      server.app.use('/comida', comidaController.router);

      supertest(server.app).get(`/comida/${idEnviado}`).expect(200).end((err, res) => {
        comidaServiceMock.verify();
        done();
      });
    });
  });
});
