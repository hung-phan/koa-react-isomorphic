'use strict';

require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

import React  from 'react/addons';

function sendMessage (to: User, message: string): boolean {
  return socket.send(to, message);
}

require.ensure(['react-router'], function(require) {
  require('react-router');
});

// import MainComponent from './components/main-component';
// import AppActions    from './actions/app-actions';

// $(document).ready(function() {
//   // define routing
//   let routes = (
//     <Router.Route name='main_page' path='/' handler={MainComponent}></Router.Route>
//   );

//   Router.run(routes, Router.HashLocation, function(Handler) {
//     React.render(React.createFactory(Handler)(), document.getElementById('route'));
//   });
// });
