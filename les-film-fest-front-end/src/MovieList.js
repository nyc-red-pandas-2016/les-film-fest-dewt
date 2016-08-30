import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MovieList extends Component {
  render() {
    return (
      <div>
        <Link to="/movies/1">Movie 1</Link>
      </div>
    )
  }
}
