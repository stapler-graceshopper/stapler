import React from 'react'
import {connect} from 'react-redux'
// eslint-disable-next-line no-unused-vars
import SingleProduct from './SingleProduct'
import { fetchAllProducts, fetchProductsByCategory } from '../store/reducers/products'
import { fetchCategories } from '../store/reducers/categories'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.state = {
      category: 'View All'
    }
  }

  componentDidMount() {
    this.props.fetchAllProducts()
    this.props.fetchCategories()
  }

  async onChange(event) {
    event.preventDefault()
    await this.setState({
      [event.target.name]: event.target.value
    })
    if (this.state.category !== 'View All') {
    await this.props.fetchProductsByCategory(this.state.category)
    } else {
      await this.props.fetchAllProducts();
    }
  }

  render() {

    let products = this.props.products || []
    products = products.filter(product => product.quantity > 0)

    console.log(products)

    const allProductsDiv = products.length > 0 ? products.map(product => (
      <SingleProduct key={product.id} product={product} />
      )) : <span className="flex">No Products</span>

    return (
      <div>
        <label htmlFor="categories" id="bold">Choose a Category</label>
        <select className="button" name="category" onChange={this.onChange}>
          <option key={-1} value="View All">VIEW ALL</option>
          {this.props.categories.map(category=>(
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
        <hr />
        <h2 className="flex">ALL PRODUCTS</h2>
        {allProductsDiv}
        <hr />
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      products: state.products,
      categories: state.categories

    }
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
      fetchAllProducts: () => dispatch(fetchAllProducts()),
      fetchProductsByCategory: (category) => dispatch(fetchProductsByCategory(category)),
      fetchCategories: () => {dispatch(fetchCategories())}
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
