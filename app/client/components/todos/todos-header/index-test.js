import { assert } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import TodosHeader from './index';

describe('Component: TodosHeader', () => {
  it(`should render 'TodosHeader' component`, () => {
    assert.ok(shallow(<TodosHeader />));
  });

  it(`should have title 'Todos List'`, () => {
    const component = shallow(<TodosHeader />);
    assert.include(component.text(), 'Todos List');
  });
});
