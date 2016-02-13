import _ from 'lodash';
import React from 'react';

export default function (mockTagName, props = []) {
  return class extends React.Component {
    render() {
      return (
        <div>{`${mockTagName} ${JSON.stringify(_.pick(this.props, props))}`}</div>
      );
    }
  };
}
