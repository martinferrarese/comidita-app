import { Comida } from "./comida";

export class Dia {
    id: number;
    nombre: string;
    almuerzo?: Comida;
    cena?: Comida;
}