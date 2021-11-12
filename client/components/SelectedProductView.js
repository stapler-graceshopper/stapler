import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/reducers/selectedProduct";
import { postItemToCart } from "../store/reducers/shoppingCart";

class SelectedProductView extends React.Component {
  constructor() {
    super();

    //make sure to add a range for the qty
    this.state = {
      quantity: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.productId;
    this.props.fetchSingleProduct(Number(id));
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();

    //qty is 1 by default, change when you add qty to component
    this.props.postItem(this.props.selectedProduct.id, this.state.quantity);
  }

  render() {
    const { id, name, description, imgUrl, quantity, itemNumber, price } =
      this.props.selectedProduct;

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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='quantity'>Quantity</label>
          <input type='number' name='quantity' value={this.state.quantity} onChange={this.handleChange}/>

          <button type="submit">Add To Cart</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    postItem: (id, amount) => dispatch(postItemToCart(id, amount, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductView);
