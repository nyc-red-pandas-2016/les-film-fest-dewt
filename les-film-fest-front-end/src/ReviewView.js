import React, { Component } from 'react';
import Axios from 'axios';
import $ from 'jquery';

export default class ReviewView extends Component {
  constructor() {
    super();
    this.state = {
      commentFormVisible: false,
      voteCount: 0
    }
    this.toggleAddCommentForm = this.toggleAddCommentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.upvoteReview = this.upvoteReview.bind(this);
    this.downvoteReview = this.downvoteReview.bind(this);
    this.upvoteComment = this.upvoteComment.bind(this);
    this.downvoteComment = this.downvoteComment.bind(this);
  }

  componentDidMount() {
    this.setState({
      voteCount: this.props.review.voteCount
    })
  }

  upvoteReview() {
    var reviewId = this.props.review.reviewContent.id
    var userId = JSON.parse(localStorage.getItem('currentUser')).id
    $.ajax({
      url: `http://localhost:3000/reviews/${reviewId}/users/${userId}/upvote`,
    }).done(function(response) {
      this.setState({
        voteCount: this.state.voteCount + 1
      });
    }.bind(this));
  }

  downvoteReview() {
    var reviewId = this.props.review.reviewContent.id
    var userId = JSON.parse(localStorage.getItem('currentUser')).id
    $.ajax({
      url: `http://localhost:3000/reviews/${reviewId}/users/${userId}/downvote`,
    }).done(function(response) {
      this.setState({
        voteCount: this.state.voteCount - 1
      });
    }.bind(this));
  }

  upvoteComment(event) {
    var commentDiv = event.target.closest('div')
    var commentId = commentDiv.id
    var userId = JSON.parse(localStorage.getItem('currentUser')).id
    $.ajax({
      url: `http://localhost:3000/comments/${commentId}/users/${userId}/downvote`,
    }).done(function(response) {
      this.refs.voteCounter.innerText = parseInt(this.refs.voteCounter.innerText) + 1
    }.bind(this));
  }

  downvoteComment(event) {
    var commentDiv = event.target.closest('div')
    var commentId = commentDiv.id
    var userId = JSON.parse(localStorage.getItem('currentUser')).id
    $.ajax({
      url: `http://localhost:3000/comments/${commentId}/users/${userId}/upvote`,
    }).done(function(response) {
      this.refs.voteCounter.innerText = parseInt(this.refs.voteCounter.innerText) - 1
    }.bind(this));
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
      user_id: this.props.currentUser.id,
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
    return (
      <div>
        <h2>{this.props.review.reviewContent.title}</h2>
        <p>{this.props.review.reviewContent.body}</p>
        <div className="vote-area">
          <button type="button" onClick={this.upvoteReview}>&#9650;</button>
          <p>{this.state.voteCount}</p>
          <button type="button" onClick={this.downvoteReview}>&#9660;</button>
        </div>
        <h2>Comments</h2>
        <ul className="comment-display">
          {this.props.review.comments.map((comment, index) => {
            return (
              <li key={index} className="individual-comment">
                {comment.commentContent.body}
                <div id={comment.commentContent.id} className="vote-area">
                  <button type="button" onClick={this.upvoteComment}>&#9650;</button>
                  <p ref="voteCounter">{comment.commentVoteCount}</p>
                  <button type="button" onClick={this.downvoteComment}>&#9660;</button>
                </div>
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
