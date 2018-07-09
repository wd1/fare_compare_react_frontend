import React from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react'

const UberModal = (props) => {
  const { price, product, eta } = props
  const source = JSON.parse(localStorage.getItem('source'))
  const destination = JSON.parse(localStorage.getItem('destination'))
  const startAddress = localStorage.getItem('startAddress')
  const endAddress = localStorage.getItem('endAddress')

  const url = `https://m.uber.com/looking/finalize?pickup={"latitude":${source.lat},"longitude":${source.lng},"title":${startAddress.split(",")[0]}}&destination={"latitude":${destination.lat},"longitude":${destination.lng},"title":${endAddress.split(",")[0]}}`

  // console.log(product)
  return(
    <Modal size={'mini'} trigger={<a href="javascript:;">{price.display_name}</a>} closeIcon>
      <Header color='grey' icon={<Image src={product.image} />} content={price.display_name} as='h1'/>
      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {price && price.distance ? `${price.distance} miles` : ''}</p>
        <p>Duration: {price && price.duration ? `${Math.round(price.duration/60)} minutes` : ''}</p>
        <p>Shared: {product.shared ? "Yes" : "No"}</p>
        <p>Capacity: {product.capacity || ''}</p>
        <p>Surge: {price.surge_multiplier > 1.0 ? "Yes" : "No"}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Driver Info</h2>
        <p>Earning: {price ? `$${Math.round(price.low_estimate*.75)}-${Math.round(price.high_estimate*.75)}` : ''}</p>
        <p>Eta: {eta && eta.estimate ? `${Math.round(eta.estimate/60)} minutes` : ''}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {product ? product.price_details.base : ''}</p>
        <p>Cost Per Distance: {product ? product.price_details.cost_per_distance : ''}</p>
        <p>Cost Per Mile: {product ? product.price_details.cost_per_minute : ''}</p>
        <p>Cancellation Fee: {product ? `$${product.price_details.cancellation_fee}` : ''}</p>
        <p>Estimate: {price && price.estimate ? price.estimate : ''}</p>
      </Modal.Content>

      <Modal.Actions>
        <Button color='grey' content="Get Uber" onClick={() => window.open(encodeURI(url))} />
      </Modal.Actions>
    </Modal>

  )
}


export default UberModal;
