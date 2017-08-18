/* @flow */
import React from "react";
import BrowserProtocol from "farce/lib/BrowserProtocol";
import { createInitialFarceRouter } from "found";
import { routeConfig, render } from "../../routes";
import { Api } from "./singletons";

export default async () => {
  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares: Api.historyMiddlewares,
    resolver: Api.resolver,
    routeConfig,
    render
  });

  return <Router resolver={Api.resolver} />;
};
