export type TodoType = { text: string, complete: boolean };

export type AddTodoActionType = (text: string) => { payload: string };
export type RemoveTodoActionType = (index: number) => { payload: number };
export type CompleteTodoActionType = (index: number) => { payload: number };
export type SetTodosActionType = (todos: TodoType[]) => { payload: TodoType[] };
