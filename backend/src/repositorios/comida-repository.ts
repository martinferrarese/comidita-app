import { Comida } from '../modelos/comida';

export class ComidaRepository {
  public buscarComida(filtro: Object): Comida[] {
    return [new Comida()];
  }

  public buscarComidas(): Comida[] {
    return [];
  }

  public almacenarComida(nuevaComida: Comida): Comida {
    return nuevaComida;
  }
}
