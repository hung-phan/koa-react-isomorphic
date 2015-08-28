import 'app/client/components/helpers/jsdom-support.js';

import { assert }        from 'chai';
import React, { addons } from 'react/addons';
import { Provider }      from 'react-redux';
import configureStore    from 'app/client/stores/index';
import app               from './app';

class Handler extends React.Component {
  render() {
    return (
      <div>Handler component</div>
    );
  }
}

describe('app', () => {
  const { TestUtils } = addons;
  const store = configureStore();

  it('should be a function', () => {
    assert.isFunction(app);
  });

  it('should render Provider component and bind the store to it', () => {
    const component = TestUtils.renderIntoDocument(app(store, Handler, {}));
    const providerComponent = TestUtils.findRenderedComponentWithType(component, Provider);

    assert.ok(providerComponent);
    assert.ok(providerComponent.props.store);
  });

  it('should render Handler component', () => {
    const component = TestUtils.renderIntoDocument(app(store, Handler, {}));
    const innerHTML = React.findDOMNode(component).innerHTML;

    assert.include(innerHTML, 'Handler component');
  });
});
