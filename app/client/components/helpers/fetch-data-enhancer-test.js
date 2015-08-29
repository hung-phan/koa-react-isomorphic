import React, { addons } from 'react/addons';
import { assert }        from 'chai';
import sinon             from 'sinon';
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

  it("should define a static 'fetchData' method on Handler component", () => {
    const callback = sinon.spy();
    assert.property(fetchDataEnhancer(callback)(Handler), 'fetchData');
  });

  it('should pass all properties from parent component to the composed component', () => {
    const callback = sinon.spy();
    const Component = fetchDataEnhancer(callback)(Handler);
    const component = TestUtils.renderIntoDocument(<Component message='Hello world' />);
    const innerHTML = React.findDOMNode(component).innerHTML;

    assert.include(innerHTML, 'Hello world');
  });
});
