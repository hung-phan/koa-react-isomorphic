import React        from 'react';
import { Provider } from 'react-redux';

export default function(store, Handler, routerState) {
  return (
    <div>
      <Provider key='provider' store={store}>
        {() => <Handler routerState={routerState} />}
      </Provider>

      {process.env.NODE_ENV === 'development' && (function() {
        const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

        return (
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        );
      })()}
    </div>
  );
};
