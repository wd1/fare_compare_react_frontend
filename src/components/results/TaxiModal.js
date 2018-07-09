import React from 'react';
import { Header, Modal } from 'semantic-ui-react'

const formatProducts = (businesses) => {
  businesses.map(business => {
    return(
        <p>{`${business.name}, ${business.phone}, ${business.type}`}</p>
    )
  })
}

const TaxiModal = (props) => {
  const { price, product, eta } = props
  // console.log(price)
  const productsToDisplay = product && product.businesses ? formatProducts(product.businesses) : null

  return(
    <Modal size={'mini'} trigger={<a href="javascript:;">Taxi Cab</a>} closeIcon>
      <Header color='yellow' icon='car' content={"Taxi Cab"} as='h1'/>

      <Modal.Content>
        <h2>Ride Info</h2>
        <p>Distance: {Math.round(price.distance/1609.344) ? `${Math.round(price.distance/1609.344)} miles` : ''}</p>
        <p>Duration: {Math.round(price.duration/60) ? `${Math.round(price.duration/60)} minutes` : ''}</p>
        <p>Shared: No</p>
        <p>Capacity: Varies</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Driver Info</h2>
        <p>Earning: {Math.round(price.total_fare - price.tip_amount) ? `$${Math.round((price.total_fare - price.tip_amount)*.66)}` : ''}</p>
        <p>Eta:</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Fare Info</h2>
        <p>Base Fare: {price.initial_fare ? `$${price.initial_fare}` : ''}</p>
        <p>Metered Fare: {price.metered_fare ? `$${price.metered_fare}` : ''}</p>
        <p>Estimate: {Math.round(price.total_fare - price.tip_amount) ? `$${Math.round(price.total_fare - price.tip_amount)}` : ''}</p>
      </Modal.Content>
      <Modal.Content>
        <h2>Nearby Taxi Businesses</h2>
        {productsToDisplay}
      </Modal.Content>

    </Modal>

  )
}

export default TaxiModal;
