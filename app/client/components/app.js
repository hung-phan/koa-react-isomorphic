'use strict';

import React            from 'react';
import { RouteHandler } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <RouteHandler {...this.props} {...this.state}/>
      </div>
    );
  }
}

export default App;
