/* global google */
import React from 'react';
import { adapter } from '../services';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from 'lodash';

const googleGeocoder = (lat, lng, dispatch) => {
  const latLng = new google.maps.LatLng(lat, lng)
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ latLng }, (items, status) => {
    const location = {lat, lng}
    if (status === "OK") {
      location.address = items[0].formatted_address
      dispatch({ type: 'SET_LOCATION', location });
    }else {
      dispatch({ type: 'SET_LOCATION', location });
    }
  })
}

export const getLocation = (loc) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  if (loc) {
    googleGeocoder(loc.lat, loc.lng, dispatch)
  }else {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      googleGeocoder(coords.latitude, coords.longitude, dispatch)
    })
  }
};

export const fetchUser = (token) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: 'SET_CURRENT_USER', user });
  });
};

const dispatchAuth = (user, location, history, dispatch) => {
  if (user.email) {
    localStorage.setItem('token', user.jwt);
    dispatch({ type: 'SET_CURRENT_USER', user, location });
    history.push('/profile')
  }else {
    dispatch({ type: 'SHOW_LOGIN_ERROR', user });
    // history.push('/login')
  }
}

const executeAuth = (email, password, history, location, authFunc, dispatch, password_confirmation) => {
  if (password_confirmation) {
    authFunc({email, password, password_confirmation}).then(user => {
      dispatchAuth(user, location, history, dispatch)
    })
  }else {
    authFunc({ email, password }).then(user => {
      dispatchAuth(user, location, history, dispatch)
    })
  }
}

const executeAuthLocation = (email, password, history, authFunc, dispatch, password_confirmation) => {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {

      const coords = pos.coords;
      const latLng = new google.maps.LatLng(coords.latitude, coords.longitude)
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng }, (items, status) => {
        const location = {lat: coords.latitude, lng: coords.longitude}
        if (status === "OK") {
          location.address = items[0].formatted_address
          password_confirmation ? executeAuth(email, password, history, location, authFunc, dispatch, password_confirmation) : executeAuth(email, password, history, location, authFunc, dispatch)
        }else {
          password_confirmation ? executeAuth(email, password, history, location, authFunc, dispatch, password_confirmation) : executeAuth(email, password, history, location, authFunc, dispatch)
        }
      })
    })
  }
}

export const loginUser = (email, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {login} = adapter.auth

  executeAuthLocation(email, password, history, login, dispatch)
};

export const updateUser = (email, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {update} = adapter.auth

  executeAuthLocation(email, password, history, update, dispatch)
};

export const signupUser = (email, password, password_confirmation, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {signup} = adapter.auth

  executeAuthLocation(email, password, history, signup, dispatch, password_confirmation)
};

export const logoutUser = () => {
  localStorage.clear();
  return { type: 'LOGOUT_USER' };
};

export const postSearchData = (search) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.post.postSearch({address: search}).then(addresses => {
    dispatch({ type: 'POST_SEARCH', addresses });
    // history.push('/results')
  });
};

export const getSearchData = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.post.getSearches().then(addresses => {
    dispatch({ type: 'SET_SEARCH_DATA', addresses });
  });
};

export const updateSource = (startAddress, currentLocation) => dispatch => {
  // dispatch({ type: 'ASYNC_START' });

  geocodeByAddress(startAddress)
  .then(results => getLatLng(results[0]))
  .then(source => {
    localStorage.setItem('startAddress', startAddress);
    localStorage.setItem('source', JSON.stringify(source));
    dispatch({type: 'SET_SOURCE_SEARCH', source, startAddress})
  })
  .catch(error => {
    localStorage.setItem('startAddress', 'current location');
    localStorage.setItem('source', JSON.stringify(currentLocation));
    dispatch({type: 'SET_SOURCE_DEFAULT', currentLocation})
  })
}

export const updateDestination = (endAddress, history) => dispatch => {
  // dispatch({ type: 'ASYNC_START' });

  geocodeByAddress(endAddress)
  .then(results => getLatLng(results[0]))
  .then(destination => {
    localStorage.setItem('endAddress', endAddress);
    localStorage.setItem('destination', JSON.stringify(destination));
    dispatch({type: 'SET_DESTINATION_SEARCH', destination, endAddress})
    history.push('/results')
  })
  .catch(error => {
    dispatch({type: 'SET_DESTINATION_ERROR'})
    history.push('/search')
  })
};

export const getRidePriceEstimates = (source, destination) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {getUberPriceData, getUberProductData, getNearestUberEta} = adapter.uber
  const {getLyftPriceData, getLyftProductData, getNearestLyftEta} = adapter.lyft
  const {getTaxiPriceData, getTaxiBusinessData} = adapter.taxi

  Promise.all([getUberPriceData(source, destination), getUberProductData(source), getNearestUberEta(source), getLyftPriceData(source, destination), getLyftProductData(source), getNearestLyftEta(source), getTaxiPriceData(source,destination), getTaxiBusinessData(source)]).then(values => {
    // console.log(values)
    const uberPrices = values[0] || [];
    const uberProducts = values[1] || [];
    const lyftPrices = values[3] || [];
    const lyftProducts = values[4] || [];
    const taxiPrices = values[6] || [];
    const taxiProducts = values[7] || [];
    const uberETA = values[2].times || [];
    const lyftETA = values[5].eta_estimates || [];

    dispatch({ type: 'SET_PRICE_DATA', uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices, taxiProducts, uberETA, lyftETA});
  })
}

export const getNearestRidesInfo = (source) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  const {getNearestUberEta} = adapter.uber
  const {getNearestLyftEta, getNearestLyftLocations} = adapter.lyft

  Promise.all([getNearestUberEta(source), getNearestLyftEta(source), getNearestLyftLocations(source)]).then(values => {

    const uberETA = values[0].times || []
    const lyftETA = values[1].eta_estimates || []
    const lyftLocations =  values[2].nearby_drivers_pickup_etas || []

    const uberEtaDisplay = uberETA.map((eta,i) => {
      const uberMins = (eta.estimate/60).toFixed()
      return <p id='profile' key={i}>{`${eta.display_name} only ${uberMins} ${uberMins > 1 ? "mins" : "min"} away`}</p>
    })

    const lyftEtaDisplay = lyftETA.map((eta,i) => {
      const lyftMins = (eta.eta_seconds/60).toFixed()
      return <p id='profile' key={i}>{`${eta.display_name} only ${lyftMins} ${lyftMins > 1 ? "mins" : "min"} away`}</p>
    })

    const lyftGeoCoords = lyftLocations.map(driver => {
      return driver.nearby_drivers.map(location => {
        const tempHash = {}
        tempHash.location = location.locations[0]
        tempHash.display_name = driver.display_name
        tempHash.eta = ((driver.pickup_duration_range.duration_ms)/60000).toFixed(2)
        return tempHash
      })
    })

    const nearbyLyftCoords = _.flattenDeep(lyftGeoCoords)

    dispatch({ type: 'SET_RIDE_ETA', uberEtaDisplay, lyftEtaDisplay, nearbyLyftCoords})
  })
}
