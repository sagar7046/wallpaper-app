import React from 'react';
import {
  StatusBar
} from 'react-native';
import { connect, Provider } from 'react-redux';
import {
  createStore,
  combineReducers,
  applyMiddleware
} from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import themeReducer from './redux/themeReducer';
import { switchTheme } from './redux/themeActions';
import Home from './src/homeScreen';

const store = createStore(themeReducer);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Home></Home>
      </Provider>
    </>
  );
};

export default (App);
