import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/reducers/products";

class AddProductForm extends React.Component {
  constructor() {
    super();
    this.setInStock = this.setInStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      description: "",
      quantity: "",
      itemNumber: "",
    };
  }

  // componentDidMount() {
  // }

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
    const newProduct = { ...this.state };
    this.props.createProduct(newProduct);
    //reset state
    this.setState({
      name: "",
      description: "",
      quantity: "",
      itemNumber: "",
    });
    console.log("got here, end of handleSubmit");
    // }
  }

  render() {
    const { name, description, quantity, itemNumber } = this.state;
    const { handleChange, handleSubmit } = this;

    if (this.props.user.type === "admin") {
      return (
        <form id="NewProductForm" onSubmit={handleSubmit}>
          <label htmlFor="name">NAME</label>
          <input type="text" onChange={handleChange} name="name" value={name} />

          <label htmlFor="description">DESCRIPTION</label>
          <input
            type="text"
            onChange={handleChange}
            name="description"
            value={description}
          />

          <label htmlFor="quantity">QUANTITY</label>
          <input
            type="text"
            onChange={handleChange}
            name="quantity"
            value={quantity}
          />

          <label htmlFor="itemNumber">ITEM NUMBER</label>
          <input
            type="text"
            onChange={handleChange}
            name="itemNumber"
            value={itemNumber}
          />

          <br />

          <button type="submit">Submit</button>
        </form>
      );
    } else {
      return <div>bad token</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
