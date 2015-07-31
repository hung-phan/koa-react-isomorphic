'use strict';

import 'app/client/components/helpers/jsdom-support.js';

import { assert }        from 'chai';
import React, { addons } from 'react/addons';
import Home              from './home';

describe('Home Component', () => {
  const { TestUtils } = addons;

  it('should be defined', () => {
    const component = TestUtils.renderIntoDocument(<Home />);

    assert.ok(component);
  });

  it('should bind interaction to DOM node', () => {
    const component = TestUtils.renderIntoDocument(<Home />);

    assert.equal(component.state.text, 'Click Me!');

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(component, 'clickMe')
    );

    assert.equal(component.state.text, '!eM kcilC');
  });
});
