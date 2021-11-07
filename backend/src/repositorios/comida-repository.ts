import { Comida } from '../modelos/comida';

export class ComidaRepository {
  public buscarComida(id: number): Comida {
    const comida = new Comida('');
    return comida;
  }

  public buscarComidas(): Comida[] {
    return [];
  }

  public almacenarComida(nuevaComida: Comida): Comida {
    return nuevaComida;
  }
}
