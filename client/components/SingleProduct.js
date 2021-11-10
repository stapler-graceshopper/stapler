import React from 'react'
import {connect} from 'react-redux'

const singleProduct = (props) => {

  const product = props.product
  const {id, name, description, imgUrl, quantity, itemNumber, inStock} = product

  return (
    <div>
      <h3>Product Name: {name}</h3>
      <p>
        description: {description} <br />
        quantity: {quantity} <br />
        itemNumber: {itemNumber} <br />
        inStock: {inStock ? 'true' : 'false'} <br />
      </p>
    </div>
  )
}

export default singleProduct;
