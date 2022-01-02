import { Comida } from '../modelos/comida';
import { ComidaService } from '../servicios/comida-service';

export class ComidaController {
  private _comidaService: ComidaService;

  constructor(comidaService: ComidaService) {
    this._comidaService = comidaService;
  }

  public obtenerComidas(filtroComida: Comida): Comida[] {
    return this._comidaService.obtenerComidas();
  }
}
