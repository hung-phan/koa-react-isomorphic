/* @flow */
/* global process */
import http from "http";
import app from "./server/infrastructure/app";

const PORT = process.env.PORT || 3000;

export default () => {
  http.createServer(app.callback()).listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`); // eslint-disable-line no-console
  });
};
