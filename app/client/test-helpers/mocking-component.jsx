import _ from 'lodash';
import React from 'react';

export default (mockTagName, props = []) => (componentProps) =>
  (<div>{`${mockTagName} ${JSON.stringify(_.pick(componentProps, props))}`}</div>);
