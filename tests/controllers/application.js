import { assert } from 'chai';
import corequest from 'co-supertest';
import app from 'app/server-index';

describe('Controller: application', () => {
  const request = corequest(app.listen());

  it('should render Todos page', function *() {
    const result = yield request
                          .get('/')
                          .set('Accept', 'text/html')
                          .expect(200);

    assert.ok(result.text);
    assert.include(result.text, `id="app"`);
  });
});
