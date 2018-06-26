import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView from 'react-native-maps';

export default class ShowRoutes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigation } = this.props;
    const coords = navigation.getParam('coords', []);
    const start_location = navigation.getParam('start_location', {});
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{
          latitude: start_location.lat,
          longitude: start_location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>

          <MapView.Polyline
            coordinates={coords}
            strokeWidth={2}
            strokeColor="red" />

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

});
