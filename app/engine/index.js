require('colors')
import httpFactory from './config-http'
import log4js from 'log4js'
const logger = log4js.getLogger('engine')

class Engine {

  constructor(config: any) {
    this.config = config || {}

    let {
      app, config: httpConfig
    } = httpFactory(this.config.http);
    this.app = app
    this.config.http = httpConfig
  }

  start(port: ? number) {
    port = port || this.config.http.port || 3000
    this.httpServer = this.app.listen(port)
    this.port = port
    logger.info('HTTP server started on port: ', port);
  }

  stop() {
    if (this.httpServer) {
      this.httpServer.close()
      logger.info('HTTP server stoped listening port', this.port)
      delete this.httpServer
      delete this.port
    } else {
      logger.warn('HTTP server did not start')
    }
  }
}

export default Engine