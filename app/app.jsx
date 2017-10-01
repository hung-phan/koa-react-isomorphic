/* @flow */
/* global process */
import "./client/loadExternalLibs";
import initialize from "./share/helpers/initialize";

initialize(document.getElementById("app")).catch(console.error); // eslint-disable-line

if (process.env.NODE_ENV === "production") {
  const runtime = require("offline-plugin/runtime");

  runtime.install({
    onUpdating: () => {
      console.log("SW Event:", "onUpdating"); // eslint-disable-line
    },
    onUpdateReady: () => {
      console.log("SW Event:", "onUpdateReady"); // eslint-disable-line
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log("SW Event:", "onUpdated"); // eslint-disable-line
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log("SW Event:", "onUpdateFailed"); // eslint-disable-line
    }
  });
}
