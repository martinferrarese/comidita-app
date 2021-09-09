import { Comida } from "../modelos/comida";
import { ComidaRepository } from "../repositorios/comida-repository";

export class ComidaService {
    private _comidaRepository : ComidaRepository;

    constructor(comidaRepository: ComidaRepository) {
        this._comidaRepository = comidaRepository;
    }

    public obtenerComida(id: number): Comida {
        return this._comidaRepository.buscarComida(id);
    }

    public obtenerComidas(): Comida[] {
        return this._comidaRepository.buscarComidas();
    }
}