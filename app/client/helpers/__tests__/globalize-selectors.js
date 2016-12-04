import td from 'testdouble';
import { Map } from 'immutable';
import globalizeSelectors from './../globalize-selectors';

describe('Helper: localize-module', () => {
  it('should return a selector function with state mounted to the local modules', () => {
    const mountPoint = 'todos';
    const selector1 = td.function();
    const selectors = globalizeSelectors({ selector1 }, mountPoint);

    selectors.selector1(Map({
      [mountPoint]: [
        { complete: false, text: 'Todo 1' },
        { complete: false, text: 'Todo 2' },
        { complete: false, text: 'Todo 3' },
      ]
    }));

    td.verify(selector1([
      { complete: false, text: 'Todo 1' },
      { complete: false, text: 'Todo 2' },
      { complete: false, text: 'Todo 3' },
    ]));
  });
});
