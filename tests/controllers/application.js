import { assert } from 'chai';
import supertest from 'supertest';
import app from 'app/server-app';

describe('Controller: application', function() {
  this.timeout(5000);
  const request = supertest(app.listen());

  it('should render single page', async () => {
    const result = await
      request
        .get('/')
        .set('Accept', 'text/html')
        .expect(200);

    assert.ok(result.text);
    assert.include(result.text, 'id="app"');
  });
});
