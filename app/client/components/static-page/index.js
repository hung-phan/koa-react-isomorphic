import React from 'react';
import { Link } from 'react-router';

const StaticPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1>Static Page</h1>
        <Link to="/">Back to Home page</Link>
      </div>
    </div>
  </div>
);

export default StaticPage;
