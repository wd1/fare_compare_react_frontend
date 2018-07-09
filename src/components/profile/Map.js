/* global google */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,TrafficLayer} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import * as actions from '../../actions';
import LyftPins from './LyftPins'

class Map extends Component{

  constructor(){
    super()
    this.state = {
      isBoxOpen: true
    }
  }

  componentWillMount() {
    this.props.getLocation()
  }

  componentWillReceiveProps(nextProps) {
    this.props.getNearestRidesInfo(nextProps.location)
  }

  onBoxToggleOpen = () => {
    this.setState({isBoxOpen: !this.state.isBoxOpen})
  }

  onDragEnd = (event) => {
    const location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
    this.props.getLocation(location)
  }

  render(){
    // console.log(this.props.etas, this.props.location)
    const {location} = this.props
    const {uberEtaDisplay, lyftEtaDisplay, nearbyLyftCoords} = this.props.etas

    return(
      <GoogleMap
        zoom={16}
        center={location}
      >
        <Marker
          position={location}
          draggable
          animation={google.maps.Animation.DROP}
          onDragEnd={this.onDragEnd}
        >
          {this.state.isBoxOpen && <InfoBox
            onCloseClick={this.onBoxToggleOpen}
            position={new google.maps.LatLng(location.lat, location.lng)}
            options={{ pixelOffset: new google.maps.Size(-650,-300), closeBoxURL: ``}}
            >
            <div id="ride-nearest">
              <h3>{location.address? location.address : null}</h3>
              <h3>Nearest <font color='dimgrey'>Ubers</font></h3>
              {uberEtaDisplay? uberEtaDisplay : null}
              <h3>Nearest <font color='Magenta'>Lyft</font></h3>
              {lyftEtaDisplay? lyftEtaDisplay : null}
            </div>
          </InfoBox>
          }
        </Marker>
        {nearbyLyftCoords? nearbyLyftCoords.map((marker,i) => {
          return (
            <LyftPins key={i} marker={marker} />
          )
        }): null}
        <TrafficLayer autoUpdate />
      </GoogleMap>
    )
  }
}

const mapStateToProps = state => ({
  location: state.map.currentLocation,
  etas: state.inf.etas
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, actions)(Map)));
