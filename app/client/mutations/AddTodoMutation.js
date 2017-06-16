/* @flow */
/* eslint-disable class-methods-use-this */
import Relay from "react-relay/classic";

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`
  };

  getMutation() {
    return Relay.QL`mutation { addTodo }`;
  }

  getVariables() {
    return { text: this.props.text };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoMutationPayload {
        todoEdge
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
        type: "RANGE_ADD",
        parentName: "viewer",
        parentID: this.props.viewer.id,
        connectionName: "todos",
        edgeName: "todoEdge",
        rangeBehaviors: {
          "": "append"
        }
      }
    ];
  }

  getOptimisticResponse() {
    return {
      todoEdge: {
        node: {
          complete: false,
          text: this.props.text
        }
      },
      viewer: {
        numberOfTodos: this.props.viewer.numberOfTodos + 1
      }
    };
  }
}
