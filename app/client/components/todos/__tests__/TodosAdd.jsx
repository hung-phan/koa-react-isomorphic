import { assert } from "chai";
import td from "testdouble";
import React from "react";
import { mount } from "enzyme";
import faker from "faker";
import { default as TodosAdd, __RewireAPI__ as Module } from "../TodosAdd";

describe("Component: TodosAdd", () => {
  let viewer;
  let component;
  let Relay;
  let relay;
  let addTodoMutation;
  let randomUUID;

  beforeEach(() => {
    randomUUID = faker.random.uuid();
    Relay = {
      Store: {
        commitUpdate: td.function()
      }
    };
    relay = { setVariables: td.function() };
    addTodoMutation = td.function();
    viewer = { numberOfTodos: 100 };
    td.when(addTodoMutation(td.matchers.anything())).thenReturn({ randomUUID });

    Module.__Rewire__("Relay", Relay);
    component = mount(<TodosAdd viewer={viewer} relay={relay} />);
  });

  afterEach(() => {
    Module.__ResetDependency__("Relay");
  });

  it('should define default value for "state.todo"', () => {
    assert.equal(component.state().todo, "");
  });

  context('# click on "Add Todo" button', () => {
    let button;

    beforeEach(() => {
      Module.__Rewire__("AddTodoMutation", addTodoMutation);
      component.setState({ todo: randomUUID });

      button = component.find("button");
      button.simulate("click");
    });

    afterEach(() => {
      Module.__ResetDependency__("AddTodoMutation");
    });

    it('should call "AddTodoMutation" with "viewer", and "text"', () => {
      td.verify(addTodoMutation({ viewer, text: randomUUID }));
    });

    it('should call "Relay.Store.commitUpdate" with "AddTodoMutation"', () => {
      td.verify(Relay.Store.commitUpdate({ randomUUID }));
    });

    it('should reset "state.todo"', () => {
      assert.equal(component.state().todo, "");
    });
  });
});
