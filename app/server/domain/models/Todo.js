/* @flow */
export default class Todo {
  id: string;
  text: string;
  complete: boolean;

  constructor({
    id,
    text,
    complete
  }: {
    id: string,
    text: string,
    complete: boolean
  }) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
}
