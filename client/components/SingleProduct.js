// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {Link} from 'react-router-dom'

const singleProduct = (props) => {

  const product = props.product
  let {id, name, description, imgUrl, quantity, price} = product
  const linkDestination = `/products/${id}`

  price = price || 0;

  return (
    <div className="product">
      <img src={imgUrl} />
      <div className="info">
        <h1>Product Name: {name}</h1>
        <h1>Price: ${price.toFixed(2)} </h1>
        <h1>quantity: {quantity}</h1>
        <p>description: {description}</p>
        <Link to={linkDestination}>
          <button type="button" className="button">VIEW PRODUCT</button>
        </Link>
      </div>
      <p id="itemNumber">itemNumber: {id}</p>
    </div>
  )
}

export default singleProduct;
