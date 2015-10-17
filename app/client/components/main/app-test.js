import 'app/client/components/helpers/jsdom-support.js';

import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import wrapStateless from './../helpers/stateless-wrapper';
import configureStore from 'app/client/stores/index';
import App from './app';

class Handler extends React.Component {
  render() {
    return (
      <div>Handler component</div>
    );
  }
}

describe('Main: App', () => {
  const store = configureStore();
  const routes = <Handler />;
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      wrapStateless(<App store={store} routes={routes} />)
    );
  });

  it('should be a function', () => {
    assert.ok(App);
    assert.isFunction(App);
  });

  it("should render 'Provider' component with the current store", () => {
    const providerComponent = TestUtils.findRenderedComponentWithType(component, Provider);

    assert.ok(providerComponent);
    assert.ok(providerComponent.props.store);
  });

  it("should render 'Handler' component", () => {
    const innerHTML = ReactDOM.findDOMNode(component).innerHTML;

    assert.include(innerHTML, 'Handler component');
  });
});
