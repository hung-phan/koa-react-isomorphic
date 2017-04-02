/* @flow */
import routingReducer, { mountPoint as routingMountPoint } from './components/routing/logicBundle';
import helmetReducer, { mountPoint as helmetMountPoint } from './components/helmet/logicBundle';

export default {
  [routingMountPoint]: routingReducer,
  [helmetMountPoint]: helmetReducer,
};
