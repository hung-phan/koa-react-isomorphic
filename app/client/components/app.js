'use strict';

import React, { Component } from 'react';
import { RouteHandler }     from 'react-router';
import { connect }          from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <RouteHandler {...this.props} {...this.state} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(App);
