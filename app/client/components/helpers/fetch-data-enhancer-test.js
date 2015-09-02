import { assert } from 'chai';
import sinon from 'sinon';
import React, { addons } from 'react/addons';
import fetchDataEnhancer from './fetch-data-enhancer';

class Handler extends React.Component {
  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

describe('Helper: fetchDataEnhancer', () => {
  const { TestUtils } = addons;

  it('should be a function', () => {
    assert.ok(fetchDataEnhancer);
    assert.isFunction(fetchDataEnhancer);
  });

  it("should define a static 'fetchData' method on ComposedComponent", () => {
    const callback = sinon.spy();
    assert.property(fetchDataEnhancer(callback)(Handler), 'fetchData');
  });

  it('should pass all properties from parent component to the ComposedComponent', () => {
    const callback = sinon.spy();
    const Component = fetchDataEnhancer(callback)(Handler);
    const component = TestUtils.renderIntoDocument(<Component message='Hello world' />);
    const innerHTML = React.findDOMNode(component).innerHTML;

    assert.include(innerHTML, 'Hello world');
  });

  it("should passing 'store', and 'params' to the 'fetchData' function", () => {
    const callback = sinon.spy();
    const fakeStore = { todos: [] };
    const fakeParams = { query: '/' };
    const Component = fetchDataEnhancer(callback)(Handler);

    Component.fetchData(fakeStore, fakeParams);

    assert(callback.called);
    assert(callback.calledWith(fakeStore, fakeParams));
  });
});
