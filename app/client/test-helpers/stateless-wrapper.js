import React from 'react';

export default function (Element) {
  class StatelessWrapper extends React.Component {
    render() {
      return Element;
    }
  }

  return <StatelessWrapper />;
}
