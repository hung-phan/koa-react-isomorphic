import React from 'react';

let component;

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const { createDevTools } = require('redux-devtools');
  const DockMonitor = require('redux-devtools-dock-monitor').default;
  const LogMonitor = require('redux-devtools-log-monitor').default;

  component = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
      <LogMonitor />
    </DockMonitor>
  );
} else {
  component = () => <div />;
}

export default component;
