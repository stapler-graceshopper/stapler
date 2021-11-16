import React from "react";
import { connect } from "react-redux"
import { fetchAllProducts } from "../store/reducers/products";
import { fetchSingleProduct } from "../store/reducers/selectedProduct";

class AllProductsTable extends React.Component {
  constructor() {
    super()
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllProducts()
  }

  handleSelectProduct(event, id) {
    event.preventDefault()
    this.props.fetchSingleProduct(id)
  }


  render() {

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product)=>(
              <tr key={product.id} >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td onClick={(event)=>this.handleSelectProduct(event, product.id)}>Click to Select</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    selectedProduct: state.selectedProduct,
    user: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsTable);
