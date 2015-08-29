import { assert } from 'chai';
import getUrl     from './get-url';

describe('Helper: getUrl', () => {
  it('should be defined', () => {
    assert.ok(getUrl);
  });

  it('should be a function', () => {
    assert.isFunction(getUrl);
  });

  it("should return url '/api/v1/todos' in client environment", () => {
    process.env.runtimeEnv = 'client';

    const url = '/api/v1/todos';
    assert.equal(getUrl(url), url);
  });

  it("should return url 'http://localhost:3000/api/v1/todos' in server environment", () => {
    process.env.PORT = 3000;
    process.env.runtimeEnv = 'server';

    const url = '/api/v1/todos';
    assert.equal(getUrl(url), `http://localhost:3000${url}`);
  });
});
