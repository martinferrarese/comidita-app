import { ObjectId } from 'mongoose';

export class Comida {
  private _id?: ObjectId;
  private _nombre: string;

  constructor() {
    this._nombre = '';
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  get nombre(): string {
    return this._nombre;
  }

  set id(idASetear: ObjectId | undefined) {
    this._id = idASetear;
  }

  get id(): ObjectId | undefined {
    return this._id;
  }
}
