export type TodoType = { id: ?string, text: ?string, complete: ?boolean };

export type ViewerType = {
  todos: {
    edges: TodoType[],
  },
  numberOfTodos: number,
};
