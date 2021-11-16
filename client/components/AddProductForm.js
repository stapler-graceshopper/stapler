import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../store/reducers/products";

class AddProductForm extends React.Component {
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
        <div className="flex">
          <form id="form" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="name"><small>NAME</small></label>
            <input type="text" onChange={handleChange} name="name" value={name}
            className="input"/>
            </div>
            <div>
            <label htmlFor="description"><small>DESCRIPTION</small></label>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              value={description}
              className="input"
            />
            </div>
            <div>
            <label htmlFor="quantity"><small>QUANTITY</small></label>
            <input
              type="text"
              onChange={handleChange}
              name="quantity"
              value={quantity}
              className="input"
            />
            </div>
            <div>
            <label htmlFor="itemNumber"><small>ITEM NUMBER</small></label>
            <input
              type="text"
              onChange={handleChange}
              name="itemNumber"
              value={itemNumber}
              className="input"
            />
            </div>
            <div>
            <label htmlFor="price"><small>PRICE</small></label>
            <input
              type="text"
              onChange={handleChange}
              name="price"
              value={price}
              className="input"
            />
            </div>
            <button type="submit" className="button">Submit</button>
          </form>
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
    user: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
