/* @flow */
/* global process */
import './server/infrastructure';
import app from './server/infrastructure/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
