import express from 'express';
import { Server } from 'http';

export class App {
  public app = express();
  private _server = new Server(this.app);

  constructor() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false,
      }),
    );

    this.app.get('/api', async (req, res) => {
      try {
        res.status(200).json({ message: 'Alooooo' });
      } catch (error) {}
    });
  }

  public initApp(port: number): void {
    // TODO Cambiar console.log por el "health"
    this._server.listen(port, () => {
      console.log('Comidita API escuchando en http://localhost:8000');
    });
  }
}
