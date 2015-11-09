import React from 'react';

let component;

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const { createDevTools } = require('redux-devtools');
  const LogMonitor = require('redux-devtools-log-monitor');
  const DockMonitor = require('redux-devtools-dock-monitor');

  component = createDevTools(
    <DockMonitor toggleVisibilityKey='H' changePositionKey='Q'>
      <LogMonitor />
    </DockMonitor>
  );
} else {
  component = () => <div />;
}

export default component;
