/* @flow */
import identity from 'lodash/identity';
import { createAction, handleActions } from 'redux-actions';
import globalizeSelectors from '../../helpers/globalizeSelectors';
import type { UpdateLinkType, UpdateTitleType } from './types';

export const mountPoint = 'helmet';

export const selectors = globalizeSelectors({
  getHelmet: identity,
}, mountPoint);

export const UPDATE_TITLE = 'helmet/UPDATE_TITLE';
export const UPDATE_LINK = 'helmet/UPDATE_LINK';

export const updateTitle: UpdateTitleType = createAction(UPDATE_TITLE);
export const updateLink: UpdateLinkType = createAction(UPDATE_LINK);

export default handleActions({
  [UPDATE_TITLE]: (state, { payload: title }) => ({ ...state, title }),
  [UPDATE_LINK]: (state, { payload: link }) => ({ ...state, link }),
}, {
  title: 'Koa React Isomorphic',
  link: [],
});
