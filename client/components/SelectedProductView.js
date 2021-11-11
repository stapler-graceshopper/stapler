import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct } from '../store/reducers/selectedProduct'

class SelectedProductView extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.fetchSingleProduct(Number(id))
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
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectedProduct
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProductView)
