import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// BrowserRouter interacts with the history
// Switch component takes in a couple routes and decides to render one route
// Only match the FIRST route that match the url
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

// import App from './components/app'; FILE deleted because rely on router
import reducers from './reducers';
import PostsIndex from './components/posts_index'
import PostsNew from './components/posts_new'
import PostsShow from './components/posts_show'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Hello extends React.Component {
  render() { return <div>Hello!</div> }
}

class Goodbye extends React.Component {
  render() { return <div>Goodbye!</div> }
}

// <Route path="/hello" component={Hello} /> means:
// if the url goes to the path="", then display this component
// SWITCH: Put the most specific route at the top
// :id must come after new because :id is a wildcard component and will accidently match with /new
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
