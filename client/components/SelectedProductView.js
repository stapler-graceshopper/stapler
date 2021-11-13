import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/reducers/selectedProduct";
import { postItemToCart, updateItemInCart } from "../store/reducers/shoppingCart";

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

    const ifItemInCart = this.props.shoppingCart.filter(product => product.id === this.props.selectedProduct.id);

    if (ifItemInCart.length === 0) {
      this.props.postItem(this.props.selectedProduct.id, this.state.quantity);
    } else {
      this.props.updateItem(this.props.selectedProduct.id, (ifItemInCart[0].shoppingCart.quantity + this.state.quantity))

    }

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
          <input type='number' min="1" max={quantity} name='quantity' value={this.state.quantity} onChange={this.handleChange}/>

          <button type="submit">Add To Cart</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
    shoppingCart: state.shoppingCart
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    postItem: (id, amount) => dispatch(postItemToCart(id, amount, history)),
    updateItem: (id, amount) => dispatch(updateItemInCart(id, amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductView);
