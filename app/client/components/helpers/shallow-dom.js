'use strict';
import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

export default function createComponent(Component, props) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Component {...props} />);

  return shallowRenderer.getRenderOutput();
}
