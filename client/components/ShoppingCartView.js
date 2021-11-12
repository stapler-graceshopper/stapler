import React from 'react'
import {connect} from 'react-redux'
import { fetchShoppingCart, deleteItemInCart } from '../store/reducers/shoppingCart'
import ProductInsideCart from './productInsideCart'


class ShoppingCartView extends React.Component{
  constructor() {
    super()

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchShoppingCart()
  }

  handleDelete(evt, id) {
    evt.preventDefault()
    this.props.deleteItem(id)
  }

  render() {
    return(
      <div>
        <h2>This is your shopping cart</h2>
        {this.props.shoppingCart.map(product => (
            <ProductInsideCart key={product.id} product={product} handleDelete={this.handleDelete}/>
          )
        )}
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    shoppingCart: state.shoppingCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShoppingCart: () => dispatch(fetchShoppingCart()),
    deleteItem: (id) => dispatch(deleteItemInCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartView)
