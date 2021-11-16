import axios from 'axios';

// Action types

const GET_CATEGORIES = "GET_CATEGORIES"
const ADD_CATEGORY = "ADD_CATEGORY"
const DELETE_CATEGORY = "DELETE_CATEGORY"

// Action creators

const getCategories = (data) => {
  return {
    type: GET_CATEGORIES,
    categories: data
  }
}

const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category,
  }
}

const deleteCategory = (name) => {
  return {
    type: DELETE_CATEGORY,
    name
  }
}

// Thunks

export const fetchCategories = () => async (dispatch) => {
  try{
    const {data} = await axios.get('/api/category')
    dispatch(getCategories(data))
  } catch (error) {
    console.log(error)
  }
}

export const postNewCategory = (name) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      const {data} = await axios.post(`/api/category/${name}`, {}, {
        headers: {
          authorization: token,
        },
      })
      dispatch(addCategory(data))
    }


  } catch (error) {
    console.log(error)
  }
}

export const removeCategory = (name) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    if(token) {
      await axios.delete(`/api/category/${name}`, {
        headers: {
          authorization: token,
        },
      })
      dispatch(deleteCategory(name))
    }

  } catch (error) {
    console.log (error)
  }
}

// Reducer

const reducer = (state = [], action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories
    case ADD_CATEGORY:
      return [...state, action.category]
    case DELETE_CATEGORY:
      return [...state.filter((category)=>{return category.name !== action.name})]
    default:
      return state
  }
}

export default reducer;
