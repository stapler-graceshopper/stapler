import axios from 'axios'

// Action type

const GET_USER = 'GET_USER'
const CLEAR_USER = 'CLEAR_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

// action creators

const getUser = (data) => {
  return {
    type: GET_USER,
    user: data
  }
}

export const clearUser = () => {
  return {
    type:CLEAR_USER
  }
}

const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    user: data
  }
}

const deleteUser = () => {
  return {
    type: DELETE_USER,
  }
}

// thunks

export const fetchUser = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");

    const {data} = await axios.get(`/api/users/${id}`, {
      headers: {
        authorization: token
      }
    })
    dispatch(getUser(data))
  } catch (error) {
    console.log(error);
  }
}

export const modifyUser = (id, user) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const {data} = await axios.put(`/api/users/${id}`, user, {
      headers: {
        authorization: token
      }
    })
    dispatch(updateUser(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeUser = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const res = await axios.delete(`api/users/${id}`, {
      headers: {
        authorization: token
      }
    })
    if (res.status === 202) {
      dispatch(deleteUser())
    } else {
      console.log('CAUGHT ERROR: REQUEST FAILED')
    }
  } catch (error) {
    console.log(error)
  }
}

// reducer

const reducer = (state = {}, action) => {
  switch(action.type) {
    case GET_USER:
      return action.user
    case CLEAR_USER:
      return {}
    case UPDATE_USER:
      return action.user
    case DELETE_USER:
      return {}
    default:
      return state
  }
}

export default reducer
