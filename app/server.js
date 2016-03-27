import 'babel-polyfill';
import log4js from 'log4js';
import Relay from 'react-relay';
import app from './server-app';

log4js.configure({
  appenders: [
    { type: 'console' },
  ],
  replaceConsole: true,
});

if (process.env.SERVER_RENDERING) {
  // inject Relay network request
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`http://localhost:${process.env.PORT}/graphql`)
  );
}

app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`); // eslint-disable-line no-console
