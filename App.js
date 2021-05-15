import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import themeReducer from './redux/themeReducer';
import { RootStack } from './src/rootStack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/homeScreen';
import { StackContainer } from './src/rootStack'
const store = createStore(themeReducer);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          {/* <StackContainer></StackContainer> */}
          <RootStack></RootStack>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default (App);
