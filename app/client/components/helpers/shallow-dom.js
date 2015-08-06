'use strict';

import React, { addons } from 'react/addons';

const { TestUtils } = addons;

export default function createComponent(Component, props) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Component {...props} />);

  return shallowRenderer.getRenderOutput();
}
