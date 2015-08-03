'use strict';

import { Component } from 'react/addons';

export function Enhance(ComposedComponent: Component, mixins: Array<Component>): Component {
  return mixins.reduce((ComposedComponent, Mixin) => {
    return class extends Mixin {
      render() {
        return <ComposedComponent {...this.props} {...this.state} />;
      }
    }
  }, ComposedComponent);
}
