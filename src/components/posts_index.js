import _ from 'lodash'
import React, {Component } from 'react';
import { connect } from 'react-redux';
// allows user to route around, same as anchor tag
import { Link } from 'react-router-dom'
import { fetchPosts } from '../actions'


class PostsIndex extends Component {
  // immediately be called by react as soon as PostsIndex shows up in the DOM
  // the same as ngOnInit in angualr2
  componentDidMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    // cannot use normal map because is object of objects
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      )
    })
  }

  render(){
    return (
      <div>
        <div className='text-xs-right'>
          <Link className='btn btn-primary' to='/posts/new'>
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { posts:state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);