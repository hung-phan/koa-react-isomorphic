export default function() {
  if (process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  } else {
    return false;
  }
}
