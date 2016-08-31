import React, { Component } from 'react';
import Axios from 'axios';

export default class ReviewView extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.review.reviewContent.title}</h2>
        <p>{this.props.review.reviewContent.body}</p>
        <h2>Comments</h2>
        <ul className="comment-display">
          {this.props.review.comments.map((comment, index) => {
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