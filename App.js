import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Reactotron from 'reactotron-react-native'

const { height, width } = Dimensions.get('window');


export default class App extends Component {

  state= {
    latitude: -27.2106710,
    longitude: -49.6362700,
    places: [
      {
        id: 1,
        title: 'Mercado Publico',
        description: 'Barracas de frutas, peixes...',
        latitude: -30.0275784,
        longitude: -51.2281022,
      },
      {
        id: 2,
        title: 'Aeroporto Salgado Filho',
        description: 'Voos internacionais e nacionais',
        latitude: -29.9934732,
        longitude: -51.1775698,
      },
      {
        id: 3,
        title: 'Parque da Redenção',
        description: 'Lazer, passeios',
        latitude: -30.0375334,
        longitude: -51.2176093,
      }
    ]    
  }

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  }
  
  render() {
    
    const { latitude, longitude } = this.state.places[0];

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231,
          }}
          style={styles.map}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          onMapReady={this._mapReady}
        >
          { this.state.places.map(place => (
            <MapView.Marker
            ref={mark => place.mark = mark}
            title={place.title}
            description={place.description}
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude
            }} />
          ))}

        </MapView>
        <ScrollView
          style={styles.placesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={(e) => {
            const place = ( e.nativeEvent.contentOffset.x > 0)
              ? e.nativeEvent.contentOffset.x / width 
              : 0;
            placeRound =  Math.round(place);
            const { latitude, longitude, mark } = this.state.places[placeRound];
            this.mapView.animateToCoordinate({ latitude, longitude }, 1000);
            setTimeout(() => {
              mark.showCallout();
            }, 1000)
          }}
        >
          { this.state.places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text>{place.title}</Text>
              <Text>{place.description}</Text>
            </View>
          ))} 
          
        </ScrollView>
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

  placesContainer: {
    width: '100%',
    maxHeight: 200
  },

  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20
  }

});
