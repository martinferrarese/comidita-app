import { Comida } from '../modelos/comida';

export class ComidaRepository {
  public buscarComida(id: number): Comida {
    const comida = new Comida('');
    comida.id = id;
    return comida;
  }

  public buscarComidas(): Comida[] {
    return [];
  }
}
