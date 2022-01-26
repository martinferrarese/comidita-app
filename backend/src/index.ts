import { ComiditaServer } from './network/server';

const app: ComiditaServer = new ComiditaServer();
const port = 8000;
app.initApp(port);
