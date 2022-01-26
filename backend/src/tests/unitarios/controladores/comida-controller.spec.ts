import 'mocha';
import supertest from 'supertest';
import { ComidaController } from '../../../controladores/comida-controller';
import { ComiditaServer } from '../../../network/server';
import sinon, { SinonMock } from 'sinon';
import { ComidaService } from '../../../servicios/comida-service';
import { ComidaRepository } from '../../../repositorios/comida-repository';
import chai from 'chai';
import { Comida } from '../../../modelos/comida';

describe('Pruebas sobre ComidaController', () => {
  describe('GET', () => {
    it('Debe enviar al servicio el id recibido en el query params y recibir un status 200', (done) => {
      const idEnviado: string = '0xssE9';
      const server: ComiditaServer = new ComiditaServer();
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

    it('Debe enviar un null al servicio obtenerComida en /comida y responder con status 200', (done) => {
      const server: ComiditaServer = new ComiditaServer();
      const comidaService: ComidaService = new ComidaService(new ComidaRepository());
      const comidaServiceMock: SinonMock = sinon.mock(comidaService);
      comidaServiceMock.expects('obtenerComida').withArgs(null);
      const comidaController: ComidaController = new ComidaController(comidaService);
      
      server.app.use('/comida', comidaController.router);

      supertest(server.app).get('/comida').expect(200).end((err, res) => {
        comidaServiceMock.verify();
        done();
      });
    });
  });
});
