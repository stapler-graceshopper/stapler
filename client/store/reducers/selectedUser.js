import axios from 'axios'
import { authenticateRequest } from "../gatekeepingMiddleware";

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

const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id
  }
}

// thunks

export const fetchUser = (id) => async (dispatch) => {
  try {
    const user = await authenticateRequest('get', `/api/users/${id}`)

    if (user) {
      dispatch(getUser(user))
    }
  } catch (error) {
    console.log(error);
  }
}

export const modifySelf = (update) => async (dispatch) => {
  try {
    const updatedUser = await authenticateRequest('put', `/api/users/byToken`, update)
    dispatch(updateUser(updatedUser))
  } catch (error) {
    console.log(error)
  }
}

export const modifyUser = (id, user) => async (dispatch) => {
  try {
    const updatedUser = await authenticateRequest('put', `/api/users/${id}`, user)

    if (updatedUser) {
      dispatch(updateUser(updatedUser))
    }
  } catch (error) {
    console.log(error)
  }
}

export const removeUser = (id) => async (dispatch) => {
  try {
    const res = await authenticateRequest('delete', `api/users/${id}`)

    if (res.status === 202) {
      dispatch(deleteUser(id))
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
