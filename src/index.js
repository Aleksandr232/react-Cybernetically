import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./redux/reducers";
import App from "./App";



const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  
));

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

