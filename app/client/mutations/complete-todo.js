import Relay from 'react-relay';

class CompleteTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
  };

  getMutation() { // eslint-disable-line
    return Relay.QL`mutation { completeTodo }`;
  }

  getVariables() {
    return { id: this.props.todo.id };
  }

  getFatQuery() { // eslint-disable-line
    return Relay.QL`
      fragment on CompleteTodoMutationPayload {
        todo
        viewer {
          todos
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          todo: this.props.todo.id,
          viewer: this.props.viewer.id,
        },
      },
    ];
  }
}

export default CompleteTodoMutation;
