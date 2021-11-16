import React from "react";
import { connect } from "react-redux";
import {  } from "../store/reducers/products";
import { clearSelectedProduct } from '../store/reducers/selectedProduct'
import AllProductsTable from "./AllProductsTable";

class EditProductForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      description: "",
      quantity: "",
      itemNumber: "",
      price: ""
    };
  }

  componentDidMount() {
    this.props.clearSelectedProduct()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name + ": " + event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    // if(this.state.name === '') {
    //* write code for on screen error msg here
    // } else {
    const editedProduct = { ...this.state };
    // this.props.createProduct(newProduct);
    //reset state
    this.setState({
      name: "",
      description: "",
      quantity: "",
      itemNumber: "",
      price: ""
    });
    console.log("got here, end of handleSubmit");
    // }
  }

  render() {
    const { name, description, quantity, itemNumber, price } = this.state;
    const { handleChange, handleSubmit } = this;

    if (this.props.user.type === "admin") {
      return (
        <div>
           { this.props.selectedProduct.name ?
          <div>
            <h3>Product Name: {this.props.selectedProduct.name}</h3>
            <span>Price: ${this.props.selectedProduct.price} </span>
            <img src={this.props.selectedProduct.imgUrl} />
            <p>
              description: {this.props.selectedProduct.description} <br />
              quantity: {this.props.selectedProduct.quantity} <br />
              itemNumber: {this.props.selectedProduct.itemNumber} <br />
            </p>
          </div>
          :
          <div>
            <h3>No Product Selected</h3>
            <h3>Choose A Product From The Table Below</h3>
          </div>
          }
          <hr />

          <hr />
          <h3>Edit Selected Product</h3>
          <form id="EditProductForm" onSubmit={handleSubmit}>
            <label htmlFor="name">CHANGE NAME</label>
            <input type="text" onChange={handleChange} name="name" value={name} />

            <label htmlFor="description">CHANGE DESCRIPTION</label>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              value={description}
              />

            <label htmlFor="quantity">CHANGE STOCK</label>
            <input
              type="text"
              onChange={handleChange}
              name="quantity"
              value={quantity}
              />

            <label htmlFor="itemNumber">CHANGE ITEM NUMBER</label>
            <input
              type="text"
              onChange={handleChange}
              name="itemNumber"
              value={itemNumber}
              />

            <label htmlFor="price">PRICE</label>
            <input
              type="text"
              onChange={handleChange}
              name="price"
              value={price}
              />

            <br />

            <button type="submit">Submit</button>
          </form>
          <hr />
          <h3>AllProductsTable</h3>
          <AllProductsTable/>
        </div>
      );
    } else {
      return <div>bad token</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    selectedProduct: state.selectedProduct,
    user: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSelectedProduct: () => dispatch(clearSelectedProduct())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);
