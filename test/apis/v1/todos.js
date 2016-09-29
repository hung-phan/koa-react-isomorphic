import { assert } from 'chai';
import supertest from 'supertest';
import app from 'app/server-app';

describe('API: v1/todos', () => {
  const request = supertest(app.listen());

  it('should return json todos when calling GET request', async () => {
    const expected = [
      { text: 'Todo 1', complete: false },
      { text: 'Todo 2', complete: false },
      { text: 'Todo 3', complete: false },
    ];
    const result = await
      request
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

    assert.deepEqual(result.body, expected);
  });
});
