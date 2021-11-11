import React from "react";
import { connect } from "react-redux";
import { fetchAllUserProducts } from "../store/reducers/cart"

class AllUserProducts extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUserProducts()
  }

  render() {
    const allUserProductsDiv = this.props.userProducts.length > 0 ? this.props.userProducts.map(product => (
      <SingleProduct key={product.id} product={product} />
      )) : <span>No Products In Cart</span>

    return (
      <div>
        <hr />
        <h2>ALL PRODUCTS IN CART</h2>
        {allUserProductsDiv}
        <hr />
      </div>
    )
}}
const mapState = state => {
  return { userProducts: state.cart };
};

const mapDispatch = dispatch => {
  return {
    getUserProducts: () => dispatch(fetchAllUserProducts())
  }
}

export default connect(mapState, mapDispatch)(AllUserProducts);
