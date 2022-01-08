import express, { Router } from 'express';
import { Comida } from '../modelos/comida';
import { ComidaRepository } from '../repositorios/comida-repository';
import { ComidaService } from '../servicios/comida-service';

export class ComidaController {
  private _comidaService: ComidaService;
  private _router: Router = express.Router();

  constructor() {
    this._comidaService = new ComidaService(new ComidaRepository());
    this._router = express.Router();

    this._router.get('/', async (req, res) => {
      try {
        res.sendStatus(200);
      } catch (error) {}
    });
  }

  get router(): Router {
    return this._router;
  }
}
