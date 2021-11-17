import React from "react";
import { connect } from "react-redux";
import { fetchAllProducts } from "../store/reducers/products";
import { clearSelectedProduct, fetchModifiedProduct, removeProduct } from '../store/reducers/selectedProduct'
import AllProductsTable from "./AllProductsTable";

// JOE_CR: Interesting utility! I see it is for removing keys for fields that were not filled out.
const clearEmptyObjectKeys = (obj) => {
  try {
    Object.keys(obj).forEach(key => {
      if (obj[key] === '' || key === 'err') {
        delete obj[key]
      }
    })
  } catch (err) {
    console.log(err)
  }
}

class EditProductForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  async handleSubmit(event) {
    event.preventDefault();
    if (this.props.selectedProduct.id) {
      const editedProduct = {
        id: this.props.selectedProduct.id,
        name: this.state.name,
        description: this.state.description,
        quantity: this.state.quantity,
        itemNumber: this.state.itemNumber,
        price: this.state.price
      };
      clearEmptyObjectKeys(editedProduct)
      await this.props.fetchModifiedProduct(editedProduct)
      // JOE_CR: I am seeing a lot of re-fetching happening.
      await this.props.fetchAllProducts();

      this.setState({
        name: "",
        description: "",
        quantity: "",
        itemNumber: "",
        price: ""
      });
    } else {
      console.log('select a product before submitting changes')
    }
  }

  handleDelete() {
    this.props.removeProduct(this.props.selectedProduct.id)
    this.props.fetchAllProducts()
  }

  render() {
    const { name, description, quantity, itemNumber, price } = this.state;
    const { handleChange, handleSubmit, handleDelete } = this;

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
          <hr />
          <button type="button" onClick={handleDelete}> DELETE PRODUCT </button>
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
    clearSelectedProduct: () => dispatch(clearSelectedProduct()),
    fetchModifiedProduct: (product) => dispatch(fetchModifiedProduct(product)),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    removeProduct: (id) => dispatch(removeProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm);
