import { Comida } from "../modelos/comida";

export class ComidaRepository {
    constructor() {}

    public buscarComida(id:number) : Comida {
        return new Comida('');
    }

    public buscarComidas(): Comida[] {
        return [];
    }
}