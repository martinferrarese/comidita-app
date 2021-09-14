export class Comida {
  private _id = 0;

  private _nombre: string;

  constructor(nombreDeComida: string) {
    this._nombre = nombreDeComida;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  get nombre(): string {
    return this._nombre;
  }

  set id(idASetear: number) {
    this._id = idASetear;
  }

  get id(): number {
    return this._id;
  }
}
