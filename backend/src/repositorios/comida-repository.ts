import { Comida } from '../modelos/comida';

export class ComidaRepository {
  public buscarComida(id: number | null): Comida[] {
    const comida: Comida[] = [new Comida('')];
    return comida;
  }

  public buscarComidas(): Comida[] {
    return [];
  }

  public almacenarComida(nuevaComida: Comida): Comida {
    return nuevaComida;
  }
}
