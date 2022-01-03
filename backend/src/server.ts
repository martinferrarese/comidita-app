import express from 'express';
import { Server } from 'http';

export class App {
  private _app = express();
  private _server = new Server(this._app);

  constructor() {
    this._app.use(express.json());
    this._app.use(
      express.urlencoded({
        extended: false,
      }),
    );
  }

  public initApp(port: number): void {
    // TODO Cambiar console.log por el "health"
    this._server.listen(port, () => {
      console.log('Comidita API escuchando en http://localhost:8000');
    });
  }
}
