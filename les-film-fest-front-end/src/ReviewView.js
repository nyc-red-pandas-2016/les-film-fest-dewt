import React, { Component } from 'react';
import Axios from 'axios';

export default class ReviewView extends Component {
  constructor() {
    super();
    this.state = {
      commentFormVisible: false
    }
    this.toggleAddCommentForm = this.toggleAddCommentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleAddCommentForm() {
    this.setState({
      commentFormVisible: !this.state.commentFormVisible
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let newComment = {
      body: this.refs.commentBody.value,
      user_id: 1,
      review_id: this.props.review.reviewContent.id
    }
    Axios({
      method: "post",
      url: "http://localhost:3000/comments",
      data: newComment
    })
    .then((response) => {
      this.props.addComment(response.data);
    })
    this.refs.commentBody.value = "";
    this.setState({
      commentFormVisible: false
    })
  }

  render() {
    debugger;
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
        { this.props.signedIn === true ?
            <button onClick={this.toggleAddCommentForm}>
              { this.state.commentFormVisible ?
                  <p>Hide comment form</p>
                :
                  <p>Add a comment</p>
              }
            </button>
          :
            null
        }
        { this.state.commentFormVisible ?
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="comment[body]">Comment:</label>
              <textarea rows="5" cols="30" ref="commentBody" name="comment[body]" className="form-textarea"></textarea>
              <input type="submit" value="Add Comment" className="form-input" />
            </form>
          :
            null
        }
      </div>
    )
  }
}
