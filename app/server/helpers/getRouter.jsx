/* @flow */
import { getFarceResult } from "found/lib/server";
import { routeConfig, render } from "../../routes";
import createApi from "../../shared/helpers/createApi";

export default async (url: string) => {
  const Api = createApi();
  const result = await getFarceResult({
    url,
    historyMiddlewares: Api.historyMiddlewares,
    resolver: Api.resolver,
    routeConfig,
    render,
  });

  return {
    ...result,
    Api
  };
};

