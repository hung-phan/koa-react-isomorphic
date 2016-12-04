import identity from 'lodash/identity';
import { routerReducer } from 'react-router-redux';
import globalizeSelectors from 'client/helpers/globalize-selectors';

export const mountPoint = 'routing';

export const selectors = globalizeSelectors({
  getRouting: identity,
}, mountPoint);

export default routerReducer;
