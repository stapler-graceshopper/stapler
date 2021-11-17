import React from "react";
import { connect } from "react-redux";
import {
  fetchShoppingCart,
  deleteItemInCart,
  checkoutCart,
  guestCheckout,
} from "../store/reducers/shoppingCart";
// eslint-disable-next-line no-unused-vars
import ProductInsideCart from "./productInsideCart";

class ShoppingCartView extends React.Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    this.props.fetchShoppingCart();
  }

  handleDelete(evt, id) {
    evt.preventDefault();
    this.props.deleteItem(id);
  }

  handleCheckout(evt) {
    evt.preventDefault();
    if (this.props.user.id) {
      this.props.checkoutCart();
    } else {
      this.props.guestCheckout(this.props.shoppingCart);
    }
  }

  render() {
    return (
      <div>
        <h2 className="flex">This is your shopping cart</h2>
        <div>
          <button onClick={this.handleCheckout} className="checkout">
            Checkout
          </button>
        </div>
        <br />
        {this.props.shoppingCart.map(product => (
          <ProductInsideCart
            key={product.id}
            product={product}
            handleDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    shoppingCart: state.shoppingCart,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchShoppingCart: () => dispatch(fetchShoppingCart()),
    deleteItem: id => dispatch(deleteItemInCart(id)),
    checkoutCart: () => dispatch(checkoutCart(history)),
    guestCheckout: cart => dispatch(guestCheckout(cart, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartView);
