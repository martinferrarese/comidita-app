import express from 'express';
import { Server } from 'http';
const app = express();
const server = new Server(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
// TODO Cambiar console.log por el "health"
server.listen(8000, () => {
  console.log('Comidita API escuchando en http://localhost:8000');
});
