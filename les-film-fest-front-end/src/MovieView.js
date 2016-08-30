import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MovieView extends Component {
  render() {
    let url=`/movies/${this.props.params.movie_id}/reviews`
    return (
      <div>
        <p>View of Movie {this.props.params.movie_id}</p>
        <Link to={`${url}/1`}>Review 1</Link>
        {this.props.children}
      </div>
    )
  }
}