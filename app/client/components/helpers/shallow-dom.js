import React, { addons } from 'react/addons';

const { TestUtils } = addons;

export default function createComponent(Component: Function, props: Object) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Component {...props} />);

  return shallowRenderer.getRenderOutput();
}
