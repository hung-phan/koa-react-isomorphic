import React from 'react';

let Debug; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
  const { createDevTools } = require('redux-devtools');
  const DockMonitor = require('redux-devtools-dock-monitor').default;
  const LogMonitor = require('redux-devtools-log-monitor').default;

  Debug = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
      <LogMonitor />
    </DockMonitor>
  );
} else {
  Debug = () => <div />;
}

export default Debug;
