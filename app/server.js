import log4js from 'log4js';
import app from './server-app';

log4js.configure({
  appenders: [
    { type: 'console' },
  ],
  replaceConsole: true,
});

app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`); // eslint-disable-line no-console
