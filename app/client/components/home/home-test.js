'use strict';

import React from 'react/addons';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import assert from 'assert';
import { jsdom } from 'jsdom';

// config React DOM
ExecutionEnvironment.canUseDOM = true;

if (typeof document === 'undefined') {
  global.document = jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
}

const Home = require('./home');
const { TestUtils } = React.addons;

describe('Home Component', () => {
  it('should bind to DOM node', () => {

    let component = TestUtils.renderIntoDocument(
      React.createElement(Home)
    );

    assert.equal(component.state.text, 'Click Me!');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(component, 'clickMe')
    );

    assert.equal(component.state.text, '!eM kcilC');
  });
});
