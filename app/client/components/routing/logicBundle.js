/* @flow */
import identity from 'lodash/identity';
import { routerReducer } from 'react-router-redux';
import globalizeSelectors from '../../helpers/globalizeSelectors';

export const mountPoint = 'routing';

export const selectors = globalizeSelectors({
  getRouting: identity,
}, mountPoint);

export default routerReducer;
