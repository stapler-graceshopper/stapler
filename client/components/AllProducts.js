import React from 'react'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {fetchAllProducts} from '../store/reducers/products'

class AllProducts extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {

    const products = this.props.products || []

    const allProductsDiv = products.length > 0 ? products.map(product => (
      <SingleProduct key={product.id} product={product} /> )) : <span>No Products</span>

    return (
      <div>
        <hr />
        <h2>ALL PRODUCTS</h2>
        {allProductsDiv}
        <hr />
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      products: state.products
    }
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
      fetchAllProducts: () => dispatch(fetchAllProducts())
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
