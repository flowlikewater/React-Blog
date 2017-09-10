import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_post'

const ROOT_URL = 'https://react-blog-api.herokuapp.com'
const API_KEY = '?key=thechosen1'

export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function createPost(values, callback){
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback())
  return {
    type: CREATE_POST,
    payload: request
  }
}
