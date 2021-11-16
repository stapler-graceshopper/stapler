import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateItemInCart, deleteItemInCart} from '../store/reducers/shoppingCart'

class ProductInsideCart extends React.Component {
  constructor() {
    super();
    this.state= {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({quantity: this.props.product.shoppingCart.quantity})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.updateItem(this.props.product.id, this.state.quantity);
  }

  render() {

    const product = this.props.product
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='quantity'>Quantity</label>
          <input type='number' min="1" max={quantity} name='quantity' value={this.state.quantity} onChange={this.handleChange}/>

          <button type="submit">Update Quantity</button>
        </form>

        <button type='submit' onClick={(evt) => this.props.handleDelete(evt, id)}>Remove From Cart</button>
      </div>
    </div>
  )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (id, amount) => dispatch(updateItemInCart(id, amount)),
  }
}


export default connect(null, mapDispatchToProps)(ProductInsideCart);
