import React, {Component} from 'react';
// import two helpers from redux-form
// field is used to specify an input in Component
// reduxForm function helper is like the connect helper,
// ... give redux form to communite directely with the reducer action
import { Field, reduxForm } from 'redux-form'
// Link is equivilant to routerLink
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField(field){
    const { meta: {touched, error} } = field;
    const className=`form-group ${touched && error ? 'has-danger':''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {field.meta.touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values){
    // this.props.history.push('/')
    // this.props.createPost(values)
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  // renderTitleField does not have () because the field will call the function at some point in the future
  // ... we are not calling the renderTitleField ourselves
  render(){

    const { handleSubmit } = this.props
    // <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> explained:
    // first the reduxform will decide if everything is ok, without error...
    // if ok, it then calls the onSubmit function and passes values out of the form to process
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title For Post'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {};
  // validate the inputs from 'values'
  if (!values.title){
    errors.title = "Enter a title";
  }
  if (!values.categories){
    errors.categories = "Enter some categories";
  }
  if (!values.content){
    errors.content = "Enter some content";
  }
  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

// form: xxx <--- must be unique
// how to stack multiple connect like objects? reduxform({})(connect(null,{})(PostNew))
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
