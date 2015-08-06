'use strict';

import { jsdom }            from 'jsdom';
import assert               from 'assert';
import React, { addons }    from 'react/addons';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

// config React DOM
ExecutionEnvironment.canUseDOM = true;

if (typeof document === 'undefined') {
  global.document = jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
}

const Home          = require('./home');
const { TestUtils } = addons;

describe('Home Component', () => {
  it('should bind to DOM node', () => {

    let component = TestUtils.renderIntoDocument(<Home />);

    assert.equal(component.state.text, 'Click Me!');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(component, 'clickMe')
    );

    assert.equal(component.state.text, '!eM kcilC');
  });
});
