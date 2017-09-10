import React, {Component} from 'react';
// import two helpers from redux-form
// field is used to specify an input in Component
// reduxForm function helper is like the connect helper,
// ... give redux form to communite directely with the reducer action
import { Field, reduxForm } from 'redux-form'

class PostsNew extends Component {
  renderField(field){
    return (
      <div className='form-group'>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        {field.meta.error}
      </div>
    )
  }

  // renderTitleField does not have () because the field will call the function at some point in the future
  // ... we are not calling the renderTitleField ourselves
  render(){
    return (
      <form>
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
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
