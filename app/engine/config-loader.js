import {
  getLogger
}
from 'log4js'

const logger = getLogger('config')

logger.debug("Loading http config")
import koa from 'koa'
import http from '../config/http'
const reversed = {}

// create app instance
const app = koa()

// load basic middlewares (see: https://github.com/cnpm/koa-middlewares)
import km from 'koa-middlewares';

function cascade(...args) {
  let value = void 0

  args.some(fn => {
    try {
      value = fn()
    } catch (ex) {
      // do nothing
    }

    // stop when value is defined
    return !!value
  });

  return value;
}

const middlewaresLength = http.middlewares.orders.length;
logger.debug("trying to load %s middlewares", middlewaresLength)
http.middlewares.orders.forEach((mid, index) => {
  const label = ` >>> [${ index + 1}/${ middlewaresLength }]   ${ mid } loaded in`;
  try {
    // try from koa-middlewares
    console.time(label)
    let middleware = cascade(
      () => reversed[mid], () => km[mid], () => require(mid), () => require(`koa-${ mid }`)
    )


    if (middleware) {
      let mdwCfg = http.middlewares[mid];
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