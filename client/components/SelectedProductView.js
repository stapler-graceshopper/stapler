import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/reducers/selectedProduct";
import { postItemToCart } from "../store/reducers/shoppingCart";

class SelectedProductView extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.productId;
    this.props.fetchSingleProduct(Number(id));
  }

  handleSubmit(evt) {
    evt.preventDefault();

    //qty is 1 by default, change when you add qty to component
    this.props.postItem(this.props.selectedProduct.id, 1);
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
        <button type="submit" onClick={this.handleSubmit}>
          Add ToCart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    postItem: (id, amount) => dispatch(postItemToCart(id, amount)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductView);
