import React, { Component } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import Polyline from '@mapbox/polyline';
import Reactotron from 'reactotron-react-native';


export default class EnterDirections extends Component {

  state = {
    origin: '',
    destination: '',
    distance: '',
    duration: '',
    start_address: '',
    end_address: '',
    start_location: '',
    end_location: '',
    summary: '',
    coords: []
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
      let respJson = await resp.json();
      return respJson
    } catch (error) {
      alert(error)
      return error
    }
  }

  handleOrigin = (text) => {
    this.setState({ origin: text })
  }
  handleDestination = (text) => {
    this.setState({ destination: text })
  }

  async searchDirections() {
    const directions = await this.getDirections(this.state.origin, this.state.destination);
    Reactotron.log(directions);
    let points = Polyline.decode(directions.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    })
    this.setState({ distance: directions.routes[0].legs[0].distance.text });
    this.setState({ duration: directions.routes[0].legs[0].duration.text });
    this.setState({ start_address: directions.routes[0].legs[0].start_address });
    this.setState({ end_address: directions.routes[0].legs[0].end_address });
    this.setState({ start_location: directions.routes[0].legs[0].start_location });
    this.setState({ end_location: directions.routes[0].legs[0].end_location });
    this.setState({ summary: directions.routes[0].summary });
    this.setState({ coords: coords });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput
          style={{ padding: 2, fontSize: 16, height: 80 }}
          placeholder="Origin..."
          multiline={true}
          onChangeText={this.handleOrigin}
        />
        <TextInput
          style={{ padding: 2, fontSize: 16, height: 80 }}
          placeholder="Destination..."
          multiline={true}
          onChangeText={this.handleDestination}
        />
        <Button
          onPress={() => this.searchDirections()}
          title="Search"
        />
        <Text>{this.state.start_address} to {this.state.end_address}</Text>
        <Text>{this.state.summary}</Text>
        <Text>{this.state.distance}</Text>
        <Text>{this.state.duration}</Text>
        <Button
          title="View Map"
          onPress={() =>
            navigate('ShowRoutes', {
                coords: this.state.coords,
                start_location: this.state.start_location
            })
          }
        />
      </View>
    )
  }
}

