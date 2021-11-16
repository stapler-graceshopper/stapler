import React from 'react'
import {Link} from 'react-router-dom'


class ProductInsideHistory extends React.Component {
  constructor() {
    super();

  }

  render() {
    const product = this.props.product
    const {id, name, description, imgUrl} = product
    const {quantity, purchasePrice, purchaseDate} = product.shoppingCart
    const linkDestination = `/products/${id}`

  return (
    <div className="product">
      <img src={imgUrl} />
      <div className="info">
        <h1>Product Name: {name}</h1>
        <h1>Purchase Price: ${purchasePrice}</h1>
        <h1>Purchase Quantity: {quantity}</h1>
        <h1>Purchase Total: ${purchasePrice * quantity} </h1>
        <h1>Purchase Date: {purchaseDate} </h1>
      </div>

      <Link to={linkDestination}>
        <button type="button" className="button">VIEW PRODUCT</button>
      </Link>
    </div>
  )
  }
}




export default ProductInsideHistory;
