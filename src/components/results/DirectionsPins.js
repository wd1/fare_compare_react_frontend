import React, { Component } from 'react';
import { DirectionsRenderer, Marker, InfoWindow} from 'react-google-maps';

class DirectionsPins extends Component {
  constructor(){
    super()
    this.state = {
      isWindowOpen: true
    }
  }

  onWindowToggleOpen = () => {
    this.setState({isWindowOpen: !this.state.isWindowOpen})
  }

  render(){
    const {direction, attributes} = this.props
    const infoWindowIndex = (direction.routes[0].overview_path.length/attributes.divisor).toFixed()
    const infoLatLng = direction.routes[0].overview_path[infoWindowIndex]
    const distance = direction.routes[0].legs[0].distance.text
    const duration = direction.routes[0].legs[0].duration.text
    const travelMode = direction.request.travelMode
    const url = `https://www.google.com/maps/dir/?api=1&origin=${direction.request.origin.location.lat() + ',' + direction.request.origin.location.lng()}&destination=${direction.request.destination.location.lat() + ',' + direction.request.destination.location.lng()}&travelmode=${travelMode.toLowerCase()}`

    const options = {
      polylineOptions: {
        strokeColor: attributes.color,
        clickable: true,
        strokeWeight: 6
      }
    }

    return (
      <div>
        <DirectionsRenderer directions={direction} options={options} />
        <Marker
          position={infoLatLng}
          icon={attributes.icon}
          onClick={this.onWindowToggleOpen}
        >
          {this.state.isWindowOpen && <InfoWindow
            position={infoLatLng}
            onCloseClick={this.onWindowToggleOpen}
            >
              <div>
                <h4><a target="_blank" href={url}>{travelMode} Directions</a></h4>
                <p><b>Distance</b>: {distance}</p>
                <p><b>Duration</b>: {duration}</p>
              </div>
            </InfoWindow>
          }
        </Marker>
      </div>
    )
  }
}

export default DirectionsPins
