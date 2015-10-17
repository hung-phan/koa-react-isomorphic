import React from 'react';
import { Provider } from 'react-redux';

export default ({ store, routes }) => {
  return (
    <div>
      <Provider key='provider' store={store}>
        {routes}
      </Provider>

      {process.env.NODE_ENV === 'development' && !process.env.SERVER_RENDERING &&
        (function() {
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
