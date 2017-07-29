/* @flow */

let clientMutationId = 0;

export default (): string => {
  clientMutationId += 1;
  return clientMutationId.toString();
};
