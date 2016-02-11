/* eslint no-console: [0] */
import 'babel-polyfill';

import app from './server-init';
import log4js from 'log4js';

log4js.configure({
  appenders: [
    { type: 'console' },
  ],
  replaceConsole: true,
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
