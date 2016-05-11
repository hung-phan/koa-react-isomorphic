import React from 'react';
import Relay from 'react-relay';

/* eslint-disable react/prefer-stateless-function */
export class Todos extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          {JSON.stringify(this.props.viewer)}
        </div>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export default Relay.createContainer(Todos, {
  initialVariables: {
    numberOfTodos: 10,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        todos(first: $numberOfTodos) {
          edges {
            node {
              text
            }
          }
        }
      }
    `,
  },
});
