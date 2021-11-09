import axios from 'axios'

// ACTION TYPES

const GET_USERS = 'GET_USERS'

// ACTION CREATORS

const getAllUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

// THUNKS

export const fetchAllUsers = () => async(dispatch) => {
  const {data: users} = await axios.get('/api/users')
  dispatch(getAllUsers(users))
}

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}

export default reducer
