import express from 'express';
import { Server } from 'http';
import { Router } from '../network/router';

export class App {
  public app = express();
  private _server = new Server(this.app);
  private _router: Router;

  constructor() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false,
      }),
    );

    this._router = new Router();
    this._router.initControllers(this.app);
  }

  public initApp(port: number): void {
    // TODO Cambiar console.log por el "health"
    this._server.listen(port, () => {
      console.log('Comidita API escuchando en http://localhost:8000');
    });
  }
}
