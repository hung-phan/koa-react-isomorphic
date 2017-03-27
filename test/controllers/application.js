import { assert } from 'chai';
import supertest from 'supertest';
import app from '../../app/server/infrastructure/app';

describe('Controller: application', function applicationTest() {
  const request = supertest(app.listen());
  this.timeout(5000);

  it('should render single page', async () => {
    const result = await
      request
        .get('/')
        .set('Accept', 'text/html')
        .set('X-CSRF-Token', process.env.SECRET_KEY.toString('base64'))
        .expect(200);

    assert.ok(result.text);
    assert.include(result.text, 'id="app"');
  });
});
