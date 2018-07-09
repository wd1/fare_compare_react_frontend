import { combineReducers } from 'redux';

//Don't have a massive initial state, we can shift this to each reducer, so we don't duplicate info
const initialState = { currentUser: {}, currentLocation: {lat: 40.7654941,lng: -73.9838659, address: ''}, savedAddresses: [], search: {startAddress: '', source: '', endAddress: '', destination: '', error: ''}, etas: {uberEtaDisplay: '', lyftEtaDisplay: '', nearbyLyftCoords: ''}, results: {uberPrices: '', uberProducts: '', lyftPrices: '', lyftProducts: '', taxiPrices: '', taxiProducts: ''}};

//here try out state ={}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const { id, email } = action.user;
      return { ...state, currentUser: { id, email } };
    case 'SHOW_LOGIN_ERROR':
      const { error } = action.user;
      return { ...state, currentUser: {error} };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {}, currentLocation: {}, savedAddresses: [], search: {startAddress: '', source: '', endAddress: '', destination: '', error: ''}, etas: {uberEtaDisplay: '', lyftEtaDisplay: '', nearbyLyftCoords: ''}, results: { uberPrices: '', uberProducts: '', lyftPrices: '', lyftProducts: '', taxiPrices: '', taxiProducts: ''}};
    default:
      return state;
  }
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      const { lat, lng, address } = action.location;
      return { ...state, currentLocation: { lat, lng, address }};
    case 'SET_CURRENT_USER':
      if (action.location) {
        const { lat, lng, address } = action.location;
        return { ...state, currentLocation: { lat, lng, address }};
      }
    default:
      return state;
  }
};

const postReducer = (state = initialState, action) => {
  const savedAddresses = action.addresses
  switch (action.type) {
    case 'POST_SEARCH':
      return { ...state, savedAddresses};
    case 'SET_SEARCH_DATA':
      return { ...state, savedAddresses};
    default:
      return state;
  }
};

const locReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_SOURCE_SEARCH':
      return { ...state, search: {...state.search, startAddress: action.startAddress, source: action.source, error: ''}};
    case 'SET_DESTINATION_SEARCH':
      return { ...state, search: {...state.search, endAddress: action.endAddress, destination: action.destination, error: ''}};
    case 'SET_SOURCE_DEFAULT':
      return { ...state, search: {...state.search, startAddress: 'current location', source: action.currentLocation, error: ''}};
    case 'SET_DESTINATION_ERROR':
      return { ...state, search: {...state.search, error: 'Destination Not Found. Please Enter Valid Destination'}};
    default:
      return state;
  }
};

const rideReducer = (state = initialState, action) => {

  const {uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices, taxiProducts} = action
  const uberEtaDisplay = action.uberETA
  const lyftEtaDisplay = action.lyftETA

  switch (action.type) {
    case 'SET_PRICE_DATA':
      return { ...state, etas: {...state.results, uberEtaDisplay, lyftEtaDisplay}, results: {...state.results, uberPrices, uberProducts, lyftPrices, lyftProducts, taxiPrices, taxiProducts}};
    default:
      return state;
  }
};

const rideInfoReducer = (state = initialState, action) => {
  const {uberEtaDisplay, lyftEtaDisplay, nearbyLyftCoords} = action

  switch (action.type) {
    case 'SET_RIDE_ETA':
      return {...state, etas: {...state.etas, uberEtaDisplay, lyftEtaDisplay, nearbyLyftCoords}}
    case 'SET_NEAREST_LYFTS':
      return {...state, etas: {...state.etas, nearbyLyftCoords}}
    default:
      return state;
  }
}

const rootReducer =  combineReducers({
  auth: authReducer,
  map: mapReducer,
  post: postReducer,
  loc: locReducer,
  res: rideReducer,
  inf: rideInfoReducer
});

export default rootReducer;
