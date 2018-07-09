import React from 'react';
import UberModal from '../components/results/UberModal';
import LyftModal from '../components/results/LyftModal';
import TaxiModal from '../components/results/TaxiModal';

const API_ROOT = 'http://localhost:3000/api/v1';

const headers = () => ({
  'Authorization': localStorage.getItem('token'),
  'Accepts': 'application/json',
  'Content-Type': 'application/json'
});

const getWithToken = url => {
  return fetch(url, {
    headers: headers()
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`);
};

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const update = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signup = data => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const postSearch = data => {
  return fetch(`${API_ROOT}/searches`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getSearches = () => {
  return fetch(`${API_ROOT}/searches`, {
    method: 'GET',
    headers: headers()
  }).then(res => res.json());
};

const getNearestUberEta = (source) => {
  return fetch(`${API_ROOT}/uber_location`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const getUberPriceData = (source, destination) => {
  return fetch(`${API_ROOT}/uber_estimate`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source, destination})
  }).then(res => res.json());
}

const getUberProductData = (source) => {
  return fetch(`${API_ROOT}/uber_product`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const formatUberPriceEstimates = (prices, products, etas) => {

  return prices.map(price => {
    const product = products.find(product => product.display_name === price.display_name)

    const eta = etas.find(eta => eta.display_name === price.display_name)

    const modal = <UberModal price={price} product={product} eta={eta}/>

    return {
      color: 'black',
      service: modal,
      name: "Uber",
      min: price && price.low_estimate ? Math.round(price.low_estimate) : '',
      max: price && price.high_estimate ? Math.round(price.high_estimate) : '',
      shared: product && product.shared ? true : false,
      surge: price && price.surge_multiplier > 1.0 ? true : false,
      estimate: price && price.estimate ? price.estimate : '',
      duration: price && price.duration ? Math.round(price.duration/60) : '',
      eta: eta && eta.estimate ? Math.round(eta.estimate/60) : '',
      distance: price && price.distance ? price.distance : '',
    }
  })
}

const getNearestLyftEta = (source) => {
  return fetch(`${API_ROOT}/lyft_estimate`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const getNearestLyftLocations = (source) => {
  return fetch(`${API_ROOT}/lyft_location`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const getLyftPriceData = (source, destination) => {
  return fetch(`${API_ROOT}/lyft_fare`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source, destination})
  }).then(res => res.json());
}

const getLyftProductData = (source) => {
  return fetch(`${API_ROOT}/lyft_product`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source})
  }).then(res => res.json());
}

const formatLyftPriceEstimates = (prices, products, etas) => {
  // console.log(prices, products)
  return prices.map(price => {
    const product = products.find(product => product.display_name === price.display_name)

    const eta = etas.find(eta => eta.display_name === price.display_name)

    const modal = <LyftModal price={price} product={product} eta={eta}/>

    return {
      color: 'pink',
      service: modal,
      name: "Lyft",
      max: price && price.estimated_cost_cents_max ? Math.round(price.estimated_cost_cents_max/100) : '',
      min: price && price.estimated_cost_cents_min ? Math.round(price.estimated_cost_cents_min/100) : '',
      shared: product && product.ride_type === "lyft_line" ? true : false,
      surge: price && price.primetime_percentage !== "0%" ? true : false,
      estimate: price ?  `$${Math.round(price.estimated_cost_cents_min/100)}-${Math.round(price.estimated_cost_cents_max/100)}` : '',
      duration: price && price.estimated_duration_seconds ? Math.round(price.estimated_duration_seconds/60) : '',
      eta: eta && eta.eta_seconds ? Math.round(eta.eta_seconds/60) : '',
      distance: price && price.estimated_distance_miles ? price.estimated_distance_miles : '',
    }
  })
}

const getTaxiPriceData = (source, destination) => {
  return fetch(`${API_ROOT}/taxi_fare`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source, destination})
  }).then(resp => resp.json());
}

const getTaxiBusinessData = (source) => {
  return fetch(`${API_ROOT}/businesses`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({source})
  }).then(resp => resp.json());
}

const formatTaxiPriceEstimates = (prices, products) => {
  // console.log(prices, products)

  const modal = <TaxiModal price={prices} product={products} eta={''}/>
  return {
    color: 'yellow',
    service: modal,
    name: "Taxi",
    min: Math.round(prices.total_fare - prices.tip_amount),
    max: Math.round(prices.total_fare - prices.tip_amount),
    estimate: Math.round(prices.total_fare - prices.tip_amount) ?  `$${Math.round(prices.total_fare - prices.tip_amount)}` : '',
    surge: false,
    shared: false,
    duration: Math.round(prices.duration/60) || '',
    eta: '',
    distance: Math.round(prices.distance/1609.344) || '',
  }
}

export const adapter = {
  auth: {
    login,
    signup,
    update,
    getCurrentUser
  },
  post: {
    postSearch,
    getSearches
  },
  uber: {
    getUberPriceData,
    getUberProductData,
    formatUberPriceEstimates,
    getNearestUberEta
  },
  lyft: {
    getLyftPriceData,
    getLyftProductData,
    formatLyftPriceEstimates,
    getNearestLyftEta,
    getNearestLyftLocations
  },
  taxi: {
    getTaxiPriceData,
    getTaxiBusinessData,
    formatTaxiPriceEstimates
  }
};
