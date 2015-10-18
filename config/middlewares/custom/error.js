import http     from 'http';
import debug    from 'debug';
import nunjucks from 'nunjucks';
import settings from 'config/initializers/settings';

export default function error(opts = {}) {
  return function *error(next){
    try {
      yield next;

      if (this.response.status === 404 && !this.response.body) {
        this.throw(404);
      }
    } catch (err) {
      this.status = err.status || 500;

      // application
      this.app.emit('error', err, this);

      // accepted types
      switch (this.accepts('html', 'text', 'json')) {
      case 'text':
        this.type = 'text/plain';
        if (process.env.NODE_ENV === 'development' || err.expose) {
          this.body = err.message;
        } else {
          throw err;
        }
        break;

      case 'json':
        this.type = 'application/json';
        if (process.env.NODE_ENV === 'development' || err.expose) {
          this.body = {
            error: err.message
          };
        } else {
          this.body = {
            error: http.STATUS_CODES[this.status]
          };
        }
        break;

      case 'html':
        this.type = 'text/html';
        if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
          this.body = nunjucks.render('application/error.html', {
            ...settings, ctx: this, request: this.request, response: this.response,
            status: this.status, error: err.message, stack: err.stack, code: err.code
          });
        } else {
          if ([404, 422].includes(this.status)) {
            this.redirect(`/${this.status}.html`);
          } else {
            this.redirect('/500.html');
          }
        }
        break;
      }
    }
  };
}
