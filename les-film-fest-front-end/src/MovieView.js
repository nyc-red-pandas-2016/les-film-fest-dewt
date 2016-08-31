import React,{Component} from 'react';
import './App.css';
import Axios from 'axios';
import ReviewView from './ReviewView'

export default class MovieView extends Component{
  constructor() {
    super();
    this.state = {
      movieInfo: {},
      reviews: [],
      reviewFormVisible: false,
      reviewToView: {},
      currentUser: {},
      reviewer: false,
      signedIn: false,
      averageRating: 0,
      userRated: false
    }
    this.getMovieInfo = this.getMovieInfo.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.toggleAddReviewForm = this.toggleAddReviewForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewReview = this.viewReview.bind(this);
    this.addComment = this.addComment.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.addRating = this.addRating.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getMovieInfo();
  }

  componentWillMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      Axios.get(`http://localhost:3000/users/${currentUser.id}`)
      .then((response) => {
        this.setState({
          currentUser: response.data.userInfo, reviewer: response.data.reviewerStatus, signedIn: true
        })
      })
    }
  }

  getMovieInfo() {
    var userRated = false;
    var user = JSON.parse(localStorage.getItem('currentUser'));
    Axios.get(`http://localhost:3000/movies/${this.props.params.movie_id}`)
      .then((response) => {
        for (var i = 0; i < response.data.usersWhoRated.length; i++) {
          if (response.data.usersWhoRated[i] === user.id) {
            userRated = true
          }
        }
        this.setState({
          movieInfo: response.data.movieInfo, averageRating: response.data.averageRating, userRated: userRated
        })
      })
  }

  getReviews() {
    Axios.get(`http://localhost:3000/movies/${this.props.params.movie_id}/reviews`)
      .then((response) => {
        this.setState({
          reviews: response.data
        })
    })
  }

  getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      Axios.get(`http://localhost:3000/users/${currentUser.id}`)
      .then((response) => {
        this.setState({
          currentUser: response.data.userInfo, reviewer: response.data.reviewerStatus, signedIn: true
        })
      })
    }
  }

  toggleAddReviewForm() {
    this.setState({
      reviewFormVisible: !this.state.reviewFormVisible
    })
  }

  viewReview(e) {
    let reviewId = Number(e.target.id);
    var review;
    for (var i = 0; i < this.state.reviews.length; i++) {
      if (this.state.reviews[i].reviewContent.id === reviewId) {
        review = this.state.reviews[i];
      }
    }
    this.setState({
      reviewToView: review, reviewLoaded: true
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let newReview = {
      title: this.refs.reviewTitle.value,
      body: this.refs.reviewBody.value,
      reviewer_id: this.state.currentUser.id,
      movie_id: this.state.movieInfo.id
    }
    Axios({
      method: "post",
      url: `http://localhost:3000/movies/${this.state.movieInfo.id}/reviews`,
      data: newReview
    })
    .then((response) => {
      this.setState({
        reviews: this.state.reviews.concat([response.data]),
        reviewFormVisible: false
      })
      this.refs.reviewTitle.value = "";
      this.refs.reviewBody.value = "";
    })
  }

  addComment(response) {
    var newReviewToView = this.state.reviewToView;
    newReviewToView.comments = newReviewToView.comments.concat([response]);
    this.setState({
      reviewToView: newReviewToView
    })
  }

  addRating(e) {
    e.preventDefault();
    let newRating = {
      value: this.refs.rating.value,
      movie_id: this.state.movieInfo.id,
      user_id: this.state.currentUser.id
    }
    Axios({
      method: "post",
      url: "http://localhost:3000/ratings",
      data: newRating
    })
    .then((response) => {
      this.setState({
        averageRating: response.data
      })
    })
  }

  render() {
    let {title,description,poster_url,year} = this.state.movieInfo
    return(
      <div className="movie-display">
        <div className="movie-info">
          <h2 className="movie-title">{title} ({year})</h2>
          <h4>Average Rating: {this.state.averageRating}</h4>
          { this.state.signedIn ?
              <div>
                { this.state.userRated ?
                  null
                :
                  <div>
                    <p>Rate this movie:</p>
                    <form onSubmit={this.addRating}>
                      <select ref="rating" name="rating">
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                      </select>
                      <input type="submit" value="Rate this movie" />
                    </form>
                  </div>
                }
              </div>
            :
              null
          }
          <img src={poster_url} alt={title} className="movie-poster"/>
          <span className="plot-details">
            <p className="plot-header">Plot:</p>
            <p>{description}</p>
          </span>
        </div>
        <div>
          <h2 className="review-header">Reviews for {title}</h2>
          { this.state.reviews.map((review, index) => {
            return (
              <li key={index} className="review-list" onClick={this.viewReview} id={review.reviewContent.id}>
                  {review.reviewContent.title}
              </li>
            )}
          )}
        </div>
        { this.state.reviewer === true ? 
            <button onClick={this.toggleAddReviewForm}>
              { this.state.reviewFormVisible ?
                  <p>Hide review form</p>
                :
                  <p>Add a review</p>
              }
            </button>
          :
           null
        }
        { this.state.reviewFormVisible ?
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="review[title]" className="form-label">Title:</label>
            <input ref="reviewTitle" type="text" name="review[title]" className="form-input"/>
            <label htmlFor="review[body]" className="form-label">Body:</label>
            <textarea rows="5" cols="30" name="review[body]" className="form-textarea" ref="reviewBody"></textarea>
            <input type="submit" value="Add Review" className="form-input"/>
          </form>
        :
          null
        }
        { this.state.reviewLoaded ?
            <div className="review-display">
              <ReviewView review={this.state.reviewToView} movieId={this.state.movieInfo.id} addComment={this.addComment} signedIn={this.state.signedIn} currentUser={this.state.currentUser}/>
            </div>
          :
            null
        }
      </div>
    )
  }
}
