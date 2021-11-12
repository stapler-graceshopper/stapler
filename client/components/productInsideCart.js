import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const productInsideCart = (props) => {

  const product = props.product
  const {id, name, description, imgUrl, quantity, price} = product
  const quantityInCart = product.shoppingCart.quantity
  const linkDestination = `/products/${id}`

  return (
    <div>
      <h3>Product Name: {name}</h3>
      <span>Price: ${price} </span>
      <img src={imgUrl} />
      <Link to={linkDestination}>
        <button type="button" >VIEW PRODUCT</button>
      </Link>
      <br />
      <p>
        {/* place holder name for how many you have in cart */}
        This Many In Cart: {quantityInCart} <br />
      </p>
    </div>
  )
}

export default productInsideCart;
