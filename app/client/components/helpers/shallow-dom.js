import React from 'react';
import TestUtils from 'react-addons-test-utils';

export default function createComponent(Component: Function, props: Object = {}) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Component {...props} />);

  return shallowRenderer.getRenderOutput();
}
