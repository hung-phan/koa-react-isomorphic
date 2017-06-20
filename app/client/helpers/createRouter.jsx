/* @flow */
import React from "react";
import BrowserProtocol from "farce/lib/BrowserProtocol";
import createInitialFarceRouter from "found/lib/createInitialFarceRouter";
import { routeConfig, render } from "../../routes";

export default async (Api: Object) => {
  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares: Api.historyMiddlewares,
    resolver: Api.resolver,
    routeConfig,
    render
  });
  return <Router resolver={Api.resolver} />;
};
