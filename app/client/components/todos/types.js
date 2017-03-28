/* @flow */
export type TodoType = { id: ?string, text: ?string, complete: ?boolean };

export type TodoEdgeType = {
  node: TodoType,
};

export type ViewerType = {
  todos: {
    edges: TodoEdgeType[],
  },
  numberOfTodos: number,
};
