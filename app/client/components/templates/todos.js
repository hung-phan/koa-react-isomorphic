import React from 'react';
import Relay from 'react-relay';
import TodosHeader from './../todos/todos-header';

export class Todos extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
  };

  render() {
    console.log(this.props.viewer);

    return (
      <div className='container'>
        <div className='row'>
          <TodosHeader />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Todos, {
  initialVariables: {
    first: 5,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        todos(first: $first) {
          edges {
            node {
              id
              text
              complete
            }
          }
        }
      }
    `,
  },
});
