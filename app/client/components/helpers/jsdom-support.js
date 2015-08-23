import { jsdom }            from 'jsdom';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

// config React DOM
ExecutionEnvironment.canUseDOM = true;

if (typeof document === 'undefined') {
  global.document = jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
}
