/* @flow */
/* global process */
import app from "./server/infrastructure/app";

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.info(`Server listening on port ${PORT}`); // eslint-disable-line no-console
