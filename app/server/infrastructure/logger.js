import log4js from 'log4js';

log4js.configure({
  appenders: [
    { type: 'console' },
  ],
  replaceConsole: true,
});
