/* @flow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "found";

export default () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1>Static Page</h1>
        <Link to="/">Back to Home page</Link>
      </div>
    </div>
  </div>
);
