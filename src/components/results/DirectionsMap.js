/* global google */
import _ from 'lodash';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, TrafficLayer} from 'react-google-maps';
import * as actions from '../../actions';
import DirectionsPins from './DirectionsPins';

class DirectionsMap extends Component{

  constructor(){
    super()
    this.state = {
      directions: []
    }
  }

  componentDidMount() {
    const source = JSON.parse(localStorage.getItem('source'))
    const destination = JSON.parse(localStorage.getItem('destination'))
    this.googleDirections(source, destination)
  }

  googleDirections = (source, destination) => {
    const travelModes = ["DRIVING", "TRANSIT", "WALKING", "BICYCLING"]

    travelModes.forEach(travelMode => {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: source,
        destination: destination,
        travelMode
      }, (result, status) => {
        if (status === "OK") {
          this.setState({directions: [...this.state.directions, result]})
        }
      });
    })
  }

  render(){
    // console.log(this.props)
    const directions = _.compact(this.state.directions)
    const directionsProperties = {
      "DRIVING": {color: "yellow", icon: 'http://maps.google.com/mapfiles/ms/micons/cabs.png', divisor: 2},
      "TRANSIT": {color: "blue", icon: 'http://maps.google.com/mapfiles/ms/micons/subway.png', divisor: 2.5},
      "WALKING": {color: "magenta", icon: 'http://maps.google.com/mapfiles/ms/micons/hiker.png', divisor: 3},
      "BICYCLING": {color: "purple", icon: 'http://maps.google.com/mapfiles/ms/micons/cycling.png', divisor: 1.5}
    }

    const directionsToRender = directions.map((direction,index) => {
      const attributes = directionsProperties[direction.request.travelMode]
      return <DirectionsPins key={index} direction={direction} attributes={attributes}/>
    })

    return(
      <GoogleMap
        zoom={18}
      >
        {directionsToRender.length > 0 ? directionsToRender : null}
        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  location: state.map.currentLocation,
  etas: state.res.etas
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, actions)(DirectionsMap)));
