import { assert } from 'chai';
import corequest from 'co-supertest';
import app from 'app/server-init';

describe('API: v1/todos', () => {
  const request = corequest(app.listen());

  it('should return json todos when calling GET request', function *() {
    const expected = [
      { text: 'Todo 1', complete: false },
      { text: 'Todo 2', complete: false },
      { text: 'Todo 3', complete: false }
    ];
    const result = yield request
                          .get('/api/v1/todos')
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          .expect(200)
                          .end();

    assert.deepEqual(result.body, expected);
  });
});
