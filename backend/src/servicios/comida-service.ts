import { Comida } from '../modelos/comida';
import { ComidaRepository } from '../repositorios/comida-repository';

export class ComidaService {
  private _comidaRepository: ComidaRepository;

  constructor(comidaRepository: ComidaRepository) {
    this._comidaRepository = comidaRepository;
  }

  public obtenerComida(idComida: string | null): Promise<Comida[]> {
    return new Promise((resolve) => {
      let filtro: unknown = {};
      if (idComida) {
        filtro = {
          id: idComida,
        };
      }
      const comidas = [new Comida(), new Comida()];
      resolve(comidas);
      // resolve(this._comidaRepository.buscarComida(filtro));
    });
  }
}
