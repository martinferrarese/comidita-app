import { Comida } from '../modelos/comida';
import { ComidaRepository } from '../repositorios/comida-repository';

export class ComidaService {
  private _comidaRepository: ComidaRepository;

  constructor(comidaRepository: ComidaRepository) {
    this._comidaRepository = comidaRepository;
  }

  public obtenerComida(id: number | null): Comida[] {
    return this._comidaRepository.buscarComida({});
  }

  public obtenerComidas(): Comida[] {
    return this._comidaRepository.buscarComidas();
  }
}
