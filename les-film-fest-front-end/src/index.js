import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import SignUp from './SignUp';
import SignIn from './SignIn';
import MovieList from './MovieList';
import MovieView from './MovieView';
import ReviewView from './ReviewView';
import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MovieList} />
      <Route path="/movies/:movie_id" component={MovieView}>
        <Route path="/movies/:movie_id/reviews/:review_id" component={ReviewView} />
      </Route>
      <Route path="/sign_up" component={SignUp} />
      <Route path="/sign_in" component={SignIn} />
    </Route>
  </Router>
), document.getElementById('root'));
