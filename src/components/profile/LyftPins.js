import React, { Component } from 'react';
import { Marker, InfoWindow} from 'react-google-maps';

class LyftPins extends Component {
  constructor(){
    super()
    this.state = {
      isWindowOpen: false
    }
  }

  onWindowToggleOpen = () => {
    this.setState({isWindowOpen: !this.state.isWindowOpen})
  }

  render(){
    const {marker} = this.props
    return (
      <Marker
        position={marker.location}
        onClick={this.onWindowToggleOpen}
        icon={'http://maps.google.com/mapfiles/ms/micons/cabs.png'}
      >
        {this.state.isWindowOpen && <InfoWindow onCloseClick={this.onWindowToggleOpen}>
          <div>
            <h4>{marker.display_name}</h4>
            <p>{`${marker.eta} ${marker.eta > 1 ? "mins" : "min"} away`}</p>
          </div>
        </InfoWindow>
        }
      </Marker>
    )
  }
}

export default LyftPins
