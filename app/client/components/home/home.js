'use strict';

import React, { Component } from 'react';
import { Link }             from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Click Me!'
    };

    this.clickMeUpdate = this.clickMeUpdate.bind(this);
  }

  clickMeUpdate(event) {
    this.setState({
      text: this.state.text.split('').reverse().join('')
    });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <ul className="nav nav-pills pull-right">
            <li className="active"><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <h3 className="text-muted">React.Js <i className="fa fa-cog fa-spin"></i></h3>
        </div>

        <div className="jumbotron">
          <h1>Hello world</h1>
          <p className="lead">Always a pleasure scaffolding your apps.</p>
          <p><a className="btn btn-lg btn-success" href="#">Splendid!</a></p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4>HTML5 Boilerplate</h4>
            <p>HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.</p>

            <h4>Bootstrap</h4>
            <p>Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.</p>

            <h4>Modernizr</h4>
            <p>Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites.</p>

            <h4>ReactJs</h4>
            <h1 className='clickMe' onClick={this.clickMeUpdate}>{this.state.text}</h1>
          </div>
          <div className="col-lg-6">
            <h4>Webpack</h4>
            <p>webpack is a module bundler.</p>
            <p>webpack takes modules with dependencies and generates static assets representing those modules.</p>
          </div>
        </div>

        <div className="footer">
          <p>♥ from the Yeoman team</p>
        </div>
      </div>
    );
  }
}

export default Home;
