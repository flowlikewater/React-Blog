import _ from 'lodash'
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'

export default function(state = {}, action) {
  switch(action.type){
  case DELETE_POST:
    return _.omit(state, action.payload)
  case FETCH_POST:
    // take all the existing posts we have, take them all out of the state object and putthem into the new object that we will return
    // as the user looks for more individual posts, we will fetch them and insert them into the state
    // const post = action.payload.data
    // const newState = { ...state  }
    // newState[post.id] = post;
    // return newState
    return { ...state, [action.payload.data.id]: action.payload.data }
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id')
  default:
    return state;
  }
}
