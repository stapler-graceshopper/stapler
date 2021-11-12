import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct } from '../store/reducers/selectedProduct'
import { postItemToCart } from '../store/reducers/shoppingCart'

class SelectedProductView extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.fetchSingleProduct(Number(id))
  }

  handleAddToCart(event, id, amount = 1) {
    if (!user.type === 'guest') {
    event.preventDefault;
    this.props.postItemToCart(id, amount)
    } else {

    }
  }

  render() {

    const {id, name, description, imgUrl, quantity, itemNumber, price} = this.props.selectedProduct

    return (
      <div>
        <h3>Product Name: {name}</h3>
        <span>Price: ${price} </span>
        <img src={imgUrl} />
        <p>
          description: {description} <br />
          quantity: {quantity} <br />
          itemNumber: {itemNumber} <br />
        </p>
        <hr />
        <button type="button" onClick={(event, id, amount)=>{this.handleAddToCart(event, id, amount)}}>Add To Cart</button>
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    postItemToCart: (id, amount) => dispatch(postItemToCart(id, amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProductView)
