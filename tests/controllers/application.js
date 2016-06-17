import { assert } from 'chai';
import supertest from 'supertest';
import app from 'app/server-app';

describe('Controller: application', () => {
  const request = supertest(app.listen());

  it('should render Todos page', async () => {
    const result = await request
                          .get('/')
                          .set('Accept', 'text/html')
                          .expect(200);

    assert.ok(result.text);
    assert.include(result.text, 'Todos List');
  });

  it('should render Static page', async () => {
    const result = await request
                          .get('/static-page')
                          .set('Accept', 'text/html')
                          .expect(200);

    assert.ok(result.text);
    assert.include(result.text, 'Static Page');
  });
});
