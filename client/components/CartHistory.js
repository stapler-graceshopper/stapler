import React from 'react'
import {connect} from 'react-redux'
import { fetchCartHistory } from '../store/reducers/cartHistory'
import ProductInsideHistory from './ProductInsideHistory'


class CartHistory extends React.Component{
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchCartHistory()
  }


  render() {

    return(
      <div>
        <h2>This is your shopping history</h2>
        {this.props.cartHistory.map(product => (
            <ProductInsideHistory key={product.shoppingCart.id} product={product}/>
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    cartHistory: state.cartHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartHistory: () => dispatch(fetchCartHistory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartHistory)
