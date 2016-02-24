import Relay from 'react-relay';

class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
  };

  getMutation() {
    return Relay.QL`mutation { removeTodo }`;
  }

  getVariables() {
    return { id: this.props.todo.id };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoMutationPayload {
        id
        viewer {
          todos
          numberOfTodos
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'todos',
        deletedIDFieldName: 'id',
      },
    ];
  }

  getOptimisticResponse() {
    return {
      id: this.props.todo.id,
      viewer: {
        numberOfTodos: this.props.viewer.numberOfTodos - 1,
      },
    };
  }
}

export default RemoveTodoMutation;
