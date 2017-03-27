import supertest from 'supertest';
import app from '../../../app/server/infrastructure/app';

describe('API: v1/todos', () => {
  const request = supertest(app.listen());

  it('should return json todos when calling GET request', async () => {
    await
      request
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
  });
});
