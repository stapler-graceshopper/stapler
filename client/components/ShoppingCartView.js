import React from 'react'
import {connect} from 'react-redux'
import { fetchShoppingCart } from '../store/reducers/shoppingCart'
import productInsideCart from './productInsideCart'

class ShoppingCartView extends React.Component{
  constructor() {
    super()
  }

  componentDidMount() {
    fetchShoppingCart()
  }

  render() {
    console.log(this.props.shoppingCart)

    return(
      <div>
        {this.props.shoppingCart.map((product)=>{
          return (
            <productInsideCart key={product.id} product={product} />
          )
        })}
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShoppingCart: () => dispatch(fetchShoppingCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartView)
