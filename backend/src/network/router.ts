import { ComidaController } from '../controladores/comida-controller';
import { Express } from 'express';

export class Router {
  private _comidaController: ComidaController = new ComidaController(null);

  public initControllers(server: Express): void {
    server.use('/comida', this._comidaController.router);
  }
}
