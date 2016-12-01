import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import TodosFooter from './../todos-footer';

describe('Component: TodosFooter', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TodosFooter />);
  });

  it("should render 'Go to static page' link", () => {
    assert.include(component.html(), 'Go to static page');
  });
});
