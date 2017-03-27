import { assert } from 'chai';
import { getUrl } from '../handleHTTP';

describe('Helper: getUrl', () => {
  it('should be defined', () => {
    assert.ok(getUrl);
  });

  it('should be a function', () => {
    assert.isFunction(getUrl);
  });

  it("should return url '/api/v1/todos' in client environment", () => {
    process.env.RUNTIME_ENV = 'client';

    const url = '/api/v1/todos';
    assert.equal(getUrl(url), url);
  });

  it(`should return url 'http://localhost:${process.env.PORT}/api/v1/todos' in server environment`, () => {
    process.env.RUNTIME_ENV = 'server';

    const url = '/api/v1/todos';
    assert.equal(getUrl(url), `http://localhost:${process.env.PORT}${url}`);
  });
});
