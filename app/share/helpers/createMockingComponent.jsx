/* @flow */
import _ from "lodash";
import React from "react";

export default (mockTagName: string, props: any[] = []) => (componentProps: {
  [key: string]: any
}) => (
  <div>{`${mockTagName} ${JSON.stringify(_.pick(componentProps, props))}`}</div>
);
