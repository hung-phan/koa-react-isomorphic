import _ from 'lodash';
import React from 'react';

export default (mockTagName, props = []) => () =>
  (<div>{`${mockTagName} ${JSON.stringify(_.pick(this.props, props))}`}</div>);
