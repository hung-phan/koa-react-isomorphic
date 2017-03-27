import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import StaticPage from '../index';

describe('Component: StaticPage', () => {
  let component;

  beforeEach(() => {
    component = shallow(<StaticPage />);
  });

  it("should render 'Back to Home page' link", () => {
    assert.include(component.html(), 'Back to Home page');
  });
});
