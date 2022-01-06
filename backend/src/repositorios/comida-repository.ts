import { Comida } from '../modelos/comida';

export class ComidaRepository {
  public buscarComida(comida: Comida): Comida[] {
    return [comida];
  }

  public buscarComidas(): Comida[] {
    return [];
  }

  public almacenarComida(nuevaComida: Comida): Comida {
    return nuevaComida;
  }
}
