import 'app/client/components/test-helpers/jsdom-support.js';

import { assert } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TodosHeader from './index';

describe('Component: TodosHeader', () => {
  it(`should render 'TodosHeader' component`, () => {
    assert.ok(mount(<TodosHeader />));
  });

  it(`should have title 'Todos List'`, () => {
    const component = mount(<TodosHeader />);
    assert.include(component.text(), 'Todos List');
  });
});
