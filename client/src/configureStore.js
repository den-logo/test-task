import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default (history, initialState = {}) => {
  const middleware = routerMiddleware(history);

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleware, thunk))
  );

  return store;
};
