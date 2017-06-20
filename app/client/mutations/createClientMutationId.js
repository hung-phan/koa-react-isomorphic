/* @flow */

let clientMutationId = 0;

export default (): number => {
  clientMutationId += 1;
  return clientMutationId;
};
