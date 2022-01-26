import express, { Router } from 'express';
import { Comida } from '../modelos/comida';
import { ComidaRepository } from '../repositorios/comida-repository';
import { ComidaService } from '../servicios/comida-service';

export class ComidaController {
  private _comidaService: ComidaService;
  private _router: Router = express.Router();

  constructor(comidaService: ComidaService | null) {
    this._comidaService = comidaService
      ? comidaService
      : new ComidaService(new ComidaRepository());
    this._router = express.Router();

    this._router.get('/:idComida', async (req, res) => {
      try {
        const respuesta: Comida[] = await this._comidaService.obtenerComida(
          req.params.idComida,
        );
        res.sendStatus(200).send(respuesta);
      } catch (error) {
        res.sendStatus(500).send(error);
      }
    });

    this._router.get('/', async (req, res) => {
      try {
        const respuesta = await this._comidaService.obtenerComida(null);
        res.sendStatus(200).send(respuesta);
      } catch (error) {}
    });
  }

  get router(): Router {
    return this._router;
  }
}
