import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'

class PostsShow extends Component {

  componentDidMount(){
    // match.params looks for the declarables in the URL, provided by react router
    // { id } basically declares this.props.id = this.props.match.params.id -> good resource to learn about DESTRUCTURING: http://es6katas.org/
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick(){
    const { id } = this.props.match.params;
    // do not use this.props.post.id because the post may not have been returned yet by the time the dom is rendered
    this.props.deletePost(id, ()=>{
      this.props.history.push('/')
    })
  }

  render() {
    const { post } = this.props
    if(!post){
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{ post.title }</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

// {posts} -> because we only care about the posts piece inside the state
// own props is going to go into the component
function mapStateToProps({posts}, ownProps){
  return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchPost, deletePost})(PostsShow)
