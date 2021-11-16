import React from 'react'
import { connect } from 'react-redux';
import { fetchCategories, postNewCategory, removeCategory } from '../store/reducers/categories'

class ViewCategories extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this)
    this.state = {
      newCategory: "",
      deleteCategory: ""
    }
  }

  async componentDidMount() {
    await this.props.fetchCategories()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleAddCategory(event) {
    event.preventDefault();
    if (this.state.newCategory !== "") {
    this.props.postNewCategory(this.state.newCategory)
    this.setState({newCategory: ""})
    }
  }

  handleDeleteCategory(event, cats) {
    event.preventDefault();
    if (cats.includes(this.state.deleteCategory)) {
      this.props.removeCategory(this.state.deleteCategory)
    }
    this.setState({deleteCategory: ""})
  }

  render() {
    const catsByName = this.props.categories.map(cat => cat.name)
    const categories = this.props.categories

    return (
      <div>

        <h3 className="flex">All Categories</h3>
        <div className="flex">
          <div className="list">
            {categories.map((category)=>(
              <div key={category.id || -1} className="item">
                <div>{category.name}</div>
              </div>
            ))}
          </div>
         </div>

          <hr />

          <h3 className="flex">Add A Category</h3>

          <form className="inputText" onSubmit={this.handleAddCategory}>
            <label htmlFor="Add a Category to the Database" className="center">Add a Category to the Database</label>
            <input type="text" name="newCategory" value={this.state.newCategory} onChange={this.handleChange}/>

            <button type="submit" className="button">Submit</button>
          </form>
          <hr />
          <h3 className="flex">Delete A Category</h3>
          <form className="inputText" onSubmit={(event) => this.handleDeleteCategory(event, catsByName)}>
            <label htmlFor="Delete a Category to the Database" className="center">Delete a Category from the Database</label>
            <input type="text" name="deleteCategory" value={this.state.deleteCategory} onChange={this.handleChange}/>

            <button type="submit" className="button">Submit</button>
          </form>

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    postNewCategory: (name) => dispatch(postNewCategory(name)),
    removeCategory: (name) => dispatch(removeCategory(name))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ViewCategories)
