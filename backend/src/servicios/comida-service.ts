import { Comida } from '../modelos/comida';
import { ComidaRepository } from '../repositorios/comida-repository';

export class ComidaService {
  private _comidaRepository: ComidaRepository;

  constructor(comidaRepository: ComidaRepository) {
    this._comidaRepository = comidaRepository;
  }

  public obtenerComida(idComida: string | null): Comida[] {
    let filtro: unknown = {};
    if (idComida) {
      filtro = {
        id: idComida,
      };
    }
    return this._comidaRepository.buscarComida(filtro);
  }

  public obtenerComidas(): Comida[] {
    return this._comidaRepository.buscarComidas();
  }
}
