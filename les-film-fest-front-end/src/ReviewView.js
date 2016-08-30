import React, { Component } from 'react';
import Axios from 'axios';

export default class ReviewView extends Component {
  constructor() {
    super();
    this.state = {
      review: {},
      comments: []
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:3000/movies/${this.props.params.movie_id}/reviews/${this.props.params.review_id}`)
      .then((response) => {
        this.setState({
          review: response.data.review,
          comments: response.data.comments
        })
      })
  }

  render() {
    return (
      <div>
        <p>{this.state.review.body}</p>
        <h2>Comments</h2>
        <ul className="comment-display">
          {this.state.comments.map((comment, index) => {
            return (
              <li key={index} className="individual-comment">
                {comment.body}
              </li>
            )}
          )}
        </ul>
      </div>
    )
  }
}
