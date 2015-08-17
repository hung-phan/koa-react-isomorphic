'use strict';

export default function* (next) {
  const errorPages = [500, 404, 422];

  try {
    yield next;
  } catch (err) {
    this.type = 'html';
    this.status = err.status || 500;

    if (errorPages.includes(this.status)) {
      this.redirect(`/${this.status}.html`);
    }

    this.app.emit('error', err, this);
  }
}
