/* @flow */
import Rx from "rxjs/Rx";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/app";

export const helmetObserver = new Rx.Subject();

export const UPDATE_HEADER_HOOK = "UPDATE_HEADER_HOOK";

export default (router: Object, domNode: Object) => {
  ReactDOM.render(<App router={router} />, domNode);
};
