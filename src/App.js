import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Places from './Places';
import Directions from './Directions';

const App = StackNavigator({
  Home: { screen: Home },
  Places: { screen: Places },
  Directions: { screen: Directions }
});

export default App;
