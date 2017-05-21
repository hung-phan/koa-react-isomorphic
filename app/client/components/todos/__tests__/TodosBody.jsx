import _ from "lodash";
import faker from "faker";
import td from "testdouble";
import React from "react";
import { mount } from "enzyme";
import TodosBody from "../TodosBody";

describe("Component: TodosBody", () => {
  const viewer = {
    todos: {
      edges: _(4)
        .range()
        .map(value => ({
          node: {
            id: value,
            text: `Todo ${value + 1}`,
            complete: false
          }
        }))
        .value()
    }
  };
  let Relay;
  let component;
  let randomUUID;

  beforeEach(() => {
    randomUUID = faker.random.uuid();
    component = mount(<TodosBody viewer={viewer} />);
    Relay = {
      Store: {
        commitUpdate: td.function()
      }
    };
    TodosBody.__Rewire__("Relay", Relay);
  });

  afterEach(() => {
    TodosBody.__ResetDependency__("Relay");
  });

  it("should display a list of todos", () => {
    const trComponents = component.find("tr");
    expect(trComponents).toHaveLength(viewer.todos.edges.length);
  });

  describe("# when click on delete button", () => {
    let removeTodoMutation;

    beforeEach(() => {
      removeTodoMutation = td.function();
      td
        .when(removeTodoMutation(td.matchers.anything()))
        .thenReturn({ randomUUID });
      TodosBody.__Rewire__("RemoveTodoMutation", removeTodoMutation);
    });

    afterEach(() => {
      TodosBody.__ResetDependency__("RemoveTodoMutation");
    });

    it('should call "removeTodo"', () => {
      const trComponents = component.find("tr");

      trComponents.forEach(tr => {
        const removeButton = tr.find(".btn-danger");
        removeButton.simulate("click");

        expect(removeButton).toBeDefined();
        td.verify(Relay.Store.commitUpdate({ randomUUID }));
      });
      expect(td.explain(Relay.Store.commitUpdate).callCount).toEqual(viewer.todos.edges.length);
    });
  });

  describe("# when click on complete button", () => {
    let completeTodoMutation;

    beforeEach(() => {
      completeTodoMutation = td.function();
      td
        .when(completeTodoMutation(td.matchers.anything()))
        .thenReturn({ randomUUID });
      TodosBody.__Rewire__("CompleteTodoMutation", completeTodoMutation);
    });

    afterEach(() => {
      TodosBody.__ResetDependency__("CompleteTodoMutation");
    });

    it('should call "completeTodo"', () => {
      const trComponents = component.find("tr");

      trComponents.forEach(tr => {
        const completeButton = tr.find(".btn-success");
        completeButton.simulate("click");

        expect(completeButton).toBeDefined();
        td.verify(Relay.Store.commitUpdate({ randomUUID }));
      });
      expect(td.explain(Relay.Store.commitUpdate).callCount).toEqual(viewer.todos.edges.length);
    });
  });
});
