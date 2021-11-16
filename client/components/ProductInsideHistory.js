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
    <div>
      <h3>Product Name: {name}</h3>
      <div><img src={imgUrl} /></div>
      <div>Purchase Price: ${purchasePrice} </div>
      <div>Purchase Quantity: {quantity} </div>
      <div>Purchase Total: ${purchasePrice * quantity} </div>
      <div>Purchase Date: {purchaseDate} </div>

      <Link to={linkDestination}>
        <button type="button" >VIEW PRODUCT</button>
      </Link>
      <br/>
    </div>
  )
  }
}




export default ProductInsideHistory;
