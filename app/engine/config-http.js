import {
  getLogger
}
from 'log4js'

const logger = getLogger('config')

logger.debug("Loading http config")
import koa from 'koa'

// load basic middlewares (see: https://github.com/cnpm/koa-middlewares)
import km from 'koa-middlewares'

// load default config
import http from '../config/http'

// engine-specific middlewares
const reversed = {}
const routerLayer = km.router()
reversed.router = routerLayer.routes

const factory = (config) => {
  config = {
    ...http,
    config
  }

  // create app instance
  const app = koa()


  function cascade(...args) {
    let value = void 0

    args.some(fn => {
      try {
        value = fn()
      } catch (ex) {
        logger.warn(ex, fn.toString())
          // do nothing
      }

      // stop when value is defined
      return !!value
    });

    return value;
  }

  const middlewaresLength = config.middlewares.orders.length;
  logger.debug("trying to load %s middlewares", middlewaresLength)
  config.middlewares.orders.forEach((mid, index) => {
    const label = ` >>> [${ index + 1}/${ middlewaresLength }] ${ mid.bold } loaded in`;
    try {
      const req = require.context('../../node_modules/', false)
        // try from koa-middlewares
      console.time(label)
      const tryRequire = [
        () => reversed[mid],
        () => km[mid],
        () => req('external!node_modules/' + mid)
      ]
      let middleware = cascade(...tryRequire)


      if (middleware) {
        let mdwCfg = config.middlewares[mid];
        // console.log('mdwCfg', mid, mdwCfg);
        let params = [];
        if (mdwCfg) {
          if (typeof mdwCfg === 'function') {
            params = mdwCfg(app)
          } else {
            params = mdwCfg
          }
        }

        // logger.trace("Using %s with params: ", mid, params)
        app.use(middleware(...params));
      } else {
        logger.warn(`middleware [${ mid }] cannot load: Not found`)
      }

    } catch (ex) {
      logger.warn(`middlware [${ mid }] cannot load`, ex)
    } finally {
      console.timeEnd(label)
    }
  });

  return {
    app, config
  }
}

export default factory