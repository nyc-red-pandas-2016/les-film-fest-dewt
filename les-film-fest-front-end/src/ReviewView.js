import React, { Component } from 'react';
import Axios from 'axios';

export default class ReviewView extends Component {
  constructor() {
    super();
    this.state = {
      commentFormVisible: false
    }
    this.toggleAddCommentForm = this.toggleAddCommentForm.bind(this);
  }
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
        <button onClick={this.toggleAddCommentForm}>
        { this.state.commentFormVisible ?
            Hide comment form
          :
            Add a comment
        }
        </button>
      </div>
    )
  }
}
