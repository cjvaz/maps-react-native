import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Places from './Places';
import ShowRoutes from './ShowRoutes';
import EnterDirections from './EnterDirections';

const App = StackNavigator({
  Home: { screen: Home },
  Places: { screen: Places },
  EnterDirections: { screen: EnterDirections },
  ShowRoutes: { screen: ShowRoutes }
});

export default App;
