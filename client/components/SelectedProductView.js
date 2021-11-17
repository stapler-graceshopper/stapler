import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/reducers/selectedProduct";
import { postItemToCart, updateItemInCart } from "../store/reducers/shoppingCart";

class SelectedProductView extends React.Component {
  constructor() {
    super();

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

  async handleSubmit(evt) {
    evt.preventDefault();

    const ifItemInCart = this.props.shoppingCart.filter(product => {
      if (product.id === this.props.selectedProduct.id) {
        return true;
      } else {
        return false;
      }
    });



    if (ifItemInCart.length === 0) {
      this.props.postItem(this.props.selectedProduct.id, Number(this.state.quantity));
    } else {
      await this.props.updateItem(this.props.selectedProduct.id, (Number(ifItemInCart[0].shoppingCart.quantity) + Number(this.state.quantity)))

      this.props.redirectToCart()
    }

  }

  render() {
    const { id, name, description, imgUrl, quantity, price } =
      this.props.selectedProduct;

    return (
      <div className="product">
        <img src={imgUrl} />
        <div className="info">
          <h1>Product Name: {name}</h1>
          <h1>Price: ${price}</h1>
          <h1>quantity: {quantity}</h1>
          <p>description: {description}</p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='quantity'>Quantity</label>
            <input type='number' min="1" max={quantity} name='quantity' value={this.state.quantity} onChange={this.handleChange}/>
            <button type="submit" className="button">Add To Cart</button>
          </form>
        </div>
        <p id="itemNumber">itemNumber: {id}</p>
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
    updateItem: (id, amount) => dispatch(updateItemInCart(id, amount)),
    redirectToCart: () => history.push('/shoppingCart')
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductView);
