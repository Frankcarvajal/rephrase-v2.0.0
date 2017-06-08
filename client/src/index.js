import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';
// import {createStore, applyMiddleware} from 'redux';
// import {Provider} from 'react-redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// // Create a store
// const store = createStore(rootReducer, composeWithDevTools(
//   applyMiddleware(thunk))
// );


ReactDOM.render(
  <App />,
  document.getElementById('root')
);