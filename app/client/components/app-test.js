import 'app/client/components/helpers/jsdom-support.js';

import { assert }        from 'chai';
import React, { addons } from 'react/addons';
import stubRouterContext from 'app/client/components/helpers/stub-router-context';
import App               from './app';

describe('App Component', () => {
  const { TestUtils } = addons;
  const AppComponent = stubRouterContext(App);

  it('should be defined', () => {
    const component = TestUtils.renderIntoDocument(<AppComponent />);

    assert.ok(component);
  });

  it('should contain RouteHandler component', () => {
    const component = TestUtils.renderIntoDocument(<AppComponent />);
    const innerHTML = React.findDOMNode(component).innerHTML;

    assert.ok(innerHTML.indexOf('script') !== -1);
  });
});
