import { App } from './src/network/server';

const app: App = new App();
const port = 8000;
app.initApp(port);
