import React,{Component} from 'react';
import { Link } from 'react-router';
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
      reviewToView: {}
    }
    this.getMovieInfo = this.getMovieInfo.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.toggleAddReviewForm = this.toggleAddReviewForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewReview = this.viewReview.bind(this);
  }

  componentDidMount() {
    this.getMovieInfo();
    this.getReviews();
  }

  getMovieInfo() {
    Axios.get(`http://localhost:3000/movies/${this.props.params.movie_id}`)
      .then((response) => {
        this.setState({
          movieInfo: response.data
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

  toggleAddReviewForm() {
    this.setState({
      reviewFormVisible: !this.state.reviewFormVisible
    })
  }

  viewReview(e) {
    let reviewId = Number(e.target.id);
    debugger;
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
      reviewer_id: 1,
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

  render() {
    let {title,description,poster_url,year} = this.state.movieInfo
    return(
      <div className="movie-display">
        <div className="movie-info">
          <h2 className="movie-title">{title} ({year})</h2>
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
        <button onClick={this.toggleAddReviewForm}>
          { this.state.reviewFormVisible ?
              <p>Hide review form</p>
            :
              <p>Add a review</p>
          }
        </button>
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
              <ReviewView review={this.state.reviewToView} movieId={this.state.movieInfo.id} />
            </div>
          :
            null
        }
      </div>
    )
  }
}