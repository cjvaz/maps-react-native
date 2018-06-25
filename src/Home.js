import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Places"
          onPress={() =>
            navigate('Places')
          }
        />

        <Button
          title="Directions"
          onPress={() =>
            navigate('Directions')
          }
        />
      </View>
    );
  }
}
