/* eslint no-console: [0] */
import 'babel-polyfill';

import app from './server-init';
import log4js from 'log4js';
import Relay from 'react-relay';

log4js.configure({
  appenders: [
    { type: 'console' },
  ],
  replaceConsole: true,
});

const PORT = process.env.PORT || 3000;

if (process.env.SERVER_RENDERING) {
  // inject Relay network request
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(`http://localhost:${PORT}/graphql`)
  );
}

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
